import SQLite from 'react-native-sqlite-2';
import {handleError, handlError} from '../../../common/function/error';

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
      'CREATE TABLE IF NOT EXISTS WALLETS (wallet_index VARCHAR(10) PRIMARY KEY, wallet_name VARCHAR(100) NOT NULL, wallet_type VARCHAR(100) NOT NULL)',
    );
  } catch (error) {
    handleError('createWallet Error!');
  }
}

export async function addWallet(
  input_index,
  input_walletname,
  input_wallettype,
) {
  try {
    excuteSql(
      'INSERT INTO WALLETS VALUES("' +
        input_index +
        '","' +
        input_walletname +
        '","' +
        input_wallettype +
        '")',
    );
  } catch (error) {
    handleError('addWallet Error!', error);
  }
}

export async function getWallets() {
  try {
    const result = [];
    const res = excuteSql('SELECT * FROM WALLETS');
    for (let i = 0; i < res.rows.length; i++) {
      result.push(res.rows.item(i));
    }
    return result;
  } catch (error) {
    handlError('Get Wallets Error!!', error);
  }
}
