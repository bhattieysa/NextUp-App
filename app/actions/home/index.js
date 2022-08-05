// import axios from 'axios';

import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAILURE,
  MY_STANDING_REQUEST,
  MY_STANDING_SUCCESS,
  MY_STANDING_FAILURE,
  MY_TEAM_DETAIL_REQUEST,
  MY_TEAM_DETAIL_SUCCESS,
  MY_TEAM_DETAIL_FAILURE,
  LEADERBOARD_REQUEST,
  LEADERBOARD_SUCCESS,
  LEADERBOARD_FAILURE,
  UPDATE_HEALTH_REQUEST,
  UPDATE_HEALTH_SUCCESS,
  UPDATE_HEALTH_FAILURE,
  GAME_DETAIL_REQUEST,
  GAME_DETAIL_SUCCESS,
  GAME_DETAIL_FAILURE,
  GAMES_REQUEST,
  GAMES_SUCCESS,
  GAMES_FAILURE,
  CALENDER_INFO_REQUEST,
  CALENDER_INFO_SUCCESS,
  CALENDER_INFO_FAILURE,
  CALENDER_INDICATOR_REQUEST,
  CALENDER_INDICATOR_SUCCESS,
  CALENDER_INDICATOR_FAILURE
} from '../action-type';

import axios from 'axios';
import { AppURLs, CoachChallenegeApproveData } from '../../constants/constant';

//Home Feed

function homeRequest() {
  return {
    type: HOME_REQUEST,
  };
}

function homeSuccess(payload) {
  return {
    type: HOME_SUCCESS,
    entities: payload,
  };
}

function homeFailure(message) {
  return {
    type: HOME_FAILURE,
    error: message,
  };
}

export function homePlayerFeed(userId, cb) {
  return (dispatch, getState) => {

    dispatch(homeRequest());

    return axios
      .get(AppURLs.playerHome + userId)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)
          getState().entities.homePlayer.dashboardData = data;
          dispatch(homeSuccess()), cb(true);
        } else {
          cb(false);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(homeFailure(error));
      });
  };
}

export function getPlayerDashBoard(userId, cb) {
  return (dispatch, getState) => {
    dispatch(homeRequest());
    return axios
      .get(AppURLs.playerHome + userId)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)
          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(homeFailure(error));
      });
  };
}

export function getReels(userId, page, isVideo, cb) {
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162789083981202
    return axios
      .get(AppURLs.reel + userId + `?page=${page}&size=20&video=${isVideo}`)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}



function myStandingRequest() {
  return {
    type: MY_STANDING_REQUEST,
  };
}

function myStandingSuccess(payload) {
  return {
    type: MY_STANDING_SUCCESS,
    entities: payload,
  };
}

function myStandingFailure(message) {
  return {
    type: MY_STANDING_FAILURE,
    error: message,
  };
}

export function myStandingFeed(userId, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    // test data user id :-   165573908635603
    return axios
      // .get(AppURLs.myStanding + userId)
      .get(AppURLs.myStanding + 165573908635603)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          debugger
          //cb(true, data)
          getState().entities.homePlayer.myStandingData = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        return dispatch(myStandingFailure(error));
      });
  };
}



function leaderBoardRequest() {
  return {
    type: LEADERBOARD_REQUEST,
  };
}

function leaderBoardSuccess(payload) {
  return {
    type: LEADERBOARD_SUCCESS,
    entities: payload,
  };
}

function leaderBoardFailure(message) {
  return {
    type: LEADERBOARD_FAILURE,
    error: message,
  };
}

export function leaderBoardFeed(userId, obj, cb) {
  const now = Date.now();
  return (dispatch, getState) => {
    debugger
    dispatch(leaderBoardRequest());
    //162367717958303 //162330894799504
    return axios
      .post(AppURLs.leaderBoard + userId + '/' + now, obj)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          console.log("Data From Lederboard", data)

          //cb(true, data)
          getState().entities.homePlayer.leaderBoardData = data;
          dispatch(leaderBoardSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        cb(false)
        debugger
        return dispatch(leaderBoardFailure(error));
      });
  };
}



function gamesRequest() {
  return {
    type: GAMES_REQUEST,
  };
}

