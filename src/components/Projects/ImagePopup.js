import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PLACEHOLDER, WHITE, PRIMARY_BUTTON } from '../../lib/colors';
import { View, Image, Hud } from '../common';
import { ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import AppIconButton from './AppIconButton';
import PDFView from 'react-native-view-pdf';
import { isTablet } from 'react-native-device-info';
import Images from '../../lib/Images';
import RNFetchBlob from 'rn-fetch-blob';
import CustomAlert from './CustomAlert';
import Share from 'react-native-share';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ImagePopup = ({ visible, onCrossPress, source, pdf, onload, download }) => {


    useEffect(() => {
        setshowPopup(visible)
        setLoading(true)
        let extensiontype = source && source.uri.slice((source.uri.lastIndexOf(".")))
        let pdfType = pdf && pdf.slice((pdf.lastIndexOf(".")))
        setPdfExtension(pdfType)
        setExtension(extensiontype)
    }, [visible]);

    const [showPopup, setshowPopup] = useState(visible)
    const [loading, setLoading] = useState(true)
    const [showHud, setShowHud] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [extension, setExtension] = useState('')
    const [pdfextension, setPdfExtension] = useState('')
    const custom_alert = useRef()


    const historyDownload = () => {
        //Function to check the platform
        //If iOS the start downloading
        //If Android then ask for runtime permission
        setShowHud(true)
        if (Platform.OS === 'ios') {
            downloadHistory();
        } else {
            try {
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'storage title',
                        message: 'storage_permission',
                    },
                ).then(granted => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //Once user grant the permission start downloading
                        console.log('Storage Permission Granted.');
                        downloadHistory();
                    } else {
                        //If permission denied then show alert 'Storage Permission
                        setShowHud(false)
                        setShowAlert(true)
                        custom_alert.current?.simpleAlert(
                            'alert', "storage_permission"
                        )

                    }
                });
            } catch (err) {
                //To handle permission related issue
                setShowHud(false)

                console.log('error', err);
            }
        }
    }

    const downloadHistory = async () => {
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let date = new Date();
        let sourcetext = source.uri != '' ? `/Image_Download${extension}` : `/Pdf_Download${pdfextension}`
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    sourcetext
                ,
                // Math.floor(date.getTime() + date.getSeconds() / 2),
                description: 'Risk Report Download',
            },
        };
        config(options)
            .fetch('GET', source.uri != '' ? source.uri : pdf)
            .then((res) => {
                //Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                setShowHud(false)
                setAlertType('download')
                setShowAlert(true)
                custom_alert.current?.alertWithAction(
                    'sucess', "Image/Pdf Downloaded Successfully.", 'Ok'
                )
                // custom_alert.current?.alertWithAction(
                //     'sucess', "Image/Pdf Downloaded Successfully."
                // )
            });
    }

    // const onSharePress = async () => {
    //     try {
    //       // capture component 
    //       const uri = await captureRef(source, {
    //         format: 'jpg',
    //         quality: 0.8,
    //       });

    //       // share
    //       const shareResponse = await Share.open({url: uri});
    //     } catch (error) {
    //       console.log('error', error);
    //     }
    //   };



    const cleanAlertData = () => {
        setShowAlert(false)
        setAlertType('')
    }

    return (
        <Portal>
            <Dialog visible={showPopup} dismissable={false} style={styles.dialogStyle}>
                {/* <View style={styles.mainVw}> */}
                <View style={styles.headerStyle}>
                    {
                        download ?
                            <AppIconButton

                                onPress={() => { historyDownload() }}
                                //     const shareOptions = {
                                //         title: 'ewrew',
                                //         message: "pdf:",
                                //         url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                                //     };
                                //     Share.share(shareOptions)
                                // }}
                                color={PRIMARY_BUTTON}
                                icon={"download"}
                            />
                            :
                            <View
                            />
                    }

                    <AppIconButton
                        onPress={onCrossPress}
                        color={PRIMARY_BUTTON}
                        icon={"close-circle"}
                    />
                </View>


                {
                    source.uri != '' ?
                        <View style={styles.nameView}>
                            <Image
                                resizeMode={'contain'}
                                style={styles.imageStyle}
                                source={source}
                            />

                        </View> :

                        <View>

                            {
                                loading ?
                                <ActivityIndicator size="small" style={styles.lottieStyle} color={PRIMARY_BUTTON}/>
                                    // <LottieView
                                    //     style={styles.lottieStyle}
                                    //     autoPlay={true}
                                    //     loop={true}
                                    //     source={require('../../lib/loader-mrs.json')}
                                    //     onAnimationFinish={() => {
                                    //         // startshowTxet()
                                    //     }}
                                    // ></LottieView>
                                    :
                                    null
                            }
                            <PDFView
                                fadeInDuration={100.0}
                                style={[styles.pdfVw, { backgroundColor: loading ? 'transparent' : WHITE }]}
                                resource={pdf}
                                onLoad={() => {
                                    console.log('heyyyy')
                                    setLoading(false)
                                }}
                                resourceType={'url'}
                                onScrolled={(offset) => { console.log("offset", offset); }}
                            />

                        </View>
                }
                <CustomAlert
                    ref={custom_alert}
                    show={showAlert}
                    okPress={() => {
                        setShowAlert(false)
                        switch (alertType) {
                            case 'download':
                                setshowPopup(onCrossPress)
                                cleanAlertData();
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
                <Hud visible={showHud} />
            </Dialog>

        </Portal>
    )
}
const styles = StyleSheet.create({
    dialogStyle: {
        alignSelf: 'center',
        flex: 1,
        maxHeight: '85%',
        borderRadius: 10,
        width: screenWidth - 20,
        // justifyContent: 'center',
        // //elevation: 0,
        backgroundColor: WHITE
    },
    // mainVw :{
    //    // height: screenHeight * 0.8,
    //     width: screenWidth - 20,
    //     backgroundColor: 'red'
    // },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    dividerStyle: {
        backgroundColor: PLACEHOLDER,
        marginBottom: 10
    },
    nameView: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginBottom: 10,
        height: '80%',
        //backgroundColor : 'pink'
    },
    imageStyle: {
        width: screenWidth * 0.8,
        height: '100%',
        //backgroundColor : 'red'
        // maxHeight: '70%',
    },
    lottieStyle: {
        height: isTablet() ? 100 : 70,
        width: isTablet() ? 100 : 70,
        //position: 'absolute',
        zIndex: 5,
        alignSelf: 'center',
        marginTop: '40%'
    },
    pdfVw: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '85%',
        width: screenWidth - 20,
        //maxHeight:'80%',
        marginTop: 20,
        marginBottom: 10,
    }
})
export default ImagePopup;