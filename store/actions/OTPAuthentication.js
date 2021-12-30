// import OTP from '../../models/OTP';
export const AUTH_WITH_OTP = 'AUTH_WITH_OTP';

export const OTPAuthen = (mobileNo, OTP) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_LoginWithOTP', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({MobileNo: mobileNo, AppType: 'MOB', OTP: OTP})
    })
  
      const resData = await response.json();
      
      dispatch({ type: AUTH_WITH_OTP, AuthData: resData});
    };
  };