import React, {useState} from 'react';
import {Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import BaseComponent from '../component/BaseComponent';
import MainLogo from '../component/MainLogo';
import OkButton from '../component/OkButton';

import {CheckPassword} from '../../feature/database/function/master';
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
};

const Authentication = ({navigation}) => {
  const [password, setPassword] = useState('');
  const navigate = async () => {
    const isRight = await CheckPassword(password);
    if (isRight) {
      navigation.navigate('Main');
    } else {
      alert('비밀번호가 맞지 않습니다.');
    }
  };
  return (
    <BaseComponent>
      <MainLogo />
      <Text style={style.text}>비밀번호를 입력해주세요</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={'비밀번호를 입력해주세요.'}
        style={style.textInput}
      />
      <OkButton title={'확인'} onPress={navigate} />
    </BaseComponent>
  );
};

export default Authentication;
