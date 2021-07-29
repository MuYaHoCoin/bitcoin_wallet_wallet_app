import {createReducer} from '@reduxjs/toolkit';
import {
  addMasterNodeSuccess,
  getMasterNodeStart,
  getMasterNodeSuccess,
  restoreWalletStart,
  restoreWalletSuccess,
} from './keyManagement.action';

const initialState = {
  masterNode: null,
  restoreLoading: false,
};

const masterReducer = createReducer(initialState, {
  [getMasterNodeSuccess.type]: (state, action) => {
    const {masterNode} = action.payload;
    state.masterNode = masterNode;
  },
  [addMasterNodeSuccess.type]: (state, action) => {
    const {masterNode} = action.payload;
    state.masterNode = masterNode;
  },
  [restoreWalletStart.type]: (state, action) => {
    state.restoreLoading = false;
  },
  [restoreWalletSuccess.type]: (state, action) => {
    const {masterNode} = action.payload;
    state.masterNode = masterNode;
    state.restoreLoading = true;
  },
});

export default masterReducer;
