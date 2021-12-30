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


const SelectShimmer = () => (
    <SafeAreaView style={{marginTop: 20, paddingHorizontal: 10}}>
            <View>
                    <Placeholder Animation={ShineOverlay}>
                        <PlaceholderLine style={{ marginTop: -10, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                    </Placeholder>
            </View>


    </SafeAreaView>
   
  );

  const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#003c30',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: 35, 
        paddingVertical: 15,
    },
    drawerBarsIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginLeft: 10,
        marginRight: 40,
        
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        // fontFamily: 'Montserrat-Regular',
        marginLeft: 20,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },

})

  export default SelectShimmer;
