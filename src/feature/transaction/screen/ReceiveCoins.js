import {useNavigation} from '@react-navigation/core';
import React from 'react';
import NoButton from '../../../common/component/NoButton';
import {commonStyle} from '../../../common/style/commonStyle';
import {ImageBackground, Text, TextInput} from 'react-native';
import {Colors} from '../../../common/style/color';
import MainLogo from '../../../common/component/MainLogo';
import {transactionStyle} from '../style/style';
import IconTitle from '../component/item/IconTitle';
import ExitButton from '../../../common/component/ExitButton';

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
  const {address} = route.params;

  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <IconTitle title={'Public Address'} icon={copy} />
      <TextInput style={style.text} value={address} />
      <ExitButton title={'돌아가기'} />
    </ImageBackground>
  );
};

export default ReceiveCoins;
