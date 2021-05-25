import {KeyType} from './../utils/types';
import * as BIP32 from 'bip32';
export const createChildKey = (
  masterPrivateKey: Buffer,
  masterChainCode: Buffer,
  index: number,
): KeyType => {
  const parentPrivateKey = new Buffer(masterPrivateKey);
  const parentChainCode = new Buffer(masterChainCode);
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
