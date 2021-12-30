import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ImageBackground, TextInput, TouchableOpacity, Platform, Alert, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Chip} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import * as OTPActions from '../store/actions/OTP';
import * as passwordActions from '../store/actions/passwordLogin';
import * as OTPLoginActions from '../store/actions/OTPLogin';
import * as OTPAuthActions from '../store/actions/OTPAuthentication';
import * as authActions from '../store/actions/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Row, Grid } from "react-native-easy-grid";

const RequestOTP = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(true);
    const [form, setForm] = useState('');
    const [disable, setDisable] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [resend, setResend] = useState(false);
    const [error, setError] = useState(false);
    const {myMobileNo, traveller, departureTime, serviceType, destinationTerminal,  tripID, travelDate, cityFrom, cityTo, busFare} = route.params;
    // const Data = useSelector(state =>  state.OTP.availableOTP);
    // const PasswordLoginUserData = useSelector(state =>  state.passwordLogin.loginUser);

    // GET OTP EVEN IF YOU REGISTERED
    const OTPLoginData = useSelector(state =>  state.OTPLogin.loginOTP);

    // THIS BLOCK IS FOR THE AUTH USER DATA
    const OTPAuthLoginMessage = useSelector(state =>  state.auth.message);
    const OTPAuthLoginToken = useSelector(state =>  state.auth.token);
    const OTPAuthLoginPassID = useSelector(state =>  state.auth.passID);
    const OTPAuthLoginPhone = useSelector(state =>  state.auth.phone);
    const OTPAuthLoginName = useSelector(state =>  state.auth.name);
    const OTPAuthLoginPic = useSelector(state =>  state.auth.pic);

    const dispatch = useDispatch();

    const mobileNotp = (mobile, otp) => {
        // DISPATCH ACTION AND LET IT WAIT
        dispatch(authActions.OTPAuthen(mobile, otp)).then(() => {
            setReady(false);  
        });
    }

   // CREATE A FUNCTION TO MATCH TYPED AND OTP
   const OTPmatch = (context, typed) => {
        if(context === typed){
            return true;
        }
        return false;
   }

    const resentToRestart = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn'}],
          });
    }

    // console.log('OTP LOGIN MESSAGE', OTPAuthLoginMessage)

    useEffect(() => {
        // DISPATCH ACTION AND LET IT WAIT
        dispatch(OTPLoginActions.OTPlogin(myMobileNo)).then(() => {
            setLoading(false);  
        });
    }, [])

    useEffect(() => {
        // DISPATCH ACTION AND LET IT WAIT
        dispatch(OTPLoginActions.OTPlogin(myMobileNo)).then(() => {
            setLoading(false);  
        });
    }, [resend])

    const Home = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { myMobileNo: '1' }  }],
        });
    }

    const ResetToLocation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Traveller', params: {traveller: traveller, serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare }}],
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
        if (!ready) {
            if(OTPAuthLoginMessage === 'Authentication successful'){
                // STORE THE VALUES LOCALLY
                storeToken(OTPAuthLoginToken);
                storeUserId(OTPAuthLoginPassID);
                storeName(OTPAuthLoginName);
                storePic(OTPAuthLoginPic);
                
                if(traveller === null){
                    Home();
                }else{
                    ResetToLocation();
                }
            }else{
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'OTP ERROR',
                    text2: 'The OTP digit provided does not match 🔐',
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
        }
      }, [ready, dispatch]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
        <Grid>
            <Row size={100}>
                 <View style={styles.formDetailsBg}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}  enableAutomaticScroll={true} extraScrollHeight={90}>
                        <ScrollView keyboardShouldPersistTaps='handled'>

                            {/* <Text style={styles.formLabel}>Enter the OTP sent via SMS to </Text> */}
                            <Image style={styles.myShadowTop} source={require('../images/icons/shadowTop.png')} />
                                <View style={styles.pageFancyHeader}>
                                    <Text style={styles.FormLabelTextSign}>Enter the OTP sent via SMS to </Text>
                                </View>
                            <Image style={styles.myShadow} source={require('../images/icons/shadowss.png')} />
                            <View style={[styles.formLabelNumber, {alignSelf: 'center', marginTop: -10, zIndex: 1000}]}>
                                {/* <Chip type="flat" icon="phone" onPress={() => console.log('Pressed')}>{myMobileNo}</Chip> */}
                                <Text>{myMobileNo}</Text>
                            </View>

                            <Formik initialValues={{ otpData: ''}}
                                    onSubmit={values => {
                                        if(values.otpData.length === 6){
                                            if(OTPmatch(OTPLoginData.MobileLoginInformations[0].Msg, values.otpData) === true){
                                                mobileNotp(myMobileNo, OTPLoginData.MobileLoginInformations[0].Msg);
                                            }else{
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'OTP ERROR',
                                                    text2: 'Please provide a recent 6 digit OTP 🔐',
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
                                            
                                        }else{
                                            Toast.show({
                                                type: 'error',
                                                position: 'bottom',
                                                text1: 'OTP ERROR',
                                                text2: 'The OTP digit provided must be 6 characters 🔐',
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
                                    }}>
                                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                                    
                                    <ScrollView keyboardShouldPersistTaps='handled'>

                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/phone-one.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                value={values.otpData}
                                                placeholder="Enter OTP"
                                                keyboardType="numeric" 
                                                onChangeText={handleChange('otpData')}
                                                onBlur={handleBlur('otpData')}
                                                onSubmitEditing={handleSubmit}
                                                maxLength={6}
                                                onSubmitEditing={handleSubmit}
                                                /> 
                                            </View>
                                        </View>

                                        <View style={{flexDirection: 'row',}}>
                                            <View style={styles.formLabelSmall}>
                                            <TouchableOpacity onPress={() => {setResend(true)}}>
                                                <Text style={styles.resendOTPText}>Resend OTP</Text>
                                            </TouchableOpacity>

                                            </View>
                                        </View> 

                                        <View style={{marginTop: 15}}>
                                            <Button color='#003c30' contentStyle={{height: 50}} disabled={disable} mode="contained" onPress={handleSubmit}>
                                                LOGIN
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
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        marginLeft: -15,
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
        paddingVertical: -20,
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
        height: 110,
    },
    formLabel: {
        fontSize: 16,
        fontFamily: 'Montserrat-ExtraBold',
        marginBottom: 5,
        color: '#003c30',
        alignSelf: 'center'
        // justifyContent: 'center',
    },
    formLabelNumber: {
        fontSize: 18,
        fontFamily: 'Montserrat-Black',
        marginTop: 10,
        marginBottom: -40,
        color: 'red',
    },
    formLabelSmall: {
        width: width - 30,
        fontSize: 15,
        fontFamily: 'Montserrat-ExtraBold',
        marginVertical: 10,
        color: '#003c30',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    errorMessage: {
        color: 'red',
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
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
        marginTop: 65
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
    resendOTPText: {
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        alignSelf: 'flex-end'
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

export default RequestOTP
