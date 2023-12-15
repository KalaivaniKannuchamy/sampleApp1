/** 
 * Created by Eswar Sairam on 23/09/20
 **/

import React from 'react'
import { Dimensions, StyleSheet, ViewPropTypes } from 'react-native';
import ReactPicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import View from './View';
import Text from './Text';
import { RED, SEPARATOR, PLACEHOLDER } from '../../lib/colors';
import { DynamicFontSize } from '../../lib/globalFunctions';
import PropTypes from 'prop-types';

const DatePicker = ({
    containerStyle,
    titleStyle,
    title,
    placeholder,
    enable,
    errorMsg,
    mode,
    format,
    dateIconStyle,
    dateInputStyle,
    dateTouchBodyStyle,
    dateTextStyle,
    placeholderTextStyle,
    ...rest
}) => {

    const width = containerStyle ? containerStyle.width : Dimensions.get('screen').width - 50

    return (
        <View pointerEvents={enable == false ? 'none' : 'auto'} style={[styles.defaultContainerStyle, containerStyle]}>
            <Text style={[styles.defaultTitleStyle, titleStyle]} numberOfLines={1}>{title}</Text>
            <ReactPicker
                iconComponent={<Icon size={15} color='gray' name="arrow-down" />}
                className="date-picker"
                popperClassName="drv-datepicker-popper"
                style={{ width: 200 }}
                mode={mode || "date"}
                placeholder={placeholder || "Choose Date"}
                format={format || "YYYY-MM-DD"}
                confirmBtnText="Done"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon:
                        [{
                            position: 'relative',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        }, dateIconStyle]
                    ,
                    dateInput: [{
                        borderWidth: 0,
                        alignItems: 'flex-start',
                    }, dateInputStyle],
                    dateTouchBody: [{
                        width: width,
                        justifyContent: 'space-between',
                    }, dateTouchBodyStyle],
                    dateText: [{
                        color: 'black',
                        fontSize: DynamicFontSize(16),
                    }, dateTextStyle],
                    btnTextConfirm: {
                        color: 'black',
                        fontSize: DynamicFontSize(18)
                    },
                    btnTextCancel: {
                        color: 'black',
                        fontSize: DynamicFontSize(18)
                    },
                    placeholderText: [{
                        color: PLACEHOLDER,
                        fontSize: DynamicFontSize(16),
                    }, placeholderTextStyle]

                }}
                {...rest}
            />
            <View style={[styles.vwErrorMsg, { backgroundColor: (errorMsg && errorMsg.length > 0) ? RED : SEPARATOR, width: width }]} />
            {(errorMsg && errorMsg.length > 0) ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
        </View>
    )
}

DatePicker.propTypes = {
    containerStyle: ViewPropTypes.style,
    titleStyle: ViewPropTypes.style,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    enable: PropTypes.bool,
    errorMsg: PropTypes.string,
    mode: PropTypes.string,
    format: PropTypes.string,
    dateIconStyle: ViewPropTypes.style,
    dateInputStyle: ViewPropTypes.style,
    dateTouchBodyStyle: ViewPropTypes.style,
    dateTextStyle: ViewPropTypes.style,
    placeholderTextStyle: ViewPropTypes.style,
}

const styles = StyleSheet.create({
    defaultContainerStyle: {
        marginHorizontal: 10,
        marginBottom: 10
    },
    defaultTitleStyle: {
        color: PLACEHOLDER,
        fontSize: DynamicFontSize(16),
        marginVertical: 10
    },
    vwErrorMsg: {
        height: 1,
        marginTop: 5,
    },
    errorMsg: {
        color: RED,
        fontSize: DynamicFontSize(12),
        marginTop: 5
    }
})

export default DatePicker;
