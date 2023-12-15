import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";
import { Image, Text, View } from ".";
import PrimaryButton from "../Project/PrimaryButton";
import { BLACK, PRIMARY_BUTTON, WHITE } from "../../lib/colors";

const screenWidth = Dimensions.get('window').width

const UpdatePopup = () => {
    const [showCross, setShowCross] = useState(true);
    const [appStatus, setAppStatus] = useState('')
    const [gif, setGif]= useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [showDialog, setShowialog] = useState(true)
    
    useEffect(()=>{
         setValues()
    },[])

     // MARK:- Setings  VALUES
    const setValues = ()=>{
        setShowialog(true)
        setTitle('We are better than ever')
        setSubTitle('Click on update Button to update the app')
        setGif('http://www.prabitraithub.com/images/loader3.gif')
    }

    return (
        <Portal>
            <Dialog visible={showDialog} dismissable={false} style={styles.MainContainer} >
                {/* <View style={styles.MainContainer}> */}
                    {
                        showCross ? <Icon name={'squared-cross'} size={30} style={{ position: 'absolute', top: 20, right: 20 }} color={BLACK} onPress={() => { setShowialog(false) }} /> : null
                    }
                    <Image
                        style={styles.imageStyle}
                        //http://www.prabitraithub.com/images/loader3.gif
                        //https://c.tenor.com/U4nQ7SOxY3YAAAAd/space-launch-rocket.gif
                        //https://c.tenor.com/U4nQ7SOxY3YAAAAd/space-launch-rocket.gif
                        //e6e6e6
                        source={{ uri: gif }}
                    />
                    <Text style={styles.Title}>{title}</Text>
                    <Text style={styles.subTitile}>{subTitle}</Text>
                    <PrimaryButton
                        text={'Update'}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => {
                            console.log('press Update')
                        }}
                    ></PrimaryButton>
                {/* </View> */}
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //f3f5f8
        //e6e6e6
        //34BFC1
        backgroundColor: '#fff'
    },
    buttonStyle: {
        width: screenWidth * 0.5,
        height: 42,
    },
    imageStyle: {
        width: screenWidth,
        height: screenWidth,
    },
    Title: {
        fontSize: 16,
        color: BLACK
    },
    subTitile: {
        fontSize: 12,
        color: BLACK

    }
})

export default UpdatePopup;