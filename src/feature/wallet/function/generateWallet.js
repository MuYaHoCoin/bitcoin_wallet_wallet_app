import {createChildKey} from '../../keyManagement/function/createChild';

export async function generateWalletFromInfo(walletInfo) {
  const {walletIndex, walletName, walletType, address} = walletInfo;
  const {privatieKey, publicKey, chaincode} = await createChildKey(walletIndex);
  return {
    walletName,
    walletType,
    privatieKey,
    publicKey,
    chaincode,
    address,
    walletIndex,
  };
}
