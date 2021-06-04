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

const MainLogo = () => {
  return (
    <View style={style.contanier}>
      <Text style={style.bitcoin}>bitcoin </Text>
      <Text style={style.card}>card </Text>
    </View>
  );
};

export default MainLogo;
