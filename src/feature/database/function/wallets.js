import SQLite from "react-native-sqlite-2"

const db = SQLite.openDatabase("test.db", "1.0", "", 1);

export function createwallet (){
db.transaction(function (txn){
    txn.executeSql(
        "CREATE TABLE IF NOT EXISTS WALLETS (index VARCHAR(100) PRIMARY KEY NOT NULL, wallet_name VARCHAR(100) NOT NULL, chain_code VARCHAR(100) NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL)", 
        []
    );
    txn.executeSql('INSERT INTO WALLETS VALUES("abcde", "wallet1", "chaincode1", "1234", "5678")');
    txn.executeSql('INSERT INTO WALLETS VALUES("abcdef", "wallet1", "chaincode1", "ABCD", "EFGH")');
    txn.executeSql("SELECT * FROM WALLETS", [], function(tx, res){
        for(let i=0; i<res.rows.length;++i){
            console.log("item: ", res.rows.item(i));
        }

    }); 
});
}


export function addWallet(input_index, input_walletname, input_chaincode, input_publickey, input_privatekey){
db.trancaction(function (txn){
    txn.executeSql('INSERT INTO WALLETS VALUES(' +input_index+','+ input_walletname+','+input_chaincode+','+input_publickey+','+ input_privatekey+')');
})
}

export function delWallet(condition){
db.trancaction(function (txn){
    txn.executeSql('DELETE FROM WALLETS WHERE(' +condition+')');
})
}

export function dropWallet(){
db.transaction(function (txn){
    txn.executeSql("DROP TABLE IF EXISTS WALLETS", []);
})
}
 
export function getIndex(){
db.transaction(function (txn){
    txn.executeSql("SELECT index FROM WALLETS");
});
}

export function getWalletName(){
db.transaction(function (txn){
    txn.executeSql("SELECT wallet_name FROM WALLETS");
});
}

export function getChainCode(){
db.transaction(function (txn){
    txn.executeSql("SELECT chain_code FROM WALLETS");
});
}

export function getPublicKey(){
db.transaction(function (txn){    
    txn.executeSql("SELECT public_key FROM WALLETS");
});
}

export function getPrivateKey(){
db.transaction(function (txn){
    txn.executeSql("SELECT private_key FROM WALLETS");
});
}