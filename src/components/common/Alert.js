/** 
 * Created by Eswar Sairam on 23/09/20
 **/

import React, { Component } from 'react';
import { Alert as NativeAlert, Modal, StyleSheet, Dimensions } from 'react-native';
import { BLACK, WHITE } from '../../lib/colors';
import ScrollView from './ScrollView';
import View from './View';
import Input from './Input';
import Text from './Text';
import Button from './Button';

let { width, height } = Dimensions.get('window')

export default class Alert extends Component {

    state = {
        modalVisible: false,
        title: "",
        message: "",
        cancelTitle: "",
        okTitle: "",
        inputProps: "",
        onOkClick: null,
        inputValue: ""
    }

    static simpleAlert(title, message) {
        setTimeout(() => {
            NativeAlert.alert(
                title,
                message,
                [
                    { text: 'Ok' },
                ],
                { cancelable: false },
            );
        }, 200)
    }

    static alertWithAction(title, message, cancelTitle, okTitle, onOkClick) {
        let btnArr = []
        if (cancelTitle.length > 0) {
            btnArr = [
                { text: okTitle, onPress: () => onOkClick() },
                {
                    text: cancelTitle,
                    onPress: () => console.log(''),
                    style: 'cancel',
                }
            ]
        } else {
            btnArr = [
                { text: okTitle, onPress: () => onOkClick() }
            ]
        }
        setTimeout(() => {
            NativeAlert.alert(
                title,
                message,
                btnArr,
                "secure-text",
                { cancelable: false },
            );
        }, 200)
    }

    alertWithTextInput(title, message, cancelTitle, okTitle, inputProps, onOkClick) {
        this.setState({
            modalVisible: true, title: title,
            message: message,
            cancelTitle: cancelTitle,
            okTitle: okTitle,
            inputProps: inputProps,
            onOkClick: onOkClick
        });
    }

    render() {
        const { label, placeholder, type, isRequired, errorMessage, regExpression } = this.state.inputProps || { label: null }
        // console.log(ir)
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible} >
                <ScrollView style={styles.scrollView}>
                    <View style={styles.container}>
                        <View style={styles.alertContainer}>
                            {this.state.title ? <Text style={styles.title}>{this.state.title}</Text> : null}
                            <Text style={styles.message}>{this.state.message}</Text>

                            {this.state.inputProps ? (
                                <Input
                                    ref={ref => { this.input = ref; }}
                                    placeholder={placeholder}
                                    label={label || null}
                                    type={type || null}
                                    isRequired={(isRequired != null) ? isRequired : true}
                                    errorMessage={errorMessage || null}
                                    regExpression={regExpression || null}
                                    isLastFeild={true}
                                    onChangeText={(text) => {
                                        this.setState({ inputValue: text });
                                    }}
                                />
                            ) : null}
                            <View style={styles.vwHorizonSeparator} />
                            <View style={styles.vwButtons}>
                                <Button style={styles.btnContainerStyle} titleStyle={styles.btnStyle}
                                    onPress={() => {
                                        this.setState({ modalVisible: false });
                                    }}
                                >{this.state.cancelTitle || "Cancel"}</Button>
                                <View style={styles.vwVerticalSeparator} />
                                <Button style={styles.btnContainerStyle} titleStyle={styles.btnStyle}
                                    onPress={() => {
                                        if (!this.input.checkForError()) {
                                            this.setState({ modalVisible: false });
                                            if (this.state.onOkClick) {
                                                this.state.onOkClick(this.state.inputValue)
                                            }
                                        }
                                    }}
                                >{this.state.okTitle || "Ok"}</Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        height: height,
        width: width
    },
    alertContainer: {
        backgroundColor: WHITE,
        width: width - 80,
        alignSelf: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 3,
        maxHeight: 500
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BLACK,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 10
    },
    message: {
        fontSize: 16,
        fontWeight: '400',
        color: BLACK,
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    vwHorizonSeparator: {
        height: 2,
        backgroundColor: 'lightgray',
        marginTop: 10
    },
    vwButtons: {
        flexDirection: 'row',
    },
    btnContainerStyle: {
        justifyContent: 'center',
        flex: 1
    },
    btnStyle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'blue',
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: 5
    },
    vwVerticalSeparator: {
        width: 2,
        backgroundColor: 'lightgray',
        // marginVertical: 10,
    }
});