import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from './../../services/GlobalApi'; // تأكد من استيراد GlobalApi بشكل صحيح
import Colors from '../../constants/Colors';

export default function IAFeaturedModel() {
  const [IAModelList, setIAModelList] = useState([]);

  useEffect(() => {
    GetIAModelFeaturedList();
  }, []);

  const GetIAModelFeaturedList = async () => {
    try {
        const result = await GlobalApi.GetFeaturedCategoryList();

      console.log(result.data.data);
      setIAModelList(result.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 10 }}>
     
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Öne Çıkanlar
      </Text>

     
      {IAModelList.length > 0 ? (
        <FlatList
          data={IAModelList}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()} // مفتاح فريد لكل عنصر
          renderItem={({ item }) => (
            <View style={{ flex:1, alignItems: 'center', }}>
                <View style={{
                  padding:10,
                  borderRadius:8,
                  backgroundColor:Colors.LIGHTGRAY,
                  borderRadius:7
                }}>
              <Image
                source={{ uri: item?.icon?.url }}
                style={{
                  width: 35,
                  height: 35,
                 
                }}
              />

</View>
              <Text style={{
                fontSize:11,
                textAlign:'center',
                marginTop:2
              }}>{item?.name}</Text>
              
            </View>
          )}
        />
      ) : (
        <Text style={{ fontSize: 16, color: 'gray', marginTop: 10 }}>
          loading
        </Text>
      )}
    </View>
  );
}
