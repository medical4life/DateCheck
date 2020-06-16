import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Logo from '../../assets/images/DateCheck-Logo.png';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text>https://datesafe.me/</Text>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    maxWidth: '80%',
    resizeMode: 'contain',
  },
})
