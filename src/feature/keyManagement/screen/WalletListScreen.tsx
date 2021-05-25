import React, { useState } from 'react'
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
        </View>
    )
}

export default WalletListScreen
