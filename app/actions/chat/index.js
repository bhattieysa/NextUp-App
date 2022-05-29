import {
  CHAT_MESSAGE_REQUEST,
  CHAT_MESSAGE_SUCCESS,
  CHAT_MESSAGE_FAILURE,
  CHAT_USER_LIST_REQUEST,
  CHAT_USER_LIST_SUCCESS,
  CHAT_USER_LIST_FAILURE,

} from '../action-type';

import axios from 'axios';
import { AppURLs } from '../../constants/constant';

// Chat USer list
function chatUserListRequest() {
  return {
    type: CHAT_USER_LIST_REQUEST,
  };
}

function chatUserListSuccess(payload) {
  return {
    type: CHAT_USER_LIST_SUCCESS,
    entities: payload,
  };
}

function chatUserListFailure(message) {
  return {
    type: CHAT_USER_LIST_FAILURE,
    error: message,
  };
}

// export function getUserChatList(userId, cb) {
//   return (dispatch, getState) => {

//     dispatch(chatUserListRequest());

//     return axios
//       .get(AppURLs.playerHome + userId)   // Url need to change
//       .then((response) => {
//         debugger
//         if (response.status == 200 && response.data?.data !== null) {
//           let data = response.data.data

//           //cb(true, data)
//           getState().entities.chat.chatUsersList = data;
//           dispatch(chatUserListSuccess()), cb(true);
//         } else {
//           cb(false);//response.data.message
//         }
//       })
//       .catch((error) => {
//         debugger
//         cb(false)
//         return dispatch(chatUserListFailure(error));
//       });
//   };
// }

// Chat old message list
function chatRequest() {
  return {
    type: CHAT_MESSAGE_REQUEST,
  };
}

function chatSuccess(payload) {
  return {
    type: CHAT_MESSAGE_SUCCESS,
    entities: payload,
  };
}

function chatFailure(message) {
  return {
    type: CHAT_MESSAGE_FAILURE,
    error: message,
  };
}

// export function getOldMessageList(userId, page, cb) {
//   return (dispatch, getState) => {
//     dispatch(chatRequest());

//     return axios
//       .get(AppURLs + userId)  // Url need to change and need to add pagination
//       .then((response) => {
//         debugger
//         if (response.status == 200 && response.data?.data !== null) {
//           let data = response.data.data

//           //cb(true, data)
//           getState().entities.chat.messageList = data;
//           dispatch(chatSuccess()), cb(true);
//         } else {
//           cb(false);//response.data.message
//         }
//       })
//       .catch((error) => {
//         debugger
//         cb(false)
//         return dispatch(chatFailure(error));
//       });
//   };
// }
// create channel
export function createChatChannel(obj, cb) {
  return (dispatch, getState) => {
    dispatch(chatRequest());
    return axios
      .post(AppURLs.createChannel, obj)  // Url need to change and need to add pagination
      .then((response) => {
        // console.log('====>>> Res ', response)
        // debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data
          // debugger
          //cb(true, data)
          // getState().entities.chat.messageList = data;
          dispatch(chatSuccess()), cb(true, data);
        } else {
          cb(false);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(chatFailure(error));
      });
  };
}

//upload chat image
export function uploadImage(profile, userId, userType, uploadType, cb) {
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
    dispatch(chatRequest());
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
        return dispatch(chatFailure(error));
      });
  };
}

//upload chat video
export function uploadChatVideo(userId, strVideoUrl, cb) {
  let data = new FormData();
  data.append('file', {
    uri: strVideoUrl,
    name: `file${Math.random()}.mp4`,
    type: `video/mp4`,
  });
  debugger
  return (dispatch, getState) => {
    dispatch(chatRequest());
    //162367717958303 //162330894799504
    return axios
      .post(AppURLs.uploadChallengeVid + userId, data)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          dispatch(chatSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(chatFailure(error));
      });
  };
}


// Post message
export function sendMessage(obj, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(chatRequest());
    return axios
      .post(AppURLs.postMessage, obj)  // Url need to change and need to add pagination
      .then((response) => {
        // console.log('====>>> ', response)
        debugger
        if (response.status == 200 || response.status == 201) {
          debugger
          dispatch(chatSuccess()), cb(true);
        } else {
          cb(false);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(chatFailure(error));
      });
  };
}

// Get user message list of persons
export function getChatUserList(obj, page, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(chatUserListRequest());
    // dispatch(chatRequest());
    return axios
      .get(AppURLs.chatUserList + obj)  // Url need to change and need to add pagination
      .then((response) => {
        // console.log('====>>> ', response)
        debugger
        if (response.status == 200 || response.data?.data !== null) {
          debugger
          let data = response.data.data;
          getState().entities.chat.chatUsersList = data;
          dispatch(chatUserListSuccess()), cb(true);
        } else {
          cb(false);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(chatUserListFailure(error));
      });
  };
}

// Get initial message for a channel
export function getInitialMsgForChannel(channelId, page, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(chatRequest());
    return axios
      .get(AppURLs.getInitialMessage + channelId + `?page=${page}&size=20`)  // Url with pagination
      .then((response) => {
        // console.log('====>>> ', response)
        debugger
        if (response.status == 200 || response.data?.data !== null) {
          debugger
          let data = response.data.data
          // getState().entities.chat.messageList = data;
          dispatch(chatSuccess()), cb(true, data);
        } else {
          cb(false);//response.data.message    
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(chatFailure(error));
      });
  };
}

// Team-Invitation action
export function teamInvitationAction(teamId, index, isAccept, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(chatRequest());
    return axios
      .get(AppURLs.teamInviteAction + teamId + `/${index}/${isAccept}`)
      .then((response) => {
        // console.log('====>>> ', response)
        debugger
        if (response.status == 200 || response.data?.data !== null) {
          debugger
          let data = response.data.data
          // getState().entities.chat.messageList = data;
          dispatch(chatSuccess()), cb(true, data);
        } else {
          cb(false);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(chatFailure(error));
      });
  };
}

// Send bulk message
export function sendBulkMessage(msgArr, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(chatRequest());
    return axios
      .post(AppURLs.postBulkMessage, msgArr)  // Url need to change and need to add pagination
      .then((response) => {
        // console.log('====>>> ', response)
        debugger
        if (response.status == 200 || response.status == 201) {
          debugger
          dispatch(chatSuccess()), cb(true);
        } else {
          cb(false);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(chatFailure(error));
      });
  };
}