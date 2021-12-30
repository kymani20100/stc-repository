import React, {useState, useEffect, useCallback, Component} from 'react';
import { View, Text, SafeAreaView, StyleSheet, BackHandler, Alert, StatusBar, TouchableOpacity, TextInput, FlatList, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { AntDesign } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Button, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import plants from '../components/plants';
import Countries from '../components/countries';
import Types from '../components/types';
import Gender from '../components/gender';
import CustomDate from '../components/customDate';
import { Formik } from 'formik';
 import * as Yup from 'yup';
 import Toast from 'react-native-toast-message';

// REDUX MAGIC
import {useSelector, useDispatch} from 'react-redux';
import { emptyBooking } from '../store/actions/booking';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as authActions from '../store/actions/auth';
import { Col, Row, Grid } from "react-native-easy-grid";

const TravellerDetailsScreen = ({route, navigation}) => {
    let {traveller, 
        departureTime, 
        serviceType, 
        destinationTerminal, 
        tripID, 
        travelDate,
        cityFrom, 
        cityTo,
        busFare
    } = route.params;
    const dispatch = useDispatch();
    console.log('This is the traveller', traveller)
    console.log('SERVICE TYPE', serviceType)
    
  const tokenCode = useSelector(state =>  state.auth.token);
  const picUrl = useSelector(state =>  state.auth.pic);
  const mobile = useSelector(state =>  state.auth.phone);
  const userName = useSelector(state =>  state.auth.name);

    // console.log('Traveller',JSON.parse(traveller));
    const bookedSeats = useSelector(state =>  state.booking.bookedSeats);

    const RestartBucketHandler = useCallback(() => {
        dispatch(emptyBooking());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
    }, [dispatch]);

    useEffect(() => {
        const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
            },
            { text: "YES", onPress: () => RestartBucketHandler() }
        ]);
        return true;
        };
    
        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );
    
        return () => backHandler.remove();
    }, []);
    
    const [age, setAge] = useState('');
    const [citizenship, setCitizenship] = useState('Nationality');
    const [idType, setIdType] = useState('ID Type');
    const [idNumber, setIdNumber] = useState('');
    const [checked, setChecked] = useState('Male');
    const [foreign, setForeign] = useState(false);

    // THIS BLOCK IS FOR THE STATE OF THE FORMS
    const [mobileNumber, setMobileNumber] = useState('');
    const [kinName, setKinName] = useState('');
    const [kinNumber, setKinNumber] = useState('');
    const [routeLogic, setRouteLogic] = useState(3);
    const [fields, setFields] = useState(JSON.parse(traveller));
    const [tripDate, setTripDate] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleFullnameChange = (targetField, value) => {
        setFields({...fields, [targetField]: value });
    }
    
    const handleConfirm = (date) => {
    const selectedDate = new Date(date); 
    const formattedDate = `${selectedDate.getMonth()+1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
        setTripDate(formattedDate);
        handleTripDate(date);
        hideDatePicker();
    };
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // WORKS WITH THE MODAL TO SELECT COUNTRY
    const handleCountrySelect = (val) => {
        setCitizenship(val);
    }

    // WORKS WITH THE MODAL TO SELECT ID TYPE
    const handleIdSelect = (val) => {
        setIdType(val);
    }
    const errorsForm = [];

    

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
             <Grid>
                <Row size={100}>
                    <View style={styles.formDetailsBg}>

                        {/* <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}  enableAutomaticScroll={true} extraScrollHeight={180}> */}
                            <ScrollView contentContainerStyle={styles.scrollContainer}  keyboardShouldPersistTaps='handled'>

                                <View style={styles.sectiontop}>
                                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                        <Text style={styles.section__title}>Traveller Information</Text>
                                        <Divider />
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                        <Text style={styles.yellow_label}>Note: Name should match that on ID card.</Text>
                                    </View>
                                </View>

                                <Formik
                                    initialValues={JSON.parse(traveller)}
                                    onSubmit={values => {
                                        console.log('This are form Values', values);
                                        values.map((item,indexValue) => {
                                            console.log(item);
                                            if(item.fullname === ""){
                                                // Alert.alert("Hold on!", "Full Name must be provided");
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'FULL NAME FIELD ERROR',
                                                    text2: 'Please provide all full name fields ❌',
                                                    visibilityTime: 4000,
                                                    autoHide: true,
                                                    topOffset: 30,
                                                    bottomOffset: 40,
                                                    onShow: () => {},
                                                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                    onPress: () => {},
                                                    props: {} // any custom props passed to the Toast component
                                                });
                                            }else if(item.dob === "" && serviceType !== '12'){
                                                //  Alert.alert("Hold on!", "Date Of Birth must be provided");
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'D.O.B FIELD ERROR',
                                                    text2: 'Please provide all Date Of Birth fields ❌',
                                                    visibilityTime: 4000,
                                                    autoHide: true,
                                                    topOffset: 30,
                                                    bottomOffset: 40,
                                                    onShow: () => {},
                                                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                    onPress: () => {},
                                                    props: {} // any custom props passed to the Toast component
                                                });
                                            }else if(item.age === "" && serviceType === '12' ){
                                                // Alert.alert("Hold on!", "Age must be provided");
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'AGE FIELD ERROR',
                                                    text2: 'Please provide value for all age fields ❌',
                                                    visibilityTime: 4000,
                                                    autoHide: true,
                                                    topOffset: 30,
                                                    bottomOffset: 40,
                                                    onShow: () => {},
                                                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                    onPress: () => {},
                                                    props: {} // any custom props passed to the Toast component
                                                });
                                            }else if(item.idType === "" && serviceType !== '12'){
                                                // Alert.alert("Hold on!", "Please select an  ID Type");
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'ID TYPE ERROR',
                                                    text2: 'Please select an ID type ❌',
                                                    visibilityTime: 4000,
                                                    autoHide: true,
                                                    topOffset: 30,
                                                    bottomOffset: 40,
                                                    onShow: () => {},
                                                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                    onPress: () => {},
                                                    props: {} // any custom props passed to the Toast component
                                                });
                                            }else if(item.gender === ""){
                                                // Alert.alert("Hold on!", "Please select a gender");
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'GENDER ERROR',
                                                    text2: 'Please select a gender ❌',
                                                    visibilityTime: 4000,
                                                    autoHide: true,
                                                    topOffset: 30,
                                                    bottomOffset: 40,
                                                    onShow: () => {},
                                                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                    onPress: () => {},
                                                    props: {} // any custom props passed to the Toast component
                                                });
                                            }else if(item.idNumber === "" && serviceType !== '12'){
                                                // Alert.alert("Hold on!", "Please pick a gender");
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'ID NUMBER ERROR',
                                                    text2: 'Please provide the ID number on your ID Card ❌',
                                                    visibilityTime: 4000,
                                                    autoHide: true,
                                                    topOffset: 30,
                                                    bottomOffset: 40,
                                                    onShow: () => {},
                                                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                                                    onPress: () => {},
                                                    props: {} // any custom props passed to the Toast component
                                                });
                                            }else if(item.nationality === "" && serviceType !== '12'){
                                                Toast.show({
                                                    type: 'error',
                                                    position: 'bottom',
                                                    text1: 'NATIONALITY ERROR',
                                                    text2: 'Please provide your nationality ❌',
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
                                            else{
                                                navigation.navigate('Journey',{
                                                    details: JSON.stringify(values), 
                                                    departureTime: JSON.stringify(departureTime), 
                                                    destinationTerminal: JSON.stringify(destinationTerminal), 
                                                    tripID: JSON.stringify(tripID), 
                                                    travelDate: JSON.stringify(travelDate),
                                                    cityFrom: JSON.stringify(cityFrom),
                                                    cityTo: JSON.stringify(cityTo),
                                                    busFare: JSON.stringify(busFare)
                                                })
                                            }
                                        })
                                        
                                        }}>
                                            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                                        <View>

                                            {fields.map((item,index) => {
                                                        return (
                                                            <View style={styles.section} key={index}>

                                                                <View style={styles.firstDetailsText}>
                                                                    <Text>Passenger {index+1}</Text>
                                                                    <Text>Seat No : {item.seatNo}</Text>
                                                                    <Text>Fare : GH₵ {item.price}</Text>
                                                                </View>

                                                                <View style={styles.form_input_block}>
                                                                    <View style={styles.formIcon}>
                                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/name.png')} />
                                                                    </View>
                                                                    <View style={styles.formText}>
                                                                        <TextInput style={styles.OTP__text__input} 
                                                                        onBlur={handleBlur(`[${index}].fullname`)}
                                                                        value={values[`${index}`].fullname}
                                                                        placeholder="Full Name" 
                                                                        onChangeText={handleChange(`[${index}].fullname`)}
                                                                        placeholder="Enter full name"
                                                                        keyboardType='default' 
                                                                        autoCapitalize="none"
                                                                        maxLength={20}
                                                                        /> 
                                                                    </View>
                                                                </View>

                                                                <View style={styles.form_input_block}>
                                                                    <View style={styles.formIcon}>
                                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/gender.png')} />
                                                                    </View>
                                                                    <View style={styles.formText}>
                                                                    <View style={styles.nationality}>
                                                                        <Text style={styles.formText}>
                                                                            <Gender text="Gender" onChangeText={handleChange(`[${index}].gender`)} onBlur={handleBlur(`[${index}].gender`)}
                                                                            value={values[`${index}`].gender} onChangeSelect={handleChange(`[${index}].gender`)} />
                                                                        </Text>

                                                                        <Text style={{marginTop: 12,}}>
                                                                            <AntDesign name="caretdown" size={12} color="#CCC" />
                                                                        </Text>
                                                                    </View>
                                                                    </View>
                                                                </View>

                                                                {serviceType === '12' ? ( <View style={styles.form_input_block}>
                                                                    <View style={styles.formIcon}>
                                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/age.png')} />
                                                                    </View>
                                                                    <View style={styles.formText}>
                                                                        <TextInput style={styles.OTP__text__input} 
                                                                        maxLength={3}
                                                                        minLength={2}
                                                                        value={values[`${index}`].age}
                                                                        onBlur={handleBlur(`[${index}].age`)}
                                                                        placeholder="Enter your age" 
                                                                        onChangeText={handleChange(`[${index}].age`)}
                                                                        keyboardType='numeric' 
                                                                        /> 
                                                                    </View>
                                                                </View>) : ( <View style={styles.form_input_block}>
                                                                    <View style={styles.formIcon}>
                                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/date_two.png')} />
                                                                    </View>
                                                                    <View style={styles.formText}>
                                                                    <CustomDate textStyle={{
                                                                        paddingVertical: 10,
                                                                        paddingLeft: 5,
                                                                        paddingRight: 110,
                                                                        marginTop: 2,
                                                                        width: '100%',
                                                                        color: '#CCC'
                                                                    }}
                                                                    defaultDate="1920-01-01"
                                                                    onDateChange={(val) => {console.log('DOB',val);  setFieldValue(`[${index}].dob`, val)}}
                                                                    />
                                                                    </View>
                                                                </View>)}

                                                                {serviceType !== '12' && (<View style={styles.form_input_block}>
                                                                    <View style={styles.formIcon}>
                                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/id_type.png')} />
                                                                    </View>
                                                                    <View style={styles.formText}>
                                                                    <View style={styles.nationality}>
                                                                        <Text style={styles.formText}>
                                                                            <Types text="Choose ID type" onChangeSelect={handleChange(`[${index}].idType`)} />
                                                                        </Text>
                                                                        
                                                                        <Text style={{marginTop: 12,}}>
                                                                            <AntDesign name="caretdown" size={12} color="#CCC" />
                                                                        </Text>
                                                                    </View>
                                                                    </View>
                                                                </View>)}

                                                                
                                                                {serviceType !== '12' && (
                                                                    <View style={styles.form_input_block}>
                                                                        <View style={styles.formIcon}>
                                                                            <Image style={styles.OTP__mobile} source={require('../images/icons/id.png')} />
                                                                        </View>
                                                                        <View style={styles.formText}>
                                                                            <TextInput style={styles.OTP__text__input} 
                                                                            value={values[`${index}`].idNumber}
                                                                            onBlur={handleBlur(`[${index}].idNumber`)}
                                                                            placeholder="ID No." 
                                                                            maxLength={20}
                                                                            minLength={10}
                                                                            onChangeText={handleChange(`[${index}].idNumber`)} 
                                                                            placeholder="Enter ID number"
                                                                            keyboardType='number-pad' 
                                                                            autoCapitalize="none"
                                                                            maxLength={20}
                                                                            /> 
                                                                        </View>
                                                                    </View>
                                                                )}

                                                                {serviceType !== '12' && (
                                                                    <View style={styles.form_input_block}>
                                                                    <View style={styles.formIcon}>
                                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/nationality.png')} />
                                                                    </View>
                                                                    <View style={styles.formText}>
                                                                        <View style={styles.nationality}>
                                                                            <Text style={styles.formText}>
                                                                                <Countries text={citizenship} onChangeSelect={handleChange(`[${index}].nationality`)} />
                                                                            </Text>

                                                                            <Text style={{marginTop: 12,}}>
                                                                                <AntDesign name="caretdown" size={12} color="#CCC" />
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                )}
                                                            </View>
                                                        );
                                                    }
                                                
                                                )
                                            } 

                                            <View style={styles.section}>

                                                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                                    <Text style={styles.section__title}>Contact & Kin's Information</Text>
                                                    <Divider />
                                                </View>

                                                <View style={styles.form_input_block}>
                                                    <View style={styles.formIcon}>
                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/phone-two.png')} />
                                                    </View>
                                                    <View style={styles.formText}>
                                                        <TextInput style={styles.OTP__text__input} 
                                                        placeholder="Enter your number" 
                                                        maxLength={10}
                                                        value={values[0].mobile}
                                                        onChangeText={handleChange(`[${0}].mobile`)} 
                                                        // onChangeText={handleChange('mobile')}
                                                        keyboardType='numeric' 
                                                        /> 
                                                    </View>
                                                </View>

                                                <View style={styles.form_input_block}>
                                                    <View style={styles.formIcon}>
                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/kin.png')} />
                                                    </View>
                                                    <View style={styles.formText}>
                                                        <TextInput style={styles.OTP__text__input} 
                                                        maxLength={20}
                                                        value={values[0].kinName}
                                                        onChangeText={handleChange(`[${0}].kinName`)} 
                                                        placeholder="Enter your Kin's name" 
                                                        // onChangeText={handleChange('kinName')}
                                                        keyboardType='default' 
                                                        /> 
                                                    </View>
                                                </View>

                                                <View style={styles.form_input_block}>
                                                    <View style={styles.formIcon}>
                                                        <Image style={styles.OTP__mobile} source={require('../images/icons/phone-one.png')} />
                                                    </View>
                                                    <View style={styles.formText}>
                                                        <TextInput style={styles.OTP__text__input} 
                                                        maxLength={10}
                                                        minLength={10}
                                                        value={values[0].kinNumber}
                                                        onChangeText={handleChange(`[${0}].kinNumber`)} 
                                                        placeholder="Enter your Kin's number" 
                                                        // onChangeText={handleChange('kinNumber')}
                                                        keyboardType='numeric' 
                                                        /> 
                                                    </View>
                                                </View>

                                            </View>

                                            <View style={{marginTop: 15}}>
                                                <Button color='#003c30' contentStyle={{height: 50}} disabled={false} mode="contained" onPress={handleSubmit}>
                                                    PROCEED TO BOOK
                                                </Button>
                                            </View>

                                            <View style={styles.contianerScrollViewMargin}></View>

                                        </View>
                                    )}
                                </Formik>
                            </ScrollView>
                        {/* </KeyboardAwareScrollView> */}
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
        height: '20%',
        width: width,
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
        marginLeft: 10,
        marginRight: 40,
        borderRadius: 20,
    },
    scrollContainer: {
        marginTop: 15,
        paddingHorizontal: 5,
    },
    sectiontop: {
        backgroundColor: '#FFF',
        width: width - 40,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 15,
        // marginTop: -40,
        // position: 'relative',
        // zIndex: 1000,
        marginBottom: 10,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    section: {
        backgroundColor: '#FFF',
        width: width - 40,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 15,
        marginBottom: 10,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    yellow_label: {
        marginBottom: 10,
        backgroundColor: 'yellow', 
        borderRadius: 5, 
        padding: 8, 
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    section__title: {
       marginBottom: 10,
       fontFamily: 'Montserrat-Medium',
       fontSize: 14,
       color: '#000'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: -10
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height + 50,
        marginTop: -20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    form__background: {
        width: width - 15,
        height: 560,
        borderRadius: 15,
        paddingHorizontal: 15, 
        paddingVertical: 20,
        flexDirection: 'column',
    },
    form__section__block: {
        backgroundColor: '#FFF',
        width: width - 35,
        // height: 400,
        padding: 15,
        borderRadius: 15,
    },
    form__container: {
        flex: 1,
        padding: 5,
        width: width - 25,
    },
    form__input__container: {
        width: width - 20,
    },
    text__input: {
        width: width - 60,
        height: 50,
        marginVertical: 10,
    },
    firstDetailsText: {
        width: width - 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioButton__container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
    signIn: {
        width: width - 55,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    contianerScrollViewMargin: {
        height: 300,
    },
    contentContainer: {
        marginBottom: 50,
    },
    nationality: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: width - 120,
        height: 40,
        paddingRight: 25,
        marginLeft: - 10,
        overflow: 'hidden',
    },
    nationality__date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 60,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#f6f6f6',
        borderWidth: 1,
        borderColor: '#a0a0a0',
        paddingLeft: 15,
        paddingRight: 10,
        marginVertical: 10,
        overflow: 'hidden'
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
        width: width - 60,
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
})

export default TravellerDetailsScreen
