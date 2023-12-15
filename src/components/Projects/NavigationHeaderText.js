import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Text } from '../common';
import { INPUT_TITTLE_COLOR, } from '../../lib/colors';
import { SEMIBOLD, } from '../../lib/FontFamily';

const NavigationHeaderText = (props) => {
    const { text, TextStyle, ...rest } = props;

    return (
        <Text fontWeight={SEMIBOLD} style={[styles.BoldText, TextStyle]} {...rest}>{text}</Text>

    );
};

const styles = StyleSheet.create({
    BoldText: {
        fontSize: 15,
        color: INPUT_TITTLE_COLOR,
        letterSpacing: 0.4,
        // width : '75%',
        textAlign: 'center',
        //flex: 1
    }
});

export default NavigationHeaderText;
