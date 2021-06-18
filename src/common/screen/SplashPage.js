import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import {getMasterExistence} from '../../feature/database/function/master';
import {commonStyle} from '../style/commonStyle';
import MainLogo from '../component/MainLogo';

const SplashPage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(
      () =>
        getMasterExistence().then(masterExistence => {
          if (masterExistence) {
            navigation.navigate('Main');
          } else {
            navigation.navigate('Master/Create');
          }
        }),
      1000,
    );
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
