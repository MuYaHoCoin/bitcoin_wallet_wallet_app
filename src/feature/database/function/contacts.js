import SQLite from 'react-native-sqlite-2';
import {handleError} from '../../../common/function/error';

const db = SQLite.openDatabase('test.db', '1.0', '', 1);

export function createContact() {
  try {
    db.transaction(function (txn) {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS CONTACTS (address VARCHAR(100) PRIMARY KEY NOT NULL, address_name VARCHAR(100) NOT NULL)',
        [],
      );
      txn.executeSql('INSERT INTO CONTACTS VALUES("abcd", "address1")');
      txn.executeSql('INSERT INTO CONTACTS VALUES("efgh", "address2")');
      txn.executeSql('SELECT * FROM CONTACTS', [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item: ', res.rows.item(i));
        }
      });
    });
  } catch (error) {
    handleError('createContact Error!', error);
  }
}

export function addContact(input_address, input_address_name) {
  try {
    db.transaction(function (txn) {
      txn.executeSql(
        'INSERT INTO CONTACTS VALUES(' +
          input_address +
          ',' +
          input_address_name +
          ')',
      );
    });
  } catch {
    handleError('addContact Error!', error);
  }
}

export function delContact(condition) {
  try {
    db.transaction(function (txn) {
      txn.executeSql('DELETE FROM CONTACTS WHERE(' + condition + ')');
    });
  } catch {
    handleError('delContact Error!', error);
  }
}

export function dropContact() {
  try {
    db.transaction(function (txn) {
      txn.executeSql('DROP TABLE IF EXISTS CONTACTS', []);
    });
  } catch {
    handleError('dropContact Error!', error);
  }
}

export function getAddress() {
  try {
    db.transaction(function (txn) {
      txn.executeSql('SELECT address FROM CONTACTS');
    });
  } catch {
    handleError('getAddress Error!', error);
  }
}

export function getAddressName() {
  try {
    db.transaction(function (txn) {
      txn.executeSql('SELECT address_name FROM CONTACTS');
    });
  } catch {
    handleError('getAddressName Error!', error);
  }
}
