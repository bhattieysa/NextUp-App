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
    _id: { type: 'string' },
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
    _id: { type: 'string' },
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

async function getPlayerScoreFromRealm(cb) {
  let resData = []
  const realm = await Realm.open({
    path: 'NextUpLocalDB/PlayerScore',
    schema: [BlueTeamPlayerScoreSchema],
  })

  if (realm) {
    const res = realm.objects('blue_team_player_score')

    if (res) {
      res.forEach((obj) => {
        let playerSocreArr = [];
        obj.playerScore.map((obj1) => {
          playerSocreArr.push(JSON.parse(obj1));
        })

        let dataObj = {
          _id: obj._id,
          teamId: obj.teamId,
          playerScore: playerSocreArr,
          quarter: obj.quarter,
        }
        resData.push(dataObj)
      })

    }
    realm.close();
    // cb(true, resData);
  }
  const realm1 = await Realm.open({
    path: 'NextUpLocalDB/PlayerScore',
    schema: [RedTeamPlayerScoreSchema],
  })

  if (realm1) {
    const res = realm1.objects('red_team_player_score')
    if (res) {
      res.forEach((obj) => {
        let playerSocreArr = [];
        obj.playerScore.map((obj1) => {
          playerSocreArr.push(JSON.parse(obj1));
        })

        let dataObj = {
          _id: obj._id,
          teamId: obj.teamId,
          playerScore: playerSocreArr,
          quarter: obj.quarter,
        }
        resData.push(dataObj)
      })
    }
    realm1.close();
    cb(true, resData);
  }
}


const InitialDataSchema = {
  name: "initial_data",
  properties: {
    _id: { type: 'int' },
    initialData: { type: 'list', objectType: 'string' },
    activePlayer: { type: 'list', objectType: 'string' },
    isGameStarted: { type: 'bool', optional: true },
    currentQuarter: { type: 'string', optional: true },
  },
  primaryKey: "_id",
};

async function insertInitialData(data) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/InitialData',
    schema: [InitialDataSchema],
    deleteRealmIfMigrationNeeded: true,
  })
  debugger
  if (realm) {
    let task;
    realm.write(() => {
      task = realm.create("initial_data", data, "modified")
      console.log("team score inserted---")
      console.log(task._id)
    })
    realm.close();
  }
  realm.close();
}

async function getInitialData(cb) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/InitialData',
    schema: [InitialDataSchema],
  })
  debugger
  if (realm) {
    debugger
    const res = realm.objects('initial_data')
    let dataObj;
    debugger
    if (res) {
      debugger
      res.forEach((obj) => {
        dataObj = {
          _id: obj._id,
          initialData: JSON.parse(obj?.initialData[0]),
          activePlayer: JSON.parse(obj?.activePlayer[0]),
          isGameStarted: obj?.isGameStarted,
          currentQuarter: JSON.parse(obj?.currentQuarter),
        }
      })
      debugger
      if (dataObj != undefined) {
        debugger
        realm.close();
        cb(true, dataObj);
      } else {
        debugger
        realm.close();
        cb(false, []);
      }

    } else {
      realm.close();
      cb(false, []);
    }


  }
}


async function getTeamScore(cb) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/TeamScore',
    schema: [TeamScoreSchema],
  })
  if (realm) {
    const res = realm.objects('team_score')
    if (res) {
      debugger
      let score_arr = []
      res.forEach((obj) => {
        let dataObj = {
          _id: obj._id,
          teamId: obj.teamId,
          isChallenger: obj.isChallenger,
          currentScore: obj.currentScore,
          quarter: obj.quarter,
        }
        score_arr.push(dataObj)
      })
      debugger
      if (score_arr.length > 0) {
        debugger
        realm.close();
        cb(true, score_arr);
      } else {
        debugger
        realm.close();
        cb(false, score_arr);
      }

    } else {
      realm.close();
      cb(false, score_arr);
    }


  }
}


export {
  insertEvent, insertBluePlayerScore,
  insertRedPlayerScore, insertTeamScore,
  insertInitialData,
  getEventDataFromRealm,
  getPlayerScoreFromRealm,
  getInitialData,
  getTeamScore
}