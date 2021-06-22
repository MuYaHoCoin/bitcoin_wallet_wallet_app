import {getMaster} from '../../database/function/master';
import {Buffer} from 'safe-buffer';
import * as BIP32 from 'bip32';
import {handleError} from '../../../common/function/error';
import {createMasterNode} from '../../mnemonic/function/createMasterWallet';

export const createChildKey = async index => {
  try {
    const {mnemonic, password} = await getMaster();
    const master = createMasterNode(mnemonic, password);

    const masterNode = BIP32.fromPrivateKey(
      new Buffer(master.privateKey, 'hex'),
      new Buffer(master.chainCode, 'hex'),
    );

    const {privateKey, publicKey, chainCode} = masterNode.derivePath(
      "m/44'/1'/0'/0/" + index,
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
