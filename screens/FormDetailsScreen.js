import React, {useState, useEffect, useCallback,} from 'react';
import { View, Text, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Alert, RefreshControl, Dimensions, Image, FlatList, BackHandler } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';
// import { Octicons } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import FormDetail from '../components/FormDetail';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
// import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import * as busActions from '../store/actions/buses';
import { emptyBooking } from '../store/actions/booking';
import { Row, Grid } from "react-native-easy-grid";

const SPACING = 5;
const AVATAR_SIZE = 15;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const FormDetailsScreen = ({route, navigation}) => {
    const { cityFrom, cityFromId, cityTo, cityToId, tripDate } = route.params;
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [started, setStarted] = useState(true);

    const [text, setText] = React.useState('heya');
  const hasUnsavedChanges = Boolean(text);

  
   
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
   const trip_date = JSON.parse(tripDate);
   const splitted_date = trip_date.split("/");

    let output = '';
    if(splitted_date[0] === "1"){
        output = 'Jan';
    }else if(splitted_date[0] === "2"){
        output = 'Feb';
    }else if(splitted_date[0] === "3"){
        output = 'Mar';
    }else if(splitted_date[0] === "4"){
        output = 'Apr';
    }else if(splitted_date[0] === "5"){
        output = 'May';
    }else if(splitted_date[0] === "6"){
        output = 'Jun';
    }else if(splitted_date[0] === "7"){
        output = 'Jul';
    }else if(splitted_date[0] === "8"){
        output = 'Aug';
    }else if(splitted_date[0] === "9"){
        output = 'Sep';
    }else if(splitted_date[0] === "10"){
        output = 'Oct';
    }else if(splitted_date[0] === "11"){
        output = 'Nov';
    }else if(splitted_date[0] === "12"){
        output = 'Dec';
    }
    // THIS BLOCK FORMATS THE DATE
    const dispatch = useDispatch();
    const formatted_date = `${splitted_date[1]}-${output}-${splitted_date[2]}`;
    const buses = useSelector(state =>  state.buses.availableBuses);
    const sumOfTotal = useSelector(state =>  state.booking.total);
   
    // DISPTACH THIS ACTION HERE
    useEffect(() => {
        
        dispatch(busActions.fetchBuses(JSON.parse(cityFromId),JSON.parse(cityToId),formatted_date)).then(() => {
            setStarted(false);
        });
    },[dispatch])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setStarted(true);
        wait(2000).then(() => setRefreshing(false));

        dispatch(busActions.fetchBuses(JSON.parse(cityFromId),JSON.parse(cityToId),formatted_date)).then(() => {
            setStarted(false);
        });
      }, []);

    // THIS BLOC K ERASES THE STACK BY RESETTING
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
        setTimeout(() => {
            setLoading(true);
        }, 10000)
    }, [])

    const EmptyComponent = () => {
        return (
            <FormDetail />   
        );
    }

    const BusFooter = () => {
        return  <View style={styles.footer__bottom}>
            
        </View>
    }

    useEffect(() => {
        console.log('Items', sumOfTotal)
        if(sumOfTotal > 0){
            dispatch(emptyBooking());
        }
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
            <Grid>
                
                <Row size={100}>
                    <View style={styles.formDetailsBg}>

                        <View style={styles.form__details__section}>
                            <View style={styles.img__bg}>
                                <FontAwesome5 name="map-marker-alt" size={35} color="#fe0103" />
                            </View>
                            
                            <View style={styles.detailsText}>
                                <View style={styles.destination_format_style}>
                                    <Text style={styles.destination_small_form}>From : </Text>
                                    <Text style={styles.form__details__padding}>{JSON.parse(JSON.stringify(cityFrom))}</Text>
                                </View>

                                <View style={styles.destination_format_style}>
                                    <Text style={styles.destination_small_form}>To : </Text>
                                    <Text style={styles.form__details__padding_to}>{JSON.parse(JSON.stringify(cityTo))}</Text>
                                </View>

                                <View style={styles.destination_format_style}>
                                    <Text style={styles.destination_small_form}>Date : </Text>
                                    <Text style={styles.form__details__padding_date}>{formatted_date}</Text>
                                </View>
                            </View>
                        </View>

                        {started && (
                            <View style={styles.centeredBus}>
                                <FormDetail />
                            </View>
                        )}

                        {buses.Message !== 'NO_RECORD_FOUND' ? (
                            <View style={styles.centeredBus}>
                            <FlatList data={buses} keyExtractor={item => item.TripID} 
                                ListEmptyComponent={ <EmptyComponent />}
                                ListFooterComponent={<BusFooter />}
                                refreshControl={
                                    <RefreshControl
                                      refreshing={refreshing}
                                      onRefresh={onRefresh}
                                    />
                                  }
                                renderItem={itemData => (
                                    <TouchableOpacity
                                    activeOpacity={.9}
                                    style={styles.sinIn}
                                    onPress={() => {
                                        itemData.item.id !== '0' ? (
                                            navigation.navigate('BusSeatPicker',{
                                                busID: JSON.stringify(itemData.item.TripID),
                                                busFare: JSON.stringify(itemData.item.FAR),
                                                cityFromId: JSON.stringify(cityFromId),
                                                cityToId: JSON.stringify(cityToId),
                                                travelDate: JSON.stringify(formatted_date),
                                                serviceType: JSON.stringify(itemData.item.ServiceType),
                                                departureTime: JSON.stringify(itemData.item.Depart),
                                                destinationTerminal: JSON.stringify(itemData.item.TName),
                                                cityFrom: JSON.stringify(itemData.item.DestFromID),
                                                cityTo: JSON.stringify(itemData.item.DestToID),
                                            })
                                        ) : (
                                            RestartBucketHandler
                                        )
                                        }}>
                                    <LinearGradient colors={itemData.item.TName !== '0' ? (['#002d24', '#003c30', '#002d24']) : (['#127f41', '#148d49', '#127f41'])} style={styles.stc__bus__bg}>
                                    
                                        <View style={styles.form__navigation__seat__page}>
                                            <ImageBackground source={require('../images/icons/blankk.png')} style={{width: '100%', height: '100%'}}>
                                                <View style={styles.paddingCentered}>
                                                    <View>
                                                        <Text style={styles.destination_small_form_api}>{itemData.item.TName}</Text>
                                                    </View>
                  
                                                    <View style={styles.row__column}>
                                                        <View style={styles.img__bg}>
                                                            <Image style={styles.destination_from_img_fare_seat} source={require('../images/bus.png')} />
                                                        </View>
                  
                                                        <View style={styles.detailsText_fare}>
                                                            <Text style={styles.destination_small_form_grey}>Departure Time - {itemData.item.Depart}</Text>
                                                            <Text style={styles.destination_small_form_grey}>{itemData.item.SEAT} Totals seats - {itemData.item.LSEAT} Seats left</Text>
                                                            <View style={styles.two__block__float}>
                                                            <Text style={styles.destination_small_form_fare}>GH₵ {itemData.item.FAR}</Text>
                                                            <FontAwesome name="chevron-right" size={14} color="#FFF" />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                        
                                    </LinearGradient>
                                </TouchableOpacity>
                            )} />
                    </View>
                        ) : (
                            <View>
                                <Image style={styles.errorRoute} source={require('../images/icons/nope.png')} />
                                <Text style={styles.errorTextOne}>Hmm! We couldn't find you a bus.</Text>
                                <Text style={styles.errorTextTwo}>Please try again later.</Text>

                                <View style={{justifyContent: 'center', alignItems: 'center', width: width - 45, marginTop: 15}}>
                                    <Button color='#003c30' contentStyle={{height: 35, }} disabled={false} mode="contained"  onPress={onRefresh}>
                                        Refresh
                                    </Button>
                                </View>
                            </View>
                        )}

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
        // padding: 15,
        // shadowColor: 'black',
        // shadowOpacity: 0.26,
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 8,
        // elevation: 5,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 5
    },
    formDetailsBg: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: height - 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    destination_from_img:{
        width: 40,
        height: 40,
    },
    destination_from_img_fare_seat: {
        width: 35,
        height: 17,
    },
    img__bg__icon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 40,
        textAlign: 'right'
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
    form__details__section: {
        backgroundColor: '#FFF',
        width: width - 39,
        height: 100,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        marginTop: -20,
        marginBottom: 15,
        shadowColor: "#8d8d8d",
        shadowOffset: { width: -5, height: 5},
        shadowOpacity: .4,
        shadowRadius: 8,
        elevation: 2, 
    },
    form__details__section__navigation: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        paddingLeft: 10,
        paddingRight: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 2,
    },
    form__details__padding: {
        paddingLeft: 10,
        color: '#003c30',
        fontFamily: 'Montserrat-Medium',
    },
    form__details__padding_to: {
        paddingLeft: 30,
        color: '#003c30',
        fontFamily: 'Montserrat-Medium',
    },
    form__details__padding_date: {
        paddingLeft: 14,
        color: '#003c30',
        fontFamily: 'Montserrat-Medium',
    },
    sectionTotal: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 150,
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        marginTop: 15,
        marginLeft: 10,
        paddingLeft: 3,
        paddingRight: 10,
        width: width - 35,
        height: 80,
        flexWrap: 'wrap',
    },
    destination_format_style: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    detailsText_fare: {
        marginLeft: 10,
        paddingLeft: 3,
        paddingRight: 10,
        justifyContent: 'space-between',
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
        color: '#949594',
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        flexWrap: 'wrap',
    },
    destination_small_form: {
        color: '#003c30',
        fontSize: 13,
        // flexWrap: 'wrap',
        // width: '100%',
        fontFamily: 'Montserrat-Regular'
    },
    destination_small_form__price: {
        color: '#003c30',
        fontSize: 13,
        // justifyContent: 'space-between',
        fontFamily: 'Montserrat-ExtraBold'
    },
    destination_small_form_fare: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 10,
        fontFamily: 'Montserrat-SemiBold'
    },
    destination_small_form_grey: {
        color: '#f5f5f5',
        fontSize: 12,
        // flexWrap: 'wrap',
        // width: '100%',
        fontFamily: 'Montserrat-Regular'
    },
    destination_small_form_api: {
        color: '#FFF',
        fontSize: 12,
        flexWrap: 'wrap',
        paddingRight: 10,
        fontFamily: 'Montserrat-SemiBold'
    },
    destination_text_component: {
        color: '#003c30',
        fontSize: 14,
        flexWrap: 'wrap',
        fontFamily: 'Montserrat-ExtraBold'
    },
    destination_price: {
        color: '#003c30',
        fontSize: 14,
        fontFamily: 'Montserrat-Black'
    },
    textSign: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold'
    },
    form__navigation__seat__page: {
        width: width - 35,
        height: 130,
        flexDirection: 'column',
        overflow: 'hidden'
    },
    paddingCentered: {
        paddingHorizontal: 15, 
        paddingVertical: 15,
    },
    stc__bus__bg: {
        borderRadius: 15,
        marginBottom: 15,
    },
    stc__bus: {
        width: width - 15,
    },
    row__column: {
        flexDirection: 'row',
    },
    two__block__float: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loading: {
        width: 100,
        height: 100,
        marginBottom: 25,
    },
    flatlist__placeholder: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    centeredBus: {
        // width: width - 25,
        height: 400,
        marginBottom: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer__bottom: {
        height: 50,
    },
    errorRoute: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    errorTextOne: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#003c30',
        fontFamily: 'Montserrat-SemiBold',
    },
    errorTextTwo: {
        alignSelf: 'center',
        fontSize: 14,
        color: '#003c30',
        fontFamily: 'Montserrat-Medium',
    }
})

export default FormDetailsScreen
