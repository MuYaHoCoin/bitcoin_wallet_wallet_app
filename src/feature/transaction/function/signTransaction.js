import {ECPair, script} from 'rn-bitcoinjs-lib';
import {Buffer} from 'safe-buffer';

export default function (unsignedTransaction, privateKey, publicKey) {
  const senderEcPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));

  unsignedTransaction.pubkeys = [];
  const signatures = unsignedTransaction.tosign.map(tosign => {
    unsignedTransaction.pubkeys.push(publicKey.toString('hex'));
    return script.signature
      .encode(senderEcPair.sign(Buffer.from(tosign, 'hex')), 0x01)
      .toString('hex')
      .slice(0, -2);
  });
  unsignedTransaction.signatures = signatures;

  return unsignedTransaction.hash;
}
