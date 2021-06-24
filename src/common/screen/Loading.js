import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {Colors} from '../style/color';
import {commonStyle} from '../style/commonStyle';
import BaseComponent from '../component/BaseComponent';

const style = {
  container: {
    ...commonStyle.background,
    justifyContents: 'center',
    alignItems: 'center',
  },
  indicator: {
    marginBottom: 12,
  },
  text: {
    fontSize: 20,
    color: Colors.font,
  },
};

const Loading = () => {
  return (
    <BaseComponent>
      <ActivityIndicator size="large" color="#fff" style={style.indicator} />
      <Text style={style.text}>불러오는 중입니다.</Text>
    </BaseComponent>
  );
};

export default Loading;
