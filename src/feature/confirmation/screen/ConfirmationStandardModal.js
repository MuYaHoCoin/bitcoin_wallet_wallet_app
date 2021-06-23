import React from 'react';
import {useState} from 'react';
import {Modal, Text, View} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import { ConfirmLogo } from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import NoButton from "../../../common/component/NoButton";
import { commonStyle } from '../../../common/style/commonStyle';
import { Colors } from '../../../common/style/color';

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

const ConfirmationStandardModal = ({visible, onClose, receiverAddress, coinAmount}) => {
  const [walletName, setWalletName] = useState('');
  const [walletType, setWalletType] = useState('standard');


  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={{...commonStyle.confirmBackground}}>
        <MainLogo />
        <ConfirmLogo/>
        <Text>
          {receiverAddress} 에게 
        </Text>
        <NoButton
          title={'Confirm'}
          onPress={() => {}}
          buttonStyle={style.button}
          textStyle={style.text}
        />
      </View>
    </Modal>
  );
};

export default ConfirmationStandardModal;