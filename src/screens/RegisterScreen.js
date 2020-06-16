import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
  Alert,
} from 'react-native'
import Colors from '../../Colors'
import Button from '../../components/Button'
import InputField from '../../components/InputField'

import { configuration } from '../../Constants'
import ProfileService from '../services/ProfileService'
import { DismissKeyboard } from '../../components/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

const RegisterScreen = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [usernameValid, setUsernameValid] = React.useState(true)
  const [passwordValid, setPasswordValid] = React.useState(true)
  const [passwordRetype, setPasswordRetype] = React.useState('')
  const [emailValid, setEmailValid] = React.useState(true)
  const [acceptTermsAndConditions, setTermsAndConditions] = React.useState(false)

  const toggleAcceptTermsAndConditions = value => {
    setTermsAndConditions(value)
  }

  const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const validateFormFields = () => {
    let isValid = false

    //Check password and passwordretype are equal
    isValid = password === passwordRetype && passwordValid
    //Check username
    if (username === 'admin' || username === null || username === undefined || username.length <= 0) {
      setUsernameValid(false)
      isValid = false
      Alert.alert('Registration unvollständig', 'Dieser Benutzername ist ungültig')
      return false
    } else {
      if (isValid === true) {
        isValid = true
      }
      setUsernameValid(true)
    }

    if (email.length > 0) {
      if (validateEmail(email)) {
        if (isValid === true) {
          isValid = true
        }
        setEmailValid(true)
      } else {
        isValid = false
        setEmailValid(false)
        Alert.alert('Registration unvollständig', 'Sie haben keine korrekte E-Mail Adresse eingegeben.')
        return false
      }
    }

    if (!acceptTermsAndConditions) {
      isValid = false
      Alert.alert('Registration unvollständig', 'Bitte aktzeptieren Sie die Nutzungsbedingungen')
      return false
    }

    return isValid
  }

  const signUpProcedure = async () => {
    //Create useraccount in webservice
    if (validateFormFields()) {
      setModalVisible(true)
      ProfileService.register(username, email, password)
        .then(user => {
          if(route.params?.onSuccess !== null) {
            console.log(user)
            route.params?.onSuccess(user);
            if (emailValid && email !== '') {
              Alert.alert(
                'Registration erfolgreich',
                'Sie erhalten in Kürze eine E-Mail von noreply@datesafe.me um Ihre E-Mail Adresse zu bestätigen. Prüfen Sie auch den Spamordner.',
              )
            }
          }
        })
        .catch(error => {
          console.log(error)
          Alert.alert('Fehler beim Registrieren', 'Möglicherweise wurde der Benutzername schon verwendet.')
        })
        .finally(setModalVisible(false))
    }
    //Save Token to secured storage
  }

  return (
    <DismissKeyboard>
      <KeyboardAwareScrollView style={styles.container}>
        {modalVisible ? (
          <>
            <ActivityIndicator size="large" color={Colors.primaryColor} />
            <Text style={styles.status}>Ihr Account wird jetzt erstellt...</Text>
          </>
        ) : (
          <View style={styles.loginForm}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/images/DateCheck-Logo.png')} style={styles.logo} />
            </View>
            <Text style={styles.loginText}>
              Bitte registrieren Sie sich mit einem frei wählbaren Namen. Die E-Mail-Adresse müssen Sie nur angeben, um
              Ihr Passwort in Zukunft zurücksetzen zu können. Um anonym zu bleiben, können Sie dieses Feld aber auch
              einfach leer lassen und sich das Passwort sicher notieren.
            </Text>
            <InputField
              placeholder="Benutzername/Pseudonym*"
              value={username}
              onChange={setUsername}
              valid={usernameValid}
            />
            <InputField
              placeholder="E-Mail (optional)"
              keyboardType="email-address"
              value={email}
              onChange={setEmail}
              onValidation={setEmailValid}
              validation={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/}
              validationHint="Bitte geben Sie eine korrekte E-Mail Adresse ein"
            />
            <InputField
              placeholder="Passwort*"
              value={password}
              onChange={setPassword}
              secureTextEntry
              onValidation={setPasswordValid}
              validation={/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.-;:_\+\?])(?=.{10,})/}
              validationHint="Passwortstärke reicht nicht aus. Verwenden Sie mindestens 10 Zeichen, Groß- und Kleinbuchstaben, Zahlen sowie Sonderzeichen für den optimalen Schutz Ihrer Daten."
            />
            <InputField
              placeholder="Passwortbestätigung*"
              value={passwordRetype}
              onChange={setPasswordRetype}
              secureTextEntry
              validation={text => {
                return text === password
              }}
              validationHint="Die Passwörter stimmen nicht überein"
            />

            <View style={styles.termsAndConditionsBlock}>
              <View>
                <Switch
                  onValueChange={toggleAcceptTermsAndConditions}
                  value={acceptTermsAndConditions}
                  style={styles.termsAndConditionsSwitch}
                />
              </View>
              <View>
                <Text style={{ maxWidth: '85%' }}>Mit der Registrierung akzeptiere ich die</Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(configuration.gdprUrl)
                  }}>
                  <Text style={styles.termsAndConditionsLink}>Datenschutzbestimmungen</Text>
                </TouchableOpacity>
                <Text style={{ maxWidth: '85%' }}> von DateCheck</Text>
              </View>
            </View>

            <View style={styles.loginBtn}>
              <Button title="Benutzerkonto anlegen" onPress={() => signUpProcedure()} />
            </View>
            <View style={styles.loginBtn}>
            <TouchableOpacity
              style={styles.otherHelperElementsBlock}
              onPress={() => {
                navigation.navigate('resend-confirmation-email')
              }}>
              <Text style={styles.otherElementText}>Bestätigungsmail erneut senden</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
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

export default RegisterScreen

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
  loginForm: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  loginText: {
    textAlign: 'justify',
    marginBottom: 20,
  },
  loginBtn: {
    marginBottom: 20,
  },
  regBtn: {
    padding: 15,
    marginVertical: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  regText: {
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: 'center',
  },
  gdprLink: {
    color: '#808080',
    textAlign: 'center',
    marginBottom: 20,
  },
  termsAndConditionsLink: {
    color: '#D24B54',
  },
  gdprContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  disabled: {
    backgroundColor: '#eff0f1',
  },
  invalid: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor + '20',
  },
  status: {
    textAlign: 'center',
    marginVertical: 10,
  },
  termsAndConditionsBlock: {
    marginBottom: 10,
    flexDirection: 'row',
    marginTop: 20,
  },
  termsAndConditionsSwitch: {
    alignContent: 'flex-end',
    marginTop: 7,
    marginBottom: 10,
    marginLeft: 22,
    marginRight: 0,
  },
})
