/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';

import PinNumberItem from './item/PinNumberItem';
import {Colors} from '../../../common/style/color';
import {useState} from 'react/cjs/react.development';
import PinNumber from './item/PinNumber';
import {useEffect} from 'react';

const pins = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const style = {
  container: {
    width: '90%',
    height: '90%',

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Colors.wallet,

    marginTop: 32,
    marginBottom: 20,
  },
};
const PinNumberComponent = ({onSubmit}) => {
  const [pin, setPin] = useState('');
  useEffect(() => {
    console.log(pin);
    if (pin.length >= 4) {
      onSubmit(pin);
      setPin('');
    }
  }, [pin]);
  function onItemClick(num) {
    setPin(pin + num);
  }
  return (
    <>
      <Text style={style.text}>PIN Number</Text>
      <PinNumber pinNumber={pin} />
      <View style={style.container}>
        {pins.map((num, index) => (
          <PinNumberItem
            key={index}
            content={num}
            onPress={() => {
              onItemClick(num);
            }}
          />
        ))}
      </View>
    </>
  );
};

export default PinNumberComponent;
