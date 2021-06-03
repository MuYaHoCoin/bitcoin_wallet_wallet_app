import React from 'react';
import {View} from 'react-native';
import {Picker} from 'react-native-woodpicker';
import {useState} from 'react/cjs/react.development';

const NetWorkData = [
  {label: 'MainNet', value: 'bitcoin'},
  {label: 'TestNet', value: 'bitcoinTestNet'},
];

const Header = () => {
  const [network, setNetwork] = useState('bitcoin');
  return (
    <View>
      <Picker
        item={network}
        items={NetWorkData}
        onItemChange={setNetwork}
        title={'NetWork Picker'}
        placeholer={'Select NetWord'}
      />
    </View>
  );
};

export default Header;
