import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View} from 'react-native';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
const WalletTypeMap = {
  standard: 'Standard',
  'two-factor': 'Two-Factor',
  'multi-sig': 'Multi-Sig',
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

const WalletItem = ({walletName, walletType, address}) => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View style={style.headerLabel} />
        <Text style={style.headerText}>
          {WalletTypeMap[walletType] + ' - ' + walletName}
        </Text>
      </View>
      <Text style={style.address}>{address}</Text>
      <View style={style.buttonSection}>
        <OkButton
          title={'Recieve'}
          buttonStyle={style.button}
          textStyle={style.buttonText}
          onPress={() => navigation.navigate('ReceiveCoins')}
        />
        <OkButton
          title={'send'}
          buttonStyle={style.button}
          textStyle={style.buttonText}
          onPress={() => navigation.navigate('SendCoins')}
        />
      </View>
    </View>
  );
};

export default WalletItem;
