const {createAction} = require('@reduxjs/toolkit');

export const getMasterNodeStart = createAction(
  'keyManagement/getMasterNodeStart',
  password => {
    return {payload: {password}};
  },
);
export const getMasterNodeSuccess = createAction(
  'keyManagement/getMasterNodeSuccess',
  masterNode => {
    return {payload: {masterNode}};
  },
);

export const addMasterNodeStart = createAction(
  'keyManagement/addMasterNodeStart',
  (mnemonic, password) => {
    return {payload: {mnemonic, password}};
  },
);
export const addMasterNodeSuccess = createAction(
  'keyManagement/addMasterNodeSuccess',
  masterNode => {
    return {payload: {masterNode}};
  },
);

export const restoreWalletStart = createAction(
  'keyManagement/restoreWalletStart',
  (mnemonic, password) => {
    return {payload: {mnemonic, password}};
  },
);
export const restoreWalletSuccess = createAction(
  'keyManagement/restoreWalletSuccess',
  masterNode => {
    return {payload: {masterNode}};
  },
);
