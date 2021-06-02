import React from 'react';
import {useState} from 'react';
import {Button, Modal, TextInput, View} from 'react-native';
import {handlError} from '../../../common/function/error';

const AddWalletModal = ({visible, onClose, addWallet}) => {
  const [walletName, setWalletName] = useState('');

  const insertWallet = () => {
    addWallet(walletName);
    onClose();
    setWalletName('');
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
