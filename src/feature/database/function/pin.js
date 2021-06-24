import {handleError} from '../../../common/function/error';
import {excuteSql} from './wallets';

export async function createPin() {
  try {
    excuteSql(
      'CREATE TABLE IF NOT EXISTS PIN(wallet_index VARCHAR(200) PRIMARY KEY NOT NULL, pin_number VARCHAR(200))',
    );
  } catch (error) {
    handleError('Create Pin Error', error);
  }
}

export async function addPin(index, pin) {
  try {
    excuteSql(`INSERT INTO PIN VALUES("${index}","${pin}")`);
  } catch (error) {
    handleError('Add Pin Error', error);
  }
}

export async function checkPin(index, pin) {
  try {
    const res = await excuteSql(
      `SELECT * FROM PIN WHERE wallet_index="${index}" and pin_number="${pin}"`,
    );
    return res.rows.length;
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
