/** 
 * Created by Eswar Sairam on 24/09/20
 **/

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from '../View';
import Text from '../Text';
import { BLACK } from '../../../lib/colors';
import Icon from 'react-native-vector-icons/Fontisto';
import PropTypes from 'prop-types';

const PickerItem = ({ 
    item, 
    keyVal, 
    didSelect, 
    selectedColor }) => {
    const style = styles(item, selectedColor)
    return (
        <TouchableOpacity onPress={didSelect}>
            <View style={style.container}>
                <Icon size={15} style={style.icon} name={item.selected ? "radio-btn-active" : "radio-btn-passive"} />
                <Text style={style.titleStyle} >{item[keyVal]}</Text>
            </View>
        </TouchableOpacity>
    )
}

PickerItem.propTypes = {
    item: PropTypes.object.isRequired,
    keyVal: PropTypes.string.isRequired,
    didSelect: PropTypes.func.isRequired,
    selectedColor: PropTypes.string
}

const styles = (item, selectedColor) => StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row'
    },
    titleStyle: {
        color: item.selected ? selectedColor : BLACK,
        marginLeft: 10
    },
    icon: {
        color: item.selected ? selectedColor : BLACK,
        alignSelf: 'center'
    }
})

export default PickerItem;