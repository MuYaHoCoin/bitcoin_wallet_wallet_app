import React from 'react';
import {ImageBackground, TextInput} from 'react-native';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';
import {transactionStyle} from '../style/style';

import BitcoinInput from '../component/input/BitcoinInput';
import MainLogo from '../../../common/component/MainLogo';
import IconTitle from '../component/item/IconTitle';
import ExitButtonm from '../../../common/component/ExitButton';
import NoButton from '../../../common/component/NoButton';
import {selelctWalletByIndex} from '../../wallet/utils/wallet.reducer';
import {createTransactionStart} from '../utils/transaction.action';

const camera = require('../../../common/image/cameraLogo.png');
const setting = require('../../../common/image/settingLogo.png');

const style = {
  text: {
    marginBottom: 12,

    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.font,
  },
  dollar: {
    marginBottom: 20,

    fontSize: 20,
    fontWeight: 'normal',
    color: Colors.font,
  },
  button: {
    marginBottom: 16,
  },
};

const SendCoins = ({route, navigation}) => {
  const {id} = route.params;
  const disptach = useDispatch();

  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('0');

  function sendCoin() {
    navigation.navigate('transaction/SendCoinConfirm');
    disptach(createTransactionStart(id, receiverAddress, amount));
  }

  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <IconTitle title={'Public Address'} icon={camera} />
      <TextInput
        value={receiverAddress}
        onChangeText={setReceiverAddress}
        placeholder={'상대방 주소를 입력해주세요.'}
        style={transactionStyle.input}
      />
      <IconTitle title={'Amount'} icon={setting} />
      <BitcoinInput
        value={amount}
        onChangeText={setAmount}
        placeholder={'단위는 BTC입니다.'}
      />
      <NoButton
        title={'bitcoin 이체하기'}
        onPress={sendCoin}
        buttonStyle={style.button}
      />
      <ExitButtonm title={'돌아가기'} buttonStyle={style.button} />
    </ImageBackground>
  );
};

export default SendCoins;
