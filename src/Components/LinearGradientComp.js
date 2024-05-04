



import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientComp = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#FF5733', '#00ADEF']}
        start={{ x: 0, y: 0 }} // (0,0) is the top-left corner of the component
        end={{ x: 1, y: 0 }}   // (1,0) is the top-right corner of the component
        style={{ flex: 1 }}
      >
        {/* Your content here */}
      </LinearGradient>
    </View>
  );
};

export default LinearGradientComp;

const styles = StyleSheet.create({
   
  })
