import {useNavigation} from '@react-navigation/core';
import React from 'react';
import NoButton from '../../../common/component/NoButton';
import {commonStyle} from '../../../common/style/commonStyle';
import {ImageBackground, Text, TextInput} from 'react-native';
import {Colors} from '../../../common/style/color';
import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';

const style = {
  text: {
    color: Colors.font,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    ...commonStyle.button,
    marginBottom: 15,
  },
  input: {
    color: Colors.font,
    height: 20,
    outerWidth: 60,
    margin: 12,
    borderWidth: 1,
  },
};

const ReceiveCoins = ({visible, onClose, addWallet}) => {
  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={{...commonStyle.background, padding: 12}}>
      <MainLogo />
      <OkButton title={'Bitcoin 수신하기'} buttonStyle={[style.button]} />
      <Text style={[style.text]}> Public ax ddress </Text>
      <TextInput style={[style.input]} value="user's public address" />
    </ImageBackground>
  );
};

export default ReceiveCoins;
