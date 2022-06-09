import React from 'react';
import { Platform } from 'react-native';
export const characterLimit = {
  password: 7,
};
export const API_ROOT = 'http://35.184.198.142:8085/v1/';


export const AppURLs = {
  Register: 'user/register',
  uploadProfile: 'storage/upload/',
  onBoard: 'user/onBoarding/',
  otp: 'user/request/otp/',
  verifyOtp: 'user/verify/otp/',
  //Player
  playerHome: 'player/dashboard/',
  myStanding: 'player/standing/',
  myTeamD: 'team/detail/',
  leaderBoard: 'leaderboard/',
  updateHealthInfo: 'player/update/healthInfo/',
  gameDetail: 'game/',
  gameInfo: 'matches/',
  getSubscriptionInfo: 'player/roadToPro/',
  uploadChallengeVid: 'storage/upload/video/',
  updateChallenges: 'subscription/update/challenges/',
  reel: 'user/post/',
  createSubs: 'subscription/create',
  userInfo: 'user/basic/info/',
  updateInfo: 'user/update/profile/',
  playerMore: 'player/ranked/',
  playerMoreNew: 'leaderboard/player/more/',
  teamMoreNew: 'leaderboard/team/more/',
  coachDash: 'coach/dashboard/',
  coachTeam: 'coach/team/',
  coachPlayers: 'coach/player/',
  getPlayers: 'coach/player/list/',
  createTeam: 'team/create',
  addPlayerTo: 'team/update/team/members/',
  removePlayerTo: 'team/remove/team/members/',
  comparePlayers: 'coach/player/compare/',
  coachGetPlayersForProfile: 'coach/dashboard/player/',
  getChallengesListForCoach: 'plan/list',
  getSubscriptionInfoById: 'subscription/',
  createChallenegeForMultiplePayer: 'subscription/create/multiple',
  coachChallengeList: 'coach/challenges/',
  getChallengeInfoWithPlayerList: 'subscription/detail/coach/',


  //Chat
  createChannel: 'message/channels',
  messageStream: 'message/chats/stream/',
  postMessage: 'message/chats',   //'message/chats', url changed
  chatUserList: 'message/',
  getInitialMessage: 'message/channel/',
  teamInviteAction: 'team/approve/team/members/',
  postBulkMessage: 'message/bulk/create',

  //new design api
  coachRoles: 'admin/list?type=TEAM_COACH_ROLES',
  positions: 'admin/list?type=POSITIONS',
  checkSubscription: '/player/roadToPro/',
  teamRoles: 'team/roles/',
  removeCoachRole: 'team/remove/member/role/',
  inviteCoach: 'team/invite/coach',
  roadToPro: 'admin/list?type=ROAD_TO_PRO',
  coachRoadToPro: 'admin/list?type=COACH',
  coachNewTeam: 'coach/team/',
  teamStats: 'team/stats/',
  teamTabPlayerList: 'team/player/',
  teamTabGameList: 'team/game/',
  newPlayerCompare: 'player/compare/',
  exploreSearch: 'search/',
  playerForShare: 'coach/list/players/share/',
  logOut: 'user/logout/',


};

export const USER_AUTH = 'USER_AUTH';
export const USER_TOKEN = 'USER_TOKEN';

export const SHOW_SHARE_SCREEN = {
  show: false,
};

export const userToken = {
  DEVICE_TOKEN: '',
};

export class UserModel {

  constructor() {
    selectedUserType,
      selectedSportPosition,
      isAdult,
      parentNameOrNum,
      email,
      password,
      fname,
      lname,
      city,
      state,
      school,
      classof,
      dob,
      aboutMe,
      profileUrl,
      photoIdUrl,
      isVerfied,
      coachCertiUrl,
      fid,
      isSocialLogin,
      isProfileUploaded
  }

}

export const SenderRecevrModel = {
  senderId: '',
  senderName: '',
  senderProfilePic: '',
  senderType: '',

  receiverId: '',
  receiverName: '',
  receiverProfilePic: '',
  receiverType: '',
}

export const CoachChallenegeApproveData = {
  attempData: []
}


