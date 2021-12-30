import React, {useState, useRef, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Platform, ImageBackground, Dimensions, Image, ScrollView,FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import * as currencyActions from '../store/actions/currency';
import SelectShimmer from "../components/SelectShimmer";
import { Button, TextInput, Chip } from 'react-native-paper';
import { Row, Grid } from "react-native-easy-grid";
import { Audio } from 'expo-av';

const ChangeCurrencyScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [sound, setSound] = useState();
    const currency = useSelector(state =>  state.currency.availableCurrency);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currencyActions.fetchCurrency());
    },[dispatch])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 8000)
    },[])

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

    // console.log('Here',currency)

    return (
        <SafeAreaView style={styles.mainContainer}>
         <Grid>
               
                <Row size={100}>
                 <View style={styles.formDetailsBg}>

                <View>
                    {loading === true ? (
                        <Text>Loading...</Text>
                    ) : (
                        <FlatList 
                            data={currency} keyExtractor={item => item.id} 
                            renderItem={itemData => (
                                <Chip 
                                    type="flat"
                                    icon="check"
                                    textStyle={{color: '#FFF'}}
                                    style={{paddingVertical: 5, marginBottom: 15, borderRadius: 5, width: width - 35, backgroundColor: '#003c30'}}
                                    onPress={() => console.log('Pressed')}>
                                        {itemData.item.currency.toUpperCase()}
                                </Chip>
                            )} />

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
        backgroundColor: '#003c30',
    },
    headerContainer: {
        // justifyContent: 'space-between',
        height: 150,
    },
    headerFloat: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 35,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 10,
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
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 20,
        paddingHorizontal: 10,
        // marginTop: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
    currency__style: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        marginBottom: 15,
        color: '#000',
        borderRadius: 5,
        width: width - 85,
        // width: '100%',
        paddingVertical: 5,
        height: 50,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    currency__init: {
        backgroundColor: '#003c30',
        color: '#fff',
        height: 50,
        width: 60,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
    },
    currency__value: {
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: '#003c30'
    }
})

export default ChangeCurrencyScreen
