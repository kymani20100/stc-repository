import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, Vibration, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView,TextInput } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Button, Chip } from 'react-native-paper';
import { Row, Grid } from "react-native-easy-grid";
import { Audio } from 'expo-av';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const {width, height} = Dimensions.get('screen');
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

// THIS IS THE BLOCK FOR VECTORS
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tripDate, setTripDate] = useState([]);
  const [fromTripId, setFromTripId] = useState('');
  const [toTripId, setToTripId] = useState('');
  const [cityFrom, setCityFrom] = useState('');
  const [cityTo, setCityTo] = useState('');
  const [sound, setSound] = useState();
  const [formData, setFormData] = useState({cityFrom: '', cityFromId: '',cityTo: '',cityToId: '',TripDate: ''});

  const parseDate = (input) => {
      let parts = input.match(/(\d+)/g);
      return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

  const limit = (string = '', limit = 0) => {  
      return string.substring(0, limit)
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
  // VIBRATE TO CALL ATTENTION
  Vibration.vibrate(10 * 40);
  const selectedDate = new Date(date); // pass in date param here
  const formattedDate = `${selectedDate.getMonth()+1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      setTripDate(formattedDate);
      handleTripDate(date)
      hideDatePicker();
  };

  const handleSelectFrom = (name, id) => {
      setFromTripId(id);
      setCityFrom(name);
      setFormData({
          ...formData,
          cityFrom: name,
          cityFromId: id
      });
  }

  const getTodayDate = () => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      return today = mm + '/' + dd + '/' + yyyy;
  }

  const handleSelectTo = (name, id) => {
      setCityTo(name);
      setToTripId(id);
      setFormData({
          ...formData,
          cityTo: name,
          cityToId: id
      });
  }

  const handleTripDate = (val) => {
      setFormData({
          ...formData,
          TripDate: val
      });
  }

  const handleSubmit = () => {
    const todaysDate = getTodayDate();
    const pageData = formData;
    if(cityFrom === cityTo){
        // VIBRATE TO CALL ATTENTION
        Vibration.vibrate();
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Destination Field Error',
            text2: 'Both destination fields appear to be invalid ❌',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
            onShow: () => {},
            onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
            onPress: () => {},
            props: {} // any custom props passed to the Toast component
          });
    }else if (parseDate(todaysDate).getTime() > parseDate(tripDate).getTime()){
        // VIBRATE TO CALL ATTENTION
        Vibration.vibrate();
        // setLower(true);
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'DATE FIELD ERROR',
            text2: 'The selected date appears to be invalid ❌',
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
        const formSerialize = JSON.stringify({pageData});
        if(cityFrom != '' && cityTo != '' && tripDate != ''){
            navigation.navigate('FormDetails', {
                cityFrom: cityFrom,
                cityFromId: fromTripId,
                cityTo: cityTo,
                cityToId: toTripId,
                tripDate: JSON.stringify(tripDate)
            });
        }else{
          // VIBRATE TO CALL ATTENTION
          Vibration.vibrate();
          Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'FORM FIELD ERROR',
              text2: 'Please provide form values before submitting ❌',
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

//   const isDrawerOpen = useDrawerStatus() === 'open';

//   if(isDrawerOpen){
//     Vibration.vibrate(10 * 40);
//   }
const getName = async () => {
    let authName = '';
    try {
        authName = await AsyncStorage.getItem('userFullname')
        if(authName !== null) {
            console.log('userFullname Value', authName);
            return authName;
        }
    } catch(e) {
        console.log('Mobile Value Error', e);
    }
}

    // GET TOKEN
    const getToken = async () => {
        let authToken = '';
        try {
            authToken = await AsyncStorage.getItem('userToken')
            if(authToken !== null) {
                console.log('Mobile Value', authToken);
                return authToken;
            }
        } catch(e) {
            console.log('Mobile Value Error', e);
        }
    }

    // GET TOKEN
    const getPassID = async () => {
        let authPassID = '';
        try {
            authPassID = await AsyncStorage.getItem('userID')
            if(authPassID !== null) {
                console.log('Mobile Value', authPassID);
                return authPassID;
            }
        } catch(e) {
            console.log('Mobile Value Error', e);
        }
    }

    // GET TOKEN
    const getPic = async () => {
        let authPhone = '';
        try {
            authPhone = await AsyncStorage.getItem('userPhoto')
            if(authPhone !== null) {
                console.log('Mobile Value', authPhone);
                return authPhone;
            }
        } catch(e) {
            console.log('Mobile Value Error', e);
        }
    }

    const getPhone = async () => {
        let authPhone = '';
        try {
            authPhone = await AsyncStorage.getItem('mobile')
            if(authPhone !== null) {
                console.log('Mobile Value', authPhone);
                return authPhone;
            }
        } catch(e) {
            console.log('Mobile Value Error', e);
        }
    }

    const dispatch = useDispatch();

    const welcomeBack = (myUserToken, myname, myUserPassID, myDisplayPic, myUserPhone) => {
        // DISPATCH ACTION AND LET IT WAIT
        dispatch(authActions.WelcomeBack(myUserToken, myname, myUserPassID, myDisplayPic, myUserPhone));
    }

useEffect(() => {
     
    async function fetchMyAPI() {
        let myname         = await getName();
        let myUserPassID   = await getPassID();
        let myUserToken    = await getToken();
        let myDisplayPic   = await getPic();
        let myUserPhone    = await getPhone();
        if(myname !== undefined && myUserPassID !== undefined && myUserToken !== undefined && myUserPhone !== undefined){
            welcomeBack(myUserToken, myname, myUserPassID, myDisplayPic, myUserPhone);
            // VIBRATE TO CALL ATTENTION
            Vibration.vibrate(20 * 100);
          Toast.show({
              type: 'info',
              position: 'top',
              text1: 'WELCOME TO STC Travel',
              text2: `${myname}, We Will Take You There Safely `,
              visibilityTime: 4000,
              autoHide: true,
              topOffset: 60,
              bottomOffset: 40,
              onShow: () => {},
              onHide: () => {}, 
              onPress: () => {},
              props: {} // any custom props passed to the Toast component
          });
        }
        
    }
    fetchMyAPI();
    
}, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
            <Grid>
                <Row size={100}>
                <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                    <ImageBackground source={require('../images/icons/exp.png')} style={{flex: 1, resizeMode: 'cover'}}>
                        <ScrollView>
                            <View style={styles.formSpacePercentage}>

                                <View style={styles.form_input_block}>
                                    <View style={styles.formIcon}>
                                        <FontAwesome5 name="map-marker-alt" size={25} color="#fe0103" />
                                    </View>
                                    <View style={styles.formText}>
                                        <Select text='Where are you from?' onChangeSelect={(name, id) => handleSelectFrom(name, id)} />
                                    </View>
                                </View>

                                <View style={styles.form_input_block}>
                                    <View style={styles.formIcon}>
                                        <FontAwesome5 name="map-marker-alt" size={25} color="#fe0103" />
                                    </View>
                                    <View style={styles.formText}>
                                        <Select text='Where are you going?'  onChangeSelect={(name, id) => handleSelectTo(name, id)} />
                                    </View>
                                </View>

                                <TouchableOpacity activeOpacity={.7} style={styles.action_date_new} onPress={showDatePicker}>
                                    <View style={styles.form_input_block}>
                                        <View style={styles.formIcon}>
                                            <Fontisto name="date" size={23} color="#003c30" />
                                        </View>
                                        <View style={styles.formText}>
                                            <Text style={styles.date__format}>{String(tripDate) ? (String(tripDate)) : ('Choose a date')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            
                                <View style={styles.textPrivate}>
                                    <Text style={styles.color_textPrivate}>
                                        By clicking `PROCEED` you agree to our
                                    </Text>
                                    <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold',color: 'red'}]}>{" "}Terms of service</Text>
                                    <Text style={styles.color_textPrivate}>{" "}and</Text>
                                    <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold',color: 'red'}]}>{" "}Privacy policy</Text>
                                </View>
                                

                                <View style={styles.button}>
                                    <DateTimePickerModal
                                        pickerContainerStyleIOS={{color: 'black', backgroundColor: "white"}}
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        pickerContainerStyleIOS={{color: 'black',}}
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                </View> 

                                <View style={{justifyContent: 'center', width: width - 45, marginTop: 15}}>
                                    <Button color='#003c30' contentStyle={{height: 50, }} disabled={false} mode="contained" onPress={handleSubmit}>
                                        PROCEED
                                    </Button>
                                </View>
                                
                            </View>
                        </ScrollView>
                        </ImageBackground>
                    </Animatable.View>
                </Row>
            </Grid>
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
   mainContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: '#FFF',
    },
  footer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF',
    color: '#003c30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSpacePercentage: {
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  form_input_block: {
    flex: 1,
    flexDirection: 'row',
    width: width - 45,
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
    padding: 8,
  },
  formText: {
    flex: 1,
    marginLeft: 15,
    position: 'relative',
    bottom: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text_header: {
    color: '#003c30',
    // fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
    fontFamily: 'Oswald-Regular'
},
text_footer: {
    color: '#003c30',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Montserrat-Medium'
},
text_footer_relative: {
    color: '#003c30',
    fontSize: 15,
    marginTop: 5,
    marginBottom: -18,
    fontFamily: 'Montserrat-Medium'
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#003c30',
    paddingBottom: 5,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
},
action_date: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#003c30',
    paddingBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
// button: {
//     alignItems: 'center',
//     marginTop: 20
// },
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
},
textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
},
color_textPrivate: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Montserrat-Light',
},
STC__BUS__PNG: {
    alignItems: 'center',
    justifyContent: 'center'
},
date__format:{
    textAlign: 'left',
    position: 'relative',
    top: 10,
    color: '#003c30',
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
},
bottomBanner: {
    position: 'absolute',
    bottom: 0, 
    left: 0, 
    right: 0, 
    width: width,
    height: '10%',
}

});

export default HomeScreen
