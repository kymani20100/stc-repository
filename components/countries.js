import React, {useState, useRef, useEffect} from 'react'
import { View, SafeAreaView, RefreshControl, StatusBar, Vibration, Text, TouchableOpacity, Modal, FlatList, StyleSheet, ImageBackground, Dimensions,Image, Animated,} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
// import { SearchBar } from 'react-native-elements';
import { Searchbar, Button, TouchableRipple } from 'react-native-paper';
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from 'react-redux';
import * as countriesActions from '../store/actions/countries';
import { Audio } from 'expo-av';
// import { NavigationActions, StackActions } from 'react-navigation';

import SelectShimmer from "./SelectShimmer";
const width_proportion = '95%';
const height_proportion = '70%';

const { width, height } = Dimensions.get('screen');

const SPACING = 5;
const AVATAR_SIZE = 15;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Countries = ({onChangeSelect, text, }) => {
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [txt, setText] = useState(text);
    const [filteredData, setFilteredData] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [sound, setSound] = useState();

    const [started, setStarted] = useState(true);
    // SEARCH QUERY
    const [searchQuery, setSearchQuery] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const routes = useSelector(state =>  state.countries.availableCountries);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 8000)
    },[])

    useEffect(() => {

        dispatch(countriesActions.fetchCountries()).then(() => {
            setStarted(false);
        });

        // dispatch(countriesActions.fetchCountries());

    },[dispatch])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setStarted(true);
        wait(2000).then(() => setRefreshing(false));
        dispatch(countriesActions.fetchCountries()).then(() => {
            setStarted(false);
        });
      }, []);

    useEffect(() => {
        setFilteredData(routes.SearchDetail);
        setRawData(routes.SearchDetail);
    },[routes])

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('../images/sounds/click.wav')
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
    

    const searchFilter = (text) => {
        if(text) {
            const newData  = rawData.filter((item) => {
                const itemData = item.Nm ?
                                 item.Nm.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearchQuery(text);
        }else{
            setFilteredData(rawData);
            setSearchQuery(text);
        }
    }

    const BusFooter = () => {
        return  <View style={styles.footer__bottom}>
            
        </View>
    }

    // var audio = new Audio('');

     console.log('filtered data',routes.Message)
    
    return (
        <View>
            <StatusBar barStyle="light-content" backgroundColor="#004E3E" />
           <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                <Text style={styles.txt} numberOfLines={1}>{txt}</Text>
           </TouchableOpacity>

           <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        {/* THIS BLOCK IS THE MODAL */}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="arrow-back-sharp" size={28} color="#FFFFFF" />
                        </TouchableOpacity>

                        <View>
                            <Searchbar
                                placeholder="Search"
                                onChangeText={(text) => searchFilter(text)}
                                value={searchQuery}
                                style={styles.searchBarStyle}
                                />
                        </View>
                    </View>

                    {started && <SelectShimmer />}
                    {routes.Message === '500_Internal_Server_Error' && (
                        <View>
                            <Image style={styles.errorRoute} source={require('../images/icons/route.png')} />
                            <Text style={styles.errorTextOne}>There seems to be an error</Text>

                            <View style={{justifyContent: 'center', alignItems: 'center', width: width - 45, marginTop: 15}}>
                                <Button color='#003c30' contentStyle={{height: 35, }} disabled={false} mode="contained"  onPress={onRefresh}>
                                    Refresh
                                </Button>
                            </View>
                        </View>
                    )}

                    {routes.Message === 'An error has occurred.' && (
                        <View>
                            <Image style={styles.errorRoute} source={require('../images/icons/route.png')} />
                            <Text style={styles.errorTextOne}>There seems to be an error</Text>

                            <View style={{justifyContent: 'center', alignItems: 'center', width: width - 45, marginTop: 15}}>
                                <Button color='#003c30' contentStyle={{height: 35, }} disabled={false} mode="contained"  onPress={onRefresh}>
                                    Refresh
                                </Button>
                            </View>
                        </View>
                    )}
                    {routes.Message === 'Record Found.' && (
                        <Animated.FlatList 
                        data={filteredData} keyExtractor={item => item.ID} 
                        ListEmptyComponent={ <SelectShimmer />}
                        contentContainerStyle = {{paddingVertical:15,}}
                        refreshControl={
                            <RefreshControl
                              refreshing={refreshing}
                              onRefresh={onRefresh}
                            />
                          }
                        ListFooterComponent={<BusFooter />}
                        renderItem={itemData => (
                            <TouchableOpacity activeOpacity={.7} key={itemData.item.ID} >
                  
                                <Animated.View>
                                    <TouchableRipple
                                    style={styles.modalItemStyle}
                                            onPress={() => {
                                            // VIBRATE TO CALL ATTENTION
                                            Vibration.vibrate(10 * 40);
                                            onChangeSelect(itemData.item.Nm)
                                            setText(itemData.item.Nm)
                                            setModalVisible(false)
                                            }}
                                            rippleColor="rgba(0, 0, 0, .32)">
                                        <Text style={styles.modalTextItem}>{itemData.item.Nm}</Text>
                                    </TouchableRipple>
                                </Animated.View>
                            </TouchableOpacity>
                        )}
                    />
                    )}
                    
                </SafeAreaView>

           </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingBottom: 5,
        width: width
    },
    txt: {
        color: '#003c30',
        fontSize: 16,
    },
    modalItemStyle:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        marginBottom: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        shadowColor: "#8d8d8d",
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: .4,
        shadowRadius: 2,
        elevation: 2, 
    },
    modalTextItem: {
        color: '#003c30',
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        
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
    modalCancel: {
        fontSize: 14,
        color: '#003c30',
        fontFamily: 'Montserrat-SemiBold',
    },
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 10,
    },
    optionTxt: {
        fontSize: 18,
        color: '#555'
    },
    searchBarStyle: {
        width: width - 50,
        height: 40,
    },
    footer__bottom: {
        height: 60,
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
        fontFamily: 'Montserrat-Medium',
    }
});

export default Countries
