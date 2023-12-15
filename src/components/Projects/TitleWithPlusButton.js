import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../../components/common';
import { GREEN, PRIMARY_BUTTON, WHITE } from '../../lib/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import GreyHeaderText from './GreyHeaderText';
import { BOLD, MEDIUM } from '../../lib/FontFamily';

const TitleWithPlusButton = (props) => {
    const { text, onButtonPress, titieStyle, hideButton } = props;

    return (
        <View style={styles.container}>
            <GreyHeaderText TextStyle={titieStyle} text={text} />
            {
                !hideButton ?

                    <TouchableOpacity style={styles.touchStyle} onPress={onButtonPress}>
                        <Icon name={"plus"} size={17} color={WHITE} />
                        <Text fontWeight={MEDIUM} style={styles.addTxt}> Add</Text>
                    </TouchableOpacity>
                    :
                    null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    touchStyle: {
        backgroundColor: PRIMARY_BUTTON,
        // height: 38,
        // width: 38,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'center',
        marginRight:8
    },
    addTxt: {
        color: WHITE,
        paddingRight: 5,
    }
});

export default TitleWithPlusButton;
