/* eslint-disable no-undef */
/** 
 * Created by Eswar Sairam on 24/09/20
 **/

import React, { Component } from 'react';
import { StyleSheet, Animated, Dimensions, Platform, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Picker as ReactPicker } from '@react-native-community/picker';
import Text from '../Text';
import Button from '../Button';
import View from '../View';
import { BLACK, PRIMARY, WHITE } from '../../../lib/colors';
import PickerItem from './PickerItem';
import PropTypes from 'prop-types';

var { width, height } = Dimensions.get('window');

export default class Picker extends Component {

    constructor() {
        super();
        this.slideValue = new Animated.Value(0)
        this.state =  {
            isAnimate: false,
            selectedValue: null,
            arrPicker: [],
            prevSelectedIndex: null,
        }
    }

    static defaultProps = {
        selectedColor: "",
        iosNativePicker: true,
        keyVal: "",
        pickerData: [],
        selectedVal: "",
        isCancelled: null,
        isDone: null,
        children: React.createElement('div')
    }

    static propTypes = {
        selectedColor: PropTypes.string,
        iosNativePicker: PropTypes.bool,
        keyVal: PropTypes.string,
        pickerData: PropTypes.array,
        selectedVal: PropTypes.string,
        isCancelled: PropTypes.func,
        isDone: PropTypes.func,
        children: PropTypes.element
    }
    