function gamesSuccess(payload) {
  return {
    type: GAMES_SUCCESS,
    entities: payload,
  };
}

function gamesFailure(message) {
  return {
    type: GAMES_FAILURE,
    error: message,
  };
}

export function gamesFeed(userId, obj, cb) {
  const now = Date.now(); // Unix timestamp in milliseconds
  // console.log(now);
  return (dispatch, getState) => {

    dispatch(gamesRequest());
    //162367717958303 //162330894799504
    return axios
      .post(AppURLs.gameInfo + userId + '/PLAYER/' + now, obj)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)
          getState().entities.homePlayer.gameInfoTabData = data;
          dispatch(gamesSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        return dispatch(gamesFailure(error));
      });
  };
}




function updateHealthRequest() {
  return {
    type: UPDATE_HEALTH_REQUEST,
  };
}

function updateHealthSuccess(payload) {
  return {
    type: UPDATE_HEALTH_SUCCESS,
    entities: payload,
  };
}

function updateHealthFailure(message) {
  return {
    type: UPDATE_HEALTH_FAILURE,
    error: message,
  };
}

export function updateHealthInfo(userId, obj, cb) {
  return (dispatch, getState) => {

    dispatch(updateHealthRequest());
    //162367717958303 //162330894799504
    return axios
      .post(AppURLs.updateHealthInfo + userId, obj)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          // let data = response.data.data

          // //cb(true, data)
          // getState().entities.homePlayer.leaderBoardData = data;
          dispatch(updateHealthSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        return dispatch(updateHealthFailure(error));
      });
  };
}



function myTeamDetailRequest() {
  return {
    type: MY_TEAM_DETAIL_REQUEST
  };
}

function myTeamDetailSuccess(payload) {
  return {
    type: MY_TEAM_DETAIL_SUCCESS,
    entities: payload,
  };
}

function myTeamDetailFailure(message) {
  return {
    type: MY_TEAM_DETAIL_FAILURE,
    error: message,
  };
}

export function myTeamDetail(teamId, cb) {
  return (dispatch, getState) => {

    dispatch(myTeamDetailRequest());
    return axios
      .get(AppURLs.myTeamD + teamId)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)
          getState().entities.homePlayer.myTeamDetailData = data;
          dispatch(myTeamDetailSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        cb(false)
        debugger
        return dispatch(myTeamDetailFailure(error));
      });
  };
}

function gameDetailRequest() {
  return {
    type: GAME_DETAIL_REQUEST
  };
}

function gameDetailSuccess(payload) {
  return {
    type: GAME_DETAIL_SUCCESS,
    entities: payload,
  };
}

function gameDetailFailure(message) {
  return {
    type: GAME_DETAIL_FAILURE,
    error: message,
  };
}

export function gameDetailRecentTab(gameId, cb) {
  console.log('gmmmid--', gameId);
  return (dispatch, getState) => {

    dispatch(gameDetailRequest());
    return axios
      .get(AppURLs.gameDetail + gameId)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)
          getState().entities.homePlayer.gameDetailData = data;
          dispatch(gameDetailSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        cb(false)
        debugger
        return dispatch(gameDetailFailure(error));
      });
  };
}


function CalenderTabRequest() {
  return {
    type: CALENDER_INFO_REQUEST,
  };
}

function CalenderTabSuccess(payload) {
  return {
    type: CALENDER_INFO_SUCCESS,
    entities: payload,
  };
}

function CalenderTabFailure(message) {
  return {
    type: CALENDER_INFO_FAILURE,
    error: message,
  };
}

export function calenderTabInfo(userId, currentDate, cb) {

  return (dispatch, getState) => {

    dispatch(CalenderTabRequest());
    //162367717958303 //162330894799504
    return axios
      .get(AppURLs.gameInfo + userId + '/' + currentDate)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)
          getState().entities.homePlayer.calenderTabInfoData = data;
          dispatch(CalenderTabSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        return dispatch(CalenderTabFailure(error));
      });
  };
}

function CalenderIndicatorRequest() {
  return {
    type: CALENDER_INDICATOR_REQUEST,
  };
}

