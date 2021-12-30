import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, TextInput, StatusBar, TouchableOpacity,TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';
// import { Octicons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Chip} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
const {width, height} = Dimensions.get('screen');
// import { LinearGradient } from 'expo-linear-gradient';
// import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
// import * as OTPActions from '../store/actions/OTP';
import * as authActions from '../store/actions/auth';
// import * as OTPLoginActions from '../store/actions/OTPLogin';
import Toast from 'react-native-toast-message';
import { Row, Grid } from "react-native-easy-grid";

const PasswordOTP = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [disable, setDisable] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [view, setView] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const {myMobileNo, traveller, departureTime, serviceType, destinationTerminal, tripID, travelDate, cityFrom, cityTo, busFare} = route.params;
    const Data = useSelector(state =>  state.OTP.availableOTP);

    // THIS BLOCK IS FOR THE AUTH USER DATA
    const PasswordToken = useSelector(state =>  state.auth.token);
    const PasswordPassID = useSelector(state =>  state.auth.passID);
    const PasswordPhone = useSelector(state =>  state.auth.phone);
    const PasswordName = useSelector(state =>  state.auth.name);
    const PasswordMessage = useSelector(state =>  state.auth.message);
    const PasswordPic = useSelector(state =>  state.auth.pic);
    const PasswordLoginMessage = useSelector(state =>  state.auth.message);
    // const OTPLoginData = useSelector(state =>  state.OTPLogin.loginOTP);

    const dispatch = useDispatch();

    const mobileNpassword = (mobile, password) => {
        // DISPATCH ACTION AND LET IT WAIT
        dispatch(authActions.fetchUser(mobile, password)).then(() => {
            setLoading(false);  
        });
    }

    const loginWithOTPASpassword = (routeNumber) => {
        // NAVIGATE AWAY
        ResetToOTP(routeNumber)
    }

    const ResetToOTP = (OTPMobileNumber) => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'RequestOTP', params: { myMobileNo: OTPMobileNumber, traveller: traveller, serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare }}],
        });
    }

    const ResetToLocation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Traveller', params: {traveller: traveller, serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare  }}],
        });
    }

    const ResetToMyHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home'}],
        });
    }

    // STORE DATA IS
    const storeToken = async (value) => {
        try {
          await AsyncStorage.setItem('userToken', value)
        } catch (e) {
          // saving error
        }
      }

      const storeUserId = async (value) => {
        try {
          await AsyncStorage.setItem('userID', value)
        } catch (e) {
          // saving error
        }
      }

      const storeName = async (value) => {
        try {
          await AsyncStorage.setItem('userFullname', value)
        } catch (e) {
          // saving error
        }
      }

      const storePic = async (value) => {
        try {
          await AsyncStorage.setItem('userPhoto', value)
        } catch (e) {
          // saving error
        }
      }

    useEffect(() => {
        if (!loading) {
            if(PasswordLoginMessage === 'Password provided does not match'){
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'PASSWORD VALIDATION',
                    text2: 'The password you provided was incorrect 🔐',
                    visibilityTime: 4000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                    onPress: () => {},
                    props: {} // any custom props passed to the Toast component
                  });
                    setDisable(false);
                    setToggle(true);
                    setLoading(true);  
            }else if (PasswordLoginMessage === 'Authentication successful'){
                // STORE THE VALUES
                storeToken(PasswordToken);
                storeUserId(PasswordPassID);
                storeName(PasswordName);
                storePic(PasswordPic);

                if(traveller !== null){
                    ResetToLocation();
                }else{
                    ResetToMyHome();
                }
            }
        }
    }, [loading, dispatch]);


    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
            <Grid>
                <Row size={80}>
                    <View style={styles.formDetailsBg}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}  enableAutomaticScroll={true} extraScrollHeight={150}>
                            <ScrollView keyboardShouldPersistTaps='handled'>
                            
                                <Formik initialValues={{ password: '' }}
                                        onSubmit={values => {
                                            console.log('Form', values)
                                            if(values.password.length !== 0){
                                                setDisable(true);

                                                mobileNpassword(myMobileNo, values.password);
                                                
                                            }else{
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'FORM VALIDATION',
                                                    text2: 'Provide your password before submitting 🔐',
                                                    visibilityTime: 4000,
                                                    autoHide: true,
                                                    topOffset: 30,
                                                    bottomOffset: 40,
                                                    onShow: () => {},
                                                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                    onPress: () => {},
                                                    props: {} // any custom props passed to the Toast component
                                                });
                                            }
                                        }}>
                                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                                        
                                        <ScrollView keyboardShouldPersistTaps='handled'>

                                            {/* <Text style={styles.formLabel}>PLEASE ENTER YOUR PASSWORD</Text>  */}

                                            <Image style={styles.myShadowTop} source={require('../images/icons/shadowTop.png')} />
                                                <View style={styles.pageFancyHeader}>
                                                    <Text style={styles.FormLabelTextSign}>PLEASE ENTER YOUR PASSWORD</Text>
                                                </View>
                                            <Image style={styles.myShadow} source={require('../images/icons/shadowss.png')} />


                                            <View style={styles.form_input_block}>
                                                <View style={styles.formIcon}>
                                                    <Image style={styles.OTP__mobile} source={require('../images/icons/password.png')} />
                                                </View>
                                                <View style={styles.formText}>
                                                    <TextInput style={styles.OTP__text__input} 
                                                    value={values.password}
                                                    secureTextEntry={true}
                                                    placeholder="Enter password"
                                                    keyboardType='default' 
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    onSubmitEditing={handleSubmit}
                                                    maxLength={50}
                                                    onSubmitEditing={handleSubmit}
                                                    /> 
                                                </View>
                                            </View>
                                
                                            
                                            {passwordError && (<Text style={{fontSize: 13, color: 'red', marginBottom: 15, fontFamily: 'Montserrat-Medium',}}>Password provided is incorrect.</Text>)}
                                            {error && (<Text style={{fontSize: 13, color: 'red', marginBottom: 15, fontFamily: 'Montserrat-Medium',}}>Password fields is invalid.</Text>)}

                                            {/* <View style={styles.textPrivate}>
                                                <Text style={styles.color_textPrivate}>
                                                    Enter `PASSWORD` to 
                                                </Text>
                                                <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold', color: 'red'}]}>{" "}Login</Text>
                                                <Text style={styles.color_textPrivate}>{" "}or</Text>
                                                <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold', color: 'red'}]}>{" "}Login With OTP</Text>

                                                <Text style={styles.color_textPrivate}>{" "}if you have forgotten your password</Text>
                                            </View> */}

                                            <View style={{marginTop: 15}}>
                                                <Button color='#003c30' contentStyle={{height: 50}} disabled={disable} mode="contained" onPress={handleSubmit}>
                                                    LOGIN
                                                </Button>
                                            </View>

                                            <View style={{marginTop: 5,alignItems: 'center'}}>
                                                {/* <Text style={{alignItems: 'center',}}>OR</Text> */}
                                            </View>

                                            <View style={{marginTop: 15}}>
                                                <Button color='#003c30' contentStyle={{height: 50,}} disabled={disabled} mode="outlined" onPress={() => {loginWithOTPASpassword(myMobileNo)}}>
                                                    LOGIN WITH OTP
                                                </Button>
                                            </View>

                                        </ScrollView>
                                    )}
                                        
                                    </Formik>
                                <View style={styles.ScrollViewMargin}></View>
                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </View>
                </Row>
            </Grid>
        </SafeAreaView>
    )
}

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
        // padding: 15,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        marginLeft: - 10,
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
    formLabel: {
        fontSize: 16,
        fontFamily: 'Montserrat-ExtraBold',
        marginBottom: 5,
        color: '#003c30',
        alignSelf: 'center'
        // justifyContent: 'center',
    },
    FormLabelTextSignTwo: {
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        marginVertical: 5,
        color: 'red'
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
    OTP__mobile: {
        width: 30,
        height: 30, 
        padding: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
    FormLabelTextSign: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        // marginBottom: 15,
        color: '#003c30',
        alignSelf: 'center'
    },
    myShadow: {
        width: width,
        zIndex: 9,
        marginTop: -39,
    },
    myShadowTop: {
        width: width,
        zIndex: 9,
        marginBottom: -24,
    }
})

export default PasswordOTP
