import { View, Text } from 'react-native'
import React from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'

const SIZE = 50

const PaneGesture1 = () => {

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value

    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX  
      translateY.value = event.translationY + context.translateY
    },
    onEnd: () => { 
      translateX.value = withSpring(0)
      translateY.value = withSpring(0)
    },
  })

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        {translateY:translateY.value }
      ]
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }} >
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGestureEvent} >

          <Animated.View style={[{ height: SIZE, width: SIZE, borderRadius: SIZE / 2, backgroundColor: 'blue' }, rnStyle]} />
        </PanGestureHandler>
      </GestureHandlerRootView>
      {/* <Animated.View style={[{ height: SIZE, width: SIZE, borderRadius: SIZE / 2, backgroundColor: 'blue' }, rnStyle]} /> */}

    </View>
  )
}

export default PaneGesture1