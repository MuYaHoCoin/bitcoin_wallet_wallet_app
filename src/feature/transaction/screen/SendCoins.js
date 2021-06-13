import React from 'react';
import {commonStyle} from '../../../common/style/commonStyle';
import {transactionStyle} from '../style/style';
import {ImageBackground, Text, TextInput} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import {Colors} from '../../../common/style/color';
import BitcoinInput from '../component/input/BitcoinInput';
import OkButton from '../../../common/component/OkButton';
import {creatTransaction} from '../function/transactionFunction';

const style = {
  text: {
    marginBottom: 12,

    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.font,
  },
  dollar: {
    marginBottom: 20,

    fontSize: 20,
    fontWeight: 'normal',
    color: Colors.font,
  },
  button: {
    marginBottom: 16,
  },
};

const SendCoins = ({visible, onClose, addWallet}) => {
  const camera = require('../../../common/image/cameraLogo.png');
  const setting = require('../../../common/image/settingLogo.png');
  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <IconTitle title={'Public Address'} icon={camera} />
      <TextInput style={transactionStyle.input} />
      <IconTitle title={'Amount'} icon={setting} />
      <BitcoinInput />
      <Text style={style.dollar}>$ 0.00</Text>
      <NoButton title={'bitcoin 이체하기'} buttonStyle={style.button} />
      <ExitButton title={'돌아가기'} buttonStyle={style.button} />
    </ImageBackground>
  );
};

export default SendCoins;
