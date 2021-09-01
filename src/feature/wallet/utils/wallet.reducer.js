import {createEntityAdapter, createReducer} from '@reduxjs/toolkit';
import {
  addWalletSuccess,
  getWalletListStart,
  getWalletListSuccess,
  getWalletSuccess,
} from './wallet.action';

const walletAdapter = createEntityAdapter({
  selectId: wallet => wallet.walletIndex,
});
const initialState = {
  ...walletAdapter.getInitialState(),
  getWalletListLoading: true,
};

const walletReducer = createReducer(initialState, {
  [getWalletListStart.type]: state => {
    state.getWalletListLoading = true;
  },
  [getWalletListSuccess.type]: (state, action) => {
    const {walletList} = action.payload;
    walletAdapter.addMany(state, walletList);
    state.getWalletListLoading = false;
  },
  [getWalletSuccess.type]: (state, action) => {
    const {wallet} = action.payload;
    walletAdapter.upsertOne(state, {
      ...wallet,
      ...state.entities[wallet.walletIndex],
    });
  },
  [addWalletSuccess.type]: (state, action) => {
    const {wallet} = action.payload;
    walletAdapter.addOne(state, wallet);
  },
});

export default walletReducer;

export const selectWalletIds = state => state.wallet.ids;
export const selectWalletByIndex = id => state => state.wallet.entities[id];
export const selectStandarWalletIndex = state => state.wallet.ids.length;

export const selectGetWalletListLoading = state =>
  state.wallet.getWalletListLoading;
