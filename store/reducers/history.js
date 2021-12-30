import {
  FETCH_HISTORY
} from '../actions/history';

const initialState = {
  availableTickets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HISTORY:
      return {
        availableTickets: action.history
      };
  }
  return state;
};
