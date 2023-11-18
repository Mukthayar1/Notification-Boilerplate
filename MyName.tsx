import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyName = ({naxme}) => {
    console.log('props', naxme)
    return (
        <View>
            <Text>MyName</Text>
        </View>
    )
}

export default MyName

const styles = StyleSheet.create({})