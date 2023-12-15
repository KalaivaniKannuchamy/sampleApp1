import React, { useState, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";

import {
  Text,
  View,
  Button,
  Checkbox,
  Input,
  ScrollView,
} from "../components/common";
import { BOLD } from "../lib/FontFamily";
import ThemeProvider from "../lib/ThemeProvider";
import PrimaryButton from "../components/Projects/PrimaryButton";
import PopUpInput from "../components/Projects/PopUpInput";
import Flowstep from "../components/Projects/Flowstep";
import GreyHeaderText from "../components/Projects/GreyHeaderText";
import GreySmallTitle from "../components/Projects/GreySmallTitle";
import BlackSubTitle from "../components/Projects/BlackSubTitle";
import TitleWithValue from "../components/Projects/TitleWithValue";
import SignUpListingHeader from "../components/Projects/SignUpListingHeader";
import ContactListCell from "../components/Projects/ContactListCell";
import NavigationHeaderText from "../components/Projects/NavigationHeaderText";
import { APP_WHITE, INPUT_BG_COLOR, WHITE } from "../lib/colors";
import ContactPopup from "../components/Projects/ContactPopup";
import BankingInformationPopup from "../components/Projects/BankinginformationPopup";
import CustomSingleSelectionPicker from "../components/Projects/CustomSingleSelectionPicker";
import DocumentCell from "../components/Projects/DocumentCell";
const ComponentDisplay = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NavigationHeaderText text="Login" />,
    });
  }, [navigation]);
  const [info, setInfo] = useState(false);
  const reasonList1 = [
    {
      reason_id: "1",
      reason: "ashwini",
    },
    {
      reason_id: "2",
      reason: "ashwini",
    },
    {
      reason_id: "3",
      reason: "ashwini",
    },
    {
      reason_id: "1",
      reason: "ashwini",
    },
    {
      reason_id: "2",
      reason: "ashwini",
    },
    {
      reason_id: "3",
      reason: "ashwini",
    },
    {
      reason_id: "1",
      reason: "ashwini",
    },
    {
      reason_id: "2",
      reason: "ashwini",
    },
    {
      reason_id: "3",
      reason: "ashwini",
    },
    {
      reason_id: "1",
      reason: "ashwini",
    },
    {
      reason_id: "2",
      reason: "ashwini",
    },
    {
      reason_id: "3",
      reason: "ashwini",
    },
    {
      reason_id: "1",
      reason: "ashwini",
    },
    {
      reason_id: "2",
      reason: "ashwini",
    },
    {
      reason_id: "3",
      reason: "ashwini",
    },
    {
      reason_id: "1",
      reason: "ashwini",
    },
    {
      reason_id: "2",
      reason: "ashwini",
    },
    {
      reason_id: "3",
      reason: "ashwini",
    },
  ];
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonErrorMsg, setReasonErrorMsg] = useState(false);
  const [reasonList, setReasonList] = useState(reasonList1);
  const [error, setError] = useState({});
  const [selector, setSelector] = useState("0");
  return (
    <View style={styles.mainView}>
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <PrimaryButton
          text="LogIn"
          onPress={() => {
            console.log("PrimaryButton Click");
            navigation.navigate("Home2"), setInfo(true);
          }}
        />
        <PrimaryButton
          text="Contact Listing"
          onPress={() => {
            navigation.navigate("ConatctListingPage");
          }}
        />
        <ContactPopup
          visible={info}
          onCrossPress={() => setInfo(false)}
          onDoneButtonPress={() => setInfo(!info)}
        />
        <BankingInformationPopup
          visible={info}
          onCrossPress={() => setInfo(false)}
          onDoneButtonPress={() => setInfo(!info)}
        />
        <PrimaryButton
          text="LoginScreen"
          onPress={() => {
            console.log("PrimaryButton Click");
            navigation.navigate("LoginScreen");
          }}
        />
        <ContactListCell
          editPress={() => {
            console.log("editPress");
          }}
          deletePress={() => {
            console.log("deletePress");
          }}
          title="Contact Person Name"
          subTitle="Designation Here"
          emailTitle="Email Address"
          emailDetail="conatct.address@gmail.com"
          mobileTitle="Mobile Number"
          mobileDetail="+234 123 456 7890"
          whatsappTitle="WhatsApp Number"
          whatsappDetail="+234 123 456 7890"
        />
        <DocumentCell
          title="Contact Person Name"
          subTitle="Designation Here Designation Here Designation Here Designation Here Designation HereDesignation Here Designation Here"
          description="description description description descriptiondescription description"
        />
        <Flowstep currentScreen="2" />
        <GreyHeaderText text="BUSINESS PROFILE" />
        <GreySmallTitle text="Designation Here" />
        <BlackSubTitle
          text="Contact Person Name"
          TextStyle={{ alignItems: "center" }}
        />
        <TitleWithValue
          HeaderTitle="WhatsApp Number"
          subHeaderTitle="+234 123 456 7890"
        />
        <SignUpListingHeader
          title="Contact Person Name"
          subTitle="Designation Here "
          editPress={() => {
            console.log("editPress");
          }}
          deletePress={() => {
            console.log("deletePress");
          }}
        />
        <PrimaryButton
          text="SplashScreen"
          onPress={() => {
            console.log("PrimaryButton Click");
            navigation.navigate("SplashScreen");
          }}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: INPUT_BG_COLOR,
    flex: 1,
  },
});

export default ComponentDisplay;
