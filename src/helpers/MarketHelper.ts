import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { toDecimal } from "./NumberHelper";

/**
 * Converts a price integer (in terms of the quote token per payout token) to a BigDecimal.
 * 
 * Explanation from Oighty:
 * > The price decimal scaling for a market is split between
 * > the price value and the scale value to be able to support a broader range of inputs.
 * > Specifically, half of it is in the scale and half in the price.
 * > To normalize the price value for display, we can add the half that is in the scale factor back to it.
 * 
 * The resulting number is then shifted by 36 decimal places.
 * 
 * @param number
 * @param scale
 */
export function priceToDecimal(
    number: BigInt,
    scale: BigInt,
    payoutTokenDecimals: u8,
    quoteTokenDecimals: u8,
): BigDecimal {
    const PRICE_DECIMALS: u8 = 36;

    // ERC20.decimals() returns a uint8, so we can cast here
    const baseScale = BigInt.fromString("10").pow(PRICE_DECIMALS + payoutTokenDecimals - quoteTokenDecimals);
    const shift = baseScale.div(scale);

    return toDecimal(number.times(shift), PRICE_DECIMALS);
}

/**
 * Converts an integer (in terms of the payout token) to a BigDecimal.
 * 
 * This can be applied to: max payout, total debt, capacity
 * 
 * @param number 
 * @param payoutTokenDecimals 
 * @returns 
 */
export function payoutTokenToDecimal(
    number: BigInt,
    payoutTokenDecimals: number,
): BigDecimal {
    return toDecimal(number, payoutTokenDecimals);
}

/**
 * Not currently handled, but for future reference:
 * 
 * scale is used to convert between quote and payout token
 * 
 * price is always in quote token per payout token
 * 
 * quote token can be converted to payout token: mul by scale then div by price 
 * 
 * payout token can be converted to quote token: mul by price then div by scale
 * 
 * e.g. how many quote tokens are equivalent to the capacity?
 * 
 * 998988669352 * 10000000000000000000000000000000000000 / 1000000000000000000000000000 = 9,989,886,693,520,000,000,000 (in quote token decimals) = 9,989.88669352
 */