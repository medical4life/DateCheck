import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../../components/Button'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const CheckProfileResult = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={route.params?.completed ? styles.profileCompletedState : styles.profileNotCompletedState}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MCIcon name={route.params?.completed ? 'check' : 'alert-circle'} size={40} color="white" />
          <Text style={styles.statusText}>DateCard</Text>
        </View>
        {route.params?.completed ? null : <Text style={styles.note}>Profildaten nicht vollständig ausgefüllt</Text>}
      </View>
        <View style={route.params?.ownCompleted ? styles.profileCompletedState : styles.profileNotCompletedState}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MCIcon name={route.params?.ownCompleted ? 'check' : 'alert-circle'} size={40} color="white" />
          <Text style={styles.statusText}>App</Text>
        </View>
        {route.params?.ownCompleted ? null : <Text style={styles.note}>Profildaten nicht vollständig ausgefüllt</Text>}
      </View>
      <View style={styles.buttonGroup}>
      <Button title="Ok" style={{marginLeft: 20}} onPress={() => {navigation.navigate('Home')}} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  profileCompletedState: {
    backgroundColor: '#279b37',
    width: '100%',
    //minHeight: 180,
    padding: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 6,
  },
  profileNotCompletedState: {
    backgroundColor: '#ff4c4c',
    width: '100%',
    //minHeight: 180,
    padding: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 6,
  },
  statusText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  note: {
    color: 'white',
    marginLeft: 50,
  }
});

export default CheckProfileResult
