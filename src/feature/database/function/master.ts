import SQLite from "react-native-sqlite-2"

const db = SQLite.openDatabase("test.db", "1.0", "", 1);

export function createMaster (){
const db = SQLite.openDatabase("test.db", "1.0", "", 1);
console.log(db);

db.transaction(function (txn){
    txn.executeSql(
        "CREATE TABLE IF NOT EXISTS MASTER (chain_code VARCHAR(100) PRIMARY KEY NOT NULL, public_key VARCHAR(100) NOT NULL, private_key VARCHAR(100) NOT NULL)", 
        []
    );
    txn.executeSql('INSERT INTO MASTER VALUES("1111", "1234", "5678")');
    txn.executeSql('INSERT INTO MASTER VALUES("2222", "ABCD", "EFGH")');
    txn.executeSql("SELECT * FROM MASTER", [], function(tx, res){
        for(let i=0; i<res.rows.length;++i){
            console.log("item: ", res.rows.item(i));
        }

    }); 
});
}

// export function createMaster (input_chaincode, input_publickey, input_privatekey){
// db.transaction(function (txn){
//     txn.executeSql('INSERT INTO MASTER VALUES(' +input_chaincode+','+ input_publickey+','+ input_privatekey+')');
//     txn.executeSql("SELECT * FROM MASTER", [], function(tx, res){
//         for(let i=0; i<res.rows.length;++i){
//             console.log("item: ", res.rows.item(i));
//         }
    
//     }); 
// });
// }

export function addMaster(input_chaincode, input_publickey, input_privatekey){
db.trancaction(function (txn){
    txn.executeSql('INSERT INTO MASTER VALUES(' +input_chaincode+','+ input_publickey+','+ input_privatekey+')');
})
}

export function delMaster(condition){
db.trancaction(function (txn){
    txn.executeSql('DELETE FROM MASTER WHERE(' +condition+')');
})
}

export function dropMaster(){
db.transaction(function (txn){
    txn.executeSql("DROP TABLE IF EXISTS MASTER", []);
})
}

export function getChainCode(){
db.transaction(function (txn){
    txn.executeSql("SELECT chain_code FROM MASTER");
});
}

export function getPublicKey(){
db.transaction(function (txn){
    txn.executeSql("SELECT public_key FROM MASTER");
});
}

export function getPrivateKey(){
db.transaction(function (txn){
    txn.executeSql("SELECT private_key FROM MASTER");
});
}

