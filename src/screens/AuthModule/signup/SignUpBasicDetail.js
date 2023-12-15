import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import {
  COMPLETED_CLR,
  INPUT_BG_COLOR,
  BLACK,
  INPUT_TITTLE_COLOR,
  PLACEHOLDER,
  PRIMARY_BUTTON,
  RED,
  WHITE,
} from "../../../lib/colors";
import {
  View,
  Text,
  Input,
  AsyncStorage,
  Hud,
} from "../../../components/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";
import Flowstep from "../../../components/Projects/Flowstep";
import PopUpInput from "../../../components/Projects/PopUpInput";
import Strings from "../../../lib/AppStrings";
import GreyHeaderText from "../../../components/Projects/GreyHeaderText";
import InputDateSelection from "../../../components/Projects/InputDateSelection";
import InputWithSelection from "../../../components/Projects/InputWithSelection";
import PrimaryButton from "../../../components/Projects/PrimaryButton";
import DatePicker from "react-native-date-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";
import NavigationHeaderText from "../../../components/Projects/NavigationHeaderText";
import CustomSingleSelectionPicker from "../../../components/Projects/CustomSingleSelectionPicker";
import AsyncStorageKeys from "../../../lib/AsyncStorageKeys";
import { REGULAR } from "../../../lib/FontFamily";
import { useFocusEffect } from "@react-navigation/native";
import CustomMuiltiSelection from "../../../components/Projects/CustomMultiSelection";
import { DynamicFontSize } from "../../../lib/globalFunctions";
import PhoneSelection from "../../../components/Projects/PhoneSelection";

const screenWidth = Dimensions.get("window").width;

