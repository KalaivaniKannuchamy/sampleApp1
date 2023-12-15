import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Dimensions } from 'react-native';
import { Text } from '../../components/common';
import Strings from '../../lib/AppStrings'
import Sidemenu from '../DraweNavigator/SideMenu';
import { BLACK,INPUT_TITTLE_COLOR } from '../../lib/colors';
import DashBoardNavigator from './DashBoardNavigator';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (

    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={(props) => <Sidemenu {...props} />}
      drawerLockMode="locked-closed"
      disableGestures="true"
      edgeWidth={0}

      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: BLACK,
        headerStyle: { elevation: 0 },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 15,
          color: INPUT_TITTLE_COLOR,
          letterSpacing: 0.4,
        }
      }}
      drawerStyle={{ width: screenWidth, backgroundColor: 'red' }}>

      <Drawer.Screen
        initialRouteName={Strings.drawer.deskboard}
        name={Strings.drawer.deskboard}
        component={DashBoardNavigator}
        options={{
          swipeEnabled: false,
          // headerShown: false,
          headerShown: false,
          unmountOnBlur: true
        }}
      />
     

    </Drawer.Navigator>
  );
};
export default DrawerNavigator;