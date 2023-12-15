/** 
 * Created by Eswar Sairam on 01/10/20
 **/

import React from 'react';
import { Platform } from 'react-native';
import { DefaultTheme, Provider } from 'react-native-paper';
import { WHITE } from './colors';
import PropTypes from 'prop-types';

const ThemeProvider = ({ children }) => {

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: WHITE,
            accent: '#f1c40f',
        },
        dark: false,
        fonts: Platform.select({
            android: {
                regular: {
                    fontFamily: 'Inter-Regular',
                    fontWeight: 'normal'
                },
                bold: {
                    fontFamily: 'Inter-Bold',
                    fontWeight: 'bold'
                },
                medium: {
                    fontFamily: 'Inter-Medium',
                    fontWeight: '500'
                },
                light: {
                    fontFamily: 'Inter-Regular',
                    fontWeight: '300'
                },
                semibold: {
                    fontFamily: 'Inter-SemiBold',
                    fontWeight: '600'
                },
                thin: {
                    fontFamily: 'Inter-Thin',
                    fontWeight: '200'
                }
            },
            default: {
                bold: {
                    fontFamily: 'Inter-Bold',
                    fontWeight: 'bold'
                },
                regular: {
                    fontFamily: 'Inter-Regular',
                    fontWeight: 'normal'
                },
                semibold: {
                    fontFamily: 'Inter-SemiBold',
                    fontWeight: '600'
                },
                medium: {
                    fontFamily: 'Inter-Medium',
                    fontWeight: '500'
                },
                light: {
                    fontFamily: 'Inter-Light',
                    fontWeight: '300'
                },
                thin: {
                    fontFamily: 'Inter-Thin',
                    fontWeight: '200'
                }
            }
        })
    };

    return (
        <Provider theme={theme}>
            {children}
        </Provider>
    )

}

ThemeProvider.propTypes = {
    children: PropTypes.element
}

export default ThemeProvider;