import Route from '../../models/route';
export const FETCH_HISTORY = 'FETCH_HISTORY';

export const fetchHistory = (userID) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Passenger/API_GetPassengerBookingHistory', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": 'B281BA92-288F-4D5D-9D14-9482E0A960AB',
            "APPType": 'MOB'
        },
        body: JSON.stringify({"UserID":userID})
    })
  
      const resData = await response.json();
      // console.log('This ticket list log', resData);
      dispatch({ type: FETCH_HISTORY, history: resData });
    };
  };