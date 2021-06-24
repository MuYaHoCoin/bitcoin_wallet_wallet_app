import React from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {mnemonicItemStyle, mnemonicItemTextStyle} from '../style/style';

const RandomWordInput = ({index, text, setText}) => {
  return (
    <View style={mnemonicItemStyle}>
      <Text style={mnemonicItemTextStyle.index}>{index + '. '}</Text>
      <TextInput
        style={mnemonicItemTextStyle.input}
        value={text}
        onChangeText={setText}
        underlineColorAndroid={'transparent'}
      />
    </View>
  );
};

export default RandomWordInput;
