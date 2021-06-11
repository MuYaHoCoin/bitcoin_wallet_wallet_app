import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import {handleError} from '../../../common/function/error';
import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';
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
      .catch(error => handleError('Wallet Screen/ Get Wallet Error!', error));
  }, []);

  const insertWallet = async (walletName, walletType) => {
    try {
      const {privateKey, publicKey, chainCode} = await createChildKey(index);
      const walletAddress = getAddress(publicKey, 'bitcoin');
      const wallet = {
        privateKey,
        publicKey,
        chainCode,
        walletName,
        walletAddress,
        walletType,
      };
      await addWallet(
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
      handleError('insertWallet', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={{...commonStyle.background, padding: 12}}>
      <MainLogo />
      <OkButton
        title={'지갑추가 하기'}
        onPress={() => {
          setModalVisible(true);
        }}
        buttonStyle={{
          width: '100%',
          marginBottom: 16,
          backgroundColor: Colors.walletButton,
          borderColor: Colors.wallet,
          borderWidth: 3,
        }}
        textStyle={{color: Colors.wallet}}
      />
      <ScrollView style={{width: '100%'}}>
        {wallets.map(wallet => (
          <WalletItem
            key={wallet.privateKey}
            address={wallet.walletAddress}
            walletName={wallet.walletName}
            walletType={wallet.walletType}
          />
        ))}
      </ScrollView>
      <AddWalletModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addWallet={insertWallet}
      />
    </ImageBackground>
  );
};

export default WalletListScreen;
