import React from 'react';
import {Text} from 'react-native';
import {mnemonicItemStyle, mnemonicItemTextStyle} from '../style/style';

const RandomWordItem = ({index, mnemonic}) => {
  return (
    <Text style={{...mnemonicItemStyle, ...mnemonicItemTextStyle}}>
      {index + '. ' + mnemonic}
    </Text>
  );
};

export default RandomWordItem;
