import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('test.db', '1.0', '', 1);

export function createContact() {
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
}

export function addContact(input_address, input_address_name) {
  db.trancaction(function (txn) {
    txn.executeSql(
      'INSERT INTO CONTACTS VALUES(' +
        input_address +
        ',' +
        input_address_name +
        ')',
    );
  });
}

export function delContact(condition) {
  db.trancaction(function (txn) {
    txn.executeSql('DELETE FROM CONTACTS WHERE(' + condition + ')');
  });
}

export function dropContact() {
  db.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS CONTACTS', []);
  });
}

export function getAddress() {
  db.transaction(function (txn) {
    txn.executeSql('SELECT address FROM CONTACTS');
  });
}

export function getAddressName() {
  db.transaction(function (txn) {
    txn.executeSql('SELECT address_name FROM CONTACTS');
  });
}
