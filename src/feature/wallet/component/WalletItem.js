/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
import {getWalletStart} from '../utils/wallet.action';
import {selectWalletByIndex} from '../utils/wallet.reducer';

const style = {
  container: {
    width: '100%',
    height: 120,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    padding: 8,
    marginBottom: 12,

    backgroundColor: Colors.wallet,
    borderRadius: 12,
  },
  header: {
    width: '100%',
    height: 20,

    marginBottom: 8,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'italic',
  },
  headerLabel: {
    width: 6,
    height: 18,

    marginRight: 6,

    backgroundColor: Colors.walletButton,
  },
  address: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',

    textAlign: 'center',
    alignSelf: 'center',

    marginBottom: 16,
  },
  buttonSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 132,
    height: 32,
    backgroundColor: Colors.walletButton,
  },
  buttonText: {
    color: Colors.walletText,
  },
};

const WalletItem = ({id}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wallet = useSelector(selectWalletByIndex(id));

  function moveSendScreen() {
    navigation.navigate('SendCoins', {id: id});
  }
  function moveReceiveScreen() {
    navigation.navigate('ReceiveCoins', {id: id});
  }

  useEffect(() => {
    dispatch(getWalletStart(id));
  }, []);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.headerLabel} />
        <Text style={style.headerText}>{wallet.walletName}</Text>
      </View>
      <Text style={style.address}>
        {isNaN(wallet.balance)
          ? '불러오는 중입니다..'
          : wallet.balance * 0.000000001 + ' BTC'}
      </Text>
      <View style={style.buttonSection}>
        <OkButton
          title={'Recieve'}
          buttonStyle={style.button}
          textStyle={style.buttonText}
          onPress={moveReceiveScreen}
        />
        <OkButton
          title={'send'}
          buttonStyle={style.button}
          textStyle={style.buttonText}
          onPress={moveSendScreen}
        />
      </View>
    </View>
  );
};

export default WalletItem;
