import {useNavigation} from '@react-navigation/core';
import React from 'react';
import NoButton from '../../../common/component/NoButton';
import {commonStyle} from '../../../common/style/commonStyle';
import {ImageBackground} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';

const SendCoins = ({visible, onClose, addWallet}) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={{...commonStyle.background, padding: 12}}>
      <MainLogo />
      <OkButton title={'Bitcoin 수신하기'} />
      <NoButton title={'Bitcoin 이체하기'} />
    </ImageBackground>
  );
};

export default SendCoins;
