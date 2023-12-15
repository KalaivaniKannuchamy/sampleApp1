import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BLACK, INPUT_TITTLE_COLOR } from '../../lib/colors';
import DashboardScreen from '../../screens/SideMenuModule/DashboardScreen';
import Strings from '../../lib/AppStrings';

const Stack = createNativeStackNavigator();


const DashBoardNavigator = ({ theme }) => {
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
            initialRouteName={Strings.drawer.deskboard}
        >

            <Stack.Screen name={Strings.drawer.deskboard} component={DashboardScreen}
                options={{
                    headerShadowVisible: true,
                    title: "Dashboard",

                    // headerShown: true
                }}
            />

        </Stack.Navigator>
    )
}
export default DashBoardNavigator;