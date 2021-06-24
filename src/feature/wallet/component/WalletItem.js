import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useState} from 'react/cjs/react.development';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
import {getBalance} from '../../transaction/function/transactionFunction';
const WalletTypeMap = {
  standard: 'Standard',
  twoFactor: 'Two-Factor',
  multiSig: 'Multi-Sig',
};
const style = {
  container: {
    width: '100%',
    height: 120,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    padding: 8,
    marginBottom: 12,

    backgroundColor: Colors.wallet,
    borderRadius: 12,
  },
  header: {
    width: '100%',
    height: 20,

    marginBottom: 8,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'italic',
  },
  headerLabel: {
    width: 6,
    height: 18,

    marginRight: 6,

    backgroundColor: Colors.walletButton,
  },
  address: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',

    textAlign: 'center',
    alignSelf: 'center',

    marginBottom: 16,
  },
  buttonSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 132,
    height: 32,
    backgroundColor: Colors.walletButton,
  },
  buttonText: {
    color: Colors.walletText,
  },
};

const WalletItem = ({
  walletName,
  walletType,
  address,
  privateKey,
  publicKey,
}) => {
  console.log(walletType);
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0.0);
  useEffect(() => {
    getBalance(address).then(btc => {
      setBalance(btc * 0.00000001);
    });
  }, [address]);
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.headerLabel} />
        <Text style={style.headerText}>
          {WalletTypeMap[walletType] + ' - ' + walletName}
        </Text>
      </View>
      <Text style={style.address}>{balance} BTC</Text>
      <View style={style.buttonSection}>
        <OkButton
          title={'Recieve'}
          buttonStyle={style.button}
          textStyle={style.buttonText}
          onPress={() => navigation.navigate('ReceiveCoins', {address})}
        />
        <OkButton
          title={'send'}
          buttonStyle={style.button}
          textStyle={style.buttonText}
          onPress={() =>
            navigation.navigate('SendCoins', {privateKey, publicKey, address, walletType})
          }
        />
      </View>
    </View>
  );
};

export default WalletItem;
