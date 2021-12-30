// export const TOGGLE_SEATS = 'TOGGLE_SEATS';
export const EMPTY_BUCKET = 'EMPTY_BUCKET';
export const FETCH_SEATS = 'FETCH_SEATS';

import Seat from '../../models/seat';

export const emptyBucket = () => {
    return {type: EMPTY_BUCKET};
}

export const fetchSeats = (fid,tid,tripdate,configId) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch('http://67.222.135.25:8024/api/Data/API_SeatArragement', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
          },
          body: JSON.stringify({SourceID: fid, DestinationID: tid, TravelDate: tripdate, TripID: configId})
      })
      const resData = await response.json();
    //  console.log('Seats Data',resData);
      const loadedSeats = [];

      for (const key in resData.SeatArragement) {
        loadedSeats.push(
          new Seat(
            resData.SeatArragement[key].ID,
            resData.SeatArragement[key].Postion,
            resData.SeatArragement[key].SeartNo,
            resData.SeatArragement[key].StatusShow,
            resData.SeatArragement[key].BookStatus,
            resData.SeatArragement[key].price,
            resData.SeatArragement[key].BlockSeat,
          )
        );
      }
      dispatch({ type: FETCH_SEATS, seats: loadedSeats });
    }
}
