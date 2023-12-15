/** 
 * Created by Eswar Sairam on 23/09/20
 **/

import { Component } from 'react';
import ImagePicker,{launchCamera,launchImageLibrary} from 'react-native-image-picker'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import strings from '../../../lib/AppStrings';
//import CustomAlert from '../../Project/CustomAlert';
import Alert from '../Alert';

//let displyAlert = false;r

const requestCamera = (callback, options) => {
    request(PERMISSIONS.ANDROID.CAMERA).then(resultReq => {
        switch (resultReq) {
            case RESULTS.BLOCKED:
                // this.setState({ showAlert: true })
                // this.custom_alert.simpleAlert(
                //     '',
                //     'The permission is denied and not requestable anymore'
                // )
                Alert.simpleAlert('', 'The permission is denied and not requestable anymore.')
                break;
            case RESULTS.GRANTED:
                request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((storageResult) => {
                    switch (storageResult) {
                        case RESULTS.BLOCKED:
                            // this.setState({ showAlert: true })
                            // this.custom_alert.simpleAlert(
                            //     '',
                            //     'The permission is denied and not requestable anymore'
                            // )
                            Alert.simpleAlert('', 'The permission is denied and not requestable anymore.')
                            break;
                        case RESULTS.GRANTED:
                            pichImageFromCamera(callback, options)
                            break;
                    }
                })
        }
    })
}

const requestPhotoLibrary = (callback, options) => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(resultReq => {
        switch (resultReq) {
            case RESULTS.BLOCKED:
                // this.setState({ showAlert: true })
                // this.custom_alert.simpleAlert(
                //     '',
                //     'The permission is denied and not requestable anymore'
                // )
                Alert.simpleAlert('', 'The permission is denied and not requestable anymore.')
                break;
            case RESULTS.GRANTED:
                pickImageFromLibrary(callback, options)
                break;
        }
    })
}

const getFileExtension1 = (filename) => {
    console.log("filename",filename);
    return (filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)).toLowerCase();
}

const pichImageFromCamera = (callback, options) => {
    if (options.mediaType && options.mediaType == 'both') {
        ImagePicker.showImagePicker({
            title: 'Choose Image or Video',
            customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }],
            chooseFromLibraryButtonTitle: null,
            takePhotoButtonTitle: null,
        }, (res) => {
            if (res.customButton) {
                launchCamera({
                    mediaType: res.customButton,
                    videoQuality: 'high',
                    quality: 1,
                }, (response) => {
                    if (response.didCancel) {
                        // console.log('User cancelled image picker');
                    }
                    else if (response.error) {
                        // console.log('ImagePicker Error: ', response.error);
                    }
                    else if (response.customButton) {
                        // console.log('User tapped custom button: ', response.customButton);
                    }
                    else {
                        callback(response.uri, res.customButton)

                    }
                });
            }
        });
    } else {
        launchCamera(options, (response) => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                console.log('User tapped custom button: ', response);
                if (getFileExtension1(response.assets[0].uri) == 'MOV' || getFileExtension1(response.assets[0].uri) == 'mp4') {
                    callback(response.assets[0].uri, 'video')
                } else {
                    callback(response.assets[0].uri, 'photo')
                }
            }
        })
    }
}

