/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView} from 'react-native';

import {addWallet, getWallets} from '../../database/function/wallets';
import {getAddress} from '../function/address';
import {createChildKey} from '../function/createChild';

import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import AddWalletModal from '../components/AddWalletModal';
import WalletItem from '../components/WalletItem';

import {handleError} from '../../../common/function/error';
import {commonStyle} from '../../../common/style/commonStyle';
import {Colors} from '../../../common/style/color';
import Loading from '../../../common/screen/Loading';

const style = {
  background: {...commonStyle.background, padding: 12},
  button: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: Colors.walletButton,
    borderColor: Colors.wallet,
    borderWidth: 3,
  },
  scrollView: {width: '100%'},
};

const WalletListScreen = () => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  async function generateWalletFromInfo(walletInfo) {
    const {walletIndex, walletName, walletType} = walletInfo;
    const {privatieKey, publicKey, chaincode} = await createChildKey(
      walletIndex,
    );
    const address = getAddress(publicKey, 'bitcoinTestNet');
    return {
      walletName,
      walletType,
      privatieKey,
      publicKey,
      chaincode,
      address,
      walletIndex,
    };
  }
  async function convertToWallets() {
    try {
      setLoading(true);
      const result = await getWallets();
      result.map(async walletInfo => {
        const wallet = await generateWalletFromInfo(walletInfo);
        setWallets([...wallets, wallet]);
      });
      setLoading(false);
    } catch (error) {
      handleError('Convert To Wallets Error', error);
    }
  }

  useEffect(() => {
    convertToWallets();
  }, []);

  const insertWallet = async (walletName, walletType) => {
    try {
      setLoading(true);
      const walletInfo = {
        walletIndex: index,
        walletName,
        walletType,
      };
      await addWallet(index, walletName, walletType);
      const wallet = await generateWalletFromInfo(walletInfo);
      setIndex(index + 1);
      setWallets([...wallets, wallet]);
      setLoading(false);
    } catch (error) {
      handleError('insertWallet', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={style.background}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MainLogo />
          <OkButton
            title={'지갑추가 하기'}
            onPress={() => {
              setModalVisible(true);
            }}
            buttonStyle={style.button}
            textStyle={{color: Colors.wallet}}
          />
          <ScrollView style={style.scrollView}>
            {wallets.map(wallet => (
              <WalletItem
                key={wallet.walletIndex}
                walletName={wallet.walletName}
                walletType={wallet.walletType}
                privateKey={wallet.privateKey}
                publicKey={wallet.publicKey}
                address={wallet.address}
              />
            ))}
          </ScrollView>
          <AddWalletModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            addWallet={insertWallet}
          />
        </>
      )}
    </ImageBackground>
  );
};

export default WalletListScreen;
