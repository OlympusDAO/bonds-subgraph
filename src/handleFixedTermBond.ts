import { Address, BigDecimal, BigInt, ethereum, log } from "@graphprotocol/graph-ts";
import { BondFixedTermSDA, MarketClosed, MarketCreated } from "../generated/BondFixedTermSDAv3/BondFixedTermSDA";
import { ERC20 } from "../generated/BondFixedTermSDAv3/ERC20";
import { Market, MarketClosedEvent, MarketCreatedEvent } from "../generated/schema";
import { isOHMMarket } from "./helpers/ContractHelper";
import { getISO8601StringFromTimestamp, getUnixTimestamp } from "./helpers/DateHelper";
import { getId, payoutTokenToDecimal, priceToDecimal } from "./helpers/MarketHelper";
import { toDecimal } from "./helpers/NumberHelper";

const BOND_TYPE = "FixedTerm";

function closeMarket(marketId: BigInt, market: Market, marketClosed: MarketClosedEvent, contractAddress: Address): void {
  const bondContract = BondFixedTermSDA.bind(contractAddress);
  const marketResult = bondContract.markets(marketId);

  const payoutToken = ERC20.bind(marketResult.getPayoutToken());
  const quoteToken = ERC20.bind(marketResult.getQuoteToken());

  market.closedBlock = marketClosed.block;
  market.closedDate = marketClosed.date;
  market.closedTimestamp = marketClosed.timestamp;
  market.durationActualMilliseconds = marketClosed.timestamp.minus(market.createdTimestamp);

  market.soldInPayoutToken = toDecimal(marketResult.getSold(), payoutToken.decimals());
  market.purchasedInQuoteToken = toDecimal(marketResult.getPurchased(), quoteToken.decimals());

  market.save();
}

function createMarket(marketId: BigInt, initialPrice: BigInt, vesting: BigInt, block: ethereum.Block, contractAddress: Address): Market {
  const bondContract = BondFixedTermSDA.bind(contractAddress);
  const marketResult = bondContract.markets(marketId);
  const metadataResult = bondContract.metadata(marketId);

  const payoutToken = ERC20.bind(marketResult.getPayoutToken());
  const quoteToken = ERC20.bind(marketResult.getQuoteToken());

  const market = new Market(getId(contractAddress, BOND_TYPE, marketId));
  market.bondContract = contractAddress;
  market.bondType = BOND_TYPE;
  market.marketId = marketId;
  market.owner = marketResult.getOwner();
  market.payoutToken = marketResult.getPayoutToken();
  market.quoteToken = marketResult.getQuoteToken();
  market.vesting = vesting;
  market.durationMilliseconds = metadataResult.getLength().times(BigInt.fromString("1000")); // Seconds to milliseconds

  /**
   * NOTE: marketResult has a getCapacityInQuote() function. Implementing this would complicate matters,
   * and RBS will never set this to true, so we conveniently ignore it and assume the capacity is in terms
   * of the payout token.
   */
  market.capacityInPayoutToken = payoutTokenToDecimal(marketResult.getCapacity(), payoutToken.decimals());
  market.totalDebtInPayoutToken = payoutTokenToDecimal(marketResult.getTotalDebt(), payoutToken.decimals());
  market.maxPayoutInPayoutToken = payoutTokenToDecimal(marketResult.getMaxPayout(), payoutToken.decimals());

  market.initialPriceInQuoteToken = priceToDecimal(initialPrice, marketResult.getScale(), u8(payoutToken.decimals()), u8(quoteToken.decimals()));
  market.minPriceInQuoteToken = priceToDecimal(marketResult.getMinPrice(), marketResult.getScale(), u8(payoutToken.decimals()), u8(quoteToken.decimals()));

  market.soldInPayoutToken = BigDecimal.zero();
  market.purchasedInQuoteToken = BigDecimal.zero();

  market.createdDate = getISO8601StringFromTimestamp(block.timestamp);
  market.createdTimestamp = getUnixTimestamp(block.timestamp);
  market.createdBlock = block.number;
  market.save();

  return market;
}

export function handleMarketCreated(event: MarketCreated): void {
  if (isOHMMarket(event.params.payoutToken.toHexString(), event.params.quoteToken.toHexString())) {
    log.info("Ignoring market creation for token other than OHM", []);
    return;
  }

  const marketCreated = new MarketCreatedEvent(getId(event.address, BOND_TYPE, event.params.id));
  marketCreated.marketId = event.params.id;
  marketCreated.bondContract = event.address;
  marketCreated.bondType = BOND_TYPE;
  marketCreated.date = getISO8601StringFromTimestamp(event.block.timestamp);
  marketCreated.timestamp = getUnixTimestamp(event.block.timestamp);
  marketCreated.block = event.block.number;

  const market = createMarket(event.params.id, event.params.initialPrice, event.params.vesting, event.block, event.address);
  marketCreated.market = market.id;

  marketCreated.save();
}

export function handleMarketClosed(event: MarketClosed): void {
  const market = Market.load(getId(event.address, BOND_TYPE, event.params.id));
  // If there is no existing market, then it is going to be for a non-OHM token
  if (!market) {
    log.info("Ignoring market closure where there is no existing market record (likely token other than OHM)", []);
    return;
  }

  const marketClosed = new MarketClosedEvent(getId(event.address, BOND_TYPE, event.params.id));
  marketClosed.marketId = event.params.id;
  marketClosed.bondContract = event.address;
  marketClosed.bondType = BOND_TYPE;
  marketClosed.date = getISO8601StringFromTimestamp(event.block.timestamp);
  marketClosed.timestamp = getUnixTimestamp(event.block.timestamp);
  marketClosed.block = event.block.number;
  marketClosed.market = market.id;
  marketClosed.save();

  // Update the market too
  closeMarket(event.params.id, market, marketClosed, event.address);
}