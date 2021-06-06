import React from 'react'
import NoButton from '../../../common/component/NoButton'

const transaction = ({visible, onClose, addWallet}) => {
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={{...commonStyle.background}}>
        <MainLogo />
        <OkButton
          title={'Bitcoin 수신하기'}
          onPress={}
          buttonStyle={okButtonStyle}
          textStyle={okButtonTextStyle}
        />
        <NoButton
          title={'Bitcoin 이체하기'}
        />
      </View>
    </Modal>
  );
}

export default transaction;
