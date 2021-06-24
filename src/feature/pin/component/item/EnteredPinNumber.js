import React from 'react';
import {Text} from 'react-native';
import {Colors} from '../../../../common/style/color';

const style = {
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.wallet,
  },
};
const EnteredPinNumber = ({pinNumber}) => {
  return <Text style={style.text}>{pinNumber ? pinNumber : '_'}</Text>;
};

export default EnteredPinNumber;
