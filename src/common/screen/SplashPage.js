import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {getMasterExistence} from '../../feature/database/function/master';

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
    <View>
      <Text>asdasd</Text>
    </View>
  );
};

export default SplashPage;
