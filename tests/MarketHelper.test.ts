import { BigInt } from "@graphprotocol/graph-ts";
import { assert, describe, test } from "matchstick-as";
import { convertScaledNumber, getCapacity, removeScale } from "../src/helpers/MarketHelper";

describe("removeScale", () => {
    test("shifts decimal places by scale", () => {
        assert.stringEquals("1", removeScale(BigInt.fromString("1000000000000000000000000000000000000"), BigInt.fromString("1000000000000000000000000000000000000")).toString());
    });
});

/**
 * 
 *   owner   address :  0x19518E4D4E542f4b0Fc27366C23FaC7a0bA491Da
  payoutToken   address :  0x0595328847AF962F951a4f8F8eE9A3Bf261e4f6b // OHM
  quoteToken   address :  0x41e38e70a36150D08A8c97aEC194321b5eB545A5 // DAI
  callbackAddr   address :  0x0000000000000000000000000000000000000000
  capacityInQuote   bool :  false
  capacity   uint256 :  998988669352
  totalDebt   uint256 :  600023314595
  minPrice   uint256 :  8000000000000000000000000000000000000
  maxPayout   uint256 :  33335185288
  sold   uint256 :  1011330648
  purchased   uint256 :  10000000000000000000
  scale   uint256 :  1000000000000000000000000000
 * 
 * 
 * 
 * scale is used to convert between quote and payout token
 * 
 * price is always in quote token per payout token
 * 
 * quote token can be converted to payout token: mul by scale then div by price 
 * 
 * payout token can be converted to quote token: mul by price then div by scale
 * 
 * maxPayout is in payout token decimals: 
 * e.g. 33335185288 = 33.335185288 (OHM is 9 dp)
 * 
 * totalDebt is in payout token decimals: amount of payout token that we expect over the debt decay interval
 * e.g. 600023314595 = 600.023314595
 * 
 * maxDebt should be included
 * 
 * apply shift to price value to get a number with 36 decimal places
 * 
 * 
 * 
 * initial price = 10000000000000000000000000000000000000
 * scale = 1000000000000000000000000000
 * 
 * e.g. how many quote tokens are equivalent to the capacity?
 * 
 * 998988669352 * 10000000000000000000000000000000000000 / 1000000000000000000000000000 = 9,989,886,693,520,000,000,000 (in quote token decimals) = 9,989.88669352
 * 
 * e.g. display initial price
 * 
 * baseScale = 10^(36 + 9 - 18) = 10^27
 * shift = baseScale / 1000000000000000000000000000 = 1
 * initial price = 10000000000000000000000000000000000000 * 1 * 10^-36 = 10 DAI / OHM
 * 
 * sold = payout tokens = 1011330648*10^-9 = 1.011330648
 * purchased = quote tokens = 10000000000000000000*10^-18
 */


describe("getCapacity", () => {
    test("capacity in payout token", () => {
        // Based on: https://goerli.etherscan.io/tx/0x02982efc79605560b56845942ac04b34a499d4f76da4c2c0cce974245b247d4c#eventlog

        // (998988669352*10^-9)
        assert.stringEquals("998.988669352", getCapacity(
            BigInt.fromString("998988669352"),
            9,
        ).toString());
    });

    // RBS will not initiate a market with capacity in quote token. don't bother converting it. send an alert.
});

describe("convertScaledNumber", () => {
    test("handles different decimals", () => {
        // 600023314595*((10^(36+9-18))/(1000000000000000000000000000))*10^-18 = 0.0000006
        assert.stringEquals("600.023314595", convertScaledNumber(
            BigInt.fromString("600023314595"),
            BigInt.fromString("1000000000000000000000000000"),
            9,
            18,
        ).toString());
    })
})