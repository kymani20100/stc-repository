import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Platform, Dimensions, Image, ScrollView,TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Chip } from 'react-native-paper';
import { Row, Grid } from "react-native-easy-grid";

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
// import { useStateValue } from '../src/StateProvider';


const AboutUsScreen = ({navigation}) => {

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

                        <ScrollView contentContainerStyle={styles.scrollView__padding}>

                            <View styles={styles.contentWrapper}>
                                    <View style={styles.section}>
                                        <View style={styles.img__bg}>
                                            <Image style={styles.destination_from_img} source={require('../images/icons/history.png')} />
                                        </View>
                                        
                                        <View style={styles.HeaderdetailsText}>
                                            <Text style={styles.destination_small_title}>History</Text>
                                        </View>
                                    </View> 


                                    <View style={styles.sectionVisions}>
                                        <View style={styles.detailsText}>
                                            <Text style={styles.destination_small_history}>
                                            The roots and origin of Intercity STC (ISTC) began in 1909 as a Government
                                                Transport Department to cater for the needs of the central Government.
                                                In 1965, it was made a body corporate by Legislative Instrument (L.I) number
                                                414 of 9th March 1965 to run commercial passenger services and was then called the State Transport
                                                Corporation (STC). In January 1968, the Government also created a haulage division to cater for the
                                                haulage of both dry and wet cargo. This was also handed over to STC to manage as a bulk haulage division, to function
                                                alongside the passenger division. STC was later incorporated in June 1995 as a Limited Liability Company 
                                                under STC's Companies Act, 1962, (Act 179) in the name, State Transport Company Limited. Over the years,
                                                the company has gone through changes and is now known as the Intercity STC Coaches Limited since October 2003.
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.section}>
                                        <View style={styles.img__bg}>
                                            <Image style={styles.destination_from_img} source={require('../images/icons/vision.png')} />
                                        </View>
                                        
                                        <View style={styles.HeaderdetailsText}>
                                            <Text style={styles.destination_small_title}>Our Vision</Text>
                                        </View>
                                    </View> 

                                    <View style={styles.sectionVision}>
                                        <View style={styles.detailsText}>
                                            <Text style={styles.destination_small_history}>
                                                To be the leader in the road passenger transport industry in STC and the ECOWAS sub-region.
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.section}>
                                        <View style={styles.img__bg}>
                                            <Image style={styles.destination_from_img} source={require('../images/icons/mission.png')} />
                                        </View>
                                        
                                        <View style={styles.HeaderdetailsText}>
                                            <Text style={styles.destination_small_title}>Our Mission</Text>
                                        </View>
                                    </View> 

                                    <View style={styles.sectionMission}>
                                        <View style={styles.detailsText}>
                                            <Text style={styles.destination_small_history}>
                                                To consistently and profitably deliver the safest, most comfortable and reliable road 
                                                transport and allied services using highly motivated and competent workforce and state 
                                                of the art facilities to meet the aspirations of all stakeholders.
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.section}>
                                        <View style={styles.img__bg}>
                                            <Image style={styles.destination_from_img} source={require('../images/icons/goal.png')} />
                                        </View>
                                        
                                        <View style={styles.HeaderdetailsText}>
                                            <Text style={styles.destination_small_title}>Corporate Goal</Text>
                                        </View>
                                    </View> 

                                    <View style={styles.sectionVision}>
                                        <View style={styles.detailsText}>
                                            <Text style={styles.destination_small_history}>
                                                To be the leader in the Road Transport industry in STC and the ECOWAS sub-region, consistently and profitably.
                                            </Text>
                                        </View>
                                    </View>
                                <View style={styles.randomMargin}></View>
                            </View>
                        </ScrollView>
                    </View>
                </Row>
            </Grid>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginLeft: 20
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
        paddingTop: 10,
        paddingHorizontal: 10,
        // marginTop: 20,
        alignItems: 'center',
    },
    
    destination_from_img:{
        width: 40,
        height: 40,
        // borderRadius: 15,
    },
    section: {
        backgroundColor: '#FFF',
        width: width - 40,
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
    sectionTotal: {
        backgroundColor: '#FFF',
        width: width - 40,
        height: 450,
        overflow: 'scroll',
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
    sectionVision: {
        backgroundColor: '#FFF',
        width: width - 40,
        height: 100,
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
    sectionVisions: {
        backgroundColor: '#FFF',
        width: width - 40,
        height: 520,
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
    sectionMission: {
        backgroundColor: '#FFF',
        width: width - 40,
        height: 200,
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
    randomMargin: {
        height: 200,
    },
    detailsText: {
        padding: 10,
    },
    HeaderdetailsText: {
        textAlign: 'center',
        paddingLeft: 30,
    },
    scrollView__padding: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 150,
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
    destination_small_history:{
        color: '#003c30',
        fontSize: 12,
        lineHeight: 20,
        fontFamily: 'Montserrat-Regular'
    },
    destination_small_title: {
        color: '#003c30',
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold'
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

export default AboutUsScreen;
