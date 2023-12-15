import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {  Text, View } from '../../components/common';
import { GREY_TEXT_COLOR, INPUT_TITTLE_COLOR, WHITE, } from '../../lib/colors';
import { MEDIUM, REGULAR, } from '../../lib/FontFamily';

const GreyBackgroundComponent = (props) => {
    const { text,TextStyle,...rest } = props;

    return (
        <View style={styles.container}>
        <Text fontWeight={REGULAR}  style={[styles.BoldText,TextStyle]} {...rest}>MATERIALS / SERVICE RQUEST</Text>

        </View>

    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:GREY_TEXT_COLOR
    },
    BoldText:{
        fontSize : 13,
        color:WHITE,
        letterSpacing:0.4,
        paddingHorizontal:10,
        paddingVertical:8

    }
});

export default GreyBackgroundComponent;
