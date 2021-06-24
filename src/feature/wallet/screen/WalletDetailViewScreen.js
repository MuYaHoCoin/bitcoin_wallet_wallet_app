import React, {useState, useEffect} from 'react';
import BaseComponent from '../../../common/component/BaseComponent';
import {getTransactionList} from '../../transaction/function/transactionFunction';

const WalletDetailViewScreen = ({route, navigation}) => {
  const {address} = route.params;
  const [transactionList, setTransactionList] = useState([]);

  async function getTransactionListFromServer(addr) {
    const txs = await getTransactionList(addr, 'bitcoinTestNet');
    console.log(txs);
    setTransactionList(txs);
  }

  useEffect(() => {
    getTransactionListFromServer(address);
  }, [address]);
  return <BaseComponent />;
};

export default WalletDetailViewScreen;
