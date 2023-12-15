import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/AuthModule/SplashScreen';
import Login from '../screens/AuthModule/Login';
import SignUpConatctListing from '../screens/AuthModule/SignUpContactListing';
import SignUpBasicDetail from '../screens/AuthModule/SignUpBasicDetail';
import ComponentDisplay from '../screens/ComponentDisplay';
import SignUpCorrespondingListing from '../screens/AuthModule/SignUpCorrespondingListing';
import SignUpTaxListing from '../screens/AuthModule/SignUpTaxListing';
import SignUpBankingInformationListing from '../screens/AuthModule/SignUpBankingInformationListing';
import SignUpDocumentsListing from '../screens/AuthModule/SignUpDocumentsListing';
import { BLACK ,INPUT_TITTLE_COLOR} from '../lib/colors';
import EmailVerification from '../screens/AuthModule/EmailVerification';
import OtpVerification from '../screens/AuthModule/OtpVerification';
import ThankYou from '../screens/AuthModule/ThankYou';
import DrawerNavigator from './DraweNavigator/DraweNavigator';
import ForgetPasswordScreen from '../screens/AuthModule/ForgetPasswordScreen';
import ResetPassword from '../screens/AuthModule/ResetPassword';
const Stack = createNativeStackNavigator();

const AuthModuleNavigtaor = ({ theme }) => {
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
       initialRouteName={'LoginScreen'}
            >
          <Stack.Screen name="LoginScreen" component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="signUpBasicDetail" component={SignUpBasicDetail}
                options={{
                    title: "Sign Up",
                    headerShadowVisible:false,
                }}
            />
            
            
               <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}
                options={{
                    title: "Forgot Password",
                    headerShown: false
                }}
            />
            <Stack.Screen name="ConatctListingPage" component={SignUpConatctListing}
                options={{
                    title: "Sign Up"
                }}
            />

            <Stack.Screen name="CorrespondingListingPage" component={SignUpCorrespondingListing}
                options={{
                    title: "Sign Up"
                }}
            />
            <Stack.Screen name="TaxListingPage" component={SignUpTaxListing}
                options={{
                    title: "Sign Up"
                }}
            />
            <Stack.Screen name="BankingListingPage" component={SignUpBankingInformationListing}
                options={{
                    title: "Sign Up"
                }}
            />
            <Stack.Screen name="DocumentListingPage" component={SignUpDocumentsListing}
                options={{
                    // headerLeft: ()=> null,
                    headerBackVisible : false
                    //title: "SIGN UP",
                   //headerShown: false
                }}
                
            />
            <Stack.Screen name="EmailVerification" component={ForgetPasswordScreen}
                options={{
                    title: "Email Verification",
                   // headerShown: false
                }}
            />
            <Stack.Screen name="OtpVerification" component={OtpVerification}
                options={{
                    title: "Verification",
                    //headerShown: false
                }}
            />
            <Stack.Screen name="ThankYou" component={ThankYou}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen name="ResetPassword" component={ResetPassword}
                options={{
                    headerShown: false
                }}
            />
            
        </Stack.Navigator>
    )
}
export default AuthModuleNavigtaor