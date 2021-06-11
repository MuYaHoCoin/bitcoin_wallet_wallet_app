import axios from 'axios';

var rootUrl = 'https://api.blockcypher.com/v1/btc/';
export const getBalance = async (address, network = 'test') => {
  switch (network) {
    case 'main': {
      rootUrl += 'main/';
      break;
    }
    case 'test': {
      rootUrl += 'test3/';
      break;
    }
    default:
  }
  const data = await axios.get(rootUrl + '/addrs/' + address);
  return data.data.balance;
};
