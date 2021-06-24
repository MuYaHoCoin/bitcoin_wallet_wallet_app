import {handleError} from '../../../common/function/error';
import {excuteSql} from './wallets';

export async function createAddress() {
  try {
    excuteSql(
      'CREATE TABLE IF NOT EXISTS ADDRESS(wallet_index VARCHAR(200) PRIMARY KEY NOT NULL, wallet_address VARCHAR(200))',
    );
  } catch (error) {
    handleError('Create Pin Error', error);
  }
}

export async function addAddress(index, address) {
  try {
    excuteSql(`INSERT INTO PIN VALUES("${index}","${address}")`);
  } catch (error) {
    handleError('Add Pin Error', error);
  }
}

export async function getMultiAddress(index) {
  try {
    const res = await excuteSql(
      `SELECT address FROM PIN WHERE wallet_index="${index}"`,
    );
    console.log(res.rows);
    return res.rows;
  } catch (error) {
    handleError('Check Pin Error', error);
  }
}

export async function getPins() {
  try {
    const res = await excuteSql('SELECT * FROM PIN');
    console.log(res.rows);
  } catch (error) {
    handleError(error);
  }
}
