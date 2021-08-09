/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
import {getBalance} from '../../transaction/function/transactionFunction';
import {getWalletStart} from '../utils/wallet.action';
import {selelctWalletByIndex} from '../utils/wallet.reducer';
const WalletTypeMap = {
  standard: 'Standard',
  twoFactor: 'Two-Factor',
  multiSig: 'Multi-Sig',
};
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
  const wallet = useSelector(selelctWalletByIndex(id));

  const [balance, setBalance] = useState('0');

  function moveSendScreen() {
    navigation.navigate('SendCoins', {id: id});
  }
  function moveReceiveScreen() {
    navigation.navigate('ReceiveCoins', {id: id});
  }

  useEffect(() => {
    dispatch(getWalletStart(id));
  }, []);
  useEffect(() => {
    if (wallet.address) {
      getBalance(wallet.address).then(b => setBalance(b * 0.0000001));
    }
  }, [wallet]);

  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.headerLabel} />
        <Text style={style.headerText}>
          {WalletTypeMap[wallet.walletType] + ' - ' + wallet.walletName}
        </Text>
      </View>
      <Text style={style.address}>{balance} BTC</Text>
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
