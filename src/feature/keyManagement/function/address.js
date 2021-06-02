import {crypto} from 'react-native-bitcoinjs-lib';
import {Buffer} from 'safe-buffer';
import base58Check from 'base58check';

const networkPrefix = {
  bitcoin: '00',
  ptsh: '05',
  bitcoinTestNet: '6f',
};

export const getAddress = (publicKey, network = 'bitcoinTestNet') => {
  const address = crypto.hash160(Buffer.from(publicKey, 'hex'));
  const prefix = networkPrefix[network];
  const base58CheckAddress = base58Check.encode(address, prefix);
  return base58CheckAddress;
};
