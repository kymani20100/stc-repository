import {
    USER_REGISTRATION
  } from '../actions/authentication';
  
  const initialState = {
    registeredAuth: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTRATION:
        return {
            registeredAuth: action.RegisterationData
        };
    }
    return state;
  };
  