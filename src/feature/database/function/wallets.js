import SQLite from 'react-native-sqlite-2';
import {handleError} from '../../../common/function/error';

export const excuteSql = sql => {
  const db = SQLite.openDatabase('test.db', '1.0');
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        sql,
        [],
        (tx, res) => resolve(res),
        (tx, err) => reject(err),
      );
    });
  });
};

export function createWallet() {
  try {
    excuteSql(
      'CREATE TABLE IF NOT EXISTS WALLETS(wallet_index VARCHAR(10) PRIMARY KEY, wallet_name VARCHAR(100) NOT NULL, address VARCHAR(100) NOT NULL)',
    );
  } catch (error) {
    handleError('createWallet Error!', error);
  }
}

export async function addWallet(input_index, input_walletname, address) {
  try {
    await excuteSql(
      `INSERT INTO WALLETS VALUES("${input_index}","${input_walletname}","${address}")`,
    );
  } catch (error) {
    handleError('Add Wallet Error!', error);
  }
}

export async function getWallets() {
  try {
    const res = await excuteSql('SELECT * FROM WALLETS');
    const result = [];
    for (let i = 0; i < res.rows.length; i++) {
      const {wallet_index, wallet_name, address} = res.rows.item(i);
      result.push({
        walletIndex: wallet_index,
        walletName: wallet_name,
        address: address,
      });
    }
    return result;
  } catch (error) {
    handleError('Get Wallets Error!!', error);
  }
}
