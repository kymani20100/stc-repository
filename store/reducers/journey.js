
export const FETCH_RESPONSE = 'FETCH_RESPONSE';

export const insertBookingData = (token,userID,tripID,travelDate,from,to,fare,MobileNo,KinName,passengers) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch('http://67.222.135.25:8024/api/SeatBook/API_TicketBooking', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "APITocken": token,
            "APPType": 'MOB'
          },
          body: JSON.stringify({
              ChanelType: 'Mob', 
              BookbyType: 'U', 
              UserID: userID, 
              BookingLocation: '1',  
              TripID: tripID, 
              TravelDate: travelDate,  
              PayMode: 'ONLINE', 
              FromLocation: from,  
              ToLocation: to, 
              CurrencyID: '4', 
              Fare: fare, 
              MobileNo: MobileNo, 
              EmailID: '', 
              KinName: KinName, 
              KinContact: KinContact,  
              FreeBillIDNo: '155231',  
              PassengerList: passengers
        })
      })
      const resData = await response.json();
      console.log('Return Data',resData);
      
      dispatch({ type: FETCH_RESPONSE, payload: resData });
    }
}
