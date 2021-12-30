import {
    FETCH_CURRENCY
  } from '../actions/currency';
  
  const initialState = {
    availableCurrency: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CURRENCY:
        return {
            availableCurrency: action.currencyData
        };
    }
    return state;
  };
  