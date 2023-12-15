import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { PLACEHOLDER } from '../../lib/colors'

const AppIconButton = ({ icon, style, onPress,color,size }) => (
    <IconButton
        icon={icon}
         animated={true}
        color={color ? color :PLACEHOLDER}
        size={size ? size : 25}
        style={[styles.iconStyle, style]}
        onPress={onPress}
    />
);
const styles = StyleSheet.create({
    iconStyle: {
        margin: 0
    }
})

export default AppIconButton;