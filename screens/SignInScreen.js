import React, {useState,useEffect, useCallback, useRef} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Vibration, Alert, ImageBackground, TouchableOpacity,StatusBar, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Chip } from 'react-native-paper';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as OTPActions from '../store/actions/OTP';
import Toast from 'react-native-toast-message';
import ReferenceSet from 'yup/lib/util/ReferenceSet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Row, Grid } from "react-native-easy-grid";
import { Audio } from 'expo-av';

const SignInScreen = ({navigation, route}) => {
    const Data = useSelector(state =>  state.OTP.availableOTP);
    const dispatch = useDispatch();
    const [mobi, setMobile] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState('');
    const [disable, setDisable] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [sound, setSound] = useState();

    const {
        traveller, 
        departureTime, 
        serviceType, 
        destinationTerminal, 
        tripID, 
        travelDate,
        cityFrom, 
        cityTo,
        busFare
    } = route.params;
    let mobileInput = useRef(null);

    const [text, setText] = React.useState('');
    const hasUnsavedChanges = Boolean(text);

    const OTPForm = (number) => {
        // DISPATCH ACTION AND LET IT WAIT
        dispatch(OTPActions.fetchOTP(number)).then(() => {
            setLoading(false);  
        });
    }

    const RestartBucketHandler = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'PasswordOTP', params: { myMobileNo: mobi, traveller: traveller, serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare } }],
          });
    }

    const ResetToSignup = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpForm', params: { myMobileNo: mobi, traveller: traveller, serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare }  }],
          });
    }

    const PassNavigate = (PID) => {
        RestartBucketHandler();
    }

    useEffect(() => {
        if (!loading) {
            if(Data.MobileLoginInformations[0].Status === '0'){
                setError(true);
                setDisable(false);
            }
            
            if(Data.MobileLoginInformations[0].Status === '1'){
                PassNavigate(JSON.stringify(Data.MobileLoginInformations[0].PassID));
            }
            
            if(Data.MobileLoginInformations[0].Status === '2'){
                ResetToSignup();
            }
        }
    }, [loading]);

    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 5000)
    }, [error])

    // STORE VALUE OF MOBILE

    const storeMobile = async (value) => {
        try {
            await AsyncStorage.setItem('mobile', value);
        } catch (e) {
            console.log('Async Mobile Error',e);
        }
    }

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
        

    useEffect(() => {
        storeMobile(mobi)
    }, [mobi])
    

    useEffect(() => {
        if(traveller !== null){
            Toast.show({
                type: 'info',
                position: 'bottom',
                text1: 'PLEASE NOTE',
                text2: 'You must be Logged in order to proceed',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {}, 
                onPress: () => {},
                props: {} 
            });
        }
      }, []);



    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
            <Grid>
                <Row size={100}>
                    <View style={styles.formDetailsBg}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}  enableAutomaticScroll={true} extraScrollHeight={90}>
                            <ScrollView keyboardShouldPersistTaps='handled'>
                                <Image style={styles.myShadowTop} source={require('../images/icons/shadowTop.png')} />
                                    <View style={styles.pageFancyHeader}>
                                        <Text style={styles.FormLabelTextSign}>PLEASE ENTER YOUR MOBILE NUMBER</Text>
                                    </View>
                                <Image style={styles.myShadow} source={require('../images/icons/shadowss.png')} />

                                <Formik initialValues={{ mobile: '' }}
                                    onSubmit={values => {
                                        // console.log('Form', values);
                                        if(values.mobile.length !== 10){
                                            // VIBRATE TO CALL ATTENTION
                                            Vibration.vibrate(10 * 100);
                                            Toast.show({
                                                type: 'error',
                                                position: 'bottom',
                                                text1: 'FORM ERROR',
                                                text2: 'Please provide a valid phone number 📱',
                                                visibilityTime: 4000,
                                                autoHide: true,
                                                topOffset: 30,
                                                bottomOffset: 40,
                                                onShow: () => {},
                                                onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                onPress: () => {},
                                                props: {} // any custom props passed to the Toast component
                                            });
                                            // setError(true);
                                        }else if(values.mobile[0] !== '0' || values.mobile[1] === '0') {
                                            // VIBRATE TO CALL ATTENTION
                                            Vibration.vibrate(10 * 100);
                                            Toast.show({
                                                type: 'error',
                                                position: 'bottom',
                                                text1: 'FORM ERROR',
                                                text2: 'Please check the phone number you provided📱',
                                                visibilityTime: 4000,
                                                autoHide: true,
                                                topOffset: 30,
                                                bottomOffset: 40,
                                                onShow: () => {},
                                                onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                onPress: () => {},
                                                props: {} // any custom props passed to the Toast component
                                            });
                                        }else{
                                            setDisable(true);
                                            setMobile(values.mobile);
                                            OTPForm(values.mobile);
                                        }
                                    }}>
                                
                                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                                        <View>
                                            <View style={styles.form_input_block}>
                                                <View style={styles.formIcon}>
                                                    <Image style={styles.OTP__mobile} source={require('../images/icons/phone-one.png')} />
                                                </View>
                                                <View style={styles.formText}>
                                                    <TextInput style={styles.OTP__text__input} 
                                                        onChangeText={handleChange('mobile')}
                                                        onBlur={handleBlur('mobile')}
                                                        value={values.mobile}
                                                        placeholder="Enter mobile"
                                                        keyboardType='numeric' 
                                                        maxLength={10} 
                                                        onSubmitEditing={handleSubmit}
                                                    /> 
                                                </View>
                                            </View>

                                            <View style={[styles.textPrivate, {width: width - 25}]}>
                                                <Text style={styles.color_textPrivate}>
                                                    Enter number to 
                                                </Text>
                                                <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold', color: 'red'}]}>{" "}Login</Text>
                                                <Text style={styles.color_textPrivate}>{" "}or</Text>
                                                <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold', color: 'red'}]}>{" "}Register</Text>
                                            </View>
                                        
                                            <View style={{marginTop: 15, width: width - 25}}>
                                                <Button color='#003c30' contentStyle={{height: 50}} disabled={disable} mode="contained" onPress={handleSubmit}>
                                                    LOGIN / SIGNUP
                                                </Button>
                                            </View>
                                        </View>
                                    )}
                                </Formik>
                                {/* THI BLOCK CREATES A SPACE BENEATH FORM */}
                                <View style={styles.ScrollViewMargin}></View>
                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </View>
                </Row>
            </Grid>  
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
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
    drawerBarsIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginLeft: 10,
        marginRight: 40,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: -10
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
        bottom: - 50,
        zIndex: 1000,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 9,
    },
    form_layout: {
        marginTop: 25,
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
    pageFancyHeader: {
        width: width - 22,
        height: 40,
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderLeftColor: '#003c30',
        borderRightColor: '#003c30',
        marginBottom: 15,
        zIndex: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    form__input__container: {
        width: width - 20,
    },
    ScrollViewMargin: {
        height: 125,
    },
    FormLabelTextSign: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        // marginBottom: 15,
        color: '#003c30',
        alignSelf: 'center'
    },
    FormLabelTextSignTwo: {
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
        marginVertical: 5,
        color: 'black'
    },
    OTP: {
        flexDirection: 'row',
        width: width - 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius:10,
        height: 50
    },
    OTP__mobile: {
        width: 30,
        height: 30, 
        padding: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    form_input_block: {
        flex: 1,
        flexDirection: 'row',
        width: width - 25,
        height: 50,
        borderWidth: 1,
        borderColor: '#003c30',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    formIcon: {
        width: 40,
        height: 40,
        borderRightWidth: 1,
        borderRightColor: '#003c30',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 3,
    },
    formText: {
        flex: 1,
        marginLeft: 15,
        position: 'relative',
        bottom: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    OTP__text__input: {
        width: '100%', 
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        bottom: 0
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'center',
    },
    color_textPrivate: {
        color: 'black',
        fontFamily: 'Montserrat-Light',
    },
    myShadow: {
        width: width,
        zIndex: 9,
        marginTop: - 39,
    },
    myShadowTop: {
        width: width,
        zIndex: 9,
        marginBottom: - 24,
    }
})
