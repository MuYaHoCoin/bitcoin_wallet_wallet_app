import axios from 'axios';
import {Buffer} from 'safe-buffer';
import * as bitcoin from 'rn-bitcoinjs-lib';
import {handleError} from '../../../common/function/error';

export const getBalance = async (address, network = 'bitcoinTestNet') => {
  var rootUrl = 'https://api.blockcypher.com/v1/btc/';
  switch (network) {
    case 'bitcoin': {
      rootUrl += 'main/';
      break;
    }
    case 'bitcoinTestNet': {
      rootUrl += 'test3/';
      break;
    }
    default:
  }
  const balance = await axios.get(rootUrl + '/addrs/' + address);
  return balance.data.balance;
};

export const getBTCCurrentPrice = async () => {
  const price = await axios.get(
    'https://api.coindesk.com/v1/bpi/currentprice.json',
  );
  console.log(price.data.bpi.USD.rate);
  return price.data.bpi.USD.rate;
};

export const getTransactionList = async (
  address,
  network = 'bitcoinTestNet',
) => {
  var rootUrl = 'https://api.blockcypher.com/v1/btc/';
  switch (network) {
    case 'bitcoin': {
      rootUrl += 'main/';
      break;
    }
    case 'bitcoinTestNet': {
      rootUrl += 'test3/';
      break;
    }
    default:
  }
  const txs = await (
    await axios.get(rootUrl + '/addrs/' + address)
  ).data.txrefs.slice(0, 10);
  console.log(txs);
  return txs;
};

export const creatTransaction = async (
  senderPrivate,
  senderPublic,
  senderAddress,
  receiverAddress,
  coinToSend,
  network,
) => {
  let rootUrl = 'https://api.blockcypher.com/v1/btc/';
  switch (network) {
    case 'bitcoin': {
      rootUrl += 'main/';
      break;
    }
    case 'bitcoinTestNet': {
      rootUrl += 'test3/';np
      break;
    }
    default:
  }
  try {
    let newtx = {
      inputs: [{addresses: [senderAddress]}],
      outputs: [{addresses: [receiverAddress], value: coinToSend}],
    };
    let key = bitcoin.ECPair.fromPrivateKey(Buffer.from(senderPrivate, 'hex'));

    const {data: tmptx} = await axios.post(rootUrl + 'txs/new', newtx);
    if (checkError(tmptx)) {
      return;
    }
    tmptx.pubkeys = [];
    tmptx.signatures = tmptx.tosign.map(tosign => {
      tmptx.pubkeys.push(senderPublic.toString('hex'));
      return bitcoin.script.signature
        .encode(key.sign(Buffer.from(tosign, 'hex')), 0x01)
        .toString('hex')
        .slice(0, -2);
    });
    const {} = await axios.post(rootUrl + 'txs/send', tmptx);
  } catch (error) {
    handleError('Create Transaction Error', error);
  }
};
const checkError = msg => {
  if (false) {
    log('Errors occured!!/n' + msg.errors.join('/n'));
    return true;
  }
};
