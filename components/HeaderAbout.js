import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const HeaderAbout = ({src, header}) => {
    return (
      <View style={styles.section}>
        <View style={styles.img__bg}>
            <Image style={styles.destination_from_img} source={src} />
        </View>
        
        <View style={styles.detailsText}>
            <Text style={styles.destination_small_title}>{header}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 10,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    img__bg: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    destination_from_img:{
        width: 40,
        height: 40,
        // borderRadius: 15,
    },
    detailsText: {
        padding: 10,
    },
    destination_small_title: {
        color: '#003c30',
        fontSize: 12,
        fontFamily: 'Montserrat-Medium'
    },
})
export default HeaderAbout
