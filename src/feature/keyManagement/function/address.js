import {crypto, payments} from 'rn-bitcoinjs-lib';
import {Buffer} from 'safe-buffer';
import base58Check from 'base58check';
import {handleError} from '../../../common/function/error';

const networkPrefix = {
  bitcoin: '00',
  ptsh: '05',
  bitcoinTestNet: '6f',
};

export const getAddress = async (publicKey, network = 'bitcoinTestNet') => {
  try {
    const address = crypto.hash160(Buffer.from(publicKey, 'hex'));
    const prefix = networkPrefix[network];
    const base58CheckAddress = base58Check.encode(address, prefix);
    return base58CheckAddress;
  } catch (error) {
    handleError('Get Address', error);
  }
};

export const getXpub = async (publicKey, chainCode) => {
  const encodedPubKey = base58Check.encode(publicKey);
  const encodedChainCode = base58Check.encode(chainCode);

  return 'xpub' + encodedPubKey + encodedChainCode;
};

export const getMultiSigAddress = (pubkeys, m) => {
  const redeem = payments.p2ms({m, pubkeys});
  const {address} = payments.p2sh({
    redeem,
  });
  return address;
};
