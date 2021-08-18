import {createAction} from '@reduxjs/toolkit';

export const getWalletListStart = createAction(
  'wallet/getWalletListStart',
  () => {
    return {payload: null};
  },
);
export const getWalletListSuccess = createAction(
  'wallet/getWalletListSuccess',
  walletList => {
    return {payload: {walletList}};
  },
);

export const getWalletStart = createAction(
  'wallet/getWalletStart',
  walletIndex => {
    return {payload: {walletIndex}};
  },
);
export const getWalletSuccess = createAction(
  'wallet/getWalletSuccess',
  wallet => {
    return {payload: {wallet}};
  },
);

export const addWalletStart = createAction(
  'wallet/addWalletStart',
  walletName => {
    return {payload: {walletName}};
  },
);
export const addWalletSuccess = createAction(
  'wallet/addWalletSuccess',
  wallet => {
    return {payload: {wallet}};
  },
);
