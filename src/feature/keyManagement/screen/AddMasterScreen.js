import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import {generateNewMnemonic} from '../function/createMasterWallet';
import {addMaster, createMaster} from '../../database/function/master';
import {
  AddWalletButtonStyle,
  AddWalletButtonTextStyle,
  mnemonicItemContainerStyle,
} from '../style/style';
import RandomWordItem from '../component/RandomWordItem';
import MainLogo from '../../../common/component/MainLogo';
import {commonStyle} from '../../../common/style/commonStyle';
import OkButton from '../../../common/component/OkButton';

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

const AddMasterWalletScreen = ({navigation}) => {
  const [mnemonic, setMnemonic] = useState([]);
  const [password, setPassword] = useState('');

  useEffect(() => {
    createMaster();
    generateNewMnemonic().then(newMnemonic => setMnemonic([...newMnemonic]));
  }, []);

  const createMasterWallet = () => {
    addMaster(mnemonic.join(' '), password);
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
      <OkButton
        title={'지갑 만들기'}
        onPress={createMasterWallet}
        buttonStyle={AddWalletButtonStyle}
        textStyle={AddWalletButtonTextStyle}
      />
    </ScrollView>
  );
};

export default AddMasterWalletScreen;

var isEmpty = function (value) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};
