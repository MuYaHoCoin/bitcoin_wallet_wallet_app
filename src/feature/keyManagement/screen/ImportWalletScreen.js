import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';
import {addMaster} from '../../database/function/master';
import { restoreWallet } from '../../wallet/function/restoreWallet';
import RandomWordInput from '../component/RandomWordInput';
import {
  AddWalletButtonStyle,
  AddWalletButtonTextStyle,
  mnemonicItemContainerStyle,
} from '../style/style';

const initialMnemonic = [
  'wheat',
  'before',
  'cream',
  'dragon',
  'perfect',
  'foster',
  'behave',
  'garlic',
  'comic',
  'shell',
  'stand',
  'chapter',
];
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
  subTitle: {
    color: Colors.font,
    fontSize: 16,
  },
  explanation: {
    color: Colors.font,
    fontSize: 12,
  },
};

const ImportWalletScreen = ({navigation}) => {
  const [mnemonic, setMnemonic] = useState(initialMnemonic);
  const [password, setPassword] = useState('');

  const setTargetMnemonic = (targetIndex, newWord) => {
    setMnemonic(
      mnemonic.map((word, index) => (index === targetIndex ? newWord : word)),
    );
  };
  const createMasterWallet = async () => {
    await addMaster(mnemonic.join(' '), password);
    await restoreWallet();
    navigation.navigate('Main');
  };
  return (
    <ScrollView contentContainerStyle={style.background}>
      <MainLogo containerStyle={{marginBottom: 16}} />
      <Text style={style.subTitle}>복구 문구 인증</Text>
      <Text style={style.explanation}>
        단어들을 빈칸에 알맞은 순서대로 적어주세요
      </Text>
      <View style={mnemonicItemContainerStyle}>
        {mnemonic.map((randomWord, index) => (
          <RandomWordInput
            key={index}
            index={index + 1}
            text={mnemonic[index]}
            setText={text => {
              setTargetMnemonic(index, text);
            }}
          />
        ))}
      </View>
      <TextInput
        placeholder={'Optional: put PassWord!'}
        value={password}
        onChangeText={setPassword}
        style={commonStyle.input}
      />
      <OkButton
        title={'지갑 불러오기'}
        onPress={createMasterWallet}
        buttonStyle={AddWalletButtonStyle}
        textStyle={AddWalletButtonTextStyle}
      />
    </ScrollView>
  );
};

export default ImportWalletScreen;
