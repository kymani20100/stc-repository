import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, StatusBar, ImageBackground, Dimensions, Image, ScrollView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
// import * as Animatable from 'react-native-animatable';
import FormDetail from '../components/FormDetail';
import { AirbnbRating } from 'react-native-ratings';
import { Button, RadioButton, Chip, TextInput, DataTable } from 'react-native-paper';
const optionsPerPage = [2, 3, 4];
// import history from '../components/historyApi';
import { Audio } from 'expo-av';
import Checkbox from '../components/Checkbox';
import Expired from '../components/Expired';
import {useSelector, useDispatch} from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as historyActions from '../store/actions/history';
import * as authActions from '../store/actions/auth';

const BookingHistoryScreen = ({navigation}) => {
    const [loadModal, setLoadModal] = useState(false);
    const [loadCancelModal, setCancelModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(false);
    const [payload, setPayload] = useState(false);
    const [started, setStarted] = useState(true);
    const [sound, setSound] = useState();
    // THESE ARETHE SELECTED TICKETS
    const allTickets = useSelector(state =>  state.tickets.selectedTickets);
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    const ratingCompleted = (rating) => {
        console.log("Rating is:" + rating)
    }

    const myBookedTickets = useSelector(state =>  state.history.availableTickets);
    const myUserTokenToken = useSelector(state =>  state.auth.token);
    const myUserPassID = useSelector(state =>  state.auth.passID);
    const dispatch = useDispatch();

    let sumBeforeTotal = 0;
    let sumTotal = 0;
    let deductionTotal = 0;

    const parseDate = (input) => {
        let parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    }

    // GET TODAYS DATE
    const getTodayDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return today = mm + '/' + dd + '/' + yyyy;
    }

    const timeNow = () => {
        let d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
        s = (d.getSeconds());
        let strTime = h + ':' + m + ':' + s;
        return strTime;
    }

    const formatMyDate = (d) => {
        let val = d.split(' ');
        let valDate = val[0];
        let valTime = val[1];
        console.log('Fist Log',valDate);
        let purgedVal = valDate.replace(/-/g, '/');
        console.log('Second Log',purgedVal);
        return parseDate(purgedVal).getTime();
    }

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

    const selectedTicketsItems = [];
    const selectedTickets = useSelector(state => {
        for (const key in state.tickets.selectedTickets) {
            selectedTicketsItems.push({
                tickID: state.tickets.selectedTickets[key].id,
                passenger: state.tickets.selectedTickets[key].name,
                seatNo: state.tickets.selectedTickets[key].seatNo,
                fare: state.tickets.selectedTickets[key].fare,
                dFrom: state.tickets.selectedTickets[key].dFrom,
                dTo: state.tickets.selectedTickets[key].dTo,
            });  
        }
        // console.log('This is the Array', selectedTicketsItems)
        return selectedTicketsItems;
      });

    useEffect(() => {
        // setLoadModal(true);
        console.log(timeNow())
        setTimeout(() => {
            setLoading(false);
        }, 10000)
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setPayload(true);
        }, 10000)
    }, [])

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    useEffect(() => {
        dispatch(historyActions.fetchHistory(myUserPassID)).then(() => {
            setStarted(false);
        });
    },[dispatch])

    // console.log('My Booked Tickets', allTickets);

    return (
        <SafeAreaView style={styles.mainContainer}>
             <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
            <Grid>
                <Row size={100}>
                    <View style={styles.formDetailsBg}> 
                    
                        {/* THIS BLOCK START THE SECOND PHASE */}
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', marginVertical: 15,width: width - 20}}>
                            <Text style={{ justifyContent: 'flex-start',fontSize: 16, fontFamily: 'Montserrat-Regular', color: '#003c30'}}>({myBookedTickets.length > 0 && (myBookedTickets.length)} tickets found)</Text>
                            <Text style={{ alignSelf: 'flex-end'}}>
                                <Button color={selectedTicketsItems.length > 0 ? 'red' : '#fefefe'} mode="contained" onPress={() => {selectedTicketsItems.length > 0 ? setCancelModal(true) : setCancelModal(false)}}>
                                    <MaterialCommunityIcons name="text-box-check-outline" size={14} color="#FFF" />
                                        Cancel
                                </Button>              
                            </Text>
                        </View>

                        {started && (
                            <View style={styles.centeredBus}>
                                <FormDetail />
                            </View>
                        )}

                        {myBookedTickets.Message === "500_Internal_Server_Error" && (
                            <View>
                                <Image style={styles.errorRoute} source={require('../images/icons/searchTicket.png')} />
                                <Text style={styles.errorTextOne}>Hmm! We couldn't find any ticket.</Text>
                                <Text style={styles.errorTextTwo}>Buddy, you need a vacation.</Text>

                                <View style={{justifyContent: 'center', alignItems: 'center', width: width - 45, marginTop: 15}}>
                                    <Button color='#003c30' contentStyle={{height: 35, }} disabled={false} mode="contained"  onPress={() => {}}>
                                        Refresh
                                    </Button>
                                </View>
                            </View>
                        )}

                        {myBookedTickets.length < 1 && (
                            <View>
                                <Image style={styles.errorRoute} source={require('../images/icons/searchTicket.png')} />
                                <Text style={styles.errorTextOne}>Hmm! We couldn't find any ticket.</Text>
                                <Text style={styles.errorTextTwo}>Buddy, you need a vacation.</Text>

                                <View style={{justifyContent: 'center', alignItems: 'center', width: width - 45, marginTop: 15}}>
                                    <Button color='#003c30' contentStyle={{height: 35, }} disabled={false} mode="contained"  onPress={() => {}}>
                                        Refresh
                                    </Button>
                                </View>
                            </View>
                        )}

                        {myBookedTickets.length > 0 && (
                            <FlatList
                            data={myBookedTickets}
                            keyExtractor={(item) => item.TID}
                            renderItem={itemData => (
                                <View style={styles.form__background}>
                                        <ImageBackground source={require('../images/icons/history_background.png')} style={{width: '100%', height: '100%'}}>
                                        <View style={styles.history_centered}>
                                                <View style={styles.travellers__number__seats}>
                                                    <Text style={styles.journey__destination}>{itemData.item.FromStation} - {itemData.item.ToStation}</Text>
                                                    <View style={{marginLeft: - 140}}>
                                                        <Chip 
                                                        type="outlined"
                                                        icon="pen"
                                                        selectedColor="#003c30"
                                                        onPress={() => {setLoadModal(true)}}>Add a review</Chip>
                                                    </View>
                                                </View>

                                                <View style={styles.travellers__number__seats}>
                                                    <Text style={styles.grey__title}>Ticket ID</Text>
                                                    <Text style={styles.dark__title}>{itemData.item.TicketNo}</Text>
                                                </View>
                                                <View style={styles.travellers__number__seats}>
                                                    <Text style={styles.grey__title}>Booking Date</Text>
                                                    <Text style={styles.dark__title}>{itemData.item.EntyDate}</Text>
                                                </View>
                                                <View style={styles.travellers__number__seats}>
                                                    <Text style={styles.grey__title}>Travel Date</Text>
                                                    <Text style={styles.dark__title}>{itemData.item.TripDate}</Text>
                                                </View>

                                                <View style={{marginVertical: 10}}>
                                                    <Grid>
                                                        <Col>
                                                            <Text style={styles.dark__title}>Name</Text>
                                                        </Col>
                                                        <Col>
                                                            <Text style={[styles.dark__title, {alignSelf: 'center'}]}>Seat No.</Text>
                                                            
                                                        </Col>
                                                        <Col>
                                                            <Text style={[styles.dark__title, {alignSelf: 'center'}]}>Cancel</Text>
                                                            
                                                        </Col>
                                                    </Grid>
                                                </View>

                                                <View style={{marginTop: 20, height: 30}}>
                                                    <Grid>
                                                        <Col>
                                                            <Text style={styles.dark__title}>{itemData.item.TName}</Text>
                                                        </Col>
                                                        <Col>
                                                            
                                                            <Text style={[styles.dark__title, {alignSelf: 'center'}]}>{itemData.item.SeatNo}</Text>
                                                            
                                                        </Col>
                                                        <Col>
                                                            {itemData.item.CancelAllow === 'N' || itemData.item.IsCancel === 'Y' || formatMyDate(itemData.item.TripDate) < getTodayDate.getTime() ? (
                                                                <View style={{alignSelf: 'center'}}>
                                                                <Expired  />
                                                            </View>
                                                            ) : (
                                                                <View style={{alignSelf: 'center'}}>
                                                                <Checkbox ticketID={itemData.item.TID} seatNo={itemData.item.SeatNo} passenger={itemData.item.TName} fare={itemData.item.Fare} from={itemData.item.FromStation} to={itemData.item.ToStation} />
                                                            </View>
                                                            )}
                                                            
                                                        </Col>
                                                    </Grid>
                                                </View> 
                                            
                                        </View>
                                    </ImageBackground>
                                </View>
                            )}    
                        />
                        )}

                        

                        

                    {/* THIS IS WHERE THE MODAL START */}
                    <Modal transparent={false} animationType='slide' visible={loadCancelModal} onRequestClose={() => setCancelModal(false)}>
                     <SafeAreaView style={styles.modalContainer}>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, color: '#FFF', paddingVertical: 15, width: width, alignItems: 'center', backgroundColor: '#003c30'}}>
                                <View>
                                    <TouchableOpacity onPress={() => setCancelModal(false)}>
                                        <Ionicons name="arrow-back-sharp" size={24} color='#FFF' />
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{color: '#FFF', fontSize: 15, fontFamily: 'Montserrat-Regular',}}>Ticket Cancellation</Text>
                                </View>

                                <View>
                                    <Ionicons name="ios-close-circle-sharp" size={24} color='#003c30' />
                                </View>
                            </View>

                        <ScrollView>
                            <View style={{ paddingHorizontal: 20, paddingTop: 15, width: width}}>

                                <View style={{marginTop: 5, marginBottom: 35,}}>
                                    <Grid>
                                        <Col>
                                            <Text style={styles.dark__title}>Name</Text>
                                        </Col>
                                        <Col>
                                            <Text style={[styles.dark__title, {alignSelf: 'center'}]}>Seat No.</Text>
                                        </Col>
                                        <Col>
                                            <Text style={[styles.dark__title, {alignSelf: 'center'}]}>Fare</Text>
                                        </Col>
                                        <Col>
                                            <Text style={[styles.dark__title, {alignSelf: 'center'}]}>Cancellation Fee</Text>
                                        </Col>
                                        <Col>
                                            <Text style={[styles.dark__title, {alignSelf: 'center'}]}>Refund Amount</Text>
                                        </Col>
                                    </Grid>
                                </View>

                                <DataTable>
                                    
                                    {selectedTicketsItems.length > 0 && selectedTicketsItems.map((ticketItem, Tindex) => {
                                        return (
                                            <View key={Tindex} style={{marginTop: 10, height: 30}}>
                                                <Grid>
                                                    <Col>
                                                        <Text style={styles.dark__title}>{ticketItem.passenger}</Text>
                                                    </Col>
                                                    <Col>
                                                        
                                                        <Text style={[styles.dark__title, {alignSelf: 'center'}]}>{ticketItem.seatNo}</Text>
                                                        
                                                    </Col>
                                                    <Col>
                                                        <Text style={[styles.dark__title, {alignSelf: 'center'}]}>{ticketItem.fare}.00</Text>
                                                    </Col>
                                                    <Col>
                                                        
                                                        <Text style={[styles.dark__title, {alignSelf: 'center'}]}>15.00</Text>
                                                        
                                                    </Col>
                                                    <Col>
                                                        <Text style={[styles.dark__title, {alignSelf: 'center'}]}>{ticketItem.fare - 15}.00</Text>
                                                    </Col>
                                                </Grid>
                                                <Text style={{display: 'none'}}>
                                                    {sumTotal += parseInt(ticketItem.fare - 15)}
                                                    {sumBeforeTotal += parseInt(ticketItem.fare)}
                                                    {deductionTotal += parseInt(15)}
                                                </Text>
                                            </View> 
                                            
                                        );
                                    })}
                               
                                </DataTable>
                                {/* // MAKE THE CALCULATION HERE */}
                                <View style={{marginTop: 25}}>
                                    <Text style={{fontSize: 12, color:'#000', fontFamily: 'Montserrat-Regular'}}>
                                    <Text style={{fontSize: 12, color:'#000', fontFamily: 'Montserrat-SemiBold'}}>GH₵ {sumBeforeTotal}.00 </Text>
                                    - 
                                    <Text style={{fontSize: 12, color:'#000', fontFamily: 'Montserrat-SemiBold'}}> GH₵ {deductionTotal}.00  </Text>
                                     = <Text style={{fontSize: 12, color:'#000', fontFamily: 'Montserrat-SemiBold'}}> GH₵ {sumTotal}.00 </Text></Text>
                                </View>

                                 <View style={{marginTop: 25}}>
                                    <Text style={{fontSize: 12, color:'#000', fontFamily: 'Montserrat-Regular'}}>There will be an Online Transaction Charge at the rate of <Text style={{fontSize: 13, color:'#000', fontFamily: 'Montserrat-SemiBold'}}>(1.1%)</Text></Text>
                                </View>

                                <View style={{marginTop: 25}}>
                                    <Text style={{fontSize: 12, color:'#000', fontFamily: 'Montserrat-Medium'}}>After cancellation, your refund will be sent to your account within 24 Hours (one working day).</Text>
                                </View>

                                <View style={{ marginTop: 20,}}>
                                    <Button color={'red'} mode="contained" onPress={() => {}}>
                                        Confirm Cancellation
                                    </Button>
                                </View>

                            </View>

                        </ScrollView>
                            
                       </View>

                    </SafeAreaView>
                </Modal>

                {/* THIS BLOCK IS FOR ADDING A REVIEW */}
                    <Modal transparent={true} animationType='slide' visible={loadModal} onRequestClose={() => setLoadModal(false)}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'}}>
                            <View style={{backgroundColor: '#FFF',width: '85%',height: '65%', borderTopLeftRadius: 10,borderTopRightRadius: 10,}}>
                            <ScrollView>
                                <LinearGradient colors={['#003c30',  '#003c30', '#003c30']} style={styles.modalLinearGradient}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalTopHeading}>Rate this app</Text>
                                        <Text style={styles.modalCancel}>
                                        <TouchableOpacity onPress={() => setLoadModal(false)}><AntDesign name="closecircleo" size={18} color="#FFF" /></TouchableOpacity>
                                        </Text>
                                    </View>

                                    <Text style={styles.reviewQues}>How would you rate your STC experience?</Text>  
                                </LinearGradient>
                                
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible","Bad","Good","Very Good","Excellent"]}
                                    defaultRating={4}
                                    size={30}
                                    onFinishRating={ratingCompleted}
                                    />

                                    <View style={styles.form__input__container}>
                                            <TextInput style={styles.text__input} 
                                            theme={{ colors: { primary: '#dedede',underlineColor:'transparent'}}} 
                                            mode="outlined" selectionColor="#dedede" 
                                            underlineColor="#dedede" outlineColor="grey" 
                                            label="Describe your experience" 
                                            maxLength={150}
                                            value={message}
                                            // onBlur={handleBlur('kinName')}
                                            placeholder="Describe your experience..." 
                                            multiline={true}
                                            onChangeText={message => setMessage(message)}
                                            />
                                    </View>

                                    <View style={styles.submit__button}>
                                        <Button color={(message ? '#003c30' : '#dedede')} mode="contained" onPress={() => {}}>
                                            SUBMIT
                                        </Button>
                                    </View>

                                </ScrollView>
                            </View>
                        </View>
                    </Modal>


                    </View>
                </Row>
            </Grid>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: width,
        backgroundColor: '#FFF',
    },
    modalContainer: {
        flex: 1,
    },
    headerContainer: {
        height: '20%',
        width: width,
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 30,
    },
    drawerBarsIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginLeft: 25,
        marginRight: 40,
        borderRadius: 20,
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
        marginLeft: 15
    },
    formDetailsBg: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // marginTop: 10,
        alignItems: 'center',
    },
    form__background: {
        backgroundColor: '#FFF',
        width: '100%',
        height: 200,
        // height: '50%',
        // height: 'auto',
        borderRadius: 15,
        // paddingHorizontal: 15, 
        // paddingVertical: 20,
        flexDirection: 'column',
        overflow: 'scroll',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5
    },
    history_centered: {
        paddingHorizontal: 10, 
        paddingVertical: 15,
    },
    form__background__fare: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 130,
        borderRadius: 15,
        paddingHorizontal: 15, 
        paddingVertical: 20,
        flexDirection: 'column',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5
    },
    journey__destination: {
        marginBottom: 10,
        width: '100%',
        // backgroundColor: '#003c30',
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        color: '#003c30',  
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    journey__destination2: {
        marginTop: 15,
        width: '100%',
        fontFamily: 'Montserrat-Medium',
    },
    travellers__number__seats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    journey__date: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 11,
        color: '#9c9c9c', 
        marginBottom: 5,
    },
    grey__title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: '#9c9c9c', 
        // marginBottom: 5,
    },
    dark__title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: '#000', 
        // marginBottom: 5,
    },
    submit__button: {
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    signIn: {
        width: width - 55,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }, 
    modalLinearGradient: {
        height: 160,
        borderWidth: 1,
        borderColor: 'silver',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    modalCancel: {
        position: 'absolute',
        right: 0,
        marginRight: 10,
    },
    reviewQues: {
        marginVertical: 15,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#fff',  
        textAlign: 'center'
    },
    form__input__container: {
        marginHorizontal: 10,
        marginVertical: 15
    },
    modalTopHeading: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 17,
        color: '#003c30', 
    },
    scrollView: {
        height: 40,
        overflow: 'scroll'
    },
    centeredBus: {
        // width: width - 25,
        height: 400,
        marginBottom: 150,
        justifyContent: 'center',
        alignItems: 'center'
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

export default BookingHistoryScreen
