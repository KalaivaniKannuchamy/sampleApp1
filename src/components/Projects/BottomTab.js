import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';
import { APP_WHITE, BLACK, GREEN, INPUT_BG_COLOR, INPUT_TITTLE_COLOR, PLACEHOLDER, PRIMARY_BUTTON, WHITE } from '../../lib/colors'
import { BOLD } from '../../lib/FontFamily';
import Images from '../../lib/Images'
import { View, Text, Image } from '../common'
import AppIconButton from './AppIconButton'
import GreySmallTitle from './GreySmallTitle'
import SurfaceComponent from './SurfaceComponent'
import PrimaryButton from './PrimaryButton';
import { isTablet } from 'react-native-device-info';
import { DynamicFontSize } from '../../lib/globalFunctions';
const ScreenWidth = Dimensions.get('screen').width

const BottomTab = ({ buttonTitle, queryPress, onButtonPress, buttonShow, responsePress, Day, ProgressValue, purchaseScreen, SecoundTitle, firstTitle, secoundSource, firstSource }) => {

    return (
        <SurfaceComponent style={purchaseScreen ? styles.purchaseContainer : styles.container}>

            <TouchableOpacity onPress={()=>{queryPress()}}
                style={{ alignItems: 'center' }}
            >

                <Image
                    //source={Images.Queried}
                    source={firstSource}
                    style={styles.bottomImage}
                    resizeMode="contain"
                />

                <GreySmallTitle
                    text={firstTitle}
                    TextStyle={[
                        styles.textStyle,
                        {
                            fontSize: DynamicFontSize(12),
                            color: 'grey'
                        }
                    ]} />
            </TouchableOpacity>
            {
                purchaseScreen ?
                    buttonShow && (buttonShow == "GEN_2105_1033_100002" || buttonShow == "GEN_2105_1033_100008") ?
                        null
                        :
                        <PrimaryButton
                            buttonStyle={{ width: '50%', bottom: 15 }}
                            text={buttonTitle}
                            onPress={onButtonPress}

                        />
                    :
                    <View style={styles.circulerVw}>
                        <Progress.Circle
                            size={isTablet() ? 90:70}
                            style={[isTablet() ? styles.prgressTablet:styles.prgress]}
                            progress={ProgressValue ? ProgressValue : 0}
                            borderWidth={0.08}
                            borderColor={INPUT_TITTLE_COLOR}
                            unfilledColor={APP_WHITE}
                            color={PRIMARY_BUTTON}
                            thickness={10}
                            indeterminate={false}

                        >
                        </Progress.Circle>
                        <View style={styles.circulerTxtVw}>
                            <Text fontWeight={BOLD} style={styles.dayCount}>{Day}</Text>
                            <GreySmallTitle
                                TextStyle={styles.days}
                                text={'Days'}
                            />
                        </View>

                    </View>
            }

            <TouchableOpacity onPress={()=>{responsePress()}} style={{ alignItems: 'center' }}>

                <Image
                    source={secoundSource}
                    //source={Images.Responded}
                    style={styles.bottomImage}
                    resizeMode="contain"
                />

                <GreySmallTitle
                    text={SecoundTitle}
                    TextStyle={[styles.textStyle, {
                        fontSize: DynamicFontSize(12),
                        color: 'grey'
                    }]} />
            </TouchableOpacity>

        </SurfaceComponent>
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: APP_WHITE,
        margin: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position:'absolute',
        bottom:0

    },
    purchaseContainer: {
        borderWidth: 1,
        borderColor: APP_WHITE,
        margin: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position:'absolute',
        bottom:0

    },
    bottomImage: {
        width: 30,
        height: 30
    },
    textStyle: {
        fontSize: DynamicFontSize(12)
    },
    greenDot: {
        position: 'absolute',
        height: 10,
        width: 10,
        right: -5,
        top: -5
    },
    circulerVw: {
        marginTop: isTablet() ? -50 : -40,
    },
    dayCount: {
        fontSize: DynamicFontSize(20),
    },
    circulerTxtVw: {
        position: 'absolute',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height:isTablet() ? 85: 70,
        width: 70,
        borderRadius: 35,
        borderColor: PLACEHOLDER,
        borderWidth: 0.1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    prgress: {
        backgroundColor: WHITE,
        borderRadius: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    prgressTablet: {
        backgroundColor: WHITE,
        borderRadius: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    days: {
        marginTop: -3
    }

})

export default BottomTab;