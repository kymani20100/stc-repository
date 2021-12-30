import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Platform, Dimensions, Share, ScrollView, Button,TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
// THIS IS WHERE THE MAGIC HAPPENS
import * as Sharing from 'expo-sharing';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List'



const ShareScreen = ({navigation}) => {

  
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
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.formDetailsBg}>
            <View style={{ marginTop: 50 }}>
            <Button onPress={onShare} title="Share" />
            </View>
        </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        height: 150,
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 35,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 50
    },
    drawerBarsIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginLeft: 25,
        marginRight: 20,
        borderRadius: 20,
        // padding: 15,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        alignItems: 'center',
    },
})

export default ShareScreen
