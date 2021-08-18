import axios from 'axios';

const rootUrl = {
  main: 'https://api.blockcypher.com/v1/btc/main',
  bitcoinTestNet: 'https://api.blockcypher.com/v1/btc/test3',
};

export async function getBalanceAPI(address, network = 'bitcoinTestNet') {
  const {data} = await axios.get(
    rootUrl[network] + '/addrs/' + address + '/balance',
  );
  return data.balance;
}

export async function getTransactionListAPI(
  address,
  network = 'bitcoinTestNet',
) {
  const {data} = await axios.get(
    rootUrl[network] + '/addrs/' + address + '/full/',
  );
  return data.txs;
}

export async function createUnsignedTransacionAPI(
  senderAddress,
  receiverAddress,
  value,
  network = 'bitcoinTestNet',
) {
  const newTransaction = {
    input: [{address: [senderAddress]}],
    output: [{address: [receiverAddress], value}],
  };
  const {data: transaction} = await axios.post(
    rootUrl[network] + 'txs/new',
    newTransaction,
  );
  return transaction;
}

export async function broadcastTransaction(
  transactionHash,
  network = 'bitcoinTestNet',
) {
  axios.post(rootUrl[network] + '/txs/push', JSON.stringify(transactionHash));
}
