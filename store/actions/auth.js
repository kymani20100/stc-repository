export const FETCH_PASSWORD_LOGIN = 'FETCH_PASSWORD_LOGIN';
export const AUTH_WITH_OTP = 'AUTH_WITH_OTP';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const LOGOUT = 'LOGOUT';
export const WELCOME = 'WELCOME';

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
    console.log(resData);
    let token = null;
    let name = null;
    let PassID = null;
    let pic = null;
    let message = null;
    if(resData.success === false){
      token = null;
      name = null;
      PassID = null;
      pic = null;
      message = 'Password provided does not match';
    }else{
      token = resData.UserLoginInformations[0].TokenNo;
      name = resData.UserLoginInformations[0].Name;
      PassID = resData.UserLoginInformations[0].PassID;
      pic = resData.UserLoginInformations[0].PhotoPic;
      message = 'Authentication successful';
    } 
    dispatch({ type: FETCH_PASSWORD_LOGIN, message: message, token: token, passID: PassID, fullname: name, picture: pic, mobile: mobile});
    };
  };



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
    // console.log(resData);

    console.log(resData);
      let token = null;
      let name = null;
      let PassID = null;
      let pic = null;
      let message = null;
    if(resData.success === false){
      token = null;
      name = null;
      PassID = null;
      pic = null;
      message = resData.Message;
    }else{
      token = resData.UserLoginInformations[0].TokenNo;
      name = resData.UserLoginInformations[0].Name;
      PassID = resData.UserLoginInformations[0].PassID;
      pic = resData.UserLoginInformations[0].PhotoPic;
      message = 'Authentication successful';
    }
    dispatch({ type: AUTH_WITH_OTP, message: message, token: token, passID: PassID, fullname: name, picture: pic, mobile: mobileNo});
    };
  };



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
    console.log(resData);
      let token = null;
      let name = null;
      let PassID = null;
      let pic = null;
      let message = null;
    if(resData.success === false){
      token = null;
      name = null;
      PassID = null;
      pic = null;
      message = resData.Message;
    }
    else {
      token = resData.UserLoginInformations[0].TokenNo;
      name = resData.UserLoginInformations[0].Name;
      PassID = resData.UserLoginInformations[0].PassID;
      pic = resData.UserLoginInformations[0].PhotoPic;
      message = 'OTP auth successful';
    }
    
    dispatch({ type: USER_REGISTRATION, message: message, token: token, passID: PassID, fullname: name, picture: pic, mobile: mobileNo});
    
    };
  };

  export const WelcomeBack = (token, name, passID, pic, mobile) => {
   
    return({ type: WELCOME, message: 'Authentication successful', token: token, fullname: name, passID: passID, picture: pic, mobile: mobile});
    
  };

  export const Logout = () => {
    return {type: LOGOUT}
  }