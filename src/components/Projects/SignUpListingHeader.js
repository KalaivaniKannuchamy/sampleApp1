import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../../components/common';
import { ALERT_BUTTON_COLOR, GREEN, GREY_TEXT_COLOR, IN_VOICE, LIGHT_GREEN, LIGHT_ORANGE, LIGHT_RED, PLACEHOLDER, RED, } from '../../lib/colors';
import BlackSubTitle from './BlackSubTitle';
import GreySmallTitle from './GreySmallTitle';
import AppIconButton from './AppIconButton';
import DaysComponent from './DaysComponent';
import AppStrings from '../../lib/AppStrings';
import { MEDIUM } from '../../lib/FontFamily';

const width = Dimensions.get('screen').width

const SignUpListingHeader = (props) => {
    const { topViewStyle, noOfDays, containerStyle, dontShowIcon, size, showCustomIcon, onIconPress, iconColor, icon, title, editPress, subTitle, deletePress, numberOfLines, textStyle, subTitleStyle, line, due_date_based_on, status, editIcon, noIcon,color } = props;

    return (
        <View style={containerStyle}>
            <View style={styles.mainView}>
                <BlackSubTitle
                    text={title}
                    TextStyle={[styles.textStyle, textStyle]}
                    numberOfLines={line ? line : 2}
                />
                {showCustomIcon ?
                    <View style={[styles.topView, topViewStyle]}>
                        {
                            status ?
                                <>
                                    <Text
                                        fontWeight={MEDIUM}
                                        style={[styles.advance,
                                        {
                                            color: due_date_based_on == AppStrings.screens.purchaseOrder.open ? GREEN :
                                                due_date_based_on == AppStrings.screens.purchaseOrder.closed ? RED :
                                                    IN_VOICE
                                        },
                                        {
                                            backgroundColor: due_date_based_on == AppStrings.screens.purchaseOrder.open ? LIGHT_GREEN :
                                                due_date_based_on == AppStrings.screens.purchaseOrder.closed ? LIGHT_RED :
                                                    LIGHT_ORANGE
                                        }
                                        ]}>
                                        {due_date_based_on == "" || due_date_based_on == null ? ""
                                            :
                                            due_date_based_on}</Text>
                                </>
                                : null
                        }
                        {
                            noOfDays ?
                                <DaysComponent
                                    noOfDays={noOfDays}
                                />
                                : null
                        }

                        <AppIconButton
                            icon={icon}
                            onPress={onIconPress}
                            color={iconColor}
                            size={size}
                        />
                    </View>
                    :
                    !dontShowIcon ?
                        <View style={styles.topView}>
                            <AppIconButton
                                icon={editIcon ? editIcon : "pencil"}
                                onPress={() => { editPress() }}
                                color={color?color:PLACEHOLDER}
                                size={20}
                            />
                            {noIcon
                                ?
                                null
                                :
                                <AppIconButton
                                    icon={"delete"}
                                    onPress={() => { deletePress() }}
                                    color={PLACEHOLDER}
                                    size={20}
                                />
                            }
                            {/* <TouchableOpacity onPress={() => { editPress() }}>
                                <Icon name="edit" size={20} color={PLACEHOLDER} style={styles.edit} />
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity onPress={() => { deletePress() }}>
                                <Icon name="delete" size={20} color={PLACEHOLDER} style={styles.delete} />
                            </TouchableOpacity> */}
                        </View>
                        :
                        status ?
                            <View style={{ position: 'absolute', right: 10, paddingTop: 0 }}>
                                <Text
                                    fontWeight={MEDIUM}
                                    style={[styles.advance,
                                    {
                                        color: due_date_based_on == AppStrings.screens.purchaseOrder.open ? GREEN :
                                            due_date_based_on == AppStrings.screens.purchaseOrder.closed ? RED :
                                                IN_VOICE
                                    },
                                    {
                                        backgroundColor: due_date_based_on == AppStrings.screens.purchaseOrder.open ? LIGHT_GREEN :
                                            due_date_based_on == AppStrings.screens.purchaseOrder.closed ? LIGHT_RED :
                                                LIGHT_ORANGE
                                    }
                                    ]}>
                                    {due_date_based_on == "" || due_date_based_on == null ? ""
                                        :
                                        due_date_based_on}</Text>
                            </View>
                            :
                            null
                }

            </View>
            {
                subTitle ?
                    <GreySmallTitle
                        text={subTitle}
                        numberOfLines={numberOfLines ? numberOfLines : 1}
                        TextStyle={[styles.subTitle, subTitleStyle]}
                    />
                    :
                    null
            }

        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    BoldText: {
        fontSize: 15,
        color: GREY_TEXT_COLOR,
        letterSpacing: 1
    },
    subTitle: {
        marginTop: 5
    },
    textStyle: {
        alignItems: 'center',
        marginTop: 5,
        width: "65%",
    },
    topView: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0
    },
    edit: {
        marginRight: 5,
        padding: 5
    },
    delete: {
        padding: 5
    },
    advance: {
        fontSize: 12,
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 3,
    },
});

export default SignUpListingHeader;
