/** 
 * Created by Eswar Sairam on 17/09/20
 * In thi class it requires 2 inputs. One is style and (...rest) other one properties of the text.
 * 1) style is the style given to text title style.
 * 2) (...rest) other one properties of the Button for the properties you check https://callstack.github.io/react-native-paper/text.html.
 **/

import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { Text as PaperText, withTheme } from 'react-native-paper';
import { BLACK } from '../../lib/colors';
import { DynamicFontSize } from '../../lib/globalFunctions';
import PropTypes from 'prop-types';
import { REGULAR } from '../../lib/FontFamily';

const Text = ({ style,theme, fontWeight,dynamicLines,numberoflines, ...rest }) => {

    const customizeStyle = () => {
        let finalStyle = style
        // if (finalStyle && finalStyle.fontSize) {
        //     finalStyle.fontSize = DynamicFontSize(finalStyle.fontSize, 'yes')
        // }
        return finalStyle
    }

    return (
        <PaperText
            style={[styles.defaultStyle, customizeStyle(), theme.fonts[fontWeight]]}
            numberOfLines={ dynamicLines ? null : numberoflines > 1 ? numberoflines : 1}
            {...rest}
        />
    )
}

Text.propTypes = {
    style: RNText.propTypes.style,
    theme: PropTypes.object,
    fontWeight: PropTypes.string
}

Text.defaultProps = {
    fontWeight: REGULAR
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: 16,
        color: BLACK
    }
})

export default withTheme(Text);