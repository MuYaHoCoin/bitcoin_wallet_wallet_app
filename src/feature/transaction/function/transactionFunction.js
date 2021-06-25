import axios from 'axios';
import {Buffer} from 'safe-buffer';
import * as bitcoin from 'rn-bitcoinjs-lib';
import {handleError} from '../../../common/function/error';

export const getBalance = async (address, network = 'bitcoinTestNet') => {
  try{
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
    console.log(balance.data.balance);
    return balance.data.balance;
  }catch(e) {
    handleError("getBalance error",e);
  }
  
};

export const getBTCCurrentPrice = async () => {
  const price = await axios.get(
    'https://api.coindesk.com/v1/bpi/currentprice.json',
  );
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
    await axios.get(rootUrl + '/addrs/' + address + '/full')
  ).data.txs;
  const txinfos = [];
  let count = 0;
  txs.forEach(element => {
    const oneTx={};
    oneTx.hash = element.hash;
    oneTx.isSend = false;
    element.inputs.forEach(ins => {
      ins.addresses.forEach(adr => {
        if(adr === address) {
          oneTx.isSend = true;
          count +=1;
          return false;
        }
      })
    });
    if(element.confirmations === 0) {
      oneTx.isConfirmed = false;
    }
    else {
      oneTx.isConfirmed = true;
    }
    oneTx.value = element.total;
    txinfos.push(oneTx);
  });
  console.log(txinfos);
  console.log("count : ",count)
  return txinfos;
};

export const createTransaction = async (
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
      rootUrl += 'test3/';
      break;
    }
    default:
  }
  try {
    let newtx = {
      inputs: [{addresses: [senderAddress]}],
      outputs: [{addresses: [receiverAddress], value: coinToSend}],
    };
    console.log('a',senderPrivate);
    let key = bitcoin.ECPair.fromPrivateKey(Buffer.from(senderPrivate, 'hex'));

    console.log('aa', newtx);
    const {data: tmptx} = await axios.post(rootUrl + 'txs/new', newtx);
    console.log('tx data', tmptx);
    if (checkError(tmptx)) {
      return;
    }
    
    console.log('aaa');
    tmptx.pubkeys = [];
    tmptx.signatures = tmptx.tosign.map(tosign => {
      tmptx.pubkeys.push(senderPublic.toString('hex'));
      return bitcoin.script.signature
        .encode(key.sign(Buffer.from(tosign, 'hex')), 0x01)
        .toString('hex')
        .slice(0, -2);
    });
    console.log('aaaa');
    const {} = await axios.post(rootUrl + 'txs/send', tmptx);
    alert('transaction success!!');
  } catch (error) {
    alert('transaction error!!');
    handleError('Create Transaction Error', error);
  }
};

export const createMultisigTransaction = async (
  senderPrivate
) => {

}
const checkError = msg => {
  if (false) {
    log('Errors occured!!/n' + msg.errors.join('/n'));
    return true;
  }
};

export const isValidAddress = (address) => {
  try{
    console.log(address);
    bitcoin.address.toOutputScript(address, bitcoin.networks.testnet);
    return true;
  } catch (e) {
    console.log('invalid address input');
    return false;
  }
};


