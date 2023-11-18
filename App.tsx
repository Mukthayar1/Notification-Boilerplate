import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NotificationPermission, NotificationListener } from './NotificationActions/NotificationActions'

const App = () => {

  const [FcmToken, setFcmToken] = useState<String>()

  useEffect(() => {
    NotificationPermission(setFcmToken);
    NotificationListener()
  }, []);

  console.log('FcmToken', FcmToken)

  return (
    <View style={{ backgroundColor: "black",flex:1 }}>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})