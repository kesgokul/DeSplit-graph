import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ExpenseSettled } from "../generated/schema";
import { ExpenseSettled as ExpenseSettledEvent } from "../generated/DeSplit/DeSplit";
import {
  handleExpenseSettled,
  handlePaymentExpenseCreated,
} from "../src/de-split";
import {
  createExpenseSettledEvent,
  createPaymentExpenseCreatedEvent,
} from "./de-split-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let param0 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let param1 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let param2 = BigInt.fromI32(234);
    let param3 = BigInt.fromI32(234);
    let newExpenseSettledEvent = createExpenseSettledEvent(
      param0,
      param1,
      param2,
      param3
    );
    handleExpenseSettled(newExpenseSettledEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExpenseSettled created and stored", () => {
    assert.entityCount("ExpenseSettled", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExpenseSettled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a1",
      "param0",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "ExpenseSettled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a1",
      "param1",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "ExpenseSettled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a1",
      "param2",
      "234"
    );
    assert.fieldEquals(
      "ExpenseSettled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a1",
      "param3",
      "234"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
