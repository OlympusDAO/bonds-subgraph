import { Address, BigInt, ethereum, log } from "@graphprotocol/graph-ts";
import { BondFixedTermSDA, MarketClosed, MarketCreated } from "../generated/BondFixedTermSDAv3/BondFixedTermSDA";
import { ERC20 } from "../generated/BondFixedTermSDAv3/ERC20";
import { Market, MarketClosedEvent, MarketCreatedEvent } from "../generated/schema";
import { OHM_V2 } from "./constants";
import { getISO8601StringFromTimestamp, getUnixTimestamp } from "./helpers/DateHelper";
import { convertScaledNumber, getCapacity, removeScale } from "./helpers/MarketHelper";

function createMarket(marketId: BigInt, initialPrice: BigInt, vesting: BigInt, block: ethereum.Block, contractAddress: Address): Market {
    const bondContract = BondFixedTermSDA.bind(contractAddress);
    const marketResult = bondContract.markets(marketId);

    const payoutToken = ERC20.bind(marketResult.getPayoutToken());
    const quoteToken = ERC20.bind(marketResult.getQuoteToken());

    const market = new Market(`${marketId}`);
    market.bondContract = contractAddress;
    market.bondType = "FixedTerm";
    market.owner = marketResult.getOwner();
    market.payoutToken = marketResult.getPayoutToken();
    market.quoteToken = marketResult.getQuoteToken();

    market.capacityInQuoteToken = getCapacity(marketResult.getCapacity(), marketResult.getCapacityInQuote(), payoutToken.decimals(), quoteToken.decimals(), initialPrice, marketResult.getScale());
    market.totalDebtInQuoteToken = convertScaledNumber(marketResult.getTotalDebt(), marketResult.getScale(), payoutToken.decimals(), quoteToken.decimals());
    market.maxPayoutInQuoteToken = convertScaledNumber(marketResult.getMaxPayout(), marketResult.getScale(), payoutToken.decimals(), quoteToken.decimals());

    market.initialPriceInPayoutToken = removeScale(initialPrice, marketResult.getScale());
    market.minPriceInPayoutToken = removeScale(marketResult.getMinPrice(), marketResult.getScale());

    market.vesting = vesting;
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

    const market = createMarket(event.params.id, event.params.initialPrice, event.params.vesting, event.block, event.address);
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