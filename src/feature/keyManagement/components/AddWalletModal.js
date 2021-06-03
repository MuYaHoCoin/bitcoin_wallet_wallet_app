import React from 'react';
import {useState} from 'react';
import {Button, ImageBackground, Modal, TextInput} from 'react-native';
import {commonStyle} from '../../../common/style/commonStyle';

const AddWalletModal = ({visible, onClose, addWallet}) => {
  const [walletName, setWalletName] = useState('');

  const insertWallet = () => {
    addWallet(walletName);
    onClose();
    setWalletName('');
  };
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <ImageBackground
        source={require('../../../common/image/bitcoinBackground.png')}
        style={{...commonStyle.background}}>
        <TextInput
          placeholder={'Enter Wallet Name'}
          value={walletName}
          onChangeText={setWalletName}
          autoFocus
        />
        <Button title={'Add Wallet'} onPress={insertWallet} />
      </ImageBackground>
    </Modal>
  );
};

export default AddWalletModal;