    animate() {
        Animated.timing(this.slideValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    showPicker() {
        // console.log("pickerData", this.props.keyVal)
        return <ReactPicker
            mode='dialog'
            selectedValue={this.state.selectedValue ? this.state.selectedValue[0] : this.props.selectedVal}
            itemStyle={{ color: 'black' }}
            style={{ height: 50, width: width - (Platform.OS == 'ios' ? 0 : 30), marginTop: 0, marginLeft: 0 }}
            onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedValue: [this.props.pickerData[itemIndex][this.props.keyVal], itemIndex] })
                // console.log([this.props.pickerData[itemIndex][this.props.keyVal]])
                if (Platform.OS === 'android') {
                    this.props.isDone([this.props.pickerData[itemIndex][this.props.keyVal], itemIndex])
                }
            }}
        >
            {this.props.pickerData != null ? Object.keys(this.props.pickerData).map((key) => {
                return (<ReactPicker.Item label={this.props.pickerData[key][this.props.keyVal]} value={this.props.pickerData[key][this.props.keyVal]} key={key} />)
            }) : <ReactPicker.Item label="No Data" value="PV" />}
        </ReactPicker>
    }

    iosVw() {
        return <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ flex: 1 }}>
                <Animated.View style={{
                    transform: [
                        {
                            translateY: this.slideValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, height - 300]
                            })
                        }
                    ],
                    flex: 1,
                    height: 200,
                    width: Dimensions.get('screen').width,
                    backgroundColor: 'white',
                    justifyContent: "center"
                }}>
                    <View style={styles.iosPickerContaine}>
                        <View style={styles.vwPickerBtns}>
                            <Button mode='text' style={styles.pickerBtnsContainer} titleStyle={styles.pickerBtns} onPress={() => {
                                this.setState({ isAnimate: false })
                                if (this.props.isDone) {
                                    this.props.isDone(this.state.selectedValue == null ? (this.props.pickerData != null ? [this.props.pickerData[0][this.props.keyVal], 0] : ["", 0]) : this.state.selectedValue)
                                }
                            }} >Done</Button>
                            <Text style={{ alignSelf: 'center' }}>Select Option</Text>
                            <Button mode='text' style={styles.pickerBtnsContainer} titleStyle={styles.pickerBtns} onPress={() => {
                                this.setState({ isAnimate: false })
                                if (this.props.isCancelled) {
                                    this.props.isCancelled()
                                }
                            }} >Cancel</Button>
                        </View>
                        {this.showPicker()}
                    </View>
                </Animated.View>
                {this.animate()}
            </View>
        </View>
    }

    androidVw() {
        return (
            <TouchableOpacity
            activeOpacity={1}
             onPress={() => {
                this.setState({ isAnimate: false })
                if (this.props.isCancelled) {
                    this.props.isCancelled()
                }
            }}>
                <View style={androidStyle.container}>

                    <View style={androidStyle.alertContainer}>
                        <FlatList
                            data={this.state.arrPicker}
                            renderItem={({ item, index }) => {
                                return (
                                    <PickerItem item={item} keyVal={this.props.keyVal} selectedColor={this.props.selectedColor || PRIMARY} didSelect={() => {
                                        let arrTemp = [...this.state.arrPicker]
                                        arrTemp[index]["selected"] = true
                                        if (this.state.prevSelectedIndex != null) {
                                            arrTemp[this.state.prevSelectedIndex]["selected"] = false
                                        }
                                        this.setState({ arrPicker: arrTemp, prevSelectedIndex: index })
                                    }} />
                                )
                            }}
                        />
                        <View style={androidStyle.vwHorizonSeparator} />
                        <View style={androidStyle.vwButtons}>
                            <Button style={androidStyle.btnContainerStyle} titleStyle={androidStyle.btnStyle}
                                onPress={() => {
                                    this.setState({ isAnimate: false })
                                    if (this.props.isCancelled) {
                                        this.props.isCancelled()
                                    }
                                }}
                            >Cancel</Button>
                            <View style={androidStyle.vwVerticalSeparator} />
                            <Button style={androidStyle.btnContainerStyle} titleStyle={androidStyle.btnStyle}
                                onPress={() => {
                                    const index = this.state.arrPicker.findIndex((data) => {
                                        return data.selected
                                    })
                                    if ((index != null) && (index > 0 || index == 0)) {
                                        if (this.props.isDone) {
                                            this.props.isDone([this.state.arrPicker[index][this.props.keyVal], 0])
                                        }
                                    }
                                    this.setState({ isAnimate: false })
                                }}
                            >Done</Button>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let canShowiOSPicker = true
        const { selectedVal, iosNativePicker, keyVal } = this.props
        if (iosNativePicker != null) {
            canShowiOSPicker = iosNativePicker
        }
        return (
            <View>
                <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if (this.props.pickerData) {
                        let arrTemp = [...this.props.pickerData]
                        let index;
                        for (let i in arrTemp) {
                            if (selectedVal) {
                                if (arrTemp[i][keyVal] == selectedVal) {
                                    arrTemp[i]["selected"] = true
                                    index = i
                                } else {
                                    arrTemp[i]["selected"] = false
                                }
                            } else {
                                arrTemp[i]["selected"] = false
                            }
                        }
                        this.setState({ arrPicker: arrTemp, prevSelectedIndex: index })
                    }
                    this.setState({ isAnimate: true })
                }}>
                    <View>
                        {this.props.children}
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType={canShowiOSPicker ? 'slide' : 'fade'}
                    transparent={true}
                    visible={this.state.isAnimate}
                    onRequestClose={() => {
                    }}>
                    <View style={styles.overlay}>
                        {Platform.OS == 'android' || !canShowiOSPicker ? this.androidVw() : this.iosVw()}
                    </View>
                </Modal>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        width: width
    },
    pickerDoneStyle: {
        alignContent: 'flex-start',
        borderColor: BLACK,
        borderWidth: 2
    },
    vwPickerBtns: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(235, 235, 235, 0.5)',
        height: 45,
        alignContent: 'center'
    },
    pickerBtns: {
        color: BLACK,
        fontSize: 16,
        justifyContent: 'center',
    },
    pickerBtnsContainer: {
        justifyContent: 'center'
    },
    iosPickerContaine: {
        flex: 1
    },
    pickerButtonVw: {
        flexDirection: 'row',
    }
});

const androidStyle = StyleSheet.create({
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
        maxHeight: 500,
        paddingVertical: 5,
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
        color: BLACK,
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: 5
    },
    vwVerticalSeparator: {
        width: 2,
        backgroundColor: 'lightgray',
        // marginVertical: 10,
    }
})