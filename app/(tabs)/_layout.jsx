import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
//import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import {UserDetailContext} from './../../context/UserDetailContext'
import { useState } from 'react';
export default function TabLayout() {


const {user}=useUser();
const [userDetail, setUserDetail] = useState(null);

useEffect(()=>{
  user&&VerifyUser();
},[user])

const VerifyUser=async()=>{
  const result=await GlobalApi.GetUserInfo(user?.primaryEmailAdderss?.emailAddress);
  console.log(result.data.data);


if(result.data.data.length!=0){
  setUserDetail(result.data.data[0])
  return;

}

try{
  const data={
    userEmail:user?.primaryEmailAddress?.emailAddress,
    userName:user?.fullName
  }
  const result=await GlobalApi.CreateNewUser(data);
  console.log(result?.data.data);
  setUserDetail(result.data.data[0])
}catch(e){

}
}

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
   <Tabs screenOptions={{
    headerShown:false,
    //tabBarInactiveTintColor:Colors.DARKGREEN
   }}>
    <Tabs.Screen name='home' 
    options={{
        title:'Ana sayfa',
        tabBarIcon:({color}) =><AntDesign name="home" size={24} color="black" />
    }}/>
    <Tabs.Screen name='collection' 
    options={{
      title:'koleksiyon',
      tabBarIcon:({color}) =><AntDesign name="folderopen" size={24} color="black" />
  }}/>
    <Tabs.Screen name='profile' 
    options={{
        title:'profil',
        tabBarIcon:({color}) =><AntDesign name="user" size={24} color="black" />
      }}/>
   </Tabs>
   </UserDetailContext.Provider>
  )
}