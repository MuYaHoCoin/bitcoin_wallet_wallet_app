import React from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const style = {
  qrCode: {marginBottom: 40},
};

const AddressQRCode = address => {
  return (
    <View style={style.qrCode}>
      <QRCode value={JSON.stringify({address})} size={150} />
    </View>
  );
};

export default AddressQRCode;
