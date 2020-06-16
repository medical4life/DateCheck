import React from 'react'
import { StyleSheet, View, Text, Dimensions, ActivityIndicator } from 'react-native'

import QRCode from 'react-native-qrcode-svg'

export default function ProfileScreen({uid}) {
  const dimensions = Dimensions.get('window')

  return (
    <View style={styles.code}>
      {uid != null ? (
        <>
          <QRCode value={'https://qrmbp.de/c/' + uid} style={styles.qrCode} size={dimensions.width / 2} />
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  code: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrCode: {
    flexGrow: 1,
    width: '50%',
  },
})
