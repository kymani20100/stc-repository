import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView,TouchableWithoutFeedback, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, RadioButton, Chip, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const {width, height} = Dimensions.get('screen');
import { Audio } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Grid } from "react-native-easy-grid";


const ProfileScreen = ({navigation}) => {
    const UserName = useSelector(state =>  state.auth.name);
    const UserPhoto = useSelector(state =>  state.auth.pic);
    const UserMobile = useSelector(state =>  state.auth.phone);
    // const mobile = useSelector(state =>  state.OTP.mobile);LoginOTPReducer
    const dispatch = useDispatch();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [tripDate, setTripDate] = useState([]);
    const [sound, setSound] = useState();
    // REASSIGN AS A STATE VALUE
    const [username, setUsername] = useState(UserName);
    const [profilePicture, setprofilePicture] = useState(UserPhoto);
    const [profileMobile, setprofileMobile] = useState(UserMobile);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        cityFrom: '',
        cityTo: '',
        TripDate: '',
    });

    const limit = (string = '', limit = 0) => {  
        return string.substring(0, limit)
      }

    const [cityFrom, setCityFrom] = useState('');
    const [cityTo, setCityTo] = useState('');

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };
    
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
  
    const handleConfirm = (date) => {
    //   console.warn("A date has been picked: ", date);
    const selectedDate = new Date(date); // pass in date param here
    const formattedDate = `${selectedDate.getMonth()+1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;

        setTripDate(formattedDate);
        handleTripDate(date)
        hideDatePicker();
    };

    const handleSelectFrom = (val) => {
        setCityFrom(val);
        // alert(val)
        setFormData({
            ...formData,
            cityFrom: val
        });
    }

    const handleSelectTo = (val) => {
        setCityTo(val)
        // alert(val)
        setFormData({
            ...formData,
            cityTo: val
        });
    }

    const handleTripDate = (val) => {
        // alert(val)
        setFormData({
            ...formData,
            TripDate: val
        });
    }

    const handleSubmit = () => {
        const pageData = formData;
        // navigation.setParams({pageData});
        const formSerialize = JSON.stringify({pageData});

        navigation.navigate('FormDetails', {
            cityFrom: cityFrom,
            cityTo: cityTo,
            tripDate: JSON.stringify(tripDate)
        });
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Grid>
               
                <Row size={100}>
                    <View style={styles.formDetailsBg}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps="always" enableOnAndroid={true}  enableAutomaticScroll={true} extraScrollHeight={80}>
                            <ScrollView keyboardShouldPersistTaps='handled'>
                                <Formik
                                    initialValues={{ email: '', myphoto: UserPhoto, myMobile: '', myName: UserName }}
                                    onSubmit={values => console.log(values)}>
                                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                                    <View>

                                        <View style={styles.profile_header}>
                                            <View style={styles.profile_image_detail}>
                                                <View style={styles.profile}>
                                                    <TouchableOpacity activeOpacity={.7}  onPress={pickImage}>
                                                        <View style={styles.profile_picture}>
                                                            <Image style={styles.ProfilePicture} source={{ uri: image }} />
                                                        </View>
                                                        <View style={styles.image_upload_button}>
                                                            <FontAwesome name="cloud-upload" size={24} color="#000" />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <View style={styles.profile_text_details}>
                                                <Text style={styles.profile_details_text}>Name : <Text style={{fontFamily: 'Montserrat-SemiBold',}}>{UserName}</Text> </Text>
                                                <Text style={styles.profile_details_text}>Phone : <Text style={{fontFamily: 'Montserrat-SemiBold',}}>{UserMobile}</Text></Text>
                                                <Text style={styles.profile_details_text}>Email : <Text style={{fontFamily: 'Montserrat-SemiBold',}}>Optional</Text></Text>
                                                <Text style={styles.profile_details_text}>D.O.B : <Text style={{fontFamily: 'Montserrat-SemiBold',}}>2nd July, 1993</Text></Text>
                                            </View>
                                        </View>

                                        {/* THIS IS A SINGLE BLOCK OF INPUT */}
                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/name.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                    onChangeText={handleChange('myName')}
                                                    onBlur={handleBlur('myName')}
                                                    value={values.myName}
                                                    placeholder="Enter your full name"
                                                    keyboardType='default' 
                                                    autoCapitalize="none"
                                                    maxLength={20}
                                                /> 
                                            </View>
                                        </View>
                                        {/* THIS IS A SINGLE BLOCK OF INPUT */}
                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/email.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                    placeholder="Enter your email address"
                                                    keyboardType='default' 
                                                    autoCapitalize="none"
                                                    maxLength={20}
                                                /> 
                                            </View>
                                        </View>
                                    
                                        {/* THIS IS A SINGLE BLOCK OF INPUT */}
                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/phone-two.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TextInput style={styles.OTP__text__input} 
                                                    onChangeText={handleChange('mobile')}
                                                    onBlur={handleBlur('mobile')}
                                                    value={values.mobile}
                                                    placeholder="Enter your phone number"
                                                    keyboardType='numeric' 
                                                    autoCapitalize="none"
                                                    maxLength={10}
                                                /> 
                                            </View>
                                        </View>
                                        {/* THIS IS A SINGLE BLOCK OF INPUT */}

                                        {/* THIS IS A SINGLE BLOCK OF INPUT */}
                                        <View style={styles.form_input_block}>
                                            <View style={styles.formIcon}>
                                                <Image style={styles.OTP__mobile} source={require('../images/icons/age.png')} />
                                            </View>
                                            <View style={styles.formText}>
                                                <TouchableOpacity activeOpacity={.7} style={styles.action_date_new} onPress={showDatePicker}>
                                                    <Text style={styles.date__format}>{String(tripDate) ? (String(tripDate)) : ('Date Of Birth')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {/* THIS IS A SINGLE BLOCK OF INPUT */}

                                        <View style={{marginTop: 15}}>
                                            <Button color='#003c30' contentStyle={{height: 50}} disabled={false} mode="contained" onPress={handleSubmit}>
                                                UPDATE PROFILE
                                            </Button>
                                        </View>

                                    </View>
                                    )}
                                </Formik>

                                <View style={styles.ScrollViewMargin}></View>
                            </ScrollView>
                        </KeyboardAwareScrollView>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                </Row>
            </Grid>
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
        fontFamily: 'Montserrat-Regular',
        marginLeft: 20
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 35,
    },
   
    text__input: {
        // width: width - 60,
        height: 50,
        marginVertical: 10,
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
        backgroundColor: '#fff',
        width: '100%',
        height: height - 40,
        paddingVertical: 20,
        paddingHorizontal: 10,
        // marginTop: 20,
        alignItems: 'center',
    },
    form__input__container: {
        width: width - 20,
    },
    ScrollViewMargin: {
        height: 105,
    },
    form_input_block: {
        flex: 1,
        flexDirection: 'row',
        width: width - 20,
        height: 50,
        borderWidth: 1,
        borderColor: '#003c30',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
    signIn: {
        width: '100%',
        height: 50,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    date__format: {
        marginLeft: 0,
        marginTop: 10,
        color: '#CCC',
    },
    imageUploadHolder:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageUpload: {
        backgroundColor: 'red',
        borderRadius: 50,
        width: 100,
        height: 100, 
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        // borderWidth: 5,
        // borderColor: '#003c30',
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
    profile_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    profile_text_details: {
        // backgroundColor: '#CCC',
        width: '54%',
        height: 100,
        position: 'relative',
        left: - 20,
    },
    profile_image_detail: {
        width: '34%',
        height: 100,
        borderRightColor: '#CCC',
    },
    profile_details_text: {
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 10,
    },
    profile: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#CCC',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 2,
    },
    profile_picture: {
        width: 90,
        height: 90,
        backgroundColor: 'blue',
        alignSelf: 'center',
        position: 'relative',
        zIndex: 19,
        justifyContent: 'center',
        borderRadius: 5,
        overflow: 'hidden'
    },
    ProfilePicture: {
        width: 90,
        height: 90, 
        padding: 5,
        position: 'relative',
        zIndex: 9,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    image_upload_button: {
        width: 40,
        height: 40, 
        borderRadius: 30,
        position: 'absolute',
        zIndex: 29,
        borderRadius: 30,
        backgroundColor: '#FFF',
        right: -10,
        bottom: -10,
        borderWidth: 5,
        borderColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4,

    }
})

export default ProfileScreen
