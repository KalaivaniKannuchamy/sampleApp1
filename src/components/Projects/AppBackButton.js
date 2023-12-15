import * as React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import { PLACEHOLDER } from '../../lib/colors'
import AppIconButton from './AppIconButton';

const AppBackButton = ({ icon, onPress }) => (
    <AppIconButton
        icon={'keyboard-backspace'}
        onPress={onPress}
        style={{ marginLeft: -15 }}
    />
);

export default AppBackButton;