import {fork} from 'redux-saga/effects';
import watchMasterSaga from '../../feature/keyManagement/utils/keyManagement.saga';
import watchTransactionSaga from '../../feature/transaction/utils/transaction.saga';
import watchWalletSaga from '../../feature/wallet/utils/wallet.saga';

export default function* rootSaga() {
  yield fork(watchWalletSaga);
  yield fork(watchMasterSaga);
  yield fork(watchTransactionSaga);
}
