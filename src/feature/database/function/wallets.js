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

export function createWallet() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS WALLETS (path VARCHAR(100) PRIMARY KEY NOT NULL, wallet_name VARCHAR(100) NOT NULL, chain_code VARCHAR(100) NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL, wallet_type VARCHAR(100) NOT NULL, wallet_address VARCHAR(100) NOT NULL)',
        [],
      );
    });
  } catch (error) {
    handleError('createWallet Error!');
  }
}

export async function addWallet(
  input_path,
  input_walletname,
  input_chaincode,
  input_publickey,
  input_privatekey,
  input_wallettype,
  input_walletaddress,
) {
  try {
    excuteSql(
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
        input_walletaddress +
        '")',
    );
  } catch (error) {
    handleError('addWallet Error!', error);
  }
}

export function delWallet(condition) {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.trancaction(function (txn) {
      txn.executeSql('DELETE FROM WALLETS WHERE(' + condition + ')');
    });
  } catch (error) {
    handleError('delWallet Error!');
  }
}

export function dropWallet() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('DROP TABLE IF EXISTS WALLETS', []);
    });
  } catch (error) {
    handleError('dropWallet Error!');
  }
}

export function getPath() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT path FROM WALLETS');
    });
  } catch (error) {
    handleError('getPath Error!');
  }
}

export function getWalletName() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT wallet_name FROM WALLETS');
    });
  } catch (error) {
    handleError('getWalletName Error!');
  }
}

export function getChainCode() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT chain_code FROM WALLETS');
    });
  } catch (error) {
    handleError('getChainCode Error!');
  }
}

export function getPublicKey() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT public_key FROM WALLETS');
    });
  } catch (error) {
    handleError('getPublicKey Error!');
  }
}

export function getPrivateKey() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT private_key FROM WALLETS');
    });
  } catch (error) {
    handleError('getPrivateKey Error!');
  }
}

export function getWalletType() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT wallet_type FROM WALLETS');
    });
  } catch (error) {
    handleError('geteWalletType Error!');
  }
}

export function getWalletAddress() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT wallet_address FROM WALLETS');
    });
  } catch (error) {
    handleError('getWalletAddress Error!');
  }
}

export async function getWallets() {
  try {
    const res = await excuteSql('SELECT * FROM WALLETS');
    const result = [];
    for (let i = 1; i < res.rows.length; ++i) {
      const {
        private_key,
        public_key,
        chain_code,
        wallet_name,
        wallet_type,
        wallet_address,
      } = res.rows.item(i);
      result.push({
        privateKey: private_key,
        publicKey: public_key,
        chainCode: chain_code,
        walletName: wallet_name,
        walletType: wallet_type,
        walletAddress: wallet_address,
      });
    }
    return result;
  } catch (error) {
    handleError('getWallets', error);
  }
}

export const getWalletNumber = async () => {
  const res = await excuteSql('SELECT COUNT(*) FROM WALLETS');
  handleError(res.rows);
  return res.rows['COUNT(*)'];
};
