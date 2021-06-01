import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {getWallets} from '../../database/function/wallets';
import AddWalletModal from '../components/AddWalletWallet';
import WalletItem from '../components/WalletItem';
import {getAddress} from '../function/address';

const WalletListScreen = () => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getWallets().then(w => {
      setWallets([...w]);
      setIndex(wallets.length);
    });
  }, []);

  return (
    <View>
      {wallets.map(wallet => (
        <WalletItem
          key={wallet.privateKey}
          privateKey={getAddress(wallet.publicKey, 'bitcoinTestNet')}
          walletName={wallet.walletName}
        />
      ))}
      <Button title={'add Wallet'} onPress={() => setModalVisible(true)} />
      <AddWalletModal
        index={index}
        setIndex={setIndex}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default WalletListScreen;
