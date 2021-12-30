import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, ImageBackground, TextInput,TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Avatar, Chip } from 'react-native-paper';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import { Audio } from 'expo-av';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as OTPAuthActions from '../store/actions/OTPAuthentication';
import * as OTPLoginActions from '../store/actions/OTPLogin';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Row, Grid } from "react-native-easy-grid";

const ChangePasswordScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(true);
    const [sound, setSound] = useState();

    // GET LOGIN CREDENTIAL WITH OTP AND MOBILE NUMBER
    const OTPLoginData = useSelector(state =>  state.OTPLogin.loginOTP);
    // GET LOGIN CREDENTIAL WITH OTP AND MOBILE NUMBER
    const phoneAuthData = useSelector(state =>  state.auth.phone);

    // const myMobileNo = '0542634605';
    const [myMobileNo, setmyMobileNo] = useState(phoneAuthData);

    // CREATE A FUNCTION TO MATCH TYPED AND OTP
   const OTPmatch = (context, typed) => {
        if(context === typed){
            return true;
        }
        return false;
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
        // DISPATCH ACTION AND LET IT WAIT
        dispatch(OTPLoginActions.OTPlogin(myMobileNo)).then(() => {
            setLoading(false);  
        });
    }, [])

    useEffect(() => {
        if (!ready) {
            
        }
      }, [ready]);

    return (
        <SafeAreaView style={styles.mainContainer}>
        <Grid>
               

                <Row size={100}>
                    <View style={styles.formDetailsBg}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}  enableAutomaticScroll={true} extraScrollHeight={180}>
                     <ScrollView keyboardShouldPersistTaps='handled'>

                      <Image style={styles.myShadowTop} source={require('../images/icons/shadowTop.png')} />
                            <View style={styles.pageFancyHeader}>
                                <Text style={styles.FormLabelTextSign}>FILL THE FORM TO UPDATE PASSWORD</Text>
                            </View>
                        <Image style={styles.myShadow} source={require('../images/icons/shadowss.png')} />

                        <Formik initialValues={{ otpData: ''}}
                                onSubmit={values => {
                                    // console.log('Form', values)
                                    if(values.otpData.length === 6){
                                        if(OTPmatch(OTPLoginData.MobileLoginInformations[0].Msg, values.otpData) === true){
                                            Toast.show({
                                                type: 'success',
                                                position: 'top',
                                                text1: 'OTP Success',
                                                text2: 'The OTP digit provided is a match 🔐',
                                                visibilityTime: 4000,
                                                autoHide: true,
                                                topOffset: 90,
                                                bottomOffset: 40,
                                                onShow: () => {},
                                                onHide: () => {}, 
                                                onPress: () => {},
                                                props: {}
                                            });
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

                                 <ScrollView>

                            <View style={styles.form_input_block}>
                                <View style={styles.formIcon}>
                                    <Image style={styles.OTP__mobile} source={require('../images/icons/sms.png')} />
                                </View>
                                <View style={styles.formText}>
                                    <TextInput style={styles.OTP__text__input} 
                                    autoCapitalize="none"
                                    placeholder="Enter the  OTP"
                                    keyboardType='numeric' 
                                    maxLength={6} 
                                    value={values.otpData}
                                    onChangeText={handleChange('otpData')}
                                    onBlur={handleBlur('otpData')}
                                    onSubmitEditing={() => {}}
                                    /> 
                                </View>
                            </View>
                    

                        <View style={styles.form_input_block}>
                            <View style={styles.formIcon}>
                                <Image style={styles.OTP__mobile} source={require('../images/icons/password.png')} />
                            </View>
                            <View style={styles.formText}>
                                <TextInput style={styles.OTP__text__input}
                                secureTextEntry={true}
                                placeholder="Enter your new password"
                                keyboardType='default' 
                                maxLength={30} 
                                autoCapitalize="none"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                onSubmitEditing={() => {}}
                                /> 
                            </View>
                        </View>

                        <View style={styles.form_input_block}>
                            <View style={styles.formIcon}>
                                <Image style={styles.OTP__mobile} source={require('../images/icons/confirm.png')} />
                            </View>
                            <View style={styles.formText}>
                                <TextInput style={styles.OTP__text__input} 
                                autoCapitalize="none"
                                secureTextEntry={true}
                                placeholder="Confirm your new password"
                                keyboardType='default' 
                                maxLength={30}
                                value={values.confirm}
                                onChangeText={handleChange('confirm')}
                                onBlur={handleBlur('confirm')} 
                                onSubmitEditing={() => {}}
                                /> 
                            </View>
                        </View>

                        <View style={{marginTop: 15, width: width - 25,}}>
                            <Button color='#003c30' contentStyle={{height: 50}} disabled={false} mode="contained" onPress={handleSubmit}>
                                UPDATE PASSWORD
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
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 10,
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
        // marginTop: 20,
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
    formLabel: {
        fontSize: 17,
        fontFamily: 'Montserrat-Regular',
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
    FormLabelTextSign: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        color: '#003c30',
        alignSelf: 'center'
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
    OTP__mobile: {
        width: 30,
        height: 30, 
        padding: 5,
        justifyContent: 'center',
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

export default ChangePasswordScreen
