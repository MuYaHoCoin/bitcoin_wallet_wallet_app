import SQLite from 'react-native-sqlite-2';
import {handleError} from '../../../common/function/error';

const excuteSql = sql => {
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

export async function createMaster() {
  try {
    await excuteSql(
      'CREATE TABLE IF NOT EXISTS MASTER(mnemonic VARCHAR(200) PRIMARY KEY NOT NULL, password VARCHAR(200))',
    );
  } catch (error) {
    handleError('Create Master!!', error);
  }
}

export async function addMaster(mnemonic, password) {
  try {
    await excuteSql(`INSERT INTO MASTER VALUES("${mnemonic}","${password}")`);
  } catch (error) {
    handleError('Add Master!!', error);
  }
}

export async function getMasterExistence() {
  try {
    const res = await excuteSql('SELECT COUNT(*) FROM MASTER');
    return res.rows._array[0]['COUNT(*)'];
  } catch (error) {
    handleError('Get Master Existence', error);
  }
}

export async function getMaster() {
  try {
    const res = await excuteSql('SELECT * FROM MASTER');
    return res.rows.item(0);
  } catch (error) {
    handleError('Get Master Error', error);
  }
}

export async function CheckPassword(password) {
  try {
    const res = await excuteSql(
      `SELECT * FROM MASTER WHERE password="${password}"`,
    );
    return res.rows.length;
  } catch (error) {
    handleError('Check Password Error', error);
  }
}
