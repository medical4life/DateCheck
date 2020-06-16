import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Button from '../../components/Button'

import ProfileCode from '../../components/ProfileCode'
import ProfileService from '../services/ProfileService'

export default function ScanFriend({ navigation, route }) {
  const [uid, setUid] = React.useState(null);

  React.useEffect(() => {
    ProfileService.get(route.params?.apiToken).then(profile => {
      console.log(profile);
      setUid(profile.uid);
    }).catch(error => {

    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Lassen Sie Ihren Code von einem Anderen scannen um sich mit ihm zu verbinden.
      </Text>
      <ProfileCode uid={uid}/>
      <Button
        title="Ich möchte einen Code scannen"
        onPress={() => {
          navigation.navigate('scan')
        }}
        type="secondary"
      />
      <Button
        title="QR-Code für digitale Gästeliste anzeigen"
        onPress={() => {
          navigation.navigate('scan')
        }}
        type="secondary"
        style={styles.button}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
})
