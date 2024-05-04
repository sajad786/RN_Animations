import { Dimensions, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
const TouchableAnimation = Animated.createAnimatedComponent(TouchableOpacity)
const { height, width } = Dimensions.get('window')
const Home = () => {
  const animationValue = useSharedValue(0)
  const translateX = useSharedValue(0)
  
  const [select, setSelect] = useState(false)
  const [sliderState, setSliderState] = useState(1);
  const [state, setState] = useState([{id:'dsafg1'},{id:'dsafgd22'},{id:'dsafgd33'},{id:'dsafgd44'}]);

  useEffect(() => {
    if (select) {
      animationValue.value = withTiming(1)
      return
    }
    animationValue.value = withTiming(0)

  }, [select])

  const onPress = (vel) => {
    setSelect(!select)
  }
  const srollHandler = useAnimatedScrollHandler( (event) => {
    const {x} = event.contentOffset;
    translateX.value=x
    const indexOfNextScreen = Math.fround((x + width) / width)?.toFixed(0);
    if (Number(indexOfNextScreen) !== Number(sliderState)) {
      runOnJS(setSliderState)(Number(indexOfNextScreen))
    }
  })

  const animatinStyle = useAnimatedStyle(() => {
    let heightAnimation = interpolate(animationValue.value, [0, 1], [0, 200])
    let color = interpolate(animationValue.value, [0, 1], [0, 1])
    return {
      height: heightAnimation,
      backgroundColor: `rgba(225,225,225,${color})`

    }
  })

    const testAnimatedStyle = useAnimatedStyle(() => {
      const inputRange=  [((sliderState-1) - 1) * width, (sliderState-1) * width, ((sliderState+1) + 1) * width]
        const translateXValue = interpolate(translateX.value, inputRange,  [-width / 2, 0, width / 2],    Extrapolate.CLAMP,)
        const opacity= interpolate(translateX.value,inputRange,[-2,1,-2],    Extrapolate.CLAMP,)

        return {
          opacity,
            transform:[{translateX:translateXValue}]
        }
    })

    const ciewStyle = useAnimatedStyle(() => {
      const inputRange=  [((sliderState-1) - 1) * width, (sliderState-1) * width, ((sliderState+1) + 1) * width]
        let borderRadius=interpolate(translateX.value,inputRange,[5,40,5])
        return {
          borderRadius
        }
    })
  const renderItem = ({ item, index }) => {
    return (
      <Animated.View style={[{ alignItems: 'center', alignSelf: 'center',borderRadius:10, marginHorizontal: 10, width: width - 20, }, animatinStyle]}>
      </Animated.View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'grey' }} >
      <Animated.View>
        <TouchableAnimation onPress={onPress} style={[{
          backgroundColor: 'green',
          height: 50, 
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          top: 10,
          position: 'absolute', 
          zIndex: 1,
          paddingHorizontal:20
        },ciewStyle]}>
          <Animated.Text style={[{ color: 'white' },testAnimatedStyle]}>{state[sliderState-1]?.id}
        </Animated.Text>
        </TouchableAnimation>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={state}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={srollHandler}
          data={state}
          // ItemSeparatorComponent={<View style={{ paddingHorizontal: 10 }} />}
          renderItem={renderItem}
        />
      </Animated.View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
