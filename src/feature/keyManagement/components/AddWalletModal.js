import React from 'react';
import {useState} from 'react';
import {Modal, TextInput, View} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import {commonStyle} from '../../../common/style/commonStyle';
import {okButtonStyle, okButtonTextStyle} from '../style/style';
import WalletTypeCheckBox from './WalletTypeCheckBox';

const AddWalletModal = ({visible, onClose, addWallet}) => {
  const [walletName, setWalletName] = useState('');
  const [walletType, setWalletType] = useState('standard');

  const insertWallet = () => {
    addWallet(walletName, walletType);
    onClose();
    setWalletName('');
  };
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={{...commonStyle.background}}>
        <MainLogo />
        <TextInput
          placeholder={'Enter Wallet Name'}
          value={walletName}
          onChangeText={setWalletName}
          style={commonStyle.input}
          autoFocus
        />
        <WalletTypeCheckBox
          walletType={walletType}
          setWalletType={setWalletType}
        />
        <OkButton
          title={'지갑 생성하기'}
          onPress={insertWallet}
          buttonStyle={okButtonStyle}
          textStyle={okButtonTextStyle}
        />
      </View>
    </Modal>
  );
};

export default AddWalletModal;
