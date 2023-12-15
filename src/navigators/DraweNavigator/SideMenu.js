import { useFocusEffect, StackActions } from "@react-navigation/native";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Dimensions, Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert, AsyncStorage, Flatlist, Image, Text, View, WSCall, ScrollView, Hud } from '../../components/common';
import { APP_WHITE, BLACK, GREY_TEXT_COLOR, PLACEHOLDER, PRIMARY_BUTTON, WHITE } from '../../lib/colors';
import { BOLD, LIGHT, MEDIUM, REGULAR, SEMIBOLD } from '../../lib/FontFamily';
import CustomAlert from '../../components/Projects/CustomAlert'
// import { setNavigator } from '../DraweNavigator/navigationRef';
import Images from '../../lib/Images';
import Strings from '../../lib/AppStrings'
import AsyncStorageKeys from "../../lib/AsyncStorageKeys";
import { deviceUniqueId } from "../../lib/globalFunctions";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);



const arrMenu = [
    { 'id': 0, 'title': Strings.sidemenu.deskboard, 'navScreen': Strings.drawer.deskboard, toggle: true, pageCode: '', image: Images.ic_dashboard },
    // { 'id': 9, 'title': Strings.sidemenu.notification, 'navScreen': Strings.drawer.notification, toggle: false, pageCode: '', image: Images.ic_notification },
    { 'id': 9, 'title': Strings.sidemenu.logout, 'navScreen': "", toggle: false, pageCode: 'logout', image: Images.ic_logout },
]





