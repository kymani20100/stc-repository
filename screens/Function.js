import React from 'react'
import {useSelector, useDispatch, useCallback } from 'react-redux';
import * as busActions from '../store/actions/buses';
import { emptyBooking } from '../store/actions/booking';

const dispatch = useDispatch();

const RestartBucketHandler = useCallback(() => {
    dispatch(emptyBooking());
    navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
        });
}, [dispatch]);

export const backAction = () => {
    Alert.alert("Hold On Buddy!!!", "Are you sure you wanna go back?", [
    {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
    },
    { text: "YES", onPress: () => RestartBucketHandler() }
    ]);
    return true;
};

