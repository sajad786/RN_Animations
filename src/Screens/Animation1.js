// import { View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
// import { TouchableOpacity } from 'react-native-gesture-handler'

// const SIZE = 100
// const TouchableAnimation = Animated.createAnimatedComponent(TouchableOpacity)

// const Animation1 = () => {
//     const  progress = useSharedValue(0)
//     const scale = useSharedValue(2)

//     const animatedBoxStyle = useAnimatedStyle(()=>{
//         return{
//             opacity: progress.value,
//         }
//     })

//     useEffect(() => {
//         progress.value = withTiming(0.5, 5000)
//     }, [])
    
    

//   return (
//     <View style={{flex:1, 
//             backgroundColor:'grey', justifyContent:'center', alignItems:'center'}} >  
//         <Animated.View style={[{backgroundColor:'blue', height:SIZE, justifyContent:'center', alignItems:'center', width:SIZE}, animatedBoxStyle]} >
//         <Animated.Text style={{color:'white',  fontWeight:'bold'}} >click me </Animated.Text>
//     </Animated.View>
//     </View>
//   )
// }

// export default Animation1




import { Dimensions, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
const TouchableAnimation = Animated.createAnimatedComponent(TouchableOpacity)
const { height, width } = Dimensions.get('window')
const Animation1 = () => {
  const animationValue = useSharedValue(0)
  const translateX = useSharedValue(0)
  const animatePixelValue = useSharedValue(10)
  const AnimateOpacity = useSharedValue(0)
  const topvalue = useSharedValue(0)

  
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

  
  function someWorklet(greeting) {
    'worklet';
    if (animatePixelValue.value <  width) {
        return animatePixelValue.value + 50
    } else {
        return animatePixelValue.value - 50
    }
  }

  const onPress = (vel) => {
    animatePixelValue.value = withSpring(someWorklet)
    // setSelect(!select)
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

  const animateBtnStyle = useAnimatedStyle(()=>{
    return{
        top:animatePixelValue.value,
        left:animatePixelValue.value,
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

  const animatedBounceBall = useAnimatedStyle(() => {
    return{
        opacity:AnimateOpacity.value,
        top:topvalue.value
    }
  })

  useEffect(() => {
   setTimeout(() => {
    AnimateOpacity.value = withTiming(1, 3000)
    topvalue.value =withRepeat( withSpring(height/2) , 3 )
   }, 3000);
  }, [])
  

  return (
    <View style={{ flex: 1, backgroundColor: 'grey',  }} >
      <Animated.View>
        {/* <TouchableAnimation onPress={onPress} style={[{
          backgroundColor: 'green',
          height: 50, 
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          top: 10,
          position: 'absolute', 
          zIndex: 1,
          paddingHorizontal:20
        }, animateBtnStyle]}>
          <Animated.Text style={[{ color: 'white' }]}>{`Click me `}
        </Animated.Text>
        </TouchableAnimation> */}

        <Animated.View style={[{height:60, width:60, borderRadius:30, backgroundColor:'blue', position:'absolute',top:0, alignSelf:'center'},animatedBounceBall]} >

        </Animated.View>
        
      </Animated.View>

    </View>
  )
}

export default Animation1

const styles = StyleSheet.create({})


