import {
    FETCH_BUSES
  } from '../actions/buses';
  
  const initialState = {
    availableBuses: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BUSES:
        return {
          availableBuses: action.buses
        };
    }
    return state;
  };
  