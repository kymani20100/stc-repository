import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, FlatList, Platform, Dimensions, Image, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput, RadioButton, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
// REDUX MAGIC
import {useSelector, useDispatch} from 'react-redux';
import { emptyBooking } from '../store/actions/booking';
const {width, height} = Dimensions.get('screen');
import { Col, Row, Grid } from "react-native-easy-grid";
// MODELS
// import Travellers from '../models/travellers';
// import * as passengerActions from '../store/actions/passenger';
import * as authActions from '../store/actions/auth';
import * as finalActions from '../store/actions/final';
import { WebView } from 'react-native-webview';

const JourneyDetailsScreen = ({route, navigation}) => {
    let {
        details,
        departureTime, 
        destinationTerminal,
        tripID, 
        travelDate,
        cityFrom,
        cityTo,
        busFare
    } = route.params;
    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [checked, setChecked] = useState('Male');
    // const [loading, setLoading] = useState(false);
    const [loadModal, setLoadModal] = useState(false);

    const dispatch = useDispatch();

    // USER LOGIN DETAILS
    const tokenCode = useSelector(state =>  state.auth.token);
    const mobile    = useSelector(state =>  state.auth.phone);
    const userName  = useSelector(state =>  state.auth.name);
    const UserID  = useSelector(state =>  state.auth.passID);

    // BOOKING DETAILS
    const sumOfTotal = useSelector(state =>  state.booking.total);
    const finalResponse = useSelector(state => state.final.response);

    // VARIABLES HERE
    const myToken  = 'B281BA92-288F-4D5D-9D14-9482E0A960AB';
    // const myUserID = '31200';
    const TripID     = JSON.parse(tripID);
    const TDate    = JSON.parse(travelDate);
    const TFrom    = JSON.parse(cityFrom);
    const TTo      = JSON.parse(cityTo);
    const TFare    = JSON.parse(busFare);
   
     const RestartBucketHandler = useCallback(() => {
        dispatch(emptyBooking());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
    }, [dispatch]);

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

    const transformedSeatItems = [];
   
    const bookSeats = useSelector(state => {
         for (const key in state.booking.bookedSeats) {
            transformedSeatItems.push({
                uniq: key,
                seatId: state.booking.bookedSeats[key].seatId,      
            });
        }
        return transformedSeatItems;
    });

    console.log('Form Values DEtails', JSON.parse(details));
    let dataPay = JSON.parse(details);




    // let Food;
    // useEffect(() => {
    //     dataPay.forEach(function(element) {
    //         travelList.push({ 
    //             TName: element.fullname,
    //             TGender: element.gender,
    //             TAge: element.age,
    //             TSeatNo: element.seatNo,
    //             TIDType: element.idType,
    //             TIDNo: element.idNumber,
    //             TDOB: element.dob,
    //             TCountry: element.nationality
    //         });
    //     });
    //     console.log('This is the Travel List',travelList);

       
    //     console.log(Food);
    // }, []);

    let travelList = dataPay.map(({fullname,gender,age,seatNo,idType,idNumber,dob,nationality}) => {
        return { 
                TName: fullname,
                TGender: gender,
                TAge: age,
                TSeatNo: seatNo,
                TIDType: '0',
                TIDNo: '0',
                TDOB: '30-Nov-2021',
                TCountry: '0'
            };
        })

    // useEffect(() => {
    //     dispatch(finalActions.insertBookingData(
    //         myUserID,trip,tDate,tFrom,tTo,tFare,dataPay[0].mobile,dataPay[0].fullname,travelList
    //     )).then(() => {
    //        setLoadModal(true);
    //    });
    // },[dispatch])

    // https://pay.hubtel.com/775e49e79e3e4bf8927b7b0a5db209d9

   

    const payload = {
              "ChanelType":"Mob",
              "BookbyType":"U",
              "UserID":UserID,
              "BookingLocation":"1",
              "TripID":TripID,
              "TravelDate": TDate,
              "PayMode":"ONLINE",
              "FromLocation":TFrom,
              "ToLocation":TTo,
              "CurrencyID":"4",
              "Fare":TFare,
              "MobileNo":mobile,
              "EmailID":"kymani@gmail.com",
              "KinName":dataPay[0].KinName,
              "KinContact":dataPay[0].mobile, 
              "FreeBillIDNo":"155231",
              "PassengerList": [travelList]
            }

    // THIS IS THE FINAL BLOCK 
    // const submit_booking_data = () => {
    //     dispatch(finalActions.insertBookingData(
    //         UserID, TripID, TDate, TFrom, TTo, TFare, mobile, dataPay[0].KinName, dataPay[0].mobile
    //     )).then(() => {
            
    //    });
    // }

    const submit_booking_data = () => {
        dispatch(finalActions.insertBookingData(payload)).then(() => {
            
       });
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoadModal(false);
    //         navigation.navigate('Payment')
    //     }, 4000)
    // }, [loadModal])

    // console.log('GETTING RANDOM SHIT', dataPay[0].fullname);
    // dispatch(authActions.fetchUser(mobile, password)).then(() => {
         //   setLoading(false);  
       // });
    // console.log('GETTING RANDOM FARE', payloadNow);
    // console.log('This is the payload Now', travelList);

    console.log('Response', payload);

    console.log('This is the payload Now', finalResponse);

    

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Grid>
                <Row size={20}>
                    <View style={styles.headerContainer}>
                         <View style={styles.headerFloat}>
                            <View style={styles.drawerBarsIcon}>
                                <Ionicons name="arrow-back-outline" size={24} color='#003c30' onPress={backAction} />
                            </View>

                            <View>
                                <Text style={styles.headerTitle}>JOURNEY DETAILS</Text>
                            </View>
                        </View>
                    </View>
                </Row>
                <Row size={80}>
                    <View style={styles.formDetailsBg}>
                        <View style={styles.form__background}>
                            <Text style={styles.journey__destination}>{JSON.parse(destinationTerminal)}</Text>
                            <View style={styles.travellers__number__seats}>
                                <Text style={styles.grey__title}>Departure Time</Text>
                                <Text style={styles.dark__title}>{JSON.parse(departureTime)}</Text>
                            </View>
                            <View style={styles.travellers__number__seats}>
                                <Text style={styles.grey__title}>Travellers</Text>
                                <Text style={styles.dark__title}>Total Seats : {transformedSeatItems.length}</Text>
                            </View>
                            <View style={styles.travellers__number__seats}>
                                <Text style={styles.grey__title}>Fare</Text>
                                <Text style={styles.dark__title}>GH₵ {sumOfTotal}.00</Text>
                            </View>
                        </View>

                        <View style={styles.form__background__fare}>
                            <Text style={styles.journey__destination}>Fare Details</Text>
                            <View style={styles.travellers__number__seats}>
                                <Text style={styles.grey__title}>Fare</Text>
                                <Text style={styles.dark__title}>GH₵ {sumOfTotal}.00</Text>
                            </View>
                            <View style={styles.travellers__number__seats}>
                                <Text style={styles.grey__title}>Online Transaction</Text>
                                <Text style={styles.dark__title}>GH₵ 12.00</Text>
                            </View>
                            <View style={styles.travellers__number__seats}>
                                <Text style={styles.grey__title}>Total</Text>
                                <Text style={styles.dark__title}>GH₵ {+sumOfTotal + 12}.00</Text>
                            </View>
                        </View>

                        <View style={{marginTop: 15}}>
                            <Button color='#003c30' contentStyle={{height: 50}} disabled={false} mode="contained" onPress={submit_booking_data}>
                                MAKE PAYMENT
                            </Button>
                        </View>
                        
                    </View>
                </Row>
            </Grid>

            <Modal transparent={false} animationType='slide' visible={loadModal} onRequestClose={() => setLoadModal(false)}>
                    <View style={{flex: 1,flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#003c30',
    },
    headerContainer: {
        height: '20%',
        width: width,
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
        fontFamily: 'Montserrat-Regular',
        marginLeft: 10
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
    form__background: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 130,
        borderRadius: 15,
        paddingHorizontal: 15, 
        paddingVertical: 20,
        flexDirection: 'column',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5
    },
    form__background__fare: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 130,
        borderRadius: 15,
        paddingHorizontal: 15, 
        paddingVertical: 20,
        flexDirection: 'column',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5
    },
    journey__destination: {
        marginBottom: 10,
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        color: '#003c30',  
    },
    travellers__number__seats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    journey__date: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 11,
        color: '#9c9c9c', 
        marginBottom: 5,
    },
    grey__title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: '#9c9c9c', 
        // marginBottom: 5,
    },
    dark__title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: '#000', 
        // marginBottom: 5,
    },
    signIn: {
        width: width - 55,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },  
})

export default JourneyDetailsScreen
