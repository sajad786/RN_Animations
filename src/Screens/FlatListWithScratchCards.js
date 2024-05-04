import { Alert, Button, Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'
import ScratchCards from './ScratchCards'
import ScratchCardsCustom from '../Components/ScratchCardsCustom'
import { ScratchCard } from 'rn-scratch-card'
import Modal from "react-native-modal";
import CustomModal from '../Components/CustomModal'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get('window')

const FlatListWithScratchCards = () => {
    const [isScractCardModal, setIsScractCardModal] = useState(false)
    const [isScratchedGiftImage, setIsScratchedGiftImage] = useState(false)

    const DATA = [
        { id: 1, imageFront: require('../assets/scratch_foreground.png'), imageBack: require('../assets/scratch_background.png') },
        { id: 1, imageFront: require('../assets/scratch_foreground.png'), imageBack: require('../assets/scratch_background.png') },
        { id: 1, imageFront: require('../assets/scratch_foreground.png'), imageBack: require('../assets/scratch_background.png') }]

    const onScratCardPress = () => {
        setIsScractCardModal(true)
        return
    }

    const renderScratchCrds = ({ item }) => {
        return (
            <View style={{ marginRight: 15, }} >
                <ScratchCardsCustom
                    onPress={onScratCardPress}
                    data={item}
                />
            </View>
        )
    }

    function handleScratch(scratchPercentage) {
        if (Number(scratchPercentage) > 30) {
            setIsScratchedGiftImage(true)
        }
        console.log(scratchPercentage, 'scratchCard')
    }

    const mainContainView = () => {
        return (
            <View style={{ height: height / 2, }}>
                <View>
                    <View style={styles.background_view} >
                        <Image source={require('../assets/scratch_background.png')} style={styles.background_view} />
                    </View>
                    {!isScratchedGiftImage ? (
                        <View>
                            <ScratchCard
                                source={require('../assets/scratch_foreground.png')}
                                brushWidth={50}
                                onScratch={handleScratch}
                                style={styles.scratch_card}
                            />
                        </View>
                    ) : (<View />
                    )}
                </View>
                <View style={{ marginTop: 10, position:'absolute', bottom:60 }} >
                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'orange' }} >{`Yoo! something Surprising is waiting for you \n just Scratch me and avail the offer. `} </Text>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 16, backgroundColor: 'grey' }} >
            <SafeAreaView />
            <Animated.FlatList
                contentContainerStyle={{
                    justifyContent: 'space-between'
                }}
                style={{
                    flex: 1,
                    alignSelf: 'center'
                }}
                numColumns={2}
                extraData={DATA}
                keyExtractor={item => item.id.toLocaleString()}
                data={DATA}
                renderItem={renderScratchCrds}
                ItemSeparatorComponent={() => (
                    <View
                        style={{ height: 15, }}
                    />
                )}
            />


            <View>
                <CustomModal
                    isModalVisible={isScractCardModal}
                    onBackdropPress={() => setIsScractCardModal(false)}
                    mainContainView={mainContainView}
                />
            </View>

            {/* <Modal style={{flex:1}} customBackdrop={
                <TouchableWithoutFeedback onPress={() => setIsScractCardModal(false)}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
            } useNativeDriver={true} hideModalContentWhileAnimating={true} onBackdropPress={() => setIsScractCardModal(false)} isVisible={isScractCardModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.modalInnerBoxView}>

                        <Image source={require('../assets/scratch_background.png')} style={styles.background_view} />
                        {!isScratchedGiftImage ? (
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

                       {//  from here not inclueded
                       }
                        <Image source={require('../assets/scratch_background.png')} style={styles.background_view} />
                        {!isScratchedGiftImage ? (
                            <View>
                                <ScratchCard
                                    source={require('../assets/scratch_foreground.png')}
                                    brushWidth={50}
                                    onScratch={handleScratch}
                                    style={styles.scratch_card}
                                />
                            </View>
                        ) : (<></>)}


                        {isScratchedGiftImage ? (
                            <View>
                                <Image source={require('../assets/scratch_background.png')} style={styles.scratch_card} />
                            </View>
                        ) : (
                            <View>
                                <ScratchCard
                                    source={require('../assets/scratch_foreground.png')}
                                    brushWidth={50}
                                    onScratch={handleScratch}
                                    style={styles.scratch_card}
                                />
                            </View>

                        )}
                        {// till here   not inclueded
                        }
                    </View>
                </View>
            </Modal> */}
        </View>
    )
}

export default FlatListWithScratchCards

const styles = StyleSheet.create({
    modaloutBoxView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalInnerBoxView: {
        height: width / 2.5,
        width: width / 2.5,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    // background_view: {
    //     height: width / 1.3,
    //     width: width / 1.3,
    //     position: 'absolute',
    //     // width: 400,
    //     // height: 400,
    //     backgroundColor: 'transparent',
    //     alignSelf: 'center',
    //     borderRadius: 16,
    // },
    // scratch_card: {
    //     alignSelf: 'center',
    //     position: 'absolute',
    //     height: width / 1.3,
    //     width: width / 1.3,
    //     backgroundColor: 'transparent',
    // },
    background_view: {
        position: 'absolute',
        width: width / 1.5,
        height: width / 1.5,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderRadius: 16,
    },
    scratch_card: {
        width: width / 1.5,
        height: width / 1.5,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
})