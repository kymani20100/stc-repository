// import OTP from '../../models/OTP';
export const FETCH_PASSWORD_LOGIN = 'FETCH_PASSWORD_LOGIN';

export const fetchUser = (mobile, password) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_LoginWithPassword', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({ MobileNo : mobile, AppType:"MOB", Password : password})
    })
  
      const resData = await response.json();
      
      dispatch({ type: FETCH_PASSWORD_LOGIN, PasswordLoginData: resData});
    };
  };