import {Buffer} from 'buffer';
global.Buffer = Buffer;
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaster} from './src/feature/database/function/master';
import {createWallet} from './src/feature/database/function/wallets';
import {createPin} from './src/feature/database/function/pin';

import SplashPage from './src/common/screen/SplashPage';
import Authentication from './src/common/screen/Authentication';
import AddMasterWalletScreen from './src/feature/keyManagement/screen/AddMasterScreen';
import WalletListScreen from './src/feature/wallet/screen/WalletListScreen';
import GuideScreen from './src/feature/keyManagement/screen/GuideScreen';
import CreateMasterScreen from './src/feature/keyManagement/screen/CreateMasterScreen';
import ImportWalletScreen from './src/feature/keyManagement/screen/ImportWalletScreen';
import SendCoins from './src/feature/transaction/screen/SendCoins';
import ReceiveCoins from './src/feature/transaction/screen/ReceiveCoins';
import StandardWallet from './src/feature/wallet/screen/StandardWallet';
import MultiSigWallet from './src/feature/wallet/screen/MultiSigWallet';
import TwoFactorWallet from './src/feature/wallet/screen/TwoFactorWallet';
import WalletDetailViewScreen from './src/feature/wallet/screen/WalletDetailViewScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    createMaster();
    createWallet();
    createPin();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashPage} />
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="Master/Create" component={CreateMasterScreen} />
        <Stack.Screen name="Master/Guide" component={GuideScreen} />
        <Stack.Screen name="Master/New" component={AddMasterWalletScreen} />
        <Stack.Screen name="Master/Import" component={ImportWalletScreen} />
        <Stack.Screen name="Main" component={WalletListScreen} />
        <Stack.Screen name="SendCoins" component={SendCoins} />
        <Stack.Screen name="ReceiveCoins" component={ReceiveCoins} />
        <Stack.Screen name="AddWallet/Standard" component={StandardWallet} />
        <Stack.Screen name="AddWallet/MultiSig" component={MultiSigWallet} />
        <Stack.Screen name="AddWallet/TwoFactor" component={TwoFactorWallet} />
        <Stack.Screen
          name="Wallet/DetailView"
          component={WalletDetailViewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
