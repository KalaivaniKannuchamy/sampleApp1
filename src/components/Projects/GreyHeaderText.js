import React from 'react';
import {  StyleSheet } from 'react-native';
import {  Text } from '../../components/common';
import { GREY_TEXT_COLOR, } from '../../lib/colors';
import {  BOLD, MEDIUM } from '../../lib/FontFamily';

const GreyHeaderText = (props) => {
    const {numberOfLines, text,TextStyle,...rest } = props;

    return (
        <Text fontWeight={MEDIUM}  numberOfLines={numberOfLines ? numberOfLines : 1} style={[styles.BoldText,TextStyle]} {...rest}>{text}</Text>

    );
};

const styles = StyleSheet.create({
    BoldText:{
        fontSize : 15,
        color:GREY_TEXT_COLOR,
        letterSpacing:0.7

    }
});

export default GreyHeaderText;
