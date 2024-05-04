import { Dimensions, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const {height, width} = Dimensions.get('window')
const ScratchCardsCustom = ({data, onPress}) => {
  return (
      <TouchableOpacity   onPress={onPress} style={styles.boxStyle} >
        <Image style={styles.boxStyle} source={data?.imageFront} />
      </TouchableOpacity>
  )
}

export default ScratchCardsCustom

const styles = StyleSheet.create({
  boxStyle:{
    width:width/2.3,
    height:width/2.3,
    borderRadius:20,
    // backgroundColor:'green'
  }
})