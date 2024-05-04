import * as React from 'react'

import { Image, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { ScratchCard } from 'rn-scratch-card'

export default function ScratchCardsMultiple() {
  const [isVisible, setIsVisible] = React.useState(true)

  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

    React.useEffect(() => {
      scale.value = withSpring(2)
      opacity.value = withSpring(1)
    }, [isVisible])



  const giftCustomStyle = () => useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor:'green',
      transform: [{ scale: scale.value }],

    }
  })

  const updateGiftAnimatedStyle = () => {
    scale.value = withSpring(2)
    opacity.value = withSpring(1)
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background_view, giftCustomStyle]} >
        <Image source={require('../assets/scratch_background.png')} style={{
          width: 400,
          height: 400,
        }} />
      </Animated.View>
      {isVisible ? (
        <View>
          <ScratchCard
            source={require('../assets/scratch_foreground.png')}
            brushWidth={50}
            onScratch={handleScratch}
            style={styles.scratch_card}
          />
        </View>
      ) : (
        <View>
        </View>
      )}
    </View>
  )

  function handleScratch(scratchPercentage) {
    if (Number(scratchPercentage) > 50) {
      setIsVisible(false)
      updateGiftAnimatedStyle()
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
