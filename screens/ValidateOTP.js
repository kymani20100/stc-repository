import React, {useState, useRef, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, ImageBackground, TextInput, TouchableOpacity,TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Button, TextInput, RadioButton, Divider, Avatar } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List'



const ValidateOTP = ({navigation}) => {
    let textInput = useRef(null)
    let lengthInput = 6;
    let clockCall = null;
    const defaultCountdown = 5;
    const [focusInput, setFocusInput] = useState(true);
    const [internalVal, setinternalVal] = useState('');
   const [countdown, setCountdown] = useState(defaultCountdown);
    const [enableResend, setEnableResend] = useState(false);

    const onChangeText = (val) => {
        setinternalVal(val)
        if(val.length === lengthInput){
            navigation.navigate('QuickLogin')
        }
    }

    const onPressContinue = () => {
        if(phoneNumber){
            navigation.navigate('InputOTP')
        }
    }

    const onChangeFocus = () => {
        setFocusInput(true)
    }

    const onChangeBlur = () => {
        setFocusInput(false)
    }

    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000)
        return () => {
            clearInterval(clockCall)
        }
    })

    const decrementClock= () => {
        if(countdown === 0){
            setEnableResend(true)
            setCountdown(0)
            clearInterval(clockCall)
        }else{
            setCountdown(countdown - 1);
        }
       
    }

    const onChangeNumber = () => {
        setinternalVal('')
    }

    const onResendOTP = () => {
        if(enableResend){
            setCountdown(defaultCountdown)
            setEnableResend(false)
            clearInterval(clockCall)
            this.clockCall = setInterval(() => {
                decrementClock()
            }, 1000)
        }
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
                        <Text style={styles.headerTitle}>OTP Login</Text>
                    </View>
                </View>

                <Image source={require('../images/logo/logo.png')} style={styles.stc__logo} />

                <View style={styles.formDetailsBg}>
                    
                    <KeyboardAvoidingView style={styles.containerAvoidingView} behavior='padding' keyboardVerticalOffset={50}>
                        <Text style={styles.textTile}>Enter your OTP code sent via SMS</Text>
                        <View>
                            <TextInput
                                ref={(input) => textInput = input}
                                onChangeText={onChangeText}
                                style={{width: 0, height: 0}}
                                value={internalVal}
                                maxLength={lengthInput}
                                returnKeyType="done"
                                keyboardType="numeric"
                            />

                            <View style={styles.containerInput}>
                                {
                                    Array(lengthInput).fill().map((data, index) => (
                                        <View key={index} style={styles.cellView, { borderBottomColor: index === internalVal.length ? '#000' : '#CCC'}}>
                                            <Text style={styles.cellText}
                                            onPress={() => textInput.focus()}>
                                                {internalVal && internalVal.length > 0 ? internalVal[index] : ''}
                                            </Text>
                                        </View>
                                    ))
                                }
                                
                            </View>
                        </View>

                                <View style={styles.bottomView}>
                                    <TouchableOpacity onPress={onChangeNumber}>
                                        <View style={styles.btnChangeNumber}>
                                            <Text style={styles.textChange}>Change Number</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={onResendOTP}>
                                        <View style={styles.btnResend}>
                                            <Text style={styles.textResend,{color: enableResend ? '#234DB7' : 'gray'}}>Resend OTP ({countdown})</Text>
                                        </View>
                                    </TouchableOpacity>

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
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    cellView: {
        paddingVertical: 11,
        width: 40,
        marginVertical: 15,
        // backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5
    },
    stc__logo: {
        width: "50%",
        height: 90,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16
    }, 
    bottomView: {
        flexDirection: 'row',
        flex: 1,
        // justifyContent: 'flex-end',
        marginBottom: 50,
        // alignItems: 'flex-end',
    },
    btnChangeNumber: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    textChange: {
        color: '#234DB7',
        alignItems: 'center',
        fontSize: 16,
    }, 
    btnResend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        // alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textResend: {
        alignItems: 'center',
        fontSize: 16,
    }
    
})

export default ValidateOTP
