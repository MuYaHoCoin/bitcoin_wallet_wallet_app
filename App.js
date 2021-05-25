import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler'
import WalletListScreen from './src/feature/keyManagement/screen/WalletListScreen'
import SplashPage from './src/common/screen/SplashPage'
import AddMasterWalletScreen from './src/feature/keyManagement/screen/AddMasterWalletScreen'
import { createMaster } from './src/feature/database/function/master';

const Stack = createStackNavigator();

const App = () => {
  useEffect(()=>{
    createMaster();
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashPage}/>
        <Stack.Screen name="Main" component={WalletListScreen}/>
        <Stack.Screen name="CreateMaster" component={AddMasterWalletScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
