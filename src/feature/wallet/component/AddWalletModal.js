import React, {useState} from 'react';
import {Modal} from 'react-native';

import {addWallet} from '../../database/function/wallets';
import {createChildKey} from '../../keyManagement/function/createChild';
import {getAddress} from '../../keyManagement/function/address';

const AddWalletModal = ({visible, index, pushWallet, onClose}) => {
  const insertWallet = async (walletName, walletType) => {
    await addWallet(index, walletName, walletType);
    const {privateKey, publicKey, chainCode} = await createChildKey(index);
    const address = getAddress(publicKey);
    const wallet = {
      index,
      privateKey,
      publicKey,
      chainCode,
      address,
      walletName,
      walletType,
    };

    pushWallet(wallet);
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose} />
  );
};

export default AddWalletModal;
