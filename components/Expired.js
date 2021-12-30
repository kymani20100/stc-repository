import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
const Expired = (data) => {
    
    return (
        <>
        <TouchableOpacity activeOpacity={.7} onPress={() => {}}>
            <Animatable.Image animation="fadeIn" style={styles.myCustomCheckbox} source={require('../images/icons/expp.png')} />
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    myCustomCheckbox: {
        width: 20,
        height: 20, 
    }
})

export default Expired;