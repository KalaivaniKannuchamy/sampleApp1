import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {  Text } from '../../components/common';
import { GREY_TEXT_COLOR, } from '../../lib/colors';
import { MEDIUM, } from '../../lib/FontFamily';
const screenWidth = Dimensions.get('screen').width
const GreySmallTitle = (props) => {
    const { text,TextStyle,...rest } = props;

    return (
        <Text fontWeight={MEDIUM}  style={[styles.BoldText,TextStyle]} {...rest}>{text}</Text>

    );
};

const styles = StyleSheet.create({
    BoldText:{
        fontSize : 12,
        color:GREY_TEXT_COLOR,
        letterSpacing:0.4,
        // width:screenWidth*0.6
    }
});

export default GreySmallTitle;
