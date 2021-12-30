import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Vibration, Dimensions, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screens/DrawerContent';
import { ActivityIndicator, Colors } from 'react-native-paper';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { AppLoading} from 'expo';
const {width, height} = Dimensions.get('screen');
import Placeholder from "./components/Placeholder";
// import {backAction} from './screens/Function';

// ICONS HERE
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

// Redux
// import {Provider} from 'react-redux';
// import store from './Redux/store';
import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import seatsReducer from './store/reducers/seats';
import routesReducer from './store/reducers/routes';
import currencyReducer from './store/reducers/currency';
import idReducer from './store/reducers/idType';
import countriesReducer from './store/reducers/countries';
import busesReducer from './store/reducers/buses';
import bookingReducer from './store/reducers/booking';
import passwordLogin from './store/reducers/passwordLogin';
import OTPReducer from './store/reducers/OTP';
import OTPLoginReducer from './store/reducers/OTPLogin';
import OTPAuthReducer from './store/reducers/OTPAuthentication';
import authenticationReducer from './store/reducers/authentication';
import ticketsReducer from './store/reducers/tickets';
import historyReducer from './store/reducers/history';
import passengerReducer from './store/reducers/passenger';
import finalReducer from './store/reducers/final';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import RootStackScreen from './screens/RootStackScreen';

const rootReducer = combineReducers({
  seats: seatsReducer,
  routes: routesReducer,
  buses: busesReducer,
  booking: bookingReducer,
  currency: currencyReducer,
  countries: countriesReducer,
  id: idReducer,
  OTP: OTPReducer,
  passwordLogin: passwordLogin,
  OTPLogin: OTPLoginReducer,
  OTPAuth: OTPAuthReducer,
  authentication: authenticationReducer,
  auth: authReducer,
  tickets: ticketsReducer,
  history: historyReducer,
  passenger: passengerReducer,
  final: finalReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// import {StateProvider} from './src/StateProvider';
// import reducer, {initialState} from './src/reducer';

// IMPORT MY OWNS SCREENS
import HomeScreen from './screens/HomeScreen';
import FormDetailsScreen from './screens/FormDetailsScreen';
import BusSeatPicker from './screens/BusSeatPicker';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShareScreen from './screens/ShareScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import ChangeCurrencyScreen from './screens/ChangeCurrencyScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import TravellerDetailsScreen from './screens/TravellerDetailsScreen';
import JourneyDetailsScreen from './screens/JourneyDetailsScreen'
import OTP from './screens/OTP';
import ValidateOTP from './screens/ValidateOTP';
import SignUpFormScreen from './screens/SignUpFormScreen';
import PasswordOTP from './screens/PasswordOTPScreen';
import SignUpForm from './screens/SignUpFormScreen';
import QuickLogin from './screens/QuickLogin';
import RequestOTPScreen from './screens/RequestOTPScreen';
import PaymentScreen from './screens/PaymentScreen';
import Loading from './screens/Loading'
import Toast from 'react-native-toast-message';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
    const [isVisible, setIsVisible] = useState(false);

    const [loaded] = useFonts({
      'Oswald-Regular' : require('./assets/fonts/Oswald-Regular.ttf'),
      'Oswald-Light' : require('./assets/fonts/Oswald-Light.ttf'),
      'Oswald-Medium' : require('./assets/fonts/Oswald-Medium.ttf'),
      'Oswald-ExtraLight' : require('./assets/fonts/Oswald-ExtraLight.ttf'),
      'Oswald-SemiBold' : require('./assets/fonts/Oswald-SemiBold.ttf'),
      'Oswald-Bold' : require('./assets/fonts/Oswald-Bold.ttf'),
      'Montserrat-ExtraLight' : require('./assets/fonts/Montserrat-ExtraLight.ttf'),
      'Montserrat-Light' : require('./assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Regular' : require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Medium' : require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-SemiBold' : require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-ExtraBold' : require('./assets/fonts/Montserrat-ExtraBold.ttf'),
      'Montserrat-Black' : require('./assets/fonts/Montserrat-Black.ttf'),
    });

  if(!loaded) {
    return (
      <Placeholder />
    );
  }else{
    // VIBRATE TO CALL ATTENTION
    Vibration.vibrate();
  }


  return (
    <Provider store={store}>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} screenOptions={{
              drawerActiveBackgroundColor: '#003c30',
              drawerActiveTintColor: '#FFF',
              drawerInactiveTintColor: '#333',
              drawerLabelStyle: {
                marginLeft: -20,
                fontSize: 15,
            },}}>
              <Drawer.Screen name="HomeDrawer" component={RootStackScreen} />
            </Drawer.Navigator>
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader_gif: {
    width: 70,
    height: 70,
  }
});
