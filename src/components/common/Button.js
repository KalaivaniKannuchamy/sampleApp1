/** 
 * Created by Eswar Sairam on 17/09/20
 * In thi class it requires 3 inputs. 
 * 1) mode(outined,text, contained) is button mode which is paper button property .
 * 2) titleStyle is the style given to button title style.
 * 3) (...rest) other one properties of the Button for the properties you check https://callstack.github.io/react-native-paper/button.html.
 **/

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button as PaperButton, withTheme } from 'react-native-paper';
import { BLACK } from '../../lib/colors';
import { DynamicFontSize } from '../../lib/globalFunctions';
import PropTypes from 'prop-types';
import { REGULAR } from '../../lib/FontFamily';

const Button = ({ mode, theme, fontWeight, titleStyle, ...rest }) => {

    const customizeStyle = () => {
        let finalStyle = titleStyle
        if (finalStyle && finalStyle.fontSize) {
            finalStyle.fontSize = DynamicFontSize(finalStyle.fontSize)
        }
        return finalStyle
    }

    return (
        <PaperButton
            uppercase={false}
            labelStyle={[styles.defaultStyle, customizeStyle(), theme.fonts[fontWeight]]}
            mode={mode}
            {...rest}
        />
    )
}

Button.propTypes = {
    mode: PropTypes.string,
    titleStyle: Text.propTypes.style,
    theme: PropTypes.object,
    fontWeight: PropTypes.string
}

Button.defaultProps = {
    mode: 'text',
    fontWeight: REGULAR
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: DynamicFontSize(16),
        color: BLACK
    }
})

export default withTheme(Button);