/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {getMasterExistence} from '../../feature/database/function/master';
import {commonStyle} from '../style/commonStyle';
import MainLogo from '../component/MainLogo';

const SplashPage = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      const masterExistence = await getMasterExistence();
      if (masterExistence) {
        navigation.navigate('Authentication');
      } else {
        navigation.navigate('Master/Create');
      }
    }, 1000);
  }, []);

  return (
    <ImageBackground
      source={require('../image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
    </ImageBackground>
  );
};

export default SplashPage;
