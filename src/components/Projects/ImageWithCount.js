import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BLACK, IN_VOICE, LIGHT_GREEN, WHITE, PRIMARY_BUTTON, ALERT_BUTTON_COLOR, GREEN, LIGHT_ORANGE, LIGHT_BLUE, RED, RESPONDED, PLACEHOLDER, LIGHT_RED, LIGHT_PURPLE, COMPLETED_CLR, PRIMARY } from '../../lib/colors';
import { BOLD, REGULAR } from '../../lib/FontFamily';
import Images from '../../lib/Images';
import { View, Image, Text } from '../common'
import GreyHeaderText from './GreyHeaderText';
import GreySmallTitle from './GreySmallTitle';
import SurfaceComponent from './SurfaceComponent';


const ImageWithCount = ({ fromPurchase, fromDelivery, text, images, number, onPress, selection, index, payment, item }) => {
    return (

        <SurfaceComponent style={[styles.countView,
        payment ?

            {
                backgroundColor:
                    index == 0 && item.toggle == true ? LIGHT_ORANGE
                        :
                        index == 1 && item.toggle == true ? LIGHT_BLUE
                            :
                            index == 2 && item.toggle == true ? LIGHT_GREEN :
                                index == 3 && item.toggle == true ? LIGHT_RED :
                                    WHITE
            }
            :
            fromPurchase ?
                {
                    backgroundColor:
                        index == 0 && item.toggle == true ? LIGHT_BLUE
                            :
                            index == 1 && item.toggle == true ? LIGHT_PURPLE
                                :
                                index == 2 && item.toggle == true ? LIGHT_ORANGE :
                                    index == 3 && item.toggle == true ? LIGHT_GREEN :
                                        index == 4 && item.toggle == true ? LIGHT_RED :
                                            WHITE
                }
                :
                fromDelivery ?
                    {
                        backgroundColor:
                            index == 0 && item.toggle == true ? LIGHT_BLUE
                                :
                                index == 1 && item.toggle == true ? LIGHT_GREEN
                                    :
                                    WHITE
                    }
                    :
                    {
                        backgroundColor:
                            index == 0 && item.toggle == true ? LIGHT_BLUE
                                :
                                index == 1 && item.toggle == true ? LIGHT_RED
                                    :
                                    index == 2 && item.toggle == true ? LIGHT_PURPLE :
                                        index == 3 && item.toggle == true ? LIGHT_GREEN :
                                            index == 4 && item.toggle == true ? LIGHT_ORANGE :
                                                WHITE
                    }
        ]}
        >
            <TouchableOpacity style={styles.countView} onPress={onPress}>

                <Image
                    source={images}
                />
                <GreySmallTitle
                    text={text}
                    TextStyle={{ fontSize: 10}}
                    numberOfLines={2}
                />
                <GreyHeaderText
                    text={number}
                    TextStyle={[
                        {
                            color:
                                fromPurchase ?
                                    index == 0 ?
                                        ALERT_BUTTON_COLOR
                                        : index == 1 ?
                                            RESPONDED
                                            : index == 2 ?
                                                COMPLETED_CLR
                                                : index == 3 ?
                                                    GREEN
                                                    : index == 4 ?
                                                        RED
                                                        : BLACK
                                    :
                                    fromDelivery ?
                                        (
                                            index == 0 ? PRIMARY
                                                :
                                                index == 1 ? GREEN
                                                    :
                                                    BLACK)

                                        :
                                        text == "Negotiate" || text == "Pending" ? IN_VOICE
                                            :
                                            text == "Queried" || text == "Cancelled" ? RED
                                                :
                                                text == "Responded" ?
                                                    RESPONDED
                                                    :
                                                    text == "New Request" || text == "Approved" ?
                                                        ALERT_BUTTON_COLOR
                                                        :
                                                        GREEN
                        }
                    ]}
                />

            </TouchableOpacity>
        </SurfaceComponent>


    )
}


const styles = StyleSheet.create({
    countView: {
        // borderWidth: 0.2,
        // borderColor: PLACEHOLDER,
        // alignSelf: 'center',
        marginTop: 5,
        height: 80,
        width: 95,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    splashText: {
        fontSize: 22,
        letterSpacing: 1,
        marginTop: 5,
        color: PRIMARY_BUTTON
    },
})


export default ImageWithCount;