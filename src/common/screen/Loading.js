import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {commonStyle} from '../style/commonStyle';
import BaseComponent from '../component/BaseComponent';
import {loadingFont} from '../style/font';

const style = {
  container: {
    ...commonStyle.background,
    justifyContents: 'center',
    alignItems: 'center',
  },
  indicator: {
    marginBottom: 12,
  },
};

const Loading = ({}) => {
  return (
    <BaseComponent>
      <ActivityIndicator size="large" color="#fff" style={style.indicator} />
      <Text style={loadingFont}>불러오는 중입니다.</Text>
    </BaseComponent>
  );
};

export default Loading;
