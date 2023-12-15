import React, { useCallback, useEffect } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/AuthModule/SplashScreen';
import { BLACK, INPUT_TITTLE_COLOR } from '../lib/colors';
import DrawerNavigator from './DraweNavigator/DraweNavigator';
import AuthModuleNavigtaor from './AuthModuleNavigator';
import AsyncStorage from '../components/common/AsyncStorage'

const Stack = createNativeStackNavigator();

const AuthNavigtaor = (props,{ theme }) => {
    useFocusEffect(
        useCallback(()=>{
            console.log("iAuthNavigtaor==================");
        },[])
        
    )

    const tryLocalSignIn = async () => {
        const is_login = await AsyncStorage.getData(AsyncStorageKeys.is_Login)
        const is_link = await AsyncStorage.getData(AsyncStorageKeys.is_from_Link)
        console.log("islogin==================",is_login, typeof is_login, is_link);
        console.log("is_link Splash==================",is_link);
        if(is_link == 'true'){
           // const resetActions = StackActions.replace("AuthModuleNavigtaor")
            props.navigation.replace("AuthModuleNavigtaor",{
                screen : "EmailVerification"
            })
        }else{
            if (is_login == 'false' || is_login == '') {
                await AsyncStorage.saveData(AsyncStorageKeys.userAccessToken, "");
                const resetActions = StackActions.replace("AuthModuleNavigtaor")
                props.navigation.dispatch(resetActions)
            }
            else if(is_login == 'true'){
                const resetActions = StackActions.replace("drawer")
                props.navigation.dispatch(resetActions)
            }
        }
       
    }
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
                initialRouteName={'SplashScreen'}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name="AuthModuleNavigtaor" component={AuthModuleNavigtaor} options={{
                    headerShown: false
                }} />
               
                <Stack.Screen
                    name={"drawer"}
                    options={{
                        headerShown: false,
                        gestureEnabled: false
                    }}
                    component={DrawerNavigator}
                />
            </Stack.Navigator>
    )
}
export default AuthNavigtaor