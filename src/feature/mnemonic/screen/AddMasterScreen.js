import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createMasterNode,
  generateNewMnemonic,
} from '../function/createMasterWallet';
import {addMaster, createMaster} from '../../database/function/master';
import {useNavigation} from '@react-navigation/native';
import {
  AddWalletButtonStyle,
  AddWalletButtonTextStyle,
  InputStyle,
  mnemonicItemContainerStyle,
} from '../style/style';
import RandomWordItem from '../component/RandomWordItem';
import MainLogo from '../../../common/component/MainLogo';
import {commonStyle} from '../../../common/style/commonStyle';

const style = {
  background: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    paddingTop: 20,

    backgroundColor: '#212121',
  },
};

const AddMasterWalletScreen = () => {
  const navigation = useNavigation();
  const [mnemonic, setMnemonic] = useState([]);
  const [password, setPassword] = useState('');

  useEffect(() => {
    createMaster();
    generateNewMnemonic().then(newMnemonic => setMnemonic([...newMnemonic]));
  }, []);

  const createMasterWallet = () => {
    const {privateKey, publicKey, chainCode} = createMasterNode(
      mnemonic,
      password,
    );
    addMaster(chainCode, publicKey, privateKey);
    navigation.navigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={style.background}>
      <MainLogo />
      <View style={mnemonicItemContainerStyle}>
        {mnemonic.map((randomWord, index) => (
          <RandomWordItem key={index} index={index + 1} mnemonic={randomWord} />
        ))}
      </View>
      <TextInput
        placeholder={'Optional: put PassWord!'}
        value={password}
        onChangeText={setPassword}
        style={commonStyle.input}
      />
      <TouchableOpacity
        style={AddWalletButtonStyle}
        onPress={createMasterWallet}>
        <Text style={AddWalletButtonTextStyle}>지갑 만들기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddMasterWalletScreen;