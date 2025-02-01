

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';
//import { useRouter } from 'expo-router';
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
//import { useRouter } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router';


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()


export default function LoginScreen() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        //setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])


  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../../assets/images/giris1.webp')} 
        style={styles.image} 
      />

      <View style={styles.girisyazi}>
        <Text style={styles.headerText}>Zeki Efekt'e Hoş geldiniz!</Text>
        <Text style={styles.subText}>Bir tıkla yapay zeka ile sanat oluşturun</Text>

      
         <TouchableOpacity onPress={onPress} 
            style={styles.buttun}>
          <Text style={styles.buttonText}>Devam Et</Text>
          </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 600,
  },
  girisyazi: {
    padding: 25,
    marginTop: -20,
    backgroundColor: '#D3D3D3',
    height: 600,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: Colors.DARKGREEN,
    textAlign: 'center',
    marginTop: 15,
  },
  buttun: {
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 40,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    marginTop: 0,
  }
});
