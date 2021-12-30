import React, {useState, useRef} from 'react'
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

const width_proportion = '95%';
const height_proportion = '70%';

const { width, height } = Dimensions.get('screen');
import faker from 'faker'

faker.seed(10);
const DATA = ['Male', 'Female'];

const SPACING = 5;
const AVATAR_SIZE = 15;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Gender = ({onChangeSelect, text}) => {
    const [txt, setText] = useState(text);
    const [modalVisible, setModalVisible] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    
    return (
        <View>
           <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                <Text style={styles.txt} numberOfLines={1}>{txt}</Text>

                <Text style={styles.txt}>Hello</Text>
           </TouchableOpacity>

           <Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        {/* THIS BLOCK IS THE MODAL */}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="arrow-back-sharp" size={28} color="#003c30" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Select Your Gender</Text>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Cancel</Text>
                        </TouchableOpacity>
                        {/* THIS BLOCK IS THE MODAL */}
                    </View>

                    {/* THIS BLOCK IS WHERE THE FLATLIST COMES IN */}

                    <Animated.FlatList 
                        data={DATA} keyExtractor={item => item} 
                        onScroll={Animated.event(
                            [{ nativeEvent: {contentOffset: {y: scrollY}}}],
                            {useNativeDriver: true}
                        )}
                        contentContainerStyle={{
                            padding: SPACING,
                            paddingTop: StatusBar.currentHeight || 42
                        }}
                        renderItem={({item, index}) => {
                           

                            return (
                                <TouchableOpacity onPress={() => {
                                    onChangeSelect(item)
                                    setText(item)
                                    setModalVisible(false)
                                    }}>

                                    <Animated.View style={styles.modalItemStyle}>
                                        <View>
                                            <Text style={styles.modalTextItem}>{item}</Text>
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

export default Gender;
