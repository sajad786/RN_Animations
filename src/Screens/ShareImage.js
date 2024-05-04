import React from 'react';
import { Button, StyleSheet , View} from 'react-native';
import Share from 'react-native-share';
import SendIntentAndroid from 'react-native-send-intent';
import RNFetchBlob from 'rn-fetch-blob'

const ShareImage = () => {

    // const sendWhatsAppMessageWithImage = async () => {
    //     const phoneNumber = '+123456789'; // Replace with the recipient's phone number
    //     const message = 'Check out this image!'; // Replace with your message
    //     const imageUrl = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'; // Replace with the URL of your image

    //     try {
    //         await Share.open({
    //             url: imageUrl,
    //         });

    //         // SendIntentAndroid.sendText({
    //         //     title: 'Send message via',
    //         //     text: message,
    //         //     type: SendIntentAndroid.TEXT_PLAIN,
    //         //     phoneNumber: phoneNumber,
    //         // });
    //     } catch (error) {
    //         console.error('Error sending WhatsApp message:', error);
    //     }
    // };

    const getBase64Data = () => {
        RNFetchBlob.fetch('GET', `https://example.com/example.png`)
        .then(resp => {
          console.log('response : ', resp);
          console.log(resp.data);
          let base64image = resp.data;
          return ('data:image/png;base64,' + base64image)
        //   share('data:image/png;base64,' + base64image);
        })
        .catch(err => errorHandler(err));
    }

    const shareImage= () => {
        let base64image = getBase64Data()
        let shareOptions = {
            title: 'Title',
            url: base64image,
            message: 'https://somelink.com some message',
            subject: 'Subject'
          };
          console.log('base64image : ', base64image);
          
          Share.open(shareOptions)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              err && console.log(err);
            });
    };
    
    return (
        <View>

            <Button
                title="Send WhatsApp Message with Image"
                onPress={shareImage}
            />

        </View>
    )
}

export default ShareImage

const styles = StyleSheet.create({})