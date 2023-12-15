/** 
 * Created by Eswar Sairam on 28/09/20
 **/

import React, { useEffect, useState } from 'react';
import { View,StyleSheet, Animated } from 'react-native';
import { Button, Paragraph, Dialog, Portal, ActivityIndicator } from 'react-native-paper';
import { PRIMARY_BUTTON } from '../../lib/colors';
import LottieView from 'lottie-react-native';


const Hud = ({ visible }) => {
    const [showLoader, setShowLoader] = useState(visible)
    const [progress, setProgress] = useState(new Animated.Value(0))
    useEffect(() => {
        setShowLoader(visible)
    }, [visible]);
    const startshowTxet = () => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 1000
        }).start(() => dimiss());
    };
    const dimiss = () => {
        setProgress(new Animated.Value(0))
    }


    return (

        <Portal>
            <Dialog visible={showLoader} dismissable={false} style={styles.dialogLoader}>
                <Dialog.Content >
                <ActivityIndicator size="small" style={styles.lottieStyle} color={PRIMARY_BUTTON}/>
                {/* <LottieView
                             style={styles.lottieStyle}
                             autoPlay={true}
                             loop={true}
                             source={require('../../lib/loader-mrs.json')}
                             onAnimationFinish={() => {
                                 startshowTxet()
                             }}
                         ></LottieView> */}

                </Dialog.Content>
            </Dialog>
        </Portal>



    )
}



const styles = StyleSheet.create({
    dialogLoader: { 
        alignSelf: 'center', 
        width: 50, 
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5 
    },
    lottieStyle: {
        height : 50,
        width : 50,
        justifyContent: "center",
        alignSelf: "center",
    },

})

export default Hud;
