import React, {useState, useRef, useEffect} from 'react'
import { View, 
        SafeAreaView, 
        StatusBar,
        Text, 
        TouchableOpacity,
        Modal, 
        FlatList, 
        StyleSheet,
        Button, 
        Dimensions,
        Image,
        Animated, 
        Easing,
        SafeAreaViewBase,
        } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from 'react-redux';
import * as countriesActions from '../store/actions/countries';
import SelectShimmer from "./SelectShimmer";

const width_proportion = '95%';
const height_proportion = '70%';

const { width, height } = Dimensions.get('screen');
import faker from 'faker'

// faker.seed(10);
// const DATA = [...Array(60).keys()].map((_, i) => {
// return {
//     key: faker.datatype.uuid(),
//     name: faker.address.country(),
// };
// });

const SPACING = 5;
const AVATAR_SIZE = 15;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Countries = ({onChangeSelect, text}) => {

    const [loading, setLoading] = useState(true);
    const DATA = useSelector(state =>  state.countries.availableCountries);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(countriesActions.fetchCountries());
    },[dispatch])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 8000)
    },[])

    const [txt, setText] = useState(text);
    const [modalVisible, setModalVisible] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    
    return (
        <View>
           <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                <Text style={styles.txt} numberOfLines={1}>{txt}</Text>
           </TouchableOpacity>

           <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        {/* THIS BLOCK IS THE MODAL */}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="arrow-back-sharp" size={28} color="#003c30" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Country</Text>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Cancel</Text>
                        </TouchableOpacity>
                        {/* THIS BLOCK IS THE MODAL */}
                    </View>

                    {/* THIS BLOCK IS WHERE THE FLATLIST COMES IN */}

                    <Animated.FlatList 
                        data={DATA} keyExtractor={item => item.id} 
                        onScroll={Animated.event(
                            [{ nativeEvent: {contentOffset: {y: scrollY}}}],
                            {useNativeDriver: true}
                        )}
                        contentContainerStyle={{
                            padding: SPACING,
                            paddingTop: StatusBar.currentHeight || 42
                        }}
                        renderItem={({item, index}) => {
                            const inputRange = [
                                -1,
                                0,
                                ITEM_SIZE * index,
                                ITEM_SIZE * (index + 2)
                            ]
                            const opacityInputRange = [
                                -1,
                                0,
                                ITEM_SIZE * index,
                                ITEM_SIZE * (index + 1)
                            ]
                            const scale = scrollY.interpolate({
                                inputRange,
                                outputRange: [1,1,1,0]
                            })
                            const opacity = scrollY.interpolate({
                                inputRange: opacityInputRange,
                                outputRange: [1,1,1,0]
                            })


                            return (
                                <TouchableOpacity onPress={() => {
                                    onChangeSelect(item.name)
                                    setText(item.name)
                                    setModalVisible(false)
                                    }}>

                                    <Animated.View style={styles.modalItemStyle}>
                                      
                                        <View>
                                            <Text style={styles.modalTextItem}>{item.name}</Text>
                                        </View>
                                    </Animated.View>
                                </TouchableOpacity>
                            );
                        }}
                    />
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
        color: '#CCC',
        fontSize: 14,
    },
    modalItemStyle:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        marginBottom: 10,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 2, 
    },
    modalTextItem: {
        color: '#003c30',
        fontSize: 18,
        fontFamily: 'Montserrat-Medium'
    },
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingVertical: 15,
        backgroundColor: '#F2F2F2',
    },
    modalTitle: {
        fontSize: 18,
        color: '#003c30',
        fontFamily: 'Montserrat-ExtraBold',
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
    }
});

export default Countries;
