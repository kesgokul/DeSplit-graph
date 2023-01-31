import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  ExpenseSettled as ExpenseSettledEvent,
  PaymentExpenseCreated as PaymentExpenseCreatedEvent,
} from "../generated/DeSplit/DeSplit";
import {
  ExpenseSettled,
  PaymentExpenseCreated,
  ActiveExpense,
} from "../generated/schema";

export function handleExpenseSettled(event: ExpenseSettledEvent): void {
  // Id with payer + expenseIndex to get the ActiveExpense
  const expenseId = getIdFromParams(event.params.param1, event.params.param2);
  let activeExpense = ActiveExpense.load(expenseId);

  // will calculate the Id from the recipienAddress + expenseIndex
  const id: string = getIdFromParams(event.params.param1, event.params.param2);
  let settledExpense = ExpenseSettled.load(id);

  if (!settledExpense) {
    settledExpense = new ExpenseSettled(id);
  }

  if (activeExpense) {
    // Getting the index of the address settling the expense from the expense's splitBy array.
    const settlerIndex = activeExpense.splitBy.indexOf(event.params.param0);

    // set the splitAmount of the settler to 0
    let splitAmounts: BigInt[] = activeExpense.splitAmounts;
    splitAmounts[settlerIndex] = new BigInt(0);
    activeExpense.splitAmounts = splitAmounts;

    activeExpense.save();
  }

  settledExpense.settler = event.params.param0;
  settledExpense.payer = event.params.param1;
  settledExpense.expenseIndex = event.params.param2;
  settledExpense.splitAmount = event.params.param3;
  settledExpense.blockTimestamp = event.block.timestamp;
  settledExpense.transactionHash = event.transaction.hash;

  settledExpense.save();
}

export function handlePaymentExpenseCreated(
  event: PaymentExpenseCreatedEvent
): void {
  const id: string = getIdFromParams(event.params.param0, event.params.param4);
  let activeExpense = ActiveExpense.load(id);
  let newExpense = new PaymentExpenseCreated(id);

  if (!activeExpense) {
    activeExpense = new ActiveExpense(id);
  }

  newExpense.payer = event.params.param0;
  activeExpense.payer = event.params.param0;

  newExpense.to = event.params.param1;
  activeExpense.to = event.params.param1;

  const splitAddresses = event.params.param2.map<Bytes>(
    (address: Bytes) => address
  );
  newExpense.splitBy = splitAddresses;
  activeExpense.splitBy = changetype<Bytes[]>(event.params.param2);

  newExpense.splitAmounts = event.params.param3;
  activeExpense.splitAmounts = event.params.param3;

  newExpense.expenseIndex = event.params.param4;
  activeExpense.expenseIndex = event.params.param4;

  newExpense.blockTimestamp = event.block.timestamp;
  activeExpense.blockTimestamp = event.block.timestamp;

  newExpense.transactionHash = event.transaction.hash;
  activeExpense.transactionHash = event.transaction.hash;

  newExpense.save();
  activeExpense.save();
}

function getIdFromParams(payer: Address, expenseIndex: BigInt): string {
  return payer.toHexString() + expenseIndex.toHexString();
}
