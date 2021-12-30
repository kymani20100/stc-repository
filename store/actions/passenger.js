export const TOGGLE_PASSENGER = 'TOGGLE_PASSENGER';
export const EMPTY_PASSENGER = 'EMPTY_PASSENGER';

export const togglePassenger = (passenger) => {
    return {type: TOGGLE_PASSENGER, passenger: passenger};
};

export const emptyPassenger = () => {
    return {type: EMPTY_PASSENGER};
}


