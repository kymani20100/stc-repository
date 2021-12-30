import Country from '../../models/country';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';

export const fetchCountries = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_GetParamDetailsList', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({"ID":"20","Nm":"Select Citizenship"
    })
    })
  
      const resData = await response.json();
      // console.log(resData);
      // const loadedCountries = [];
  
      // for (const key in resData.SearchDetail) {
      //   if(key !== '0'){
      //       loadedCountries.push(
      //       new Country(
      //         resData.SearchDetail[key].ID,
      //         resData.SearchDetail[key].Nm,
      //       )
      //     );
      //   }
      // }
  
      dispatch({ type: FETCH_COUNTRIES, Countries: resData });
    };
  };