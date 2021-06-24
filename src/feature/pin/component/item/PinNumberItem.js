import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../../../common/style/color';

const style = {
  background: {
    width: 82,
    height: 82,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 12,

    borderRadius: 40,
    backgroundColor: '#ffffff42',
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.font,
  },
};

const PinNumberItem = ({content, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.background}>
      <Text style={style.text}>{content}</Text>
    </TouchableOpacity>
  );
};

export default PinNumberItem;
