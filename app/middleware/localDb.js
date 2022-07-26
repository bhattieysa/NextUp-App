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

    quarter: { type: 'string' },
  },
  primaryKey: "_id",
};

async function insertEvent(data) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/Events',
    schema: [EventSchema],
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
      console.log(task._id)
      console.log(task.firstPlayerId)
      console.log(task.secondPlayerId)
      console.log(task.gameAction)
      console.log(task.eventTime)
      console.log(task.court)
    })
    realm.close();
  }
  realm.close();
}

const PlayerScoreSchema = {
  name: "player_score",
  properties: {
    _id: { type: 'int' },
    playerId: { type: 'string' },
    jerseyNumber: { type: 'int' },
    ast: { type: 'int', optional: true },
    pts: { type: 'int', optional: true },
    reb: { type: 'int', optional: true },
    stl: { type: 'int', optional: true },
    blk: { type: 'int', optional: true },
    foul: { type: 'int', optional: true },
    freeThrowCount: { type: 'int', optional: true },
    freeThrowMadeCount: { type: 'int', optional: true },
    freeThrowMissedCount: { type: 'int', optional: true },
    quarter: { type: 'string' },
  },
  primaryKey: "_id",
};

async function insertPlayerScore(data) {
  debugger
  const realm = await Realm.open({
    path: 'NextUpLocalDB/PlayerScore',
    schema: [PlayerScoreSchema],
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
      task = realm.create("player_score", data, "modified")
      console.log("player data inserted---")
      console.log(task._id)
      console.log(task.playerId)
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

export { insertEvent, insertPlayerScore, insertTeamScore }