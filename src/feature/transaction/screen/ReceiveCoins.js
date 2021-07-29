import React from 'react';
import {ImageBackground, TextInput} from 'react-native';
import {useSelector} from 'react-redux';

import {commonStyle} from '../../../common/style/commonStyle';
import {Colors} from '../../../common/style/color';
import {transactionStyle} from '../style/style';
import {selelctWalletByIndex} from '../../wallet/utils/wallet.reducer';

import MainLogo from '../../../common/component/MainLogo';
import IconTitle from '../component/item/IconTitle';
import ExitButton from '../../../common/component/ExitButton';

const copy = require('../../../common/image/copyLogo.png');
const style = {
  text: {
    marginBottom: 16,

    color: Colors.font,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    ...commonStyle.button,
    marginBottom: 15,
  },
  input: {
    ...transactionStyle.input,
  },
};

const ReceiveCoins = ({route, navigation}) => {
  const {id} = route.params;
  const {address} = useSelector(selelctWalletByIndex(id));

  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <IconTitle title={'Public Address'} icon={copy} />
      <TextInput style={style.text} value={address} />
      <ExitButton title={'돌아가기'} />
    </ImageBackground>
  );
};

export default ReceiveCoins;
