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


const BookCardPlaceholderComponent = () => (
    <SafeAreaView style={{marginTop: 40, paddingHorizontal: 10}}>
         <View style={styles.headerContainer}>
               

                
            </View>

            <View style={{marginTop: 50,}}>
                    <Placeholder Animation={ShineOverlay}>
                    {/* <PlaceholderMedia width={30} height={30} /> */}
                        <PlaceholderLine style={{ marginTop: -10, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                        <PlaceholderLine style={{ marginTop: -30, borderRadius: 5}} width={100} height={50} />
                    </Placeholder>
            </View>


            <View style={{marginTop: 15,}}>
                    <Placeholder Animation={ShineOverlay}>
                        <PlaceholderLine style={{borderRadius: 5}} width={100} height={50} />
                    </Placeholder>
            </View>
    </SafeAreaView>
    // <Placeholder
    //   Animation={ShineOverlay}
    //   style={{
    //     marginVertical: 6,
    //     marginHorizontal: 15,
    //     borderRadius: 4
    //   }}
    //   Left={props => (
    //     <PlaceholderMedia
    //       style={[
    //         props.style,
    //         {
    //           width: responsiveWidth(22),
    //           height: responsiveHeight(16)
    //         }
    //       ]}
    //     />
    //   )}
    // >
    //   <PlaceholderLine style={{ marginTop: responsiveHeight(1) }} width={70} />
    //   <PlaceholderLine style={{ marginTop: responsiveHeight(1.5) }} width={50} />
    //   <PlaceholderLine width={50} />
    // </Placeholder>
   
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

  export default BookCardPlaceholderComponent;
