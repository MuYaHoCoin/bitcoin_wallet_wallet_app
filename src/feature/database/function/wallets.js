import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('test.db', '1.0');

export function createWallet() {
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS WALLETS (path VARCHAR(100) PRIMARY KEY NOT NULL, wallet_name VARCHAR(100) NOT NULL, chain_code VARCHAR(100) NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL)',
      []);
  });
}

export function addWallet(
  input_path ,
  input_walletname ,
  input_chaincode ,
  input_publickey ,
  input_privatekey ,
) {
  db.transaction(function (txn) {
    txn.executeSql(
      'INSERT INTO WALLETS VALUES(' +
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
    );
  });
}

export function delWallet(condition) {
  db.transaction(function (txn) {
    txn.executeSql('DELETE FROM WALLETS WHERE(' + condition + ')');
  });
}

export function dropWallet() {
  db.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS WALLETS', []);
  });
}

export function getPath() {
  db.transaction(function (txn) {
    txn.executeSql('SELECT path FROM WALLETS');
  });
}

export function getWalletName() {
  db.transaction(function (txn) {
    txn.executeSql('SELECT wallet_name FROM WALLETS');
  });
}

export function getChainCode() {
  db.transaction(function (txn) {
    txn.executeSql('SELECT chain_code FROM WALLETS');
  });
}

export function getPublicKey() {
  db.transaction(function (txn) {
    txn.executeSql('SELECT public_key FROM WALLETS');
  });
}

export function getPrivateKey() {
  db.transaction(function (txn) {
    txn.executeSql('SELECT private_key FROM WALLETS');
  });
}

export async function getWallets(callback){
  const db = await SQLite.openDatabase('test.db', '1.0');
  db.transaction((txn)=>{
    txn.executeSql("SELECT * FROM WALLETS",[],(tx, res)=>{
      for(let i = 0; i < res.rows.length; ++i){
        const {private_key, public_key, chain_code, wallet_name} = res.rows.item(i);
        callback(private_key, public_key, chain_code, wallet_name);
      }
    })
  })

}