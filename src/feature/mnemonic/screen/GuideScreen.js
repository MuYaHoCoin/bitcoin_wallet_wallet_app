import React from 'react';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import MainLogo from '../../../common/component/MainLogo';
import OkButton from '../../../common/component/OkButton';
import {Colors} from '../../../common/style/color';
import {commonStyle} from '../../../common/style/commonStyle';
import {AddWalletButtonStyle, AddWalletButtonTextStyle} from '../style/style';

const style = {
  subTitle: {
    marginBottom: 16,

    color: Colors.font,
    fontSize: 16,
    fontWeight: '400',
  },
  content: {
    marginBottom: 24,
    color: Colors.font,
    fontSize: 12,
    fontWeight: '200',
  },
  background: {
    justifyContent: 'center',
    alignItem: 'center',
  },
};

const GuideScreen = ({navigation}) => {
  const goNextScreen = () => {
    navigation.navigate('Master/New');
  };
  return (
    <ImageBackground
      style={[commonStyle.background, style.background]}
      source={require('../../../common/image/bitcoinBackground.png')}>
      <MainLogo />
      <Text style={style.subTitle}>당신의 지갑을 지금 백업하세요!</Text>
      <Text style={style.content}>
        다음 단계에서는 지갑을 복구할 수 있는 12개의 단어들이 보일겁니다.
      </Text>
      <OkButton
        title={'계속'}
        onPress={goNextScreen}
        buttonStyle={AddWalletButtonStyle}
        textStyle={AddWalletButtonTextStyle}
      />
    </ImageBackground>
  );
};

export default GuideScreen;
