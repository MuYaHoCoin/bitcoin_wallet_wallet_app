import SQLite from 'react-native-sqlite-2';
import {handlError} from '../../../common/function/error';

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
    excuteSql(
      'CREATE TABLE IF NOT EXIST MASTER(mnemonic VARCHAR(200) PRIMARY KEY NOT NULL)',
    );
  } catch (error) {
    handlError('');
  }
}

export function addMaster(input_chaincode, input_publickey, input_privatekey) {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql(
      'INSERT INTO MASTER VALUES(' +
        input_chaincode +
        ',' +
        input_publickey +
        ',' +
        input_privatekey +
        ')',
    );
  });
}

export const getMaster = async () => {
  try {
    const res = await excuteSql('SELECT * FROM MASTER');
    const {private_key: privateKey, chain_code: chainCode} = res.rows.item(0);
    return {privateKey, chainCode};
  } catch (error) {}
};

export function getMasterExistence(callback) {
  const db = SQLite.openDatabase('test.db', '1.0', '', 1);
  db.transaction(function (txn) {
    txn.executeSql('SELECT COUNT(*) FROM MASTER', [], (tx, res) => {
      callback(res.rows.item(0)['COUNT(*)']);
    });
  });
}
