import React, {useState} from 'react';
import { View, Text, Image, ScrollView, Button,TextInput, StyleSheet, SafeAreaView } from 'react-native';

const Loading = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
           
            <View style={styles.formDetailsBg}>
                <View>
                    <Image source={require('../images/icons/dots.gif')} style={styles.loading} />
                </View>
                <View>
                    <Text style={styles.loading__text}>Loading...</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: 35, 
        paddingVertical: 15,
    },
    loading: {
        width: 300,
    },
    formDetailsBg: {
        // justifyContent: 'center'
        flexDirection: 'column',
        alignItems: 'center',
    },
    loading__text: {
        color: '#003c30',
        fontSize: 18,
        // fontFamily: 'Montserrat-Medium',
        marginTop: 0,
    }
})

export default Loading;
