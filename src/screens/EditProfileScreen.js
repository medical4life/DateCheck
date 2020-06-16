import React from 'react'
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native'
import Colors from '../../Colors'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
//import AppUser from '../src/domain/AppUser'
import { DismissKeyboard } from '../../components/Utils'
import ProfileService from '../services/ProfileService'

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const EditProfileScreen = ({navigation, route}) => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [loadingUpdate, setLoadingUpdate] = React.useState(false);

  React.useEffect(() => {
    ProfileService.get(route.params?.apiToken).then(profile => {
      setUser(profile);
      setLoading(false);
    })
  }, []);

  const handleEmailChange = email => {
    user.email = email
    setUser(user)
  }

  const deactivateAccount = () => {
    Alert.alert(
      'Account wirklich löschen?',
      'Alle Daten werden entfernt und auch die Ihnen zugeordneten Accounts werden unwiderruflich gelöscht!',
      [
        {
          text: 'Abbrechen',
          onPress: () => {},
          style: 'Cancel',
        },
        { text: 'Ja', onPress: () => {navigation.navigate('deactivate-account')} },
      ],
      { cancelable: false },
    )
  }

  const updateProfile = () => {
    setLoadingUpdate(true);
    let isValid = true
    if (user.email !== null) {
      // verify if it is a valid email
      isValid = validateEmail(user.email)

      if (!isValid) {
        Alert.alert('Profil nicht geändert', 'Bitte geben Sie eine korrekte E-Mail Adresse an.')
      }
    }

    if (isValid === true) {
      ProfileService.update(user, route.params?.apiToken).then(() => {
        Alert.alert('Profil geändert', 'Ihr Profil wurde erfolgreich gespeichert.')
        navigation.navigate('profile')
      }).catch((error) => {
        console.log(error)
        Alert.alert('Profil nicht geändert', error)
      }).finally(setLoadingUpdate(false));
    }
  }

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          {loading ? <ActivityIndicator size="large" /> :
            <View style={styles.profileForm}>
              <View style={styles.profileInfo}>
                <Text style={styles.infoCategory}>Benutzername</Text>
                <Text style={styles.info}>{user.username}</Text>
                <InputField
                  placeholder="E-Mail Adresse"
                  label="E-Mail Adresse"
                  onChange={handleEmailChange}
                  value={user.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.submitButton}>
                <Button title="Einstellungen speichern" onPress={() => updateProfile()} loading={loadingUpdate} />
              </View>
            </View>
          }
          <View style={styles.submitButton}>
            <Button title="Passwort ändern" onPress={() => navigation.navigate('update-password')} type="secondary" />
          </View>
          <View style={styles.submitButton}>
            <Button title="Account löschen" onPress={() => deactivateAccount()}  type="secondary" />
          </View>
        </View>
      </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  infoCategory: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileForm: {
    flexDirection: 'column',
    marginTop: 10,
  },
  profileInfo: {
    marginHorizontal: 20,
  },
  submitButton: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  extraFieldsBlock: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  userProfileSwitchText: {
    marginTop: 7,
    alignContent: 'flex-start',
  },
  userProfileSwitch: {
    alignContent: 'flex-end',
    marginTop: 0,
    marginBottom: 5,
    marginLeft: 22,
    marginRight: 0,
  },
})

export default EditProfileScreen
