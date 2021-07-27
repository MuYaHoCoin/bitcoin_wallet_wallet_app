/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

import {selectRestoreWalletLoading} from '../utils/keyManagemeny.selector';

import BaseComponent from '../../../common/component/BaseComponent';

const RestoreWalletLoadingScreen = ({navigation}) => {
  const loading = useSelector(selectRestoreWalletLoading);
  const [elipsis, setElipsis] = useState('.');

  useEffect(() => {
    const timerId = setInterval(() => {
      if (elipsis === '.') {
        setElipsis('..');
      } else if (elipsis === '..') {
        setElipsis('...');
      } else {
        setElipsis('.');
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  useEffect(() => {
    if (loading) {
      navigation.navigate('Main');
    }
  }, [loading]);
  return (
    <BaseComponent>
      <Text>지갑을 불러오는 중 입니다{elipsis}</Text>
    </BaseComponent>
  );
};

export default RestoreWalletLoadingScreen;
