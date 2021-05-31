import * as BIP32 from 'bip32';
import {Buffer} from 'safe-buffer';
import {getMaster} from '../../database/function/master';

export const createChildKey = async index => {
  const master = await getMaster();

  console.log(master);
  //const parentPrivateKey = Buffer.from(masterPrivateKey, 'hex');
  /*
  const parentChainCode = Buffer.from(masterChainCode, 'hex');
  const masterNode = BIP32.fromPrivateKey(parentPrivateKey, parentChainCode);

  const {privateKey, publicKey, chainCode} = masterNode.derivePath(
    'm/0/0/7/' + index,
  );
  return {
    privateKey: privateKey ? privateKey.toString('hex') : '',
    publicKey: publicKey.toString('hex'),
    chainCode: chainCode.toString('hex'),
  };*/
};
