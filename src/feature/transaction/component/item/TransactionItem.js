import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../../../common/style/color';

const style = {
  container: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    marginBottom: 8,
    padding: 4,

    backgroundColor: Colors.font,
    borderRadius: 8,
  },
  address: {
    color: Colors.text,
  },
  value: {
    color: Colors.text,
  },
};

const TransactionItem = ({addresses, value}) => {
  return (
    <View style={style.container}>
      <Text style={style.address}>address :</Text>
      {addresses.map((address, index) => (
        <Text key={address} style={style.address}>
          {address}
        </Text>
      ))}
      <Text style={style.value}>value : {value}</Text>
    </View>
  );
};

export default TransactionItem;
