import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {createKey, generateNewMnemonic} from '../function/createKey';

const CreateWalletScreen = () => {
  const [test, setTest] = useState('');
  const [privateKey, setPrivateKey] = useState<string | undefined>('');

  useEffect(() => {
    generateNewMnemonic().then(mnemonic => setTest(mnemonic));
  }, []);
  useEffect(() => {
    if (test !== '') setPrivateKey(createKey(new Buffer(test)).privateKey);
  }, [test]);

  return (
    <View>
      <Text>{test}</Text>
      <Text>{privateKey}</Text>
    </View>
  );
};

export default CreateWalletScreen;
