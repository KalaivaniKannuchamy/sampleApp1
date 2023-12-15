import React from 'react';
import { StyleSheet, ViewPropTypes, View, Text } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import { DynamicFontSize } from '../../lib/globalFunctions';
import { REGULAR } from '../../lib/FontFamily';
import { SECONDARY, PRIMARY, WHITE } from '../../lib/colors';
import PropTypes from 'prop-types';
import NavigationHeaderText from '../Projects/NavigationHeaderText';
const NavigationBarHeader = ({ title, titleStyle, headerStyle, scene, previous, navigation, leftIcons, leftIconPressed, rightIcons, rightIconPressed, theme, disableShadow, alignTitleleft }) => {

    const nonShadowHeader = { elevation: 0, shadowOpacity: 0 };
    let iconSize = 24
    console.log("previous ===", previous)
    const getMarginLeft = () => {
        let marginLeft = 0
        let marginRight = 0
        if (!alignTitleleft) {
            if (rightIcons.length > 0) {
                marginLeft = (rightIcons.length * iconSize) + (rightIcons.length * 20)
                if (leftIcons.length > 0) {
                    marginLeft = marginLeft - ((leftIcons.length * iconSize) + (leftIcons.length * 20))
                } else if (previous != null) {
                    marginLeft = marginLeft - iconSize
                }
            }
            if (leftIcons.length > 0) {
                marginRight = (leftIcons.length * iconSize) + (leftIcons.length * 20)
                if (rightIcons.length > 0) {
                    marginRight = marginRight - ((rightIcons.length * iconSize) + (rightIcons.length * 20))
                } else if (previous != null) {
                    marginRight = marginRight - iconSize
                }
            }
        }
        if (marginLeft > marginRight) {
            return { marginLeft }
        }
        return { marginRight }
    }

    const getScreenTitle = () => {

        return "title"
    }

    const getRightButtons = () => {
        let btns = [];
        for (const [index, value] of rightIcons.entries()) {
            btns.push(
                <Appbar.Action size={iconSize} key={index} icon={value} onPress={() => {
                    rightIconPressed(index)
                }} />
            )
        }
        return btns;
    }

    const getLeftButtons = () => {
        let btns = [];
        for (const [index, value] of leftIcons.entries()) {
            btns.push(
                <Appbar.Action size={iconSize} key={index} icon={value} onPress={() => {
                    leftIconPressed(index)
                }} />
            )
        }
        return btns;
    }

    return (
        <>
            <Appbar.Header style={{ backgroundColor: WHITE }}>
                {
                    previous != null ? (
                        <Appbar.BackAction onPress={navigation.goBack} color={SECONDARY} />
                    ) : null
            }
                {/* <NavigationHeaderText text={'title'} /> */}
                <Appbar.Content title="My awesome app" />
            {getRightButtons()}
        </Appbar.Header>
            <View style={{ height: .4, backgroundColor: 'gray' }}>
            </View>
        </>

    )

}

NavigationBarHeader.propTypes = {
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    headerStyle: ViewPropTypes.style,
    scene: PropTypes.object,
    previous: PropTypes.any,
    navigation: PropTypes.any,
    rightIcons: PropTypes.array,
    rightIconPressed: PropTypes.func,
    leftIcons: PropTypes.array,
    leftIconPressed: PropTypes.func,
    theme: PropTypes.object,
    disableShadow: PropTypes.bool,
    alignTitleleft: PropTypes.bool
}

NavigationBarHeader.defaultProps = {
    rightIcons: [],
    leftIcons: [],
    alignTitleleft: false
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: WHITE,
    },
    titleContent: {
        flex: 1,
    },
    title: {
        fontSize: DynamicFontSize(20),
        textAlign: 'center',
        color: SECONDARY
    },

});

export default withTheme(NavigationBarHeader);