import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {
  createMasterNode,
  generateNewMnemonic,
} from '../function/createMasterWallet';
import {addMaster, createMaster} from '../../database/function/master';
import {useNavigation} from '@react-navigation/native';

const AddMasterWalletScreen = () => {
  const navigation = useNavigation();
  const [mnemonic, setMnemonic] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createMaster();
    generateNewMnemonic().then(newMnemonic =>
      setMnemonic(newMnemonic.toString()),
    );
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
    <View>
      <Text>{mnemonic.toString()}</Text>
      <TextInput
        placeholder={'optional: put PassWord!'}
        value={password}
        onChangeText={setPassword}
      />
      <Button title={'Create Master Wallet'} onPress={createMasterWallet} />
    </View>
  );
};

export default AddMasterWalletScreen;
