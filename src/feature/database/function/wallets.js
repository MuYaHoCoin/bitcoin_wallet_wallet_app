import SQLite from 'react-native-sqlite-2';

export function createWallet() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS WALLETS (path VARCHAR(100) PRIMARY KEY NOT NULL, wallet_name VARCHAR(100) NOT NULL, chain_code VARCHAR(100) NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL)',
      [],
    );
  });
}

export function addWallet(
  input_path,
  input_walletname,
  input_chaincode,
  input_publickey,
  input_privatekey,
) {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql(
      'INSERT INTO WALLETS VALUES("' +
        input_path +
        '","' +
        input_walletname +
        '","' +
        input_chaincode +
        '","' +
        input_publickey +
        '","' +
        input_privatekey +
        '")',
      [],
      (tx, res) => {
        console.log('aaaa');
      },
      (tx, err) => {
        console.log(err);
      },
    );
  });
}

export function delWallet(condition) {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.trancaction(function (txn) {
    txn.executeSql('DELETE FROM WALLETS WHERE(' + condition + ')');
  });
}

export function dropWallet() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS WALLETS', []);
  });
}

export function getPath() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT path FROM WALLETS');
  });
}

export function getWalletName() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT wallet_name FROM WALLETS');
  });
}

export function getChainCode() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT chain_code FROM WALLETS');
  });
}

export function getPublicKey() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT public_key FROM WALLETS');
  });
}

export function getPrivateKey() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT private_key FROM WALLETS');
  });
}

export async function getWallets(callback) {
  const db = await SQLite.openDatabase('test.db', '1.0');
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM WALLETS',
      [],
      (tx, res) => {
        for (let i = 0; i < res.rows.length; ++i) {
          const {private_key, public_key, chain_code, wallet_name} =
            res.rows.item(i);
          callback(private_key, public_key, chain_code, wallet_name);
        }
      },
      (tx, err) => {
        console.log(err);
      },
    );
  });
}
