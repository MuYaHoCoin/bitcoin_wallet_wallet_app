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

export function createMaster() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');

    db.transaction(function (txn) {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS MASTER (chain_code VARCHAR(100) PRIMARY KEY NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL)',
        [],
      );
    });
  } catch {
    handleError('createMaster Error!', error);
  }
}

export async function addMaster(
  input_chaincode,
  input_publickey,
  input_privatekey,
) {
  try {
    excuteSql(
      'INSERT INTO MASTER VALUES("' +
        input_chaincode +
        '","' +
        input_publickey +
        '","' +
        input_privatekey +
        '")',
    );
  } catch (error) {
    handleError('addMaster Error!', error);
  }
}

export function delMaster(condition) {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');

    db.transaction(function (txn) {
      txn.executeSql('DELETE FROM MASTER WHERE(' + condition + ')');
    });
  } catch {
    handleError('delMaster Error!', error);
  }
}

export function dropMaster() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');

    db.transaction(function (txn) {
      txn.executeSql('DROP TABLE IF EXISTS MASTER', []);
    });
  } catch {
    handleError('dropMaster Error!', error);
  }
}

export function getChainCode() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');

    db.transaction(function (txn) {
      txn.executeSql('SELECT chain_code FROM MASTER');
    });
  } catch (error) {
    handleError('getChainCode Error!', error);
  }
}

export function getPublicKey() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');
    db.transaction(function (txn) {
      txn.executeSql('SELECT public_key FROM MASTER');
    });
  } catch (error) {
    handleError('getPublicKey Error!', error);
  }
}

export function getPrivateKey() {
  try {
    const db = SQLite.openDatabase('test.db', '1.0');

    db.transaction(function (txn) {
      txn.executeSql('SELECT private_key FROM MASTER');
    });
  } catch (error) {
    handleError('getPrivateKey Error!', error);
  }
}

export const getMaster = async () => {
  try {
    const res = await excuteSql('SELECT * FROM MASTER');
    console.log(res.rows);
    const {private_key: privateKey, chain_code: chainCode} = res.rows.item(0);
    return {privateKey, chainCode};
  } catch (error) {
    handleError('getMaster Error!', error);
  }
};

export async function getMasterExistence(callback) {
  try {
    const res = await excuteSql('SELECT COUNT(*) FROM MASTER');
    console.log(res.rows);
    return res.rows.item(0)['COUNT(*)'];
  } catch (error) {
    handleError('getMasterExistence Error!', error);
  }
}
