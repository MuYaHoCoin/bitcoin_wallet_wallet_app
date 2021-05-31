import SQLite from 'react-native-sqlite-2';

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

export function createMaster() {
  const db = SQLite.openDatabase('test.db', '1.0');

  db.transaction(function (txn) {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS MASTER (chain_code VARCHAR(100) PRIMARY KEY NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL)',
      [],
    );
  });
}

export function addMaster(input_chaincode, input_publickey, input_privatekey) {
  excuteSql(
    'INSERT INTO MASTER VALUES("' +
      input_chaincode +
      '","' +
      input_publickey +
      '","' +
      input_privatekey +
      '")',
  ).catch(error => {
    console.log('AddMaster Error', error);
  });
}

export function delMaster(condition) {
  const db = SQLite.openDatabase('test.db', '1.0');

  db.trancaction(function (txn) {
    txn.executeSql('DELETE FROM MASTER WHERE(' + condition + ')');
  });
}

export function dropMaster() {
  const db = SQLite.openDatabase('test.db', '1.0');

  db.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS MASTER', []);
  });
}

export function getChainCode() {
  const db = SQLite.openDatabase('test.db', '1.0');

  db.transaction(function (txn) {
    txn.executeSql('SELECT chain_code FROM MASTER');
  });
}

export function getPublicKey() {
  const db = SQLite.openDatabase('test.db', '1.0');

  db.transaction(function (txn) {
    txn.executeSql('SELECT public_key FROM MASTER');
  });
}

export function getPrivateKey() {
  const db = SQLite.openDatabase('test.db', '1.0');

  db.transaction(function (txn) {
    txn.executeSql('SELECT private_key FROM MASTER');
  });
}

export const getMaster = async () => {
  const res = await excuteSql('SELECT * FROM MASTER');
  console.log(res.rows.item(0));
  const {private_key: privateKey, chain_code: chainCode} = res.rows.item(0);
  return {privateKey, chainCode};
};

export function getMasterExistence(callback) {
  const db = SQLite.openDatabase('test.db', '1.0', '', 1);
  db.transaction(function (txn) {
    txn.executeSql('SELECT COUNT(*) FROM MASTER', [], (tx, res) => {
      callback(res.rows.item(0)['COUNT(*)']);
    });
  });
}
