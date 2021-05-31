import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {addWallet, getWallets} from '../../database/function/wallets';
import WalletItem from '../components/WalletItem';
import {getAddress} from '../function/address';
import {createChildKey} from '../function/createChild';

const WalletListScreen = () => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    getWallets().then(w => {
      setWallets([...w]);
      setIndex(wallets.length);
    });
  }, []);

  const insertWallet = async () => {
    try {
      const childKey = await createChildKey(index);
      const wallet = {...childKey, walletName: index + 'wallet'};
      addWallet(
        index,
        wallet.walletName,
        wallet.chainCode,
        wallet.publicKey,
        wallet.privateKey,
      );
      setWallets([...wallets, wallet]);
      setIndex(index + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {wallets.map(wallet => (
        <WalletItem
          key={wallet.privateKey}
          privateKey={getAddress(wallet.publicKey)}
          walletName={wallet.walletName}
        />
      ))}
      <Button title={'add Wallet'} onPress={insertWallet} />
    </View>
  );
};

export default WalletListScreen;
