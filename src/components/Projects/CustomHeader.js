import React from 'react';
import { StyleSheet,TouchableOpacity } from 'react-native'
import Images from '../../lib/Images';
import { View,Text,Image } from '../common'
import Icon from 'react-native-vector-icons/Entypo'
import AppIconButton from './AppIconButton';
import { PLACEHOLDER } from '../../lib/colors';
import { BOLD } from '../../lib/FontFamily';
import { DynamicFontSize } from '../../lib/globalFunctions';

const CustomHeader = ({text,icon,onPress,notification,filter}) => {
    return (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TouchableOpacity style={{width:50}} onPress={() => {onPress() }}>
                <Icon name={icon} color={PLACEHOLDER} size={25} />
            </TouchableOpacity>
            <Text fontWeight={BOLD} style={{fontSize: DynamicFontSize(16)}}>{text}</Text>
            <View style={{width:70,flexDirection:'row'}}>
                <AppIconButton
                // icon={notification}
                icon={({ size, color }) => (
                    <Image
                      source={Images.ic_dashboard}
                      style={{ width: 20, height: 20, tintColor: color }}
                    />
                )}
                />
                {/* <AppIconButton
                 icon={({ size, color }) => (
                    <Image
                      source={Images.ic_dashboard}
                      style={{ width: 20, height: 20, tintColor: color }}
                    />
                )}
                /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default CustomHeader;