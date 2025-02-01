import {FlatList, View, Text,Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../services/GlobalApi';
import Colors from './../constants/Colors';
import { useRouter } from 'expo-router';
import FormInput from '../app/FormInput';
//import { FlatList } from 'react-native-web';

export default function IAModels({type}) {

const [IAModelList, setIAModelList]=useState();
const router=useRouter();
useEffect(()=>{
 GetIAModels();
},[])

const GetIAModels=async()=>{
    const result=await GlobalApi.GetIAModels(type);
    console.log(result?.data.data);
    setIAModelList(result.data.data);
}

const OnClickModel=()=>{
    router?.push('/FormInput')

}

  return (
    <View>
      <Text style={{
        fontSize:20,
        fontWeight:'bold',
        marginTop:20,
        marginBottom:10,
      }}>{type?.toUpperCase()}</Text>

<FlatList
  data={IAModelList}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
  nestedScrollEnabled={true}
  renderItem={({ item, index }) => (
    <TouchableOpacity onPress={()=>OnClickModel()} style={{
        marginRight:15
    }}>
      <Image
        source={{ uri: item?.banner?.url }}
        style={{
          width: 140,
          height: 180,
          borderRadius: 15,
        }}
      />
      <Text style={{
        position:'absolute',
        bottom:10,
        color:Colors.WHITE,
        width:'100%',
        fontSize:15,
        textAlign:'center',
        fontWeight:'medium',
      }}>{item.name}</Text>
    </TouchableOpacity>
  )}
/>



      
    </View>
  )
}