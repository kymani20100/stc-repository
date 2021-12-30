import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Share } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper';
// IMPORT THE ICONS HERE
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
// import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

export default function CustomDrawerScreen(props) {

  // GET LOGIN CREDENTIAL WITH OTP AND MOBILE NUMBER
  const dispatch = useDispatch();
  const tokenCode = useSelector(state =>  state.auth.token);
  const picUrl = useSelector(state =>  state.auth.pic);
  const mobile = useSelector(state =>  state.auth.phone);
  const userName = useSelector(state =>  state.auth.name);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  const Logout = () => {
    // DISPATCH ACTION AND LET IT WAIT
    dispatch(authActions.logout()).then(() => {
        setLoading(false);  
    });
}

const removeAsync = async (key) => {
  try {
      await AsyncStorage.removeItem(key);
      return true;
  }
  catch(exception) {
      return false;
  }
}

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'STC | We Take You There Safely',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      }; 

    return (
      <View style={{flex: 1}}>
          <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#004E3E'}}>
            <ImageBackground source={require('../images/icons/drawer.jpeg')} style={{padding: 20}}>
                <Image source={require('../images/icons/user.png')} style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}} />
                <Text style={{color: '#FFF', fontSize: 15,}}>{userName}</Text>
                <View style={{flexDirection: 'row',alignItems: 'center'}}>
                    {mobile && (<FontAwesome name="phone" size={16} color="white" />) }
                    <Text style={{color: '#FFF',}}> { mobile}</Text>
                </View>
            </ImageBackground>

            <View style={{flex: 1, backgroundColor: '#FFF',paddingTop: 10}}>
                {/* <DrawerItemList {...props} /> */}
                <Drawer.Section style={styles.drawerSection}>
                <DrawerItem icon={({color, size}) => (
                            <FontAwesome name="home" color="black" size={24} />
                        )} 
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <Octicons name="history" size={24} color="black" />
                        )} 
                        label="Booking History"
                        onPress={() => {props.navigation.navigate('History')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <MaterialCommunityIcons name="face-profile" size={24} color="black" />
                        )} 
                        label="Profile"
                        onPress={() => {props.navigation.navigate('Profile')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <Entypo name="share" size={24} color="black" />
                        )} 
                        label="Share"
                        onPress={onShare}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <MaterialCommunityIcons name="home-currency-usd" size={24} color="black" />
                        )} 
                        label="Change Currency"
                        onPress={() => {props.navigation.navigate('Currency')}}
                        />
                        
                        {mobile !== null && (
                          <DrawerItem icon={({color, size}) => (
                              <Feather name="lock" size={24} color="black" />
                          )} 
                          label="Change Password"
                          onPress={() => {props.navigation.navigate('Password')}}
                          />
                        )}
                       

                        <DrawerItem icon={({color, size}) => (
                            <Entypo name="creative-commons-attribution" size={24} color="black" />
                        )} 
                        label="About Us"
                        onPress={() => {props.navigation.navigate('About')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <FontAwesome5 name="phone-volume" size={24} color="black" />
                        )} 
                        label="Contact Us"
                        onPress={() => {props.navigation.navigate('Contact')}}
                        />
                    </Drawer.Section>
            </View>
            
         </DrawerContentScrollView>

         <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#CCC'}}>

         {userName !== null ? (
                

              <TouchableOpacity onPress={() => {
                    removeAsync('userFullname');
                    removeAsync('userToken');
                    removeAsync('userID');
                    removeAsync('userPhoto');
                    removeAsync('mobile');
                  dispatch(authActions.Logout()); 
                  props.navigation.navigate('Home')}} style={{paddingVertical: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name="log-out" size={24} color="black" />
                    <Text style={{fontSize: 15, marginLeft: 5,}}>Log Out</Text>
                </View>
             </TouchableOpacity>

           ) : (
              <TouchableOpacity onPress={() => {props.navigation.navigate('SignIn', {
                  traveller: null,
                  departureTime: null,
                  serviceType: null,
                  destinationTerminal: null,
                })}} style={{paddingVertical: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name="sign-in" size={24} color="black" />
                    <Text style={{fontSize: 15, marginLeft: 5,}}>Log In</Text>
                </View>
            </TouchableOpacity>
            )}

             

         </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
