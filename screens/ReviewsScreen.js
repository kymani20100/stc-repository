import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Platform, Dimensions, Image, ScrollView, Button,TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List'

const ReviewsScreen = ({navigation}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [tripDate, setTripDate] = useState([]);
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

        // navigation.navigate('FormDetails');
    }

    // ASYNC STORE HERE
    //  AsyncStorage.setItem('@formData', formData);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                    <FontAwesome name="bars" size={24} color='#003c30' onPress={() => navigation.toggleDrawer()} />
                </View>

                <View>
                    <Text style={styles.headerTitle}>REVIEWS</Text>
                </View>
            </View>

            <View style={styles.formDetailsBg}>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#003c30',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: 35, 
        paddingVertical: 15,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 50
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
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
})

export default ReviewsScreen
