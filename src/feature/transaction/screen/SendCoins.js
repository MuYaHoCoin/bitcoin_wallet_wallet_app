import React from 'react';
import {commonStyle} from '../../../common/style/commonStyle';
import {transactionStyle} from '../style/style';
import {ImageBackground, Text, TextInput} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import {Colors} from '../../../common/style/color';
import BitcoinInput from '../component/BitcoinInput';
import OkButton from '../../../common/component/OkButton';
import {creatTransaction} from '../function/transactionFunction';

const style = {
  text: {
    marginBottom: 12,

    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.font,
  },
};

const SendCoins = ({visible, onClose, addWallet}) => {
  return (
    <ImageBackground
      source={require('../../../common/image/bitcoinBackground.png')}
      style={commonStyle.background}>
      <MainLogo />
      <Text style={style.text}>Public Address</Text>
      <TextInput style={transactionStyle.input} />
      <Text style={style.text}>Amount</Text>
      <BitcoinInput />
      <OkButton
        onPress={() =>
          creatTransaction(
            'f31ff1ad39dcf295a58b36b6966606a810cd287308d914a61bd2363d500a8c06',
            '035ffd30bb64acf4d07da787c1641cb17812a0ac98d295a773a4b0932df24bf51f',
            'n3Vz3TzoryAWGngXaV2FKpkUVESk6CcGok',
            'mihsQ947SZgAJxfKYZufD1DnGGSZzM1kzr',
            1000,
            'bitcoinTestNet',
          )
        }
      />
    </ImageBackground>
  );
};

export default SendCoins;
