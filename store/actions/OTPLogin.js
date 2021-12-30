// import OTP from '../../models/OTP';
export const LOGIN_WITH_OTP = 'LOGIN_WITH_OTP';

export const OTPlogin = (mobileNo) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_ReqOTP', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({MobileNo: mobileNo})
    })
  
      const resData = await response.json();
      
      dispatch({ type: LOGIN_WITH_OTP, OTPData: resData});
    };
  };