import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, Text, View, Button, Dimensions,KeyboardAvoidingView, BackHandler, SafeAreaView, ImageBackground } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


const OTP = ({navigation}) => {
    let textInput = useRef(null);
    const lengthInput = 6;
    let clockCall = null;
      const defaultCountdown = 30;
    const [internalVal, setInternalVal] = useState('');
    const [countdown, setCountdown] = useState(defaultCountdown);
     const [enableResend, setEnableResend] = useState(false);

    const onChangeText = (val) => {
        setInternalVal(val)
        if(val.length === lengthInput){
            navigation.navigate('SignUpForm')
        }
    }

    const backAction = () => {
        BackHandler.exitApp();
    };
   
    

     useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000)
        return () => {
            clearInterval(clockCall)
        }
    })

    const decrementClock= () => {
        if(countdown === 0){
            setEnableResend(true)
            setCountdown(0)
            clearInterval(clockCall)
        }else{
            setCountdown(countdown - 1);
        }
       
    }

    const onChangeNumber = () => {
        setInternalVal('')
    }

    const onResendOTP = () => {
        if(enableResend){
            setCountdown(defaultCountdown)
            setEnableResend(false)
            clearInterval(clockCall)
            this.clockCall = setInterval(() => {
                decrementClock()
            }, 1000)
        }
    }

     useEffect(() => {
        textInput.focus()
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
                <ImageBackground source={require('../images/icons/banner.png')} style={{width: '100%', height: 200}}>
                    <View style={styles.headerFloat}>
                        <View style={styles.drawerBarsIcon}>
                            <Ionicons name="arrow-back-outline" size={24} color='#003c30' onPress={() => navigation.goBack()} />
                            {/* <FontAwesome name="bars" size={24} color='#003c30' onPress={() => navigation.goBack()} /> */}
                        </View>

                        <View>
                            <Text style={styles.headerTitle}>OTP VERIFY</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
           

            <View style={styles.formDetailsBg}>

            <KeyboardAvoidingView
            keyboardVerticalOffset={20}
            behavior={'padding'}
            style={styles.containerAvoidingView}
            >

                <Text style={styles.textTile}>
                    {"Waiting to automatically detect an SMS sent to "}
                </Text>
                <View style={styles.textFloatHeader}>
                    <Text style={styles.textTilePrimary}>
                        {"+233 548187719."}
                    </Text>
                    <Text style={styles.textTileSecondary}>
                    {"Wrong number?"}
                </Text>
                </View>
                

                <View>
                    <TextInput 
                        ref={(input) => textInput = input}
                        onChangeText={onChangeText}
                        style={{width: 0, height: 0}}
                        value={internalVal}
                        maxLength={lengthInput}
                        returnKeyType="done"
                        keyboardType="numeric"
                    />
                    <View style={styles.containerInput}>
                     {
                                    Array(lengthInput).fill().map((data, index) => (
                                       <View key={index} style={[styles.cellView, {
                                           borderBottomColor: index === internalVal.length ? 'red' : '#003c30'
                                       }]}>
                                            <Text style={styles.cellText} onPress={() => textInput.focus()}>
                                            {internalVal && internalVal.length > 0 ? internalVal[index] : ''}
                                            </Text>
                                        </View>
                                    ))
                                }
                        
                    </View>
                </View>

                </KeyboardAvoidingView>
            </View>

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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
    
    containerAvoidingView: {
        flex: 1, 
        alignItems: 'center',
        padding: 10
    },
    textTile: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    },
     containerInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    cellView: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        // backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16
    }, 
    bottomView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 50,
        alignItems: 'center'
    },
    btnChangeNumber: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    // textChange: {
    //     color: '#234DB7',
    //     alignItems: 'center'
    // },
    btnResend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textFloatHeader: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center' 
    },
    textTilePrimary: {
        marginTop: 10,
        marginBottom: 5,
        marginRight: 15,
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
    },
    textTileSecondary: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        color: '#04f071'
    }
    // textResend: {
    //     color: '#234DB7',
    //     alignItems: 'center'
    // }
})

export default OTP