const pickImageFromLibrary = (callback, options) => {
    if (options.mediaType && options.mediaType == 'both') {
        ImagePicker.showImagePicker({
            title: 'Choose Image or Video',
            customButtons: [{ name: 'image', title: 'Take a Photo' }, { name: 'video', title: 'Take a Video' }],
            chooseFromLibraryButtonTitle: null,
            takePhotoButtonTitle: null,
        }, (res) => {
            console.log('res-->', res);
            if (res.customButton) {
                launchImageLibrary({
                    mediaType: res.customButton,
                    videoQuality: 'high',
                    quality: 1,
                }, (response) => {
                    if (response.didCancel) {
                        // console.log('User cancelled image picker');
                    }
                    else if (response.error) {
                        // console.log('ImagePicker Error: ', response.error);
                    }
                    else if (response.customButton) {
                        // console.log('User tapped custom button: ', response.customButton);
                    }
                    else {
                        console.log('User tapped custom button1: ', response.assets[0].uri);
                        callback(response.assets[0].uri, res.customButton)
                    }
                });
            }
        });
    } else {
       launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                console.log('getFileExtension1(response.path)-->', response);
//mp4,avi,mov,mkv
                if (getFileExtension1(response.assets[0].uri) == 'mp4' || getFileExtension1(response.assets[0].uri) == 'avi' || getFileExtension1(response.assets[0].uri) == 'mov' || getFileExtension1(response.assets[0].uri) == 'mkv') {
                    // if (getFileExtension1(response.path) == 'mov' || getFileExtension1(response.path) == 'mp4' || getFileExtension1(response.path) == 'avi' || getFileExtension1(response.path) == 'mkv') {
                    // callback(response, 'video')
                    checkFileSize(callback, response, 'video')
                    console.log('getFileExtension1(response.path)-->', getFileExtension1(response.assets[0].uri));
                } else {
                    // this.setState({ showAlert: true })
                    // this.custom_alert.simpleAlert(
                    //     '',
                    //     strings.addPhotos.video_error
                    // )
                    console.log("options.mediaType",options.mediaType);
                    if(options.mediaType == 'video' ){
                    Alert.simpleAlert('', strings.addPhotos.video_error)
                        
                    }
                    else{
                        console.log('esponse.uri', getFileExtension1(response.assets[0].uri));
                        callback(response.assets[0].uri, 'photo')
                    }
                   
                }
            }
        })
    }
}
const checkFileSize = async (callback, response, type) => {

    const finalList = []
    const array = [response]
    var isValid = false
    var isAlertStatus = true
    await array.map((item, index) => {

        RNFetchBlob.fs
            .stat(item.uri)
            .then((stats) => {
                //let typeError = false
                let size = stats.size / 1024 < 204800
                // let typeError = this.props.mediaType == 'Video' ? this.checkFileType(item, "mp4,avi,mov,mkv") : this.checkFileType(item, "jpeg,png,jpg")
                console.log('stats', size)
                if (size) {
                    finalList.push({
                        ...stats,
                        mime: `video/${stats.uri.substring(stats.uri.lastIndexOf(".") + 1)}`,
                        uri: item.uri,
                    })
                    console.log('item--->', item)

                } else {
                    isValid = true
                }
                if (array.length - 1 === index) {
                    // this.props.pickedImage(finalList, this.state.isCamera)
                    callback(finalList, 'video')
                }
                if (isValid && isAlertStatus) {
                    isValid = false
                    isAlertStatus = false
                    // this.setState({ showAlert: true })
                    // this.custom_alert.simpleAlert(
                    //     '',
                    //     strings.addPhotos.video_size_limit

                    // )
                    Alert.simpleAlert('', strings.addPhotos.video_size_limit)
                }
            })
            .catch((err) => {
                // console.log('err', err);
            });
    })

}


class ImagePickerCustom extends Component {

    state = {
        showAlert: false,
    }

    static picImage = (isCamera, callback, mediaType, allowsEditing) => {
        console.log("picImage");
        const options = {
            mediaType: (mediaType) ? (mediaType == 'both' ? 'mixed' : mediaType) : 'photo',
            allowsEditing: allowsEditing || false,
            quality: 0.5,
            maxWidth: 300,
            maxHeight: 300,
        };
        if (isCamera) {
            check(PERMISSIONS.ANDROID.CAMERA)
                .then(result => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            requestCamera(callback, options)
                            break;
                        case RESULTS.DENIED:
                            requestCamera(callback, options)
                            break;
                        case RESULTS.GRANTED:
                            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((storageResult) => {
                                switch (storageResult) {
                                    case RESULTS.BLOCKED:
                                        // this.setState({ showAlert: true })
                                        // this.custom_alert.simpleAlert(
                                        //     '',
                                        //     'The permission is denied and not requestable anymore'
                                        // )
                                        Alert.simpleAlert('', 'The permission is denied and not requestable anymore.')

                                        break;
                                    case RESULTS.GRANTED:
                                        pichImageFromCamera(callback, options)
                                        break;
                                }
                            })
                            break;
                        case RESULTS.BLOCKED:
                            // this.setState({ showAlert: true })
                            // this.custom_alert.simpleAlert(
                            //     '',
                            //     'The permission is denied and not requestable anymore'
                            // )
                            Alert.simpleAlert('', 'The permission is denied and not requestable anymore.')

                            break;
                    }
                })
        } else {
            check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
                .then(result => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            requestPhotoLibrary(callback, options)
                            break;
                        case RESULTS.DENIED:
                            requestPhotoLibrary(callback, options)
                            break;
                        case RESULTS.GRANTED:
                            pickImageFromLibrary(callback, options)
                            break;
                        case RESULTS.BLOCKED:
                            // this.setState({ showAlert: true })
                            // this.custom_alert.simpleAlert(
                            //     '',
                            //     'The permission is denied and not requestable anymore'
                            // )
                            Alert.simpleAlert('', 'The permission is denied and not requestable anymore.')

                            break;
                    }
                })
        }
    }
    render() {
        return (
            <>
                <View />
                {/* <CustomAlert
                    ref={(ref) => { this.custom_alert = ref }}
                    // show={this.state.showAlert}
                    show={displyAlert}
                    okPress={() => {
                        this.setState({ showAlert: false })

                    }}
                    cancelPress={() => {
                        this.setState({ showAlert: false })
                    }}
                /> */}
            </>
        )
    }
}

export default ImagePickerCustom;