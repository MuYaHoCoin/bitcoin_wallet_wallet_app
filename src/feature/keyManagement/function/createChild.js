import {getMaster} from '../../database/function/master';
import {Buffer} from 'safe-buffer';
import * as BIP32 from 'bip32';
import {handleError} from '../../../common/function/error';
import {createMasterNode} from './createMasterWallet';

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
    return {
      privateKeys: [
        firstPrivateKey.toString('hex'),
        secondPrivateKey.toString('hex'),
      ],
      publicKeys: [
        Buffer.from(publicKey, 'hex'),
        Buffer.from(firstPublicKey, 'hex'),
        Buffer.from(secondPublicKey, 'hex'),
      ],
    };
  } catch (error) {
    handleError('create Multi Sig ChildKey Error', error);
  }
};
