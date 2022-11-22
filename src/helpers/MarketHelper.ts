import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { toDecimal } from "./NumberHelper";

export function removeScale(
    initialPrice: BigInt,
    scale: BigInt,
): BigDecimal {
    return initialPrice.toBigDecimal().div(scale.toBigDecimal());
}

export function getCapacity(
    capacity: BigInt,
    capacityInQuote: boolean,
    payoutTokenDecimals: number,
    quoteTokenDecimals: number,
    initialPrice: BigInt,
    scale: BigInt,
): BigDecimal {
    const initialPriceScaled: BigDecimal = removeScale(initialPrice, scale);
    const tokenDecimals = capacityInQuote ? quoteTokenDecimals : payoutTokenDecimals;
    const capacityDecimal = toDecimal(capacity, tokenDecimals);

    return capacityInQuote ? capacityDecimal : capacityDecimal.div(initialPriceScaled);
}

/**
 * The price decimal scaling for a market is split between
 * the price value and the scale value to be able to support a broader range of inputs.
 * Specifically, half of it is in the scale and half in the price.
 * To normalize the price value for display, we can add the half that is in the scale factor back to it.
 */
export function convertScaledNumber(
    number: BigInt,
    scale: BigInt,
    payoutTokenDecimals: number,
    quoteTokenDecimals: number,
): BigDecimal {
    // ERC20.decimals() returns a uint8, so we can cast here
    const baseScale = BigInt.fromString("10").pow(36 + u8(payoutTokenDecimals) - u8(quoteTokenDecimals));
    const shift = baseScale.div(scale);

    return toDecimal(number.times(shift), quoteTokenDecimals);
}