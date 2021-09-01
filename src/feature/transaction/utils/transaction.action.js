import {createAction} from '@reduxjs/toolkit';

export const getTransactionListStart = createAction(
  'transaction/getTransactionListStart',
  address => {
    return {payload: {address}};
  },
);

export const getTransactionListSuccess = createAction(
  'transaction/getTransactionListSuccess',
  transactionList => {
    return {payload: {transactionList}};
  },
);

export const createTransactionStart = createAction(
  'transaction/createTransactionStart',
  (id, address, value) => {
    return {payload: {id, address, value}};
  },
);

export const createTransactionSuccess = createAction(
  'transaction/createTransactionSuccess',
);

export const createTransactionFail = createAction(
  'transaction/createTransactionFail',
);
