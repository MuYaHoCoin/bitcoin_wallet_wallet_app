import React from 'react';

import BaseComponent from '../../../common/component/BaseComponent';
import {addPin} from '../../database/function/pin';
import PinNumberComponent from '../../pin/component/PinNumberComponent';

const TwoFactorWallet = ({route, navigation}) => {
  const {index} = route.params;
  function onSubmit(pin) {
    addPin(index, pin);
    navigation.navigate('Main');
  }
  return (
    <BaseComponent>
      <PinNumberComponent onSubmit={onSubmit} />
    </BaseComponent>
  );
};

export default TwoFactorWallet;
