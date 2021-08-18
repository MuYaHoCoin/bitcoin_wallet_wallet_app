import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {commonStyle} from '../../../common/style/commonStyle';
import {okButtonStyle, okButtonTextStyle} from '../style/style';

import MainLogo from '../../../common/component/MainLogo';
import WalletTypeCheckBox from '../component/WalletTypeCheckBox';
import OkButton from '../../../common/component/OkButton';
import {useDispatch, useSelector} from 'react-redux';
import {addWalletStart} from '../utils/wallet.action';
import {selectStandarWalletIndex} from '../utils/wallet.reducer';

const AddWallet = ({navigation}) => {
  const dispatch = useDispatch();
  const [walletName, setWalletName] = useState('');

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
      dispatch(addWalletStart(walletName));
      setWalletName('');
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
