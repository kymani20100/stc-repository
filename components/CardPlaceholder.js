import React from 'react'
import { View, Text, SafeAreaView, StyleSheet} from 'react-native'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    Shine,
  ShineOverlay,
  } from "rn-placeholder";


const FormDetail = ({props}) => {
    console.log(props);
   return <View>
    {props.isVisible === true && (
         <View style={styles.drawerBarsIcon}>
            <Placeholder Animation={ShineOverlay}>
                <PlaceholderLine width={50} height={50} />
            </Placeholder>
        </View>  
        )}

        {props.isVisible === false && (
         <View style={styles.blank_space}>

                    </View> 
        )}

    </View>
};

  const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#003c30',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingVertical: 15,
    },
    drawerBarsIcon: {
        width: 60,
        height: 60,
       marginHorizontal: 5,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blank_space: {
        height: 35,
        width: 35,
    },
    drawerBarsIcon2: {
        flex: 1,
        alignItems: 'center', 
        marginTop: -265, 
    }
})

  export default FormDetail;
