import React from 'react';
import {Image, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {transactionStyle} from '../../style/style';

const style = {
  container: {
    height: 40,
    width: '90%',

    diplay: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',

    marginBottom: 40,
  },
  input: {
    ...transactionStyle.input,
    width: '50%',
    marginRight: 12,
  },
  image: {
    height: 40,
  },
};

const BitcoinInput = ({value, onChangeText, placeholer}) => {
  return (
    <View style={style.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholer}
        style={style.input}
      />
      <Image
        source={require('../../../../common/image/BitcoinWhiteLogo.png')}
        style={style.image}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default BitcoinInput;
