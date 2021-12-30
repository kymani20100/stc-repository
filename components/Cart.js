import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, Vibration, Dimensions, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import {useSelector, useDispatch} from 'react-redux';
import { toggleSeats } from '../store/actions/booking';

import CartItem from '../models/cartItem';
import * as bookingActions from '../store/actions/booking';
import Toast from 'react-native-toast-message';
const Cart = ({navigation, serviceType, departureTime, destinationTerminal, tripID, travelDate, cityFrom, cityTo, busFare}) => {
    const TotalAmount = useSelector(state => state.booking.total);

    // GET THE LOGGED IN USERS DETAILS
    const tokenCode = useSelector(state =>  state.auth.token);
    const picUrl = useSelector(state =>  state.auth.pic);
    const mobile = useSelector(state =>  state.auth.phone);
    const userName = useSelector(state =>  state.auth.name);
    const dispatch = useDispatch();
    

    const transformedCartItems = [];
    const bookSeats = useSelector(state => {
        for (const key in state.booking.bookedSeats) {
            transformedCartItems.push({
                uniq: key,
                seatId: state.booking.bookedSeats[key].seatId,
                seatNo: state.booking.bookedSeats[key].seatNo,
                price: state.booking.bookedSeats[key].price,
                gender: '',
                fullname: '',
                dob: '',
                age: '',
                idType: '',
                idNumber: '',
                nationality: '',
                mobile: '',
                kinName: '',
                kinNumber: ''
            });  
        }
        
        console.log('This is the cart Item',transformedCartItems);
        return transformedCartItems;
      });

    

    const renderButton = () => {
        let btn = '';
        if(transformedCartItems.length > 0 && userName === null){
            // transformedCartItems.push({mobile: '', kinName: '', kinNumber: ''});
            btn = <Button color='#003c30' mode="contained" onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignIn', params: { traveller: JSON.stringify(transformedCartItems), serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare }}],
                        });
                    }}>
                    Book
                </Button>
        }else if(transformedCartItems.length > 0 && userName !== null){
            // transformedCartItems.push({mobile: '', kinName: '', kinNumber: ''});
            btn = <Button color='#003c30' mode="contained" onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Traveller', params: { traveller: JSON.stringify(transformedCartItems), serviceType: serviceType, departureTime: departureTime, destinationTerminal: destinationTerminal, tripID: tripID, travelDate: travelDate, cityFrom: cityFrom, cityTo: cityTo, busFare: busFare }}],
                });
            }}>
            Book
        </Button>
        }else{
            
            btn = <Button color='#003c30' mode="contained" onPress={() => {
                // VIBRATE TO CALL ATTENTION
                Vibration.vibrate(10 * 100);

                Toast.show({
                type: 'error',
                position: 'top',
                text1: 'PLEASE SELECT A SEAT',
                text2: 'Kindly select a seat before trying to `Book`.',
                visibilityTime: 5000,
                autoHide: true,
                topOffset: 110,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                onPress: () => {},
                props: {} // any custom props passed to the Toast component
            });
            }}>
            Book
        </Button>
        }
        return btn;
    }

    return (
        <View>
            <View style={styles.seatInterporation__results}>
                <Text style={styles.booking__details}> GH₵ {TotalAmount} </Text>

               <View style={styles.selected__seats}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                        {transformedCartItems.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.seat__details}> {`${item.seatNo},`}</Text>
                                </View> 
                            );
                        })}
                    </ScrollView>
               </View>

                <View style={styles.book__btn__container}>
                    {renderButton()}
                </View>

            </View>
        </View> 
    );
}



const styles = StyleSheet.create({
    seatInterporation__results: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 50,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#8d8d8d",
        shadowOffset: { width: -5, height: 5},
        shadowOpacity: .4,
        shadowRadius: 3,
        elevation: 4,
    },
    booked__details__container: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
        marginRight: 10,
    },
    booking__details: {
        flex: 1,
        marginRight: 10,
        overflow: 'scroll',
        fontFamily: 'Montserrat-ExtraBold'
    },
    selected__seats: {
        flex: 2,
        marginRight: 10,
        marginTop: 5,
        overflow: 'scroll',
        fontFamily: 'Montserrat-SemiBold'
    },
    booking__details__seats: {
        overflow: 'hidden',
        fontFamily: 'Montserrat-SemiBold'
    },
    book__btn__container: {
        flex: 1,
        marginRight: 5,
        borderColor: '#CCC',
    },
    seat__details: {
        color: '#000',
        fontFamily: 'Montserrat-ExtraBold'
    }
})

export default Cart;
