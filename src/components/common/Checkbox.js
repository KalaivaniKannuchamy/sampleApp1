/** 
 * Created by Eswar Sairam on 01/10/20
**/

import React, { useState } from 'react';
import { StyleSheet, Text as RNText, TouchableOpacity } from 'react-native';
import { Checkbox as PaperCheckbox, withTheme } from 'react-native-paper';
import { BLACK, PRIMARY } from '../../lib/colors';
import { DynamicFontSize } from '../../lib/globalFunctions';
import PropTypes from 'prop-types';
import { REGULAR } from '../../lib/FontFamily';
import Text from './Text';

const Checkbox = ({ fontWeight, style, titleStyle, onValueChanged, selectedLabel, label, hideLabel, color, ...rest }) => {

    const [status, setStatus] = useState(false)

    const customizeStyle = () => {
        let finalStyle = titleStyle
        if (finalStyle && finalStyle.fontSize) {
            finalStyle.fontSize = DynamicFontSize(finalStyle.fontSize)
        }
        return finalStyle
    }

    const getLabel = () => {
        if (label != null && selectedLabel != null) {
            if (status) {
                return selectedLabel
            } else {
                return label
            }
        }
        return label
    }

    return (
        <TouchableOpacity style={[styles.vwCheckBox, style]} onPress={() => {
            setStatus(!status)
            if (onValueChanged) {
                onValueChanged(!status)
            }
        }}>
            {!hideLabel ? (
                <Text fontWeight={fontWeight} style={[styles.defaultStyle, customizeStyle()]}>{getLabel()}</Text>
            ) : null}
            <PaperCheckbox.Android
                status={status ? 'checked' : 'unchecked'}

                color={color}
                {...rest}
            />
        </TouchableOpacity>
    )
}

Checkbox.propTypes = {
    titleStyle: RNText.propTypes.style,
    style: RNText.propTypes.style,
    theme: PropTypes.object,
    fontWeight: PropTypes.string,
    onValueChanged: PropTypes.func,
    selectedLabel: PropTypes.string,
    label: PropTypes.string.isRequired,
    hideLabel: PropTypes.bool,
    color: PropTypes.string
}

Checkbox.defaultProps = {
    fontWeight: REGULAR,
    hideLabel: false,
    color: PRIMARY
}

const styles = StyleSheet.create({
    vwCheckBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    defaultStyle: {
        fontSize: DynamicFontSize(16),
        color: BLACK
    }
})

export default withTheme(Checkbox);