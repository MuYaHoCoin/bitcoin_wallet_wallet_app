/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ImageBackground, ScrollView} from 'react-native';

import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import WalletItem from '../component/WalletItem';
import Loading from '../../../common/screen/Loading';

import {commonStyle} from '../../../common/style/commonStyle';
import {Colors} from '../../../common/style/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectGetWalletListLoading,
  selectWalletIds,
} from '../utils/wallet.reducer';
import {getWalletListStart} from '../utils/wallet.action';

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
  const dispatch = useDispatch();
  const walletListLoading = useSelector(selectGetWalletListLoading);
  const walletIds = useSelector(selectWalletIds);

  function onMoveAddWallet() {
    navigation.navigate('AddWallet/Standard');
  }
  useEffect(() => {
    dispatch(getWalletListStart());
  }, []);

  return walletListLoading ? (
    <Loading />
  ) : (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={style.background}>
      <MainLogo />
      <OkButton
        title={'지갑추가 하기'}
        onPress={onMoveAddWallet}
        buttonStyle={style.button}
        textStyle={{color: Colors.wallet}}
      />
      <ScrollView style={style.scrollView}>
        {walletIds.map(id => (
          <WalletItem key={id} id={id} />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

export default WalletListScreen;
