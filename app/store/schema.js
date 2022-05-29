
const homeSchema = {
  dashboardData: [],
  myStandingData: [],
  myTeamDetailData: [],
  leaderBoardData: [],
  gameDetailData: [],
  gameInfoTabData: [],
  calenderTabInfoData: [],
  roadToProData: [],
  //coach
  coachDash: [],
  coachTeam: [],
  coachPlayers: [],
  coachTeamPlayer: [],
  // coachTeamGames: []
};

const chatSchema = {
  chatUsersList: [],
  messageList: [],
};


export const Schemas = {

  HOME: homeSchema,
  MESSAGE: chatSchema,

};
