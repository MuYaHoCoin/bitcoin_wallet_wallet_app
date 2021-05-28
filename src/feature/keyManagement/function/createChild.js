import * as BIP32 from 'bip32';
import {Buffer} from 'safe-buffer';

export const createChildKey = (masterPrivateKey, masterChainCode, index) => {
  const parentPrivateKey = Buffer.from(masterPrivateKey, 'hex');
  const parentChainCode = Buffer.from(masterChainCode, 'hex');
  const masterNode = BIP32.fromPrivateKey(parentPrivateKey, parentChainCode);

  const {privateKey, publicKey, chainCode} = masterNode.derivePath(
    'm/0/0/7/' + index,
  );
  return {
    privateKey: privateKey ? privateKey : new Buffer(''),
    publicKey,
    chainCode,
  };
};
