import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, TextInput, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BLACK, INPUT_BG_COLOR, PLACEHOLDER, RED, WHITE } from '../../lib/colors';
import { REGULAR, BOLD } from '../../lib/FontFamily';
import { View, Text, Input, Alert } from '../common';
import { Button, Paragraph, Dialog, Portal, Divider, Chip } from 'react-native-paper';
import PrimaryButton from './PrimaryButton';
import PopUpInput from './PopUpInput';
import InputWithSelection from './InputWithSelection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ChooseComponent from './ChooseComponent';
import CustomSingleSelectionPicker from './CustomSingleSelectionPicker';
import CustomAlert from './CustomAlert';
import { DynamicFontSize } from '../../lib/globalFunctions';
const screenWidth = Dimensions.get('window').width;

const AddPaymentTermPopup = ({ visible, predefinedData, onDoneButtonPress, onCrossPress, allData }) => {

    const [showLoader, setShowLoader] = useState(visible)
    const [creditDays, setCreditDays] = useState('')
    const [amount, setAmount] = useState("")
    const [percentage, setPercentage] = useState('')
    const [showReasonDialog, setShowReasonDialog] = useState(false)
    const [popupApiName, setPopupApiName] = useState('');
    const [popupApiInputParams, setPopupApiInputParams] = useState('');
    const [popupDisplayKey, setPopupDisplayKey] = useState('');
    const [popupDisplayValue, setPopupDisplayValue] = useState('');
    const [popupAlertText, setPopupAlertText] = useState('');
    const [popupDisplayTitle, setPopupDisplayTitle] = useState('');
    const [popupErrorMsg, setPopupErrorMsg] = useState('');
    const [showAlert, setShowAlert] = useState(false)
    const [popUpSelectedType, setPopUpSelectedType] = useState('')
    const [compulsaryStatus, setCompulsaryStatus] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    console.log("popUpSelectedType", popUpSelectedType);


    const custom_alert = useRef()
    const cleanAlertData = () => {
        setShowAlert(false)
    }
    const refs = {}

    useEffect(() => {
        setAmount('')
        setCreditDays('')
        setPercentage('')
        setPopUpSelectedType('')
        setShowLoader(visible)

    }, [visible]);

    const onAddPress = () => {
        onDoneButtonPress(

            {
                "amount": amount,
                "credit_days": creditDays,
                "due_date_based_on": popUpSelectedType.id,
                "due_date_based_on_name": popUpSelectedType.label,
                "invoice_portion": percentage,
                "note": "--",
                "payment_term_added_date": "--",
                "voucher_payment_term_id": "1147"
            },
        )
    }

    const verifyCredentials = () => {
        var isValid = true;
        if (popUpSelectedType == '') {
            isValid = false
            setErrorMsg("Please Select Payment Type")
        }


        return isValid;
    }



    return (
        <Portal>
            <Dialog visible={showLoader} dismissable={false} style={styles.dialogStyle}>
                <View style={styles.headerStyle}>
                    <Text fontWeight={BOLD} style={styles.textStyle}>Add Payment Term</Text>
                    <Icon size={20} name={"ios-close-sharp"} color={PLACEHOLDER} onPress={onCrossPress} />
                </View>
                <Divider style={styles.dividerStyle} />

                <KeyboardAwareScrollView style={{ paddingHorizontal: 15 }} showsVerticalScrollIndicator={false} >
                    <PopUpInput
                        title={'Type'}
                        value={popUpSelectedType == '' ? '' : popUpSelectedType.label}
                        compulsary={true}
                        onSelect={() => {
                            setPopupApiName('')
                            setPopupApiInputParams({
                                "method": "get_master_enum_data",
                                "enum_code": "GEN_2102_1019"
                            })
                            setPopupDisplayValue('label')
                            setPopupDisplayKey('id')
                            setPopupAlertText('Type')
                            setPopupDisplayTitle('Select Type')
                            setPopupErrorMsg('Type')
                            setShowReasonDialog(!showReasonDialog)
                        }}
                        errorMsg={popUpSelectedType == '' ? errorMsg :''}
                        textStyle={styles.titleStyle}
                    />
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

                        <Input
                            ref={(ref) => {
                                refs['creditDays'] = ref;
                            }}
                            label={'CreditDays'}
                            compulsary={compulsaryStatus ? true : false}
                            checkForErrorToShow={compulsaryStatus ? true : false}
                            containerStyle={{ width: screenWidth * 0.42 }}
                            isLastFeild={false}
                            type={'number'}
                            value={creditDays}
                            onChangeText={(text) => { setCreditDays(text) }}
                        />
                        <Input
                            ref={(ref) => {
                                refs['percentage'] = ref;
                            }}
                            label={'Percentage(%)'}
                            compulsary={false}
                            type={'number'}
                            checkForErrorToShow={false}
                            containerStyle={{ width: screenWidth * 0.42 }}
                            isLastFeild={false}
                            value={percentage}
                            onChangeText={(text) => { setPercentage(text) }}
                        />
                    </View>
                    <Input
                        ref={(ref) => {
                            refs['amount'] = ref;
                        }}
                        label={'Amount'}
                        compulsary={false}
                        checkForErrorToShow={false}
                        isLastFeild={false}
                        type={'number'}
                        value={amount}
                        onChangeText={(text) => { setAmount(text) }}
                    />
                </KeyboardAwareScrollView>


                <Dialog.Actions style={styles.buttonContainer}>
                    <PrimaryButton
                        text={"Add"}
                        buttonStyle={[styles.buttonStyle]}
                        onPress={() => {
                            if (verifyCredentials()) {
                                onAddPress()

                            }

                        }} />
                </Dialog.Actions>
            </Dialog>
            {
                showReasonDialog ?
                    <CustomSingleSelectionPicker
                        apiName={popupApiName}
                        apiInputParams={popupApiInputParams}
                        selectedValue={popUpSelectedType}
                        titleText={popupDisplayTitle}
                        displayText={popupDisplayValue}
                        keyId={popupDisplayKey}
                        errorMsg={popupErrorMsg}
                        alertText={popupAlertText}
                        searchplaceholder={"search"}
                        onCancelClick={() => {
                            setShowReasonDialog(!showReasonDialog)
                        }}
                        onOkClick={(selectedData) => {

                            setPopUpSelectedType(selectedData)
                            setShowReasonDialog(!showReasonDialog)
                        }}
                    /> : null
            }
            <CustomAlert
                ref={custom_alert}
                show={showAlert}
                okPress={() => {
                    cleanAlertData();
                }}
                cancelPress={() => {
                    cleanAlertData();
                }}
            />
        </Portal>
    )
}
const styles = StyleSheet.create({
    dialogStyle: {
        alignSelf: 'center',
        width: screenWidth - 20,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: WHITE,
        height: '75%'
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    dividerStyle: {
        backgroundColor: PLACEHOLDER,
        marginBottom: 10
    },
    titleStyle: {
        width: screenWidth * 0.2
    },
    buttonStyle: {
        borderRadius: 5,
        width: screenWidth * 0.22,
        marginVertical: 15
    },
    textStyle: {
        fontSize: DynamicFontSize(20)
    },
    buttonContainer: {
        alignSelf: 'flex-end'
    },
    errorMsg: {
        fontSize: DynamicFontSize(12),
        color: RED
    }

})
export default AddPaymentTermPopup;
