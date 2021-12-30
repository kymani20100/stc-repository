import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Vibration } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Audio } from 'expo-av';
// REDUX
import {useSelector, useDispatch} from 'react-redux';
// import { toggleSeats } from '../store/actions/booking';
import * as bookingActions from '../store/actions/booking';

const Card = (data) => {
    const [isSelected, setIsSelected] = useState(false);
    // const [visible, setVisible] = useState('Hide');
    const [sound, setSound] = useState();
    const onDismissSnackBar = () => setVisible(false);
    // MY API DATA 
    const { props, bookedSeats } = data;
    
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
        require('../images/sounds/ticket.mp3')
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

    const dispatch = useDispatch();
    
    const toggleSeatsHandler = () => {
        // VIBRATE TO CALL ATTENTION
        Vibration.vibrate();
        // if(!isSelected){
        //     playSound();
        // }
        setIsSelected(!isSelected);
        dispatch(bookingActions.toggleSeats(props));
    }

    return <>
            {props.showStatus === '1' && props.bookStatus === '0' && (
                
                <TouchableOpacity onPress={toggleSeatsHandler}>
                    <View style={styles.card}>
                        <View style={styles.centered__seat__number}>
                            {bookedSeats.find(seat => seat.seatNo === props.seatNo) ? (
                                <Image style={styles.flatList__seat} source={require('../images/icons/selected.png')} />
                            ) : (
                                <Image style={styles.flatList__seat} source={require('../images/icons/seat.png')} />
                            )}
                            <Text style={styles.seat__numbering}>{props.seatNo}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            {props.showStatus === '1' && props.bookStatus === '1' && (
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.card}>
                        <View style={styles.centered__seat__number}>
                            <Image style={styles.flatList__seat} source={require('../images/icons/booked.png')} />
                            <Text style={styles.seat__numbering}>{props.seatNo}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            {props.showStatus === '0' && props.seatNo === '0' && (
                    <View style={styles.blank_space}>

                    </View>
            )}
        </>

}

const styles = StyleSheet.create({
    card: {
        height: 40,
        backgroundColor: '#eaeaea',
        width: 40,
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#8d8d8d",
        shadowOffset: { width: -5, height: 5},
        shadowOpacity: .4,
        shadowRadius: 3,
        elevation: 4,
    },
    blank_space: {
        height: 35,
        width: 35,
    },
    centered__seat__number: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList__seat: {
        width: 18,
        height: 18,
    },
    seat__numbering: {
        fontSize: 7,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000',
    },
})

export default Card;
