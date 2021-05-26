import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {getMaster, getMasterExistence} from '../../database/function/master';
import {getWallets} from '../../database/function/wallets';
import WalletItem from '../components/WalletItem';
import {createChildKey} from '../function/createChild';
import {
  createMasterNode,
  generateNewMnemonic,
} from '../function/createMasterWallet';
import {WalletType, KeyType} from '../utils/types';

const WalletListScreen = () => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [masterWallet, setMasterWallet] = useState(null);

  useEffect(() => {
    getWallets(wallet => {
      setWallets([...wallets, wallet]);
    });
    getMaster((privateKey, publicKey, chainCode) => {
      console.log(privateKey);
      setMasterWallet({
        privateKey,
        publicKey,
        chainCode,
      });
    });
  }, [wallets]);

  const addWallet = () => {
    const childKey = createChildKey(
      masterWallet.privateKey,
      masterWallet.chainCode,
      index,
    );
    setIndex(index + 1);
    const wallet = {...childKey, walletName: index + 'wallet'};
    setWallets([...wallets, wallet]);
  };

  return (
    <View>
      {wallets.map(wallet => (
        <WalletItem
          key={wallet.privateKey}
          privateKey={wallet.privateKey}
          walletName={wallet.walletName}
        />
      ))}
      <Button title={'add Wallet'} onPress={addWallet} />
    </View>
  );
};

export default WalletListScreen;
