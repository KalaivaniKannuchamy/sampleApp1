import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, StatusBar, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  AsyncStorage,
  Flatlist,
  WSCall,
  Hud,
} from "../../components/common";
import {
  APP_WHITE,
  GREEN,
  IN_VOICE,
  WHITE,
  ALERT_BUTTON_COLOR,
  MENU_GROUND,
  COMPLETED_CLR,
  RED,
  PRIMARY_BUTTON,
} from "../../lib/colors";
import CustomAlert from "../../components/Projects/CustomAlert";
import NavigationHeaderText from "../../components/Projects/NavigationHeaderText";
import AppIconButton from "../../components/Projects/AppIconButton";
import { useFocusEffect } from "@react-navigation/native";
import Strings from "../../lib/AppStrings";
import AsyncStorageKeys from "../../lib/AsyncStorageKeys";
import Images from "../../lib/Images";
import SignUpListingHeader from "../../components/Projects/SignUpListingHeader";
import { Dimensions } from "react-native";
import TitleWithValue from "../../components/Projects/TitleWithValue";
import ImageWithCount from "../../components/Projects/ImageWithCount";
import NoData from "../../components/Projects/NoData";
import GreyHeaderText from "../../components/Projects/GreyHeaderText";
import PieChart from "react-native-pie-chart";
import SurfaceComponent from "../../components/Projects/SurfaceComponent";
import DashBoardPendingComponent from "../../components/Projects/DashBoardPendingComponent";
import { ActivityIndicator, Divider } from "react-native-paper";
import GreySmallTitle from "../../components/Projects/GreySmallTitle";
import LottieView from "lottie-react-native";
import { proposal, purchase, quotaion } from "../../lib/globalConstants";
import DashBoardUpcommingPayment from "../../components/Projects/DashBoardUpcommingPayment";
import { DynamicFontSize } from "../../lib/globalFunctions";
import { isTablet } from "react-native-device-info";

