import React from 'react';
import {ImageBackground} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import NoButton from '../../../common/component/NoButton';
import OkButton from '../../../common/component/OkButton';
import {commonStyle} from '../../../common/style/commonStyle';

const style = {
  background: {
    justifyContent: 'center',
  },
  button: {
    marginBottom: 16,
  },
};

const CreateMasterScreen = ({navigation}) => {
  const onNewWallet = () => {
    console.log('aaa');
    navigation.navigate('Master/Guide');
  };
  const onImportWallet = () => {
    console.log('sdsd');
  };
  return (
    <ImageBackground
      style={[commonStyle.background, style.background]}
      source={require('../../../common/image/bitcoinBackground.png')}>
      <MainLogo />
      <OkButton
        title={'지갑 새로 만들기'}
        onPress={onNewWallet}
        buttonStyle={style.button}
      />
      <NoButton title={'지갑 불러오기'} onPress={onImportWallet} />
    </ImageBackground>
  );
};

export default CreateMasterScreen;
