
export const FETCH_RESPONSE = 'FETCH_RESPONSE';

export const insertBookingData = (load) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch('http://67.222.135.25:8024/api/SeatBook/API_TicketBooking', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "APITocken": 'B281BA92-288F-4D5D-9D14-9482E0A960AB',
            "APPType": 'MOB'
          },
          body: JSON.stringify(load)
      })
      const resData = await response.json();
      // console.log('Passenger from the inside', PassengerList);
      
      dispatch({ type: FETCH_RESPONSE, payload: resData });
    }
}
