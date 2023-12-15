import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  View,
  Input,
  WSCall,
  Hud,
  Alert,
  Image,
  Text,
} from "../../../components/common";
import SurfaceComponent from "../../../components/Projects/SurfaceComponent";
import {
  BLACK,
  INPUT_BG_COLOR,
  PRIMARY_BUTTON,
  COMPLETED_CLR,
  WHITE,
  ALERT_BUTTON_COLOR,
  PLACEHOLDER,
  NEW_FLASHED_BLUE,
  GRAY_COLOR,
} from "../../../lib/colors";
import PrimaryButton from "../../../components/Projects/PrimaryButton";
import Images from "../../../lib/Images";
import { BOLD, MEDIUM, REGULAR, SEMIBOLD } from "../../../lib/FontFamily";
import BackIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomAlert from "../../../components/Projects/CustomAlert";
import AppStrings from "../../../lib/AppStrings";
import { DynamicFontSize } from "../../../lib/globalFunctions";
import { isTablet } from "react-native-device-info";
import { TextInput as PaperInput } from "react-native-paper";

const ForgetPasswordScreen = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFrom, setIsFrom] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertPress, setAlertPress] = useState("");
  const [masterId, setMasterId] = useState("");
  const windowHeight = useWindowDimensions().height;
  const custom_alert = useRef();
  useEffect(() => {
    console.log("isfrom", isFrom);
    props.route.params ? setIsFrom(props.route.params.isFrom) : null;
  }, []);
  const refs = {};
  const verifyCredentials = () => {
    var isValid = true;
    if (refs["emailTxt"].checkForError()) {
      isValid = false;
    }
    return isValid;
  };
  const cleanAlertData = () => {
    setShowAlert(false);
    setAlertPress("");
  };
  const callVerifyEmailApi = async () => {
    setLoading(true);
    var inputParams = {
      email: email,
      method: "prospect_vendor_validate_email",
      third_party_platform: AppStrings.VendorPortal,
      lang_id: "EN",
    };
    var inputParamsForForget = {
      email: email,
      method: "forgot_password_for_vendor",
      third_party_platform: AppStrings.VendorPortal,
      lang_id: "EN",
    };

    WSCall.getResponse(
      "",
      isFrom == "forgotPasword" ? inputParamsForForget : inputParams,
      "post",
      (response, error) => {
        setLoading(false);
        console.log("OTPResponse---->", response, error);
        if (response != null && response.settings != null) {
          console.log("OTPResponse---->", response);
          if (response.settings.success == "1") {
            setAlertPress("forgot");
            setShowAlert(true);
            isFrom == "forgotPasword"
              ? setMasterId(response.data[0].otp_master_id)
              : setMasterId("");
            custom_alert.current?.alertWithAction(
              "sucess",
              response.settings.message,
              "Ok"
            );
            // Alert.alertWithAction('', response.settings.message, '', 'Ok', () => {

            // })
            console.log("response", response.data);
          } else {
            setAlertPress("");
            setShowAlert(true);
            custom_alert.current?.simpleAlert(
              "alert",
              response.settings.message
            );
            // Alert.simpleAlert("", response.settings.message)
          }
        } else {
          setAlertPress("");
          setShowAlert(true);
          custom_alert.current?.simpleAlert("alert", AppStrings.serverError);
        }
      },
      (progress) => {}
    );
  };

  return (
    <View style={styles.container} requiredSafeArea>
      <KeyboardAwareScrollView
        style={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={"dark-content"}
        />
        {/* windowHeight*0.2  : windowHeight*0.12 */}
        <View style={[styles.elevation, { marginTop: isTablet() ? 10 : 10 }]}>
          <View style={styles.innerView}>
            <Image
              source={Images.lockimage}
              resizeMode="contain"
              style={styles.spalshlogo}
            />
            {/* <View style={styles.view}>
                            <View style={styles.yellowView} />
                            <Text fontWeight={BOLD} style={[styles.splashText]}>{AppStrings.screens.thankyou.Vendor} <Text fontWeight={REGULAR} style={[styles.splashText, { color: BLACK }]}>{AppStrings.screens.thankyou.Portal}</Text></Text>
                            <View style={styles.yellowView} />
                        </View> */}
          </View>
          <View style={styles.startextView}>
            <Text
              fontWeight={SEMIBOLD}
              dynamicLines={true}
              style={[styles.splashText]}
            >
              {`Forgot \nPassword?`}
            </Text>
            <Text style={[styles.smalltext]}>
              No worries, we'll send you reset instructions.
            </Text>
          </View>

          <Input
            ref={(ref) => {
              refs["emailTxt"] = ref;
            }}
            label={"Email"}
            InputStyle={styles.InputStyle}
            returnKeyType={"next"}
            placeholder={"ex. johnedeo123@gmail.com"}
            //   titleIcon={'person'}
            type={"email"}
            isLastFeild={true}
            compulsary={false}
            value={email.trim()}
            rightIcon={
              <PaperInput.Icon
                name="email-outline"
                size={20}
                color={PLACEHOLDER}
                style={styles.iconStyle}
              />
            }
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <PrimaryButton
            text="Submit"
            buttonStyle={{ width: "100%" }}
            buttonColor={NEW_FLASHED_BLUE}
            onPress={() => {
              if (verifyCredentials()) {
                callVerifyEmailApi();
              }
            }}
          />
          <View style={styles.bottomStyle}>
            <TouchableOpacity
              style={styles.bottomView}
              onPress={async () => {
                props.navigation.goBack();
              }}
            >
              <BackIcon
                name={"keyboard-backspace"}
                color={GRAY_COLOR}
                size={24}
              />
              <Text style={styles.backButton}>Back to </Text>
              <Text fontWeight={BOLD} style={styles.bottomText}>
                Login
              </Text>
            </TouchableOpacity>

            <View style={styles.splashContainer}>
              <Image
                source={Images.newvendoricon}
                resizeMode="contain"
                style={{ width: 180, height: 80, marginVertical: 10 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Hud visible={loading} />
      <CustomAlert
        ref={custom_alert}
        show={showAlert}
        okPress={() => {
          switch (alertPress) {
            case "forgot":
              isFrom == "forgotPasword"
                ? props.navigation.navigate("OtpVerification", {
                    otp_master_id: masterId,
                    isFrom: isFrom,
                  })
                : props.navigation.navigate("OtpVerification", {
                    email: email,
                  });
              cleanAlertData();
              break;
            default:
              cleanAlertData();
          }
        }}
        cancelPress={() => {
          switch (alertPress) {
            case "forgot":
              cleanAlertData();
              break;
            default:
              cleanAlertData();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: WHITE,
    paddingTop: Platform.OS == "android" ? 10 : 0,
  },
  InputStyle: {
    backgroundColor: "#F3F3F3",
  },
  spalshlogo: {
    height: 145,
    width: 145,
  },
  innerView: {
    alignItems: "center",
  },
  elevation: {
    width: isTablet() ? "65%" : "90%",
    alignSelf: "center",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
  yellowView: {
    backgroundColor: COMPLETED_CLR,
    height: 20,
    width: "29%",
  },
  splashText: {
    fontSize: DynamicFontSize(36),
    letterSpacing: 0,
    color: BLACK,
    fontWeight: "600",
  },
  smalltext: {
    fontSize: 14,
    lineHeight: 24,
    marginTop: 5,
    fontWeight: "400",
    color: BLACK,
    marginBottom: 30,
  },
  startextView: {
    // backgroundColor:'red'
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  backButton: {
    fontSize: DynamicFontSize(16),
    color: GRAY_COLOR,
    alignSelf: "center",
    marginLeft: 5,
  },
  bottomText: {
    fontSize: DynamicFontSize(16),
    color: ALERT_BUTTON_COLOR,
    alignSelf: "center",
    // marginTop:30
  },
  splashContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomStyle: {
    marginTop: 60,
  },
});

export default ForgetPasswordScreen;
