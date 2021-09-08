import React, {useRef} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Colors} from '../../../common/style/color';

const androidCameraPermissionOptions = {
  title: 'Permission to use camera',
  message: 'We need your permission to use your camera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancel',
};

const style = {
  container: {
    width: '100%',
    height: '100%',
  },
  cccc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',
    backgroundColor: '#fff',

    padding: 20,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
};

const QRCodeScannerModal = ({visible, onClose, onDataRead}) => {
  function onQRCodeRead(e) {
    console.log(e.data);
    onDataRead(JSON.parse(e.data));
    onClose();
  }
  const thisRef = useRef();
  return (
    <Modal
      visible={visible}
      transparent={true}
      style={style.container}
      animationType={'slide'}
      onRequestClose={onClose}>
      <View style={style.cccc} ref={thisRef}>
        <RNCamera
          ref={ref => (thisRef.camera = ref)}
          style={style.camera}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={androidCameraPermissionOptions}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={onQRCodeRead}
        />
        <TouchableOpacity />
      </View>
    </Modal>
  );
};
export default QRCodeScannerModal;
