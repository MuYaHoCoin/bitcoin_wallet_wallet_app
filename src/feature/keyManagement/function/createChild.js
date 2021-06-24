import {getMaster} from '../../database/function/master';
import {Buffer} from 'safe-buffer';
import * as BIP32 from 'bip32';
import {handleError} from '../../../common/function/error';
import {createMasterNode} from './createMasterWallet';

export const createChildKey = async index => {
  try {
    const {mnemonic, password} = await getMaster();
    const master = createMasterNode(mnemonic, password);

    const masterNode = BIP32.fromPrivateKey(
      new Buffer(master.privateKey, 'hex'),
      new Buffer(master.chainCode, 'hex'),
    );

    const {privateKey, publicKey, chainCode} = masterNode.derivePath(
      "m/44'/61'/0'/0/" + index,
    );
    return {
      privateKey: privateKey.toString('hex'),
      publicKey: publicKey.toString('hex'),
      chainCode: chainCode.toString('hex'),
    };
  } catch (error) {
    handleError('createChildKey Error', error);
  }
};

export const createChildMultiSigKey = async index => {
  try {
    const {mnemonic, password} = await getMaster();
    const master = createMasterNode(mnemonic, password);

    const masterNode = BIP32.fromPrivateKey(
      new Buffer(master.privateKey, 'hex'),
      new Buffer(master.chainCode, 'hex'),
    );

    const {publicKey} = masterNode.derivePath(`m/44'/1'/0'/0/${index}`);
    const {privateKey: firstPrivateKey, publicKey: firstPublicKey} =
      masterNode.derivePath(`m/44'/1'/0'/0/${index}/0`);
    const {privateKey: secondPrivateKey, publicKey: secondPublicKey} =
      masterNode.derivePath(`m/44'/1'/0'/0/${index}/1`);
    console.log(firstPrivateKey);
    return {
      privateKeys: [firstPrivateKey, secondPrivateKey],
      publicKeys: [publicKey, firstPublicKey, secondPublicKey],
    };
  } catch (error) {
    handleError('create Multi Sig ChildKey Error', error);
  }
};
