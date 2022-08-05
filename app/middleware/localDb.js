import Realm, { schemaVersion } from "realm";


const EventSchema = {
  name: "game_event",
  properties: {
    _id: { type: 'int' },
    firstPlayerId: { type: 'int' },
    secondPlayerId: { type: 'int', optional: true, },
    gameAction: { type: 'string' },
    eventTime: { type: 'int' },
    court: { type: 'string', optional: true },
    courtXCoord: { type: 'string', optional: true },
    courtYCoord: { type: 'string', optional: true },
    quarter: { type: 'string' },
  },
  primaryKey: "_id",
};

async function insertEvent(data) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/Events',
    schema: [EventSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  })
  debugger
  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create("game_event", data)
      console.log("data inserted---")
      // console.log(task._id)
      // console.log(task.firstPlayerId)
      // console.log(task.secondPlayerId)
      // console.log(task.gameAction)
      // console.log(task.eventTime)
      // console.log(task.court)
    })

    const res = realm.objects("game_event")
    console.log("data retrive---", res.length)
    let resData = []
    res.forEach((obj) => {
      let dataObj = {
        _id: obj._id,
        firstPlayerId: obj.firstPlayerId,
        secondPlayerId: obj.secondPlayerId,
        gameAction: obj.gameAction,
        eventTime: obj.eventTime,
        court: obj.court,
        courtXCoord: obj.courtXCoord,
        courtYCoord: obj.courtYCoord,
        quarter: obj.quarter,
      }
      console.log("data objj---", dataObj);
    })
    console.log("Data_arrr--", resData);
    // 
    // for (const obj in res) {
    //   
    //   console.log("data objj---", dataObj);
    //   resData.push(dataObj);
    // }
    // 
    realm.close();
  }
  realm.close();
}

const BlueTeamPlayerScoreSchema = {
  name: "blue_team_player_score",
  properties: {
    _id: { type: 'int' },
    teamId: { type: 'string', optional: true },
    playerScore: { type: 'list', objectType: 'string' },
    // playerId: { type: 'string' },

    // jerseyNumber: { type: 'int' },
    // ast: { type: 'int', optional: true },
    // pts: { type: 'int', optional: true },
    // reb: { type: 'int', optional: true },
    // stl: { type: 'int', optional: true },
    // blk: { type: 'int', optional: true },
    // foul: { type: 'int', optional: true },
    // freeThrowCount: { type: 'int', optional: true },
    // freeThrowMadeCount: { type: 'int', optional: true },
    // freeThrowMissedCount: { type: 'int', optional: true },
    quarter: { type: 'string' },
  },
  primaryKey: "_id",
};

async function insertBluePlayerScore(data) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/PlayerScore',
    schema: [BlueTeamPlayerScoreSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  })
  debugger
  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create("blue_team_player_score", data, "modified")
      console.log("player data inserted---", task)
      // console.log(task._id)
      // console.log(task.playerId)
    })

    const res = realm.objects("blue_team_player_score")
    console.log("data retrive---", res.length)
    let resData = []
    res.forEach((obj) => {
      let playerScore = []
      console.log("scorelen", obj.playerScore.length)

      obj.playerScore.map((obj1) => {
        playerScore.push(JSON.parse(obj1));
      })
      // console.log("playerrr", playerScore)

      let dataObj = {
        _id: obj._id,
        teamId: obj.teamId,
        playerScore: playerScore,
        quarter: obj.quarter,
      }
      console.log("data objj---", dataObj);
    })
    console.log("Data_arrr--", resData);

    realm.close();
  }
  realm.close();
}

const RedTeamPlayerScoreSchema = {
  name: "red_team_player_score",
  properties: {
    _id: { type: 'int' },
    teamId: { type: 'string', optional: true },
    playerScore: { type: 'list', objectType: 'string' },
    // playerId: { type: 'string' },

    // jerseyNumber: { type: 'int' },
    // ast: { type: 'int', optional: true },
    // pts: { type: 'int', optional: true },
    // reb: { type: 'int', optional: true },
    // stl: { type: 'int', optional: true },
    // blk: { type: 'int', optional: true },
    // foul: { type: 'int', optional: true },
    // freeThrowCount: { type: 'int', optional: true },
    // freeThrowMadeCount: { type: 'int', optional: true },
    // freeThrowMissedCount: { type: 'int', optional: true },
    quarter: { type: 'string' },
  },
  primaryKey: "_id",
};

async function insertRedPlayerScore(data) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/PlayerScore',
    schema: [RedTeamPlayerScoreSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  })
  debugger
  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create("red_team_player_score", data, "modified")
      console.log("player data inserted---", task)
      // console.log(task._id)
      // console.log(task.playerId)
    })
    realm.close();
  }
  realm.close();
}


const TeamScoreSchema = {
  name: "team_score",
  properties: {
    _id: { type: 'int' },
    teamId: { type: 'string' },
    isChallenger: { type: 'bool' },
    currentScore: { type: 'int' },
    quarter: { type: 'string' },
  },
  primaryKey: "_id",
};

async function insertTeamScore(data) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/TeamScore',
    schema: [TeamScoreSchema],
    deleteRealmIfMigrationNeeded: true,
    // schemaVersion: 1,
    //   migration: (oldRealm, newRealm) => {
    //     if(oldRealm.schemaVersion < 2){
    //         const oldObjects = oldRealm.objects('game_event');
    //         const newObjects = newRealm.objects('game_event');
    //         // loop through all objects and set the _id property in the new schema
    //         for (const objectIndex in oldObjects) {
    //           const oldObject = oldObjects[objectIndex];
    //           const newObject = newObjects[objectIndex];
    //         }
    //     }
    // },
  })
  debugger
  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create("team_score", data, "modified")
      console.log("team score inserted---")
      console.log(task._id)
      console.log(task.teamId)
    })
    realm.close();
  }
  realm.close();
}


async function getEventDataFromRealm(cb) {
  const realm = await Realm.open({
    path: 'NextUpLocalDB/Events',
    schema: [EventSchema],
  })

  if (realm) {
    let task;
    const res = realm.objects('game_event')

    // console.log("event data retrive---", res)
    let resData = []
    if (res) {
      res.forEach((obj) => {
        let res_obj = {
          _id: obj._id,
          firstPlayerId: obj.firstPlayerId,
          secondPlayerId: obj.secondPlayerId,
          gameAction: obj.gameAction,
          eventTime: obj.eventTime,
          court: obj.court,
          courtXCoord: obj.courtXCoord,
          courtYCoord: obj.courtYCoord,
          quarter: obj.quarter,
        }
        resData.push(res_obj)
      })

    }
    realm.close();
    cb(true, resData);
  }
}


export {
  insertEvent, insertBluePlayerScore,
  insertRedPlayerScore, insertTeamScore,
  getEventDataFromRealm
}