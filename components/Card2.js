import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    Shine,
  ShineOverlay,
  } from "rn-placeholder";

// REDUX
import {useSelector, useDispatch} from 'react-redux';
// import { toggleSeats } from '../store/actions/booking';
import * as bookingActions from '../store/actions/booking';

const Card = ({props}) => {
    const [isSelected, setIsSelected] = useState(false);
    // const [visible, setVisible] = useState('Hide');
    // const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    // MY API DATA 
    // const { props, bookedSeats } = data;
    
    //  console.log('CARD',props)

    

    return <>
             {props.isVisible === true && (
                
               
                    <View style={styles.card}>
                        <View style={styles.centered__seat__number}>
                            <Placeholder width={40} height={40} Animation={ShineOverlay}>
                                <PlaceholderLine />
                            </Placeholder>
                        </View>
                    </View>
                
            )}

            

            {props.isVisible === false && (
                    <View style={styles.blank_space}>

                    </View>
            )}
            

        </>

}

const styles = StyleSheet.create({
    card: {
        height: 40,
        backgroundColor: '#F1F1F1',
        width: 40,
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        // shadowColor: "#a5a5a6",
        // shadowOffset: { width: 0, height: 10},
        // shadowOpacity: .5,
        // shadowRadius: 20,
        // elevation: 2,
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
        fontFamily: 'Montserrat-Regular',
    },
})

export default Card;
