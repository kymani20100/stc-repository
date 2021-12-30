import {
    LOGIN_WITH_OTP
  } from '../actions/OTPLogin';
  
  const initialState = {
    loginOTP: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_WITH_OTP:
        return {
            loginOTP: action.OTPData
        };
    }
    return state;
  };
  