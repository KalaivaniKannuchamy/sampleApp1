import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { GREY_LIGHT_ORANGE,GREY_TEXT_COLOR, ORANGE } from '../../lib/colors'
import { View, Text } from '../common';
import { BOLD } from '../../lib/FontFamily';

const DaysComponent = ({ noOfDays }) => {


    return (
        <View style={styles.container}>
            <Text style={styles.daysStyle}>Days</Text>
            <Text fontWeight={BOLD} style={styles.noStyle}>{noOfDays}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: GREY_LIGHT_ORANGE,
        borderRadius:5,
        alignItems:'center',
        padding:8,
        marginTop:18,
    },
    daysStyle:{
        fontSize:12,
        color:GREY_TEXT_COLOR
    },
    noStyle:{
        fontSize:16,
        color:ORANGE
    }
})

export default DaysComponent;