import React from 'react';
import {Image, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {transactionStyle} from '../style/style';

const style = {
  container: {
    diplay: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    ...transactionStyle.input,
  },
};

const BitcoinInput = ({value, onChangeValue, placeholer}) => {
  return (
    <View style={style.container}>
      <TextInput
        value={value}
        onChangeValue={value}
        placeholder={placeholer}
        style={style.input}
      />
      <Image source={require('../../../common/image/BitcoinWhiteLogo.png')} />
    </View>
  );
};

export default BitcoinInput;
