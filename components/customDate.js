import React, {useState, useRef, useEffect} from 'react'
import { View, SafeAreaView, StatusBar,Text, TouchableOpacity,Modal, FlatList, StyleSheet, Button, Dimensions,Image, Animated, Platform} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDate = (props) => {
    const {textStyle, defaultDate} = props;
    const [date, setDate] = useState(moment(defaultDate));
    const [show, setShow] = useState(false);

    const onChange = (e, selectedDate) => {
        setDate(moment(selectedDate));
    }

    const onCancelPress = () => {
        setDate(moment(defaultDate));
        setShow(false);
    }

    const onDonePress = () => {
        props.onDateChange(date);
        setShow(false);
    }

    const onAndroidChange = (e, selectedDate) => {
        setShow(false);
        if(selectedDate){
             setDate(moment(selectedDate));
            props.onDateChange(selectedDate)
        }
    }

    const RenderDatePicker = () => {
        return (
            <DateTimePicker
                timeZoneOffsetInMinutes={0}
                value={new Date(date)}
                mode="date"
                minimumDate={new Date(moment().subtract(120,'years').format('YYYY-MM-DD'))}
                maximumDate={new Date(moment().format("YYYY-MM-DD"))}
                onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
            />
        );
    }

    return (
       
        <TouchableOpacity activeOpacity={0} onPress={() => setShow(true)}>
            <View>
                <Text style={textStyle}>{date.format('MMMM Do, YYYY')}</Text>
                {Platform.OS !== 'ios' &&  show && RenderDatePicker()}
                
                {Platform.OS == 'ios' && ( 
                <Modal transparent={true} animationType='slide' visible={show} supportedOrientations={['portrait']} onRequestClose={() => setShow(false)}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity activeOpacity={.7} visible={show} onPress={() => setShow(false)} style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row'}}>
                            <TouchableOpacity activeOpacity={.7} underlayColor={'#FFF'} style={{flex: 1, borderTopColor: '#E9E9E9', borderTopWidth: 1}} onPress={() => console.log('Clicked')}>
                                <View style={{backgroundColor: '#FFF', height: 256, overflow: 'hidden'}}>
                                    <View style={{marginTop: 20}}>
                                        {RenderDatePicker()}
                                    </View>

                                    <TouchableOpacity 
                                    underlayColor={'transparent'} 
                                    onPress={onCancelPress} 
                                    style={[styles.btnText, styles.btnCancel]}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                    underlayColor={'transparent'} 
                                    onPress={onDonePress} 
                                    style={[styles.btnText, styles.btnDone]}>
                                        <Text>Done</Text>
                                    </TouchableOpacity>

                                </View>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </Modal>
                )}
            </View>
        </TouchableOpacity>
        
    );
}

CustomDate.defaultProps = {
    textStyle: {},
    defaultDate: moment(),
    onDateChange: () => {},
}

const styles = StyleSheet.create({
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCancel: {
        left: 0,
    },
    btnDone: {
        right: 0,
    }
})

export default CustomDate;