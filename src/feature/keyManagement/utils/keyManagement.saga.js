import {all, call, put, takeLatest} from 'redux-saga/effects';
import {handleError} from '../../../common/function/error';
import {
  addMaster,
  CheckPassword,
  getMaster,
} from '../../database/function/master';
import {getTransactionList} from '../../transaction/function/transactionFunction';
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
  } catch (error) {}
}

function* restoreWalletSaga(action) {
  try {
    const {mnemonic, password} = action.payload;
    yield call(addMaster, mnemonic, password);
    const masterNode = yield call(createMasterNode, mnemonic, password);
    let index = 0;
    while (1) {
      const {publicKey} = masterNode.derivePath(`m/44'/61'/0'/0/${index}`);
      const address = getAddress(publicKey, 'bitcoinTestNet');
      const transactions = yield call(
        getTransactionList,
        address,
        'bitcoinTestNet',
      );
      if (transactions.length) {
        yield put(addWalletStart(`wallet_${index}`, 'standard'));
      } else {
        break;
      }
      index = index + 1;
    }
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
