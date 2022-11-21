import { Address, BigInt, ethereum, log } from "@graphprotocol/graph-ts";

import { BondAggregator } from "../generated/BondFixedExpirySDAv1/BondAggregator";
import { BondFixedExpirySDA, MarketClosed, MarketCreated, Tuned } from "../generated/BondFixedExpirySDAv1/BondFixedExpirySDA";
import { ERC20 } from "../generated/BondFixedExpirySDAv1/ERC20";
import { BondSnapshot, Market, MarketClosedEvent, MarketCreatedEvent, TunedEvent } from "../generated/schema";
import { getISO8601StringFromTimestamp, getUnixTimestamp } from "./helpers/DateHelper";
import { toDecimal } from "./helpers/NumberHelper";

const BOND_AGGREGATOR = "0x007A66B9e719b3aBb2f3917Eb47D4231a17F5a0D";
const Fixed_Expiry_SDA_V1 = "0x007FEA7A23da99F3Ce7eA34F976f32BF79A09C43";
const Fixed_Expiry_SDA_V2 = "0x007FEA2a31644F20b0fE18f69643890b6F878AA6";
const Fixed_Expiry_SDA_V3 = "0x007FEA32545a39Ff558a1367BBbC1A22bc7ABEfD";
const DECIMAL_PLACES = 9; // OHM
const OHM_V2 = "0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5";

function generateMarketSnapshot(contractAddress: string, contractId: u64, block: ethereum.Block): void {
  const contractAddressLower = contractAddress.toLowerCase();
  const recordId = `${contractAddressLower}/${contractId}/${block.number.toString()}`;
  const record = new BondSnapshot(recordId);
  const bondContractAddress = Address.fromString(contractAddress);
  const contractIdBigInt = BigInt.fromU64(contractId);

  // Basic data
  record.contractAddress = bondContractAddress;
  record.contractId = contractIdBigInt;
  record.date = getISO8601StringFromTimestamp(block.timestamp);
  record.timestamp = block.timestamp;
  record.block = block.number;

  // Check that the bond market exists at this block
  const bondContract = BondFixedExpirySDA.bind(bondContractAddress);
  const marketResult = bondContract.try_markets(contractIdBigInt);
  const isLiveResult = bondContract.try_isLive(contractIdBigInt);
  const priceResult = bondContract.try_marketPrice(contractIdBigInt);
  const metadataResult = bondContract.try_metadata(contractIdBigInt);
  // Market doesn't exist at this block
  if (
    marketResult.reverted ||
    isLiveResult.reverted ||
    priceResult.reverted ||
    metadataResult.reverted
  ) {
    return;
  }

  const market = marketResult.value;
  const scale = market.getScale();
  const isLive = isLiveResult.value;
  const price = priceResult.value;
  const metadata = metadataResult.value;

  // Market data
  record.isLive = isLive;
  record.price = price.divDecimal(scale.toBigDecimal());
  record.owner = market.getOwner();
  record.payoutToken = market.getPayoutToken();
  record.quoteToken = market.getQuoteToken();
  record.capacity = toDecimal(market.getCapacity(), DECIMAL_PLACES);
  record.totalDebt = toDecimal(market.getTotalDebt(), DECIMAL_PLACES);
  record.minPrice = market.getMinPrice().divDecimal(scale.toBigDecimal());
  record.maxPayout = toDecimal(market.getMaxPayout(), DECIMAL_PLACES);
  record.sold = toDecimal(market.getSold(), DECIMAL_PLACES);
  record.purchased = toDecimal(market.getPurchased(), DECIMAL_PLACES);

  // Set the control variable from the last Tuned event
  const tunedEvent = TunedEvent.load(`${contractAddressLower}/${contractId}/${metadata.getLastTune().toString()}`);
  if (!tunedEvent) {
    log.warning("Unable to find tuning event for contract {}, id {} and last tuning with timestamp {}. Setting values to 0.", [contractAddressLower, contractId.toString(), metadata.getLastTune().toString()]);
    record.previousControlVariable = BigInt.zero();
    record.controlVariable = BigInt.zero();
  }
  else {
    record.previousControlVariable = tunedEvent.previousControlVariable;
    record.controlVariable = tunedEvent.newControlVariable;
  }

  // Market metadata
  record.tuneIntervalSeconds = metadata.getTuneInterval();
  record.lastTuneTimestamp = metadata.getLastTune();
  record.lastTuneDate = getISO8601StringFromTimestamp(record.lastTuneTimestamp);
  record.lastTuneSecondsAgo = record.timestamp.minus(record.lastTuneTimestamp);
  record.nextTuneInSeconds = record.lastTuneTimestamp
    .plus(record.tuneIntervalSeconds)
    .minus(record.timestamp);
  record.nextTuneDate = getISO8601StringFromTimestamp(
    record.lastTuneTimestamp.plus(record.tuneIntervalSeconds),
  );

  record.debtDecayIntervalSeconds = metadata.getDebtDecayInterval();
  record.lastDecayTimestamp = metadata.getLastDecay();
  record.lastDecayDate = getISO8601StringFromTimestamp(record.lastDecayTimestamp);
  record.lastDecaySecondsAgo = record.timestamp.minus(record.lastDecayTimestamp);
  record.nextDecayInSeconds = record.lastDecayTimestamp
    .plus(record.debtDecayIntervalSeconds)
    .minus(record.timestamp);
  record.nextDecayDate = getISO8601StringFromTimestamp(
    record.lastDecayTimestamp.plus(record.debtDecayIntervalSeconds),
  );

  record.depositIntervalSeconds = metadata.getDepositInterval();
  record.tuneAdjustmentDelaySeconds = metadata.getTuneAdjustmentDelay();
  record.tuneIntervalCapacity = toDecimal(metadata.getTuneIntervalCapacity(), DECIMAL_PLACES);
  record.tuneBelowCapacity = toDecimal(metadata.getTuneBelowCapacity(), DECIMAL_PLACES);
  record.lastTuneDebt = toDecimal(metadata.getLastTuneDebt(), DECIMAL_PLACES);

  record.save();
}

