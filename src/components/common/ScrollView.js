/** 
 * Created by Eswar Sairam on 21/09/20
 **/

import React from 'react';
import { ScrollView as ReactScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, StyleSheet, Dimensions, NativeModules, ViewPropTypes } from 'react-native';
import { APP_WHITE, WHITE } from '../../lib/colors';
import { isIphoneX } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

const ScrollView = ({ style, children, ...rest }) => {
    return (
        <KeyboardAvoidingView style={[styles.defaultStyle, style]} behavior={Platform.OS === 'android' ? "height" : "padding"} enabled >
            <TouchableWithoutFeedback >
                <ReactScrollView  style={styles.scrollVw}
                    keyboardShouldPersistTaps='always' {...rest} >
                    {children}
                </ReactScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

ScrollView.propTypes = {
    style: ViewPropTypes.style,
    children: PropTypes.element,
}

const styles = StyleSheet.create({
    defaultStyle: {
        flexGrow: 1,
        backgroundColor: APP_WHITE,
        // minHeight: Dimensions.get('window').height - (Platform.OS == 'ios' ? (isIphoneX() ? 78 : 20) : NativeModules.StatusBarManager.HEIGHT)
    },
    contentStyle: {
        paddingBottom: isIphoneX() ? 78 : 20,
    },
    scrollVw: {
        flex: 1
    }
})

export default ScrollView;