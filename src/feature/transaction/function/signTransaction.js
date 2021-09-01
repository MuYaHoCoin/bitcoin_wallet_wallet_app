import {ECPair, script} from 'rn-bitcoinjs-lib';
import {Buffer} from 'safe-buffer';
import {handleError} from '../../../common/function/error';

export default function (unsignedTransaction, privateKey, publicKey) {
  const senderEcPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));

  const transaction = {...unsignedTransaction};
  transaction.pubkeys = [];
  const signatures = transaction.tosign.map(tosign => {
    transaction.pubkeys.push(publicKey.toString('hex'));
    return script.signature
      .encode(senderEcPair.sign(Buffer.from(tosign, 'hex')), 0x01)
      .toString('hex')
      .slice(0, -2);
  });
  transaction.signatures = signatures;
  return transaction;
}
