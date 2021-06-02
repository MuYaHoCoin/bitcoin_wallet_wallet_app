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

export function createWallet() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS WALLETS (path VARCHAR(100) PRIMARY KEY NOT NULL, wallet_name VARCHAR(100) NOT NULL, chain_code VARCHAR(100) NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL, wallet_type VARCHAR(100) NOT NULL, wallet_address VARCHAR(100) NOT NULL)',
      [],
    );
  });
  }catch (error) {
  console.log("createWallet Error!");
}
}

export function addWallet(
  input_path,
  input_walletname,
  input_chaincode,
  input_publickey,
  input_privatekey,
  input_wallettype,
  input_walletaddress
) {
  try{
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
        '","' +
        input_wallettype +
        '","' +
        '","' +
        input_walletaddress +
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
  }catch (error) {
  console.log("addWallet Error!");
}
}

export function delWallet(condition) {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.trancaction(function (txn) {
    txn.executeSql('DELETE FROM WALLETS WHERE(' + condition + ')');
  });
  }catch (error) {
  console.log("delWallet Error!");
}
}

export function dropWallet() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('DROP TABLE IF EXISTS WALLETS', []);
  });
  }catch (error) {
  console.log("dropWallet Error!");
}
}

export function getPath() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT path FROM WALLETS');
  });
  }catch (error) {
  console.log("getPath Error!");
}
}

export function getWalletName() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT wallet_name FROM WALLETS');
  });
  }catch (error) {
  console.log("getWalletName Error!");
}
}

export function getChainCode() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT chain_code FROM WALLETS');
  });
  }catch (error) {
  console.log("getChainCode Error!");
}
}

export function getPublicKey() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT public_key FROM WALLETS');
  });
  }catch (error) {
  console.log("getPublicKey Error!");
}
}

export function getPrivateKey() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT private_key FROM WALLETS');
  });
  }catch (error) {
  console.log("getPrivateKey Error!");
}
}

export function getWalletType() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT wallet_type FROM WALLETS');
  });
  }catch (error) {
  console.log("geteWalletType Error!");
}
}

export function getWalletAddress() {
  try{
  const db = SQLite.openDatabase('test.db', '1.0');
  db.transaction(function (txn) {
    txn.executeSql('SELECT wallet_address FROM WALLETS');
  });
  }catch (error) {
  console.log("getWalletAddress Error!");
}
}

export async function getWallets() {
  try {
    const res = await excuteSql('SELECT * FROM WALLETS');
    const result = [];
    for (let i = 1; i < res.rows.length; ++i) {
      const {private_key, public_key, chain_code, wallet_name, wallet_type, wallet_address} =
        res.rows.item(i);
      console.log(private_key, public_key, chain_code, wallet_name, wallet_type, wallet_address);
      result.push({
        privateKey: private_key,
        publicKey: public_key,
        chainCode: chain_code,
        walletName: wallet_name,
        walletType: wallet_type,
        walletAddress: wallet_address
      });
    }
    return result;
  }catch (error) {
  console.log("getWallets Error!");
  }
}

export const getWalletNumber = async () => {
  const res = await excuteSql('SELECT COUNT(*) FROM WALLETS');
  console.log(res.rows);
  return res.rows['COUNT(*)'];
}
