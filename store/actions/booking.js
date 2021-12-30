export const TOGGLE_SEATS = 'TOGGLE_SEATS';
export const EMPTY_BOOKING = 'EMPTY_BOOKING';

export const toggleSeats = (seat) => {
    return {type: TOGGLE_SEATS, seat: seat};
};

export const emptyBooking = () => {
    return {type: EMPTY_BOOKING};
}


