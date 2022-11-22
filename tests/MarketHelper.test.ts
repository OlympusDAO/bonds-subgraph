import { BigInt } from "@graphprotocol/graph-ts";
import { assert, describe, test } from "matchstick-as";
import { convertScaledNumber, getCapacity, removeScale } from "../src/helpers/MarketHelper";

describe("removeScale", () => {
    test("shifts decimal places by scale", () => {
        assert.stringEquals("1", removeScale(BigInt.fromString("1000000000000000000000000000000000000"), BigInt.fromString("1000000000000000000000000000000000000")).toString());
    });
});

describe("getCapacity", () => {
    test("capacity in payout token", () => {
        // Based on: https://goerli.etherscan.io/tx/0x02982efc79605560b56845942ac04b34a499d4f76da4c2c0cce974245b247d4c#eventlog

        // (998988669352*10^-9)/(10000000000000000000000000000000000000/1000000000000000000000000000) = 0.0000000999
        assert.stringEquals("0.0000000999", getCapacity(
            BigInt.fromString("998988669352"),
            false,
            9,
            18,
            BigInt.fromString("10000000000000000000000000000000000000"),
            BigInt.fromString("1000000000000000000000000000"),
        ).toString());
    });

    test("capacity in quote token", () => {
        // (998988669352*10^-9) = 998.988669352
        assert.stringEquals("998.988669352", getCapacity(
            BigInt.fromString("998988669352"),
            true,
            9,
            18,
            BigInt.fromString("10000000000000000000000000000000000000"),
            BigInt.fromString("1000000000000000000000000000"),
        ).toString());
    });
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