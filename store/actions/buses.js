import Bus from '../../models/bus';
export const FETCH_BUSES = 'FETCH_BUSES';

export const fetchBuses = (sourceId,destinationId,tripdate) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_GetListBusAllWebMobApp', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({SourceID: sourceId, DestinationID: destinationId, TravelDate: tripdate})
    })
  
      const resData = await response.json();
       console.log(resData);
      // const loadedBuses = [];

      // if(resData.Message !== 'NO_RECORD_FOUND'){

      //   for (const key in resData) {
      //     loadedBuses.push(
      //       new Bus(
      //         resData[key].TripID,
      //         resData[key].TName,
      //         resData[key].Depart,
      //         resData[key].Arrive,
      //         resData[key].FAR,
      //         resData[key].SEAT,
      //         resData[key].LSEAT,
      //         resData[key].ServiceType,
      //         resData[key].DestFromID,
      //         resData[key].DestToID
      //       )
      //     );
      //   }
      // }else{
      //   for (const key in resData) {
      //     loadedBuses.push(
      //       new Bus(
      //         "0",
      //         'SORRY, WE COULD NOT FIND YOU A BUS',
      //         '00:00',
      //         '00:00',
      //         '00',
      //         0,
      //         0,
      //         0,
      //         0,
      //         0
      //       )
      //     );
      //   }
      // }
  
      dispatch({ type: FETCH_BUSES, buses: resData });
    };
  };