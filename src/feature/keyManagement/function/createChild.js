import {getMaster} from '../../database/function/master';
import {Buffer} from 'safe-buffer';
import * as BIP32 from 'bip32';

export const createChildKey = async index => {
  const master = await getMaster();

  const parentPrivateKey = Buffer.from(master.privateKey, 'hex');
  const parentChainCode = Buffer.from(master.chainCode, 'hex');

  const masterNode = BIP32.fromPrivateKey(parentPrivateKey, parentChainCode);

  const {privateKey, publicKey, chainCode} = masterNode.derivePath(
    'm/0/0/7/' + index,
  );
  return {
    privateKey: privateKey.toString('hex'),
    publicKey: publicKey.toString('hex'),
    chainCode: chainCode.toString('hex'),
  };
};
