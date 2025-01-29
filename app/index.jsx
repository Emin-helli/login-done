import { Redirect } from "expo-router";
import { View } from "react-native";
import {useUser} from "@clerk/clerk-expo"
export default function Index() {
  const {user}=useUser();

  return (
     <View style={{ flex: 1 }}>
   
      <Redirect href={'/login'} />

    </View>
  );
}
