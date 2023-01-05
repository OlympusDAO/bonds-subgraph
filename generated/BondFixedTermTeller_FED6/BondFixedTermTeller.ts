// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  BigInt,
  Bytes,
  Entity,
  ethereum,
  JSONValue,
  TypedMap} from "@graphprotocol/graph-ts";

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

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

export class Bonded extends ethereum.Event {
  get params(): Bonded__Params {
    return new Bonded__Params(this);
  }
}

export class Bonded__Params {
  _event: Bonded;

  constructor(event: Bonded) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get referrer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get payout(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class ERC1155BondTokenCreated extends ethereum.Event {
  get params(): ERC1155BondTokenCreated__Params {
    return new ERC1155BondTokenCreated__Params(this);
  }
}

export class ERC1155BondTokenCreated__Params {
  _event: ERC1155BondTokenCreated;

  constructor(event: ERC1155BondTokenCreated) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get underlying(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get expiry(): BigInt {
    return this._event.parameters[2].value.toBigInt();
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

export class TransferBatch extends ethereum.Event {
  get params(): TransferBatch__Params {
    return new TransferBatch__Params(this);
  }
}

export class TransferBatch__Params {
  _event: TransferBatch;

  constructor(event: TransferBatch) {
    this._event = event;
  }

  get operator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._event.parameters[3].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._event.parameters[4].value.toBigIntArray();
  }
}

export class TransferSingle extends ethereum.Event {
  get params(): TransferSingle__Params {
    return new TransferSingle__Params(this);
  }
}

export class TransferSingle__Params {
  _event: TransferSingle;

  constructor(event: TransferSingle) {
    this._event = event;
  }

  get operator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class BondFixedTermTeller__createResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }
}

export class BondFixedTermTeller__getTokenNameAndSymbolResult {
  value0: string;
  value1: string;

  constructor(value0: string, value1: string) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    return map;
  }

  getValue0(): string {
    return this.value0;
  }

  getValue1(): string {
    return this.value1;
  }
}

export class BondFixedTermTeller__purchaseResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }
}

export class BondFixedTermTeller__tokenMetadataResult {
  value0: boolean;
  value1: Address;
  value2: i32;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: boolean,
    value1: Address,
    value2: i32,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2))
    );
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getActive(): boolean {
    return this.value0;
  }

  getUnderlying(): Address {
    return this.value1;
  }

  getDecimals(): i32 {
    return this.value2;
  }

  getExpiry(): BigInt {
    return this.value3;
  }

  getSupply(): BigInt {
    return this.value4;
  }
}

export class BondFixedTermTeller extends ethereum.SmartContract {
  static bind(address: Address): BondFixedTermTeller {
    return new BondFixedTermTeller("BondFixedTermTeller", address);
  }

  FEE_DECIMALS(): BigInt {
    const result = super.call("FEE_DECIMALS", "FEE_DECIMALS():(uint48)", []);

    return result[0].toBigInt();
  }

