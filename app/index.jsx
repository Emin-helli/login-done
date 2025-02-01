import { Redirect } from "expo-router";
import { View } from "react-native";
import {useUser} from "@clerk/clerk-expo"
export default function Index() {
  const {user}=useUser();

  return (
    <View style={{ flex: 1 }}>
    {!user ? (
      <Redirect href="/login" />
    ) : (
      <Redirect href="/(tabs)/home" />  
    )}
  </View>
  
  );
}
