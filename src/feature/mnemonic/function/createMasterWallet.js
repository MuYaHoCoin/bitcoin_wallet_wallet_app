import {Buffer} from 'safe-buffer';
import * as BIP39 from 'react-native-bip39';
import * as BIP32 from 'bip32';

export const generateNewMnemonic = async () => {
  const mnemonic = await BIP39.generateMnemonic();
  const mnemonicList = mnemonic.toString().split(' ');
  console.log(mnemonicList);
  return mnemonicList;
};

export const createMasterNode = (mnemonic, password) => {
  const seed = BIP39.mnemonicToSeed(Buffer.from(mnemonic), password);
  const {privateKey, publicKey, chainCode} = BIP32.fromSeed(seed);
  return {
    privateKey: privateKey.toString('hex'),
    publicKey: publicKey.toString('hex'),
    chainCode: chainCode.toString('hex'),
  };
};
