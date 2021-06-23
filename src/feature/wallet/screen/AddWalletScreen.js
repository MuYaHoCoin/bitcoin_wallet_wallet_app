import React, {useState} from 'react';
import {TextInput} from 'react-native';
import BaseComponent from '../../../common/component/BaseComponent';
import {commonStyle} from '../../../common/style/commonStyle';

import MainLogo from '../../../common/component/MainLogo';
import WalletTypeCheckBox from '../../keyManagement/components/WalletTypeCheckBox';
import OkButton from '../../../common/component/OkButton';

const AddWalletScreen = ({navigation}) => {
  const [walletName, setWalletName] = useState('');
  const [walletType, setWalletType] = useState('standard');

  return (
    <BaseComponent style={commonStyle.background}>
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
    </BaseComponent>
  );
};

export default AddWalletScreen;
