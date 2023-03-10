// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ActiveExpense extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ActiveExpense entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ActiveExpense must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ActiveExpense", id.toString(), this);
    }
  }

  static load(id: string): ActiveExpense | null {
    return changetype<ActiveExpense | null>(store.get("ActiveExpense", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get payer(): Bytes {
    let value = this.get("payer");
    return value!.toBytes();
  }

  set payer(value: Bytes) {
    this.set("payer", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get splitBy(): Array<Bytes> {
    let value = this.get("splitBy");
    return value!.toBytesArray();
  }

  set splitBy(value: Array<Bytes>) {
    this.set("splitBy", Value.fromBytesArray(value));
  }

  get splitAmounts(): Array<BigInt> {
    let value = this.get("splitAmounts");
    return value!.toBigIntArray();
  }

  set splitAmounts(value: Array<BigInt>) {
    this.set("splitAmounts", Value.fromBigIntArray(value));
  }

  get expenseIndex(): BigInt {
    let value = this.get("expenseIndex");
    return value!.toBigInt();
  }

  set expenseIndex(value: BigInt) {
    this.set("expenseIndex", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class ExpenseSettled extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ExpenseSettled entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ExpenseSettled must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ExpenseSettled", id.toString(), this);
    }
  }

  static load(id: string): ExpenseSettled | null {
    return changetype<ExpenseSettled | null>(store.get("ExpenseSettled", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get settler(): Bytes {
    let value = this.get("settler");
    return value!.toBytes();
  }

  set settler(value: Bytes) {
    this.set("settler", Value.fromBytes(value));
  }

  get payer(): Bytes {
    let value = this.get("payer");
    return value!.toBytes();
  }

  set payer(value: Bytes) {
    this.set("payer", Value.fromBytes(value));
  }

  get expenseIndex(): BigInt {
    let value = this.get("expenseIndex");
    return value!.toBigInt();
  }

  set expenseIndex(value: BigInt) {
    this.set("expenseIndex", Value.fromBigInt(value));
  }

  get splitAmount(): BigInt {
    let value = this.get("splitAmount");
    return value!.toBigInt();
  }

  set splitAmount(value: BigInt) {
    this.set("splitAmount", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class PaymentExpenseCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save PaymentExpenseCreated entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PaymentExpenseCreated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PaymentExpenseCreated", id.toString(), this);
    }
  }

  static load(id: string): PaymentExpenseCreated | null {
    return changetype<PaymentExpenseCreated | null>(
      store.get("PaymentExpenseCreated", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get payer(): Bytes {
    let value = this.get("payer");
    return value!.toBytes();
  }

  set payer(value: Bytes) {
    this.set("payer", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get splitBy(): Array<Bytes> {
    let value = this.get("splitBy");
    return value!.toBytesArray();
  }

  set splitBy(value: Array<Bytes>) {
    this.set("splitBy", Value.fromBytesArray(value));
  }

  get splitAmounts(): Array<BigInt> {
    let value = this.get("splitAmounts");
    return value!.toBigIntArray();
  }

  set splitAmounts(value: Array<BigInt>) {
    this.set("splitAmounts", Value.fromBigIntArray(value));
  }

  get expenseIndex(): BigInt {
    let value = this.get("expenseIndex");
    return value!.toBigInt();
  }

  set expenseIndex(value: BigInt) {
    this.set("expenseIndex", Value.fromBigInt(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}
