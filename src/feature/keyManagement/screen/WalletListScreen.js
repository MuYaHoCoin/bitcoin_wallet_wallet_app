import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {handlError} from '../../../common/function/error';
import {addWallet, getWallets} from '../../database/function/wallets';
import AddWalletModal from '../components/AddWalletModal';
import WalletItem from '../components/WalletItem';
import {getAddress} from '../function/address';
import {createChildKey} from '../function/createChild';

const WalletListScreen = () => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getWallets()
      .then(w => {
        setWallets([...w]);
        setIndex(wallets.length);
      })
      .catch(error => handlError('Wallet Screen/ Get Wallet Error!', error));
  }, []);

  const insertWallet = async walletName => {
    try {
      const {privateKey, publicKey, chainCode} = await createChildKey(index);
      const wallet = {
        privateKey,
        publicKey,
        chainCode,
        walletName,
      };
      addWallet(
        'm/0/0/7' + index,
        walletName,
        chainCode,
        publicKey,
        privateKey,
      );
      setIndex(index + 1);
      setWallets([...wallets, wallet]);
    } catch (error) {
      handlError('WalletListScreen/Insert Wallet Error!', error);
    }
  };

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
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addWallet={insertWallet}
      />
    </View>
  );
};

export default WalletListScreen;
