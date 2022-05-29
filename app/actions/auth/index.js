// import axios from 'axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
  ONLINE,
  OFFLINE,
  ON_BOARD_REQUEST,
  ON_BOARD_SUCCESS,
  ON_BOARD_FAILURE,
  OTP_REQUEST,
  OTP_FAILURE,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_FAILURE
} from '../action-type';
import { setUserAuth, setObject, setUserToken } from '../../middleware';
import axios from 'axios';
import { AppURLs } from '../../constants/constant';

//Login

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    entities: payload,
  };
}

function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    error: message,
  };
}

export function uploadPhoto(profile, userId, userType, uploadType, cb) {
  debugger;
  let bodyData = new FormData();
  bodyData.append('file', {
    uri: profile,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
  let uploadImageBaseUrl = AppURLs.uploadProfile + userId + `/${uploadType}/` + userType.toUpperCase() + '/'
  debugger
  // console.log(AppURLs.uploadProfile + userId + '/PROFILE_PICTURE/' + userType.toUpperCase())
  return (dispatch, getState) => {
    debugger
    dispatch(loginRequest());

    console.log("hit url", uploadImageBaseUrl);
    console.log("body data ", bodyData);

    return axios
      .post(uploadImageBaseUrl, bodyData)
      .then((response) => {
        console.log(response)
        debugger
        if (response.status == 200 && response.data?.data !== null && response.data.error == null) {
          cb(true, response.data?.data?.imageUrl);
        } else {
          cb(false);
        }
      })
      .catch((error) => {
        debugger
        cb(false, error);
        return dispatch(loginFailure(error));
      });
  };
}

export function removeUserdata(cb) {
  return (dispatch, getState) => {
    getState().entities.user.LoginData = [];
    cb();
  };
}

export function setUserdata(data) {
  return (dispatch, getState) => {
    getState().entities.user.LoginData = data;
  };
}

export function setUserLanguage(data) {
  return (dispatch, getState) => {
    getState().entities.user.language = data;
  };
}

function Online() {
  return {
    type: ONLINE,
  };
}

function Offline() {
  return {
    type: OFFLINE,
  };
}

export function setNetworkdata(data) {
  return (dispatch, getState) => {
    if (data) {
      dispatch(Online());
    } else {
      dispatch(Offline());
    }
  };
}

//SignUp

function RegisterRequest() {
  return {
    type: REGISTER_REQUEST,
  };
}

function RegisterSuccess(payload) {
  return {
    type: REGISTER_SUCCESS,
    entities: payload,
  };
}

function RegisterFailure(message) {
  return {
    type: REGISTER_FAILURE,
    error: message,
  };
}

export function Register(credentials, cb) {
  debugger
  console.log("Userrr", credentials);
  return (dispatch, getState) => {
    dispatch(RegisterRequest());
    return axios
      .post(AppURLs.Register, credentials)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data !== null) {
          debugger
          console.log("resp register", response);
          let data = response?.data;
          let token = response.headers['x-nextup-user-token'];
          console.log("tkn", token);
          setObject('UserId', data.id)
          setUserToken(token);
          cb(true, data)
          // // .then((res) => {
          // //   cb(true);
          // // });
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        console.log(error)
        return dispatch(RegisterFailure(error));
      });
  };
}

//Forgot Password

function forgotRequest() {
  return {
    type: FORGOT_REQUEST,
  };
}

function forgotSuccess(payload) {
  return {
    type: FORGOT_SUCCESS,
    entities: payload,
  };
}

function forgotFailure(message) {
  return {
    type: FORGOT_FAILURE,
    error: message,
  };
}

export function Forgot(email, cb) {
  return (dispatch, getState) => {
    dispatch(forgotRequest());
    return axios
      .post(AppURLs.Forget, email)
      .then((response) => {
        let data = response.data.msg;
        if (response.data.status) {
          dispatch(forgotSuccess()), cb(true, data);
        } else {
          cb(false, data);
        }
      })
      .catch((error) => {
        return dispatch(forgotFailure(error));
      });
  };
}


//On Boarding

function OnBoardRequest() {
  return {
    type: ON_BOARD_REQUEST

  };
}

function OnBoardFailure(message) {
  return {
    type: ON_BOARD_FAILURE,
    error: message,
  };
}

export function onBoardAPI(userId, params, cb) {
  debugger
  return (dispatch, getState) => {
    dispatch(OnBoardRequest());
    return axios
      .post(AppURLs.onBoard + userId, params)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          cb(true, data)
          // setUserAuth(data).then((res) => {
          //   cb(true);
          // });
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        console.log(error)
        return dispatch(OnBoardFailure(error));
      });
  };
}
//OTP

function OTPRequest() {
  return {
    type: OTP_REQUEST

  };
}

function OTPFailure(message) {
  return {
    type: OTP_FAILURE,
    error: message,
  };
}

export function requestOTPAPI(userId, params, cb) {
  debugger
  return (dispatch, getState) => {
    dispatch(OTPRequest());
    return axios
      .post(AppURLs.otp + userId, params)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          cb(true, data)
          // setUserAuth(data).then((res) => {
          //   cb(true);
          // });
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        console.log(error)
        return dispatch(OTPFailure(error));
      });
  };
}

//OTP Verify

function OTPVerifyRequest() {
  return {
    type: OTP_VERIFY_REQUEST


  };
}

function OTPVerifyFailure(message) {
  return {
    type: OTP_VERIFY_FAILURE,
    error: message,
  };
}

export function verifyOtpAPI(userId, params, cb) {
  debugger
  return (dispatch, getState) => {
    dispatch(OTPVerifyRequest());
    return axios
      .get(AppURLs.verifyOtp + userId + '/' + params)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          cb(true, data)
          // setUserAuth(data).then((res) => {
          //   cb(true);
          // });
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        console.log(error)
        return dispatch(OTPVerifyFailure(error));
      });
  };
}


//Reset password

function resetRequest() {
  return {
    type: RESET_REQUEST,
  };
}

function resetSuccess(payload) {
  return {
    type: RESET_SUCCESS,
    entities: payload,
  };
}

function resetFailure(message) {
  return {
    type: RESET_FAILURE,
    error: message,
  };
}

export function Reset(credentials, cb) {
  return (dispatch, getState) => {
    dispatch(resetRequest());
    return axios
      .post(AppURLs.Reset, credentials)
      .then((response) => {
        let data = response.data.success;
        if (data) {
          dispatch(resetSuccess()), cb(true, data.msg);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        return dispatch(resetFailure(error));
      });
  };
}

export function Logout(userId, deviceToken, cb) {
  debugger
  return (dispatch, getState) => {
    console.log("Device token is ", deviceToken, "and userid is ", userId);
    dispatch(RegisterRequest());
    return axios
      .get(AppURLs.logOut + userId + '/' + deviceToken)
      .then((response) => {

        console.log("REsponse is ", response);

        debugger
        if (response.status == 200 && response.data !== null) {
          debugger
          console.log("LogOut Resp", response);
          let data = response?.data;
          // let token = response.headers['x-nextup-user-token'];
          // console.log("tkn", token);
          // setObject('UserId', data.id)
          // setUserToken(token);
          cb(true, data)
          // // .then((res) => {
          // //   cb(true);
          // // });
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        console.log("Logout Error is ", error)
        return dispatch(RegisterFailure(error));
      });
  };
}
