import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaster} from './src/feature/database/function/master';
import {createWallet} from './src/feature/database/function/wallets';

import SplashPage from './src/common/screen/SplashPage';
import AddMasterWalletScreen from './src/feature/keyManagement/screen/AddMasterScreen';
import WalletListScreen from './src/feature/keyManagement/screen/WalletListScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    createMaster();
    createWallet();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashPage} />
      <Stack.Screen name="CreateMaster" component={AddMasterWalletScreen} />
      <Stack.Screen name="Main" component={WalletListScreen} />
    </Stack.Navigator>
  );
};

export default App;
