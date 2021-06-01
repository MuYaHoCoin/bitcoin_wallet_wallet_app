import React from 'react';
import {useState} from 'react';
import {Button, Modal, TextInput, View} from 'react-native';
import {handlError} from '../../../common/function/error';
import {addWallet} from '../../database/function/wallets';
import {createChildKey} from '../function/createChild';

const AddWalletModal = ({index, setIndex, visible, onClose}) => {
  const [walletName, setWalletName] = useState('');

  const insertWallet = async () => {
    try {
      const childKey = await createChildKey(index);
      const wallet = {...childKey, walletName: index + 'wallet'};
      addWallet(
        index,
        wallet.walletName,
        wallet.chainCode,
        wallet.publicKey,
        wallet.privateKey,
      );
      setIndex(index + 1);
      onClose();
    } catch (error) {
      handlError('Insert Wallet Error', error);
    }
  };
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View>
        <TextInput
          placeholder={'Enter Wallet Name'}
          value={walletName}
          onChangeText={setWalletName}
          autoFocus
        />
        <Button title={'Add Wallet'} onPress={insertWallet} />
      </View>
    </Modal>
  );
};

export default AddWalletModal;
