import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground, Text, View} from 'react-native';
import {getMasterExistence} from '../../feature/database/function/master';
import {commonStyle} from '../style/commonStyle';

const SplashPage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(
      () =>
        getMasterExistence(b => {
          if (b) {
            navigation.navigate('Main');
          } else {
            navigation.navigate('CreateMaster');
          }
        }),
      1000,
    );
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
