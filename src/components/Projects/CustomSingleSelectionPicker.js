import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Flatlist, Image, Text, View, Alert, WSCall, Hud } from '../../components/common';
import PrimaryButton from '../Projects/PrimaryButton';
import { Modal, Portal } from 'react-native-paper';
import strings from '../../lib/AppStrings';
import { BACK_GROUND, BLACK, GREEN, GREY_TEXT_COLOR, INPUT_BG_COLOR, INPUT_TITTLE_COLOR, ORANGE, PLACEHOLDER, PRIMARY, PRIMARY_BUTTON, PRIMARY_BUTTON_LIGHT, RED, WHITE } from '../../lib/colors';
import { MEDIUM, REGULAR, SEMIBOLD } from '../../lib/FontFamily';
import Images from '../../lib/Images';
import ImageButton from '../../components/common/ImageButton';
const { width, HEIGHT } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import CustomAlert from '../Projects/CustomAlert'
import AppIconButton from './AppIconButton';
import { DynamicFontSize } from '../../lib/globalFunctions';
import { isTablet } from 'react-native-device-info';

const CustomSingleSelectionPicker = (props) => {
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
        apiInputParams,
        listArray
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
        listArray ? (setShowLoader(false), setListData(listArray), handlePreSelection(listArray)) :
            callPopupDataApi()
    }, [])

    const callPopupDataApi = () => {
        var inputParams = apiInputParams;
        console.log("inputParams", inputParams);

        WSCall.getResponse(
            "",
            inputParams,
            'get',
            (response, error) => {
                if (response != null && response.settings) {
                    if (response.settings.success == 1) {

                        setShowLoader(false);
                        if (response.data.length == undefined) {
                            console.log("responce", response.data);

                            handlePreSelection(response.data.child_data)

                        } else {
                            handlePreSelection(response.data)
                        }
                        console.log("response", response.data);

                    } else if (response.settings.success == '0') {
                        setOrdinalListData([])
                        setListData([])
                        setShowAlert(true)
                        custom_alert.current?.simpleAlert(
                            'alert', response.settings.message
                        )
                        // Alert.simpleAlert('', response.settings.message)
                        setShowLoader(false);
                    } else {
                        setShowLoader(false);
                    }
                }
            },
        );
    };

    const handlePreSelection = (data) => {
        console.log("selectedValue", selectedValue);

        if (selectedValue != '') {



            data.forEach((elem) => {
                if (elem[`${keyId}`] === selectedValue[`${keyId}`]) {
                    //console.log("elem[`${keyId}`] , selectedValue[`${keyId}`]",elem[`${keyId}`],selectedValue[`${keyId}`]);

                    elem.toggle = true
                    setSelectedItem(elem)
                }
            })
            setOrdinalListData(data)
            setListData(data)

        }
        else {
            setOrdinalListData(data)
            setListData(data)

        }
    }
    console.log("listdata--->", listData);
    const cleanAlertData = () => {
        setShowAlert(false)
    }
    const onItemClicked = (index) => {
        originallistData.forEach((elem) => {
            elem.toggle = false
            var id = listData[index][`${keyId}`]
            if (elem[`${keyId}`] === id) {
                elem.toggle = true
                setSelectedItem(elem)
            }
        })
        setListData(originallistData);
        checkSelected(originallistData)

    }
    const checkSelected = (data) => {
        var isSelected = false
        var selectedValue = {}
        for (const [index, value] of data.entries()) {
            if (value.toggle) {
                isSelected = true
                selectedValue = value
            }
            if (index == data.length - 1) {
                if (isSelected)
                    onOkClick(selectedValue)
                else {
                    setShowAlert(true)
                    custom_alert.current?.simpleAlert(
                        'alert', alertText
                    )
                }
                // Alert.simpleAlert(alertText, "")
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
                    <View style={ isTablet() ? styles.modalViewTab : styles.modalView}>
                        <View style={styles.okCancelViewStyle}>
                            <Text fontWeight={MEDIUM} titleStyle style={styles.titleStyle}>{titleText}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { if (onOkClick) onOkClick('') }}>
                                    <Text style={styles.clearTxt}>Clear</Text>
                                </TouchableOpacity>
                                <AppIconButton
                                    icon="close"
                                    size={20}
                                    style={{ padding: 10 }}
                                    onPress={() => {
                                        onCancelClick()
                                    }}
                                    color={INPUT_TITTLE_COLOR}
                                />
                            </View>

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
                        {/* <SearchBar
                            //searchplaceholder
                            placeholder={"Search"}
                            onChangeText={text => handleSearch(text)}
                            containerStyle={{ backgroundColor: WHITE, borderColor: WHITE, height: 45 }}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCorrect={false}
                            value={searchText}
                            onClear={clearSearch}
                            returnKeyType='done'
                            inputStyle={styles.inputFildStyle}
                        /> */}
                        <Flatlist
                            keyboardShouldPersistTaps={'always'}
                            // ref={ref => { this.flatlist = ref; }}
                            style={styles.listStyle}
                            data={listData}
                            didSelectRow={(props) => {
                                console.log(`${props.index}`)
                                onItemClicked(`${props.index}`)
                            }}
                            initialNumToRender={20}
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
            </Portal>
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
        backgroundColor: WHITE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        alignItems: 'center',
        paddingBottom: 10,
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
        fontSize:DynamicFontSize(18),
        //alignSelf: 'center',
        fontFamily: 'Inter-Regular',
        // fontWeight: 'bold',
        color: INPUT_TITTLE_COLOR,
        width:'75%',
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
    clearTxt: {
        color: GREY_TEXT_COLOR,
        fontSize: DynamicFontSize(12),
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: GREY_TEXT_COLOR
    },
    iconView: {
       // backgroundColor: INPUT_BG_COLOR,
         height: 38,
        // width: 30,
        paddingLeft :5,
        alignItems: "center",
        justifyContent: 'center'
    },
    searchView: {
        flexDirection: 'row',
        borderRadius : 3,
        alignItems: 'center',
        marginHorizontal: 10,
         backgroundColor: INPUT_BG_COLOR,
    }
});

export default CustomSingleSelectionPicker;