import React from 'react';
import {Text, View} from 'react-native';

const WalletItem = ({walletName, privateKey}) => {
  return (
    <View>
      <Text>{walletName}</Text>
      <Text>{privateKey}</Text>
    </View>
  );
};

export default WalletItem;
