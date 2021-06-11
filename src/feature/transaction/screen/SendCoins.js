import React from 'react';
import {commonStyle} from '../../../common/style/commonStyle';
import {transactionStyle} from '../style/style';
import {ImageBackground, Text, TextInput} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import {Colors} from '../../../common/style/color';
import BitcoinInput from '../component/BitcoinInput';

const style = {
  text: {
    marginBottom: 12,

    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.font,
  },
};

const SendCoins = ({visible, onClose, addWallet}) => {
  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <Text style={style.text}>Public Address</Text>
      <TextInput style={transactionStyle.input} />
      <Text style={style.text}>Amount</Text>
      <BitcoinInput />
    </ImageBackground>
  );
};

export default SendCoins;
