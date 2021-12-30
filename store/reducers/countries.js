import {
    FETCH_COUNTRIES
  } from '../actions/countries';
  
  const initialState = {
    availableCountries: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COUNTRIES:
        return {
            availableCountries: action.Countries
        };
    }
    return state;
  };
  