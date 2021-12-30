import Route from '../../models/route';
export const FETCH_ROUTES = 'FETCH_ROUTES';

export const fetchRoutes = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_GetLocationRoute', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({"ID":"0"})
    })
  
      const resData = await response.json();
      console.log('This is the first route log', resData);
      
      dispatch({ type: FETCH_ROUTES, routes: resData });
    };
  };