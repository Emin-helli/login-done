import { Stack } from "expo-router";
import { tokenCache } from './../cache'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }
  return (
<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
  <ClerkLoaded>
    <Stack>
      <Stack.Screen name="index"/>  
      <Stack.Screen name="login/index" options={{
        headerShown:false}}/> 
    </Stack>
  </ClerkLoaded>
</ClerkProvider>
  );
}
