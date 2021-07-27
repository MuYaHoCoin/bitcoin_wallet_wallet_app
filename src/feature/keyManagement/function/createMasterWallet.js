import {Buffer} from 'safe-buffer';
import * as BIP39 from 'react-native-bip39';
import * as BIP32 from 'bip32';
import {handleError} from '../../../common/function/error';

export const generateNewMnemonic = async () => {
  try {
    const mnemonic = await BIP39.generateMnemonic();
    const mnemonicList = mnemonic.toString().split(' ');
    return mnemonicList;
  } catch (error) {
    handleError('Generate New Mnemonic', error);
  }
};

export const createMasterNode = (mnemonic, password) => {
  const seed = BIP39.mnemonicToSeed(Buffer.from(mnemonic), password);
  const masterNode = BIP32.fromSeed(seed);
  return masterNode;
};
