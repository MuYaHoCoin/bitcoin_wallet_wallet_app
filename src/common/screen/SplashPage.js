/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ImageBackground, Text} from 'react-native';
import {getMasterExistence} from '../../feature/database/function/master';
import {commonStyle} from '../style/commonStyle';

const SplashPage = ({navigation}) => {
  useEffect(() => {
    setTimeout(async () => {
      const masterExistence = await getMasterExistence();
      if (masterExistence) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Master/Create');
      }
    }, 1000);
  }, []);

  return (
    <ImageBackground
      source={require('../image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <Text>asdasd</Text>
    </ImageBackground>
  );
};

export default SplashPage;
