import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {handleError} from '../../../common/function/error';
import {selectWalletByIndex} from '../../wallet/utils/wallet.reducer';
import signTransaction from '../function/signTransaction';
import {
  createTransactionFail,
  createTransactionStart,
  createTransactionSuccess,
  getTransactionListStart,
  getTransactionListSuccess,
} from './transaction.action';
import {
  createUnsignedTransacionAPI,
  getTransactionListAPI,
  sendTransactionAPI,
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
    } = yield select(selectWalletByIndex(id));
    console.log(senderAddress, address, value);
    const unsignedTransaction = yield call(
      createUnsignedTransacionAPI,
      senderAddress,
      address,
      value,
    );
    const signedTransaction = yield call(
      signTransaction,
      unsignedTransaction,
      privateKey,
      publicKey,
    );

    const {tx} = yield call(sendTransactionAPI, signedTransaction);
    yield put(createTransactionSuccess(tx));
  } catch (error) {
    handleError('Create Transaction Saga Error : ', error);
    yield put(createTransactionFail());
  }
}

export default function* watchTransactionSaga() {
  yield all([
    takeLatest(getTransactionListStart.type, getTransactionListSaga),
    takeLatest(createTransactionStart.type, createTransactionSaga),
  ]);
}
