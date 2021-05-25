import React, { useEffect, useState } from 'react'
import {useNavigation} from '@react-navigation/native'
import { Text, View } from 'react-native';
import {getMaster, getMasterExistance} from '../../feature/database/function/master'
import { KeyType } from '../../feature/keyManagement/utils/types';


const SplashPage = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>getMasterExistance((b: boolean)=>{
            if(b) navigation.navigate("Main")
            else navigation.navigate("CreateMaster")
        }),1000);
    },[])

    return (
      <View>
          <Text>asdasd</Text>
      </View>
    )
}

export default SplashPage
