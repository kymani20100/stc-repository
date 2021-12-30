import {
  FETCH_PASSWORD_LOGIN
} from '../actions/passwordLogin';

const initialState = {
  loginUser: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PASSWORD_LOGIN:
      return {
        loginUser: action.PasswordLoginData
      };
  }
  return state;
};
