import {all, call, put, takeLatest} from 'redux-saga/effects';
import {select} from 'redux-saga/effects';
import {handleError} from '../../../common/function/error';
import {addWallet, getWallets} from '../../database/function/wallets';
import {getAddress} from '../../keyManagement/function/address';
import {selectMasterNode} from '../../keyManagement/utils/keyManagemeny.selector';
import {
  addWalletStart,
  addWalletSuccess,
  getWalletListStart,
  getWalletListSuccess,
  getWalletStart,
  getWalletSuccess,
} from './wallet.action';
import {selectStandarWalletIndex} from './wallet.reducer';

function* getWalletListSaga() {
  try {
    const walletInfoList = yield call(getWallets);
    yield put(getWalletListSuccess(walletInfoList));
  } catch (error) {
    handleError('Get Wallet List Saga Error!!', error);
  }
}

function* getWalletSaga(action) {
  try {
    const {walletIndex} = action.payload;
    const masterNode = yield select(selectMasterNode);
    const {privateKey, publicKey, chainCode} = yield masterNode.derivePath(
      `m/44'/61'/0'/0/${walletIndex}`,
    );
    const address = yield call(getAddress, publicKey.toString('hex'));
    const wallet = {
      walletIndex,
      privateKey: privateKey.toString('hex'),
      publicKey: publicKey.toString('hex'),
      chainCode: chainCode.toString('hex'),
      address,
    };
    console.log(wallet);
    yield put(getWalletSuccess(wallet));
  } catch (error) {
    handleError('Get Wallet Error', error);
  }
}

function* addWalletSaga(action) {
  try {
    const {walletType, walletName} = action.payload;
    const walletIndex = yield select(selectStandarWalletIndex);
    const masterNode = yield select(selectMasterNode);
    const {privateKey, publicKey, chainCode} = yield masterNode.derivePath(
      `m/44'/61'/0'/0/${walletIndex}`,
    );
    const address = yield call(getAddress, publicKey);
    yield call(addWallet, walletIndex, walletName, walletType, address);
    const wallet = {
      walletType,
      walletName,
      walletIndex,
      privateKey,
      publicKey,
      chainCode,
      address,
    };
    yield put(addWalletSuccess(wallet));
  } catch (error) {
    handleError('Add Wallet Saga Error', error);
  }
}

export default function* watchWalletSaga() {
  yield all([
    takeLatest(getWalletListStart.type, getWalletListSaga),
    takeLatest(getWalletStart.type, getWalletSaga),
    takeLatest(addWalletStart.type, addWalletSaga),
  ]);
}
