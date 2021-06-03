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
  mnemonicItemContainerStyle,
} from '../style/style';
import RandomWordItem from '../component/RandomWordItem';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
    addMaster(
      chainCode.toString('hex'),
      publicKey.toString('hex'),
      privateKey.toString('hex'),
    );
    navigation.navigate('Main');
  };

  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#212121',
      }}>
      <View style={mnemonicItemContainerStyle}>
        {mnemonic.map((randomWord, index) => (
          <RandomWordItem key={index} index={index + 1} mnemonic={randomWord} />
        ))}
      </View>
      <TextInput
        placeholder={'optional: put PassWord!'}
        value={password}
        onChangeText={setPassword}
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
