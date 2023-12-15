import React, { useEffect } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { View, Text, AsyncStorage, Image } from "../../../components/common";
import ImageWithText from "../../../components/Projects/ImageWithText";
import AsyncStorageKeys from "../../../lib/AsyncStorageKeys";
import { INPUT_TITTLE_COLOR, WHITE } from "../../../lib/colors";
import { StackActions } from "@react-navigation/native";
import Images from "../../../lib/Images";

const SplashScreen = (props) => {
  const tryLocalSignIn = async () => {
    const is_login = await AsyncStorage.getData(AsyncStorageKeys.is_Login);
    const is_link = await AsyncStorage.getData(AsyncStorageKeys.is_from_Link);
    if (is_login == "false" || is_login == "") {
      await AsyncStorage.saveData(AsyncStorageKeys.userAccessToken, "");
      const resetActions = StackActions.replace("AuthModuleNavigtaor");
      props.navigation.dispatch(resetActions);
    } else if (is_login == "true") {
      const resetActions = StackActions.replace("drawer");
      props.navigation.dispatch(resetActions);
    }
    // }
  };
  useEffect(() => {
    // console.log('SPlash====>')
    setTimeout(() => {
      tryLocalSignIn();
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={"dark-content"}
      />
      <Image
        source={Images.newvendoricon}
        resizeMode="contain"
        style={styles.imageStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
