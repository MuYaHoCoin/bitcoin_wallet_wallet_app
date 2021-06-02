import {Buffer} from 'safe-buffer';
import * as BIP39 from 'react-native-bip39';
import * as BIP32 from 'bip32';

export const generateNewMnemonic = async () => {
  const mnemonic = await BIP39.generateMnemonic();
  return mnemonic;
};

export const createMasterNode = (mnemonic, password) => {
  const seed = BIP39.mnemonicToSeed(Buffer.from(mnemonic), password);
  const node = BIP32.fromSeed(seed);
  return {
    privateKey: node.privateKey ? node.privateKey : new Buffer(''),
    publicKey: node.publicKey,
    chainCode: node.chainCode,
  };
};
