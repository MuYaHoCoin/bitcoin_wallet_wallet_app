import {crypto} from 'react-native-bitcoinjs-lib';
import {Buffer} from 'safe-buffer';
import base58Check from 'base58check';
import {handleError} from '../../../common/function/error';
import {payments} from 'rn-bitcoinjs-lib';
import {getMultiAddress} from '../../database/function/address';

const networkPrefix = {
  bitcoin: '00',
  ptsh: '05',
  bitcoinTestNet: '6f',
};

export const getAddress = async (
  publicKey,
  walletType = 'standard',
  walletIndex,
  network = 'bitcoinTestNet',
) => {
  try {
    if (walletType === 'multiSig') {
      const {} = await getMultiAddress(walletIndex);
      return address;
    } else {
      const address = crypto.hash160(Buffer.from(publicKey, 'hex'));
      const prefix = networkPrefix[network];
      const base58CheckAddress = base58Check.encode(address, prefix);
      return base58CheckAddress;
    }
  } catch (error) {
    handleError('Get Address', error);
  }
};

export const getMultiSigAddress = (pubkeys, m) => {
  const redeem = payments.p2ms(m, pubkeys);
  const {address} = payments.p2sh({
    redeem,
  });
  return address;
};
