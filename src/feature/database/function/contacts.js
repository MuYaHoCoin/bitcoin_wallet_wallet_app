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

export async function createContact() {
  try {
    await excuteSql(
      'CREATE TABLE IF NOT EXIST CONTACT(address VARCHAR(100) PRIMARY KEY NOT NULL, name VARCHAR(100) NOT NULL)',
    );
  } catch (error) {
    handleError(error);
  }
}

export async function addContact(address, name) {
  try {
    await excuteSql(`INSERT INTO CONTACT VALUES("${address}","${name}")`);
  } catch (error) {
    handleError('Add Contact Error', error);
  }
}

export async function getContact() {
  try {
    const result = [];
    const res = excuteSql('SELECT * FROM CONTACT');
    for (let i = 0; i < res.rows.length; i++) {
      result.push(res.rows.item(i));
    }
    return result;
  } catch (error) {
    handleError('Get Contact Error', error);
  }
}