const SignUpBasicDetail = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      checkLocalData();
    }, [])
  );

  let phoneRegEx = /^[0-9]{7,15}$/;
  let WebRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  const [suppliesValue, setSuppliesValue] = useState("");
  //const [suppliesArr, setSuppliesArr] = useState([])
  const [businessName, setBusinessName] = useState("");
  const [venderName, setVenderName] = useState("");
  const [currency, setCurrency] = useState("");
  //const [currencyArr, setCurrencyArr] = useState([])
  const [date, setDate] = useState("");
  const [businessForm, setBusinessForm] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [email, setEmail] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [mobile, setMobile] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [country, setCountry] = useState({
    mc_country: "Nigeria",
    mc_country_code: "NG",
    mc_country_code_iso3: "NGA",
    mc_country_id: "155",
    mc_status: "Active",
  });
  //const [countryArr, setCountryArr] = useState([])
  const [popupApiName, setPopupApiName] = useState("");
  const [popupApiInputParams, setPopupApiInputParams] = useState("");
  const [popupDisplayKey, setPopupDisplayKey] = useState("");
  const [popupDisplayValue, setPopupDisplayValue] = useState("");
  const [popupAlertText, setPopupAlertText] = useState("");
  const [popupDisplayTitle, setPopupDisplayTitle] = useState("");
  const [popupErrorMsg, setPopupErrorMsg] = useState("");
  const [popupSelectedValue, setPopupSelectedValue] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [countryForFax, setCountryForFax] = useState({
    mc_country: "Nigeria",
    mc_country_code: "NG",
    mc_country_code_iso3: "NGA",
    mc_country_id: "155",
    mc_status: "Active",
  });
  const [dateSelection, setIsDateSelection] = useState(false);
  const [webError, setWebError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showMultiPopUp, setShowMultiPopUp] = useState(false);
  const businessNameRef = useRef();
  const venderNameRef = useRef();
  const webUrlRef = useRef();
  const emailRef = useRef();
  //const [, setShowPopUp] = useState(false)
  const [suppliesError, setSuppliesError] = useState("");
  const [currencyError, setCurrencyError] = useState("");
  const [dateError, setDateError] = useState("");
  const [formError, setFormError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [phoneValidate, setPhoneValidate] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [faxError, setFaxError] = useState("");

  const Validation = () => {
    var isValid = true;
    if (suppliesValue == "") {
      isValid = false;
      setSuppliesError("Please choose supplies");
    }

    if (businessNameRef.current?.checkForError()) {
      isValid = false;
      businessNameRef.current?.focus();
    }
    if (venderNameRef.current?.checkForError()) {
      (isValid = false), venderNameRef.current?.focus();
    }
    if (currency == "") {
      isValid = false;
      setCurrencyError("Please choose currency");
    }
    if (date == "") {
      isValid = false;
      setDateError("Please choose date");
    }
    if (businessType == "") {
      isValid = false;
      setTypeError("Please choose business type");
    }
    if (businessForm == "") {
      isValid = false;
      setFormError("Please choose business form");
    }
    if (emailRef.current?.checkForError()) {
      isValid = false;
    }

    if (mobileError === "" || mobileError === false) {
      isValid = false;
      setPhoneValidate(true);
    }
    if (WebRegex.test(webUrl) == false) {
      if (webUrl.trim() != "") {
        isValid = false;
        setWebError("Please enter correct web url or remove it.");
      } else {
        setWebError("");
      }
    }
    return isValid;
  };

  const checkLocalData = async () => {
    setShowLoader(true);
    var data = await AsyncStorage.getData(AsyncStorageKeys.SignUpBasic);
    if (data == "") {
      setShowLoader(false);
      null;
    } else {
      let jsonData = JSON.parse(data);
      //console.log('data--->', jsonData)
      setSuppliesValue(jsonData.supplies);
      setVenderName(jsonData.vender_name);
      setBusinessName(jsonData.business_name);
      setCurrency(jsonData.currency);
      setBusinessForm(jsonData.form_of_business);
      setDate(new Date(jsonData.date_of_incorporation));
      setEmail(jsonData.email);
      setMobile(jsonData.mob_number);
      setWebUrl(jsonData.website_url);
      setFaxNumber(jsonData.fax_number);
      setCountryForFax(jsonData.countryForFax);
      setBusinessType(jsonData.type_of_business);
      setCountry(jsonData.countryForMobile);
      setShowLoader(false);
      setMobileError(true);
    }
  };

  const handlePopUpData = (
    apiName,
    inputParams,
    value,
    key,
    alert,
    Title,
    error,
    selectedType,
    isMultiSelect
  ) => {
    setPopupApiName(apiName);
    setPopupApiInputParams(inputParams);
    setPopupDisplayValue(value);
    setPopupDisplayKey(key);
    setPopupAlertText(alert);
    setPopupDisplayTitle(Title);
    setPopupErrorMsg(error);
    setPopupSelectedValue(selectedType);
    isMultiSelect
      ? setShowMultiPopUp(!showMultiPopUp)
      : setShowPopUp(!showPopUp);
  };
  const handleDataTOLocalStorage = async () => {
    var data = await AsyncStorage.getData(AsyncStorageKeys.SignUpBasic);

    console.log("data123--->", data);

    let signupBasicData = {
      prospect_vendor_id:
        data == "" ? "" : JSON.parse(data).prospect_vendor_id || "",
      supplies: suppliesValue,
      vender_name: venderName,
      business_name: businessName,
      currency: currency,
      form_of_business: businessForm,
      date_of_incorporation: date,
      email: email,
      website_url: webUrl,
      mob_number: mobile,
      fax_number: faxNumber,
      countryForFax: countryForFax,
      type_of_business: businessType,
      countryForMobile: country,
    };
    console.log("signupBasicData", signupBasicData);
    await AsyncStorage.saveData(
      AsyncStorageKeys.SignUpBasic,
      JSON.stringify(signupBasicData)
    );
    props.navigation.navigate("ConatctListingPage");
  };

  return (
    <KeyboardAwareScrollView style={styles.mainConatiner}>
      <View style={styles.mainContainer}>
        <Flowstep currentScreen={"1"} />
        <PopUpInput
          placeholder={"Select Provide Supplies"}
          title={Strings.screens.signupBasicDetails.interestedTitle}
          value={suppliesValue == "" ? "" : suppliesValue.company_name}
          onSelect={() => {
            handlePopUpData(
              "vendor_registration_company_list",
              {
                method: "vendor_registration_company_list",
                third_party_platform: Strings.VendorPortal,
                lang_id: "EN",
              },
              "company_name",
              "company_id",
              "Provide supplies",
              "Choose provide supplies",
              "provide supplies",
              "supples"
            );
          }}
          errorMsg={suppliesValue == "" ? suppliesError : ""}
        />
        <GreyHeaderText
          TextStyle={styles.graytitle}
          text={Strings.screens.signupBasicDetails.BusinessProfile}
        />
        <Input
          ref={businessNameRef}
          value={businessName}
          label={Strings.screens.signupBasicDetails.businessName}
          isLastFeild={false}
          onChangeText={(text) => {
            //setBusinessName(text)
            setBusinessName(text);
          }}
          onSubmitEditing={() => {
            venderNameRef.current?.focus();
          }}
        />
        <Input
          ref={venderNameRef}
          //businessNameRef
          compulsary={true}
          label={Strings.screens.signupBasicDetails.venderTitle}
          value={venderName}
          //businessName
          isLastFeild={false}
          onChangeText={(text) => {
            setVenderName(text);
          }}
        />
        <View style={styles.rowStyle}>
          <PopUpInput
            compulsary={true}
            title={Strings.screens.signupBasicDetails.currency}
            // width={'43%'}
            value={currency == "" ? "" : currency.display_currency}
            onSelect={() => {
              handlePopUpData(
                "get_all_curreny_list",
                {
                  method: "get_all_curreny_list",
                  third_party_platform: Strings.VendorPortal,
                  lang_id: "EN",
                },
                "display_currency",
                "sc_sys_currency_id",
                "currency",
                "Choose Currency",
                "currency",
                "currency"
              );
            }}
            containerStyle={{ width: "48%" }}
            errorMsg={currency == "" ? currencyError : ""}
          />

          <InputDateSelection
            title={Strings.screens.signupBasicDetails.dateTitle}
            containerStyle={{ width: "48%" }}
            value={date == "" ? "" : moment(date).format("DD/MM/YYYY")}
            onSelect={() => {
              setIsDateSelection(true);
            }}
            errorMsg={date == "" ? dateError : ""}
          />
        </View>
        <PopUpInput
          compulsary={true}
          title={Strings.screens.signupBasicDetails.businessFormTitle}
          // width={screenWidth * 0.4}
          value={businessForm == "" ? "" : businessForm.label}
          onSelect={() => {
            handlePopUpData(
              "get_master_enum_data",
              {
                enum_code: "GEN_2102_1021",
                method: "get_master_enum_data",
                third_party_platform: Strings.VendorPortal,
                lang_id: "EN",
              },
              "label",
              "id",
              "Business form",
              "Choose Business form",
              "Business form",
              "formBusiness"
            );
          }}
          errorMsg={businessForm == "" ? formError : ""}
        />
        {/* <PopUpInput
                    compulsary={true}
                    title={Strings.screens.signupBasicDetails.businessTypeTitle}
                    // width={screenWidth * 0.4}
                    value={businessType == "" ? "" : businessType.join(',')}
                    onSelect={() => {
                        handlePopUpData(
                            'get_master_enum_data',
                            {
                                "enum_code": "GEN_2102_1022",
                                "method": "get_master_enum_data",
                                "third_party_platform": Strings.VendorPortal,
                                "lang_id": "EN"
                            },
                            'label',
                            'id',
                            'Business Type',
                            'Please choose Business Type',
                            'Business Type',
                            "typeBusiness",
                            "Yes"
                        )
                    }}
                    errorMsg={businessType == "" ? typeError : ''}
                /> */}
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text fontWeight={REGULAR} style={[styles.labelStyle]}>
            {Strings.screens.signupBasicDetails.businessTypeTitle}
            <Text style={[styles.labelStyle, { color: RED }]}>{"*"}</Text>
          </Text>
          {businessType == "" || (businessType && businessType.length == 0) ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                handlePopUpData(
                  "get_master_enum_data",
                  {
                    enum_code: "GEN_2102_1022",
                    method: "get_master_enum_data",
                    third_party_platform: Strings.VendorPortal,
                    lang_id: "EN",
                  },
                  "label",
                  "id",
                  "Business Type",
                  "Choose Business Type",
                  "Business Type",
                  "typeBusiness",
                  "Yes"
                );
              }}
              style={[styles.inputStyle]}
            >
              <Text
                style={styles.placHolderTxt}
              >{`Select ${Strings.screens.signupBasicDetails.businessTypeTitle}`}</Text>
              <Icon name={"chevron-down"} size={20} color={PLACEHOLDER} />
            </TouchableOpacity>
          ) : (
            <View style={[styles.inputStyleWithMultiSelect]}>
              <View style={[styles.innerMultiVew]}>
                {businessType.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.typeCell}
                      onPress={() => {
                        let data = [...businessType];
                        data.splice(index, 1);
                        setBusinessType(data);
                      }}
                    >
                      <Text style={styles.valueTxt}>{item.label}</Text>
                      <Icon name={"close"} size={20} color={PRIMARY_BUTTON} />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Icon
                name={"chevron-down"}
                size={20}
                style={{ padding: 5 }}
                color={PLACEHOLDER}
                onPress={() => {
                  handlePopUpData(
                    "get_master_enum_data",
                    {
                      enum_code: "GEN_2102_1022",
                      method: "get_master_enum_data",
                      third_party_platform: Strings.VendorPortal,
                      lang_id: "EN",
                    },
                    "label",
                    "id",
                    "Business Type",
                    "Choose Business Type",
                    "Business Type",
                    "typeBusiness",
                    "Yes"
                  );
                }}
              />
            </View>
          )}
          {typeError == "" ? null : (
            <Text
              fontWeight={REGULAR}
              dynamicLines={true}
              style={[styles.errorMsg, { width: "100%" }]}
            >
              {typeError}
            </Text>
          )}
        </View>

        <GreyHeaderText
          TextStyle={styles.graytitle}
          text={Strings.screens.signupBasicDetails.communicationTitle}
        />
        <Input
          ref={emailRef}
          value={email}
          label={Strings.screens.signupBasicDetails.emailAdress}
          type={"email"}
          compulsary={true}
          isLastFeild={false}
          onChangeText={(text) => {
            setEmail(text);
          }}
          onSubmitEditing={() => {
            webUrlRef.current?.focus();
          }}
        />
        <Input
          ref={webUrlRef}
          value={webUrl}
          label={Strings.screens.signupBasicDetails.webTitle}
          isLastFeild={false}
          checkForErrorToShow={false}
          onChangeText={(text) => {
            setWebUrl(text);
          }}
          onSubmitEditing={() => {
            WebRegex.test(webUrl) == false
              ? setWebError("Please enter correct web url or remove it.")
              : setWebError("");
            //businessTypeRef.current?.focus()
          }}
        />
        {webError == "" ? null : (
          <Text
            fontWeight={REGULAR}
            dynamicLines={true}
            style={[styles.errorMsg]}
          >
            {webError}
          </Text>
        )}

        <PhoneSelection
          title={Strings.screens.signupBasicDetails.mobile}
          // ref={phoneInput}
          value={mobile}
          compulsary={true}
          type={"mobile"}
          errorMsg={Strings.screens.security.phoneError}
          outerErrorCheck={phoneValidate}
          checkForErrorToShow={true}
          onChangeText={(number, isValid) => {
            setMobile(number);
            setPhoneValidate(false);
            setMobileError(isValid);
          }}
        />
        {/* <InputWithSelection
                    title={Strings.screens.signupBasicDetails.mobile}
                    value={mobile}
                    compulsary={true}
                    type={'mobile'}
                    onChangeText={(test) => {
                        setMobile(test)
                        if (phoneRegEx.test(test) == false) {
                            setMobileError('Please enter correct mobile number')
                        } else {
                            setMobileError('')

                        }
                    }}
                    onFLagSelect={() => {
                        handlePopUpData(
                            'country_list',
                            {
                                "method": "country_list",
                                "third_party_platform": Strings.VendorPortal,
                                "lang_id": "EN"
                            },
                            'mc_country',
                            'mc_country_id',
                            'Country Code',
                            'Choose country code',
                            'country code',
                            "countryForMobile"
                        )
                    }}
                    checkForErrorToShow={false}
                    inputStyle={{ flex: 1 }}
                    countryCode={country == "" ? "" : country.mc_country_code_iso3}
                />
                {mobileError != "" ? (
                    <Text
                        fontWeight={REGULAR}
                        dynamicLines={true}
                        style={styles.errorMsg}>{mobileError}</Text>
                ) : null
                } */}
        <PhoneSelection
          title={Strings.screens.signupBasicDetails.faxTitle}
          // ref={phoneInput}
          value={faxNumber}
          compulsary={true}
          type={"mobile"}
          isLastFeild={true}
          errorMsg={Strings.screens.signupBasicDetails.fax_error}
          //outerErrorCheck={phoneValidate}
          checkForErrorToShow={true}
          onChangeText={(number, isValid) => {
            setFaxNumber(number);
            // setPhoneValidate(false)
            // setMobileError(isValid)
          }}
        />
        {/* <InputWithSelection
                    title={Strings.screens.signupBasicDetails.faxTitle}
                    value={faxNumber}
                    type={'number'}
                    onChangeText={(test) => { setFaxNumber(test) }}
                    onFLagSelect={() => {
                        handlePopUpData(
                            'country_list',
                            {
                                "method": "country_list",
                                "third_party_platform": Strings.VendorPortal,
                                "lang_id": "EN"
                            },
                            'mc_country',
                            'mc_country_id',
                            'Country Code',
                            'Choose country code',
                            'country code',
                            "countryForFax"
                        )
                    }}
                    isLastFeild={true}
                    checkForErrorToShow={false}
                    inputStyle={{ flex: 1 }}
                    countryCode={countryForFax == "" ? "" : countryForFax.mc_country_code_iso3}
                /> */}
        <PrimaryButton
          onPress={() => {
            if (Validation()) {
              console.log("done");
              handleDataTOLocalStorage();
            }

            // props.navigation.navigate('ConatctListingPage')
          }}
          buttonStyle={styles.buttonStyle}
          text={Strings.screens.signupBasicDetails.buttonText}
        />
      </View>
      {showPopUp ? (
        <CustomSingleSelectionPicker
          apiName={""}
          apiInputParams={popupApiInputParams}
          selectedValue={
            popupSelectedValue == "supples"
              ? suppliesValue
              : popupSelectedValue == "currency"
              ? currency
              : popupSelectedValue == "formBusiness"
              ? businessForm
              : popupSelectedValue == "typeBusiness"
              ? businessType
              : popupSelectedValue == "countryForMobile"
              ? country
              : popupSelectedValue == "countryForFax"
              ? countryForFax
              : null
          }
          titleText={popupDisplayTitle}
          displayText={popupDisplayValue}
          keyId={popupDisplayKey}
          errorMsg={popupErrorMsg}
          alertText={popupAlertText}
          searchplaceholder={"search"}
          // dialogData={reasonList}
          onCancelClick={() => {
            setShowPopUp(!showPopUp);
          }}
          onOkClick={(selectedData) => {
            console.log("selectedData", selectedData);
            popupSelectedValue == "supples"
              ? setSuppliesValue(selectedData)
              : popupSelectedValue == "currency"
              ? setCurrency(selectedData)
              : popupSelectedValue == "formBusiness"
              ? setBusinessForm(selectedData)
              : popupSelectedValue == "typeBusiness"
              ? setBusinessType(selectedData)
              : popupSelectedValue == "countryForMobile"
              ? setCountry(selectedData)
              : popupSelectedValue == "countryForFax"
              ? setCountryForFax(selectedData)
              : null;
            // //setReasonErrorMsg('')
            setShowPopUp(!showPopUp);
          }}
        />
      ) : null}
      {showMultiPopUp ? (
        <CustomMuiltiSelection
          apiName={""}
          apiInputParams={popupApiInputParams}
          selectedValue={businessType}
          titleText={popupDisplayTitle}
          displayText={popupDisplayValue}
          keyId={popupDisplayKey}
          errorMsg={popupErrorMsg}
          alertText={popupAlertText}
          searchplaceholder={"Search"}
          // dialogData={reasonList}
          onCancelClick={() => {
            setShowMultiPopUp(!showMultiPopUp);
          }}
          onOkClick={(selectedData, selectedValues) => {
            console.log("selectedData", selectedData, selectedValues);
            setTypeError("");
            setBusinessType(selectedData);
            setShowMultiPopUp(!showMultiPopUp);
          }}
        />
      ) : null}
      {/* <DatePicker
                modal
                mode={'date'}
                maximumDate={new Date()}
                open={dateSelection}
                date={date == "" ? new Date() : date}
                onConfirm={(date) => {
                    console.log('date--->', typeof date)
                    setIsDateSelection(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setIsDateSelection(false)
                }}
            /> */}
      <DateTimePickerModal
        isVisible={dateSelection}
        date={date == "" ? new Date() : date}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          console.log("date--->", typeof date);
          setIsDateSelection(false);
          setDate(date);
        }}
        onCancel={() => {
          setIsDateSelection(false);
        }}
      />
      <Hud visible={showLoader} />
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 15,
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  graytitle: {
    marginBottom: 8,
  },
  buttonStyle: {
    marginVertical: 20,
  },
  errorMsg: {
    color: RED,
    fontSize: DynamicFontSize(12),
    marginTop: 5,
  },
  labelStyle: {
    marginBottom: 10,
    color: INPUT_TITTLE_COLOR,
    fontSize: DynamicFontSize(15),
  },
  inputStyle: {
    borderRadius: 5,
    height: 46,
    flexDirection: "row",
    borderWidth: 1,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: INPUT_BG_COLOR,
    backgroundColor: INPUT_BG_COLOR,
  },
  placHolderTxt: {
    color: PLACEHOLDER,
    // width: '75%'
  },
  inputStyleWithMultiSelect: {
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: "row",
    borderWidth: 1,

    paddingHorizontal: 10,
    alignItems: "center",
    borderColor: INPUT_BG_COLOR,
    backgroundColor: INPUT_BG_COLOR,
  },
  innerMultiVew: {
    width: "92%",
    flexDirection: "row",

    flexWrap: "wrap",
  },
  typeCell: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderColor: PLACEHOLDER,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
  },
  valueTxt: {
    color: BLACK,
    //  width: '75%'
  },
});
export default SignUpBasicDetail;
