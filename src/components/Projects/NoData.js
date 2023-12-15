import React from 'react';
import { Dimensions, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { Button, Text, View, Image } from '../../components/common';
import { PRIMARY_BUTTON, WHITE, PLACEHOLDER } from '../../lib/colors';
import { MEDIUM, SEMIBOLD, BOLD, REGULAR } from '../../lib/FontFamily';
import Images from '../../lib/Images';
import AppStrings from '../../lib/AppStrings';
const screenWidth = Math.round(Dimensions.get('window').width);

const NoData = (props) => {
    const { text, source, style } = props;
    const height = useWindowDimensions().height
    return (
        <View style={[styles.noDatavw,{marginTop : height*0.25},style ]}>
            <Image
                resizeMode={'contain'}
                source={source ? source : Images.vector}
            />
            <Text style={styles.textStyle}>{AppStrings.noDataComponent}</Text>
            {source ?
                <Text numberoflines={2} style={styles.subTextStyle}> {text}</Text>
                :
                text ?
                    <Text numberoflines={2} style={styles.subTextStyle}>{AppStrings.subText} {text}</Text>
                    : null

            }

        </View>

    );
};

const styles = StyleSheet.create({
    noDatavw: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textStyle: {
        fontSize: 14,
        color: PLACEHOLDER,
        marginTop: 15
    },
    subTextStyle: {
        fontSize: 12,
        color: PLACEHOLDER,
        marginVertical: 10,
        width: '80%',
        textAlign: 'center'
    }
});

export default NoData;
