/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import Base58Check from 'base58check';
import {useEffect} from 'react';
import {Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import {createChildMultiSigKey} from '../../keyManagement/function/createChild';

import BaseComponent from '../../../common/component/BaseComponent';
import MainLogo from '../../../common/component/MainLogo';
import Loading from '../../../common/screen/Loading';
import IconTitle from '../../transaction/component/item/IconTitle';
import OkButton from '../../../common/component/OkButton';

const style = {
  input: {
    fontSize: 12,
  },
};

const MultiSigWallet = ({route, navigation}) => {
  const {index} = route.params;

  const clipBoardIcon = require('../../../common/image/copyLogo.png');
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState([]);

  async function getKeys() {
    setLoading(true);
    const newKeys = await createChildMultiSigKey(index);
    setKeys(newKeys);
    setLoading(false);
  }
  function onSubmit() {
    navigation.navigate('Main');
  }
  useEffect(() => {
    getKeys();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <BaseComponent>
      <MainLogo />
      <Text>2 of 3 Multi-Sig </Text>
      <IconTitle title={'Private Key 1'} icon={clipBoardIcon} />
      <TextInput
        value={Base58Check.encode(keys[0].toString('hex'))}
        style={[style.input]}
      />
      <IconTitle title={'Private Key 2'} icon={clipBoardIcon} />
      <TextInput value={Base58Check.encode(keys[1])} />
      <OkButton title={'확인'} onPress={onSubmit} />
    </BaseComponent>
  );
};

export default MultiSigWallet;
