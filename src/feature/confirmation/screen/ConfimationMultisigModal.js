import React from 'react';
import {useState} from 'react';
import {Modal, Text, View, Image} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import { ConfirmLogo } from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import NoButton from "../../../common/component/NoButton";
import { Colors } from '../../../common/style/color';
import { style } from '../style/style';
import Overlay from "react-native-modal-overlay";


const ConfirmationMultisigModal = ({visible, onClose, receiverAddress, coinAmount, walletType, senderPrivateKey, senderPublicKey, senderAddress}) => {
  const confirmAndSendCoin = async (senderPrivateKey, senderPublicKey, senderAddress, receiverAddress, coinAmount ) => {
    if(isValidAddress(receiverAddress)) {
      await createTransaction(senderPrivateKey, senderPublicKey, senderAddress, receiverAddress, coinAmount ,'bitcoinTestNet' );
    } else {
      alert("invalid address, check if your address is invalid");
    } 
  }
  
  return (
    <Overlay visible={visible} onRequestClose={onClose} closeOnTouchOutside
    animationType="zoomIn" containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
    childrenWrapperStyle={{backgroundColor: '#8b1919'}}
    animationDuration={500}>
        <ConfirmLogo/>
        <Text style={style.text}>
          {receiverAddress} 에게 
        </Text>
        <Text style={style.text}>
          {coinAmount}
        </Text>
        <Text style={style.text}>
          Multi sig transaction will occur
        </Text>
        <Image
        source={require('../../../common/image/BitcoinWhiteLogo.png')}
        style={style.image}
        resizeMode={'contain'}
      />
        
        <OkButton
          title={'Confirm'}
          onPress={() => confirmAndSendCoin(senderPrivateKey, senderPublicKey, senderAddress, receiverAddress, coinAmount)}
          buttonStyle={style.button}
          textStyle={style.text}
        />
    
    </Overlay>
  );
};

export default ConfirmationMultisigModal;