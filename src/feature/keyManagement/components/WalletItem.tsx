import React from 'react';
import {Text, View} from 'react-native';

interface Props {
  walletName: string;
  privateKey: string;
}

const WalletItem = ({walletName, privateKey}: Props) => {
  return (
    <View>
      <Text>{walletName}</Text>
      <Text>{privateKey}</Text>
    </View>
  );
};

export default WalletItem;
