import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { BLACK, COMPLETED_CLR, FLAG_BG, INPUT_BG_COLOR, INPUT_TITTLE_COLOR, PLACEHOLDER, RED } from '../../lib/colors';
import { REGULAR } from '../../lib/FontFamily';
import { View, Text, Image, Input } from '../common';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import { DynamicFontSize } from '../../lib/globalFunctions';
const screenWidth = Dimensions.get('window').width;

const PhoneSelection = (props) => {
    const { title,
        onChangeCountry,
        flagUrl,
        countryCode,
        containerStyle,
        compulsary,
        checkForErrorToShow,
        onChangeText,
        isLastFeild,
        placeholder,
        type,
        width,
        errorMsg,
        value,
        outerErrorCheck,
        ref,
        ...rest
    } = props;

    const phoneInputRef = useRef()
    const countryPicker = useRef()
    const defaultErrorMsg = "Please enter correct number"
    const [isError, setIsError] = useState(false)
    const [visible, setVisible] = useState(false)
    const [country, setCountry] = useState('NG')
    const [errorMessage, setErrorMessage] = useState(errorMsg ? errorMsg : defaultErrorMsg)

    useEffect(() => {
        phoneInputRef.current?.setValue(value)
        // console.log('start---.', phoneInputRef.current?.getFlag())
        console.log('start---12.', phoneInputRef.current?.getISOCode())
    }, [value])

    const checkError = () => {
        if (phoneInputRef.current?.isValidNumber(text.replace(/[- #*;.,<>\{\}\[\]\\\/]/gi, ''))) {
            setIsError(false)
            console.log('if---')
            return false
        } else {
            console.log('ifelse---')
            setIsError(true)
            return true

        }

    }
    return (
        <View style={[styles.mainContainer, containerStyle]}>
            <Text fontWeight={REGULAR} style={styles.labelStyle}>{title}<Text style={[styles.labelStyle, { color: RED }]}>{compulsary ? "*" : ''}</Text></Text>
            <View style={styles.innerVw}>
                <PhoneInput
                    ref={phoneInputRef}
                    //onPressFlag={()=>{}}
                    initialCountry={country && country.toLowerCase()}
                    style={styles.containerStyle}
                    flagStyle={styles.flagStyle}
                    textStyle={styles.textCOnatiner}
                    initialValue={value}
                    onPressFlag={() => {
                        setVisible(true),
                            countryPicker.current?.onOpen()
                    }}
                    textProps={{
                        placeholder: placeholder,
                        returnKeyType: isLastFeild ? 'done' : 'next',
                    }}
                    onChangePhoneNumber={(text) => {
                        onChangeText(
                            text,
                            phoneInputRef.current?.isValidNumber(text.replace(/[- #*;.,<>\{\}\[\]\\\/]/gi, ''))
                        )
                        if (checkForErrorToShow) {
                            phoneInputRef.current?.isValidNumber(text.replace(/[- #*;.,<>\{\}\[\]\\\/]/gi, ''))
                                ? setIsError(false)
                                : setIsError(true)
                        }
                             console.log('iso2--->',text,  phoneInputRef.current?.isValidNumber(text.replace(/[- #*;.,<>\{\}\[\]\\\/]/gi, '')))
                    }}
                />
                {/* <PhoneInput
                    ref={phoneInputRef}
                    value={value}
                   // defaultCode="NG"
                    layout="first"
                    onChangeText={(text) => {
                        // console.log('helllO--->',phoneInputRef.current?.isValidNumber(text))
                        onChangeText(
                            text,
                            phoneInputRef.current?.isValidNumber(text.replace(/[- #*;.,<>\{\}\[\]\\\/]/gi, ''))
                        )
                        if (checkForErrorToShow) {
                            phoneInputRef.current?.isValidNumber(text.replace(/[- #*;.,<>\{\}\[\]\\\/]/gi, ''))
                                ? setIsError(false)
                                : setIsError(true)
                        }
                    }}
                    textInputProps={{
                        returnKeyType: isLastFeild ? 'done' : 'next',
                    }}
                    onChangeCountry={(text) => {
                        console.log('chanidjenh===>', value)
                        onChangeCountry ? onChangeCountry(text, phoneInputRef.current?.isValidNumber(value)) : null
                    }}
                    onChangeFormattedText={(text) => {

                        //  onChangeText ? (text) : null
                        // if(checkForErrorToShow){
                        //     phoneInputRef.current?.isValidNumber()
                        // }
                    }}

                    containerStyle={styles.containerStyle}
                    textContainerStyle={styles.textCOnatiner}
                    withShadow={false}
                /> */}
            </View>
            {
                isError || outerErrorCheck ?
                    <Text
                        fontWeight={REGULAR}
                        dynamicLines={true}
                        style={[styles.errorMsg, { width: width ? width : '100%' }]}>{errorMessage}</Text>
                    :
                    null


            }
            {
                visible ?
                    <CountryPicker
                        visible={visible}
                        ref={countryPicker}
                        flatListProps={{
                            initialNumToRender: 35
                        }}
                        preferredCountries={'NG'}
                        withFilter
                        onSelect={(values) => {
                            setVisible(false)
                            phoneInputRef.current?.selectCountry(values.cca2.toLowerCase())
                            setCountry(values.cca2)
                            console.log('value--<', values)
                        }}
                        translation='eng'
                        onClose={() => {
                            setVisible(false)
                        }}
                    //  containerButtonStyle={{ height: 200 }}
                    //cca2={'NG'}
                    ></CountryPicker>
                    :
                    null
            }


        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {

        // flex: 1,
    },
    labelStyle: {
        marginVertical: 5,
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
        marginTop: 5
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
    },
    containerStyle: {
        width: "100%",
        paddingVertical: 0,
        borderRadius: 5,
        height: 48,
        paddingHorizontal: 10,
        backgroundColor: INPUT_BG_COLOR
    },
    textCOnatiner: {
        // paddingVertical: 0,
        // borderTopRightRadius: 5,
        // borderBottomRightRadius: 5,
        // backgroundColor: INPUT_BG_COLOR,
        color: BLACK,
        fontSize: DynamicFontSize(16)
    },
    flagStyle: {
        // backgroundColor  :'red',
        // padding : 10
    }
})
export default PhoneSelection;


