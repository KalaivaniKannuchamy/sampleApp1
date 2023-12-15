import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Flatlist, Image, Text, View, Alert, WSCall, Hud } from '../../components/common';
import { Modal, Portal } from 'react-native-paper';
import strings from '../../lib/AppStrings';
import { BACK_GROUND, GREEN, INPUT_BG_COLOR, INPUT_TITTLE_COLOR, ORANGE, PLACEHOLDER, PRIMARY, PRIMARY_BUTTON, RED, WHITE } from '../../lib/colors';
import { MEDIUM, REGULAR, SEMIBOLD } from '../../lib/FontFamily';
import Images from '../../lib/Images';
import ImageButton from '../../components/common/ImageButton';
const { width, HEIGHT } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from './PrimaryButton';
import AppIconButton from './AppIconButton';
import CustomAlert from './CustomAlert';
import { DynamicFontSize } from '../../lib/globalFunctions';
import { isTablet } from 'react-native-device-info';

const CustomMuiltiSelection = (props) => {
    const { onCancelClick,
        dialogData,
        displayText,
        errorMsg,
        keyId,
        onOkClick,
        alertText,
        titleText,
        searchplaceholder,
        showDisplayText2,
        displayText2,
        selectedValue,
        apiName,
        apiInputParams
    } = props;
    // const Data = originallistData.forEach((elem) => {
    //     elem.toggle = false
    //     if (selectedValue != null) {
    //         var id = selectedValue[keyId]
    //         // console.log('keyId',id)

    //         if (elem[keyId] === id) {
    //             elem.toggle = true
    //         }
    //     }

    // })
    const [listData, setListData] = useState([]);
    const [selectedDataItem, setSelectedDataItem] = useState(selectedValue);
    const [selectedItem, setSelectedItem] = useState({});
    const [originallistData, setOrdinalListData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showLoader, setShowLoader] = useState(true);
    const [showAlert, setShowAlert] = useState(false)
    const custom_alert = useRef()
    // console.log("selectedValue=====>",selectedValue);


    useEffect(() => {

        callPopupDataApi()
    }, [])

    const callPopupDataApi = () => {
        var inputParams = apiInputParams;

        WSCall.getResponse(
            "",
            inputParams,
            'get',
            (response, error) => {
                if (response != null && response.settings) {
                    if (response.settings.success == 1) {
                        setShowLoader(false);
                        if (response.data.length == undefined) {
                            handlePreSelection(response.data.child_data)

                        } else {
                            handlePreSelection(response.data)
                        }
                        console.log("response", response.data);

                    } else if (response.settings.success == '0') {
                        setOrdinalListData([])
                        setListData([])
                        Alert.simpLeAlert('', response.settings.message)
                        setShowLoader(false);
                    } else {
                        setShowLoader(false);
                    }
                }
            },
        );
    };

    const handlePreSelection = (data) => {

        if (selectedValue != '') {

            // data.forEach((elem) => {
            //     if (elem[`${keyId}`] === selectedValue[`${keyId}`]) {
            //         elem.toggle = (elem.toggle === undefined ? true : !elem.toggle)
            //        // setSelectedItem(elem)
            //     }
            // })
            for (let elem of selectedValue) {
                for (let item of data) {
                    if (elem[`${keyId}`] === item[`${keyId}`]) {
                        item.toggle = true;
                        // break
                    }
                }
            }

            setOrdinalListData(data)
            setListData(data)

        }
        else {
            setOrdinalListData(data)
            setListData(data)

        }
    }
    console.log("listdata--->", listData);

    const onItemClicked = (index) => {
        originallistData.forEach((elem) => {
            // elem.toggle = false
            var id = listData[index][`${keyId}`]
            if (elem[`${keyId}`] === id) {
                elem.toggle = (elem.toggle === undefined ? true : !elem.toggle)
                setSelectedItem(elem)
            }

        })
        setListData(originallistData);
        // checkSelected(originallistData)


    }
    const checkSelected = (data) => {
        var isSelected = false
        var selectedValue = []
        var selectedValueStrings = []
        for (const [index, value] of data.entries()) {
            if (value.toggle) {
                isSelected = true
                selectedValue.push(value)
                selectedValueStrings.push(value[`${keyId}`])
            }
            if (index == data.length - 1) {
                if (isSelected)
                    onOkClick(selectedValue, selectedValueStrings.toString())
                else
                    setShowAlert(true)
                custom_alert.current?.simpleAlert(
                    'alert', `Please select ${alertText}`
                )
                // Alert.simpleAlert(alertText, `Please select ${alertText}`)
            }
        }
    }

    const handleSearch = text => {
        try {
            const formattedQuery = text.toLowerCase();
            const filteredData = originallistData.filter((item) => {
                return item[`${displayText}`].toLowerCase().match(formattedQuery)
            });
            setListData(filteredData);
            setSearchText(text)
        } catch (error) {

        }

    };


    const clearSearch = () => {
        setSearchText('')
        setListData(originallistData)
    }

    return (
        <SafeAreaView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? "height" : "padding"}
            enabled>
            <Portal>
                <Modal
                    visible={true}
                    contentContainerStyle={{ flex: 1, backgroundColor: 'transparent',alignItems :'center',  justifyContent: isTablet() ? 'center' : 'flex-end' }}
                    dismissable={false}

                >
                    <View style={isTablet() ? styles.modalViewTab : styles.modalView}>
                        <View style={styles.okCancelViewStyle}>
                            <Text fontWeight={SEMIBOLD} titleStyle style={styles.titleStyle}>{titleText}</Text>

                            <PrimaryButton
                                text={'Done'}
                                textStyle={{ fontSize: DynamicFontSize(10) }}
                                buttonStyle={{ height: 33, width: '15%', marginTop: 0 }}
                                onPress={() => {
                                    if (onOkClick) {
                                        checkSelected(originallistData)
                                    }
                                }}
                                color={INPUT_TITTLE_COLOR}
                            />

                        </View>
                        <View style={styles.searchView}>

                            <View style={styles.iconView}>
                                <Icon
                                    name="search"
                                    size={20}
                                    color={PLACEHOLDER}
                                />
                            </View>
                            <TextInput
                                placeholder={"Search"}
                                value={searchText}
                                style={styles.inputFildStyle}
                                inlineImageLeft={'search'}
                                inlineImagePadding={10}
                                placeholderTextColor={PLACEHOLDER}
                                onChangeText={text => handleSearch(text)}
                            />
                        </View>
                        <Flatlist
                            keyboardShouldPersistTaps={'always'}
                            // ref={ref => { this.flatlist = ref; }}
                            style={styles.listStyle}
                            data={listData}
                            didSelectRow={(props) => {
                                console.log(`${props.index}`)
                                onItemClicked(`${props.index}`)
                            }}
                            NoDataComponent={<View>
                                {
                                    errorMsg === undefined ? <Text style={{ textAlign: 'center', color: INPUT_TITTLE_COLOR }}>
                                        {"No " + displayText + " found."}
                                    </Text> :
                                        <Text style={{ textAlign: 'center', color: INPUT_TITTLE_COLOR }}>
                                            {"No " + errorMsg + " found."}
                                        </Text>
                                }

                            </View>}
                            renderItem={({ item, index }) => {
                                //console.log('item---->', item, displayText)
                                return (

                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: !item.toggle ? WHITE : PRIMARY_BUTTON }}>
                                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                <Text fontWeight={REGULAR} style={[styles.textStyle, { color: !item.toggle ? INPUT_TITTLE_COLOR : WHITE }]}>{item[`${displayText}`]}</Text>
                                                {showDisplayText2 ?
                                                    <Text fontWeight={MEDIUM} titleStyle style={styles.subtitleStyle}> ({item[`${displayText2}`]})</Text> : null}
                                            </View >
                                            {!item.toggle ?
                                                <Icon name={'radio-button-off-sharp'} size={20} color={INPUT_BG_COLOR} />
                                                :
                                                <Icon name={'radio-button-on'} size={20} color={GREEN} />

                                                //     <Image
                                                //         style={{ width: 30, height: 30, alignSelf: 'flex-end' }}
                                                //         resizeMode={'center'}
                                                //         source={Images.radio_btn_sel}></Image>
                                                // ) : (
                                                //     <Image
                                                //         style={{ width: 30, height: 30 }}
                                                //         resizeMode={'center'}
                                                //         source={Images.radio_btn_nrl}></Image>
                                                // )
                                            }
                                        </View>
                                        <View style={styles.lineStyle}></View>
                                    </View>
                                );
                            }
                            } />
                    </View>
                </Modal>
                <Hud visible={showLoader} />
                <CustomAlert
                    ref={custom_alert}
                    show={showAlert}
                    okPress={() => {
                        setShowAlert(false)
                    }
                    }
                    cancelPress={() => {
                        setShowAlert(false)
                    }
                    }
                />
            </Portal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: WHITE,
        // height: Dimensions.get('winscreedow').height,
        paddingTop: 10,
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modalViewTab:{
        backgroundColor: WHITE,
        // height: Dimensions.get('winscreedow').height,
        paddingTop: 10,
        width: '75%',
        height: '70%',
        borderRadius : 10
    },
    okCancelViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        alignItems: 'center',
        paddingBottom: 10,
        marginRight: 10
    },
    okcancelTextStyle: {
        fontSize: DynamicFontSize(13),
        alignSelf: 'center',
        color: PRIMARY_BUTTON
    },
    cancelTextStyle: {
        alignSelf: 'center',
    },
    titleStyle: {
        fontSize: DynamicFontSize(18),
        //alignSelf: 'center',
        fontFamily: 'Inter-Regular',
        // fontWeight: 'bold',
        color: INPUT_TITTLE_COLOR,
        width: '50%',
        marginLeft: 10,
        //textAlign: 'center'
    },

    listStyle: {
        marginBottom: 20,
        marginTop: 10,
        // marginHorizontal: 15
    },
    touchableStyle: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    textStyle: {
        color: INPUT_TITTLE_COLOR,
        fontSize: DynamicFontSize(15),
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 10
    },
    subtitleStyle: {
        color: PRIMARY,
        fontSize: DynamicFontSize(15),
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 10
    },
    lineStyle: {
        height: 1,
        backgroundColor: WHITE
    },
    inputFildStyle: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        fontSize: DynamicFontSize(14),
        height: isTablet() ? 48 : 38,
        paddingLeft: 10,
        borderTopColor: PLACEHOLDER,
        //borderTopWidth : 0.5,
        // backgroundColor: INPUT_BG_COLOR,
        flex: 1,
        color: INPUT_TITTLE_COLOR
    },
    inputContainerStyle: {
        // borderColor: WHITE,
        height: 30,
        // borderWidth: 1,
        borderColor: WHITE,
        borderRadius: 5,
        color: INPUT_TITTLE_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        width: '20%',
        marginRight: 10,
        height: 40,
        borderRadius: 10,
        marginTop: -5
    },
    iconView: {
        // backgroundColor: INPUT_BG_COLOR,
        height: 38,
        // width: 30,
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    searchView: {
        flexDirection: 'row',
        borderRadius: 3,
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: INPUT_BG_COLOR,
    }
});

export default CustomMuiltiSelection;