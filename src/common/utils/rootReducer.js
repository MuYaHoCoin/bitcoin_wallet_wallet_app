import {combineReducers} from '@reduxjs/toolkit';
import masterReducer from '../../feature/keyManagement/utils/keyManagement.reducer';
import walletReducer from '../../feature/wallet/utils/wallet.reducer';
import transactionReducer from '../../feature/transaction/utils/transaction.reducer';

const rootReducer = combineReducers({
  master: masterReducer,
  wallet: walletReducer,
  transaction: transactionReducer,
});

export default rootReducer;
