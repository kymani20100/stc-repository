import {
    FETCH_ID
  } from '../actions/idType';
  
  const initialState = {
    availableId: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ID:
        return {
            availableId: action.idType
        };
    }
    return state;
  };
  