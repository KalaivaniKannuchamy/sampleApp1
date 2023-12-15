import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BLACK, INPUT_BG_COLOR, INPUT_TITTLE_COLOR, PLACEHOLDER, RED } from '../../lib/colors';
import { REGULAR } from '../../lib/FontFamily';
import { View, Text } from '../common';
const screenWidth = Dimensions.get('window').width;

const PopUpInput = ({ width, title, placeholder, value, onSelect, containerStyle, errorMsg, labelStyle, compulsary, textStyle,textTransform, fontSize,removeDataSpace,inputStyle }) => {

    return (
        <View style={[
            styles.mainContainer,
            { width: width ? width : '100%' },
            containerStyle]}>
            <Text fontWeight={REGULAR} style={[styles.labelStyle, labelStyle]}>{title}<Text style={[styles.labelStyle, labelStyle, { color: RED }]}>{compulsary ? "*" : ''}</Text></Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => { onSelect() }} style={[styles.inputStyle,inputStyle]}>
                <Text
                    style={[
                        textStyle,
                        value == '' ? styles.placHolderTxt : styles.valueTxt,
                        { width: width ? width * 0.7 : '75%' },
                        { fontSize: fontSize ? fontSize : 16, },
                        { textTransform: textTransform ? "capitalize" : 'none' }
                    ]} >
                    {value == '' ?
                        placeholder ? placeholder : `Select ${title}`
                        : `${value}`
                    }</Text>
                <Icon name={'chevron-down'} size={20} color={PLACEHOLDER} />
            </TouchableOpacity>
            {
                errorMsg == "" ?
                removeDataSpace?
                <View style={{height:10}}/>:
                    <Text> </Text>
                    :
                    <Text
                        fontWeight={REGULAR}
                        dynamicLines={true}
                        style={[styles.errorMsg, { width: width ? width : '100%' }]}>{errorMsg}</Text>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        //marginTop:5
        //backgroundColor : 'green'
        // flex: 1,
    },
    labelStyle: {
        marginBottom: 10,
        color: INPUT_TITTLE_COLOR,
        fontSize: 15,
    },
    inputStyle: {
        borderRadius: 5,
        height: 46,
        flexDirection: 'row',
        borderWidth: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: INPUT_BG_COLOR,
        backgroundColor: INPUT_BG_COLOR,

    },
    errorMsg: {
        color: RED,
        fontSize: 12,
        marginTop: 5,
        paddingLeft: 10
    },
    placHolderTxt: {
        color: PLACEHOLDER,
        //width: '75%'
    },
    valueTxt: {
        color: BLACK,
        //  width: '75%'
    }
})
export default PopUpInput;