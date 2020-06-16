import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Linking, Dimensions, ActivityIndicator } from 'react-native'
import { getVersion, getBuildNumber } from 'react-native-device-info'

import Colors from '../../Colors'
import { configuration } from '../../Constants'
import Button from '../../components/Button'

//import AppUser from '../src/domain/AppUser'
import ProfileService from '../services/ProfileService'
import ProfileInformation from '../../components/ProfileInformation'
import ProfileStatus from '../../components/ProfileStatus'

const ProfileScreen = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    medicalStatus: ''
  })

  React.useEffect(() => {
    ProfileService.get(route.params?.apiToken).then(profile => {
      setUser(profile);
      setLoading(false);
    }).catch(error => {})
  }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.profileInfo]}>
        {loading ? <ActivityIndicator size="large" /> :
          <>
          <ProfileInformation title="Benutzername" value={user.username} />
          <ProfileInformation title="E-Mail" value={user.email} />
          <ProfileStatus title="Aktueller Status" status={user.medicalStatus} />
          </>
        }
      </View>
      <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, marginBottom: 10 }} />
      <View style={[styles.profileInfo]}>
        <Button title="Daten für digitale Gästelisten anpassen" onPress={() => navigation.navigate('guestData')} />
      </View>
      <View style={[styles.grow]} />
      <View style={styles.footer}>
        <View style={styles.logoutBtn}>
          <Button
            title="Abmelden"
            onPress={() => {
              if(route.params?.onLogout !== undefined) {
                route.params?.onLogout();
              }
            }}
          />
        </View>
        <View style={styles.gdprContainer}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(configuration.gdprUrl)
            }}>
            <Text style={styles.gdprLink}>Datenschutzerklärung</Text>
          </TouchableOpacity>
          <Text style={styles.appVersion}>
            Version: {getVersion()}-{getBuildNumber()}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    maxHeight: Dimensions.get('window').height - 80,
    backgroundColor: 'white',
  },
  profileInfo: {
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  logoutBtn: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  gdprLink: {
    color: '#808080',
    textAlign: 'center',
    marginBottom: 20,
    flexGrow: 1,
  },
  gdprContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  appVersion: {
    color: '#aaa',
    flexGrow: 1,
    textAlign: 'right',
  },
  footer: {},
  managedAccountsHeading: {
    color: Colors.primaryColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
})

export default ProfileScreen
