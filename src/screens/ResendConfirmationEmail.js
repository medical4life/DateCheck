import React from 'react'
import { StyleSheet, View, Image, Alert } from 'react-native'
import Colors from '../../Colors'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import ProfileService from '../services/ProfileService'

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default ResendConfirmationEmail = ({navigation}) => {
  const [email, setEmail] = React.useState(null);
  const [isValidEmail, setIsValidEmail] = React.useState(true);

  const submitForm = () => {
    let isValidEmail = false

    // check if the email is valid
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return false;
    } else {
      isValidEmail = true
      setIsValidEmail(true);
    }

    ProfileService.resendConfirmationEmail(email).then(() => {
      Alert.alert(
        'Bestätigungs Mail erneut gesendet',
        'Eine Bestätigungsmail wurde erneut an Ihre E-Mail-Adresse versandt. Bitte prüfen Sie Ihren Posteingang.',
      )
      navigation.navigate('SignIn')
      })
      .catch(error => {
        Alert.alert(error)
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/DateCheck-Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <InputField
          valid={isValidEmail}
          placeholder="E-Mail Adresse*"
          value={email}
          keyboardType="email-address"
          onChange={setEmail}
        />
        <View style={styles.submitBtn}>
          <Button title="Bestätigungsmail erneut senden" onPress={() => submitForm()} />
        </View>
      </View>
    </View>
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
  form: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  submitBtn: {
    marginTop: 10,
  },
  invalid: {
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor + '20',
  },
  otherContainer: {
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  otherContainerText: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 16,
  },
})
