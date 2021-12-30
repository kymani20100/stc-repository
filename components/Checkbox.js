import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
// REDUX
import {useSelector, useDispatch} from 'react-redux';
import * as ticketActions from '../store/actions/tickets';

const Checkbox = (data) => {
    const [isSelected, setIsSelected] = useState(false);
    const { ticketID, seatNo, passenger, fare, from, to } = data;
    let ticketObj = {'ticketID': ticketID, 'seatNo': seatNo, 'name': passenger, 'fare': fare, 'from': from, 'to': to}
    const dispatch = useDispatch();
    const toggleCheckbox = () => {
        setIsSelected(!isSelected);
        dispatch(ticketActions.toggleTickets(ticketObj));
    }

    return (
        <>
        {isSelected ? ( 
            <TouchableOpacity activeOpacity={.7} onPress={toggleCheckbox}>
                <Animatable.Image animation="fadeIn" style={styles.myCustomCheckbox} source={require('../images/icons/check.png')} />
            </TouchableOpacity>
            ) 
            : ( 
            <TouchableOpacity activeOpacity={.7} onPress={toggleCheckbox}>
                <Animatable.Image animation="fadeIn" style={styles.myCustomCheckbox} source={require('../images/icons/check_blank.png')} />
            </TouchableOpacity>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    myCustomCheckbox: {
        width: 20,
        height: 20, 
    }
})

export default Checkbox;