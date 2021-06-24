import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {commonStyle} from '../../../common/style/commonStyle';
import {okButtonStyle, okButtonTextStyle} from '../style/style';

import MainLogo from '../../../common/component/MainLogo';
import WalletTypeCheckBox from '../component/WalletTypeCheckBox';
import OkButton from '../../../common/component/OkButton';

const AddWallet = ({route, navigation}) => {
  const {addWallet, index} = route.params;
  const [walletName, setWalletName] = useState('');
  const [walletType, setWalletType] = useState('standard');

  const isEmpty = value => {
    if (
      value === '' ||
      value === null ||
      value === undefined ||
      (value != null && typeof value === 'object' && !Object.keys(value).length)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const insertWallet = () => {
    if (isEmpty(walletName)) {
      alert('지갑이름을 입력해주세요');
    } else {
      addWallet(walletName, walletType);
      setWalletName('');
      if (walletType === 'starndard') {
        navigation.goBack();
      }
      if (walletType === 'multiSig') {
        navigation.navigate('AddWallet/MultiSig', {index});
      }
      if (walletType === 'twoFactor') {
        navigation.navigate('AddWallet/TwoFactor', {index});
      }
      setWalletType('standard');
    }
  };
  return (
    <View style={commonStyle.background}>
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
  );
};

export default AddWallet;
