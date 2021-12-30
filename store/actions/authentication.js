// import OTP from '../../models/OTP';
export const USER_REGISTRATION = 'USER_REGISTRATION';

export const Registeration = (mobileNo, OTP, password, username) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('http://67.222.135.25:8024/api/Data/API_AddNewUser', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "APITocken": '9D85A0FB-73E1-413C-BC2C-C95DDCD9CD89',
            "APPType": 'MOBAND'
        },
        body: JSON.stringify({MobileNo: mobileNo, AppType: 'MOB', OTP: OTP, Password: password, UserName: username})
    })
      const resData = await response.json();
      dispatch({ type: USER_REGISTRATION, RegisterationData: resData});
    };
  };