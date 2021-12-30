import React, {useState, useEffect, useCallback,} from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Alert, RefreshControl, Dimensions, Image, FlatList, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { emptyBooking } from '../store/actions/booking';
import { createStackNavigator } from '@react-navigation/stack';
import { Audio } from 'expo-av';

// IMPORT MY OWNS SCREENS
import HomeScreen from '../screens/HomeScreen';
import FormDetailsScreen from '../screens/FormDetailsScreen';
import BusSeatPicker from '../screens/BusSeatPicker';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShareScreen from '../screens/ShareScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeCurrencyScreen from '../screens/ChangeCurrencyScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import TravellerDetailsScreen from '../screens/TravellerDetailsScreen';
import JourneyDetailsScreen from '../screens/JourneyDetailsScreen'
import OTP from '../screens/OTP';
import ValidateOTP from '../screens/ValidateOTP';
import SignUpFormScreen from '../screens/SignUpFormScreen';
import PasswordOTP from '../screens/PasswordOTPScreen';
import SignUpForm from '../screens/SignUpFormScreen';
import QuickLogin from '../screens/QuickLogin';
import RequestOTPScreen from '../screens/RequestOTPScreen';
import PaymentScreen from '../screens/PaymentScreen';

// ICONS HERE
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';  

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
    const [sound, setSound] = useState();
    const dispatch = useDispatch()

    const RestartBucketHandler = useCallback(() => {
        dispatch(emptyBooking());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
    }, [dispatch]);

    const backAction = () => {
          Alert.alert("Hold On Buddy!!!", "Are you sure you wanna go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => RestartBucketHandler() }
          ]);
          return true;
    };

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('../images/sounds/menu.mp3')
        );
        setSound(sound);
      
        console.log('Playing Sound');
        await sound.playAsync(); 
      }
      
      useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); }
            : undefined;
      }, [sound]);

   return (
    <RootStack.Navigator>
    <RootStack.Screen name="Home" component={HomeScreen} options={{
        headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Home Page',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="FormDetails" component={FormDetailsScreen} options={{
    headerLeft: () => (
        <AntDesign name="left" style={{ marginLeft: 20 }} size={24} color='#FFF'  onPress={() => {
            playSound();
            backAction();}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Terminal Buses',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="BusSeatPicker" component={BusSeatPicker} options={{
    headerLeft: () => (
        <AntDesign name="left" style={{ marginLeft: 20 }} size={24} color='#FFF'  onPress={() => {
            playSound();
            backAction();}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Arrangement',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="SignUp" component={SignUpScreen} options={{
    headerLeft: () => (
        <AntDesign name="left" style={{ marginLeft: 20 }} size={24} color='#FFF'  onPress={() => {
            playSound();
            backAction();}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Sign Up',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="SignIn" component={SignInScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Login Screen',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="History" component={BookingHistoryScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Booking History',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="Profile" component={ProfileScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'My Profile',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="Currency" component={ChangeCurrencyScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Currency',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="Password" component={ChangePasswordScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Update Password',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>


<RootStack.Screen name="About" component={AboutUsScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'About STC',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="Contact" component={ContactUsScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Our Contact',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="Traveller" component={TravellerDetailsScreen} options={{
    headerLeft: () => (
        <AntDesign name="left" style={{ marginLeft: 20 }} size={24} color='#FFF'  onPress={() => {
            playSound();
            backAction();}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Traveller Details',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="Journey" component={JourneyDetailsScreen} options={{
    headerLeft: () => (
        <AntDesign name="left" style={{ marginLeft: 20 }} size={24} color='#FFF'  onPress={() => {
            playSound();
            backAction();}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Journey Details',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="PasswordOTP" component={PasswordOTP} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Login Screen',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="SignUpForm" component={SignUpForm} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Sign Up Screen',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="RequestOTP" component={RequestOTPScreen} options={{
    headerLeft: () => (
        <FontAwesome name="navicon" style={{ marginLeft: 20 }} size={24} color='#FFF' onPress={() => {
            playSound();
            navigation.openDrawer()}} />
    ),
    
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'OTP Screen',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

<RootStack.Screen name="Payment" component={PaymentScreen} options={{
    headerStyle: {
        backgroundColor: '#003c30',
    },
    title: 'Payment Screen',
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        marginLeft: 40
    },
    drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    }}/>

</RootStack.Navigator>
   );
};

export default RootStackScreen;