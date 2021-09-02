/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react/cjs/react.development';
import {CheckPassword} from '../../feature/database/function/master';
import {getMasterNodeStart} from '../../feature/keyManagement/utils/keyManagement.action';
import {selectMasterLoading} from '../../feature/keyManagement/utils/keyManagemeny.selector';

import BaseComponent from '../component/BaseComponent';
import MainLogo from '../component/MainLogo';
import OkButton from '../component/OkButton';

import {Colors} from '../style/color';

const style = {
  background: {},
  text: {
    marginBottom: 20,

    fontSize: 16,
    fontWeight: '100',
    color: Colors.font,
  },
  textInput: {
    width: '80%',
    height: 40,

    marginBottom: 28,
    padding: 8,

    borderRadius: 6,

    backgroundColor: Colors.font,
    color: Colors.text,
    fontSize: 12,
  },
  button: {},
  preview: {
    width: 100,
    height: 100,
  },
};

const Authentication = ({navigation}) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  async function navigate() {
    const isCorrect = await CheckPassword(password);
    if (isCorrect) {
      dispatch(getMasterNodeStart(password));
      navigation.navigate('Main');
    } else {
      alert('비밀번호가 맞지 않습니다.');
    }
  }

  return (
    <BaseComponent>
      {/* <MainLogo />
      <Text style={style.text}>비밀번호를 입력해주세요</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={'비밀번호를 입력해주세요.'}
        style={style.textInput}
      />
      <OkButton title={'확인'} onPress={navigate} /> */}
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={style.preview}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        type={RNCamera.Constants.Type.back}
      />
    </BaseComponent>
  );
};

export default Authentication;
