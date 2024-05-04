import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateScaleVertical } from '../styles/responsiveSize';
import Modal from "react-native-modal";

const CustomModal = ({
    isModalVisible = false,
  onBackdropPress = () => {},
  mainContainView,
  _onLangSelect = () => {},
  isLangSelected = false,
  allLangs = [],
  _updateLang = () => {},
  mainContainerStyle,
  innerViewContainerStyle,
}) => {
  return (
    <Modal
    isVisible={isModalVisible}
    style={{
      justifyContent: 'flex-end',
      margin: 0,
    }}
    onBackdropPress={onBackdropPress}>
    <View>

      <View
        style={{
          ...styles.mainContainer,
          backgroundColor: 'white',
          ...mainContainerStyle,
        }}>
        <View
          style={{
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScaleVertical(15),
            ...innerViewContainerStyle,
          }}>
          {mainContainView()}
        </View>
      </View>
    </View>
  </Modal>
  )
}


export default CustomModal

const styles = StyleSheet.create({
    mainContainer: {
        borderTopLeftRadius: moderateScaleVertical(15),
        borderTopRightRadius: moderateScale(15),
        // maxHeight: height - width / 2,
        // minHeight: height / 2.1,
        paddingHorizontal: moderateScale(10),
      },
      changeLangTxt: {
        // ...commonStyles.futuraBtHeavyFont18,
      },
      preferLangTxt: {
        // ...commonStyles.mediumFont12,
        marginTop: moderateScaleVertical(10),
      },
      placeOrderButtonStyle: {
        backgroundColor: 'green',
        marginHorizontal: moderateScale(5),
        borderRadius: moderateScale(25),
        marginTop: 'auto',
        marginBottom: moderateScaleVertical(15),
      },
})