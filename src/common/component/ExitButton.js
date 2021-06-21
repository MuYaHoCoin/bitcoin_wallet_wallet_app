import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Colors} from '../style/color';
import {commonStyle} from '../style/commonStyle';

const style = {
  button: {
    ...commonStyle.button,
    width: 160,
    height: 52,

    backgroundColor: Colors.exitButton,
  },
  text: {
    color: Colors.font,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
};

const ExitButton = ({onPress, title, textStyle = {}, buttonStyle = {}}) => {
  return (
    <TouchableOpacity style={[style.button, buttonStyle]} onPress={onPress}>
      <Text style={[style.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ExitButton;
