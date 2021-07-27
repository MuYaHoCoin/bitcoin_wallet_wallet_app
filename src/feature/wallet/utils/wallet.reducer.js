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
    console.log(state);
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

export const selectWalletIds = walletAdapter.getSelectors(
  state => state.wallet,
).selectIds;
export const selelctWalletByIndex = id => {
  return state => {
    walletAdapter.getSelectors().selectById(state, id);
  };
};
export const selectStandarWalletIndex = state => {
  const ids = state.wallet.ids;
  return ids.filter(id => {
    state.wallet.entities[id].walletType !== 'multiSig';
  }).length;
};
