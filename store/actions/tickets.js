import SeatItem from '../../models/seat-item';
import {EMPTY_BUCKET, FETCH_SEATS } from '../actions/seats';

const initialState = {
    bookedSeats: {},
};

const seatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPTY_BUCKET: 
            return { ...state, bookedSeats: [] }
        case FETCH_SEATS:
            return {
                seats: action.seats
            };
        default: 
            return state;
    }
}

export default seatsReducer;