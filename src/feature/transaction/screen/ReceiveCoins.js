/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ImageBackground, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';

import {commonStyle} from '../../../common/style/commonStyle';
import {Colors} from '../../../common/style/color';
import {transactionStyle} from '../style/style';
import {selectWalletByIndex} from '../../wallet/utils/wallet.reducer';
import {getWalletStart} from '../../wallet/utils/wallet.action';

import MainLogo from '../../../common/component/MainLogo';
import IconTitle from '../component/item/IconTitle';
import ExitButton from '../../../common/component/ExitButton';
import AddressQRCode from '../component/item/AddressQRCode';

const copy = require('../../../common/image/copyLogo.png');
const style = {
  text: {
    marginBottom: 16,

    color: Colors.font,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    ...commonStyle.button,
    marginBottom: 15,
  },
  input: {
    ...transactionStyle.input,
  },
};

const ReceiveCoins = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const {address, xpub} = useSelector(selectWalletByIndex(id));

  function copyAddressToClipBoard() {
    Clipboard.setString(address);
  }
  function copyXpubToClipBoard() {
    Clipboard.setString(xpub);
  }
  useEffect(() => {
    dispatch(getWalletStart(id));
  }, []);
  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <IconTitle
        title={'Public Address'}
        icon={copy}
        onPress={copyAddressToClipBoard}
      />
      <TextInput style={style.text} value={address} />
      <IconTitle
        title={'Accouny Public Key(Xpub)'}
        icon={copy}
        onPress={copyXpubToClipBoard}
      />
      <TextInput style={style.text} value={xpub} />
      <AddressQRCode address={address} />
      <ExitButton title={'돌아가기'} />
    </ImageBackground>
  );
};

export default ReceiveCoins;
