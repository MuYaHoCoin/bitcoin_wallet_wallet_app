import * as React from "react";
import RNQRCode from 'react-native-qrcode-svg';
import {View} from 'react-native';

const style = {
  container: {
    width:"100%",
    height:"30%",
    marginBottom: 70,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}
const QRCode = ({ value }) => (
  <View style={style.container}>
    <RNQRCode value={value} size={200} />
  </View>
);

export default QRCode;