function CalenderIndicatorSuccess(payload) {
  return {
    type: CALENDER_INDICATOR_SUCCESS,
    entities: payload,
  };
}

function CalenderIndicatorFailure(message) {
  return {
    type: CALENDER_INDICATOR_FAILURE,
    error: message,
  };
}

export function calenderIndicatorInfo(userId, date1, date2, cb) {
  //'162521701373607'
  //firstDay + '/' + lastDay
  return (dispatch, getState) => {

    dispatch(CalenderIndicatorRequest());
    return axios
      .get(AppURLs.leaderBoard + userId + '/' + date1 + '/' + date2)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)
          dispatch(CalenderIndicatorSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        return dispatch(CalenderIndicatorFailure(error));
      });
  };
}

export function getSubscriptionInfoById(userId, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.getSubscriptionInfo + userId)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          getState().entities.homePlayer.roadToProData = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


export function createSubscriptionForId(obj, cb) {
  return (dispatch, getState) => {
    debugger
    console.log('objjj', obj);
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .post(AppURLs.createSubs, obj)
      .then((response) => {
        debugger

        console.log("challenge response--", response);

        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          console.log("challenge response--", response);
          //cb(true, data)
          // getState().entities.homePlayer.roadToProData = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        console.log("challenge error", error);
        return dispatch(myStandingFailure(error));
      });
  };
}

export function createSubscriptionForMultiplePlayer(dataArr, cb) {

  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    return axios
      .post(AppURLs.createChallenegeForMultiplePayer, dataArr)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


export function uploadChallengeVideo(userId, strVideoUrl, cb) {
  let data = new FormData();
  data.append('file', {
    uri: strVideoUrl,
    name: `file${Math.random()}.mp4`,
    type: `video/mp4`,
  });
  console.log(data);
  debugger
  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504
    return axios
      .post(AppURLs.uploadChallengeVid + userId, data)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function uploadChallengeVideoURL(planID, obj, cb) {

  debugger
  return (dispatch, getState) => {
    console.log("UPload Challeeeeee", obj);
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504
    return axios
      .patch(AppURLs.updateChallenges + planID, obj)//subscription id//162643922639607
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getUserInfo(userId, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162521701373607
    return axios
      .get(AppURLs.userInfo + userId)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function updateUserInfo(userId, obj, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162521701373607
    return axios
      .post(AppURLs.updateInfo + userId, obj)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {

          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false, 'Something went wrong!')
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getPlayerMore(userId, obj, cb) {
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162521701373607
    return axios
      .get(AppURLs.playerMore + userId)//162833787964303?search=Amit + `?search=${obj}`
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {

          dispatch(myStandingSuccess()), cb(true, response.data.data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false, 'Something went wrong!')
        return dispatch(myStandingFailure(error));
      });
  };
}

// Player more with new api with pagination
export function getPlayerMoreNew(userId, pageNum, selectedSort, sortOrder, cb) {
  const now = Date.now();
  console.log("PlayerMoreCall:----", pageNum);
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162521701373607

    return axios
      .get(AppURLs.playerMoreNew + userId + `/${now}?page=${pageNum}&&size=10&&sort=${selectedSort}&&order=${sortOrder}`)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          dispatch(myStandingSuccess()), cb(true, response.data.data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false, 'Something went wrong!')
        return dispatch(myStandingFailure(error));
      });
  };
}

// Player more with new api with pagination
export function getMoreRecentGames(userId, cb) {
  const now = Date.now();
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //Test Data player id : - 165573908635603
    return axios
      // .get(AppURLs.getMoreRecentGames + userId )
      .get(AppURLs.getMoreRecentGames + 165573908635603)
      .then((response) => {
        if (response.status == 200 && response.data?.data !== null) {
          dispatch(myStandingSuccess()), cb(true, response.data.data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false, 'Something went wrong!')
        return dispatch(myStandingFailure(error));
      });
  };
}

// Team more with new api with pagination
export function getTeamMoreNew(userId, pageNum, selectedSort, sortOrder, cb) {
  const now = Date.now();
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162521701373607
    return axios
      .get(AppURLs.teamMoreNew + userId + `/${now}?page=${pageNum}&&size=10&&sort=${selectedSort}&&order=${sortOrder}`)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          dispatch(myStandingSuccess()), cb(true, response.data.data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false, 'Something went wrong!')
        return dispatch(myStandingFailure(error));
      });
  };
}


