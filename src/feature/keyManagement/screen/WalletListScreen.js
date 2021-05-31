import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {getMaster} from '../../database/function/master';
import {addWallet, getWallets} from '../../database/function/wallets';
import WalletItem from '../components/WalletItem';
import {createChildKey} from '../function/createChild';

const WalletListScreen = () => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [masterWallet, setMasterWallet] = useState(null);

  useEffect(() => {
    getWallets((privateKey, publicKey, chainCode, walletName) => {
      setWallets([...wallets, {privateKey, publicKey, chainCode, walletName}]);
    });
    getMaster((privateKey, publicKey, chainCode) => {
      console.log(privateKey);
      setMasterWallet({
        privateKey,
        publicKey,
        chainCode,
      });
    });
  }, []);

  const insertWallet = () => {
    const childKey = createChildKey(
      masterWallet.privateKey,
      masterWallet.chainCode,
      index,
    );
    setIndex(index + 1);
    const wallet = {...childKey, walletName: index + 'wallet'};
    addWallet(
      index,
      wallet.walletName,
      wallet.chainCode.toString('hex'),
      wallet.publicKey.toString('hex'),
      wallet.privateKey.toString('hex'),
    );
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
      <Button title={'add Wallet'} onPress={insertWallet} />
    </View>
  );
};

export default WalletListScreen;
