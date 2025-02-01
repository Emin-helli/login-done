import { FlatList,View, Text, FlatListComponent } from 'react-native'
import React from 'react'
import Header from '../../compenents/home/Header'
import Banner from '../../compenents/home/Banner'
import IAFeaturedModel from '../../compenents/home/IAFeaturedModel'
import IAModels from '../../compenents/IAModels'
//import { FlatList } from 'react-native-web'
export default function Home() {
  return (
    <FlatList data={[1]}
    style={{
      padding:20,
      marginTop:20,
    }}
    nestedScrollEnabled={true}
    renderItem={({item})=>(
      <View>
 
        <Header/>

            
        <Banner/>
        {/* Featured List */}
        <IAFeaturedModel/>

        <IAModels type={'avatar'}/>

        <IAModels type={'style'}/>
        
          <View style={{height:100}}> 

          </View>
      </View>
    )}
    >
    
    </FlatList>
  )
}