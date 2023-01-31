import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ExpenseSettled,
  PaymentExpenseCreated
} from "../generated/DeSplit/DeSplit"

export function createExpenseSettledEvent(
  param0: Address,
  param1: Address,
  param2: BigInt,
  param3: BigInt
): ExpenseSettled {
  let expenseSettledEvent = changetype<ExpenseSettled>(newMockEvent())

  expenseSettledEvent.parameters = new Array()

  expenseSettledEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  expenseSettledEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromAddress(param1))
  )
  expenseSettledEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromUnsignedBigInt(param2))
  )
  expenseSettledEvent.parameters.push(
    new ethereum.EventParam("param3", ethereum.Value.fromUnsignedBigInt(param3))
  )

  return expenseSettledEvent
}

export function createPaymentExpenseCreatedEvent(
  param0: Address,
  param1: Address,
  param2: Array<Address>,
  param3: Array<BigInt>,
  param4: BigInt
): PaymentExpenseCreated {
  let paymentExpenseCreatedEvent = changetype<PaymentExpenseCreated>(
    newMockEvent()
  )

  paymentExpenseCreatedEvent.parameters = new Array()

  paymentExpenseCreatedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromAddress(param0))
  )
  paymentExpenseCreatedEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromAddress(param1))
  )
  paymentExpenseCreatedEvent.parameters.push(
    new ethereum.EventParam("param2", ethereum.Value.fromAddressArray(param2))
  )
  paymentExpenseCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "param3",
      ethereum.Value.fromUnsignedBigIntArray(param3)
    )
  )
  paymentExpenseCreatedEvent.parameters.push(
    new ethereum.EventParam("param4", ethereum.Value.fromUnsignedBigInt(param4))
  )

  return paymentExpenseCreatedEvent
}
