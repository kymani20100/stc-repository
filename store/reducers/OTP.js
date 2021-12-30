import {
    FETCH_OTP
  } from '../actions/OTP';
  
  const initialState = {
    availableOTP: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_OTP:
        return {
            availableOTP: action.OTPData
        };
    }
    return state;
  };
  