  try_FEE_DECIMALS(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("FEE_DECIMALS", "FEE_DECIMALS():(uint48)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  balanceOf(param0: Address, param1: BigInt): BigInt {
    const result = super.call(
      "balanceOf",
      "balanceOf(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_balanceOf(param0: Address, param1: BigInt): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "balanceOf",
      "balanceOf(address,uint256):(uint256)",
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

  balanceOfBatch(owners: Array<Address>, ids: Array<BigInt>): Array<BigInt> {
    const result = super.call(
      "balanceOfBatch",
      "balanceOfBatch(address[],uint256[]):(uint256[])",
      [
        ethereum.Value.fromAddressArray(owners),
        ethereum.Value.fromUnsignedBigIntArray(ids)
      ]
    );

    return result[0].toBigIntArray();
  }

  try_balanceOfBatch(
    owners: Array<Address>,
    ids: Array<BigInt>
  ): ethereum.CallResult<Array<BigInt>> {
    const result = super.tryCall(
      "balanceOfBatch",
      "balanceOfBatch(address[],uint256[]):(uint256[])",
      [
        ethereum.Value.fromAddressArray(owners),
        ethereum.Value.fromUnsignedBigIntArray(ids)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  create(
    underlying_: Address,
    expiry_: BigInt,
    amount_: BigInt
  ): BondFixedTermTeller__createResult {
    const result = super.call(
      "create",
      "create(address,uint48,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(underlying_),
        ethereum.Value.fromUnsignedBigInt(expiry_),
        ethereum.Value.fromUnsignedBigInt(amount_)
      ]
    );

    return new BondFixedTermTeller__createResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_create(
    underlying_: Address,
    expiry_: BigInt,
    amount_: BigInt
  ): ethereum.CallResult<BondFixedTermTeller__createResult> {
    const result = super.tryCall(
      "create",
      "create(address,uint48,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(underlying_),
        ethereum.Value.fromUnsignedBigInt(expiry_),
        ethereum.Value.fromUnsignedBigInt(amount_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new BondFixedTermTeller__createResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  createFeeDiscount(): BigInt {
    const result = super.call(
      "createFeeDiscount",
      "createFeeDiscount():(uint48)",
      []
    );

    return result[0].toBigInt();
  }

  try_createFeeDiscount(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "createFeeDiscount",
      "createFeeDiscount():(uint48)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  deploy(underlying_: Address, expiry_: BigInt): BigInt {
    const result = super.call("deploy", "deploy(address,uint48):(uint256)", [
      ethereum.Value.fromAddress(underlying_),
      ethereum.Value.fromUnsignedBigInt(expiry_)
    ]);

    return result[0].toBigInt();
  }

  try_deploy(
    underlying_: Address,
    expiry_: BigInt
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall("deploy", "deploy(address,uint48):(uint256)", [
      ethereum.Value.fromAddress(underlying_),
      ethereum.Value.fromUnsignedBigInt(expiry_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getFee(referrer_: Address): BigInt {
    const result = super.call("getFee", "getFee(address):(uint48)", [
      ethereum.Value.fromAddress(referrer_)
    ]);

    return result[0].toBigInt();
  }

  try_getFee(referrer_: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall("getFee", "getFee(address):(uint48)", [
      ethereum.Value.fromAddress(referrer_)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenId(underlying_: Address, expiry_: BigInt): BigInt {
    const result = super.call(
      "getTokenId",
      "getTokenId(address,uint48):(uint256)",
      [
        ethereum.Value.fromAddress(underlying_),
        ethereum.Value.fromUnsignedBigInt(expiry_)
      ]
    );

    return result[0].toBigInt();
  }

  try_getTokenId(
    underlying_: Address,
    expiry_: BigInt
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "getTokenId",
      "getTokenId(address,uint48):(uint256)",
      [
        ethereum.Value.fromAddress(underlying_),
        ethereum.Value.fromUnsignedBigInt(expiry_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTokenNameAndSymbol(
    tokenId_: BigInt
  ): BondFixedTermTeller__getTokenNameAndSymbolResult {
    const result = super.call(
      "getTokenNameAndSymbol",
      "getTokenNameAndSymbol(uint256):(string,string)",
      [ethereum.Value.fromUnsignedBigInt(tokenId_)]
    );

    return new BondFixedTermTeller__getTokenNameAndSymbolResult(
      result[0].toString(),
      result[1].toString()
    );
  }

  try_getTokenNameAndSymbol(
    tokenId_: BigInt
  ): ethereum.CallResult<BondFixedTermTeller__getTokenNameAndSymbolResult> {
    const result = super.tryCall(
      "getTokenNameAndSymbol",
      "getTokenNameAndSymbol(uint256):(string,string)",
      [ethereum.Value.fromUnsignedBigInt(tokenId_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new BondFixedTermTeller__getTokenNameAndSymbolResult(
        value[0].toString(),
        value[1].toString()
      )
    );
  }

  isApprovedForAll(param0: Address, param1: Address): boolean {
    const result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
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

  protocolFee(): BigInt {
    const result = super.call("protocolFee", "protocolFee():(uint48)", []);

    return result[0].toBigInt();
  }

  try_protocolFee(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("protocolFee", "protocolFee():(uint48)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  purchase(
    recipient_: Address,
    referrer_: Address,
    id_: BigInt,
    amount_: BigInt,
    minAmountOut_: BigInt
  ): BondFixedTermTeller__purchaseResult {
    const result = super.call(
      "purchase",
      "purchase(address,address,uint256,uint256,uint256):(uint256,uint48)",
      [
        ethereum.Value.fromAddress(recipient_),
        ethereum.Value.fromAddress(referrer_),
        ethereum.Value.fromUnsignedBigInt(id_),
        ethereum.Value.fromUnsignedBigInt(amount_),
        ethereum.Value.fromUnsignedBigInt(minAmountOut_)
      ]
    );

    return new BondFixedTermTeller__purchaseResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_purchase(
    recipient_: Address,
    referrer_: Address,
    id_: BigInt,
    amount_: BigInt,
    minAmountOut_: BigInt
  ): ethereum.CallResult<BondFixedTermTeller__purchaseResult> {
    const result = super.tryCall(
      "purchase",
      "purchase(address,address,uint256,uint256,uint256):(uint256,uint48)",
      [
        ethereum.Value.fromAddress(recipient_),
        ethereum.Value.fromAddress(referrer_),
        ethereum.Value.fromUnsignedBigInt(id_),
        ethereum.Value.fromUnsignedBigInt(amount_),
        ethereum.Value.fromUnsignedBigInt(minAmountOut_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new BondFixedTermTeller__purchaseResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  referrerFees(param0: Address): BigInt {
    const result = super.call("referrerFees", "referrerFees(address):(uint48)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_referrerFees(param0: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "referrerFees",
      "referrerFees(address):(uint48)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewards(param0: Address, param1: Address): BigInt {
    const result = super.call("rewards", "rewards(address,address):(uint256)", [
      ethereum.Value.fromAddress(param0),
      ethereum.Value.fromAddress(param1)
    ]);

    return result[0].toBigInt();
  }

  try_rewards(param0: Address, param1: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "rewards",
      "rewards(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    const result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  tokenMetadata(param0: BigInt): BondFixedTermTeller__tokenMetadataResult {
    const result = super.call(
      "tokenMetadata",
      "tokenMetadata(uint256):(bool,address,uint8,uint48,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new BondFixedTermTeller__tokenMetadataResult(
      result[0].toBoolean(),
      result[1].toAddress(),
      result[2].toI32(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_tokenMetadata(
    param0: BigInt
  ): ethereum.CallResult<BondFixedTermTeller__tokenMetadataResult> {
    const result = super.tryCall(
      "tokenMetadata",
      "tokenMetadata(uint256):(bool,address,uint8,uint48,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new BondFixedTermTeller__tokenMetadataResult(
        value[0].toBoolean(),
        value[1].toAddress(),
        value[2].toI32(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
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

  get protocol_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get aggregator_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get guardian_(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get authority_(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class BatchRedeemCall extends ethereum.Call {
  get inputs(): BatchRedeemCall__Inputs {
    return new BatchRedeemCall__Inputs(this);
  }

  get outputs(): BatchRedeemCall__Outputs {
    return new BatchRedeemCall__Outputs(this);
  }
}

export class BatchRedeemCall__Inputs {
  _call: BatchRedeemCall;

  constructor(call: BatchRedeemCall) {
    this._call = call;
  }

  get tokenIds_(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get amounts_(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class BatchRedeemCall__Outputs {
  _call: BatchRedeemCall;

  constructor(call: BatchRedeemCall) {
    this._call = call;
  }
}

export class ClaimFeesCall extends ethereum.Call {
  get inputs(): ClaimFeesCall__Inputs {
    return new ClaimFeesCall__Inputs(this);
  }

  get outputs(): ClaimFeesCall__Outputs {
    return new ClaimFeesCall__Outputs(this);
  }
}

export class ClaimFeesCall__Inputs {
  _call: ClaimFeesCall;

  constructor(call: ClaimFeesCall) {
    this._call = call;
  }

  get tokens_(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get to_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ClaimFeesCall__Outputs {
  _call: ClaimFeesCall;

  constructor(call: ClaimFeesCall) {
    this._call = call;
  }
}

export class CreateCall extends ethereum.Call {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get underlying_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get expiry_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get amount_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get value1(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class DeployCall extends ethereum.Call {
  get inputs(): DeployCall__Inputs {
    return new DeployCall__Inputs(this);
  }

  get outputs(): DeployCall__Outputs {
    return new DeployCall__Outputs(this);
  }
}

export class DeployCall__Inputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
    this._call = call;
  }

  get underlying_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get expiry_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DeployCall__Outputs {
  _call: DeployCall;

  constructor(call: DeployCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class PurchaseCall extends ethereum.Call {
  get inputs(): PurchaseCall__Inputs {
    return new PurchaseCall__Inputs(this);
  }

  get outputs(): PurchaseCall__Outputs {
    return new PurchaseCall__Outputs(this);
  }
}

export class PurchaseCall__Inputs {
  _call: PurchaseCall;

  constructor(call: PurchaseCall) {
    this._call = call;
  }

  get recipient_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get referrer_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get id_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get amount_(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get minAmountOut_(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class PurchaseCall__Outputs {
  _call: PurchaseCall;

  constructor(call: PurchaseCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get value1(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class RedeemCall extends ethereum.Call {
  get inputs(): RedeemCall__Inputs {
    return new RedeemCall__Inputs(this);
  }

  get outputs(): RedeemCall__Outputs {
    return new RedeemCall__Outputs(this);
  }
}

export class RedeemCall__Inputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }

  get tokenId_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amount_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RedeemCall__Outputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }
}

export class SafeBatchTransferFromCall extends ethereum.Call {
  get inputs(): SafeBatchTransferFromCall__Inputs {
    return new SafeBatchTransferFromCall__Inputs(this);
  }

  get outputs(): SafeBatchTransferFromCall__Outputs {
    return new SafeBatchTransferFromCall__Outputs(this);
  }
}

export class SafeBatchTransferFromCall__Inputs {
  _call: SafeBatchTransferFromCall;

  constructor(call: SafeBatchTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get ids(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }

  get data(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class SafeBatchTransferFromCall__Outputs {
  _call: SafeBatchTransferFromCall;

  constructor(call: SafeBatchTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get id(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
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

export class SetCreateFeeDiscountCall extends ethereum.Call {
  get inputs(): SetCreateFeeDiscountCall__Inputs {
    return new SetCreateFeeDiscountCall__Inputs(this);
  }

  get outputs(): SetCreateFeeDiscountCall__Outputs {
    return new SetCreateFeeDiscountCall__Outputs(this);
  }
}

export class SetCreateFeeDiscountCall__Inputs {
  _call: SetCreateFeeDiscountCall;

  constructor(call: SetCreateFeeDiscountCall) {
    this._call = call;
  }

  get discount_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetCreateFeeDiscountCall__Outputs {
  _call: SetCreateFeeDiscountCall;

  constructor(call: SetCreateFeeDiscountCall) {
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

export class SetProtocolFeeCall extends ethereum.Call {
  get inputs(): SetProtocolFeeCall__Inputs {
    return new SetProtocolFeeCall__Inputs(this);
  }

  get outputs(): SetProtocolFeeCall__Outputs {
    return new SetProtocolFeeCall__Outputs(this);
  }
}

export class SetProtocolFeeCall__Inputs {
  _call: SetProtocolFeeCall;

  constructor(call: SetProtocolFeeCall) {
    this._call = call;
  }

  get fee_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetProtocolFeeCall__Outputs {
  _call: SetProtocolFeeCall;

  constructor(call: SetProtocolFeeCall) {
    this._call = call;
  }
}

export class SetReferrerFeeCall extends ethereum.Call {
  get inputs(): SetReferrerFeeCall__Inputs {
    return new SetReferrerFeeCall__Inputs(this);
  }

  get outputs(): SetReferrerFeeCall__Outputs {
    return new SetReferrerFeeCall__Outputs(this);
  }
}

export class SetReferrerFeeCall__Inputs {
  _call: SetReferrerFeeCall;

  constructor(call: SetReferrerFeeCall) {
    this._call = call;
  }

  get fee_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetReferrerFeeCall__Outputs {
  _call: SetReferrerFeeCall;

  constructor(call: SetReferrerFeeCall) {
    this._call = call;
  }
}