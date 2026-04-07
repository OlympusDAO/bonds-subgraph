import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { BondAggregator } from "../generated/BondFixedExpirySDAv3/BondAggregator";
import { BondFixedExpirySDA } from "../generated/BondFixedExpirySDAv3/BondFixedExpirySDA";
import { Bonded } from "../generated/BondFixedExpiryTeller_1156/BondFixedExpiryTeller";
import { ERC20 } from "../generated/BondFixedExpiryTeller_1156/ERC20";
import {
  BondPurchase
} from "../generated/schema"
import { isOHMMarket } from "./helpers/ContractHelper";
import { getISO8601StringFromTimestamp, getUnixTimestamp } from "./helpers/DateHelper";
import { toDecimal } from "./helpers/NumberHelper";

const BOND_TELLER_V1 = "0x007FE7c498A2Cf30971ad8f2cbC36bd14Ac51156".toLowerCase();
const BOND_AGGREGATOR_V1 = "0x007A66B9e719b3aBb2f3917Eb47D4231a17F5a0D".toLowerCase();

const BOND_TELLER_V2 = "0x007FE70dc9797C4198528aE43d8195ffF82Bdc95".toLowerCase();
const BOND_AGGREGATOR_V2 = "0x007A66A2a13415DB3613C1a4dd1C942A285902d1".toLowerCase();

function getAggregator(tellerContract: string): BondAggregator {
  if (tellerContract.toLowerCase() == BOND_TELLER_V1) {
    return BondAggregator.bind(Address.fromString(BOND_AGGREGATOR_V1));
  }

  if (tellerContract.toLowerCase() == BOND_TELLER_V2) {
    return BondAggregator.bind(Address.fromString(BOND_AGGREGATOR_V2));
  }

  throw new Error(`Unknown fixed expiry teller contract: ${tellerContract}`);
}

const BOND_TYPE = "FixedExpiry";

function getAuctioneer(tellerContract: string, marketId: BigInt): Address {
  // Get the auctioneer from the bond aggregator
  const aggregator = getAggregator(tellerContract);

  const auctioneerAddress = aggregator.getAuctioneer(marketId);
  log.debug("Found auctioneer {} for teller {} and market id {}", [auctioneerAddress.toHexString(), tellerContract, marketId.toString()]);
  return auctioneerAddress;
}

export function handleBonded(event: Bonded): void {
  log.info("Creating BondPurchase for teller contract {} and market id {}", [event.address.toHexString(), event.params.id.toString()]);

  const marketId = event.params.id;
  const bondAuctioneer = BondFixedExpirySDA.bind(getAuctioneer(event.address.toHexString(), marketId));
  const marketInfo = bondAuctioneer.getMarketInfoForPurchase(marketId);

  const quoteTokenAddress = marketInfo.getQuoteToken();
  const payoutTokenAddress = marketInfo.getPayoutToken();

  if (!isOHMMarket(payoutTokenAddress.toHexString(), quoteTokenAddress.toHexString())) {
    log.info("Ignoring market creation for token other than OHM", []);
    return;
  }

  const quoteToken = ERC20.bind(quoteTokenAddress);
  const payoutToken = ERC20.bind(payoutTokenAddress);
  const vestingTimestamp = marketInfo.getVesting();

  const entity = new BondPurchase(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(event.block.timestamp);
  entity.block = event.block.number;
  entity.timestamp = getUnixTimestamp(event.block.timestamp);
  entity.contract = event.address;
  entity.type = BOND_TYPE;
  entity.marketId = marketId;
  entity.referrer = event.params.referrer;
  entity.amountInQuoteToken = toDecimal(event.params.amount, quoteToken.decimals());
  entity.payoutInPayoutToken = toDecimal(event.params.payout, payoutToken.decimals());
  entity.payoutToken = payoutTokenAddress;
  entity.quoteToken = quoteTokenAddress;
  entity.expiryTimestamp = getUnixTimestamp(vestingTimestamp);
  entity.expiryDate = getISO8601StringFromTimestamp(event.block.timestamp.plus(vestingTimestamp));
  entity.save();
}