const Sidemenu =/*  ({ navigation,props }) */({ state, navigation, ...props }) => {

    const [arrMenuNew, setArrMenuNew] = useState(arrMenu);
    const [headerData, setHeaderData] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    const [alertPress, setAlertPress] = useState('')
    const custom_alert = useRef()

    useEffect(() => {
        handelSideMenuSelection()

    }, [])

    useFocusEffect(
        React.useCallback(() => {
        }, [firstName,])
    );


    const callLogOutAPI = async () => {
        setLoading(true)
       const token = await AsyncStorage.getData(AsyncStorageKeys.token)
        var inputParams = {
            device_type: Platform.OS == 'android' ? 'Android' : 'Ios',
            device_token : token,
            "method": "user_logout",
            "third_party_platform": Strings.VendorPortal,
            "lang_id": "EN",
        }
        console.log('->', inputParams)
        WSCall.getResponse("", inputParams, 'get', (response, error) => {
            setLoading(false)
            if (response != null && response.settings != null) {
                if (response.settings.success == "1") {
                    AsyncStorage.saveData(AsyncStorageKeys.is_Login, "false")
                    const resetActions = StackActions.replace("AuthModuleNavigtaor")
                    navigation.dispatch(resetActions)
                    cleanAlertData();
                } else {
                    setLoading(false)
                    setAlertPress('')
                    setShowAlert(true)
                    custom_alert.current?.simpleAlert(
                        'alert', response.settings.message
                    )
                }
            }
            else {
                setLoading(false)
                setAlertPress('')
                setShowAlert(true)
                custom_alert.current?.simpleAlert(
                    'alert', Strings.serverError
                )

            }

        })
    }
    const handelSideMenuSelection = async () => {
        const headerDetails = JSON.parse(await AsyncStorage.getData(AsyncStorageKeys.localData))
        //console.log('side menu----->', headerDetails);
        if (headerDetails != "") {
            setHeaderData(headerDetails)
        }
        let titleName = headerDetails.admin_name.split(" ")
        let firstName = titleName[0].split('')
        let lastName = titleName[1].split('')
        setFirstName(firstName[0])
        setLastName(lastName[0])
    }

    // arrMenuNew.forEach(async (elem, index) => {
    //     elem.toggle = false;
    //     //console.log("checking toggle",elem.title === await AsyncStorage.getData(AsyncStorageKeys.screenName),index)        

    //     if (elem.title === await AsyncStorage.getData(AsyncStorageKeys.screenName)) {
    //         elem.toggle = true;
    //         setArrMenuNew(arrMenuNew);

    //     }
    //     newarrMenu.push({ ...elem })

    // });

    const onMenuItemClick = async (index) => {
        var newarrMenu = [];
        arrMenuNew.forEach((elem) => {
            elem.toggle = false
            if (elem.id === arrMenuNew[index].id) {
                elem.toggle = true

            }
            newarrMenu.push({ ...elem })
        })
        setArrMenuNew(newarrMenu);
        
        if (arrMenuNew[index].title == Strings.sidemenu.quotation) {
            AsyncStorage.saveData(AsyncStorageKeys.quotaion, "quotation")
            AsyncStorage.saveData(AsyncStorageKeys.query, "")
            AsyncStorage.saveData(AsyncStorageKeys.is_selection, "true")
            navigation.navigate(Strings.drawer.quotation, {
                screen: "QuotationScreen"

            }
            );

        }
        else if (arrMenuNew[index].title == Strings.sidemenu.proposal) {
            AsyncStorage.saveData(AsyncStorageKeys.quotaion, "")
            AsyncStorage.saveData(AsyncStorageKeys.query, "")
            AsyncStorage.saveData(AsyncStorageKeys.is_selection, "true")
            navigation.navigate(Strings.drawer.proposal, {
                screen: "ProposalsScreen"
            }
            );

        }
        else if (arrMenuNew[index].title == Strings.sidemenu.query) {
            AsyncStorage.saveData(AsyncStorageKeys.quotaion, "")
            AsyncStorage.saveData(AsyncStorageKeys.query, "query")
            navigation.navigate(Strings.drawer.query, {
                screen: "QueryScreen"
            }
            );

        }
        else if (arrMenuNew[index].title == Strings.sidemenu.logout) {

            setAlertPress('logOut'),
                setShowAlert(true),
                custom_alert.current?.alertWithAction(
                    'alert', 'Are you want to logout', 'Yes', 'No'
                )
        }
        else if (arrMenuNew[index].title == Strings.sidemenu.deliveryPlan) {
            navigation.navigate(Strings.drawer.deliveryPlan, {
                screen: Strings.drawer.deliveryPlan
            }
            );
        }

        else {
            navigation.navigate(arrMenuNew[index].navScreen, { pageCode: arrMenuNew[index].pageCode, isfrom: '' })
        }

    }

    const renderItem = ({ item }) => (
        
        <View >

            <View style={item.toggle ? styles.touchableHighLightStyle : styles.touchableStyle}>
                <View style={styles.flatlistImageViewStyle}>

                    <Image
                        source={item.image}
                        resizeMode={'contain'}
                    >
                    </Image>

                </View>
                {/* <Text
                   >
                    {item.toggle ? 'true' : 'fsaalse'}
                </Text> */}
                <Text
                    fontWeight={item.toggle ? MEDIUM : REGULAR}
                    style={[styles.menuNormalText, { color: item.toggle ? PRIMARY_BUTTON : BLACK },]}>
                    {item.title}
                </Text>

            </View>
        </View>

    );
    const cleanAlertData = () => {
        setShowAlert(false)
        setAlertPress('')
    }
    const handleProfileFlow=()=>{
        navigation.navigate("AuthModuleNavigtaor",
        {
            screen:"signUpBasicDetail",
            params:{isFromProfile:'yes'}
        },
       
        )
    }
    return (

        <SafeAreaView style={styles.container}>
            <>

                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate(Strings.drawer.setting)
                    // handleProfileFlow()
                }}
                style={styles.menuMainViewStyle}>
                    <View style={[styles.nameView, { backgroundColor: PRIMARY_BUTTON }]}>
                        <Text style={styles.titleName}>{firstName}{lastName}</Text>
                    </View>
                    <View style={styles.ProfileTextViewStyle}>
                        <Text numberOfLines={1} fontWeight={SEMIBOLD} style={styles.ltd}>{headerData.admin_name}</Text>
                        <Text numberOfLines={1} fontWeight={MEDIUM} style={styles.mail}>{headerData.admin_email}</Text>
                    </View>
                </TouchableOpacity>
                <Flatlist
                    style={{ flexGrow: 0 }}
                    data={arrMenuNew}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    didSelectRow={(props) => {
                        onMenuItemClick(`${props.index}`)
                    }}
                />

            </>


            <CustomAlert
                ref={custom_alert}
                show={showAlert}
                okPress={async () => {
                    switch (alertPress) {
                        case 'logOut':
                            callLogOutAPI()
                            break;
                        default:
                            cleanAlertData();
                    }
                }
                }
                cancelPress={() => {
                    cleanAlertData();
                }
                }
            />
            <Hud visible={loading}/>
        </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    touchableHighLightStyle: {
        flexDirection: 'row',
        overflow: 'hidden',
        padding: 15,
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderColor: PLACEHOLDER,
        backgroundColor: APP_WHITE
    },
    touchableStyle: {
        flexDirection: 'row',
        padding: 15,
        overflow: 'hidden'
    },
    closebtnViewStyle: {
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 10
    },
    menuMainViewStyle: {
        flexDirection: 'row',
        paddingVertical: 15,
        marginTop: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    ProfileTextViewStyle: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginHorizontal: 15,
        width: screenWidth * 0.48,
    },
    profileImageViewStyle: {
        width: 65, height: 65,
        marginLeft: 30
    },
    sideIcon: {
        width: screenWidth * 0.12,
        height: screenWidth * 0.12
    },
    flatlistImageViewStyle: {
        alignSelf: 'center'
    },
    menuNormalText: {
        marginLeft: 10
    },
    ltd: {
        fontSize: 12,
        letterSpacing: 0.3
    },
    mail: {
        fontSize: 10,
        color: GREY_TEXT_COLOR
    },
    nameView: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleName: {
        color: WHITE,
        fontSize: 16
    }

});

export default Sidemenu;
