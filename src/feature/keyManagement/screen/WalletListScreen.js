import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import {handlError} from '../../../common/function/error';
import {commonStyle} from '../../../common/style/commonStyle';
import {addWallet, getWallets} from '../../database/function/wallets';
import AddWalletModal from '../components/AddWalletModal';
import WalletItem from '../components/WalletItem';
import {getAddress} from '../function/address';
import {createChildKey} from '../function/createChild';
import {okButtonStyle, okButtonTextStyle} from '../style/style';

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
      console.log(privateKey);
      const walletAddress = getAddress(publicKey, 'bitcoin');
      const walletType = 'standard';
      const wallet = {
        privateKey,
        publicKey,
        chainCode,
        walletName,
        walletAddress,
        walletType,
      };
      addWallet(
        'm/0/0/7' + index,
        walletName,
        chainCode,
        publicKey,
        privateKey,
        walletType,
        walletAddress,
      );
      setIndex(index + 1);
      setWallets([...wallets, wallet]);
    } catch (error) {
      handlError('insertWallet', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={{...commonStyle.background}}>
      {wallets.map(wallet => (
        <WalletItem
          key={wallet.privateKey}
          privateKey={getAddress(wallet.publicKey, 'bitcoinTestNet')}
          walletName={wallet.walletName}
        />
      ))}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={okButtonStyle}>
        <Text style={okButtonTextStyle}>지갑 추가하기</Text>
      </TouchableOpacity>
      <AddWalletModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addWallet={insertWallet}
      />
    </ImageBackground>
  );
};

export default WalletListScreen;
