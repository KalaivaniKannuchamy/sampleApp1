/** 
 * Created by Eswar Sairam on 23/09/20
 **/

import { Component } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
//import CustomAlert from '../../Project/CustomAlert';
import Alert from '../Alert';
import strings from '../../../lib/AppStrings';

const requestCamera = (callback, options) => {
    request(PERMISSIONS.IOS.CAMERA).then(resultReq => {
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
                pickImageFromCamera(callback, options)
                break;
        }
    })
}

const requestPhotoLibrary = (callback, options) => {
    request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(resultReq => {
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
    return (filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)).toLowerCase();
}

const checkFileSize = async (callback, response, type) => {

    const finalList = []
    const array = [response]
    console.log("array ====", array)
    var isValid = false
    var isAlertStatus = true
    await array.map((item, index) => {
        console.log("item ====", item, index)
        const uri = item.uri.replace('file://', '')
        RNFetchBlob.fs
            .stat(uri)
            .then((stats) => {
                console.log('stats =====', stats)
                //let typeError = false
                let size = stats.size / 1024 < 204800
                // let typeError = this.props.mediaType == 'Video' ? this.checkFileType(item, "mp4,avi,mov,mkv") : this.checkFileType(item, "jpeg,png,jpg")
                console.log('stats', size)
                if (size) {
                    finalList.push({
                        ...stats,
                        mime: `video/${stats.path.substring(stats.path.lastIndexOf(".") + 1)}`,
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
                console.log('err ====', err);
            });
    })

}

const pickImageFromLibrary = (callback, options) => {
    ImagePicker.launchImageLibrary(options, (response) => {
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
            console.log("response ===", response)
            console.log('getFileExtension1(response.path)-->', getFileExtension1(response.uri));
            if (getFileExtension1(response.uri) === 'mp4' || getFileExtension1(response.uri) === 'MOV') {

                // if (getFileExtension1(response.path) == 'mov' || getFileExtension1(response.path) == 'mp4' || getFileExtension1(response.path) == 'avi' || getFileExtension1(response.path) == 'mkv') {
                // callback(response, 'video')
                checkFileSize(callback, response, 'video')
                // console.log('getFileExtension1(response.path)-->', getFileExtension1(response.path));
            } else {
                // this.setState({ showAlert: true })
                // this.custom_alert.simpleAlert(
                //     '',
                //     strings.addPhotos.video_error
                // )
                if(options.mediaType == 'video' ){
                    Alert.simpleAlert('', strings.addPhotos.video_error)
                        
                    }
                    else{
                        callback(response.uri, 'photo')
                    }
            }
        }
    })
}

const pickImageFromCamera = (callback, options) => {
    ImagePicker.launchCamera(options, (response) => {
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
            if (getFileExtension1(response.path) == 'mp4' || getFileExtension1(response.path) == 'avi' || getFileExtension1(response.path) == 'mov' || getFileExtension1(response.path) == 'mkv') {
                callback(response.uri, 'video')
            } else {
                callback(response.uri, 'photo')
            }
        }
    })
}

class ImagePickerCustom extends Component {
    state = {
        showAlert : false,
    }
    static picImage = (isCamera, callback, mediaType, allowsEditing) => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: (mediaType) ? (mediaType == 'both' ? 'mixed' : mediaType) : 'photo',
            allowsEditing: allowsEditing || false,
            quality: 0.5,
            maxWidth: 300,
            maxHeight: 300,

        };
        if (isCamera) {
            check(PERMISSIONS.IOS.CAMERA)
                .then(result => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            requestCamera(callback, options)
                            break;
                        case RESULTS.DENIED:
                            requestCamera(callback, options)
                            break;
                        case RESULTS.GRANTED:
                            pickImageFromCamera(callback, options)
                            break;
                        case RESULTS.BLOCKED:
                            Alert.simpleAlert("", 'The permission is denied and not requestable anymore');
                            break;
                    }
                })
        } else {
            check(PERMISSIONS.IOS.PHOTO_LIBRARY)
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
                    show={this.state.showAlert}
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