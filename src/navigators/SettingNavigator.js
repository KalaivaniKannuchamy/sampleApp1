import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BLACK, INPUT_TITTLE_COLOR } from '../lib/colors';
import SettingScreen from '../screens/SideMenuModule/ProfileModule/SettingScreen';
import AppStrings from '../lib/AppStrings';
import CorrespondingAddress from '../screens/SideMenuModule/ProfileModule/CorrespondingAddress';
import ContactPersonList from '../screens/SideMenuModule/ProfileModule/ContactPersonList';
import TaxInformation from '../screens/SideMenuModule/ProfileModule/TaxInformation';
import BankingInformation from '../screens/SideMenuModule/ProfileModule/BankingInformation';
import DocumentInfo from '../screens/SideMenuModule/ProfileModule/DocumentInfo';
import ChangePassword from '../screens/SideMenuModule/ChangePassword';

const Stack = createNativeStackNavigator();

const SettingNavigtaor = ({ theme }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: BLACK,
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 15,
                color: INPUT_TITTLE_COLOR,
                letterSpacing: 0.4,
            }
        }}
            initialRouteName={AppStrings.sidemenu.setting}
        >
            <Stack.Screen name={AppStrings.sidemenu.setting} component={SettingScreen}
                options={{
                    headerShadowVisible: true,
                    title: "Settings",

                    headerShown: true
                }}
            />
            <Stack.Screen
                name={AppStrings.drawer.changepassword}
                component={ChangePassword}
                options={{
                    headerShadowVisible: false,
                    title: "Change Password",
                }}
            />
            <Stack.Screen
                name={AppStrings.drawer.correspondingAddress}
                component={CorrespondingAddress}
                options={{
                    headerShadowVisible: false,
                    title: "Corresponding Address",
                }}
            />
            <Stack.Screen
                name={AppStrings.drawer.contactPersonList}
                component={ContactPersonList}
                options={{
                    headerShadowVisible: false,
                    title: "Contact Person",
                }}
            />
            <Stack.Screen
                name={AppStrings.drawer.taxInformation}
                component={TaxInformation}
                options={{
                    headerShadowVisible: false,
                    title: "Taxation Information",
                }}
            />
            <Stack.Screen
                name={AppStrings.drawer.bankInformation}
                component={BankingInformation}
                options={{
                    headerShadowVisible: false,
                    title: "Banking Information",
                }}
            />
            <Stack.Screen
                name={AppStrings.drawer.docInformation}
                component={DocumentInfo}
                options={{
                    headerShadowVisible: false,
                    title: "Documents",
                }}
            />
        </Stack.Navigator>
    )
}
export default SettingNavigtaor