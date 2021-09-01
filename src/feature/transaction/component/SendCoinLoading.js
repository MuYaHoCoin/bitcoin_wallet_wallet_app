/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {ActivityIndicator, Text} from 'react-native';

import BaseComponent from '../../../common/component/BaseComponent';
import {loadingFont} from '../../../common/style/font';

const style = {
  indicator: {
    marginBottom: 12,
  },
};

const SendCoinLoading = () => {
  return (
    <BaseComponent>
      <ActivityIndicator size="large" color="#fff" style={style.indicator} />
      <Text style={loadingFont}>{'Transaction을 생성하고 있습니다...'}</Text>
    </BaseComponent>
  );
};

export default SendCoinLoading;
