import React from 'react';
import {Text, View} from 'react-native';
import {mnemonicItemStyle, mnemonicItemTextStyle} from '../style/style';

const RandomWordItem = ({index, mnemonic}) => {
  return (
    <View style={mnemonicItemStyle}>
      <Text style={mnemonicItemTextStyle.index}>{index + '. '}</Text>
      <Text style={mnemonicItemTextStyle.mnemonic}>{mnemonic}</Text>
    </View>
  );
};

export default RandomWordItem;
