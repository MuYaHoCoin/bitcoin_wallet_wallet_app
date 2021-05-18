import * as BIP39 from 'react-native-bip39';
import * as BIP32 from 'bip32';

export const generateNewMnemonic = async () => {
  const mnemonic: Buffer = await BIP39.generateMnemonic();
  console.log(mnemonic);
  return mnemonic.toString();
};

export const createKey = (mnemonic: Buffer, password?: string) => {
  const seed = BIP39.mnemonicToSeed(mnemonic, password);
  const node = BIP32.fromSeed(seed);
  return {
    privateKey: node.privateKey?.toString('hex'),
    publicKey: node.publicKey,
    chainCode: node.chainCode,
  };
};
