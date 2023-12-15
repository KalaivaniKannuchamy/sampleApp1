import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View } from '../../components/common';
import { GREY_TEXT_COLOR, } from '../../lib/colors';
import BlackSubTitle from './BlackSubTitle';
import GreySmallTitle from './GreySmallTitle';

const TitleWithValue = (props) => {
    const {containerStyle,HeaderTitle,subHeaderTitle, subtextStyle,titleStyle,numberOfLines} = props;

    return (
        <View style={containerStyle}>
            <GreySmallTitle
            TextStyle={titleStyle}
                text={HeaderTitle}
                numberOfLines={1}
            />
            <BlackSubTitle
                text={subHeaderTitle}
                   TextStyle={[styles.textStyle, subtextStyle]}
                numberOfLines={numberOfLines?numberOfLines:2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle:{
        alignItems:'center',
        marginTop:3
    }
});

export default TitleWithValue;
