import React from 'react'
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native'
import Colors from '../../Colors'
import Button from '../../components/Button'
import InputField from '../../components/InputField';
import Logo from '../../assets/images/DateCheck-Logo.png';

import { AuthContext, configuration } from '../../Constants'
import { DismissKeyboard } from '../../components/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import AuthenticationService from '../services/AuthenticationService';

const LoginScreen = ({ navigation, route }) => {
  const { onResult } = route.params;
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [signingIn, setSigningIn] = React.useState(false)

  const signIn = () => {
    setSigningIn(true);
    AuthenticationService
    .login(username, password)
    .then(token => {
      onResult(token);
    })
    .catch(error => {
      alert(error);
    })
    .finally(() => setSigningIn(false));
  }

  return (
    <DismissKeyboard>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.loginForm}>
          <Text style={styles.loginText}>Bitte melden Sie sich mit ihren Zugangsdaten an.</Text>
          <InputField
            placeholder="Benutzername"
            value={username}
            onChange={setUsername}
            returnKeyType="next"
            autoCapitalize="none"
          />
          <InputField
            placeholder="Passwort"
            value={password}
            onChange={setPassword}
            secureTextEntry
            returnKeyType="go"
          />
          <View style={styles.loginBtn}>
            <Button title="Anmelden" onPress={() => signIn()} loading={signingIn} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.otherElementBlock}
          onPress={() => {
            navigation.navigate('register')
          }}>
          <Text style={styles.otherElementText}>Ich habe noch kein Konto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherHelperElementsBlock}
          onPress={() => {
            navigation.navigate('forgot-password')
          }}>
          <Text style={styles.otherElementText}>Passwort vergessen?</Text>
        </TouchableOpacity>
        <View style={styles.gdprContainer}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(configuration.gdprUrl)
            }}>
            <Text style={styles.gdprLink}>Datenschutzerklärung</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </DismissKeyboard>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    height: 100,
    maxWidth: '80%',
    resizeMode: 'contain',
  },
  loginForm: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  loginText: {
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  loginBtn: {
    marginTop: 20,
  },
  otherElementBlock: {
    padding: 15,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  otherElementText: {
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: 'center',
  },
  otherHelperElementsBlock: {
    padding: 2,
    marginVertical: 3,
  },
  gdprLink: {
    color: '#808080',
    textAlign: 'center',
    marginBottom: 20,
  },
  gdprContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
})
