import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";

import { BondFixedExpirySDA } from "../generated/BondFixedExpirySDA/BondFixedExpirySDA";
import { BondSnapshot } from "../generated/schema";
import { getISO8601StringFromTimestamp } from "./DateHelper";
import { toDecimal } from "./NumberHelper";

const BOND_CONTRACT = "0x007FEA7A23da99F3Ce7eA34F976f32BF79A09C43";
const BOND_IDS: u64[] = [1, 2];
const DECIMAL_PLACES = 9; // OHM

function generateRecord(contractId: u64, block: ethereum.Block): void {
  const recordId = `${BOND_CONTRACT}/${contractId}/${block.number.toString()}`;
  const record = new BondSnapshot(recordId);
  const bondContractAddress = Address.fromString(BOND_CONTRACT);
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
  const scale = market.getScale().div(BigInt.fromString("10"));
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

  for (let i = 0; i < BOND_IDS.length; i++) {
    generateRecord(BOND_IDS[i], block);
  }
}
