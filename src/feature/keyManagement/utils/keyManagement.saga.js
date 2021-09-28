import {all, call, put, takeLatest} from 'redux-saga/effects';
import {handleError} from '../../../common/function/error';
import {addMaster, getMaster} from '../../database/function/master';
import {getTransactionListAPI} from '../../transaction/utils/transaction.api';
import {restoreWallet} from '../../wallet/function/restoreWallet';
import {addWalletStart} from '../../wallet/utils/wallet.action';
import {getAddress} from '../function/address';
import {createMasterNode} from '../function/createMasterWallet';
import {
  addMasterNodeStart,
  addMasterNodeSuccess,
  getMasterNodeStart,
  getMasterNodeSuccess,
  restoreWalletStart,
  restoreWalletSuccess,
} from './keyManagement.action';

function* getMasterNodeSaga(action) {
  try {
    const {password} = action.payload;
    const {mnemonic} = yield call(getMaster);
    console.log(mnemonic);
    const masterNode = yield call(createMasterNode, mnemonic, password);
    yield put(getMasterNodeSuccess(masterNode));
  } catch (error) {
    handleError('getMasterSaga Error', error);
  }
}

function* addMasterNodeSaga(action) {
  try {
    const {mnemonic, password} = action.payload;
    yield call(addMaster, mnemonic, password);
    const masterNode = yield call(createMasterNode, mnemonic, password);
    yield put(addMasterNodeSuccess(masterNode));
  } catch (error) {
    handleError('get Master Saga Error', error);
  }
}

function* restoreWalletSaga(action) {
  try {
    const {mnemonic, password} = action.payload;
    yield call(addMaster, mnemonic.join(' '), password);
    const masterNode = yield call(
      createMasterNode,
      mnemonic.join(' '),
      password,
    );
    const index = yield call(restoreWallet, masterNode);
    console.log(index);
    yield put(restoreWalletSuccess(masterNode));
  } catch (error) {}
}

export default function* watchMasterSaga() {
  yield all([
    takeLatest(getMasterNodeStart.type, getMasterNodeSaga),
    takeLatest(addMasterNodeStart.type, addMasterNodeSaga),
    takeLatest(restoreWalletStart.type, restoreWalletSaga),
  ]);
}
