import axios from 'axios';

var rootUrl = 'https://api.blockcypher.com/v1/btc/';
export const getBalance = async (address, network = 'bitcoinTestNet') => {
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
  await axios.get(rootUrl + '/addrs/' + address).then(d => {
    console.log(d.data);
    return d.data.balance;
  });
};

export const getTransactionList
