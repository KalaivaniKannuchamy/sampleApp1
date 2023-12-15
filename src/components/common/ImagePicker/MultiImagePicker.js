/** 
 * Created by Sreenu on 23/10/20
 **/

import PropTypes from 'prop-types';
import React from 'react';
import { NativeModules, Platform } from 'react-native';
import ActionSheet from 'react-native-custom-actionsheet';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from '../../../components/common';
import strings from '../../../lib/AppStrings';
//import CustomAlert from '../../Project/CustomAlert';

var ImageCropPicker = NativeModules.ImageCropPickerNew;

class MultiImagePicker extends React.Component {
    constructor() {
        super();
    }

    state = {
        isCamera: false
    }

    static defaultProps = {
        mediaType: "",
        maxFiles: 100,
        allowsEditing: true,
        pickedImage: null,
    }

    static propTypes = {
        mediaType: PropTypes.string,
        maxFiles: PropTypes.number,
        allowsEditing: PropTypes.bool,
        pickedImage: PropTypes.func,
        selection: PropTypes.func
    }

    pickImage = () => { 
       // this.props.mediaType == 'Video' ?
         this.handlePress(2) 
         //: this.actionSheet.show()
     }

    getActionSheetRef = ref => (this.actionSheet = ref)

    handlePress = (index) => {
        this.props.selection()
        if (index == 1) {
            // ImagePicker.openCamera({
            //     cropping: true,
            //     mediaType: 'photo',
            //     width: 300,
            //     height: 300,
            //     compressImageQuality: 0.5
            // }).then(image => {
            //     var capturedData = []
            //     capturedData.push(image)
            //     this.props.pickedImage(capturedData, this.state.isCamera)
            // });
            this.setState({ isCamera: true })
            this.props.pickedImage("", this.state.isCamera)
        } else if (index == 2) {

            if (Platform.OS == 'ios') {
                ImagePicker.openPicker({
                    mediaType: this.props.mediaType,
                    multiple: true,
                    maxFiles: this.props.maxFiles,
                    width: 300,
                    height: 300,
                    compressImageQuality: 0.7
                }).then(images => {
                    //    console.log("selected images from picker---->", images);
                    this.checkFileSize(images)
                });
                this.setState({ isCamera: false })

            } else {
                ImagePicker.openPicker({
                    mediaType: this.props.mediaType,
                    multiple: true,
                   // maxFiles: this.props.maxFiles,
                    width: 300,
                    height: 300,
                    compressImageQuality: 0.7
                }).then(images => {
                    console.log("selected images from picker---->", images);
                    this.checkFileSize(images)
                }).catch(err => {
                    this.setState({ showAlert: true })
                    this.custom_alert.simpleAlert(
                        '',
                        JSON.stringify(err.message)

                    )
                    console.log('err--->', JSON.stringify(err.message))
                })
                this.setState({ isCamera: false })

            }
        }
    }

    checkFileType = (item, formats) => {
        let supported = false
        let formatList = formats.split(',')
        console.log('item, formats outer-->', item.path.substring(item.path.lastIndexOf(".") + 1), formatList)
        for (let elem of formatList) {
            if (item.path.substring(item.path.lastIndexOf(".") + 1).toLowerCase() == elem) {
                supported = true
                break;
            }
        }

        return supported
    }
    checkFileSize = async (images) => {

        const finalList = []
        var isValid = false
        var isAlertStatus = true
        await images.map((item, index) => {

            RNFetchBlob.fs
                .stat(item.path)
                .then((stats) => {

                    let size = this.props.mediaType == 'Video' ? stats.size / 1024 < 204800 : stats.size / 1024 < 12360
                    let typeError = this.props.mediaType == 'Video' ? this.checkFileType(item, "mp4,avi,mov,mkv") : this.checkFileType(item, "jpeg,png,jpg")
                    console.log('mime', typeError)
                    if (size) {
                        if (!typeError) {
                            this.setState({ showAlert: true })
                            this.custom_alert.simpleAlert(
                                '',
                                this.props.mediaType == 'Video' ? strings.addPhotos.video_error : strings.addPhotos.image_error
                            )
                            
                        } else {
                            finalList.push(item)
                            // console.log(finalList)
                        }
                    } else {
                        isValid = true
                    }
                    if (images.length - 1 == index) {
                        this.props.pickedImage(finalList, this.state.isCamera)
                    }
                    if (isValid && isAlertStatus) {
                        isValid = false
                        isAlertStatus = false
                        this.setState({ showAlert: true })
                        this.custom_alert.simpleAlert(
                            '',
                            this.props.mediaType == 'Video' ? strings.addPhotos.video_size_limit : strings.addPhotos.image_size_limit

                        )
                    }
                })
                .catch((err) => {
                    // console.log('err', err);
                    //callProfilePicUpload(finalImage);
                });
        })

    }



    takePicture = async () => {
        if (this.camera && !this.state.takingPic) {

            let options = {
                quality: 0.85,
                fixOrientation: true,
                forceUpOrientation: true,
            };

            //   this.setState({takingPic: true});

            try {
                this.camera.resumePreview();
                const data = await this.camera.takePictureAsync(options);
                Alert.simpleAlert('Success', JSON.stringify(data));
            } catch (err) {
                // console.log('Error', 'Failed to take picture: ' + (err.message || err));
                return;
            } finally {
                // this.setState({takingPic: false});
            }
        }
    };


    render() {
        return (

            <>
                <ActionSheet
                    ref={this.getActionSheetRef}
                    options={['Cancel', 'Camera', 'Choose from Album']}
                    cancelButtonIndex={0}
                    onPress={this.handlePress}
                />
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
export default MultiImagePicker;
