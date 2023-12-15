import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import { View, Text, Flatlist } from '../../components/common';
import { BLACK, GREY_TEXT_COLOR, PLACEHOLDER, PRIMARY_BUTTON, WHITE } from '../../lib/colors';
import SignUpListingHeader from './SignUpListingHeader';
import SurfaceComponent from './SurfaceComponent';
import GreySmallTitle from './GreySmallTitle';
import LottieView from 'lottie-react-native';

import AppIconButton from './AppIconButton';
import NoData from './NoData';
import { isTablet } from 'react-native-device-info';
import { ActivityIndicator } from 'react-native-paper';
const width = Dimensions.get('screen').width

const DashBoardPendingComponent = (props) => {
    const { data, onEyePress, onVechiclePress, onIconPress, showLoader } = props;

    var useWidth = useWindowDimensions().width
    console.log(' useWindowDimensions().width--->', useWindowDimensions().width)
    return (
        <SurfaceComponent style={{ paddingHorizontal: 0 }}>
            <SignUpListingHeader
                title={"Pending Delivery Plan"}
                showCustomIcon={true}
                icon={'refresh'}
                size={20}
                onIconPress={onIconPress}
                topViewStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
                textStyle={{ marginLeft: 10 }}

            />
            {
                showLoader ?
                <ActivityIndicator size="small" style={styles.lottieStyle} color={PRIMARY_BUTTON}/>
                    // <LottieView
                    //     style={styles.lottieStyle}
                    //     autoPlay={true}
                    //     loop={true}
                    //     source={require('../../lib/loader-mrs.json')}
                    //     onAnimationFinish={() => {
                    //         // startshowTxet()
                    //     }}
                    // ></LottieView>
                    :
                    <>
                        <View style={styles.InnerContainer}>
                            <View style={styles.greyViewStyle}>
                                <GreySmallTitle
                                    text={"Company"}
                                    TextStyle={{ width: '37%', color: WHITE }}
                                />
                                <GreySmallTitle
                                    text={"PO#"}
                                    TextStyle={{ width: '8%', color: WHITE, }}
                                />
                                <GreySmallTitle
                                    text={"Date"}
                                    TextStyle={{
                                        width: '10%',
                                        color: WHITE,
                                        textAlign: 'center',
                                        flex: 1,
                                        marginLeft: isTablet() ? 0 : useWidth < 375 ? 30 : 0,
                                        // backgroundColor: 'red'
                                    }}
                                />
                                <GreySmallTitle
                                    text={"Line Item"}
                                    TextStyle={{ width: '15%', marginRight: 5, color: WHITE, fontSize: 11.5 }}
                                />
                                <GreySmallTitle
                                    text={"Action"}
                                    TextStyle={{ color: WHITE }}
                                />
                            </View>

                        </View>

                        <Flatlist
                            data={data}
                            style={{ marginTop: 5 }}
                            ItemSeparatorComponent={() => { return <View style={styles.seperatorStyle} /> }}
                            renderItem={({ item, index }) => {
                                return (
                                    <>
                                        <View style={styles.flatListContainer}>
                                            <Text style={[styles.count, { width: '35%', marginRight: 5, color: GREY_TEXT_COLOR }]}>{item.company_name}</Text>
                                            <Text style={[styles.count, { width: '22%' }]}>{item.voucher_code}</Text>
                                            <Text style={[styles.count, { width: '24%' }]}>{item.voucher_date}</Text>
                                            <Text style={[styles.count, { width: '7%' }]} >{item.line_item}</Text>
                                            <View style={{
                                                position: 'absolute',
                                                right: 10,
                                                flexDirection: 'row',
                                                alignSelf: 'flex-end'
                                            }}>
                                                {

                                                    item.requisition_status_enum && item.requisition_status_enum !== "GEN_2105_1033_100002" ?


                                                        <AppIconButton
                                                            icon={'truck'}
                                                            size={15}
                                                            onPress={() => { onVechiclePress(item) }}
                                                        />
                                                        :
                                                        null}
                                                <AppIconButton
                                                    icon={'eye'}
                                                    size={15}
                                                    onPress={() => {
                                                        onEyePress(item)
                                                    }}
                                                />

                                            </View>
                                        </View>
                                    </>

                                )
                            }}
                            NoDataComponent={<NoData style={styles.noDataStyle} />}
                        />


                    </>
            }




        </SurfaceComponent>
    );
};

const styles = StyleSheet.create({

    divider: {
        backgroundColor: PLACEHOLDER,
        marginVertical: 10
    },
    viewStyle: {
        flexDirection: 'row'
    },
    textStyle: {
        width: width * 0.23,
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flatListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2

    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    InnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#C1C6D0',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10
    },
    text: {
        fontSize: 12,
        marginLeft: 5
    },
    pcstyles: {
        marginLeft: 5,
        letterSpacing: 0,
        fontSize: 12,
    },
    del_on: {
        marginLeft: 5,
        letterSpacing: 0,
        fontSize: 10
    },
    date: {
        marginLeft: 5,
        letterSpacing: 0,
        fontSize: 12
    },
    textStyleaddress: {
        fontSize: 15,
        color: BLACK,
        letterSpacing: 0,
    },
    count: {
        fontSize: 12
    },
    quality: {
        fontSize: 10,
        letterSpacing: 0
    },
    deliveryAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        // marginLeft:5 
    },
    greyViewStyle: {
        flexDirection: 'row'
    },
    seperatorStyle: {
        borderTopColor: "#F3F3F4",
        borderTopWidth: 1,
        marginVertical: 5,
        width: '100%',
        height: 0.2
    },
    listNodata: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    lottieStyle: {
        height: 20,
        width: 20,
        marginVertical: 20,
        justifyContent: "center",
        alignSelf: "center",
    },
    noDataStyle: {
        marginTop: "10%", marginBottom: "10%"
    },
});

export default DashBoardPendingComponent;
