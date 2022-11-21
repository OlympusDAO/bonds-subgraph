// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  BigInt,
  Bytes,
  Entity,
  ethereum,
  JSONValue,
  TypedMap} from "@graphprotocol/graph-ts";

export class AuthorityUpdated extends ethereum.Event {
  get params(): AuthorityUpdated__Params {
    return new AuthorityUpdated__Params(this);
  }
}

export class AuthorityUpdated__Params {
  _event: AuthorityUpdated;

  constructor(event: AuthorityUpdated) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAuthority(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnerUpdated extends ethereum.Event {
  get params(): OwnerUpdated__Params {
    return new OwnerUpdated__Params(this);
  }
}

export class OwnerUpdated__Params {
  _event: OwnerUpdated;

  constructor(event: OwnerUpdated) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BondAggregator extends ethereum.SmartContract {
  static bind(address: Address): BondAggregator {
    return new BondAggregator("BondAggregator", address);
  }

  auctioneers(param0: BigInt): Address {
    const result = super.call("auctioneers", "auctioneers(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_auctioneers(param0: BigInt): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "auctioneers",
      "auctioneers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  authority(): Address {
    const result = super.call("authority", "authority():(address)", []);

    return result[0].toAddress();
  }

  try_authority(): ethereum.CallResult<Address> {
    const result = super.tryCall("authority", "authority():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  currentCapacity(id_: BigInt): BigInt {
    const result = super.call(
      "currentCapacity",
      "currentCapacity(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id_)]
    );

    return result[0].toBigInt();
  }

  try_currentCapacity(id_: BigInt): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "currentCapacity",
      "currentCapacity(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  findMarketFor(
    payout_: Address,
    quote_: Address,
    amountIn_: BigInt,
    minAmountOut_: BigInt,
    maxExpiry_: BigInt
  ): BigInt {
    const result = super.call(
      "findMarketFor",
      "findMarketFor(address,address,uint256,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(payout_),
        ethereum.Value.fromAddress(quote_),
        ethereum.Value.fromUnsignedBigInt(amountIn_),
        ethereum.Value.fromUnsignedBigInt(minAmountOut_),
        ethereum.Value.fromUnsignedBigInt(maxExpiry_)
      ]
    );

    return result[0].toBigInt();
  }

  try_findMarketFor(
    payout_: Address,
    quote_: Address,
    amountIn_: BigInt,
    minAmountOut_: BigInt,
    maxExpiry_: BigInt
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "findMarketFor",
      "findMarketFor(address,address,uint256,uint256,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(payout_),
        ethereum.Value.fromAddress(quote_),
        ethereum.Value.fromUnsignedBigInt(amountIn_),
        ethereum.Value.fromUnsignedBigInt(minAmountOut_),
        ethereum.Value.fromUnsignedBigInt(maxExpiry_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getAuctioneer(id_: BigInt): Address {
    const result = super.call(
      "getAuctioneer",
      "getAuctioneer(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(id_)]
    );

    return result[0].toAddress();
  }

  try_getAuctioneer(id_: BigInt): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "getAuctioneer",
      "getAuctioneer(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(id_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getTeller(id_: BigInt): Address {
    const result = super.call("getTeller", "getTeller(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(id_)
    ]);

    return result[0].toAddress();
  }

  try_getTeller(id_: BigInt): ethereum.CallResult<Address> {
    const result = super.tryCall("getTeller", "getTeller(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(id_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isInstantSwap(id_: BigInt): boolean {
    const result = super.call("isInstantSwap", "isInstantSwap(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(id_)
    ]);

    return result[0].toBoolean();
  }

  try_isInstantSwap(id_: BigInt): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "isInstantSwap",
      "isInstantSwap(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(id_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isLive(id_: BigInt): boolean {
    const result = super.call("isLive", "isLive(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(id_)
    ]);

    return result[0].toBoolean();
  }

  try_isLive(id_: BigInt): ethereum.CallResult<boolean> {
    const result = super.tryCall("isLive", "isLive(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(id_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  liveMarketsBetween(firstIndex_: BigInt, lastIndex_: BigInt): Array<BigInt> {
    const result = super.call(
      "liveMarketsBetween",
      "liveMarketsBetween(uint256,uint256):(uint256[])",
      [
        ethereum.Value.fromUnsignedBigInt(firstIndex_),
        ethereum.Value.fromUnsignedBigInt(lastIndex_)
      ]
    );

    return result[0].toBigIntArray();
  }

  try_liveMarketsBetween(
    firstIndex_: BigInt,
    lastIndex_: BigInt
  ): ethereum.CallResult<Array<BigInt>> {
    const result = super.tryCall(
      "liveMarketsBetween",
      "liveMarketsBetween(uint256,uint256):(uint256[])",
      [
        ethereum.Value.fromUnsignedBigInt(firstIndex_),
        ethereum.Value.fromUnsignedBigInt(lastIndex_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  liveMarketsBy(owner_: Address): Array<BigInt> {
    const result = super.call(
      "liveMarketsBy",
      "liveMarketsBy(address):(uint256[])",
      [ethereum.Value.fromAddress(owner_)]
    );

    return result[0].toBigIntArray();
  }

  try_liveMarketsBy(owner_: Address): ethereum.CallResult<Array<BigInt>> {
    const result = super.tryCall(
      "liveMarketsBy",
      "liveMarketsBy(address):(uint256[])",
      [ethereum.Value.fromAddress(owner_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  liveMarketsFor(token_: Address, isPayout_: boolean): Array<BigInt> {
    const result = super.call(
      "liveMarketsFor",
      "liveMarketsFor(address,bool):(uint256[])",
      [
        ethereum.Value.fromAddress(token_),
        ethereum.Value.fromBoolean(isPayout_)
      ]
    );

    return result[0].toBigIntArray();
  }

  try_liveMarketsFor(
    token_: Address,
    isPayout_: boolean
  ): ethereum.CallResult<Array<BigInt>> {
    const result = super.tryCall(
      "liveMarketsFor",
      "liveMarketsFor(address,bool):(uint256[])",
      [
        ethereum.Value.fromAddress(token_),
        ethereum.Value.fromBoolean(isPayout_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  marketCounter(): BigInt {
    const result = super.call("marketCounter", "marketCounter():(uint256)", []);

    return result[0].toBigInt();
  }

  try_marketCounter(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "marketCounter",
      "marketCounter():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  marketPrice(id_: BigInt): BigInt {
    const result = super.call("marketPrice", "marketPrice(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(id_)
    ]);

    return result[0].toBigInt();
  }

  try_marketPrice(id_: BigInt): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "marketPrice",
      "marketPrice(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  marketScale(id_: BigInt): BigInt {
    const result = super.call("marketScale", "marketScale(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(id_)
    ]);

    return result[0].toBigInt();
  }

  try_marketScale(id_: BigInt): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "marketScale",
      "marketScale(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(id_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  marketsFor(payout_: Address, quote_: Address): Array<BigInt> {
    const result = super.call(
      "marketsFor",
      "marketsFor(address,address):(uint256[])",
      [ethereum.Value.fromAddress(payout_), ethereum.Value.fromAddress(quote_)]
    );

    return result[0].toBigIntArray();
  }

  try_marketsFor(
    payout_: Address,
    quote_: Address
  ): ethereum.CallResult<Array<BigInt>> {
    const result = super.tryCall(
      "marketsFor",
      "marketsFor(address,address):(uint256[])",
      [ethereum.Value.fromAddress(payout_), ethereum.Value.fromAddress(quote_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  marketsForPayout(param0: Address, param1: BigInt): BigInt {
    const result = super.call(
      "marketsForPayout",
      "marketsForPayout(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_marketsForPayout(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "marketsForPayout",
      "marketsForPayout(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  marketsForQuote(param0: Address, param1: BigInt): BigInt {
    const result = super.call(
      "marketsForQuote",
      "marketsForQuote(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_marketsForQuote(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "marketsForQuote",
      "marketsForQuote(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  marketsToAuctioneers(param0: BigInt): Address {
    const result = super.call(
      "marketsToAuctioneers",
      "marketsToAuctioneers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_marketsToAuctioneers(param0: BigInt): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "marketsToAuctioneers",
      "marketsToAuctioneers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  maxAmountAccepted(id_: BigInt, referrer_: Address): BigInt {
    const result = super.call(
      "maxAmountAccepted",
      "maxAmountAccepted(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(id_),
        ethereum.Value.fromAddress(referrer_)
      ]
    );

    return result[0].toBigInt();
  }

  try_maxAmountAccepted(
    id_: BigInt,
    referrer_: Address
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "maxAmountAccepted",
      "maxAmountAccepted(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(id_),
        ethereum.Value.fromAddress(referrer_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    const result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    const result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  payoutFor(amount_: BigInt, id_: BigInt, referrer_: Address): BigInt {
    const result = super.call(
      "payoutFor",
      "payoutFor(uint256,uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(amount_),
        ethereum.Value.fromUnsignedBigInt(id_),
        ethereum.Value.fromAddress(referrer_)
      ]
    );

    return result[0].toBigInt();
  }

  try_payoutFor(
    amount_: BigInt,
    id_: BigInt,
    referrer_: Address
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "payoutFor",
      "payoutFor(uint256,uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(amount_),
        ethereum.Value.fromUnsignedBigInt(id_),
        ethereum.Value.fromAddress(referrer_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  registerMarket(payoutToken_: Address, quoteToken_: Address): BigInt {
    const result = super.call(
      "registerMarket",
      "registerMarket(address,address):(uint256)",
      [
        ethereum.Value.fromAddress(payoutToken_),
        ethereum.Value.fromAddress(quoteToken_)
      ]
    );

    return result[0].toBigInt();
  }

  try_registerMarket(
    payoutToken_: Address,
    quoteToken_: Address
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "registerMarket",
      "registerMarket(address,address):(uint256)",
      [
        ethereum.Value.fromAddress(payoutToken_),
        ethereum.Value.fromAddress(quoteToken_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get guardian_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get authority_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RegisterAuctioneerCall extends ethereum.Call {
  get inputs(): RegisterAuctioneerCall__Inputs {
    return new RegisterAuctioneerCall__Inputs(this);
  }

  get outputs(): RegisterAuctioneerCall__Outputs {
    return new RegisterAuctioneerCall__Outputs(this);
  }
}

export class RegisterAuctioneerCall__Inputs {
  _call: RegisterAuctioneerCall;

  constructor(call: RegisterAuctioneerCall) {
    this._call = call;
  }

  get auctioneer_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RegisterAuctioneerCall__Outputs {
  _call: RegisterAuctioneerCall;

  constructor(call: RegisterAuctioneerCall) {
    this._call = call;
  }
}

export class RegisterMarketCall extends ethereum.Call {
  get inputs(): RegisterMarketCall__Inputs {
    return new RegisterMarketCall__Inputs(this);
  }

  get outputs(): RegisterMarketCall__Outputs {
    return new RegisterMarketCall__Outputs(this);
  }
}

export class RegisterMarketCall__Inputs {
  _call: RegisterMarketCall;

  constructor(call: RegisterMarketCall) {
    this._call = call;
  }

  get payoutToken_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get quoteToken_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RegisterMarketCall__Outputs {
  _call: RegisterMarketCall;

  constructor(call: RegisterMarketCall) {
    this._call = call;
  }

  get marketId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class SetAuthorityCall extends ethereum.Call {
  get inputs(): SetAuthorityCall__Inputs {
    return new SetAuthorityCall__Inputs(this);
  }

  get outputs(): SetAuthorityCall__Outputs {
    return new SetAuthorityCall__Outputs(this);
  }
}

export class SetAuthorityCall__Inputs {
  _call: SetAuthorityCall;

  constructor(call: SetAuthorityCall) {
    this._call = call;
  }

  get newAuthority(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetAuthorityCall__Outputs {
  _call: SetAuthorityCall;

  constructor(call: SetAuthorityCall) {
    this._call = call;
  }
}

export class SetOwnerCall extends ethereum.Call {
  get inputs(): SetOwnerCall__Inputs {
    return new SetOwnerCall__Inputs(this);
  }

  get outputs(): SetOwnerCall__Outputs {
    return new SetOwnerCall__Outputs(this);
  }
}

export class SetOwnerCall__Inputs {
  _call: SetOwnerCall;

  constructor(call: SetOwnerCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetOwnerCall__Outputs {
  _call: SetOwnerCall;

  constructor(call: SetOwnerCall) {
    this._call = call;
  }
}