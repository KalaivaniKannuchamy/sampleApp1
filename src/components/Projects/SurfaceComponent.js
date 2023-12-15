import React, { Children } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { Surface } from 'react-native-paper';
import { BLACK } from '../../lib/colors';

const width = Dimensions.get('screen').width

const SurfaceComponent = (props) => {
    const {children, style} = props;

    return (
        <Surface  style={[styles.Surface,style]}>
          {children}
        </Surface>
    );
};

const styles = StyleSheet.create({
    Surface: {
        flex:1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin : 5,
        elevation: 4,
        shadowColor: BLACK
    }
});

export default SurfaceComponent;
