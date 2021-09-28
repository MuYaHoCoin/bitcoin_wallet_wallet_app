import {createReducer} from '@reduxjs/toolkit';
import {
  createTransactionFail,
  createTransactionStart,
  createTransactionSuccess,
  getTransactionListStart,
  getTransactionListSuccess,
} from './transaction.action';

const initialState = {
  transactions: [],
  createdTransaction: null,
  transactionListLoading: true,
  createTransactionLoading: true,
  createTransactionFail: false,
};

const reducer = createReducer(initialState, {
  [getTransactionListStart.type]: state => {
    state.transactionListLoading = true;
  },
  [getTransactionListSuccess.type]: (state, action) => {
    const {transactionList} = action.payload;
    state.transactions = transactionList;
  },
  [createTransactionStart.type]: state => {
    state.createTransactionLoading = true;
  },
  [createTransactionSuccess.type]: (state, action) => {
    const {transaction} = action.payload;
    state.createdTransaction = transaction;
    state.createTransactionLoading = false;
    state.createTransactionFail = false;
  },
  [createTransactionFail.type]: state => {
    state.createTransactionLoading = false;
    state.createTransactionFail = true;
  },
});

export default reducer;

export const selectCreateTransactionLoading = state =>
  state.transaction.createTransactionLoading;
export const selectCreateTransactionFail = state =>
  state.transaction.createTransactionFail;
export const selectCreatedTransaction = state =>
  state.transaction.createdTransaction;
