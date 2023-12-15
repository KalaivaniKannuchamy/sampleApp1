import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { BLACK, COMPLETED_CLR, FLAG_BG, INPUT_BG_COLOR, INPUT_TITTLE_COLOR, PLACEHOLDER, RED } from '../../lib/colors';
import { REGULAR } from '../../lib/FontFamily';
import { View, Text, Image, Input } from '../common';
const screenWidth = Dimensions.get('window').width;

const InputWithSelection = (props) => {
    const { title,
        onFLagSelect,
        flagUrl,
        countryCode,
        containerStyle,
        compulsary,
        ref,
        checkForErrorToShow,
        onChangeText,
        isLastFeild,
        onSubmitEditing,
        type,
        value,
        inputStyle
        //...rest
    } = props;
    const [isError, setIsError] = useState(false)

return (
    <View style={[styles.mainContainer, containerStyle]}>
        <Text fontWeight={REGULAR} style={styles.labelStyle}>{title}<Text style={[styles.labelStyle, { color: RED }]}>{compulsary ? "*" : ''}</Text></Text>
        <View style={styles.innerVw}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => { onFLagSelect? onFLagSelect() : null }}
                style={[styles.flagVwStyle]}
            >
                <Text fontWeight={REGULAR} style={styles.imageStyle}>{countryCode}</Text>
                {/* <Image source={{ uri: flagUrl }} style={styles.imageStyle} /> */}
                <Icon name={'chevron-down'} size={20} color={PLACEHOLDER} />
            </TouchableOpacity>
            <Input
                donotShowTitle
                ref={ref}
                type={type == 'mobile' ? 'mobile' : 'number'}
                isLastFeild={isLastFeild}
                label={title}
                value={value}
                containerStyle={inputStyle}
                checkForErrorToShow={checkForErrorToShow}
                onChangeText={(text) => { onChangeText(text) }}
                onSubmitEditing={() => { onSubmitEditing ? onSubmitEditing() : null }}
                onFocus={(isError) => { setIsError(isError), console.log('he', isError) }}
                
            // {...rest}
            />
        </View>

    </View>
)
}
const styles = StyleSheet.create({
    mainContainer: {

        // flex: 1,
    },
    labelStyle: {
        marginVertical:5,
        color: INPUT_TITTLE_COLOR,
        fontSize: 14,
    },
    inputStyle: {
        borderRadius: 5,
        height: 45,
        borderWidth: 1,
        flex: 1,
    },
    errorMsg: {
        color: RED,
        fontSize: 12,
        marginTop: 5,
        paddingLeft: 10
    },
    placHolderTxt: {
        color: PLACEHOLDER,
        width: screenWidth * 0.75
    },
    valueTxt: {
        color: BLACK,
        width: screenWidth * 0.75
    },
    innerVw: {
        flexDirection: 'row',
        marginTop : 5
       // alignItems: 'center',
    },
    imageStyle: {
       // height: 30,
        width: 40,
        marginRight: 10
    },
    flagVwStyle: {
        backgroundColor: INPUT_BG_COLOR,
        flexDirection: 'row',
        height: 45,
        borderRadius: 5,
        marginRight: 10,
        paddingHorizontal: 15,
        //justifyContent : 'center',
        alignItems: 'center'
    }
})
export default InputWithSelection;