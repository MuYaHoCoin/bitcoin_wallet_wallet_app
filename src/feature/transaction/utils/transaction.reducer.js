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
  transactionListLoading: false,
  createTransactionLoading: false,
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
  [createTransactionSuccess.type]: state => {
    state.createTransactionLoading = false;
  },
  [createTransactionFail.type]: state => {
    state.createTransactionLoading = true;
  },
});

export default reducer;
