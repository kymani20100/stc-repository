import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
  return (
    <View key={props.index}>
        <Text style={styles.container}> {props.seatNo},</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      color: '#000',
  }
});

export default CartItem;
