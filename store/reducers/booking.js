import SeatItem from '../../models/seat-item';
import { TOGGLE_SEATS, EMPTY_BOOKING} from '../actions/booking';

const initialState = {
    bookedSeats: {},
    total: 0,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SEATS: 
            const addedSeat = action.seat;
            const sId = addedSeat.id;
            const seatIdNo = addedSeat.seatNo;
            const seatPrice = addedSeat.price;

             console.log('Booking From Within', action.seat)

            let updatedSeatItem;
            if (state.bookedSeats[addedSeat.id]) {
                const selectedSeatItem = state.bookedSeats[sId];
                updatedSeatItem = { ...state.bookedSeats };
                delete updatedSeatItem[sId];
                return {...state, bookedSeats: updatedSeatItem, total: state.total -= +seatPrice};
            }else{
                updatedSeatItem = new SeatItem(sId, seatIdNo, seatPrice);
                return {...state, bookedSeats: { ...state.bookedSeats, [addedSeat.id]: updatedSeatItem },total: state.total += +seatPrice};
            }
        case EMPTY_BOOKING: 
            return { ...state, bookedSeats: {}, total: 0 }
                  
        default: 
            return state;
    }
}

export default bookingReducer;