


import * as React from 'react'

import { Image, StyleSheet, View } from 'react-native'
import { useSharedValue, withSpring } from 'react-native-reanimated'
import { ScratchCard } from 'rn-scratch-card'

export default function ScratchCards() {
  const [isVisible, setIsVisible] = React.useState(true)
  
  return (
    <View style={styles.container}>
      <Image source={require('../assets/scratch_background.png')} style={styles.background_view} />
      {isVisible ? (
        <View>
          <ScratchCard
            source={require('../assets/scratch_foreground.png')}
            brushWidth={50}
            onScratch={handleScratch}
            style={styles.scratch_card}
          />
        </View>
      ): (
        <View>
        
      </View>
      )}
    </View>
  )

  function handleScratch(scratchPercentage: number) {
    if (Number(scratchPercentage) > 50) {
      setIsVisible(false)
    }
    console.log(scratchPercentage, 'scratchCard')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  background_view: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 16,
  },
  scratch_card: {
    width: 400,
    height: 400,
    backgroundColor: 'transparent',
  },
})
