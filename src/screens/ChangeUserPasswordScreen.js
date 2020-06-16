import * as React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Colors from '../../Colors'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { DismissKeyboard } from '../../components/Utils'
import ProfileService from '../services/ProfileService'

const isValidPassword = password => {
  return password !== null && password !== '' && password.length > 8
}

export default ChangeUserPasswordScreen = ({navigation, route}) => {
  const [oldPassword, setOldPassword] = React.useState(null);
  const [newPassword, setNewPassword] = React.useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = React.useState(null);
  const [isOldPasswordValid, setIsOldPasswordValid] = React.useState(true);
  const [isNewPasswordValid, setIsNewPasswordValid] = React.useState(true);
  const [isConfirmNewPasswordValid, setIsConfirmNewPasswordValid] = React.useState(true);

  const validateForm = () => {
    let isOldPasswordValid = oldPassword !== null && oldPassword.length > 0
    setIsOldPasswordValid(isOldPasswordValid)

    let isNewPasswordValid = isValidPassword(newPassword)
    setIsNewPasswordValid(isNewPasswordValid)

    let isConfirmNewPasswordValid = newPassword === confirmNewPassword
    setIsConfirmNewPasswordValid(newPassword === confirmNewPassword)

    return isOldPasswordValid && isNewPasswordValid && isConfirmNewPasswordValid
  }

  const submitForm = () => {
    if (validateForm()) {
      ProfileService.updatePassword(oldPassword, newPassword, route.params?.apiToken)
        .then(() => {
          Alert.alert('Passwort geändert', 'Ihr Passwort wurde erfolgreich geändert.')
          navigation.navigate('edit-profile')
        })
        .catch((error) => {
          Alert.alert(
            'Fehler',
            'Es ist ein Fehler beim Ändern des Passwortes aufgetreten. Bitte versuchen Sie es später noch einmal.',
          )
        })
    }
  }

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.form}>
            <InputField
              valid={isOldPasswordValid}
              placeholder="Altes Passwort*"
              value={oldPassword}
              secureTextEntry
              onChange={setOldPassword}
            />

            <InputField
              valid={isNewPasswordValid}
              placeholder="Neues Passwort*"
              value={newPassword}
              secureTextEntry
              onChange={setNewPassword}
            />

            <InputField
              valid={isConfirmNewPasswordValid}
              placeholder="Neues Passwort bestätigen*"
              value={confirmNewPassword}
              secureTextEntry
              onChange={setConfirmNewPassword}
            />
            <View style={styles.submitBtn}>
              <Button title="Neues Passwort setzen" onPress={() => submitForm()} />
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
  form: {
    flexDirection: 'column',
    marginTop: 15,
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
