import Travellers from '../../models/travellers';
import { TOGGLE_PASSENGER, EMPTY_PASSENGER} from '../actions/passenger';

const initialState = {
    Totalpassengers: {},
    total: 0,
};

const passengerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_PASSENGER: 
            const addedPassenger = action.action.passenger;
            // console.log('From Passenger',action.fullname);
            console.log('From Passenger',action.passenger);

            const passengerName = action.passenger.fullname;
            const passengerGender = action.passenger.gender;
            const passengerId = action.passenger.idNumber;
            const passengerIdType = action.passenger.idType;
            const passengerSeatNo = action.passenger.seatNo;
            const passengerDOB = action.passenger.dob;
            const passengerNationality = action.passenger.nationality;
            const passengerAge = action.passenger.age;

            // new Travellers(passengerName, passengerGender, passengerAge, passengerSeatNo, passengerIdType, passengerId, passengerDOB, passengerNationality);

            // let updatedSeatItem;
            let updatedSeatItem = new Travellers(passengerName, passengerGender, passengerAge, passengerSeatNo, passengerIdType, passengerId, passengerDOB, passengerNationality);
                return {...state, Totalpassengers: { ...state.Totalpassengers, [addedPassenger.seatNo]: updatedSeatItem }};
            // if (state.Totalpassengers[addedPassenger.seatNo]) {
            //     const selectedPassenger = state.Totalpassengers[addedPassenger.seatNo];
            //     updatedSeatItem = { ...state.Totalpassengers };
            //     delete updatedSeatItem[passengerSeatNo];
            //     return {...state, Totalpassengers: updatedSeatItem};
            //     // console.log('Found one');
            // }else{
            //     // console.log('Adding one');
            //     updatedSeatItem = new Travellers(passengerName, passengerGender, passengerAge, passengerSeatNo, passengerIdType, passengerId, passengerDOB, passengerNationality);
            //     return {...state, Totalpassengers: { ...state.Totalpassengers, [addedPassenger.seatNo]: updatedSeatItem }};
            // }
        case EMPTY_PASSENGER: 
            return { ...state, Totalpassengers: {}}
                  
        default: 
            return state;
    }
}

export default passengerReducer;