import Currency from '../../models/currency';
export const FETCH_CURRENCY = 'FETCH_CURRENCY';

export const fetchCurrency = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_GetParamDetailsList', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({"ID":"1", "Nm":"ABC"})
    })
  
      const resData = await response.json();
       console.log('Currency', resData);
      const loadedCurrency = [];
  
      for (const key in resData.SearchDetail) {
        if(key !== "0"){
          console.log('Key',key)
          loadedCurrency.push(
            new Currency(
              resData.SearchDetail[key].ID,
              resData.SearchDetail[key].Nm,
            )
          );
        }
        
  
      }
  
      dispatch({ type: FETCH_CURRENCY, currencyData: loadedCurrency });
    };
  };