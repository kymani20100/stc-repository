import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, ImageBackground, TouchableOpacity,TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, TextInput, RadioButton, Divider, Avatar } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List'



const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    
   
    return (
        <SafeAreaView style={styles.mainContainer}>
               <View style={styles.headerContainer}>
                    <ImageBackground source={require('../images/icons/banner.png')} style={{width: '100%', height: 200}}>
                        <View style={styles.headerFloat}>
                            <View style={styles.drawerBarsIcon}>
                                <Ionicons name="arrow-back-outline" size={24} color='#003c30' onPress={() => navigation.goBack()} />
                            </View>

                            <View>
                                <Text style={styles.headerTitle}>SIGN UP</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
               

                {/* <Image source={require('../images/logo/logo.png')} style={styles.stc__logo} /> */}

                <View style={styles.formDetailsBg}>
                     <ScrollView>
                     <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={200}>

                      <Text style={styles.headerTextSign}>There is no record of that mobile number in our system.</Text>
                       <Text style={styles.headerTextSignSecondary}>Click below to proceed with the registration process.</Text>  
                    
                     {/* <View style={styles.form__input__container}>
                        <TextInput style={styles.text__input} 
                        theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                        mode="outlined"
                        selectionColor="#003c30" 
                        underlineColor="#003c30" 
                        outlineColor="grey" 
                        label="0548 187 719"
                        keyboardType="numeric"
                        maxLength={10}
                        minLength={10}
                         />
                    </View> */}

                    <TouchableWithoutFeedback
                        style={styles.signIn}
                        onPress={() => {navigation.navigate('OTP')}}>
                        <LinearGradient
                        colors={['#003c30',  '#0f352d']}
                        style={styles.signIn}>
                            <Text style={[styles.textSign, {
                                color:'#fff'
                        }]}>GET OTP</Text>
                        </LinearGradient>
                    </TouchableWithoutFeedback>

                    {/* <TouchableOpacity
                        onPress={() => {navigation.navigate('SignUp')}}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}>
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Authenticate with OTP</Text>
                    </TouchableOpacity> */}
                    <View style={styles.ScrollViewMargin}>
                                
                    </View>
                    </KeyboardAvoidingView>
                     </ScrollView>

                </View>
           
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#003c30',
    },
    headerContainer: {
        // justifyContent: 'space-between',
        height: 150,
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 35,
    },
    drawerBarsIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginLeft: 25,
        marginRight: 40,
        borderRadius: 20,
        // padding: 15,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 15,
    },
    stc__logo: {
        width: "50%",
        height: 90,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    signUpLink: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    formDetailsBg: {
        backgroundColor: '#FFF',
        width: '100%',
        height: height,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    avatar__img: {
        backgroundColor: '#FFF',
        position: 'relative',
        bottom: -50,
        zIndex: 1000,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 9,
    },
    form_layout: {
        marginTop: 25,
        // height: 400,
    },
    formScrollHeight: {
        height: 600,
    },
    textSign: {
        fontSize: 15,
        fontFamily: 'Montserrat-Light',
    },
    footer: {
        zIndex: 100,
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#FFF',
        color: '#FFF',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: width - 20,
        // height: height - 400,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    signIn: {
        width: '100%',
        height: 50,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text__input: {
        width: width - 20,
        height: 50,
        marginVertical: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    form__input__container: {
        width: width - 20,
    },
    ScrollViewMargin: {
        height: 105,
    },
    headerTextSign: {
        fontSize: 17,
        fontFamily: 'Montserrat-Regular',
        marginVertical: 10,

    },
    headerTextSignSecondary: {
        fontSize: 15,
        fontFamily: 'Montserrat-Light',
    }
    
})

export default SignUpScreen