// get player more with search
export function getPlayerMoreSearch(userId, obj, cb) {
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162521701373607
    return axios
      .get(AppURLs.playerMore + userId + `?search=${obj}`)//162833787964303?search=Amit 
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {

          dispatch(myStandingSuccess()), cb(true, response.data.data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false, 'Something went wrong!')
        return dispatch(myStandingFailure(error));
      });
  };
}


//coach
export function getCoachDashboard(obj, cb) {
  debugger
  const now = Date.now();
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706 //163211223964006
    return axios
      .get(AppURLs.coachDash + obj + '/' + now)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          getState().entities.homePlayer.coachDash = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

//coachTeam
export function getCoachTeam(obj, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.coachNewTeam + obj)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          getState().entities.homePlayer.coachTeam = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


//get player team
export function getPlayerTeam(obj, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.playerNewTeam + obj)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          getState().entities.homePlayer.coachTeam = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}




//get coach roles
export function getCoachTeamRoles(obj, ownerId, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.teamRoles + obj + "/" + ownerId)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          //cb(true, data)

          console.log("Team Roles: ", JSON.stringify(data));

          getState().entities.homePlayer.teamRoles = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


//remove coach 

export function removeCoachRole(teamId, coachId, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.removeCoachRole + teamId + "/" + coachId)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          // getState().entities.homePlayer.teamRoles = data;
          dispatch(getCoachTeamRoles(teamId, coachId));

          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


//end remove coach

//get coach roles
export function getCoachRoles(obj, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.coachRoles)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          getState().entities.homePlayer.coachRoles = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

//check subscription
export function checkSubscription(ownerId, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.checkSubscription + ownerId)//'162522113111002'
      .then((response) => {
        debugger

        console.log("Response is ", response);

        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          getState().entities.homePlayer.subcriptionInfo = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          console.log("Subscription error response is ", response.data.message);
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        console.log("Subscription error is ", error);
        return dispatch(myStandingFailure(error));
      });
  };
}


