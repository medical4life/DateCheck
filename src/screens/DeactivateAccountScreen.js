import * as React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Colors from '../../Colors'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { DismissKeyboard } from '../../components/Utils'
import ProfileService from '../services/ProfileService'

export default DeactivateAccountScreen = ({navigation, route}) => {
  const [password, setPassword] = React.useState(null);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submitForm = () => {
    if (isPasswordValid) {
      setLoading(true);
      ProfileService
        .deactivateAccount(route.params?.apiToken)
        .then(() => {
          Alert.alert('Account gelöscht', 'Ihr Account wurde erfolgreich gelöscht.')
          if(route.params?.onLogout !== undefined) {
            route.params?.onLogout();
          }
        })
        .catch((error) => {
          Alert.alert('Fehler beim Löschen des Accounts', error)
        }).finally(() => setLoading(false));
    }
  }

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.form}>
            <InputField
              placeholder="Passwort zur Bestätigung eingeben*"
              value={password}
              secureTextEntry
              onChange={value => {
                setPassword(value);
                setIsPasswordValid(value !== null && value.length > 0)
              }}
            />

            <View style={styles.submitBtn}>
              <Button title="Account unwiderruflich löschen" enabled={isPasswordValid} onPress={() => submitForm()} />
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
