import {combineReducers} from '@reduxjs/toolkit';
import masterReducer from '../../feature/keyManagement/utils/keyManagement.reducer';
import walletReducer from '../../feature/wallet/utils/wallet.reducer';

const rootReducer = combineReducers({
  master: masterReducer,
  wallet: walletReducer,
});

export default rootReducer;
