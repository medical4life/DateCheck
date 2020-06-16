import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import Colors from '../../Colors'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import ProfileService from '../services/ProfileService'
import { DismissKeyboard } from '../../components/Utils'

export default ForgotPasswordScreen = ({navigation, route}) => {
  const [token, setToken] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [isValidToken, setIsValidToken] = React.useState(true);
  const [isValidUsername, setIsValidUsername] = React.useState(true);

  const validate = () => {
    let isValid = false

    // validate username
    let isValidUsername = false
    if (username !== null && username.length > 0) {
      isValidUsername = true
      isValid = true
    }
    setIsValidUsername(isValidUsername);

    // validate token
    let isValidToken = false
    if (token !== null && token.length > 0) {
      isValidToken = true
      isValid = isValid
    }
    setIsValidToken(isValidToken);

    return isValid
  }

  const submitForm = () => {
    // validate the form entries first
    if (validate()) {
      // send to the remote service
      ProfileService.forgotPassword(username, token)
      .then(() => {
        Alert.alert(
          'Überprüfen Sie Ihr Postfach',
          'Sie erhalten per Mail einen Link zum zurücksetzen Ihres Passworts.',
        )
        navigation.navigate('SignIn')
      })
      .catch(error => {
        Alert.alert('Fehler beim Zurücksetzen des Passworts', error)
      })
    }
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/DateCheck-Logo.png')} style={styles.logo} />
        </View>
        <View style={styles.forgotPasswordForm}>
          <InputField
            placeholder="Benutzername*"
            value={username}
            onChangeText={setUsername}
            valid={isValidUsername}
          />
          <InputField
            placeholder="E-Mail Adresse oder Resettoken*"
            value={token}
            onChangeText={setToken}
            valid={isValidToken}
          />
          <View style={styles.submitBtn}>
            <Button title="Passwort zurücksetzen" onPress={() => submitForm()} />
          </View>
        </View>
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  forgotPasswordForm: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  submitBtn: {
    marginTop: 20,
  },
  otherContainer: {
    padding: 15,
    marginVertical: 15,
  },
  otherContainerText: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 16,
  },
})
