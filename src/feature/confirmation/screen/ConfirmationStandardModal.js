import React from 'react';
import {useState} from 'react';
import {Modal, Text, View, Image, Alert} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import { ConfirmLogo } from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import NoButton from "../../../common/component/NoButton";
import { Colors } from '../../../common/style/color';
import { style } from '../style/style';
import Overlay from "react-native-modal-overlay";
import { isValidAddress, createTransaction } from '../../transaction/function/transactionFunction';

const modalStyle = {
  container: {
    height: 40,
    width: '90%',

    diplay: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  image: {
    height: 30,
  },
};

const ConfirmationStandardModal = ({visible, onClose, receiverAddress, coinAmount, walletType, senderPrivateKey, senderPublicKey, senderAddress}) => {
  const confirmAndSendCoin = () => {
    if(isValidAddress(receiverAddress) || true) {
      console.log('bbb',senderPrivateKey)
      createTransaction(senderPrivateKey, senderPublicKey, senderAddress, receiverAddress, coinAmount *1e8 ,'bitcoinTestNet' );
    } else {
      alert("invalid address, check if your address is invalid");
    } 
  }
  return (
    <Overlay visible={visible} onRequestClose={onClose} closeOnTouchOutside
    animationType="zoomIn" containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
    childrenWrapperStyle={{backgroundColor: '#8b1919'}}
    animationDuration={500}>
        <ConfirmLogo walletType={walletType}/>
        <Text style={style.text}>
        From :
          {senderAddress}
        </Text>
        <Text style={style.text}>
          To : {receiverAddress}
        </Text>
        <View style={modalStyle.container}>
        <Text style={style.text}>
          {coinAmount}
        </Text>
        <Image
        source={require('../../../common/image/BitcoinWhiteLogo.png')}
        style={modalStyle.image}
        resizeMode={'contain'}
      />
        </View>
        
        <Text style={style.text}>
          standard transaction is about to occur
        </Text>
        
        <OkButton
          title={'Confirm'}
          onPress={() => confirmAndSendCoin()}
          buttonStyle={style.button}
          textStyle={style.text}
        />
    </Overlay>
  );
};

export default ConfirmationStandardModal;