import axios from 'axios';

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

export const getBTCCurrentPrice = () => {
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

export const creatTransaction = () => {};
