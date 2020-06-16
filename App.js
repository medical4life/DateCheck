import * as React from 'react'
import { StyleSheet, StatusBar, Platform, Alert, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Colors from './Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ScanFriend from './src/screens/ScanFriend';
import CheckProfileResult from './src/screens/CheckProfileResult';
import EditProfileScreen from './src/screens/EditProfileScreen';
import ChangeUserPasswordScreen from './src/screens/ChangeUserPasswordScreen';
import DeactivateAccountScreen from './src/screens/DeactivateAccountScreen';
import ResendConfirmationEmail from './src/screens/ResendConfirmationEmail'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import ListCheckins from './src/screens/ListCheckins'
//import GuestDataScreen from './components/GuestDataScreen'

//import BackgroundFetch from 'react-native-background-fetch'

// import the services
// import InternetConnectivityService from './src/services/InternetConnectivityService'
//import RequestBufferService from './src/services/RequestBufferService'
//import APIService from './src/services/api/APIService'
//import AuthAPIService from './src/services/api/AuthAPIService'
//import AsyncStorageService from './src/services/AsyncStorageService'
//import Configuration from './src/services/api/Configuration'

import StorageService from './src/services/StorageService';

const Stack = createStackNavigator()

function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)
  const [user, setUser] = React.useState()

  const signedIn = token => {
    StorageService.store('usertoken', token).then(() => {setUserToken(token)});
  }

  React.useEffect(() => {
    StorageService.get('usertoken')
      .then(itemValue => {
        setUserToken(itemValue)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
  });

  const signOut = () => {
    console.log('logout');
    StorageService.remove('usertoken')
      .then(() => {
        setUserToken(null)
      })
      .catch(error => console.log(error))
  }

  const registered = (user) => {
    signedIn(user.token);
  };

  {/*React.useEffect(() => {
    let requestBufferService = new RequestBufferService()

    // start and configure the background service
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
      },
      async taskId => {
        //alert('background task started', taskId)
        requestBufferService.dispatchPendingRequests()
        BackgroundFetch.finish(taskId)
      },
      error => {
        console.log('[js] ' + error)
      },
    )

    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted')
          break
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied')
          break
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled')
          break
      }
    })
  }, [])*/}

  /*const updateCheckIn = ({ uid, host }, friend) => {
    // get the list of check-ins that are not yet sent
    // to the backend
    let promise = new Promise((resolve, reject) => {
      AsyncStorage.multiGet(['checkins', 'usertoken']).then(async value => {
        let storage = {}
        value.forEach(item => {
          storage[item[0]] = item[1]
        })

        console.log({ uid, host })

        //let list = JSON.parse(storage.checkins)

        let requestHeader = await Utilities.prepareHeaders(true, 'json')
        let service = new APIService()
        //let url = friend ? Configuration.API_CHECKIN : Configuration.API_LOCATION_CHECKIN
        service
          .request(Configuration.API_CHECKIN, 'POST', requestHeader, {
            uid: uid,
            hostUid: host,
            queuedTimestamp: await Utilities.getCurrentDateTime(),
            dispatchedTimestamp: await Utilities.getCurrentDateTime(),
          })
          .then(async result => {
            console.log(result.status)
            console.log(await result.text())
            if (result.status !== 201) {
              reject(await result.json())
              return
            }
            return result.json()
          })
          .then(result => {
            console.log(result)
            setCheckIn({
              checkIn: result,
              setCheckIn: (d, f) => {
                return updateCheckIn(d, f)
              },
            })
            resolve(result)
            //AsyncStorage.setItem('checkins', JSON.stringify(list))
            setTimeout(() => {
              setCheckIn({
                checkIn: null,
                setCheckIn: (d, f) => {
                  return updateCheckIn(d, f)
                },
              })
            }, 3000)
          })
          .catch(error => console.error(error))
      })
    })

    return promise
  }*/

  /*React.useEffect(() => {
    try {
      UserAPIService.getProfile().then(userData => {
        if (userData !== null) {
          setUser(userData)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  const [checkIn, setCheckIn] = React.useState({
    checkIn: null,
    setCheckIn: (data, friend = false) => {
      return updateCheckIn(data, friend)
    },
  })*/

  if (isLoading && Platform.OS === 'android') {
    // We haven't finished checking for the token yet
    return <SplashScreen />
  }

  return (
    //<CheckInContext.Provider value={checkIn}>
        <NavigationContainer>
          <StatusBar backgroundColor={Colors.primaryColor} barStyle={'light-content'} />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primaryColor,
              },
              headerTintColor: '#fff',
            }}>
            {userToken == null ? (
              // No token found, user isn't signed in
              <>
                <Stack.Screen
                  name="SignIn"
                  component={LoginScreen}
                  options={{
                    title: 'Anmelden',
                    headerShown: false,
                  }}
                  initialParams={{
                    onResult: signedIn
                  }}
                />
                <Stack.Screen
                  name="forgot-password"
                  component={ForgotPasswordScreen}
                  options={{ title: 'Passwort zurücksetzen' }}
                />
                <Stack.Screen
                  name="register"
                  component={RegisterScreen}
                  options={{
                    title: 'Registrieren',
                  }}
                  initialParams={{
                    onSuccess: registered
                  }}
                />
                <Stack.Screen
                  name="resend-confirmation-email"
                  component={ResendConfirmationEmail}
                  options={{ title: 'Bestätigungsmail senden' }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={({ navigation, route }) => ({
                    title: '',
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('profile')
                        }}
                        style={styles.profileButton}>
                        <MaterialCommunityIcons name="account" size={30} color="white" />
                      </TouchableOpacity>
                    ),
                  })}
                  initialParams={{
                    apiToken: userToken,
                  }}
                />
                <Stack.Screen name="scan_friend"
                  options={{ title: 'Mein QR-Code anzeigen' }}
                  component={ScanFriend}
                  initialParams={{
                    apiToken: userToken
                  }}
                />
                <Stack.Screen
                  name="profile"
                  component={ProfileScreen}
                  options={({ navigation, route }) => ({
                    headerTitle: 'Mein Profil',
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('edit-profile')
                        }}
                        style={styles.profileButton}>
                        <MaterialCommunityIcons name="account-edit" size={30} color="white" />
                      </TouchableOpacity>
                    ),
                  })}
                  initialParams={{
                    apiToken: userToken,
                    onLogout: signOut
                  }}
                />
                <Stack.Screen name="scan" options={{ title: 'DateCard scannen' }} component={ScanScreen} />
                <Stack.Screen
                  name="CheckProfileResult"
                  options={{ title: '' }}
                  component={CheckProfileResult}
                  initialParams={{
                    apiToken: userToken
                  }}
                />
                <Stack.Screen
                  name="edit-profile"
                  options={{ title: 'Profil bearbeiten' }}
                  component={EditProfileScreen}
                  initialParams={{
                    apiToken: userToken
                  }}
                />
                <Stack.Screen
                  name="update-password"
                  options={{ title: 'Passwort ändern' }}
                  component={ChangeUserPasswordScreen}
                  initialParams={{
                    apiToken: userToken
                  }}
                />
                <Stack.Screen
                  name="deactivate-account"
                  options={{ title: 'Account löschen' }}
                  component={DeactivateAccountScreen}
                  initialParams={{
                    apiToken: userToken,
                    onLogout: signOut
                  }}
                />
                <Stack.Screen name="checkin-list" options={{ title: 'Meine Check-Ins' }} component={ListCheckins} 
                  initialParams={{
                    apiToken: userToken,
                  }}/>
                {/*
                <Stack.Screen
                  name="guestData"
                  options={{ title: 'Daten für digitale Gästelisten' }}
                  component={GuestDataScreen}
                />*/}
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
    //</CheckInContext.Provider>
  )
}

const styles = StyleSheet.create({
  profileButton: {
    marginHorizontal: 20,
  },
})

export default App
