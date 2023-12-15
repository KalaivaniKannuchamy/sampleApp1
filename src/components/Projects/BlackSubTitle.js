import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Text } from '../../components/common';
import { INPUT_TITTLE_COLOR,} from '../../lib/colors';
import { SEMIBOLD, } from '../../lib/FontFamily';
import { DynamicFontSize } from '../../lib/globalFunctions';
const screenWidth = Dimensions.get('screen').width
const BlackSubTitle = (props) => {
    const { text,TextStyle,...rest } = props;

    return (
        <Text fontWeight={SEMIBOLD}  style={[styles.BoldText,TextStyle]} {...rest}>{text}</Text>

    );
};

const styles = StyleSheet.create({
    BoldText:{
        fontSize : DynamicFontSize(14),
        color:INPUT_TITTLE_COLOR,
        letterSpacing:0.4,
        // width:screenWidth*0.6
    }
});

export default BlackSubTitle;
