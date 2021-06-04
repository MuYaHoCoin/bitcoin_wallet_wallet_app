import React from 'react';
import {useState} from 'react';
import {
  Button,
  ImageBackground,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import {commonStyle} from '../../../common/style/commonStyle';
import {okButtonStyle, okButtonTextStyle} from '../style/style';

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
        <MainLogo />
        <TextInput
          placeholder={'Enter Wallet Name'}
          value={walletName}
          onChangeText={setWalletName}
          style={commonStyle.input}
          autoFocus
        />
        <TouchableOpacity style={okButtonStyle} onPress={insertWallet}>
          <Text style={okButtonTextStyle}>지갑 생성하기</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
};

export default AddWalletModal;
