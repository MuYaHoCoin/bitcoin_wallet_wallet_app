import React from 'react';
import {useNavigation, Navigation} from '@react-navigation/core';
import {ImageBackground, Text, TextInput} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';
import {
  createTransaction,
  getBTCCurrentPrice,
} from '../function/transactionFunction';
import {transactionStyle} from '../style/style';
import BitcoinInput from '../component/input/BitcoinInput';
import MainLogo from '../../../common/component/MainLogo';
import IconTitle from '../component/item/IconTitle';
import ExitButtonm from '../../../common/component/ExitButton';
import NoButton from '../../../common/component/NoButton';
import ConfirmationStandardModal from '../../confirmation/screen/ConfirmationStandardModal';
import ConfirmationMultisigModal from '../../confirmation/screen/ConfimationMultisigModal';
import ConfirmationTwoFactorModal from '../../confirmation/screen/ConfirmationTwoFactorModal';
import { useEffect } from "react";

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
  const [receiverAddress, setReceiverAddress] 
  = useState('');
  const [amount, setAmount] = useState('1');
  const [confirmationStandardModalVisible, setConfirmationStandardModalVisible] = useState(false);
  const [confirmationMultisigModalVisible, setConfirmationMultisigModalVisible] = useState(false);
  const [confirmationTwoFactorModalVisible, setconfirmationTwoFactorModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [curPrice, setCurPrice] = useState(0.001);
  const [oneBTCForDollor, setOneBTCForDollor] = useState(0.0);
  
  const camera = require('../../../common/image/cameraLogo.png');
  const setting = require('../../../common/image/settingLogo.png');
  const {address, privateKey, publicKey, walletType} = route.params;
  
  //navigation = useNavigation();
  //const sendCoinNavigation = useNavigation();

  useEffect(() => {
    console.log('ccc',privateKey,walletType);
    getBTCCurrentPrice().then((v) => {
      setOneBTCForDollor(v);
    })
    if (walletType === "standard") {
      setConfirmationStandardModalVisible(true);
    }
    else if (walletType === "two-factor") {
      setconfirmationTwoFactorModalVisible(true);
    }

    else if (walletType == "multi-sig") {
      setConfirmationMultisigModalVisible(true);
    }
  },[]);

  const makeTransaction = () => {
    createTransaction(
      privateKey,
      publicKey,
      address,
      receiverAddress,
      parseFloat(amount) * 100000000,
      'bitcoinTestNet',
    );
  };

  const setAmountAndPrice = (a) => {
    setAmount(a);
    //console.log(oneBTCForDollor.split(',').join("") * parseFloat(a));
    setCurPrice(oneBTCForDollor.split(',').join("") * parseFloat(a));
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
        onChangeText={setAmountAndPrice}
        placeholder={'단위는 BTC입니다.'}
      />
      <Text style={style.dollar}>
        ~{curPrice} dollar
      </Text>
      <NoButton
        title={'bitcoin 이체하기'}
        onPress={()=>setModalVisible(true)}
        buttonStyle={style.button}
      />
      <ExitButtonm title={'돌아가기'} buttonStyle={style.button}/>
      <ConfirmationStandardModal 
        visible={modalVisible && confirmationStandardModalVisible}
        onClose={()=> setModalVisible(false)}
        receiverAddress={receiverAddress}
        coinAmount={parseFloat(amount)}
        walletType={walletType}
        senderPrivateKey={privateKey}
        senderPublicKey={publicKey}
        senderAddress={address}
      />
      <ConfirmationMultisigModal
        visible={confirmationMultisigModalVisible && modalVisible}
        onClose={()=> setModalVisible(false)}
        receiverAddress={receiverAddress}
        coinAmount={parseFloat(amount)}
        walletType={walletType}
      />
      <ConfirmationTwoFactorModal
        visible={confirmationTwoFactorModalVisible && modalVisible}
        onClose={()=> setModalVisible(false)}
        receiverAddress={receiverAddress}
        coinAmount={parseFloat(amount)}
        walletType={walletType}
      />
    </ImageBackground>
  );
};

export default SendCoins;
