import {
    FETCH_PASSWORD_LOGIN, AUTH_WITH_OTP, USER_REGISTRATION, LOGOUT, WELCOME
  } from '../actions/auth';
  
  const initialState = {
    token: null,
    name: null,
    pic: null,
    phone: null,
    passID: null,
    message: null
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PASSWORD_LOGIN:
          return {
            token: action.token,
            name: action.fullname,
            pic: action.picture,
            phone: action.mobile,
            passID: action.passID,
            message: action.message
          };
        case AUTH_WITH_OTP:
          return {
            token: action.token,
            name: action.fullname,
            pic: action.picture,
            phone: action.mobile,
            passID: action.passID,
            message: action.message
          };
        case USER_REGISTRATION:
            return {
              token: action.token,
              name: action.fullname,
              pic: action.picture,
              phone: action.mobile,
              passID: action.passID,
              message: action.message
            };
          case WELCOME:
            return {
              token: action.token,
              name: action.fullname,
              pic: action.picture,
              phone: action.mobile,
              passID: action.passID,
              message: action.message
            };
            case LOGOUT:
                return {
                    token: null,
                    name: null,
                    pic: null,
                    phone: null,
                    passID: null,
                    message: null
                };
        default:
          return state;
      }
    // switch (action.type) {
    //   case FETCH_PASSWORD_LOGIN:
    //     return {
    //       loginUser: action.PasswordLoginData
    //     };
    // }
    // return state;
  };
  