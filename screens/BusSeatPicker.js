import React, {useState, useEffect,useCallback} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, Alert, Modal, BackHandler, FlatList, Platform, Dimensions, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Button, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import plants from '../components/plants';
import Toast from 'react-native-toast-message';
// IMPORT PERSONAL COMPONENTS
import { CommonActions } from '@react-navigation/native';
import Card from '../components/Card';
import Cart from '../components/Cart';
import Card2 from '../components/Card2'

import { useSelector, useDispatch } from 'react-redux';
import * as seatActions from '../store/actions/seats';
import { emptyBooking } from '../store/actions/booking';
const {width, height} = Dimensions.get('screen');
import * as Animatable from 'react-native-animatable';
import { Col, Row, Grid } from "react-native-easy-grid";
let seats = [];

const BusSeatPicker = ({route, navigation}) => {
    const {busID, busFare,  cityFromId, cityToId,  travelDate, 
        serviceType, 
        departureTime, 
        destinationTerminal,
        cityFrom,
        cityTo
    } = route.params;
    const [loading, setLoading] = useState(true);
    const seats = useSelector(state =>  state.seats.seats);
    const sumOfTotal = useSelector(state =>  state.booking.total);
    const [loadModal, setLoadModal] = useState(true);
    const [text, setText] = React.useState('yhgh');
    const hasUnsavedChanges = Boolean(text);
    const dispatch = useDispatch();
    const totalSum = [];
    
    const RestartBucketHandler = useCallback(() => {
        dispatch(emptyBooking());
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
    }, [dispatch]);

    useEffect(() => {
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
    
        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );
    
        return () => backHandler.remove();
    }, []);


    useEffect(() => {
        setLoadModal(true);
        setTimeout(() => {
            setLoading(false);
        }, 10000)
    }, []);

    const transformedSeatItems = [];
     const bookSeats = useSelector(state => {
         for (const key in state.booking.bookedSeats) {
            transformedSeatItems.push({
                     uniq: key,
                     seatId: state.booking.bookedSeats[key].seatId,
                     seatNo: state.booking.bookedSeats[key].seatNo,
                     price: state.booking.bookedSeats[key].price,
                 });

            totalSum.push(state.booking.bookedSeats[key].price); 
         }
         return transformedSeatItems;
       });

    const BusFooter = () => {
        return  <View style={styles.footer__bottom}>
            
        </View>
    }
       const EmptyComponent = () => {
            return (
                <View style={styles.centeredBus}>
                    <FlatList 
                        ListEmptyComponent={ <EmptyComponent />}
                        numColumns={7} 
                        data={plants}
                        renderItem={({item}) => {
                            return <Card2 props={item} />;
                        }}
                        ListFooterComponent={<BusFooter />}
                    />
                </View>
            );
        }

    useEffect(() => {
        dispatch(seatActions.fetchSeats(JSON.parse(cityFromId), JSON.parse(cityToId), JSON.parse(travelDate), JSON.parse(busID)));
    },[dispatch])


    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
            <Grid>
                <Row size={100}>
                    <View style={styles.formDetailsBg}>
                        
                        <Cart 
                            navigation={navigation} 
                            destinationTerminal={JSON.parse(destinationTerminal)} 
                            departureTime={JSON.parse(departureTime)} 
                            serviceType={JSON.parse(serviceType)} 
                            tripID={JSON.parse(busID)} 
                            travelDate={JSON.parse(travelDate)}
                            cityFrom={JSON.parse(cityFrom)}
                            cityTo={JSON.parse(cityTo)}
                            busFare={JSON.parse(busFare)}
                            
                         />
                        
                        <View style={styles.seatInterporation}>
                            <View style={styles.individualSeat}>
                                <Image style={styles.seat__blank} source={require('../images/icons/seat.png')} />
                                <Text style={styles.seat__description__small}>Empty Seat</Text>
                            </View>

                            <View style={styles.individualSeat}>
                                <Image style={styles.seat__blank} source={require('../images/icons/selected.png')} />
                                <Text style={styles.seat__description__small}>Selected Seat</Text>
                            </View>

                            <View style={styles.individualSeat__last}>
                                <Image style={styles.seat__blank} source={require('../images/icons/booked.png')} />
                                <Text style={styles.seat__description__small}>Booked Seat</Text>
                            </View>
                        </View>

                    
                        <View style={styles.busSimulator}>
                            <Animatable.View animation="bounce" style={styles.steering__bus__front}>
                                <Image style={styles.steeringWheel} source={require('../images/icons/steering.png')} />

                                <View>
                                    <Image style={styles.scrollDown} source={require('../images/icons/scroll-down.gif')} />
                                </View>
                            </Animatable.View>
                        
                            {loading === true ? (
                                <View style={styles.centeredBus}>
                                    <FlatList 
                                        ListEmptyComponent={ <EmptyComponent />}
                                        numColumns={7} 
                                        data={plants}
                                        renderItem={({item}) => {
                                            return <Card2 props={item} />;
                                        }}
                                        ListFooterComponent={<BusFooter />}
                                    />
                                </View>
                            ) : (
                                <View style={styles.centeredBus}>
                                    <FlatList 
                                        ListEmptyComponent={ <EmptyComponent />}
                                        numColumns={7} 
                                        data={seats}
                                        renderItem={({item}) => {
                                            return <Card bookedSeats={transformedSeatItems} props={item} />;
                                        }}
                                        ListFooterComponent={<BusFooter />}
                                    />
                                </View>
                            )}
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
        height: '20%',
        width: width,
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 25,
    },
    drawerBarsIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFF',
        marginLeft: 10,
        marginRight: 40,
        // borderRadius: 20,
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 8,
        // elevation: 5,
    },
    card: {
        height: 60,
        backgroundColor: '#eaf2e9',
        width: 60,
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#626262",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 9,
    },
    centered__seat__number: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList__seat: {
        width: 25,
        height: 25,
    },
    seat__numbering: {
        fontSize: 10,
        fontFamily: 'Oswald-Regular'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        marginLeft: -15,
    },
    seat__description__small: {
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        color: '#000',
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 0,
        alignItems: 'center',
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
    seatInterporation: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 60,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginTop: - 5,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#8d8d8d",
        shadowOffset: { width: -5, height: 5},
        shadowOpacity: .4,
        shadowRadius: 3,
        elevation: 4,
    },
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
    footer__bottom: {
        height: 50,
    },
    seat__blank: {
        width: 20,
        height: 20,
    },
    individualSeat: {
         paddingHorizontal: 15,
        borderRightWidth: 1,
        marginVertical: 5,
        borderRightColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    individualSeat__last: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busSimulator: {
        width: width - 15,
        height: '70%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        backgroundColor: '#fff' ,
        paddingVertical: 15,
        shadowColor: "#8d8d8d",
        shadowOffset: { width: -5, height: 5},
        shadowOpacity: .4,
        shadowRadius: 3,
        elevation: 4,
    },
    steeringWheel: {
        width: 25,
        height: 25,
        marginLeft: 35,
    },
    scrollDown: {
        width: 40,
        height: 40,
        marginLeft: '50%',
    },
    centeredBus: {
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    steering__bus__front: {
        flexDirection: 'row',
        height: 50,
    },
    footer__bottom: {
        height: 20,
    } ,
    booking__details: {
        marginRight: 15,
    }, 
    booked__details__container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    loading: {
        width: 100,
        height: 100,
        marginBottom: 25
    },
    flatlist__placeholder: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 15,
        backgroundColor: '#003c30',
    },
    signIn: {
        width: width - 45,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15
    },
    confirm__selection: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 15
    }
})

export default BusSeatPicker; 
