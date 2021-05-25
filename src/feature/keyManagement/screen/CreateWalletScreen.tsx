import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import WalletItem from '../components/WalletItem';
import {createChildKey} from '../function/createChild';
import {createMasterNode, generateNewMnemonic} from '../function/createMasterWallet';
import {WalletType, KeyType} from '../utils/types';

const CreateWalletScreen = () => {
  const [test, setTest] = useState('');
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [masterWallet, setMasterWallet] = useState<KeyType>(null);

  useEffect(() => {
    generateNewMnemonic().then(mnemonic => setTest(mnemonic.toString()));
  }, []);
  useEffect(() => {
    if (test !== '') setMasterWallet(createMasterNode(test));
  }, [test]);

  const addWallet = () => { 
    const childKey = createChildKey(
      masterWallet.privateKey,
      masterWallet.chainCode,
      index,
    );
    setIndex(index + 1);
    const wallet = {...childKey, walletName: 'firstWallet'};
    setWallets([...wallets, wallet]);
  };

  return (
    <View>
      {wallets.map(wallet => (
        <WalletItem
          key={wallet.privateKey?.toString()}
          privateKey={wallet.privateKey.toString('hex')}
          walletName={wallet.walletName}
        />
      ))}
      <Button title={'add Wallet'} onPress={addWallet} />
    </View>
  );
};

export default CreateWalletScreen;
