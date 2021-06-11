import {crypto} from 'react-native-bitcoinjs-lib';
import {Buffer} from 'safe-buffer';
import base58Check from 'base58check';
import {handleError} from '../../../common/function/error';

const networkPrefix = {
  bitcoin: '00',
  ptsh: '05',
  bitcoinTestNet: '6f',
};

export const getAddress = (publicKey, network = 'bitcoinTestNet') => {
  try {
    const address = crypto.hash160(Buffer.from(publicKey, 'hex'));
    console.log('address', address);
    const prefix = networkPrefix[network];
    const base58CheckAddress = base58Check.encode(address, prefix);
    console.log('base58CheckAddress', base58CheckAddress);
    return base58CheckAddress;
  } catch (error) {
    handleError('Get Address', error);
  }
};
