import React from 'react';
import {View} from 'react-native';
import {useState} from 'react/cjs/react.development';
import CheckLabel from '../../../common/component/CheckLabel';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',

    marginBottom: 20,
  },
};

const WalletTypeCheckBox = ({walletType, setWalletType}) => {
  const [standardSelected, setStandardSelected] = useState(
    walletType === 'standard',
  );
  const [twoFactorSelected, setTwoFactorSelected] = useState(
    walletType === 'two-factor',
  );
  const [multiSigSelected, setMultiSigSelected] = useState(
    walletType === 'multi-sig',
  );
  return (
    <View style={style.container}>
      <CheckLabel
        title={'Standard'}
        value={standardSelected}
        onChange={value => {
          setStandardSelected(value);
          setWalletType('standard');
          if (value) {
            setMultiSigSelected(!value);
            setTwoFactorSelected(!value);
          }
        }}
      />
      <CheckLabel
        title={'Two-Factor'}
        value={twoFactorSelected}
        onChange={value => {
          setTwoFactorSelected(value);
          setWalletType('two-factor');
          if (value) {
            setMultiSigSelected(!value);
            setStandardSelected(!value);
          }
        }}
      />
      <CheckLabel
        title={'Multi-Sig'}
        value={multiSigSelected}
        onChange={value => {
          setMultiSigSelected(value);
          setWalletType('multi-sig');
          if (value) {
            setTwoFactorSelected(!value);
            setStandardSelected(!value);
          }
        }}
      />
    </View>
  );
};

export default WalletTypeCheckBox;
