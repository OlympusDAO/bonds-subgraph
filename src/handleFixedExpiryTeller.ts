import { Address, log } from "@graphprotocol/graph-ts";
import { BondFixedExpirySDA } from "../generated/BondFixedExpirySDAv3/BondFixedExpirySDA";
import { Bonded } from "../generated/BondFixedExpiryTeller_1156/BondFixedExpiryTeller";
import { ERC20 } from "../generated/BondFixedExpiryTeller_1156/ERC20";
import {
  BondPurchase
} from "../generated/schema"
import { getISO8601StringFromTimestamp, getUnixTimestamp } from "./helpers/DateHelper";
import { toDecimal } from "./helpers/NumberHelper";

const AUCTIONEER_1156 = "0x007fea7a23da99f3ce7ea34f976f32bf79a09c43";
const AUCTIONEER_DC95 = "0x007FEA32545a39Ff558a1367BBbC1A22bc7ABEfD";
const TELLER_MAP = new Map<string, string>();
TELLER_MAP.set("0x007FE7c498A2Cf30971ad8f2cbC36bd14Ac51156".toLowerCase(), AUCTIONEER_1156);
TELLER_MAP.set("0x007fe70dc9797c4198528ae43d8195fff82bdc95".toLowerCase(), AUCTIONEER_DC95);

function getAuctioneer(contract: string): Address {
  const contractLower = contract.toLowerCase();

  if (!TELLER_MAP.has(contractLower)) {
    throw new Error(`Cannot find auctioneer contract for teller: ${contract}`);
  }

  const auctioneer = TELLER_MAP.get(contractLower);
  log.debug("Found auctioneer {} for teller {}", [auctioneer, contract]);
  return Address.fromString(auctioneer);
}

export function handleBonded(event: Bonded): void {
  log.info("Creating BondPurchase for teller contract {} and purchase id {}", [event.address.toHexString(), event.params.id.toString()]);

  const bondAuctioneer = BondFixedExpirySDA.bind(getAuctioneer(event.address.toHexString()));
  const marketId = event.params.id;
  const marketInfo = bondAuctioneer.getMarketInfoForPurchase(marketId);
  if (marketInfo.getOwner() == Address.zero()) {
    log.warning("Ignoring Bonded event with no market info", []);
    return;
  }

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
