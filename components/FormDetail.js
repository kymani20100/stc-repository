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


const FormDetail = () => (
    <>
         <View style={styles.drawerBarsIcon}>
            <Placeholder Animation={ShineOverlay}>
                <PlaceholderLine style={{ borderRadius: 15}}  width={98} height={130} />
            </Placeholder>
        </View>
         <View style={styles.drawerBarsIcon2}>
            <Placeholder Animation={ShineOverlay}>
                <PlaceholderLine style={{ borderRadius: 15}} width={98} height={130} />
            </Placeholder>
        </View>     
    </>
  );

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
        flex: 1,
        alignItems: 'center', 
        marginBottom: 10, 
        marginHorizontal: 7,
    },
    drawerBarsIcon2: {
        flex: 1,
        alignItems: 'center', 
        marginTop: -130, 
        marginHorizontal: 7,
    }
})

  export default FormDetail;
