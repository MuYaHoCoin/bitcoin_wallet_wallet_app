import {createEntityAdapter, createReducer} from '@reduxjs/toolkit';
import {
  addWalletSuccess,
  getWalletListSuccess,
  getWalletSuccess,
} from './wallet.action';

const walletAdapter = createEntityAdapter({
  selectId: wallet => wallet.walletIndex,
});

const walletReducer = createReducer(walletAdapter.getInitialState(), {
  [getWalletListSuccess.type]: (state, action) => {
    const {walletList} = action.payload;
    walletAdapter.addMany(state, walletList);
  },
  [getWalletSuccess.type]: (state, action) => {
    const {wallet} = action.payload;
    walletAdapter.upsertOne(state, wallet);
  },
  [addWalletSuccess.type]: (state, action) => {
    const {wallet} = action.payload;
    walletAdapter.addOne(state, wallet);
  },
});

export default walletReducer;

export const selectWalletIds = state => state.wallet.ids;
export const selelctWalletByIndex = id => state => state.wallet.entities[id];

export const selectStandarWalletIndex = state => state.wallet.ids.length;
