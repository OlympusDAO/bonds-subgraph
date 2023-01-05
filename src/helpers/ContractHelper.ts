import { Address } from "@graphprotocol/graph-ts";
import { OHM_V2 } from "../constants";

export function isOHMMarket(payoutToken: string, quoteToken: string): boolean {
    // If neither token is OHM, this isn't an OHM market
    if (payoutToken.toLowerCase() != OHM_V2.toLowerCase() && quoteToken.toLowerCase() != OHM_V2.toLowerCase()) {
        return false;
    }

    return true;
}