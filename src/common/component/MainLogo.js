import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../style/color';

const style = {
  contanier: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',

    marginBottom: 24,

    background: 'transparent',
  },
  bitcoin: {
    color: Colors.font,
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  card: {
    color: Colors.font,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 40,
  },
};

const MainLogo = ({containerStyle, bitcoinStyle, cardStyle}) => {
  return (
    <View style={[style.contanier, containerStyle]}>
      <Text style={[style.bitcoin, bitcoinStyle]}>bitcoin </Text>
      <Text style={[style.card, cardStyle]}>card </Text>
    </View>
  );
};
export const ConfirmLogo = ({containerStyle, bitcoinStyle, cardStyle}) => {
  return (
    <View style={[style.contanier, containerStyle]}>
      <Text style={[style.bitcoin, bitcoinStyle]}>Confirm </Text>
    </View>
  );
};

export default MainLogo;
