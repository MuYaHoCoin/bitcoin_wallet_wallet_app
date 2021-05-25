import {KeyType} from '../utils/types';
import * as BIP39 from 'react-native-bip39';
import * as BIP32 from 'bip32';

export const generateNewMnemonic = async (): Promise<Buffer> => {
  const mnemonic: Buffer = await BIP39.generateMnemonic();
  console.log(mnemonic);
  return mnemonic;
};

export const createMasterNode = (mnemonic: string, password?: string): KeyType => {
  const seed = BIP39.mnemonicToSeed(new Buffer(mnemonic), password);
  const node = BIP32.fromSeed(seed);
  return {
    privateKey: node.privateKey ? node.privateKey : new Buffer(''),
    publicKey: node.publicKey,
    chainCode: node.chainCode,
  };
};