//invite coach
export function inviteCoachRole(data, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .post(AppURLs.inviteCoach, data)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          // getState().entities.homePlayer.coachRoles = data;
          console.log("Invite coach data is ", data);
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


//invite coach
export function getRoadToProDetail(type = "COACH", cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(type === "COACH" ? AppURLs.coachRoadToPro : AppURLs.roadToPro)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment
          //cb(true, data)

          getState().entities.homePlayer.roadToProInfo = data[0];
          console.log("Road to pro data is ", data);
          dispatch(myStandingSuccess()), cb(true);
        } else {
          dispatch(myStandingFailure(response.data.message));
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


//get states list
export function getStates(cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.states)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment
          //cb(true, data)

          getState().entities.states = data;
          console.log("state data is ", data);
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          dispatch(myStandingFailure(response.data.message));
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

// get year list
export function getYears(cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.years)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment
          //cb(true, data)

          getState().entities.years = data;
          console.log("year data is ", data);
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          dispatch(myStandingFailure(response.data.message));
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


// New design team
export function getNewCoachTeam(obj, cb) {
  return (dispatch, getState) => {

    console.log("Coach team request url ", AppURLs.coachNewTeam + obj);
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706

    return axios
      .get(AppURLs.coachNewTeam + obj)//'162522113111002'
      .then(async (response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment

          console.log("Coach team data is ", getState().entities.homePlayer.coachTeam);
          debugger
          // bind stats
          // if (data.teamTabInfoDtoList && Array.isArray(data.teamTabInfoDtoList)) {
          //   console.log("in for loop");
          //   for (let i = 0; i < data.teamTabInfoDtoList.length; i++) {
          //     console.log("for loop working");
          //     let teamId = data.teamTabInfoDtoList[i].teamId;
          //     let ownerId = obj;
          //     // dispatch(getTeamStats(getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].teamId, obj, getState().entities.homePlayer.coachTeam.seasonLists.length > 0 ? getState().entities.homePlayer.coachTeam.seasonLists[0] : null));
          //     let requestURL = `${AppURLs.teamStats}${teamId}/${ownerId}`;
          //     if (data.seasonLists && data.seasonLists.length > 0) {
          //       requestURL += `?season=${data.seasonLists[0]}`;
          //     }
          //     debugger

          //     let statResponse = await axios.get(requestURL);
          //     let statResponseData = statResponse.data.data;
          //     debugger

          //     data.teamTabInfoDtoList[i].statsSummary = statResponseData.statsSummary;
          //     data.teamTabInfoDtoList[i].teamPositionsList = statResponseData.teamPositionsList;
          //     data.teamTabInfoDtoList[i].kpi = statResponseData.kpi;
          //     data.teamTabInfoDtoList[i].teamStats = statResponseData.teamStats;
          //     data.teamTabInfoDtoList[i].teamStatsTabDto = statResponseData.teamStatsTabDto;
          //     data.teamTabInfoDtoList[i].seasonType = statResponseData.seasonType;
          //     data.teamTabInfoDtoList[i].bannerInfo = statResponseData.bannerInfo;
          //     data.teamTabInfoDtoList[i].premiumPurchased = statResponseData.premiumPurchased;

          //   }
          // }

          console.log("Team data is ", JSON.stringify(data));

          getState().entities.homePlayer.coachTeam = data;

          //end stats

          dispatch(myStandingSuccess());
          cb(true, data)

        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getNewTeamStats(teamId, ownerId, season, cb) {
  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    return axios
      .get(`${AppURLs.teamStats}${teamId}/${ownerId}?season=${season}`) //'162522113111002'
      .then(async (response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          dispatch(myStandingSuccess());
          cb(true, data)

        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

//get new player team
export function getNewPlayerTeam(obj, cb) {
  return (dispatch, getState) => {

    console.log("Coach team request url ", AppURLs.playerNewTeam + obj);
    dispatch(myStandingRequest());
    // test data user id : - 165573908635603

    return axios
      // .get(AppURLs.playerNewTeam + obj)
      .get(AppURLs.playerNewTeam + 165573908635603)
      .then(async (response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          //data.currentLevelState = 1//line to comment

          console.log("Player team data is ", getState().entities.homePlayer.coachTeam);

          // bind stats
          if (data.teamTabInfoDtoList && Array.isArray(data.teamTabInfoDtoList)) {
            console.log("in for loop");
            for (let i = 0; i < data.teamTabInfoDtoList.length; i++) {
              console.log("for loop working");
              let teamId = data.teamTabInfoDtoList[i].teamId;
              let ownerId = obj;
              // dispatch(getTeamStats(getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].teamId, obj, getState().entities.homePlayer.coachTeam.seasonLists.length > 0 ? getState().entities.homePlayer.coachTeam.seasonLists[0] : null));
              let requestURL = `${AppURLs.playerTeamStats}${teamId}/${ownerId}`;

              if (data.seasonLists && data.seasonLists.length > 0) {
                requestURL += `?season=${data.seasonLists[0]}`;
              }

              let statResponse = await axios.get(requestURL);
              let statResponseData = statResponse.data.data;

              data.teamTabInfoDtoList[i].statsSummary = statResponseData.statsSummary;
              data.teamTabInfoDtoList[i].teamPositionsList = statResponseData.teamPositionsList;
              data.teamTabInfoDtoList[i].kpi = statResponseData.kpi;
              data.teamTabInfoDtoList[i].teamStats = statResponseData.teamStats;
              data.teamTabInfoDtoList[i].teamStatsTabDto = statResponseData.teamStatsTabDto;
              data.teamTabInfoDtoList[i].seasonType = statResponseData.seasonType;
              data.teamTabInfoDtoList[i].bannerInfo = statResponseData.bannerInfo;
              data.teamTabInfoDtoList[i].premiumPurchased = statResponseData.premiumPurchased;

              //now populate the stats

            }
          }

          console.log("Team data is ", JSON.stringify(data));

          getState().entities.homePlayer.coachTeam = data;


          //end stats


          dispatch(myStandingSuccess()), cb(true);
          cb(true, data)

        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}




//get the team stats
export function getTeamStats(teamId, ownerId, season = null, cb) {
  return (dispatch, getState) => {

    console.log("Team stats called teamId ", teamId, " ownerId ", ownerId, " & season ", season);

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706

    let url = `${AppURLs.teamStats}${teamId}/${ownerId}`;

    if (season) {
      url += `?season=${season}`;
    }

    console.log("Team stats url is ", url);

    return axios
      .get(url)//'162522113111002'
      .then((response) => {

        console.log("Team stats response is ", response);

        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger

          if (getState().entities.homePlayer.coachTeam.teamTabInfoDtoList && Array.isArray(getState().entities.homePlayer.coachTeam.teamTabInfoDtoList)) {
            for (let i = 0; i < getState().entities.homePlayer.coachTeam.teamTabInfoDtoList.length; i++) {

              console.log("Team not found with id left ", teamId, " and right ", getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].teamId);

              if (Number(getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].teamId) === Number(teamId)) {

                console.log("Team found ", teamId);

                getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].statsSummary = data.statsSummary;
                getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].teamPositionsList = data.teamPositionsList;
                getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].kpi = data.kpi;
                getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].teamStats = data.teamStats;
                getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].teamStatsTabDto = data.teamStatsTabDto;
                getState().entities.homePlayer.coachTeam.teamTabInfoDtoList[i].seasonType = data.seasonType;

              }

            }
          }

          console.log("Final team stats is ", JSON.stringify(getState().entities.homePlayer.coachTeam));

          // getState().entities.homePlayer.teamStats = teamInfo;



          cb(true, data)

          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        console.log(`Team stats error is ${error}`);
        return dispatch(myStandingFailure(error));
      });
  };
}


// new dwsign team player
export function getPlayerListForTeam(obj, season, cb) {
  let url = '';
  console.log("season is ", season)
  if (season == null) {
    url = AppURLs.teamTabPlayerList + obj;
  } else {
    url = AppURLs.teamTabPlayerList + obj + `?season=${season}`;
  }

  console.log("URL is: ", url);

  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(url)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          console.log("player data ", data);
          //data.currentLevelState = 1//line to comment
          // cb(true)
          getState().entities.homePlayer.coachTeamPlayer = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


//get player list for player login
export function getPlayerListForTeamPlayer(obj, season, cb) {
  let url = '';
  console.log("season is ", season)
  if (season == null) {
    url = AppURLs.playerTeamTabPlayerList + obj;
  } else {
    url = AppURLs.playerTeamTabPlayerList + obj + `?season=${season}`;
  }

  console.log("URL is: ", url);

  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(url)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          console.log("player data ", data);
          //data.currentLevelState = 1//line to comment
          // cb(true)
          getState().entities.homePlayer.coachTeamPlayer = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


// new design my team game tab
export function getGameListForTeam(teamId, usrId, season, cb) {
  const now = Date.now();
  // const ses = "2013-2014"
  let url = '';
  if (season == null) {
    url = AppURLs.teamTabGameList + teamId + '/' + usrId + '/' + Date.now();
  } else {
    url = AppURLs.teamTabGameList + teamId + '/' + usrId + '/' + Date.now() + `?season=${season}`;

  }
  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(url) //'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          console.log("GAME DATA: ", data);
          //data.currentLevelState = 1//line to comment
          // getState().entities.homePlayer.coachTeamGames = data;
          // cb(true)
          dispatch(myStandingSuccess());
          cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

//get game list for players
export function getPlayerGameListForTeam(teamId, usrId, season, cb) {
  const now = Date.now();
  // const ses = "2013-2014"
  // test data user id :-   165573908635603
  let url = '';
  if (season == null) {
    // url = AppURLs.playerTeamTabGameList + teamId + '/' + usrId + '/' + Date.now();
    url = AppURLs.playerTeamTabGameList + teamId + '/' + 165573908635603 + '/' + Date.now();
  } else {
    // url = AppURLs.playerTeamTabGameList + teamId + '/' + usrId + '/' + Date.now() + `?season=${season}`;
    url = AppURLs.playerTeamTabGameList + teamId + '/' + 165573908635603 + '/' + Date.now() + `?season=${season}`;
  }

  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(url) //'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          console.log("PLAYER GAME DATA: ", data);
          //data.currentLevelState = 1//line to comment
          // getState().entities.homePlayer.coachTeamGames = data;
          // cb(true)
          dispatch(myStandingSuccess());
          cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}




//coachPlayers
export function getCoachPlayers(obj, cb) {
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.coachPlayers + obj)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          //cb(true, data)
          getState().entities.homePlayer.coachPlayers = data;
          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}
export function getPlayersForCoachProfile(userId, pageNum, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162522113111002
    return axios
      .get(AppURLs.coachGetPlayersForProfile + userId + `?page=${pageNum}&size=20`)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}
export function getPlayerss(userId, strSearch, objectLoc, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162522113111002
    return axios
      .post(AppURLs.getPlayers + userId + `?search=${strSearch}`, objectLoc)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

export function getInitialPlayerss(userId, pageNum, objectLoc, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162522113111002
    return axios
      .post(AppURLs.getPlayers + userId + `?page=${pageNum}&size=20`, objectLoc)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}
//coachAddTeam
export function createNewTeam(obj, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .post(AppURLs.createTeam, obj)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          // let data = response.data.data

          dispatch(myStandingSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function addPlayerToTeam(teamID, obje, outerIndex, season, cb) {
  debugger
  // console.log("TeamID-->> ", userId, "  obj--->>", obje);
  return (dispatch, getState) => {
    dispatch(homeRequest());
    //162522113111002
    return axios
      // .post(AppURLs.addPlayerTo + teamID, obje)
      .post(AppURLs.addPlayerTo + teamID + '/' + season + '/' + outerIndex, obje)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

export function invitePlayerToTeam(teamID, obje, cb) {
  debugger
  // console.log("TeamID-->> ", userId, "  obj--->>", obje);
  return (dispatch, getState) => {
    dispatch(homeRequest());
    //162522113111002
    return axios
      .post(AppURLs.sendPlayerInvitation + teamID, obje)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

export function removePlayerToTeam(teamid, ind, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162522113111002
    return axios
      .get(AppURLs.removePlayerTo + teamid + '/' + ind)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

export function removeMultiplePlayerToTeam(teamid, season, playerIndxArr, cb) {
  debugger
  return (dispatch, getState) => {
    dispatch(homeRequest());
    //162522113111002
    return axios
      .post(AppURLs.removePlayerTo + teamid + '/' + season, playerIndxArr)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          //cb(true, data)
          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

export function getComparePlayerss(userId, strSearch, objectLoc, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162521701383607
    return axios
      .post(AppURLs.comparePlayers + userId, objectLoc)   // edit by keshav + `?search=${strSearch}`
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

//new compare player
export function getPlayerCompare(playerID1, playerID2, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162521701383607
    return axios
      .get(AppURLs.newPlayerCompare + playerID1 + '/' + playerID2)   // edit by keshav + `?search=${strSearch}`
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

export function getComparePlayerSrch(userId, strSearch, objectLoc, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162521701383607
    return axios
      .post(AppURLs.comparePlayers + userId + `?search=${strSearch}`, objectLoc)   // edit by keshav + `?search=${strSearch}`
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //cb(true, data)

          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}

export function setDeviceToken(data) {
  return (dispatch, getState) => {
    getState().entities.home.apptoken = data.token;
  };
}

// Get challeneges list
export function getChallengeListForCoach(userId, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(homeRequest());
    //162521701383607
    return axios
      .get(AppURLs.getChallengesListForCoach + `?pro=${false}&&coachId=${userId}`)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          // cb(true, data)

          dispatch(homeSuccess());
          cb(true, data);
        } else {
          cb(false, []);//response.data.message
        }
      })
      .catch((error) => {
        debugger
        cb(false, [])
        return dispatch(homeFailure(error));
      });
  };
}


// // Assign challenege
// export function asignChallengeToPlayer(userId, playerId, challengeObj, cb) {
//   debugger
//   return (dispatch, getState) => {
//     dispatch(homeRequest());
//     //162521701383607
//     return axios
//       .post(AppURLs.assignChallenegeToPlayer + userId + '/' + playerId, challengeObj)   // Url Need to change
//       .then((response) => {
//         debugger
//         if (response.status == 200 && response.data?.data !== null) {
//           let data = response.data.data
//           cb(true, data)
//           dispatch(homeSuccess()), cb(true, data);
//         } else {
//           cb(false, []);//response.data.message
//         }
//       })
//       .catch((error) => {
//         debugger
//         cb(false, [])
//         return dispatch(homeFailure(error));
//       });
//   };
// }

export function getSubscriptionDetailsById(id, cb) {
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.getSubscriptionInfoById + id)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          CoachChallenegeApproveData.attempData = data;

          // cb(true, data)
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger

        return dispatch(myStandingFailure(error));
      });
  };
}

export function getChallengeDtls(id, cb) {
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.getSubscriptionInfoById + id)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          // cb(true, data)
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getSeacrhData(strTxt, cb) {
  return (dispatch, getState) => {
    debugger;
    dispatch(homeRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.exploreSearch + strTxt)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data
          // console.log("Api DT", data)
          cb(true, data)
          // getState().entities.homePlayer.roadToProData = data;
          dispatch(homeSuccess()), cb(true);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(homeFailure(error));
      });
  };
}

// get player data for share
export function getPlayerForShare(obj, cb) {
  debugger
  // const now = Date.now();
  return (dispatch, getState) => {
    dispatch(homeRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.playerForShare + obj)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          //data.currentLevelState = 1//line to comment
          // cb(true, data)
          dispatch(homeSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(homeFailure(error));
      });
  };
}

export function getChallengeTabData(id, cb) {
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.coachChallengeList + id)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          // cb(true, data)
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getChallengeDataWithPlayerDtls(id, planID, cb) {
  return (dispatch, getState) => {
    debugger;
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(AppURLs.getChallengeInfoWithPlayerList + id + '/' + planID)
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          let data = response.data.data

          // cb(true, data)
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}


export function getSchoolOrTeamList(city, state_name, type, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(`${AppURLs.getSchoolOrTeam}?city=${city}&&state=${state_name}&&type=${type}`)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          dispatch(myStandingSuccess()), cb(true, data);
        } else {
          dispatch(myStandingFailure(response.data.message));
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getCities(state_name, cb) {
  debugger
  return (dispatch, getState) => {

    dispatch(myStandingRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .get(`${AppURLs.states}?state=${state_name}`)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          dispatch(myStandingSuccess())
          cb(true, data)
        } else {
          dispatch(myStandingFailure(response.data.message));
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getGameInitialData(cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(gamesRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .post(`${AppURLs.getGameInitData}165584329697608/165584356686406/1652921974198`)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          // let data = response.data.data
          dispatch(gamesSuccess()), cb(true, response);
        } else {
          dispatch(gamesFailure(response.data.message));
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        cb(false)
        return dispatch(gamesFailure(error));
      });
  };
}

export function getAdvanceStats(gameId, cb) {
  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    return axios
      .get(`${AppURLs.getGameAdvanceStats}${gameId}`) //'162522113111002'
      .then(async (response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          dispatch(myStandingSuccess());
          cb(true, data)
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  };
}

export function getTeamAdvanceStat(teamId, season, cb) {
  return (dispatch, getState) => {
    dispatch(myStandingRequest());
    return axios
      .get(`${AppURLs.getTeamAdvanceStats}${teamId}/${season}`) //'162522113111002'
      .then(async (response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          let data = response.data.data
          debugger
          dispatch(myStandingSuccess());
          cb(true, data)
        } else {
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        debugger
        cb(false)
        return dispatch(myStandingFailure(error));
      });
  }; s
}

export function sendEventData(gameId, data, cb) {
  return (dispatch, getState) => {
    debugger
    dispatch(gamesRequest());
    //162367717958303 //162330894799504 //162643359596706
    return axios
      .post(AppURLs.logEventData + gameId, data)//'162522113111002'
      .then((response) => {
        debugger
        if (response.status == 200 && response.data?.data !== null) {
          debugger
          dispatch(gamesSuccess()), cb(true, response);
        } else {
          dispatch(gamesFailure(response.data.message));
          cb(false, response.data.message);
        }
      })
      .catch((error) => {
        cb(false)
        return dispatch(gamesFailure(error));
      });
  };
}


