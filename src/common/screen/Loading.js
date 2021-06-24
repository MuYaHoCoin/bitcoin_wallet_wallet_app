import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {commonStyle} from '../style/commonStyle';

const style = {
  container: {
    ...commonStyle.background,
    justifyContent: 'center',
  },
};

const Loading = () => {
  return (
    <View style={style.background}>
      <ActivityIndicator size="large" color="#fff" />
      <Text>불러오는 중입니다.</Text>
    </View>
  );
};

export default Loading;
