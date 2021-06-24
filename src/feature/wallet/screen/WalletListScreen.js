/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView} from 'react-native';

import {addWallet, getWallets} from '../../database/function/wallets';
import {getAddress} from '../../keyManagement/function/address';
import {createChildKey} from '../../keyManagement/function/createChild';

import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import AddWalletModal from '../component/AddWalletModal';
import WalletItem from '../component/WalletItem';

import {handleError} from '../../../common/function/error';
import {commonStyle} from '../../../common/style/commonStyle';
import {Colors} from '../../../common/style/color';
import Loading from '../../../common/screen/Loading';
import {getPins} from '../../database/function/pin';
import {restoreWallet} from '../function/restoreWallet';

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

const WalletListScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);

  async function generateWalletFromInfo(walletInfo) {
    const {walletIndex, walletName, walletType} = walletInfo;
    const {privatieKey, publicKey, chaincode} = await createChildKey(
      walletIndex,
    );
    const address = getAddress(
      publicKey,
      walletType,
      walletIndex,
      'bitcoinTestNet',
    );
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
      setWallets(
        await Promise.all(
          result.map(async walletInfo => {
            const wallet = await generateWalletFromInfo(walletInfo);
            return wallet;
          }),
        ),
      );

      setIndex(result.length);
      setLoading(false);
    } catch (error) {
      handleError('Convert To Wallets Error', error);
    }
  }
  async function insertWallet(walletName, walletType) {
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
  }
  function onMoveAddWallet() {
    navigation.navigate('AddWallet/Standard', {addWallet: insertWallet, index});
  }
  useEffect(() => {
    convertToWallets();
    getPins();
  }, []);

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
            onPress={onMoveAddWallet}
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
        </>
      )}
    </ImageBackground>
  );
};

export default WalletListScreen;
