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

export const getBTCCurrentPrice = () => {
  const price = await axios.get(
    'https://api.coindesk.com/v1/bpi/currentprice.json',
  );
  console.log(price.data.bpi.USD.rate);
  return price.data.bpi.USD.rate;
};
