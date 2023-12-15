/** 
 * Created by Eswar Sairam on 23/09/20
 **/

import React from 'react';
import ActionSheet from 'react-native-custom-actionsheet'
import ImagePickerCustom from './ImagePickerCustom'
import PropTypes from 'prop-types';

class ImagePicker extends React.Component {

    constructor() {
        super();
    }

    state = {
        isCamera: false
    }

    static defaultProps = {
        mediaType: "",
        allowsEditing: true,
        pickedImage: null,
    }

    static propTypes = {
        mediaType: PropTypes.string,
        allowsEditing: PropTypes.bool,
        pickedImage: PropTypes.func,
    }

    pickImage = () =>{ 
        // this.props.mediaType=="video" ?
        // this.handlePress(2) 
        // :
        // this.handlePress(2) 
       this.actionSheet.show()
    }

    getActionSheetRef = ref => (this.actionSheet = ref)

    handlePress = (index) => {
        if (index == 1) {
            ImagePickerCustom.picImage(true, this.getSourceImage, this.props.mediaType || null, this.props.allowsEditing || false)
            this.setState({isCamera: true})
        } else if (index == 2) {
            ImagePickerCustom.picImage(false, this.getSourceImage, this.props.mediaType || null, this.props.allowsEditing || false)
            this.setState({isCamera: false})
        }
    }

    getSourceImage = (source, type) => { 
        if (this.props.pickedImage) {
            this.props.pickedImage(source, this.state.isCamera, type)
            console.log("source",source,type);
        }
    }

    render() {
        return (
            <ActionSheet
                ref={this.getActionSheetRef}
                options={['Cancel', 'Camera', 'Choose from Album']}
                cancelButtonIndex={0}
                onPress={this.handlePress}
            />
        )
    }
}

export default ImagePicker;