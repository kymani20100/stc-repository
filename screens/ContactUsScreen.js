import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Platform, Dimensions, Image, ScrollView, Button,TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Row, Grid } from "react-native-easy-grid";
import { Audio } from 'expo-av';
import { Chip } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';


const ContactUsScreen = ({navigation}) => {
    const [sound, setSound] = useState();

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

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Grid>
                <Row size={100}>
                    <View style={styles.formDetailsBg}>

                        <View style={styles.section}>
                            <View style={styles.img__bg}>
                                <Image style={styles.destination_from_img} source={require('../images/icons/phone-one.png')} />
                            </View>
                            

                            <View style={styles.detailsText}>
                                <Text style={styles.destination_small}>(+233)-(0)-573-100-375</Text>
                                <Text style={styles.destination_small}>(+233)-(0)-573-100-398</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.img__bg}>
                                <Image style={styles.destination_from_img} source={require('../images/icons/phone-two.png')} />
                            </View>
                            

                            <View style={styles.detailsText}>
                                <Text style={styles.destination_small}>(+233)-(0)-557-943-605</Text>
                                <Text style={styles.destination_small}>(+233)-(0)-557-943-606</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.img__bg}>
                                <Image style={styles.destination_from_img} source={require('../images/icons/email.png')} />
                            </View>
                            

                            <View style={styles.detailsText}>
                                <Text style={styles.destination_small}>support@stcticketing.gov.gh</Text>
                                <Text style={styles.destination_small}>info@stc.gov.gh</Text>
                            </View>
                        </View>

                        <View style={styles.sectionTotal}>
                            <View style={styles.img__bg}>
                                <Image style={styles.destination_from_img} source={require('../images/icons/address.png')} />
                            </View>
                            

                            <View style={styles.detailsText}>
                                <Text style={styles.destination_small}>No. 1 Ajuma Crescent opposite Awudome </Text>
                                <Text style={styles.destination_small}>Cemetery.</Text>
                                <Text style={styles.destination_small}>P.O.BOX 7384 Ring Road West Industrial</Text>
                                <Text style={styles.destination_small}>Area Accra.</Text>
                            </View>
                        </View>
                    </View>

                </Row>
            </Grid>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerContainer: {
        // justifyContent: 'space-between',
        height: 150,
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
        marginLeft: 30
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 35,
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    destination_from_img:{
        width: 40,
        height: 40,
        // borderRadius: 15,
    },
    section: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 60,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    sectionTotal: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 90,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    detailsText: {
        marginLeft: 10,
        padding: 5,
    },
    img__bg: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    destination_city: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#003c30',
        marginTop: -7,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        fontWeight: 'bold',
        fontSize: 18
    },
    continueButton: {
        width: width - 15,
        paddingHorizontal: 10,
    },
    destination_small:{
        color: '#003c30',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular'
    },
    destination_price: {
        color: '#003c30',
        fontSize: 20,
        fontFamily: 'Montserrat-Black'
    },
    textSign: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold'
    },
})

export default ContactUsScreen
