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
  const expenseId = getIdFromParams(
    event.params.payer,
    event.params.expenseIndex
  );
  let activeExpense = ActiveExpense.load(expenseId);

  // will calculate the Id from the recipienAddress + expenseIndex
  const id: string = getIdFromParams(
    event.params.settler,
    event.params.expenseIndex
  );
  let settledExpense = ExpenseSettled.load(id);

  if (!settledExpense) {
    settledExpense = new ExpenseSettled(id);
  }

  if (activeExpense) {
    // Getting the index of the address settling the expense from the expense's splitBy array.
    const settlerIndex = activeExpense.splitBy.indexOf(event.params.settler);

    // set the splitAmount of the settler to 0
    let splitAmounts: BigInt[] = activeExpense.splitAmounts;
    splitAmounts[settlerIndex] = new BigInt(0);
    activeExpense.splitAmounts = splitAmounts;

    activeExpense.save();
  }

  settledExpense.settler = event.params.settler;
  settledExpense.payer = event.params.payer;
  settledExpense.expenseIndex = event.params.expenseIndex;
  settledExpense.splitAmount = event.params.splitAmount;
  settledExpense.blockTimestamp = event.block.timestamp;
  settledExpense.transactionHash = event.transaction.hash;

  settledExpense.save();
}

export function handlePaymentExpenseCreated(
  event: PaymentExpenseCreatedEvent
): void {
  const id: string = getIdFromParams(
    event.params.payer,
    event.params.expenseIndex
  );
  let activeExpense = ActiveExpense.load(id);
  let newExpense = new PaymentExpenseCreated(id);

  if (!activeExpense) {
    activeExpense = new ActiveExpense(id);
  }

  newExpense.payer = event.params.payer;
  activeExpense.payer = event.params.payer;

  newExpense.to = event.params.to;
  activeExpense.to = event.params.to;

  // two different methods of assinging type Address[] to type Bytes[]
  const splitAddresses = event.params.splitBy.map<Bytes>(
    (address: Bytes) => address
  );
  newExpense.splitBy = splitAddresses;
  activeExpense.splitBy = changetype<Bytes[]>(event.params.splitBy);

  newExpense.splitAmounts = event.params.splitAmounts;
  activeExpense.splitAmounts = event.params.splitAmounts;

  newExpense.expenseIndex = event.params.expenseIndex;
  activeExpense.expenseIndex = event.params.expenseIndex;

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
