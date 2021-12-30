import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, StatusBar, ImageBackground, TouchableOpacity,TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Chip } from 'react-native-paper';
import { Formik } from 'formik';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List';
import { useSelector, useDispatch } from 'react-redux';
import * as authenticationActions from '../store/actions/authentication';
import * as authActions from '../store/actions/auth';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Row, Grid } from "react-native-easy-grid";
import { Audio } from 'expo-av';

const SignUpFormScreen = ({navigation, route}) => {
    const {myMobileNo, traveller, departureTime, serviceType, destinationTerminal, tripID, travelDate, cityFrom, cityTo, busFare} = route.params;
    const [view, setView] = useState(true);
    const [views, setViews] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loadings, setLoadings] = useState(true);
    const [sound, setSound] = useState();

    // THIS BLOCK REGISTERS A USER
    const AuthenticationForm = (mobile, OTP, password, fullname) => {
        dispatch(authActions.Registeration(mobile, OTP, password, fullname)).then(() => {
            setLoadings(false);  
        });
    }

    // FUNCTION TO CHECK IF THE PASSWORD FILEDS MATCH
    const matchPasswords = (pass, conf) => {
        if(pass === conf){
            return true;
        }
        return false;
    }

    const Home = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { myMobileNo: '1' }  }],
        });
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

    const ResetToLocation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Traveller', params: {traveller: traveller, serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare }}],
        });
    }

    // GET LOGIN CREDENTIAL WITH OTP AND MOBILE NUMBER
    const OTPAuth            = useSelector(state =>  state.auth.token);
    const messageAuth        = useSelector(state =>  state.auth.message);
    const OTPAuthLoginPassID = useSelector(state =>  state.auth.passID);
    const OTPAuthLoginPhone  = useSelector(state =>  state.auth.phone);
    const OTPAuthLoginName   = useSelector(state =>  state.auth.name);
    const OTPAuthLoginPic    = useSelector(state =>  state.auth.pic);

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
        if (!loadings) {
            if(messageAuth === 'OTP Not Match'){
                setDisabled(false);
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'OTP ERROR',
                    text2: "OTP does not match, please try again",
                    visibilityTime: 6000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {}, 
                    onPress: () => {},
                    props: {} 
                  });
            }else if(OTPAuth === null){
                setDisabled(false);
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'REGISTRATION UNSUCCESSFUL',
                    text2: "There seems to be an error, try again",
                    visibilityTime: 6000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {}, 
                    onPress: () => {},
                    props: {} 
                  });
            }else if(messageAuth === 'Registration successful'){
                // STORE THE VALUES LOCALLY
                storeToken(OTPAuth);
                storeUserId(OTPAuthLoginPassID);
                storeName(OTPAuthLoginName);
                storePic(OTPAuthLoginPic);

                if(traveller !== null){
                    ResetToLocation();
                }else{
                    Home();
                }
            }else{
                Home();  
            }
            
        }
      }, [loadings]);

    useEffect(() => {
        Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'NOT REGISTERED',
            text2: "Seems we don't have your record. Register to proceed",
            visibilityTime: 6000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onShow: () => {},
            onHide: () => {}, 
            onPress: () => {},
            props: {} 
          });
      }, []);

     

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
            <Grid>
                <Row size={100}>
                    <View style={styles.formDetailsBg}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}  enableAutomaticScroll={true} extraScrollHeight={60}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                                <Image style={styles.myShadowTop} source={require('../images/icons/shadowTop.png')} />
                                    <View style={styles.pageFancyHeader}>
                                        <Text style={styles.FormLabelTextSign}>PLEASE FILL OUT THE FORM BELOW </Text>
                                    </View>
                                <Image style={styles.myShadow} source={require('../images/icons/shadowss.png')} />

                                    <Formik initialValues={{ otpData: '', name: '', password: '', confirm: '' }}
                                            onSubmit={values => {
                                                setDisabled(true);
                                                if(values.otpData.length === 6 && values.name !== '' && values.password !== '' && values.confirm !== ''){
                                                    // CHECK IF PASSWORDS MATCH
                                                    if(matchPasswords(values.password, values.confirm)){
                                                        AuthenticationForm(myMobileNo, values.otpData, values.password, values.name)
                                                    }else {
                                                        Toast.show({
                                                            type: 'error',
                                                            position: 'bottom',
                                                            text1: 'PASSWORD ERROR',
                                                            text2: 'Password and Confirm Password do not match.',
                                                            visibilityTime: 4000,
                                                            autoHide: true,
                                                            topOffset: 30,
                                                            bottomOffset: 40,
                                                            onShow: () => {},
                                                            onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                            onPress: () => {},
                                                            props: {} // any custom props passed to the Toast component
                                                        });
                                                        setDisabled(false);
                                                    }
                                                    
                                                }else{
                                                    Toast.show({
                                                        type: 'error',
                                                        position: 'bottom',
                                                        text1: 'FORM FIELD ERROR',
                                                        text2: 'Please provide values before submitting.',
                                                        visibilityTime: 4000,
                                                        autoHide: true,
                                                        topOffset: 30,
                                                        bottomOffset: 40,
                                                        onShow: () => {},
                                                        onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                        onPress: () => {},
                                                        props: {} // any custom props passed to the Toast component
                                                    });
                                                    setDisabled(false);
                                                }
                                            }}>
                                            {({ handleChange, handleBlur, handleSubmit, values }) => (

                                    <>

                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/sms.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                placeholder="Enter OTP"
                                                keyboardType="number-pad"
                                                maxLength={6}
                                                onChangeText={handleChange('otpData')}
                                                onBlur={handleBlur('otpData')}
                                                value={values.otpData}
                                                // onSubmitEditing={handleSubmit}
                                                /> 
                                            </View>
                                        </View>

                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/name.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                placeholder="Enter full name"
                                                keyboardType="default"
                                                maxLength={30}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                value={values.name}
                                                /> 
                                            </View>
                                        </View>

                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/password.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                placeholder="Enter password"
                                                keyboardType="default"
                                                maxLength={30}
                                                secureTextEntry={true}
                                                keyboardType="default"
                                                autoCapitalize="none"
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                /> 
                                            </View>
                                        </View>

                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/confirm.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                placeholder="Confirm password"
                                                keyboardType="default"
                                                maxLength={20}
                                                secureTextEntry={true}
                                                keyboardType="default"
                                                autoCapitalize="none"
                                                onChangeText={handleChange('confirm')}
                                                onBlur={handleBlur('confirm')}
                                                value={values.confirm}
                                                /> 
                                            </View>
                                        </View>

                                        <View style={styles.textPrivate}>
                                            <Text style={styles.color_textPrivate}>
                                                By clicking `SIGN UP` you agree to our
                                            </Text>
                                            <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold', color: 'red'}]}>{" "}Terms of service</Text>
                                            <Text style={styles.color_textPrivate}>{" "}and</Text>
                                            <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold', color: 'red'}]}>{" "}Privacy policy</Text>
                                        </View>
                                        <View style={{marginTop: 15, width: width -25}}>
                                            <Button color='#003c30' contentStyle={{height: 50}} disabled={disabled} mode="contained" onPress={handleSubmit}>
                                                SIGN UP
                                            </Button>
                                        </View>
                                    </>
                                    )}        
                                    </Formik>
                                    {/* THIS BLOCK PROVIDES THE BOTTOM PADDING */}
                                    <View style={styles.ScrollViewMargin}></View>
                                {/* </KeyboardAvoidingView> */}
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
        backgroundColor: '#fff',
    },
    headerContainer: {
        // justifyContent: 'space-between',
        height: 150,
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 25,
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
        marginLeft: 5,
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
        marginTop: - 10,
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
        height: 240,
    },
    formLabel: {
        fontSize: 16,
        fontFamily: 'Montserrat-ExtraBold',
        marginBottom: 10,
        color: '#003c30',
        alignSelf: 'center'
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

export default SignUpFormScreen
