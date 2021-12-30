import {
    AUTH_WITH_OTP
  } from '../actions/OTPAuthentication';
  
  const initialState = {
    authOTP: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case AUTH_WITH_OTP:
        return {
            authOTP: action.AuthData
        };
    }
    return state;
  };
  