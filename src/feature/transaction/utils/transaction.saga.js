import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {selelctWalletByIndex} from '../../wallet/utils/wallet.reducer';
import signTransaction from '../function/signTransaction';
import {
  createTransactionFail,
  createTransactionStart,
  createTransactionSuccess,
  getTransactionListStart,
  getTransactionListSuccess,
} from './transaction.action';
import {
  broadcastTransaction,
  createUnsignedTransacionAPI,
  getTransactionListAPI,
} from './transaction.api';

function* getTransactionListSaga(action) {
  try {
    const {address} = action.payload;
    const transactionList = yield call(getTransactionListAPI, address);
    yield put(getTransactionListSuccess(transactionList));
  } catch (error) {}
}

function* createTransactionSaga(action) {
  try {
    const {id, address, value} = action.payload;
    const {
      address: senderAddress,
      privateKey,
      publicKey,
    } = yield select(selelctWalletByIndex(id));
    const transaction = yield call(
      createUnsignedTransacionAPI,
      senderAddress,
      address,
      value,
    );
    const transactionHash = yield call(
      signTransaction,
      transaction,
      privateKey,
      publicKey,
    );
    yield call(broadcastTransaction(transactionHash));
    yield put(createTransactionSuccess());
  } catch (error) {
    yield put(createTransactionFail());
  }
}

export default function* watchTransactionSaga() {
  yield all([
    takeLatest(getTransactionListStart.type, getTransactionListSaga),
    takeLatest(createTransactionStart.type, createTransactionSaga),
  ]);
}
