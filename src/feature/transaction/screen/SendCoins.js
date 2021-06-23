import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {ImageBackground, Text, TextInput} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';
import {
  creatTransaction,
  getBTCCurrentPrice,
} from '../function/transactionFunction';
import {transactionStyle} from '../style/style';
import BitcoinInput from '../component/input/BitcoinInput';
import MainLogo from '../../../common/component/MainLogo';
import IconTitle from '../component/item/IconTitle';
import ExitButtonm from '../../../common/component/ExitButton';
import NoButton from '../../../common/component/NoButton';
import ConfirmationStandardModal from '../../confirmation/screen/ConfirmationStandardModal';

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
  const [receiverAddress, setReceiverAddress] = useState('');
  const [amount, setAmount] = useState('0');
  const [confirmationStandardModalVisible, setConfirmationStandardModalVisible] = useState(false);

  const camera = require('../../../common/image/cameraLogo.png');
  const setting = require('../../../common/image/settingLogo.png');
  const {address, privateKey, publicKey} = route.params;
  navigation = useNavigation();

  const makeTransaction = () => {
    creatTransaction(
      privateKey,
      publicKey,
      address,
      receiverAddress,
      parseFloat(amount) * 100000000,
      'bitcoinTestNet',
    );
  };

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
        onPress={()=>setConfirmationStandardModalVisible(true)}
        buttonStyle={style.button}
      />
      <ExitButtonm title={'돌아가기'} buttonStyle={style.button}/>
      <ConfirmationStandardModal 
        visible={confirmationStandardModalVisible}
        onClose={()=> setConfirmationStandardModalVisible(false)}
        receiverAddress={receiverAddress}
        coinAmount={parseFloat(amount)}
      />
    </ImageBackground>
  );
};

export default SendCoins;
