import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { View, Text, Flatlist } from '../../components/common';
import { BLACK, GREY_TEXT_COLOR, PLACEHOLDER, PRIMARY_BUTTON, WHITE } from '../../lib/colors';
import SignUpListingHeader from './SignUpListingHeader';
import SurfaceComponent from './SurfaceComponent';
import GreySmallTitle from './GreySmallTitle';
import LottieView from 'lottie-react-native';
import NoData from './NoData';
import { ActivityIndicator } from 'react-native-paper';
const width = Dimensions.get('screen').width

const DashBoardUpcommingPayment = (props) => {

    const { data, showLoader, onIconPress } = props;


    return (
        <SurfaceComponent style={{ paddingHorizontal: 0 }}>
            <SignUpListingHeader
                title={"Upcoming Payments"}
                showCustomIcon={true}
                icon={'refresh'}
                size={20}
                onIconPress={onIconPress}
                topViewStyle={styles.topViewStyle}
                textStyle={{ marginLeft: 10 }}

            />
            {showLoader ?
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

                            <View style={styles.leftVw}>
                                <GreySmallTitle
                                    text={"Comapny"}
                                    TextStyle={{ width: '60%', color: WHITE }}
                                />
                                <GreySmallTitle
                                    text={"Plan Date#"}
                                    TextStyle={{ color: WHITE }}
                                />
                            </View>

                            <GreySmallTitle
                                text={"Amount"}
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
                                    <View style={styles.flatListContainer}>

                                        <View style={styles.leftVw}>
                                            <Text style={styles.dateStyle}>{item.company_name}</Text>
                                            <Text style={styles.count}>{item.payment_date}</Text>

                                        </View>
                                        <Text style={styles.count}>{item.voucher_amount}</Text>
                                    </View>

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
        justifyContent: 'space-between',
        paddingVertical: 2

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
    del_on: {
        marginLeft: 5,
        letterSpacing: 0,
        fontSize: 10
    },
    count: {
        fontSize: 12,

        //backgroundColor: 'red'
    },
    greyViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:'red',
        width: '100%'
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
        marginTop:"10%",marginBottom:"10%" 
    },
    dateStyle: {
        width: '70%',
        color: GREY_TEXT_COLOR,
        marginRight: 5,
        fontSize: 12
    },
    leftVw : {
         flexDirection: 'row',
         justifyContent : 'space-between',
         width: '65%',
         //backgroundColor : 'red' 
        },
    topViewStyle: { alignItems: 'center', paddingHorizontal: 10 }
});

export default DashBoardUpcommingPayment;
