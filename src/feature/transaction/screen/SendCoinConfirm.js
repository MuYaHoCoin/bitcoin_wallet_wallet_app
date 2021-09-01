import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import BaseComponent from '../../../common/component/BaseComponent';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
import SendCoinLoading from '../component/SendCoinLoading';
import {
  selectCreateTransactionFail,
  selectCreateTransactionLoading,
} from '../utils/transaction.reducer';

const style = {
  text: {
    marginBottom: 12,

    fontSize: 20,
    color: Colors.font,
  },
};

const SendCoinConfirm = ({navigation}) => {
  const isLoading = useSelector(selectCreateTransactionLoading);
  const isFail = useSelector(selectCreateTransactionFail);

  return isLoading ? (
    <SendCoinLoading />
  ) : (
    <BaseComponent>
      <Text style={style.text}>
        {isFail
          ? '트랜잭션 생성에 실패했습니다.'
          : '트랜잭션 생성에 성공했습니다.'}
      </Text>
      <OkButton
        title={'돌아가기'}
        onPress={() => {
          navigation.navigate('Main');
        }}
      />
    </BaseComponent>
  );
};

export default SendCoinConfirm;
