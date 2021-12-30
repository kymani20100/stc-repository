import React, {useState, useRef, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, ImageBackground, TouchableOpacity,TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
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

const QuickLogin = ({navigation}) => {
    let textInput = useRef(null)
    const [focusInput, setFocusInput] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
   
    const onChangePhone = (number) => {
        setPhoneNumber(number)
    }

    const onPressContinue = () => {
        if(phoneNumber){
            navigation.navigate('ValidateOTP')
        }
    }

    const onChangeFocus = () => {
        setFocusInput(true)
    }

    const onChangeBlur = () => {
        setFocusInput(false)
    }

    useEffect(() => {
        textInput.focus()
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ImageBackground source={require('../images/icons/bg.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.headerContainer}>
                    <View style={styles.drawerBarsIcon}>
                        <FontAwesome name="bars" size={24} color='#003c30' onPress={() => navigation.toggleDrawer()} />
                    </View>

                    <View>
                        <Text style={styles.headerTitle}>Log With OTP</Text>
                    </View>
                </View>

                <Image source={require('../images/logo/logo.png')} style={styles.stc__logo} />

                <View style={styles.formDetailsBg}>
                    
                     <KeyboardAvoidingView style={styles.containerAvoidingView} behavior='padding' keyboardVerticalOffset={50}>
                       
                       <View>
                           <Text style={styles.textTitle}>
                               Please enter your mobile number 
                           </Text>
                       </View>

                       <View style={styles.form__input__container}>
                       <TextInput style={styles.text__input} 
                        theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                        mode="outlined"
                        ref={(input) => textInput = input}
                        selectionColor="#003c30" 
                        underlineColor="#003c30" 
                        outlineColor="grey" 
                        value={phoneNumber}
                        label="0548 187 719"
                        keyboardType="numeric"
                        onChangeText={onChangePhone}
                        secureTextEntry={false}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}
                        autoFocus={focusInput}
                        maxLength={10}
                        minLength={10}
                         />
                    </View>

                    <TouchableWithoutFeedback
                        style={styles.signIn}
                        onPress={() => {navigation.navigate('SignUp')}}>
                        <LinearGradient
                        colors={['#003c30',  '#0f352d']}
                        style={styles.signIn}>
                            <Text style={[styles.textSign, {
                                color:'#fff'
                        }]}>LOGIN / SIGNUP</Text>
                        </LinearGradient>
                    </TouchableWithoutFeedback>

                      
                    <View style={styles.ScrollViewMargin}>
                                
                    </View>
                    </KeyboardAvoidingView>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: 35, 
        paddingVertical: 15,
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
    headerTitle: {
        color: '#003c30',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 50,
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
        // justifyContent: 'center'
        alignItems: 'center',
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
    containerAvoidingView: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    textTitle: {
        marginBottom: 50,
        marginTop: 50,
        fontSize: 15
    },
    containerInput: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderBottomWidth: 1.5
    },
    openDialogView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    phoneInputStyle: {
        marginLeft: 10,
        // flex: 1,
        height: 50,
    },
    viewBottom: {
        flex: 1,
        // justifyContent: 'flex-end',
        marginBottom: 10,
    },
    btnContinue: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
    
})

export default QuickLogin
