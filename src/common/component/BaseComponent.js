import React from 'react';
import {ImageBackground} from 'react-native';
import {commonStyle} from '../style/commonStyle';

const style = {
  background: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItem: 'center',
  },
};

const BaseComponent = ({children}) => {
  return (
    <ImageBackground
      source={require('../image/bitcoinBackground.png')}
      style={[commonStyle.background, style.background]}>
      {children}
    </ImageBackground>
  );
};

export default BaseComponent;