const width = Dimensions.get("screen").width;
const DashboardScreen = (props) => {
  const [proposalData, setProposalData] = useState(proposal);
  const [quotationData, setQuotationData] = useState(quotaion);
  const [purchaseData, setPurchaseData] = useState(purchase);
  const [summaryData, setSummaryData] = useState(null);
  const [headerData, setHeaderData] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  const [upCommingData, setUpCommingData] = useState([]);
  const [seriesChart, setSeriesChart] = useState([1]);
  const [pendingLoader, setPendingloader] = useState(false);
  const [upcommingloader, setUpcommingloader] = useState(false);
  const [proposalLoader, setProposalLoader] = useState(false);
  const [quotationLoader, setQuotationLoader] = useState(false);
  const [purchaseOrderLoader, setPurchaseOrderLoader] = useState(false);
  const [isAllVAlueZero, setIsAllVAlueZero] = useState(false);
  const widthAndHeight = isTablet() ? 250 : 130;
  // const seriesChart = [1, 0, 8, 1, 1]
  const sliceColor = [
    ALERT_BUTTON_COLOR,
    MENU_GROUND,
    COMPLETED_CLR,
    GREEN,
    RED,
  ];
  const custom_alert = useRef();
  useEffect(() => {
    callUpdateToken();
    handleLocalData();
    callDashboardSummary();
    callProposalHorziontalApi();
    callQuotationHorzontalApi();
    callPurchaseHorzontalApi();
    callPurchaseListingApi();
    callUpcommingPaymentApi();
  }, []);
  const handleLocalData = async () => {
    const headerDetails = JSON.parse(
      await AsyncStorage.getData(AsyncStorageKeys.localData)
    );
    console.log("side menu----->", headerDetails);
    if (headerDetails != "") {
      setHeaderData(headerDetails);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        // You can await here
        await AsyncStorage.saveData(
          AsyncStorageKeys.screenName,
          Strings.sidemenu.deskboard
        ); // ...
        //let userToken =  await AsyncStorage.getData(AsyncStorageKeys.userAccessToken)
      }

      fetchData();
    }, [])
  );

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => <NavigationHeaderText text={"DashBoard"} />,
      headerRight: () => (
        <View style={styles.right}>
          <AppIconButton
            icon={Strings.icons.bell}
            onPress={() => {
              // props.navigation.navigate(Strings.drawer.notification, { isFromIcon: true }
              // )
            }}
          />
        </View>
      ),
      headerLeft: () => (
        <AppIconButton
          icon={Strings.icons.menu}
          style={{}}
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      ),
    });
  }, [props.navigation]);

  const callUpdateToken = async () => {
    // setLoading(true)
    const token = await AsyncStorage.getData(AsyncStorageKeys.token);
    var inputParams = {
      device_type: Platform.OS == "android" ? "Android" : "Ios",
      device_token: token,
      method: "update_device_token",
      third_party_platform: Strings.VendorPortal,
      lang_id: "EN",
    };
    console.log("inputParams->", inputParams);
    WSCall.getResponse("", inputParams, "get", (response, error) => {
      // setLoading(false)
      console.log("response------->", response);
      if (response != null && response.settings != null) {
        if (response.settings.success == "1") {
        } else {
        }
      } else {
        // setLoading(false)
        // setAlertPress('')
        setShowAlert(true);
        custom_alert.current?.simpleAlert("alert", Strings.serverError);
      }
    });
  };
  const callProposalHorziontalApi = async (
    update,
    screenType,
    selectedType
  ) => {
    setProposalLoader(true);
    var inputParams = {
      voucher_type: "GEN_2011_1016_100008",
      method: Strings.apiName.vendor_proposal_statistics_count,
      third_party_platform: Strings.VendorPortal,
      lang_id: Strings.EN,
    };
    console.log("propsposal", inputParams);
    WSCall.getResponse("", inputParams, "get", (response, error) => {
      console.log("propsposalresponse", response, error);
      if (response != null && response.settings != null) {
        if (response.settings.success == "1") {
          setProposalLoader(false);
          let data = [...proposalData];
          data.forEach((elem, index) => {
            if (elem.id == "1") {
              data[index]["count"] = response.data.total_new_request;
            }
            if (elem.id == "2") {
              data[index]["count"] = response.data.total_queried;
            }
            if (elem.id == "3") {
              data[index]["count"] = response.data.total_responded;
            }
            if (elem.id == "4") {
              data[index]["count"] = response.data.total_win;
            }
            if (elem.id == "5") {
              data[index]["count"] = response.data.total_nagotiable;
            }
          });
          console.log("setProposalData", data);
          setProposalData(data);
        } else {
          setShowAlert(true);
          custom_alert.current?.simpleAlert("alert", response.settings.message);
        }
      } else {
        setShowAlert(true);
        custom_alert.current?.simpleAlert("alert", Strings.serverError);
      }
      setProposalLoader(false);
    });
  };

  const callQuotationHorzontalApi = async () => {
    setQuotationLoader(true);
    var inputParams = {
      voucher_type: "GEN_2011_1016_100009",
      method: Strings.apiName.vendor_proposal_statistics_count,
      third_party_platform: Strings.VendorPortal,
      lang_id: Strings.EN,
    };
    console.log("GEN_2011_1016_100009------------------->", inputParams);
    WSCall.getResponse("", inputParams, "get", (response, error) => {
      console.log("GEN_2011_1016_100009------------------->", response);
      if (response != null && response.settings != null) {
        if (response.settings.success == "1") {
          setQuotationLoader(false);

          let data = [...quotationData];
          data.forEach((elem, index) => {
            if (elem.id == "1") {
              data[index]["count"] = response.data.total_new_request;
            }
            if (elem.id == "2") {
              data[index]["count"] = response.data.total_queried;
            }
            if (elem.id == "3") {
              data[index]["count"] = response.data.total_responded;
            }
            if (elem.id == "4") {
              data[index]["count"] = response.data.total_win;
            }
            if (elem.id == "5") {
              data[index]["count"] = response.data.total_nagotiable;
            }
          });
          console.log("setQuotationData", data);
          setQuotationData(data);
        } else {
          setShowAlert(true);
          custom_alert.current?.simpleAlert("alert", response.settings.message);
        }
      } else {
        setShowAlert(true);
        custom_alert.current?.simpleAlert("alert", Strings.serverError);
      }
      setQuotationLoader(false);
    });
  };
  const callPurchaseHorzontalApi = async () => {
    let isAllZero = false;
    setSeriesChart([1]);
    setPurchaseOrderLoader(true);
    var inputParams = {
      method: "vendor_po_statistics_count",
      third_party_platform: Strings.VendorPortal,
      lang_id: Strings.EN,
    };

    WSCall.getResponse("", inputParams, "get", (response, error) => {
      if (response != null && response.settings != null) {
        console.log("callPurchaseHorzontalApi------------------->", response);
        if (response.settings.success == "1") {
          setPurchaseOrderLoader(false);
          let data = [...purchaseData];
          let count = [];
          // let count = []
          data.forEach((elem, index) => {
            if (elem.id == "1") {
              data[index]["count"] = response.data.new_request;
            }
            if (elem.id == "2") {
              data[index]["count"] = response.data.pending_plan;
            }
            if (elem.id == "3") {
              data[index]["count"] = response.data.pending_delivery;
            }
            if (elem.id == "4") {
              data[index]["count"] = response.data.delivered;
            }
            if (elem.id == "5") {
              data[index]["count"] = response.data.cancelled;
            }
          });

          data.forEach((elem, index) => {
            count.push(elem.count);
          });

          if (count.reduce((a, b) => a + b) === 0) {
            console.log(
              " count.reduce((a, b) => a+b",
              count.reduce((a, b) => a + b)
            );
            setIsAllVAlueZero(true);
            setSeriesChart([]);
          } else {
            console.log(" djhgj");
            setIsAllVAlueZero(false);
            setSeriesChart(count);
          }

          console.log("countcount", count);

          setPurchaseData(data);
        } else {
          setShowAlert(true);
          custom_alert.current?.simpleAlert("alert", response.settings.message);
        }
      } else {
        setShowAlert(true);
        custom_alert.current?.simpleAlert("alert", Strings.serverError);
      }
      setPurchaseOrderLoader(false);
    });
  };

  const callDashboardSummary = () => {
    // setLoading(true)
    var inputParams = {
      method: "dashboard_po_amount_summary",
      third_party_platform: Strings.VendorPortal,
      lang_id: "EN",
    };
    console.log("completed_po completed_po inputParams", inputParams);
    WSCall.getResponse("", inputParams, "get", (response, error) => {
      // setLoading(false)
      if (response != null && response.settings != null) {
        if (response.settings.success == "1") {
          console.log("completed_po completed_po1", response.data[0]);
          setSummaryData(response.data[0]);
        } else {
          console.log("completed_po completed_po2");
          setShowAlert(true);
          custom_alert.current?.simpleAlert("alert", response.settings.message);
        }
      } else {
        console.log("completed_po completed_po3");
        setShowAlert(true);
        custom_alert.current?.simpleAlert("alert", Strings.serverError);
      }
    });
  };

  /// LIST Purchage
  const callPurchaseListingApi = async () => {
    setPendingloader(true);
    var inputParams = {
      method: "vendor_voucher_list",
      third_party_platform: Strings.VendorPortal,
      lang_id: "EN",
      tab_code: "pending_delivery",
      voucher_type: "GEN_2011_1016_100002,GEN_2011_1016_100014",
      record_limit: "10",
    };

    WSCall.getResponse("", inputParams, "get", (response, error) => {
      if (response != null && response.settings != null) {
        if (response.settings.success == "1") {
          setPendingloader(false);
          setPendingData(response.data);
        } else {
          console.log("else");
        }
      } else {
        console.log("else");
      }
    });
  };
  const callUpcommingPaymentApi = async () => {
    setUpcommingloader(true);
    var inputParams = {
      method: "vendor_upcoming_payments",
      third_party_platform: Strings.VendorPortal,
      lang_id: "EN",
      record_limit: "10",
    };

    WSCall.getResponse("", inputParams, "get", (response, error) => {
      console.log("callUpcommingPaymentApi ", response);
      setUpcommingloader(false);
      if (response != null && response.settings != null) {
        if (response.settings.success == "1") {
          setUpCommingData(response.data);
        } else {
          console.log("else");
        }
      } else {
        console.log("else");
      }
    });
  };

  const handleRefresh = () => {
    // callPurchaseListingApi()
  };
  const callPurchaseDetailApi = async (item) => {
    var inputParams = {
      voucher_id: item.sys_voucher_id,
      method: "vendor_voucher_detail",
      third_party_platform: Strings.VendorPortal,
      lang_id: "EN",
    };

    WSCall.getResponse("", inputParams, "get", async (response, error) => {
      console.log("vendor_voucher_detail->", JSON.stringify(response));
      if (response != null && response.settings != null) {
        if (response.settings.success == "1") {
          await AsyncStorage.saveData(
            AsyncStorageKeys.purchase_header,
            JSON.stringify(item)
          );
        } else {
        }
      } else {
      }
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{}} showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={"dark-content"}
        />
        <TitleWithValue
          titleStyle={{ fontSize: DynamicFontSize(14) }}
          subtextStyle={{ fontSize: DynamicFontSize(16) }}
          containerStyle={styles.containerStyle}
          HeaderTitle="Welcome"
          numberOfLines={1}
          subHeaderTitle={headerData.admin_name}
        />
        <View style={styles.summaryView}>
          {summaryData ? (
            <>
              <View style={styles.purchase}>
                <Image source={Images.ic_purchase_order} />
                <SignUpListingHeader
                  containerStyle={{ marginLeft: 5 }}
                  line={1}
                  dontShowIcon={true}
                  title={summaryData ? summaryData.total_amount_thousand : ""}
                  textStyle={styles.textStyle}
                  subTitle={"Purchase Orders"}
                  subTitleStyle={styles.subTitleStyle}
                />
              </View>

              <View style={styles.delivered}>
                <Image source={Images.ic_completed} />
                <SignUpListingHeader
                  dontShowIcon={true}
                  containerStyle={{ marginLeft: 5 }}
                  title={`${
                    !summaryData ||
                    summaryData.completed_po_in_percentage == "nan"
                      ? 0
                      : parseFloat(
                          summaryData.completed_po_in_percentage
                        ).toFixed(2)
                  }% `}
                  line={1}
                  textStyle={[styles.textStyle, { color: GREEN }]}
                  subTitle={"Delivered"}
                  subTitleStyle={styles.subTitleStyle}
                />
              </View>
              <View style={styles.delivered}>
                <Image source={Images.ic_incomplete} />
                <SignUpListingHeader
                  dontShowIcon={true}
                  containerStyle={{ marginLeft: 5 }}
                  title={`${
                    !summaryData ||
                    summaryData.pending_po_in_percentage == "nan"
                      ? 0
                      : parseFloat(
                          summaryData.pending_po_in_percentage
                        ).toFixed(2)
                  }%`}
                  line={1}
                  textStyle={[styles.textStyle, { color: IN_VOICE }]}
                  subTitle={"Pending"}
                  subTitleStyle={styles.subTitleStyle}
                />
              </View>
            </>
          ) : null}
        </View>

        <View style={styles.HeadingView}>
          <GreyHeaderText text="PROPOSALS" TextStyle={styles.title} />

          <View style={styles.refreshView}>
            <SignUpListingHeader
              showCustomIcon={true}
              icon={"refresh"}
              size={20}
              // title={'Purchase orders'}
              onIconPress={() => {
                callProposalHorziontalApi();
              }}
              topViewStyle={{ alignItems: "center" }}
            />
          </View>
        </View>
        {proposalLoader ? (
          <ActivityIndicator
            size="small"
            style={styles.lottieStyle}
            color={PRIMARY_BUTTON}
          />
        ) : (
          // <LottieView
          //     style={styles.lottieStyle}
          //     autoPlay={true}
          //     loop={true}
          //     source={require('../../lib/loader-mrs.json')}
          //     onAnimationFinish={() => {
          //         // startshowTxet()
          //     }}
          // ></LottieView>
          <Flatlist
            horizontal
            data={proposalData}
            style={styles.horizontalData}
            ListFooterComponent={() => {
              return <View style={styles.separtaor} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <ImageWithCount
                  index={index}
                  item={item}
                  onPress={() => {
                    AsyncStorage.saveData(AsyncStorageKeys.quotaion, ""),
                      AsyncStorage.saveData(AsyncStorageKeys.query, "");
                    AsyncStorage.saveData(
                      AsyncStorageKeys.is_selection,
                      "true"
                    );
                    // props.navigation.navigate(Strings.drawer.proposal, {
                    //   screen: 'ProposalsScreen',
                    //   params: {
                    //     is_root: 'dashboard',
                    //     Selection: item.tab_params,
                    //     id: item.id,
                    //   },
                    // });
                  }}
                  images={item.image}
                  text={item.request}
                  number={item.count}
                />
              );
            }}
            NoDataComponent={<NoData />}
          />
        )}

        <View style={styles.HeadingView}>
          <GreyHeaderText text="QUOTATIONS" TextStyle={styles.title} />

          <View style={styles.refreshView}>
            <SignUpListingHeader
              showCustomIcon={true}
              icon={"refresh"}
              size={20}
              // title={'Purchase orders'}
              onIconPress={() => {
                callQuotationHorzontalApi();
              }}
              topViewStyle={{ alignItems: "center" }}
            />
          </View>
        </View>

        {quotationLoader ? (
          <ActivityIndicator
            size="small"
            style={styles.lottieStyle}
            color={PRIMARY_BUTTON}
          />
        ) : (
          // <LottieView
          //     style={styles.lottieStyle}
          //     autoPlay={true}
          //     loop={true}
          //     source={require('../../lib/loader-mrs.json')}
          //     onAnimationFinish={() => {
          //         // startshowTxet()
          //     }}
          // ></LottieView>
          <Flatlist
            horizontal
            data={quotationData}
            style={styles.horizontalData}
            keyExtractor={(item, index) => item + index}
            ListFooterComponent={() => {
              return <View style={styles.separtaor} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <ImageWithCount
                  index={index}
                  item={item}
                  onPress={async () => {
                    await AsyncStorage.saveData(
                      AsyncStorageKeys.quotaion,
                      "quotation"
                    ),
                      await AsyncStorage.saveData(AsyncStorageKeys.query, "");

                    await AsyncStorage.saveData(
                      AsyncStorageKeys.is_selection,
                      "true"
                    );
                    // props.navigation.navigate(Strings.drawer.quotation, {
                    //   screen: 'QuotationScreen',
                    //   params: {
                    //     is_root: 'dashboard',
                    //     Selection: item.tab_params,
                    //     id: item.id,
                    //   },
                    // });
                  }}
                  images={item.image}
                  text={item.request}
                  number={item.count}
                />
              );
            }}
            NoDataComponent={<NoData />}
          />
        )}

        <View style={styles.HeadingView}>
          <GreyHeaderText text="PURCHASE ORDER" TextStyle={styles.title} />

          <View style={styles.refreshView}>
            <SignUpListingHeader
              showCustomIcon={true}
              icon={"refresh"}
              size={20}
              // title={'Purchase orders'}
              onIconPress={() => {
                callPurchaseHorzontalApi();
              }}
              topViewStyle={{ alignItems: "center" }}
            />
          </View>
        </View>

        {purchaseOrderLoader ? (
          <ActivityIndicator
            size="small"
            style={styles.lottieStyle}
            color={PRIMARY_BUTTON}
          />
        ) : (
          // <LottieView
          //     style={styles.lottieStyle}
          //     autoPlay={true}
          //     loop={true}
          //     source={require('../../lib/loader-mrs.json')}
          //     onAnimationFinish={() => {
          //         // startshowTxet()
          //     }}
          // ></LottieView>
          <Flatlist
            horizontal
            keyExtractor={(item, index) => item + index}
            data={purchaseData}
            style={styles.horizontalData}
            ListFooterComponent={() => {
              return <View style={styles.separtaor} />;
            }}
            renderItem={({ item, index }) => {
              return (
                <ImageWithCount
                  index={index}
                  item={item}
                  onPress={() => {
                    // props.navigation.navigate(Strings.drawer.purchase_order, {
                    //   screen: 'PurchaseScreen',
                    //   params: {
                    //     is_root: 'purchase',
                    //     tab_params: item.tab_params,
                    //     selectedIndex: index,
                    //   },
                    // });
                  }}
                  images={item.image}
                  text={item.request}
                  number={item.count}
                  fromPurchase
                />
              );
            }}
            NoDataComponent={<NoData />}
          />
        )}
        <DashBoardPendingComponent
          data={pendingData}
          showLoader={pendingLoader}
          onEyePress={(item) => {
            // props.navigation.navigate(Strings.drawer.purchase_order, {
            //   screen: 'PurchaseOrderDetail',
            //   params: {item: item},
            // });
          }}
          onVechiclePress={(item) => {
            // console.log('item-->',item)
            callPurchaseDetailApi(item);
          }}
          onIconPress={() => {
            callPurchaseListingApi();
          }}
        />

        <SurfaceComponent>
          <SignUpListingHeader
            showCustomIcon={true}
            icon={"refresh"}
            size={20}
            title={"Purchase orders"}
            onIconPress={() => {
              callPurchaseHorzontalApi();
            }}
            topViewStyle={{ alignItems: "center" }}
          />
          <Divider style={{ marginTop: 10 }} />
          <View
            style={[
              styles.chartVw,
              {
                justifyContent:
                  seriesChart.length == 1
                    ? "center"
                    : isTablet()
                    ? "space-around"
                    : "space-between",
              },
            ]}
          >
            {seriesChart.length == 1 ? (
              <ActivityIndicator
                size="small"
                style={styles.lottieStyle}
                color={PRIMARY_BUTTON}
              />
            ) : isAllVAlueZero === true ? (
              <NoData style={styles.noDataStyle} />
            ) : (
              <>
                {/* <PieChart data = {data} donut /> */}
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={seriesChart}
                  sliceColor={sliceColor}
                  doughnut={true}
                  coverRadius={isTablet() ? 0.5 : 0.45}
                  coverFill={"#FFF"}
                />
                <View>
                  {purchaseData.map((item, index) => {
                    return (
                      <View style={[styles.iconView, { marginBottom: 5 }]}>
                        <View style={styles.iconView}>
                          <GreySmallTitle
                            text={item.request}
                            TextStyle={{ marginHorizontal: 5 }}
                          />
                          <Image
                            source={Images.Union}
                            style={{
                              tintColor: sliceColor[index],
                              marginTop: 5,
                              // marginRight: 5,
                            }}
                          />
                        </View>

                        <GreySmallTitle
                          text={`${(
                            (parseInt(item.count) /
                              seriesChart.reduce(
                                (a, b) => parseInt(a) + parseInt(b)
                              )) *
                            100
                          ).toFixed(1)} %`}
                          TextStyle={{
                            marginRight: 5,
                            width: isTablet() ? 80 : 50,
                            textAlign: "right",
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>
        </SurfaceComponent>
        <DashBoardUpcommingPayment
          data={upCommingData}
          showLoader={upcommingloader}
          onIconPress={() => {
            callUpcommingPaymentApi();
          }}
        />
      </KeyboardAwareScrollView>
      <CustomAlert
        ref={custom_alert}
        show={showAlert}
        okPress={() => {
          setShowAlert(false);
        }}
        cancelPress={() => {
          setShowAlert(false);
        }}
      />
      <Hud visible={showLoader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    // marginTop: 20
  },
  right: {
    flexDirection: "row",
    marginRight: 0,
  },
  horizontalData: {
    paddingHorizontal: 15,
  },
  separtaor: {
    width: 20,
  },
  title: {
    marginTop: 15,
    paddingHorizontal: 15,
    width: "65%",
  },
  subTitleStyle: {
    fontSize: DynamicFontSize(10),
    marginTop: 2,
  },
  textStyle: {
    fontSize: DynamicFontSize(16),
    width: "95%",
  },
  purchase: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width * 0.28,
  },
  delivered: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width * 0.27,
  },
  summaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: WHITE,
    padding: 15,
    paddingTop: 0,
    marginHorizontal: 10,
  },
  containerStyle: {
    marginBottom: 15,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  chartVw: {
    flexDirection: "row",
    // justifyContent: 'space-between',
    alignItems: "center",
    padding: 20,
    paddingHorizontal: isTablet() ? 50 : 10,
  },
  iconView: {
    //backgroundColor :'red',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  lottieStyle: {
    height: 20,
    width: 20,
    marginVertical: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  noDataStyle: {
    marginTop: "10%",
    marginBottom: "10%",
  },

  HeadingView: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  refreshView: {
    width: "35%",
    paddingRight: 15,
    justifyContent: "flex-end",
  },
});

export default DashboardScreen;
