import React, { useCallback, useMemo, useRef
  ,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HereMap = () => {
  const [btmSHeetIndx, setBtmSHeetIndx] = useState(-1)
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%",'25%'], []);
console.log(btmSHeetIndx,'btmSHeetIndxbtmSHeetIndx');

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef?.current?.collapse()
    console.log('handleSheetChanges', index);
  }, []);

  const onClose = () => {
    console.log(JSON.stringify(bottomSheetRef?.current),'bottomSheetRefbottomSheetRef')
    JSON.stringify(bottomSheetRef?.current?.close())
  }
  return (
    <GestureHandlerRootView style={styles.container} >
      {/* <View style={styles.container}> */}
      <Text onPress={()=>{
        bottomSheetRef?.current?.snapToIndex(0)
      }}>click me</Text>
        <BottomSheet
        //  detached={true}
          ref={bottomSheetRef}
          index={btmSHeetIndx}
          snapPoints={snapPoints}
          // bottomInset={46}
          onChange={handleSheetChanges}
        >
          
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={onClose} >
              
            <Text>Awesome 🎉</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      {/* </View> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HereMap;


