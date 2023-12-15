/** 
 * Created by Sreenu on 23/10/20
 **/

import PropTypes from 'prop-types';
import React from 'react';
import { NativeModules, Platform, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker'


class DocumentPickers extends React.Component {
    constructor() {
        super();
    }

    state = {
        //isCamera: false
        showAlert: false,
    }

    static defaultProps = {
        mediaType: "File",
        pickedDocument: null,
    }

    static propTypes = {
        mediaType: PropTypes.string,
        pickedDocument: PropTypes.func,
    }
    checkFileType = (item, formats) => {
        let supported = false
        let formatList = formats.split(',')
        let type = null;
        if(item.name){
            type = item.name.split('.').length > 1 ? item.name.split('.')[item.name.split('.').length - 1] : null
        }else{
            type = item.uri.split('.').length > 1 ? item.uri.split('.')[item.uri.split('.').length - 1] : null
        }
                        // :
                      //  type == 'Audio' ? 'mp3' : 'pdf'
        //console.log('item, formats outer-->',item.path.substring(item.path.lastIndexOf(".") + 1),formatList)
        for (let elem of formatList) {
            if ( type == null) {
                supported = false
                break;
            }
            if( type.toLowerCase() == elem ){
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
            console.log(item)
            // await RNFS.readFile(path, "utf8")
            // RNFetchBlob.fs.readFile(`${RNFetchBlob.fs.readStream}/${item.name}`, "utf8")
            //  .stat(item.uri)
            // .then((stats) => {
            // console.log('mime',item,stats,`${RNFetchBlob.fs.readStream}`)
            let size = true ;
           // let typeError = false
            //this.props.mediaType == 'File' ? false : item.type.split('/')[1] != 'mp3'
            //this.props.mediaType == 'File' ? (item.uri.indexOf('pdf') == -1 || item.uri.indexOf('txt') == -1) : false
            let typeError = true
            //this.props.mediaType == 'Audio' ? this.checkFileType(item, "aac,mp3,m4a") : this.checkFileType(item, "pdf")
            // "aac,mp3,m4a"
            console.log(typeError, this.props.mediaType);
            if (size) {
                if (!typeError) {
                    
                    // Alert.simpleAlert(
                    //     '',
                    //     this.props.mediaType == 'File' ? strings.addPhotos.docs_error : strings.addPhotos.audio_error
                    // )
                } else {
                    console.log('finalList', item,size)
                    finalList.push(item)
                    // console.log(finalList)
                }
            } else {
                isValid = true
            }
            if (images.length - 1 == index) {
                console.log('pickedDocument', finalList)
                this.props.pickedDocument(finalList)
            }
            if (isValid && isAlertStatus) {
                isValid = false
                isAlertStatus = false
                

            }
        })

    }
    handlePress = async () => {

        try {
            const res = await DocumentPicker.pickMultiple({ type: this.props.mediaType == 'Audio' ? [DocumentPicker.types.audio] :  [ DocumentPicker.types.pdf] })

            this.checkFileSize(res)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                console.log('err---->', err)
                // Alert.simpleAlert(
                //     '',
                //     err
                // )
            } else {
                throw err
            }
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
export default DocumentPickers;
