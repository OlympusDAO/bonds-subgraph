import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { BondAggregator } from "../generated/BondFixedExpirySDAv3/BondAggregator";
import { BondFixedExpirySDA } from "../generated/BondFixedExpirySDAv3/BondFixedExpirySDA";
import { Bonded } from "../generated/BondFixedExpiryTeller_1156/BondFixedExpiryTeller";
import { ERC20 } from "../generated/BondFixedExpiryTeller_1156/ERC20";
import {
  BondPurchase
} from "../generated/schema"
import { getISO8601StringFromTimestamp, getUnixTimestamp } from "./helpers/DateHelper";
import { toDecimal } from "./helpers/NumberHelper";

const BOND_AGGREGATOR = "0x007A66B9e719b3aBb2f3917Eb47D4231a17F5a0D";

function getAuctioneer(tellerContract: string, marketId: BigInt): Address {
  // Get the auctioneer from the bond aggregator
  const aggregator = BondAggregator.bind(Address.fromString(BOND_AGGREGATOR));

  const auctioneerAddress = aggregator.getAuctioneer(marketId);
  log.debug("Found auctioneer {} for teller {} and market id {}", [auctioneerAddress.toHexString(), tellerContract, marketId.toString()]);
  return auctioneerAddress;
}

export function handleBonded(event: Bonded): void {
  log.info("Creating BondPurchase for teller contract {} and purchase id {}", [event.address.toHexString(), event.params.id.toString()]);

  const marketId = event.params.id;
  const bondAuctioneer = BondFixedExpirySDA.bind(getAuctioneer(event.address.toHexString(), marketId));
  const marketInfo = bondAuctioneer.getMarketInfoForPurchase(marketId);

  const quoteTokenAddress = marketInfo.getQuoteToken();
  log.debug("quoteToken {}", [quoteTokenAddress.toHexString()]);
  const quoteToken = ERC20.bind(quoteTokenAddress);
  const payoutTokenAddress = marketInfo.getPayoutToken();
  log.debug("payoutToken {}", [payoutTokenAddress.toHexString()]);
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
  entity.marketId = marketId;
  entity.referrer = event.params.referrer;
  entity.amountInQuoteToken = toDecimal(event.params.amount, quoteToken.decimals());
  entity.payoutInPayoutToken = toDecimal(event.params.payout, payoutToken.decimals());
  entity.payoutToken = payoutTokenAddress;
  entity.quoteToken = quoteTokenAddress;

  entity.expiryTimestamp = getUnixTimestamp(vestingTimestamp);
  entity.expiryDate = getISO8601StringFromTimestamp(vestingTimestamp);
  entity.save();
}
