import {
  FETCH_ROUTES
} from '../actions/routes';

const initialState = {
  availableRoutes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROUTES:
      return {
        availableRoutes: action.routes
      };
  }
  return state;
};
