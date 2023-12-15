import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Divider } from 'react-native-paper';
import { GREY_TEXT_COLOR, ALERT_BUTTON_COLOR, PRIMARY_BUTTON, WHITE, BLACK, PLACEHOLDER, GREEN, ORANGE, INPUT_BG_COLOR } from '../../lib/colors';
import Image from '../common/Image';
import Icon from 'react-native-vector-icons/Entypo'
import Images from '../../lib/Images';
import { DynamicFontSize } from '../../lib/globalFunctions';
import { isTablet } from 'react-native-device-info';
const screenWidth = Dimensions.get('screen').width

export default class CustomAlert extends Component {

    state = {
        type: '',
        title: '',
        description: '',
        okTitle: '',
        cancelTitle: '',
        fontSize: 16,
        color: GREEN,
        isIconThere: 'No',
        width: '',
        headerTitle : ''
    }
    simpleAlert(type, description) {
        this.setState({
            type: type,
            description: description,
            okTitle: type == 'purchase' ? okTitle : 'Ok',
            headerTitle : '',
            cancelTitle: '',
            isIconThere: 'No',
            color: type == 'alert' ? ORANGE : type == 'confirm' ? ALERT_BUTTON_COLOR : GREEN,
            width: type == 'purchase' ? '40%' : isTablet() ?  '20%' : '28%',
        })
    }

    alertWithAction(type, description, okTitle, cancelTitle, headerTitle,width, fontSize, isIconThere) {
        this.setState({
            type: type,
            description: description,
            okTitle: okTitle,
            cancelTitle: type == 'sucess' ? '' : cancelTitle ? cancelTitle : '',
            headerTitle : headerTitle ? headerTitle : "",
            width:  width ? width : isTablet() ?  '28%' : '28%',
            fontSize: fontSize ? fontSize : 16,
            color: type == 'alert' ? ORANGE : type == 'confirm' ? ALERT_BUTTON_COLOR : GREEN,
            isIconThere: isIconThere != undefined ? isIconThere : 'No',
           

        })
    }

    render() {
        return (
            <View >
                <Portal >
                    <Dialog style={[styles.dialog, { borderTopColor: this.state.color }]} dismissable={false} visible={this.props.show} >
                        <Image
                            style={styles.imageStyle}
                            source={
                                this.state.type == 'alert' ? Images.img_alert :
                                    this.state.type == 'confirm' ? Images.img_confirmation :
                                        Images.img_success

                            }
                            resizeMode={'contain'}
                        />
                        <Text style={styles.titleStyel} >{
                            this.state.headerTitle == "" ?
                            this.state.type == 'alert' ?
                                "Alert"
                                : this.state.type == 'confirm' ?
                                    "Confirmation"
                                    : this.state.type == 'purchase' ?
                                        "Accept Purchase Order"
                                        : "Success"
                                        :
                                        this.state.headerTitle    
                        }</Text>
                        <Dialog.Content>

                            <Paragraph style={styles.paragaraphText}>{this.state.description}</Paragraph>

                        </Dialog.Content>
                        <Divider style={styles.dividerStyle} />
                        <Dialog.Actions style={styles.buttonVw}>

                            {
                                this.state.cancelTitle != '' ?
                                    <Button
                                        labelStyle={{ fontSize: DynamicFontSize(this.state.fontSize)  }}
                                        color={WHITE}
                                        style={styles.cancelButton}
                                        uppercase={false}
                                        onPress={() => {
                                            this.props.cancelPress ? this.props.cancelPress() : null
                                        }}
                                    >{this.state.cancelTitle}</Button>
                                    : null}
                            {
                                this.state.okTitle != '' ?
                                    <Button
                                        labelStyle={{  fontSize: DynamicFontSize(this.state.fontSize)  }}
                                        color={WHITE}
                                        style={[styles.okButton, { backgroundColor: this.state.color, width: this.state.width }]}
                                        uppercase={false}
                                        onPress={() => {
                                            this.props.okPress ? this.props.okPress() : null
                                        }}>{this.state.okTitle}</Button>
                                    : null
                            }
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
            // </Provider>
        );
    }
}

const styles = StyleSheet.create({
    titleStyel: {
        fontSize: DynamicFontSize(24),
        // textAlignVertical:'center',
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
        color: BLACK

    },
    dialog: {
        borderRadius: 5,
        width: isTablet() ? '60%' : '90%',
        alignSelf: 'center',
        borderTopWidth: 5
    },
    paragaraphText: {
        fontSize: DynamicFontSize(14),
        textAlign: 'center',
        color: GREY_TEXT_COLOR,
        marginTop: 10
    },
    buttonVw: {
        marginBottom: 10,
        justifyContent: 'center'
    },
    okButton: {
        borderRadius: 5
    },
    cancelButton: {
        backgroundColor: GREY_TEXT_COLOR,
        borderRadius: 5,
        marginRight: 10,
        width: '28%',
    }, dividerStyle: {
        backgroundColor: INPUT_BG_COLOR,
        marginVertical: 10
    },
    imageStyle: { alignSelf: 'center', marginVertical: 20 }
})
