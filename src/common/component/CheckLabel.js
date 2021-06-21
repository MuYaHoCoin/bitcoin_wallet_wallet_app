import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../style/color';

const style = {
  container: {
    width: 200,
    height: 40,

    marginBottom: 12,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: Colors.font,
    fontSize: 16,
    fontWeight: '200',
  },
};

const CheckLabel = ({title, value, onChange, containerStyle, textStyle}) => {
  return (
    <View style={[style.container, containerStyle]}>
      <Text style={[style.title, textStyle]}>{title}</Text>
      <CheckBox disabled={false} value={value} onValueChange={onChange} />
    </View>
  );
};

export default CheckLabel;
