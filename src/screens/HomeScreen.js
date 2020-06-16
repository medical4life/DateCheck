import * as React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ProfileService from '../services/ProfileService';
import CheckinService from '../services/CheckinService';
import Logo from '../../assets/images/DateCheck-Logo.png';

import PushNotificationIOS from '@react-native-community/push-notification-ios'
var PushNotification = require('react-native-push-notification')

export default function HomeScreen({ navigation, route }) {
  const onPress = () => {
    navigation.navigate('scan', {onScan: ({type, uid}) => {
      ProfileService.get(route.params?.apiToken).then(profile => {
        ProfileService.checkProfiles(uid, profile.uid, route.params?.apiToken)
        .then((result) => {
          CheckinService.checkin(profile.uid, uid, route.params?.apiToken);
          navigation.navigate('CheckProfileResult',
          {
            completed: result.profileCompleted,
            ownCompleted: result.ownProfileCompleted
          }
          );
        }).catch(error => alert(error))
      })
    }})
  }

  //const { checkIn } = React.useContext(CheckInContext)

  /*React.useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        //TODO: Send the token to the backend
        console.log('TOKEN:', token)
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification)

        // process the notification
        PushNotification.localNotification({
          //title: 'My Notification Title', // (optional)
          message: notification.message, // (required)
        })

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },

      popInitialNotification: true,
    })
  })*/

  return (
    <View style={styles.container}>
      {/*checkIn ? (
        <View style={styles.lastCheckin}>
          <Text style={styles.checkinTitle}>
            {checkIn.type === 'CITIZEN'
              ? 'Mit einer Person verbunden'
              : (checkIn.event === 'CHECKIN' ? 'Aktuell eingecheckt bei ' : 'Ausgecheckt von ') + checkIn.name}
          </Text>
        </View>
      ) : null*/}

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image source={Logo} style={styles.welcomeImage} />
          <Text>Anonym. Sicher. Geprüft.</Text>
        </View>

        <View style={styles.list}>
            <TouchableOpacity onPress={onPress} style={styles.item} activeOpacity={0.2}>
              <MaterialCommunityIcons name="qrcode-scan" size={40} />
              <Text style={styles.title}>DateCard scannen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('scan_friend')
              }}
              style={styles.item}>
              <MaterialCommunityIcons name="account-multiple-check" size={40} />
              <Text style={styles.title}>Mein QR-Code anzeigen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('checkin-list')
              }}
              style={styles.item}>
              <MaterialCommunityIcons name="playlist-check" size={40} />
              <Text style={styles.title}>Meine Check-Ins</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 5,
    paddingVertical: 40,
  },
  welcomeImage: {
    maxWidth: 300,
    width: '70%',
    resizeMode: 'contain',
    height: 80,
  },
  lastCheckin: {
    backgroundColor: '#57b460',
    padding: 10,
    color: 'white',
    bottom: 0,
    right: 0,
    left: 0,
    borderColor: '#006e1f',
    borderTopWidth: 0,
    position: 'absolute',
    zIndex: 100,
  },
  checkinTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  columnLeft: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: '50%',
  },
  columnRight: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: '50%',
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: 150,
    //maxWidth: 150,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
})
