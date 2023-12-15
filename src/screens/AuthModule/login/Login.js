import { StackActions } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
} from "react-native";
import {
  View,
  Text,
  Input,
  Hud,
  AsyncStorage,
  WSCall,
  Alert,
} from "../../../components/common";
import ImageButton from "../../../components/common/ImageButton";
import ImageWithText from "../../../components/Projects/ImageWithText";
import SurfaceComponent from "../../../components/Projects/SurfaceComponent";
import {
  ALERT_BUTTON_COLOR,
  BLACK,
  COMPLETED_CLR,
  GRAY_COLOR,
  GREY_TEXT_COLOR,
  INPUT_BG_COLOR,
  NEW_FLASHED_BLUE,
  PLACEHOLDER,
  PRIMARY_BUTTON,
  RED,
  WHITE,
} from "../../../lib/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BOLD, MEDIUM, REGULAR, SEMIBOLD } from "../../../lib/FontFamily";
import PrimaryButton from "../../../components/Projects/PrimaryButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorageKeys from "../../../lib/AsyncStorageKeys";
import AppIconButton from "../../../components/Projects/AppIconButton";
import CustomAlert from "../../../components/Projects/CustomAlert";
import Strings from "../../../lib/AppStrings";
import { TextInput as PaperInput } from "react-native-paper";
import { deviceUniqueId, DynamicFontSize } from "../../../lib/globalFunctions";
import { isTablet } from "react-native-device-info";
import Images from "../../../lib/Images";
const Login = (props) => {
  const [checked, setchecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const custom_alert = useRef();
  const refs = {};

  useEffect(() => {
    // (
    //     async()=>{
    //       let emailData= await  AsyncStorage.getData(AsyncStorageKeys.user_name)
    //       let passwordData =await AsyncStorage.getData(AsyncStorageKeys.user_password )
    //       emailData == "" ? setUserName(""):(setUserName(emailData),setchecked(true))
    //       passwordData == "" ? setPassword(""):setPassword((passwordData),setchecked(true))
    //         // ? setEmail(""):setEmail(email))
    //         //  AsyncStorage.getData(AsyncStorageKeys.user_password = ''? setPassword(""):setPassword(password))
    //     }
    // )()
  }, []);

  const callLoginApi = async () => {
    Keyboard.dismiss();
    setShowLoader(true);
    const token = await AsyncStorage.getData(AsyncStorageKeys.token);
    var inputParams = {
      email_address: userName,
      password: password,
      device_type: Platform.OS == "android" ? "Android" : "Ios",
      device_token: token,
      method: "authenticate_user",
      third_party_platform: Strings.VendorPortal,
      lang_id: "EN",
    };
    console.log("inputParams----", inputParams);

    WSCall.getResponse("", inputParams, "get", (response, error) => {
      // console.log("inputParams inner----", inputParams);
      // console.log('error===================',error);
      // console.log('respnse===================',response);
      if (response != null && response.settings) {
        if (response.settings.success == 1) {
          setShowLoader(false);
          console.log(
            "response",
            response.data,
            response.data.token_info[0].auth_token
          );
          AsyncStorage.saveData(
            AsyncStorageKeys.userAccessToken,
            response.data.token_info[0].auth_token
          );
          AsyncStorage.saveData(AsyncStorageKeys.is_Login, "true");
          if (checked == true) {
            AsyncStorage.saveData(AsyncStorageKeys.user_name, userName);
            AsyncStorage.saveData(AsyncStorageKeys.user_password, password);
            //AsyncStorage.saveData(AsyncStorageKeys.localData,JSON.stringify(response.data.get_user_data[0]))
            // console.log("response---", response);
            // console.log('respnse===================',response);
          }
          if (checked == false) {
            AsyncStorage.saveData(AsyncStorageKeys.user_name, "");
            AsyncStorage.saveData(AsyncStorageKeys.user_password, "");
            // console.log('email===================',checked,userName, password);
          }
          AsyncStorage.saveData(
            AsyncStorageKeys.localData,
            JSON.stringify(response.data.get_user_data[0])
          );
          const resetActions = StackActions.replace("drawer");
          props.navigation.dispatch(resetActions);
        } else if (response.settings.success == "0") {
          setShowAlert(true);
          custom_alert.current?.simpleAlert("alert", response.settings.message);
          setShowLoader(false);
        } else {
          setShowLoader(false);
        }
      } else {
        setShowLoader(false);
        setShowAlert(true);
        custom_alert.current?.simpleAlert("alert", Strings.serverError);
      }
    });
  };

  const verifyCredentials = () => {
    var isValid = true;
    if (refs["mobileTxt"].checkForError()) {
      isValid = false;
    }
    if (password.trim().length == 0) {
      isValid = false;
      setPasswordError("Please enter password");
    }

    return isValid;
  };

  const cleanAlertData = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.container} requiredSafeArea>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        style={{ paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={"dark-content"}
        />
        <View style={styles.mainView}>
          <View style={styles.splashContainer}>
            <Image
              source={Images.newlogo}
              resizeMode="cover"
              style={styles.newlogoStyle}
            />
          </View>

          <View style={styles.elevatedVw}>
            <View style={styles.startextView}>
              <Text
                fontWeight={SEMIBOLD}
                dynamicLines={true}
                style={[styles.splashText]}
              >
                {`Get Started \nNow`}
              </Text>
              <Text style={[styles.smalltext]}>
                Enter your details to access your account
              </Text>
            </View>

            <Input
              ref={(ref) => {
                refs["mobileTxt"] = ref;
              }}
              label={"Email"}
              returnKeyType={"next"}
              // titleIcon={'person'}
              containerStyle={{ marginBottom: 5 }}
              type="email"
              compulsary={false}
              placeholder={"ex. johnedeo123@gmail.com"}
              InputStyle={styles.InputStyle}
              rightIcon={
                <PaperInput.Icon
                  name="email-outline"
                  size={20}
                  color={PLACEHOLDER}
                  style={styles.iconStyle}
                />
              }
              value={userName.trim()}
              onChangeText={(text) => {
                setUserName(text);
              }}
              onSubmitEditing={() => {
                refs["paswordTxt"].focus();
              }}
            />
            <Input
              ref={(ref) => {
                refs["paswordTxt"] = ref;
              }}
              InputStyle={styles.InputStyle}
              isLastFeild={true}
              label={"Password"}
              type="password"
              placeholder={"***********"}
              secureTextEntry={!showPassword}
              // titleIcon={'lock'}
              compulsary={false}
              value={password}
              checkForErrorToShow={false}
              onSubmitEditing={() => {
                if (verifyCredentials()) {
                  callLoginApi();
                }
              }}
              rightIcon={
                showPassword ? (
                  <PaperInput.Icon
                    name="eye-outline"
                    size={20}
                    color={PLACEHOLDER}
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconStyle}
                  />
                ) : (
                  <PaperInput.Icon
                    name="eye-off-outline"
                    size={20}
                    color={PLACEHOLDER}
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconStyle}
                  />
                )
              }
              onChangeText={(text) => {
                setPassword(text),
                  text.length > 0 ? setPasswordError("") : null;
              }}
            />
            {passwordError != "" ? (
              <Text
                fontWeight={REGULAR}
                dynamicLines={true}
                style={styles.errorMsg}
              >
                {passwordError}
              </Text>
            ) : null}
            <View style={styles.rowView}>
              <View style={styles.checkeBox}>
                {/* {
                                    checked === true ? <TouchableOpacity onPress={() => { console.log("checked1", checked), setchecked(!checked) }}>
                                        <AppIconButton icon="checkbox-marked" color={PRIMARY_BUTTON} />
                                    </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => { console.log("checked2", checked), setchecked(!checked) }}>
                                            <AppIconButton icon="checkbox-blank-outline" color={PLACEHOLDER} />
                                        </TouchableOpacity>
                                }

                                <Text onPress={() => { console.log("checked2", checked), setchecked(!checked) }} style={{ marginLeft: 5, fontSize: DynamicFontSize(14), color: BLACK }}>Remember me</Text> */}
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("ForgetPassword", {
                    isFrom: "forgotPasword",
                  })
                }
              >
                <Text fontWeight={MEDIUM} style={styles.forgot}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <PrimaryButton
              text="Log in"
              buttonStyle={{ width: "100%" }}
              onPress={() => {
                if (verifyCredentials()) {
                  callLoginApi();
                }
              }}
            />
          </View>
          {/* <PrimaryButton text="Verify Data"
                        buttonStyle={{
                            width: 150,
                            height: 40
                        }}
                        onPress={() => {
                            props.navigation.navigate('EmailVerification')
                            // if (verifyCredentials()) {
                            //     callLoginApi()
                            // }
                        }} /> */}
          <TouchableOpacity
            style={styles.bottomView}
            onPress={async () => {
              AsyncStorage.saveData(AsyncStorageKeys.SignUpBasic, "");
              AsyncStorage.saveData(AsyncStorageKeys.contact_info, "");
              AsyncStorage.saveData(AsyncStorageKeys.address_info, "");
              AsyncStorage.saveData(AsyncStorageKeys.tax_info, "");
              AsyncStorage.saveData(AsyncStorageKeys.bank_info, "");
              AsyncStorage.saveData(AsyncStorageKeys.dcouments_info, "");

              props.navigation.navigate("signUpBasicDetail");
            }}
          >
            <Text fontWeight={SEMIBOLD} style={styles.bottomText}>
              Create Account?
            </Text>
            <Text style={styles.signupButton}>Signup here</Text>
          </TouchableOpacity>

          <View style={styles.splashContainer}>
            <Image
              source={Images.newvendoricon}
              resizeMode="contain"
              style={{ width: 180, height: 80, marginVertical: 10 }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <CustomAlert
        ref={custom_alert}
        show={showAlert}
        okPress={() => {
          cleanAlertData();
        }}
        cancelPress={() => {
          cleanAlertData();
        }}
      />

      <Hud visible={showLoader} />
    </View>
  );
};

const styles = StyleSheet.create({
  elevatedVw: {
    marginHorizontal: 10,
  },
  InputStyle: {
    backgroundColor: "#F3F3F3",
  },
  bottomText: {
    fontSize: DynamicFontSize(18),
    color: NEW_FLASHED_BLUE,
    alignSelf: "center",
    // marginTop:30
  },
  signupButton: {
    fontSize: DynamicFontSize(16),
    color: BLACK,
    alignSelf: "center",
    marginLeft: 5,
  },

  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  checkeBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorMsg: {
    color: RED,
    fontSize: DynamicFontSize(12),
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: Platform.OS == "android" ? 10 : 0,
  },
  forgot: {
    fontSize: DynamicFontSize(14),
    color: GRAY_COLOR,
  },
  mainView: {
    alignSelf: "center",
    marginTop: isTablet() ? 150 : 20,
    width: isTablet() ? "70%" : "95%",
  },
  splashContainer: {
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 10
  },
  splashText: {
    fontSize: 36,
    letterSpacing: 0,
    marginTop: 5,
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
  newlogoStyle: {
    width: 145,
    height: 145,
  },
});

export default Login;
