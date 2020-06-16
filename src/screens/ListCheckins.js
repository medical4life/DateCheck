import React from 'react'
import { Alert, ActivityIndicator } from 'react-native'
import CheckInService from '../services/CheckinService'
import CheckIns from '../../components/CheckinList'

export default function ListCheckins({ navigation, route }) {
  const [list, setlist] = React.useState([])
  const [loading, setLoading] = React.useState(true);

  const handleCheckout = async location => {
    console.log(location)
    let { uid, hostUid } = location
    if (uid !== null && uid !== undefined) {
      // if the item id is valid
      CheckInService.checkin(hostUid,uid, route.params?.apiToken).then(result => {})
      .catch(error => Alert.alert('Fehler beim Auschecken', error))
      .finally(() => fetchCheckInList())
    }
  }

  const fetchCheckInList = () => {
    setLoading(true)
      CheckInService.listCheckins(route.params?.apiToken).then(checkins => {
        checkins = checkins.sort((a, b) => {
          return b.checkedOut === null || a.checkedIn < b.checkedIn
        })
        setlist(checkins)
      })
      .catch(error => Alert.alert('Fehler beim Laden der Liste', error))
      .finally(setLoading(false));
  }

  React.useEffect(() => {
    fetchCheckInList()
  }, [])

  return loading ? 
  <ActivityIndicator size="large" /> : 
  <CheckIns navigation={navigation} list={list} handleCheckOut={handleCheckout} />
}
