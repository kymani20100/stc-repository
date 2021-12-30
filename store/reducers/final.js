import {
    FETCH_RESPONSE
  } from '../actions/final';
  
  const initialState = {
    response: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RESPONSE:
        return {
            response: action.payload
        };
    }
    return state;
  };
  