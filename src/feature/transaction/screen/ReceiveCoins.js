import {useNavigation} from '@react-navigation/core';
import React,{useEffect} from 'react';
import NoButton from '../../../common/component/NoButton';
import {commonStyle} from '../../../common/style/commonStyle';
import {ImageBackground, Text, TextInput} from 'react-native';
import {Colors} from '../../../common/style/color';
import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import {transactionStyle} from '../style/style';
import IconTitle from '../component/item/IconTitle';
import ExitButton from '../../../common/component/ExitButton';
import QRCode from '../component/item/QRCode';
import { getTransactionList } from '../function/transactionFunction';

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
  const {address} = route.params;
  const copy = require('../../../common/image/copyLogo.png');
  useEffect(()=> {
    getTransactionList(address, 'bitcoinTestNet').then((txids) => {
      console.log("lists : ", txids);
      console.log("length : ", txids.length);
    })
  },[]);
  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <IconTitle title={'Public Address'} icon={copy} value={address}/>
      <TextInput style={style.text} value={address} />
      <QRCode value={address}/>
      <ExitButton title={'돌아가기'} />
    </ImageBackground>
  );
};

export default ReceiveCoins;
