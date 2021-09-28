import axios from 'axios';
import {handleError} from '../../../common/function/error';

const rootUrl = {
  main: 'https://api.blockcypher.com/v1/btc/main',
  bitcoinTestNet: 'https://api.blockcypher.com/v1/btc/test3',
};

export async function getBalanceAPI(address, network = 'bitcoinTestNet') {
  try {
    const {data} = await axios.get(
      rootUrl[network] + '/addrs/' + address + '/balance',
    );
    return data.balance;
  } catch (error) {
    handleError('getBalanceAPIError', error.message);
  }
}

export async function getTransactionListAPI(
  address,
  network = 'bitcoinTestNet',
) {
  try {
    const {data} = await axios.get(
      rootUrl[network] + '/addrs/' + address + '/full/',
    );
    return data.txs;
  } catch (error) {
    handleError('get Transaction List Error : ', error.message);
  }
}

export async function createUnsignedTransacionAPI(
  senderAddress,
  receiverAddress,
  value,
  network = 'bitcoinTestNet',
) {
  const newTransaction = {
    inputs: [{addresses: [senderAddress]}],
    outputs: [{addresses: [receiverAddress], value: parseInt(value)}],
  };
  console.log(JSON.stringify(newTransaction));
  const {data: transaction} = await axios.post(
    'https://api.blockcypher.com/v1/btc/test3/txs/new',
    JSON.stringify(newTransaction),
  );
  return transaction;
}

export async function sendTransactionAPI(
  transaction,
  network = 'bitcoinTestNet',
) {
  const result = await axios.post(
    rootUrl[network] + '/txs/send',
    JSON.stringify(transaction),
  );
  return result.data;
}
