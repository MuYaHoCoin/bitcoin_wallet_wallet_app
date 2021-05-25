import React, { useState } from 'react'
<<<<<<< HEAD
import { View } from 'react-native'
import WalletItem from '../components/WalletItem';

type Wallet = {
    privateKey: string;
    walletName: string;
} 

const WalletListScreen = () => {
    const [wallets, setWallets] = useState<Wallet[]>([
        {privateKey: "123", walletName:"first"},{privateKey: "456", walletName:"second"}
    ]);
    
    return (
        <View>
           {wallets.map(wallet => <WalletItem key={wallet.privateKey} privateKey={wallet.privateKey} walletName={wallet.walletName}/>)} 
=======
import { Button, View } from 'react-native'
import WalletItem from '../components/WalletItem'

type Wallet = {
    privateKey: string,
    walletName: string;    
}

const WalletListScreen = () => {
    const [wallets, setWallets] = useState<Wallet[]>([{privateKey: "123", walletName: "firstName" }, {privateKey: "234", walletName: "second"}
    ]);
    function addWallet(){
        setWallets([...wallets, {privateKey:"eljgah;woegh", walletName:"muyaho"}])
    }
    return (
        <View>
            {wallets.map((wallet)=><WalletItem key={wallet.privateKey} privateKey={wallet.privateKey} walletName={wallet.walletName}/>)}
            <Button title={"Add Wallet"} onPress={addWallet}/>
>>>>>>> 2118a48afcd61013aa1debb09bf59ee31aa5cbd6
        </View>
    )
}

export default WalletListScreen
