import React from 'react';
import {View} from 'react-native';

import EnteredPinNumber from './EnteredPinNumber';
const style = {
  container: {
    width: '50%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',

    marginBottom: 12,
  },
};
const PinNumber = ({pinNumber}) => {
  return (
    <View style={style.container}>
      <EnteredPinNumber pinNumber={pinNumber[0] ? pinNumber[0] : false} />
      <EnteredPinNumber pinNumber={pinNumber[1] ? pinNumber[1] : false} />
      <EnteredPinNumber pinNumber={pinNumber[2] ? pinNumber[2] : false} />
      <EnteredPinNumber pinNumber={pinNumber[3] ? pinNumber[3] : false} />
    </View>
  );
};

export default PinNumber;