export function handleBlock(block: ethereum.Block): void {
  // Index every 5 blocks (1 minute)
  if (!block.number.mod(BigInt.fromString("5")).equals(BigInt.zero())) {
    return;
  }

  // Grab the live markets from the aggregator
  const aggregatorContract = BondAggregator.bind(Address.fromString(BOND_AGGREGATOR));
  const marketsForResult = aggregatorContract.try_liveMarketsFor(Address.fromString(OHM_V2), false);
  if (marketsForResult.reverted) {
    throw new Error("Unable to access bond aggregator at block " + block.number.toString());
  }

  const bondContracts = [Fixed_Expiry_SDA_V1, Fixed_Expiry_SDA_V2];
  const bondIds = marketsForResult.value;
  // Try V1 and V2 contracts
  for (let h = 0; h < bondContracts.length; h++) {
    for (let i = 0; i < bondIds.length; i++) {
      generateMarketSnapshot(bondContracts[h], bondIds[i].toU64(), block);
    }
  }
}

export function handleTunedEvent(event: Tuned): void {
  // Create a new record
  const record = new TunedEvent(`${event.address.toHexString().toLowerCase()}/${event.params.id.toString()}/${event.block.timestamp.toString()}`);
  record.timestamp = event.block.timestamp;
  record.block = event.block.number;
  record.contractAddress = event.address;
  record.contractId = event.params.id;
  record.previousControlVariable = event.params.oldControlVariable;
  record.newControlVariable = event.params.newControlVariable;
  record.save();
  log.debug("Recorded Tuned event for contract address {}, id {}, timestamp {}", [event.address.toHexString(), event.params.id.toString(), event.block.timestamp.toString()]);
}

function createMarket(marketId: BigInt, block: ethereum.Block, contractAddress: Address): Market {
  const bondContract = BondFixedExpirySDA.bind(contractAddress);
  const marketResult = bondContract.markets(marketId);
  const scale = marketResult.getScale();
  const scaleInt = scale.toU32();

  const payoutToken = ERC20.bind(marketResult.getPayoutToken());
  const quoteToken = ERC20.bind(marketResult.getQuoteToken());

  const market = new Market(`${marketId}`);
  market.bondContract = contractAddress;
  market.bondType = "FixedExpiry";
  market.payoutToken = marketResult.getPayoutToken();
  market.quoteToken = marketResult.getQuoteToken();
  market.capacityInQuote = marketResult.getCapacityInQuote();
  market.capacity = toDecimal(marketResult.getCapacity(), market.capacityInQuote ? quoteToken.decimals() : payoutToken.decimals());
  market.totalDebt = toDecimal(marketResult.getTotalDebt(), scaleInt);
  market.minPrice = toDecimal(marketResult.getMinPrice(), scaleInt);
  market.maxPayout = toDecimal(marketResult.getMaxPayout(), scaleInt);
  market.createdDate = getISO8601StringFromTimestamp(block.timestamp);
  market.createdTimestamp = getUnixTimestamp(block.timestamp);
  market.createdBlock = block.number;

  market.save();

  return market;
}

export function handleMarketCreated(event: MarketCreated): void {
  // Ignore if not OHM
  const ohmAddress = Address.fromString(OHM_V2);
  if (!event.params.payoutToken.equals(ohmAddress) && !event.params.quoteToken.equals(ohmAddress)) {
    log.info("Ignoring market creation for token other than OHM", []);
    return;
  }

  const marketCreated = new MarketCreatedEvent(`${event.params.id}`);
  marketCreated.marketId = event.params.id;
  marketCreated.date = getISO8601StringFromTimestamp(event.block.timestamp);
  marketCreated.timestamp = getUnixTimestamp(event.block.timestamp);
  marketCreated.block = event.block.number;

  const market = createMarket(event.params.id, event.block, event.address);
  marketCreated.market = market.id;

  marketCreated.save();
}

export function handleMarketClosed(event: MarketClosed): void {
  const market = Market.load(`${event.params.id}`);
  // If there is no existing market, then it is going to be for a non-OHM token
  if (!market) {
    log.info("Ignoring market closure where there is no existing market record (likely token other than OHM)", []);
    return;
  }

  const marketClosed = new MarketClosedEvent(`${event.params.id}`);
  marketClosed.marketId = event.params.id;
  marketClosed.date = getISO8601StringFromTimestamp(event.block.timestamp);
  marketClosed.timestamp = getUnixTimestamp(event.block.timestamp);
  marketClosed.block = event.block.number;
  marketClosed.market = market.id;
  marketClosed.save();

  // Update the market too
  market.closedBlock = marketClosed.block;
  market.closedDate = marketClosed.date;
  market.closedTimestamp = marketClosed.timestamp;
  market.save();
}