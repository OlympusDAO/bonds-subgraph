// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  BigDecimal,
  BigInt,
  Bytes,
  Entity,
  store,
  TypedMap,
  Value,
  ValueKind} from "@graphprotocol/graph-ts";

export class BondSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save BondSnapshot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BondSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BondSnapshot", id.toString(), this);
    }
  }

  static load(id: string): BondSnapshot | null {
    return changetype<BondSnapshot | null>(store.get("BondSnapshot", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contractAddress(): Bytes {
    const value = this.get("contractAddress");
    return value!.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get contractId(): BigInt {
    const value = this.get("contractId");
    return value!.toBigInt();
  }

  set contractId(value: BigInt) {
    this.set("contractId", Value.fromBigInt(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get isLive(): boolean {
    const value = this.get("isLive");
    return value!.toBoolean();
  }

  set isLive(value: boolean) {
    this.set("isLive", Value.fromBoolean(value));
  }

  get price(): BigDecimal {
    const value = this.get("price");
    return value!.toBigDecimal();
  }

  set price(value: BigDecimal) {
    this.set("price", Value.fromBigDecimal(value));
  }

  get owner(): Bytes {
    const value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get payoutToken(): Bytes {
    const value = this.get("payoutToken");
    return value!.toBytes();
  }

  set payoutToken(value: Bytes) {
    this.set("payoutToken", Value.fromBytes(value));
  }

  get quoteToken(): Bytes {
    const value = this.get("quoteToken");
    return value!.toBytes();
  }

  set quoteToken(value: Bytes) {
    this.set("quoteToken", Value.fromBytes(value));
  }

  get capacity(): BigDecimal {
    const value = this.get("capacity");
    return value!.toBigDecimal();
  }

  set capacity(value: BigDecimal) {
    this.set("capacity", Value.fromBigDecimal(value));
  }

  get totalDebt(): BigDecimal {
    const value = this.get("totalDebt");
    return value!.toBigDecimal();
  }

  set totalDebt(value: BigDecimal) {
    this.set("totalDebt", Value.fromBigDecimal(value));
  }

  get minPrice(): BigDecimal {
    const value = this.get("minPrice");
    return value!.toBigDecimal();
  }

  set minPrice(value: BigDecimal) {
    this.set("minPrice", Value.fromBigDecimal(value));
  }

  get maxPayout(): BigDecimal {
    const value = this.get("maxPayout");
    return value!.toBigDecimal();
  }

  set maxPayout(value: BigDecimal) {
    this.set("maxPayout", Value.fromBigDecimal(value));
  }

  get sold(): BigDecimal {
    const value = this.get("sold");
    return value!.toBigDecimal();
  }

  set sold(value: BigDecimal) {
    this.set("sold", Value.fromBigDecimal(value));
  }

  get purchased(): BigDecimal {
    const value = this.get("purchased");
    return value!.toBigDecimal();
  }

  set purchased(value: BigDecimal) {
    this.set("purchased", Value.fromBigDecimal(value));
  }

  get tuneIntervalSeconds(): BigInt {
    const value = this.get("tuneIntervalSeconds");
    return value!.toBigInt();
  }

  set tuneIntervalSeconds(value: BigInt) {
    this.set("tuneIntervalSeconds", Value.fromBigInt(value));
  }

  get lastTuneTimestamp(): BigInt {
    const value = this.get("lastTuneTimestamp");
    return value!.toBigInt();
  }

  set lastTuneTimestamp(value: BigInt) {
    this.set("lastTuneTimestamp", Value.fromBigInt(value));
  }

  get lastTuneDate(): string {
    const value = this.get("lastTuneDate");
    return value!.toString();
  }

  set lastTuneDate(value: string) {
    this.set("lastTuneDate", Value.fromString(value));
  }

  get lastTuneSecondsAgo(): BigInt {
    const value = this.get("lastTuneSecondsAgo");
    return value!.toBigInt();
  }

  set lastTuneSecondsAgo(value: BigInt) {
    this.set("lastTuneSecondsAgo", Value.fromBigInt(value));
  }

  get nextTuneInSeconds(): BigInt {
    const value = this.get("nextTuneInSeconds");
    return value!.toBigInt();
  }

  set nextTuneInSeconds(value: BigInt) {
    this.set("nextTuneInSeconds", Value.fromBigInt(value));
  }

  get nextTuneDate(): string {
    const value = this.get("nextTuneDate");
    return value!.toString();
  }

  set nextTuneDate(value: string) {
    this.set("nextTuneDate", Value.fromString(value));
  }

  get debtDecayIntervalSeconds(): BigInt {
    const value = this.get("debtDecayIntervalSeconds");
    return value!.toBigInt();
  }

  set debtDecayIntervalSeconds(value: BigInt) {
    this.set("debtDecayIntervalSeconds", Value.fromBigInt(value));
  }

  get lastDecayTimestamp(): BigInt {
    const value = this.get("lastDecayTimestamp");
    return value!.toBigInt();
  }

  set lastDecayTimestamp(value: BigInt) {
    this.set("lastDecayTimestamp", Value.fromBigInt(value));
  }

  get lastDecayDate(): string {
    const value = this.get("lastDecayDate");
    return value!.toString();
  }

  set lastDecayDate(value: string) {
    this.set("lastDecayDate", Value.fromString(value));
  }

  get lastDecaySecondsAgo(): BigInt {
    const value = this.get("lastDecaySecondsAgo");
    return value!.toBigInt();
  }

  set lastDecaySecondsAgo(value: BigInt) {
    this.set("lastDecaySecondsAgo", Value.fromBigInt(value));
  }

  get nextDecayInSeconds(): BigInt {
    const value = this.get("nextDecayInSeconds");
    return value!.toBigInt();
  }

  set nextDecayInSeconds(value: BigInt) {
    this.set("nextDecayInSeconds", Value.fromBigInt(value));
  }

  get nextDecayDate(): string {
    const value = this.get("nextDecayDate");
    return value!.toString();
  }

  set nextDecayDate(value: string) {
    this.set("nextDecayDate", Value.fromString(value));
  }

  get depositIntervalSeconds(): BigInt {
    const value = this.get("depositIntervalSeconds");
    return value!.toBigInt();
  }

  set depositIntervalSeconds(value: BigInt) {
    this.set("depositIntervalSeconds", Value.fromBigInt(value));
  }

  get tuneAdjustmentDelaySeconds(): BigInt {
    const value = this.get("tuneAdjustmentDelaySeconds");
    return value!.toBigInt();
  }

  set tuneAdjustmentDelaySeconds(value: BigInt) {
    this.set("tuneAdjustmentDelaySeconds", Value.fromBigInt(value));
  }

  get tuneIntervalCapacity(): BigDecimal {
    const value = this.get("tuneIntervalCapacity");
    return value!.toBigDecimal();
  }

  set tuneIntervalCapacity(value: BigDecimal) {
    this.set("tuneIntervalCapacity", Value.fromBigDecimal(value));
  }

  get tuneBelowCapacity(): BigDecimal {
    const value = this.get("tuneBelowCapacity");
    return value!.toBigDecimal();
  }

  set tuneBelowCapacity(value: BigDecimal) {
    this.set("tuneBelowCapacity", Value.fromBigDecimal(value));
  }

  get lastTuneDebt(): BigDecimal {
    const value = this.get("lastTuneDebt");
    return value!.toBigDecimal();
  }

  set lastTuneDebt(value: BigDecimal) {
    this.set("lastTuneDebt", Value.fromBigDecimal(value));
  }
}
