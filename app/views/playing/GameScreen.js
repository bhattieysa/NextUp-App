import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, StatusBar, Modal, FlatList, Platform } from 'react-native'
import { Colors, CommonStyles, Fonts, Layout } from "../../constants";
import PlayingGameScreenHeader from "../../components/common/playing_header/PlayingGameScreenHeader";
import DropDownModal from "../../components/common/playing_header/DropDownModal";
import PlayGroundBox from "../../components/common/cort/PlayGroundBox";
import { ActiveTeamPlayer, ScoreActiveTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import PlaygroundScreenBtn from "../../components/common/PlaygroundScreenBtn";
import { getGameInitialData, getTeamCurrentLineUp, sendEventData, sendPlayerScoreData } from '../../actions/home';
import { connect } from 'react-redux';
// import axios from "axios";
// import SyncStorage from 'sync-storage';
import Orientation from 'react-native-orientation-locker';
import { useDimensions } from '@react-native-community/hooks'
import AssistScreen from './AssistScreen';
import WasItFoul from './wasItFoul';
import MadeMissScreen from './MadeMissScreen';
import { DeffRebound } from './DeffRebound';
import { CourtMadeMissScreen } from './CourtMadeOrMissed';
import { StoleBy } from './StoleBy';
import { TurnOver } from './turnOver';
// import { BlurView } from '@react-native-community/blur';
// import { GameAppStatusBar } from '../../components/common/statusBar';
import { AssistFlow } from './assistFlow';
import { FoulBy } from './foul';
import { FoulType } from './foulOption';
import { Block } from './block';
import { FreeThrow } from './freeThrow';
import { CourtFoul } from './CourtFoul';
import { WhoShootFreeThrow } from './whoShootFreeThrow';
import { OffensiveFoulBy } from './offensiveFoul';
import { FreeThrowPlayerSelect } from './freeThrowPlayerSelect';
import { FreeThrowCount } from './freeThrowCount';
import {
  insertEvent, insertBluePlayerScore, insertRedPlayerScore,
  insertTeamScore, getEventDataFromRealm, getPlayerScoreFromRealm,
  insertInitialData,
  getInitialData,
  getTeamScore,
} from '../../middleware/localDb';
import { Court_ptr } from '../../constants/constant';
import { CourtRebound } from './CourtRebound';
import { OffRebound } from './OffRebound';


const { width, height } = Dimensions.get('window');
// const quarterList = [
//   {
//     name: 'Quarter 1',
//     value: "1st quarter"
//   },
//   {
//     name: 'Quarter 2',
//     value: '2nd quarter',
//   },
//   {
//     name: 'Quarter 3',
//     value: '3rd quarter'
//   },
//   {
//     name: 'Quarter 4',
//     value: '4th quarter'
//   }, {
//     name: 'end',
//     value: 'End of Game'
//   }
// ]


//Team List
let blueTeamList = []
let blueTeamListSub = []
let redTeamList = [];
let redTeamListSub = [];
let totalResponse = []
let lineup = [
  { description: "This Line up will change to Leading Plus Minus Lineup", name: "Leading Plus Minus Lineup", proposedLineUp: [{ "boxScore": null, "inSquad": true, "jerseyNumber": 2, "playerId": 165992130987, "playerKpi": null, "playerName": "Sumit Pal", "turnOverChartsValue": null }] }
]


const GameScreen = (props) => {
  const { width, height } = Dimensions.get('window');

  const [blueTeamPlayer, setBlueTeamPlayer] = useState('')
  const [redTeamPlayer, setRedTeamPlayer] = useState('')
  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const { btnEnable, setBtnEnable } = useState(false);
  const [preSelectedQuarter, setPreSelectedQuarter] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [challengerTeam, setChallengerTeam] = useState('');
  const [defenderTeam, setDefenderTeam] = useState('');

  const [currentView, setCurrentView] = useState('');
  const [activePlayer, setActivePlayer] = useState('')
  const [substitutes, setSubstitutes] = useState('')
  const [courtArea, setCourtArea] = useState('')
  //new flow stat
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [assistPlayer, setAssistPlayer] = useState('')
  const [reboundPlayer, setReboundPlayer] = useState('')
  const [stoleBy, setStoleBy] = useState('')
  const [foulBy, setFoulBy] = useState('')
  const [offensiveFoul, setOffensiveFoul] = useState('')
  const [courtFoul, setCourtFoul] = useState('')
  const [courtFreeThrow, setCourtFreeThrow] = useState('')
  const [foulType, setFoulType] = useState('')
  const [initMadeOrMissed, setInitMadeOrMissed] = useState();
  const [courtAreaClick, setCourtAreaClick] = useState();
  const [madeOrMised, setMadeOrMissed] = useState();
  const [assistMadeOrMised, setAssistMadeOrMised] = useState();
  const [blockBy, setBlockBy] = useState('');
  const [freeThrowPlayer, setFreeThrowPlayer] = useState('');
  const [freeThrowCount, setFreeThrowCount] = useState('');
  const [assistFlowPtr, setAssistFlowPtr] = useState('');

  const [event, setEvent] = useState([])
  const [isEventCompleted, setIsEventCompleted] = useState(false);
  const [typeOfEvent, setTypeOfEvent] = useState('');
  const [bluePlayerScore, setBluePlayerScore] = useState('')
  const [redPlayerScore, setRedPlayerScore] = useState('')
  const [blueTeamScore, setBlueTeamScore] = useState(0)
  const [redTeamScore, setRedTeamScore] = useState(0)
  const [assistFlowCurrentView, setAssistFlowCurrentView] = useState('')
  const [quarterList, setQuarterList] = useState('');
  const [gameId, setGameId] = useState('');
  const [eventId, setEventId] = useState('');
  // const [selected_quarter, setSelectedQuarter] = useState('');


  // useEffect(() => {
  //   debugger



  // }, []);

  useEffect(() => {
    if (isEventCompleted == true) {
      if (typeOfEvent != '') {
        handleEventInsert(typeOfEvent)
      }
    }
  }, [isEventCompleted])

  useEffect(() => {
    if (bluePlayerScore !== '' && bluePlayerScore !== undefined) {
      handleScoreInsert();
    }
  }, [bluePlayerScore])

  useEffect(() => {
    if (redPlayerScore !== '' && redPlayerScore !== undefined) {
      handleScoreInsert();
    }
  }, [redPlayerScore])

  useEffect(() => {
    if (blueTeamScore !== '' && blueTeamScore !== undefined) {
      handleBlueTeamScoreInsert()
    }
  }, [blueTeamScore])

  useEffect(() => {
    if (redTeamScore !== '' && redTeamScore !== undefined) {
      handleRedTeamScoreInsert()
    }
  }, [redTeamScore])

  const setDataToState = async (resData, cb) => {
    debugger
    const r = resData?.initialData;
    totalResponse = r;
    await setChallengerTeam(r.challengerTeamInfo)
    await setDefenderTeam(r.defenderTeamInfo)
    await setQuarterList(r.quarters)
    await setPreSelectedQuarter(resData?.currentQuarter)
    await setGameId(r.gameId)
    await setEventId(r.eventId)
    debugger

    setBlueTeamPlayer(resData?.activePlayer?.blueTeamList);
    blueTeamList = resData?.activePlayer?.blueTeamList;
    blueTeamListSub = resData?.activePlayer?.blueTeamListSub

    setRedTeamPlayer(resData?.activePlayer?.redTeamList);
    redTeamList = resData?.activePlayer?.redTeamList;
    redTeamListSub = resData?.activePlayer?.redTeamListSub
    cb(true);
  }

  useEffect(() => {
    debugger
    StatusBar.setHidden(true)
    Orientation.lockToLandscapeRight()
    getInitialData(async (initRes, resData) => {
      if (initRes) {
        debugger
        await setDataToState(resData, (res1) => {
          if (res1) {
            getTeamScore((score_res, scoreData) => {
              if (score_res) {
                scoreData.map((obj1) => {
                  if (obj1?.isChallenger == true) {
                    setBlueTeamScore(obj1?.currentScore);
                  } else {
                    setRedTeamScore(obj1?.currentScore);
                  }
                })
                setCurrentView('playing')
              } else {
                setCurrentView('playing')
              }
            })

          }
        })

      } else {
        props.dispatch(getGameInitialData(async (res, response) => {
          if (res) {
            debugger
            const r = response.data.data;
            totalResponse = r;
            await setChallengerTeam(r.challengerTeamInfo)
            await setDefenderTeam(r.defenderTeamInfo)
            await setQuarterList(r.quarters)
            await setPreSelectedQuarter(r.quarters[0])
            await setGameId(r.gameId)
            await setEventId(r.id)
            const bTeam = r.challengerTeamKpi.filter(bTeam => bTeam.inSquad == true).map((bTeam) => {
              return {
                jerseyNumber: bTeam.jerseyNumber,
                playerId: bTeam.playerId,
                playerProfilePictureUrl: bTeam.playerProfilePictureUrl,
                playerName: bTeam.playerName,
              }
            })

            let i = 0
            let teamList = []
            await bTeam.map(function (item) {
              teamList.push({
                "id": ++i,
                "number": item.jerseyNumber,
                "playerId": item.playerId,
                "jerseyNumber": item.jerseyNumber,
                "playerProfilePictureUrl": item.playerProfilePictureUrl,
                "playerName": item.playerName,
                "ast": 0,
                "pts": 0,
                "reb": 0,
                "stl": 0,
                "blk": 0,
                "fl": 0
              });
            })

            if (blueTeamList != teamList) {
              setBlueTeamPlayer(teamList);
              // setBlueTeamScore(0)
              blueTeamList = teamList
            }

            const rTeam = r.defenderTeamKpi.filter(rTeam => rTeam.inSquad == true).map((rTeam) => {
              return {
                jerseyNumber: rTeam.jerseyNumber,
                playerId: rTeam.playerId,
                playerProfilePictureUrl: rTeam.playerProfilePictureUrl,
                playerName: rTeam.playerName,
              }
            })

            i = 0
            teamList = []
            await rTeam.map(function (item) {
              teamList.push({
                "id": ++i,
                "number": item.jerseyNumber,
                "playerId": item.playerId,
                "jerseyNumber": item.jerseyNumber,
                "playerProfilePictureUrl": item.playerProfilePictureUrl,
                "playerName": item.playerName,
                "ast": 0,
                "pts": 0,
                "reb": 0,
                "stl": 0,
                "blk": 0,
                "fl": 0
              });
            })
            if (redTeamList != teamList) {
              setRedTeamPlayer(redTeamList)
              // setRedTeamScore(0)
              redTeamList = teamList

            }


            const bTeamSub = r.challengerTeamKpi.filter(bTeam => bTeam.inSquad == false).map((bTeam) => {
              return {
                jerseyNumber: bTeam.jerseyNumber,
                playerId: bTeam.playerId,
                playerProfilePictureUrl: bTeam.playerProfilePictureUrl,
                playerName: bTeam.playerName,
              }
            })

            i = 0
            let teamListSub = []
            await bTeamSub.map(function (item) {
              teamListSub.push({
                "id": ++i,
                "number": item.jerseyNumber,
                "playerId": item.playerId,
                "jerseyNumber": item.jerseyNumber,
                "playerProfilePictureUrl": item.playerProfilePictureUrl,
                "playerName": item.playerName,
                "ast": 0,
                "pts": 0,
                "reb": 0,
                "stl": 0,
                "blk": 0,
                "fl": 0
              });
            })

            if (blueTeamListSub != teamListSub)
              blueTeamListSub = teamListSub


            const rTeamSub = r.defenderTeamKpi.filter(rTeam => rTeam.inSquad == false).map((rTeam) => {
              return {
                jerseyNumber: rTeam.jerseyNumber,
                playerId: rTeam.playerId,
                playerProfilePictureUrl: rTeam.playerProfilePictureUrl,
                playerName: rTeam.playerName,
              }
            })

            i = 0
            teamListSub = []
            await rTeamSub.map(function (item) {
              teamListSub.push({
                "id": ++i,
                "number": item.jerseyNumber,
                "playerId": item.playerId,
                "jerseyNumber": item.jerseyNumber,
                "playerProfilePictureUrl": item.playerProfilePictureUrl,
                "playerName": item.playerName,
                "ast": 0,
                "pts": 0,
                "reb": 0,
                "stl": 0,
                "blk": 0,
                "fl": 0
              });
            })
            if (redTeamListSub != teamListSub)
              redTeamListSub = teamListSub


            let initData = {
              "challengerTeamInfo": r?.challengerTeamInfo,
              "challengerTeamKpi": r?.challengerTeamKpi,
              "coachId": r?.coachId,
              "court": r?.court,
              "defenderTeamInfo": r?.defenderTeamInfo,
              "defenderTeamKpi": r?.defenderTeamKpi,
              "gameId": r?.gameId,
              "eventId": r?.id,
              "gamesPoint": r?.gamesPoint,
              "loggingDate": r?.loggingDate,
              "quarters": r?.quarters,
            }

            let activePlayers = {
              "blueTeamList": blueTeamList,
              "redTeamList": redTeamList,
              "blueTeamListSub": blueTeamListSub,
              "redTeamListSub": redTeamListSub,
            }
            let initDataObj = {
              _id: 1,
              initialData: [JSON.stringify(initData)],
              activePlayer: [JSON.stringify(activePlayers)],
              isGameStarted: true,
              currentQuarter: JSON.stringify(r?.quarters[0]),
            }
            insertInitialData(initDataObj);
            setCurrentView('playing')

          } else {
            console.log('Error', error)
          }
        }))

      }
    })

    return () => {
      StatusBar.setHidden(false)
      Orientation.lockToPortrait()
    };
  }, [])

  const sendDataToServer = () => {
    updateInitData()
    setTimeout(() => {
      getEventDataFromRealm((res, dbData) => {
        if (res) {
          if (dbData.length > 0) {
            console.log("Event Data_arrr--", dbData.length);
            props.dispatch(sendEventData(eventId, dbData, (res1, resData) => {
              if (res1) {
                console.log("PlayerEventtt send")
                getPlayerScoreFromRealm((res2, playerData) => {
                  if (res2) {
                    if (playerData.length > 0) {
                      props.dispatch(sendPlayerScoreData(eventId, playerData, (res3, resData1) => {
                        if (res3) {
                          console.log("PlayerScore send")
                        }
                      }))
                    }
                    console.log("PlayerScoreee", resData)
                  }
                })
              }
            }))
          }
        }
      })
    }, 2000);

  }


  const updateInitData = () => {
    let initData = {
      "challengerTeamInfo": totalResponse?.challengerTeamInfo,
      "challengerTeamKpi": totalResponse?.challengerTeamKpi,
      "coachId": totalResponse?.coachId,
      "court": totalResponse?.court,
      "defenderTeamInfo": totalResponse?.defenderTeamInfo,
      "defenderTeamKpi": totalResponse?.defenderTeamKpi,
      "gameId": totalResponse?.gameId,
      "gamesPoint": totalResponse?.gamesPoint,
      "loggingDate": totalResponse?.loggingDate,
      "quarters": totalResponse?.quarters,
    }

    let activePlayers = {
      "blueTeamList": blueTeamList,
      "redTeamList": redTeamList,
      "blueTeamListSub": blueTeamListSub,
      "redTeamListSub": redTeamListSub,
    }
    let initDataObj = {
      _id: 1,
      initialData: [JSON.stringify(initData)],
      activePlayer: [JSON.stringify(activePlayers)],
      isGameStarted: true,
      currentQuarter: JSON.stringify(preSelectedQuarter),
    }
    debugger
    insertInitialData(initDataObj);
  }

  const handleBtnEnable = () => {
    if (activePlayer !== '' && activePlayer !== undefined && courtArea !== '' && courtArea !== undefined) {
      setBtnEnable(true);
    } else {
      setBtnEnable(false);
    }

  }

  const handleBlueTeamScore = (playerData, key) => {
    let pts_point = 0;
    if (key == 'pts') {
      if (courtAreaClick !== '' && courtAreaClick != undefined) {
        let selected_court = courtAreaClick.court_nm;
        if (Court_ptr.ptr2.includes(selected_court)) {
          pts_point = 2;
        } else {
          pts_point = 3;
        }
      }
    }
    debugger

    if (bluePlayerScore != '' && bluePlayerScore != null) {
      let playerScoreData = bluePlayerScore;
      let newPlayerData = [];
      debugger
      playerScoreData.forEach((itm) => {
        if (itm.playerId == playerData.playerId) {
          let obj = {
            "playerId": itm.playerId,
            "jerseyNumber": itm.jerseyNumber,
            "playerProfilePictureUrl": itm.playerProfilePictureUrl,
            "playerName": itm.playerName,
            "ast": key == 'ast' ? itm.ast + 1 : itm.ast,
            "pts": key == 'pts' ? itm.pts + pts_point : itm.pts,
            "reb": key == 'reb' ? itm.reb + 1 : itm.reb,
            "stl": key == 'stl' ? itm.stl + 1 : itm.stl,
            "blk": key == 'blk' ? itm.blk + 1 : itm.blk,
            "fl": key == 'fl' ? itm.fl + 1 : itm.fl,
          }
          debugger
          newPlayerData.push(obj);
        } else {
          newPlayerData.push(itm);
        }
      })

      let newBlueData = [];
      debugger
      blueTeamList.forEach((blObj) => {
        if (blObj.playerId == playerData.playerId) {
          let obj = {
            "id": blObj.id,
            "number": blObj.number,
            "playerId": blObj.playerId,
            "jerseyNumber": blObj.jerseyNumber,
            "playerProfilePictureUrl": blObj.playerProfilePictureUrl,
            "playerName": blObj.playerName,
            "ast": key == 'ast' ? blObj.ast + 1 : blObj.ast,
            "pts": key == 'pts' ? blObj.pts + pts_point : blObj.pts,
            "reb": key == 'reb' ? blObj.reb + 1 : blObj.reb,
            "stl": key == 'stl' ? blObj.stl + 1 : blObj.stl,
            "blk": key == 'blk' ? blObj.blk + 1 : blObj.blk,
            "fl": key == 'fl' ? blObj.fl + 1 : blObj.fl,
          }
          debugger
          newBlueData.push(obj);
        } else {
          newBlueData.push(blObj);
        }
      })
      debugger
      if (key == 'pts') {
        setBlueTeamScore(blueTeamScore + pts_point)
      }
      blueTeamList = newBlueData;
      debugger
      setBluePlayerScore(newPlayerData);

    } else {
      debugger
      let first_obj = {
        "playerId": playerData.playerId,
        "jerseyNumber": playerData.jerseyNumber,
        "playerProfilePictureUrl": playerData.playerProfilePictureUrl,
        "playerName": playerData.playerName,
        "ast": key == 'ast' ? 1 : 0,
        "pts": key == 'pts' ? pts_point : 0,
        "reb": key == 'reb' ? 1 : 0,
        "stl": key == 'stl' ? 1 : 0,
        "blk": key == 'blk' ? 1 : 0,
        "fl": key == 'fl' ? 1 : 0,
      }
      debugger

      // if (isEnabled == false) {
      let blueTeamData = blueTeamList;
      let newBlueData = [];
      blueTeamList.forEach((blObj) => {
        if (blObj.playerId == playerData.playerId) {
          let obj = {
            "id": blObj.id,
            "number": blObj.number,
            "playerId": blObj.playerId,
            "jerseyNumber": blObj.jerseyNumber,
            "playerProfilePictureUrl": blObj.playerProfilePictureUrl,
            "playerName": blObj.playerName,
            "ast": key == 'ast' ? blObj.ast + 1 : blObj.ast,
            "pts": key == 'pts' ? blObj.pts + pts_point : blObj.pts,
            "reb": key == 'reb' ? blObj.reb + 1 : blObj.reb,
            "stl": key == 'stl' ? blObj.stl + 1 : blObj.stl,
            "blk": key == 'blk' ? blObj.blk + 1 : blObj.blk,
            "fl": key == 'fl' ? blObj.fl + 1 : blObj.fl,
          }
          debugger
          newBlueData.push(obj);

        } else {
          debugger
          newBlueData.push(blObj);
        }
      })
      debugger
      if (key == 'pts') {
        setBlueTeamScore(pts_point);

      }
      blueTeamList = newBlueData;
      setBluePlayerScore([first_obj]);
    }
    // handleScoreInsert()
  }

  const handleRedTeamScore = (playerData, key) => {
    let pts_point = 0;
    if (key == 'pts') {
      if (courtAreaClick !== '' && courtAreaClick != undefined) {
        let selected_court = courtAreaClick.court_nm;
        if (Court_ptr.ptr2.includes(selected_court)) {
          pts_point = 2;
        } else {
          pts_point = 3;
        }
      }
    }
    debugger

    if (redPlayerScore != '' && redPlayerScore != null) {
      let playerScoreData = redPlayerScore;
      let newPlayerData = [];
      debugger
      playerScoreData.forEach((itm) => {
        if (itm.playerId == playerData.playerId) {
          let obj = {
            "playerId": itm.playerId,
            "jerseyNumber": itm.jerseyNumber,
            "playerProfilePictureUrl": itm.playerProfilePictureUrl,
            "playerName": itm.playerName,
            "ast": key == 'ast' ? itm.ast + 1 : itm.ast,
            "pts": key == 'pts' ? itm.pts + pts_point : itm.pts,
            "reb": key == 'reb' ? itm.reb + 1 : itm.reb,
            "stl": key == 'stl' ? itm.stl + 1 : itm.stl,
            "blk": key == 'blk' ? itm.blk + 1 : itm.blk,
            "fl": key == 'fl' ? itm.fl + 1 : itm.fl,
          }
          debugger
          newPlayerData.push(obj);
        } else {
          newPlayerData.push(itm);
        }
      })


      // let redTeamData = redTeamList;
      let newRedData = [];
      redTeamList.forEach((rdObj) => {
        if (rdObj.playerId == playerData.playerId) {
          let obj = {
            "id": rdObj.id,
            "number": rdObj.number,
            "playerId": rdObj.playerId,
            "jerseyNumber": rdObj.jerseyNumber,
            "playerProfilePictureUrl": rdObj.playerProfilePictureUrl,
            "playerName": rdObj.playerName,
            "ast": key == 'ast' ? rdObj.ast + 1 : rdObj.ast,
            "pts": key == 'pts' ? rdObj.pts + pts_point : rdObj.pts,
            "reb": key == 'reb' ? rdObj.reb + 1 : rdObj.reb,
            "stl": key == 'stl' ? rdObj.stl + 1 : rdObj.stl,
            "blk": key == 'blk' ? rdObj.blk + 1 : rdObj.blk,
            "fl": key == 'fl' ? rdObj.fl + 1 : rdObj.fl,
          }
          newRedData.push(obj);
        } else {
          newRedData.push(rdObj);
        }
      })
      if (key == 'pts') {
        setRedTeamScore(redTeamScore + pts_point)
      }
      redTeamList = newRedData;
      // }
      debugger
      setRedPlayerScore(newPlayerData);

    } else {
      debugger
      let first_obj = {
        "playerId": playerData.playerId,
        "jerseyNumber": playerData.jerseyNumber,
        "playerProfilePictureUrl": playerData.playerProfilePictureUrl,
        "playerName": playerData.playerName,
        "ast": key == 'ast' ? 1 : 0,
        "pts": key == 'pts' ? pts_point : 0,
        "reb": key == 'reb' ? 1 : 0,
        "stl": key == 'stl' ? 1 : 0,
        "blk": key == 'blk' ? 1 : 0,
        "fl": key == 'fl' ? 1 : 0,
      }
      debugger
      // let redTeamData = redTeamList;
      let newRedData = [];
      redTeamList.forEach((rdObj) => {
        if (rdObj.playerId == playerData.playerId) {
          let obj = {
            "id": rdObj.id,
            "number": rdObj.number,
            "playerId": rdObj.playerId,
            "jerseyNumber": rdObj.jerseyNumber,
            "playerProfilePictureUrl": rdObj.playerProfilePictureUrl,
            "playerName": rdObj.playerName,
            "ast": key == 'ast' ? rdObj.ast + 1 : rdObj.ast,
            "pts": key == 'pts' ? rdObj.pts + pts_point : rdObj.pts,
            "reb": key == 'reb' ? rdObj.reb + 1 : rdObj.reb,
            "stl": key == 'stl' ? rdObj.stl + 1 : rdObj.stl,
            "blk": key == 'blk' ? rdObj.blk + 1 : rdObj.blk,
            "fl": key == 'fl' ? rdObj.fl + 1 : rdObj.fl,
          }
          newRedData.push(obj);
        } else {
          newRedData.push(rdObj);
        }
      })
      if (key == 'pts') {
        setRedTeamScore(pts_point);
      }
      redTeamList = newRedData;
      debugger
      setRedPlayerScore([first_obj]);
    }

  }

  const handlePlayerScore = (playerData, key) => {
    if (isEnabled == false) {
      handleBlueTeamScore(playerData, key);
    } else {
      handleRedTeamScore(playerData, key);
    }

  }

  const handleScoreInsert = () => {
    debugger
    // if (red != '' && playerScore != null) {
    let playerScore_arr = []
    if (isEnabled == false) {
      bluePlayerScore.forEach(obj => {
        debugger
        let score_obj = {
          playerId: obj.playerId.toString(),
          jerseyNumber: parseInt(obj.jerseyNumber),
          playerProfilePictureUrl: obj.playerProfilePictureUrl,
          playerName: obj.playerName,
          kpi: {
            ast: parseInt(obj.ast),
            pts: parseInt(obj.pts),
            reb: parseInt(obj.reb),
            stl: parseInt(obj.stl),
            blk: parseInt(obj.blk),
            foul: parseInt(obj.fl),
          },

          // freeThrowCount: parseInt(obj.ast),
          // freeThrowMadeCount: parseInt(obj.ast),
          // freeThrowMissedCount: parseInt(obj.ast),
          quarter: preSelectedQuarter.name
        }
        playerScore_arr.push(JSON.stringify(score_obj));
      });
    } else {
      redPlayerScore.forEach(obj => {
        debugger
        let score_obj = {
          playerId: obj.playerId.toString(),
          jerseyNumber: parseInt(obj.jerseyNumber),
          playerProfilePictureUrl: obj.playerProfilePictureUrl,
          playerName: obj.playerName,
          kpi: {
            ast: parseInt(obj.ast),
            pts: parseInt(obj.pts),
            reb: parseInt(obj.reb),
            stl: parseInt(obj.stl),
            blk: parseInt(obj.blk),
            foul: parseInt(obj.fl),
          },

          // freeThrowCount: parseInt(obj.ast),
          // freeThrowMadeCount: parseInt(obj.ast),
          // freeThrowMissedCount: parseInt(obj.ast),
          quarter: preSelectedQuarter.name
        }
        playerScore_arr.push(JSON.stringify(score_obj));
      });
    }

    let data;
    if (isEnabled == false) {
      let id = 0;
      data = {
        _id: preSelectedQuarter.name,
        teamId: challengerTeam?.teamId.toString(),
        playerScore: playerScore_arr,
        quarter: preSelectedQuarter.name
      }
      insertBluePlayerScore(data);
    } else {
      data = {
        _id: preSelectedQuarter.name,
        teamId: defenderTeam?.teamId.toString(),
        playerScore: playerScore_arr,
        quarter: preSelectedQuarter.name
      }
      insertRedPlayerScore(data)
    }
    // }
  }

  const handleBlueTeamScoreInsert = () => {
    if (blueTeamScore != '' && blueTeamScore != null) {
      let data = {
        _id: parseInt(challengerTeam?.teamId),
        teamId: challengerTeam?.teamId.toString(),
        isChallenger: true,
        currentScore: blueTeamScore,
        quarter: "Quarter1"
      }
      debugger
      insertTeamScore(data);
    }
  }

  const handleRedTeamScoreInsert = () => {
    if (redTeamScore != '' && redTeamScore != null) {
      let data = {
        _id: parseInt(defenderTeam?.teamId),
        teamId: defenderTeam?.teamId.toString(),
        isChallenger: false,
        currentScore: redTeamScore,
        quarter: "Quarter1"
      }
      debugger
      insertTeamScore(data);
    }
  }


  // [made -90909, SCORED-90909, ASSIST-01010, FOUL-YES-0101, FREE THROW-Made-01010, ]
  const handleEventInsert = (key) => {
    debugger
    let data;
    if (key == 'court_score') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(selectedPlayer.playerId),
        secondPlayerId: parseInt(assistPlayer.playerId),
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        court: courtAreaClick.court_nm,
        courtXCoord: courtAreaClick.x.toString(),
        courtYCoord: courtAreaClick.y.toString(),
        quarter: "quarter1"
      }
    } else if (key == 'court_score_missed') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(selectedPlayer.playerId),
        secondPlayerId: parseInt(reboundPlayer.playerId),
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        court: courtAreaClick.court_nm,
        quarter: "quarter1"
      }
    } else if (key == 'deff_reb') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(reboundPlayer.playerId),
        // secondPlayerId: null,
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'off_reb') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(reboundPlayer.playerId),
        // secondPlayerId: null,
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'assist') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(reboundPlayer.playerId),
        // secondPlayerId: null,
        gameAction: `[Def_REBOUND_${reboundPlayer.playerId}]`.toString(),
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'steal') {
      debugger
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(stoleBy.playerId),
        // secondPlayerId: null,
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'block') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(blockBy.playerId),
        // secondPlayerId: null,
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'off_foul') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(offensiveFoul.playerId),
        // secondPlayerId: null,
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'foul') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(foulBy.playerId),
        // secondPlayerId: null,
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'freeThrow') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(freeThrowPlayer.playerId),
        // secondPlayerId: null,
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: null,
        quarter: "quarter1"
      }
    } else if (key == 'assist_flow') {
      data = {
        "_id": Date.now(),
        firstPlayerId: parseInt(selectedPlayer.playerId),
        secondPlayerId: parseInt(assistPlayer.playerId),
        gameAction: `[${event}]`,
        eventTime: Date.now(),
        // court: courtAreaClick.court_nm,
        quarter: "quarter1"
      }
    }
    insertEvent(data);
    setIsEventCompleted(false)
  }



  const switchView = () => {
    debugger
    switch (currentView) {
      default:
      case "playing":
        return <PlayingGameScreen isEnabled={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer} activePlayer={activePlayer}
          quarter={preSelectedQuarter} setCourtArea={setCourtArea}
          courtArea={courtArea}
          handleBtnEnable={handleBtnEnable}
          btnEnable={btnEnable}
          setCourtAreaClick={setCourtAreaClick}
          courtAreaClick={courtAreaClick}
          madeOrMised={madeOrMised}
          setPlayerScore={handlePlayerScore}
          blueTeamScore={blueTeamScore}
          redTeamScore={redTeamScore}
        />
      case "substitute":
        return <SubstitutePlayer
          setCurrentView={setCurrentView}
          isEnabled={isEnabled}
          event={event}
          setEvent={setEvent}
          preSelectedQuarter={preSelectedQuarter}
          handleScoreInsert={handleScoreInsert}
          handleRedTeamScoreInsert={handleRedTeamScoreInsert}
          handleBlueTeamScoreInsert={handleBlueTeamScoreInsert}


        />
      case "changelineup":
        return <ChangeLineUp
          setCurrentView={setCurrentView}
          isEnabled={isEnabled}
          mainProp={props}
          eventId={eventId}
          gameId={gameId}
          teamID={isEnabled == false ? challengerTeam?.teamId : defenderTeam?.teamId}

        />
      case "pass":
        return <PassScreen
          activePlayerId={activePlayer}
          playersList={!isEnabled ? redTeamList : blueTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}
          isBlueTeamPlaying={!isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
        />
      case "foul":
        return <PassScreen
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
        />

      case "shootScore":
        return <ShootScore
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          title={"Who Scored"}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
        />

      case "assistScreen":
        return <AssistScreen
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          setSelectedPlayer={setSelectedPlayer}
          setAssistPlayer={setAssistPlayer}
          selectedPlayer={selectedPlayer}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          clickedCourtArea={courtAreaClick}

        />

      case "throwScreen":
        return <WasItFoul
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}

          // setSelectedPlayer={setSelectedPlayer}
          setAssistPlayer={setAssistPlayer}
          selectedAssistPlayer={assistPlayer}
          selectedPlayer={selectedPlayer}
          clickedCourtArea={courtAreaClick}
          madeOrMissed={madeOrMised}
          setMadeOrMissed={setMadeOrMissed}
          initMadeOrMissed={initMadeOrMissed}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setIsEventCompleted={setIsEventCompleted}

        />

      case "courtFoul":
        return <CourtFoul
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          selectedPlayer={activePlayer}
          setCourtFoul={setCourtFoul}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
        />

      case "whoShootFreeThrow":
        return <WhoShootFreeThrow
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          selectedPlayer={activePlayer}
          setCourtFreeThrow={setCourtFreeThrow}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
        />

      case "madeMissedScreen":
        return <MadeMissScreen
          // playersList={isEnabled ? blueTeamList : redTeamList}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}

          // setSelectedPlayer={setSelectedPlayer}
          setAssistPlayer={setAssistPlayer}
          selectedAssistPlayer={assistPlayer}
          selectedPlayer={selectedPlayer}
          clickedCourtArea={courtAreaClick}
          madeOrMissed={madeOrMised}
          setMadeOrMissed={setMadeOrMissed}
          initMadeOrMissed={initMadeOrMissed}
          courtFreeThrowPlayer={courtFreeThrow}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          // setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}

        />

      case "deffRebound":
        return <DeffRebound
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          reboundPlayer={reboundPlayer}
          setReboundPlayer={setReboundPlayer}
          title={'Who Rebounded'}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}

        />

      case "offRebound":
        return <OffRebound
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          reboundPlayer={reboundPlayer}
          setReboundPlayer={setReboundPlayer}
          title={'Who Rebounded'}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}

        />

      case "initMadeMissedScreen":
        return <CourtMadeMissScreen
          // playersList={isEnabled ? blueTeamList : redTeamList}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          // setAssistPlayer={setAssistPlayer}
          // selectedAssistPlayer={assistPlayer}
          selectedPlayer={selectedPlayer}
          clickedCourtArea={courtAreaClick}
          // madeOrMissed={madeOrMised}
          // setMadeOrMissed={setMadeOrMissed}
          setInitMadeOrMissed={setInitMadeOrMissed}
          event={event}
          setEvent={setEvent}
          setTypeOfEvent={setTypeOfEvent}
        />

      case "whoShot":
        return <ShootScore
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          title={"Who shot the ball"}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
        />
      case "gotRebound":
        return <CourtRebound
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          reboundPlayer={reboundPlayer}
          setReboundPlayer={setReboundPlayer}
          title={'Who got the rebound'}
          setPlayerScore={handlePlayerScore}
          clickedCourtArea={courtAreaClick}
          madeOrMissed={madeOrMised}
          setMadeOrMissed={setMadeOrMissed}
          initMadeOrMissed={initMadeOrMissed}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}
        />

      case "stoleBy":
        return <StoleBy
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          setStoleBy={setStoleBy}
          // reboundPlayer={reboundPlayer}
          // setReboundPlayer={setReboundPlayer}
          title={'Who stolen'}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}
        />

      case "stoleByTurnOver":
        return <StoleBy
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          setStoleBy={setStoleBy}
          // reboundPlayer={reboundPlayer}
          // setReboundPlayer={setReboundPlayer}
          title={'Who stolen'}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}
        />

      case "turnOverView":
        return <TurnOver
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          selectedPlayer={selectedPlayer}
        />

      case "offensiveFoulBy":
        return <OffensiveFoulBy
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          setOffensiveFoul={setOffensiveFoul}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}

        />

      case "assistFlow":
        return <AssistFlow
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          setSelectedPlayer={setSelectedPlayer}
          setAssistPlayer={setAssistPlayer}
          assistMadeOrMised={assistMadeOrMised}
          setAssistMadeOrMised={setAssistMadeOrMised}
          setCourtFoul={setCourtFoul}
          setCourtFreeThrow={setCourtFreeThrow}
          courtFreeThrowPlayer={courtFreeThrow}
          setPlayerScore={handlePlayerScore}
          setAssistFlowPtr={setAssistFlowPtr}
          event={event}
          setEvent={setEvent}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}
          setAssistFlowCurrentView={setAssistFlowCurrentView}
          assistFlowCurrentView={assistFlowCurrentView}
          setCourtAreaClick={setCourtAreaClick}
          courtAreaClick={courtAreaClick}
          selectedPlayer={selectedPlayer}
          selectedAssistPlayer={assistPlayer}


        />

      case "foulBy":
        return <FoulBy
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          setFoulBy={setFoulBy}
          // reboundPlayer={reboundPlayer}
          // setReboundPlayer={setReboundPlayer}
          // title={'Who stolen'}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          // handleEventInsert={handleEventInsert}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}
        />

      case "foulType":
        return <FoulType
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          setFoulType={setFoulType}
        // reboundPlayer={reboundPlayer}
        // setReboundPlayer={setReboundPlayer}
        // title={'Who stolen'}
        />

      case "blockBy":
        return <Block
          playersList={!isEnabled ? blueTeamList : redTeamList}
          // playersList={isEnabled ? redTeamPlayer : blueTeamPlayer}

          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          // title={'Who got the rebound'}
          setBlockBy={setBlockBy}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          setTypeOfEvent={setTypeOfEvent}
          setIsEventCompleted={setIsEventCompleted}
        // handleEventInsert={handleEventInsert}
        />

      case "freeThrowPlayerSelect":
        return <FreeThrowPlayerSelect
          playersList={!isEnabled ? blueTeamList : redTeamList}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          selectedPlayer={activePlayer}
          setFreeThrowPlayer={setFreeThrowPlayer}
          setPlayerScore={handlePlayerScore}
          event={event}
          setEvent={setEvent}
          setTypeOfEvent={setTypeOfEvent}

        />

      case "freeThrowCount":
        return <FreeThrowCount
          playersList={!isEnabled ? blueTeamList : redTeamList}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          reboundPlayer={reboundPlayer}
          setFreeThrowCount={setFreeThrowCount}
          event={event}
          setEvent={setEvent}
        // title={'Who got the rebound'}

        />

      case "freeThrow":
        return <FreeThrow
          playersList={!isEnabled ? blueTeamList : redTeamList}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          // setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
          // setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={activePlayer}
          freeThrowCount={freeThrowCount}
          freeThrowPlayer={freeThrowPlayer}
          event={event}
          setEvent={setEvent}
          handleEventInsert={handleEventInsert}
          setIsEventCompleted={setIsEventCompleted}
        // title={'Who got the rebound'}
        />

    }
  }

  const _renderSessionList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          height: 50, marginTop: 10, borderBottomWidth: 1,
          borderBottomColor: Colors.newGrayFontColor
        }}
      // onPress={() => this.setState({ dropDownSelectedVal: item.item.session }, () => {
      //   const { coachDash } = this.props.Home;
      //   this._filterPieChartData(coachDash.teamDetailInfo);
      // })}
      >
        <Text style={{
          color: Colors.light, fontSize: 13, lineHeight: 14,
          fontFamily: Fonts.Bold,
        }}>{item.item.session}</Text>

      </TouchableOpacity>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: Colors.base, }}>
      {/* <GameAppStatusBar hidden /> */}
      {/* <StatusBar hidden backgroundColor="transparent" translucent /> */}

      {preSelectedQuarter != undefined && preSelectedQuarter != '' ?
        <PlayingGameScreenHeader
          blueTeamScore={challengerTeam.score}
          redTeamScore={defenderTeam.score}
          blueTeamNewScore={blueTeamScore}
          redTeamNewScore={redTeamScore}
          blueTeamCaptain={challengerTeam.name}
          redTeamCaptain={defenderTeam.name}
          // redTeamClubName=""
          // blueTeamClubName=""
          nav={currentView}
          setView={setCurrentView}
          assistFlowCurrentView={assistFlowCurrentView}
          setAssistFlowCurrentView={setAssistFlowCurrentView}
          round={preSelectedQuarter}
          onPressQuarter={() => {
            setDropDownVisibility(true)
          }}
          toggleSwitch={toggleSwitch}
          isEnabled={isEnabled}
          style={{
            height: 60,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center'

          }}
        />
        : <></>
      }
      {currentView != '' ?
        <View style={{ width: '92%', marginTop: 8, marginLeft: 20 }}>
          {switchView()}
        </View>
        : <></>
      }

      {dropDownVisibility == true ?
        <TouchableOpacity style={{
          width: '100%', height: '100%',
          backgroundColor: '#00000066',
          position: 'absolute',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'row'
        }}
          onPress={() => setDropDownVisibility(false)}
        >
          <View style={{
            width: '30%',
            height: '60%',
            backgroundColor: Colors.base,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -5

          }}>
            <ScrollView showsVerticalScrollIndicator={false}
              style={{
                width: '90%',
                height: '90%',
                marginTop: 5,
                marginBottom: 10,

                // backgroundColor: 'red',

              }}
              contentContainerStyle={{ alignItems: 'center' }}
            >

              {quarterList.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      {
                        height: 40,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                      },
                      // preSelected === item && {
                      //     backgroundColor: Colors.lightRed,
                      // },
                    ]}
                    // key={inde}
                    onPress={() => {
                      setPreSelectedQuarter(item);
                      sendDataToServer();
                      setDropDownVisibility(false);
                    }}>
                    <Text
                      style={[
                        {
                          fontFamily: Fonts.Regular,
                          color: Colors.light,
                        },
                        preSelectedQuarter.name === item.name && { color: '#74C896' },
                      ]}>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

        </TouchableOpacity>
        : <></>
      }

      {/* <DropDownModal
        list={quarterList}
        visibility={dropDownVisibility}
        preSelected={preSelectedQuarter}
        onPress={(item) => {
          setPreSelectedQuarter(item.value);
          setDropDownVisibility(false);
        }}
        onPressOuter={() => setDropDownVisibility(false)}
      /> */}

      {/* {dropDownVisibility == true ?
        <Modal
          transparent={true} 
          visible={dropDownVisibility}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              backgroundColor: 'red'
              // backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            onPress={() => setDropDownVisibility(false)}>

            <Text style={{ fontSize: 20, }}>this is Modal</Text>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
              }}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: '#32353E',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}>
                {quarterList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={[
                        {
                          height: 40,
                          justifyContent: 'center',
                          paddingHorizontal: 20,
                        },
                        // preSelected === item && {
                        //     backgroundColor: Colors.lightRed,
                        // },
                      ]}
                      // key={inde}
                      onPress={() => {
                        setPreSelectedQuarter(item.value);
                        setDropDownVisibility(false);
                      }}>
                      <Text
                        style={[
                          {
                            fontFamily: Fonts.Regular,
                            color: Colors.light,
                          },
                          preSelectedQuarter === item.value && { color: '#74C896' },
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </TouchableOpacity>
        </Modal>
        : <></>} */}






    </View>
  )


}

const PassScreen = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;
  useEffect(() => {
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    currentView == "pass" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
      :
      toggleSwitch()

  };

  const passPlayer = (id) => {
    setCurrentView('playing');
    setActivePlayer(id);
  }

  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      {isBlueTeamPlaying ?
        <ActiveTeamPlayer
          itemStyle={{
            width: width / 7,
            height: width / 7,
            marginTop: 30,
            borderRadius: (width / 7) / 2,
          }}
          heading={"Fouled"}
          list={activePlayerList} isBlueTeam={isBlueTeamPlaying}
          onPress={(e) => passPlayer(e.id)} />

        :
        <ActiveTeamPlayer
          itemStyle={{
            width: width / 7,
            height: width / 7,
            marginTop: 30,
            borderRadius: (width / 7) / 2,
          }}
          heading={"Fouled"}
          list={activePlayerList} isBlueTeam={isBlueTeamPlaying}
          onPress={(e) => passPlayer(e.id)} />
      }

    </View>)
}

const SubstitutePlayer = ({ setCurrentView, isEnabled, response,
  preSelectedQuarter, handleScoreInsert, handleRedTeamScoreInsert,
  handleBlueTeamScoreInsert }) => {
  const styles = StyleSheet.create({
    bottomLineWhiteTxt: {
      color: Colors.light,
      fontFamily: Fonts.SemiBold,
    },
    bottomLineGreenTxt: {
      color: Colors.lightGreen,
      fontFamily: Fonts.SemiBold,
    }
  })

  const [active, setActive] = useState('')
  const [substitute, setSubstitute] = useState('')

  const updateLocalData = (cb) => {
    let activeCheck = active;
    activeCheck = activeCheck - 1;
    let substituteCheck = substitute;
    substituteCheck = substituteCheck - 1;
    debugger

    let player1
    let player2
    let teamId
    let firstPlayer
    let secondPlayer

    if (isEnabled) {
      player1 = redTeamList[activeCheck]?.playerId
      let playerObj = redTeamList[activeCheck]
      firstPlayer = {
        "id": substitute,
        "number": playerObj?.jerseyNumber,
        "playerId": playerObj?.playerId,
        "jerseyNumber": playerObj?.jerseyNumber,
        "playerProfilePictureUrl": playerObj?.playerProfilePictureUrl,
        "playerName": playerObj?.playerName,
        "ast": playerObj?.ast,
        "pts": playerObj?.pts,
        "reb": playerObj?.reb,
        "stl": playerObj?.stl,
        "blk": playerObj?.blk,
        "fl": playerObj?.fl,
      }
      player2 = redTeamListSub[substituteCheck]?.playerId
      let subPlayerObj = redTeamListSub[substituteCheck]
      secondPlayer = {
        "id": active,
        "number": subPlayerObj?.jerseyNumber,
        "playerId": subPlayerObj?.playerId,
        "jerseyNumber": subPlayerObj?.jerseyNumber,
        "playerProfilePictureUrl": subPlayerObj?.playerProfilePictureUrl,
        "playerName": subPlayerObj?.playerName,
        "ast": subPlayerObj?.ast,
        "pts": subPlayerObj?.pts,
        "reb": subPlayerObj?.reb,
        "stl": subPlayerObj?.stl,
        "blk": subPlayerObj?.blk,
        "fl": subPlayerObj?.fl,
      }
      teamId = totalResponse?.defenderTeamInfo.teamId
    } else {
      player1 = blueTeamList[activeCheck]?.playerId
      let playerObj = blueTeamList[activeCheck]
      firstPlayer = {
        "id": substitute,
        "number": playerObj?.jerseyNumber,
        "playerId": playerObj?.playerId,
        "jerseyNumber": playerObj?.jerseyNumber,
        "playerProfilePictureUrl": playerObj?.playerProfilePictureUrl,
        "playerName": playerObj?.playerName,
        "ast": playerObj?.ast,
        "pts": playerObj?.pts,
        "reb": playerObj?.reb,
        "stl": playerObj?.stl,
        "blk": playerObj?.blk,
        "fl": playerObj?.fl,
      }
      player2 = blueTeamListSub[substituteCheck]?.playerId
      let subPlayerObj = blueTeamListSub[substituteCheck]
      secondPlayer = {
        "id": active,
        "number": subPlayerObj?.jerseyNumber,
        "playerId": subPlayerObj?.playerId,
        "jerseyNumber": subPlayerObj?.jerseyNumber,
        "playerProfilePictureUrl": subPlayerObj?.playerProfilePictureUrl,
        "playerName": subPlayerObj?.playerName,
        "ast": subPlayerObj?.ast,
        "pts": subPlayerObj?.pts,
        "reb": subPlayerObj?.reb,
        "stl": subPlayerObj?.stl,
        "blk": subPlayerObj?.blk,
        "fl": subPlayerObj?.fl,
      }
      teamId = totalResponse?.challengerTeamInfo.teamId
    }
    debugger
    // const token = SyncStorage.get('token');

    const data = {
      "firstPlayerId": player1,
      "secondPlayerId": player2,
      "gameAction": "Substitute",
      "eventTime": Date.now(),
      "court": "COURT_1",
      "quarter": "QUARTER_1",
      "teamID": teamId
    }
    if (isEnabled == false) {
      let newBlueTeam = blueTeamList.filter(obj => {
        return obj.playerId != player1;
      })
      let newBlueSubTeam = blueTeamListSub.filter(obj1 => {
        return obj1.playerId != player2
      })
      debugger

      newBlueTeam.push(secondPlayer);
      newBlueSubTeam.push(firstPlayer);
      debugger
      blueTeamList = newBlueTeam;
      blueTeamListSub = newBlueSubTeam;
    } else {
      let newRedTeam = redTeamList.filter(obj => {
        return obj.playerId != player1;
      })
      let newRedSubTeam = redTeamListSub.filter(obj1 => {
        return obj1.playerId != player2
      })

      newRedTeam.push(secondPlayer);
      newRedSubTeam.push(firstPlayer);
      redTeamList = newRedTeam;
      redTeamListSub = newRedSubTeam;
    }
    cb(true)

  }

  const updateSubstitute = () => {
    updateLocalData((res) => {
      if (res) {
        debugger
        let initData = {
          "challengerTeamInfo": totalResponse?.challengerTeamInfo,
          "challengerTeamKpi": totalResponse?.challengerTeamKpi,
          "coachId": totalResponse?.coachId,
          "court": totalResponse?.court,
          "defenderTeamInfo": totalResponse?.defenderTeamInfo,
          "defenderTeamKpi": totalResponse?.defenderTeamKpi,
          "gameId": totalResponse?.gameId,
          "gamesPoint": totalResponse?.gamesPoint,
          "loggingDate": totalResponse?.loggingDate,
          "quarters": totalResponse?.quarters,
        }

        let activePlayers = {
          "blueTeamList": blueTeamList,
          "redTeamList": redTeamList,
          "blueTeamListSub": blueTeamListSub,
          "redTeamListSub": redTeamListSub,
        }
        let initDataObj = {
          _id: 1,
          initialData: [JSON.stringify(initData)],
          activePlayer: [JSON.stringify(activePlayers)],
          isGameStarted: true,
          currentQuarter: JSON.stringify(preSelectedQuarter),
        }
        debugger
        insertInitialData(initDataObj);
        handleScoreInsert()
        handleRedTeamScoreInsert()
        handleBlueTeamScoreInsert()
        setCurrentView('playing')
      }
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
        <View style={{ flex: 1.5 }}>
          <ScoreActiveTeamPlayer heading={"Select Player"}
            list={isEnabled == false ? blueTeamList : redTeamList}
            isBlueTeam={isEnabled}
            onPress={
              (e) => setActive(e.id)
            }
            activePlayer={active}
            isOtherShow={false}
          />
        </View>
        <View style={{ height: '100%', width: 1, backgroundColor: Colors.fontColorGray }} />
        <View style={{ flex: 3, paddingHorizontal: 30 }}>
          <ScoreActiveTeamPlayer
            heading={"Select Substitute"}
            list={isEnabled == false ? blueTeamListSub : redTeamListSub}
            isBlueTeam={isEnabled}
            onPress={
              (e) => setSubstitute(e.id)
            }
            activePlayer={substitute}
            isOtherShow={false}
          />

        </View>
      </View>
      {renderBottomLineAndBtn()}
    </ScrollView>)

  function renderBottomLineAndBtn() {
    return (
      <View style={{ width: '100%', marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

          <PlaygroundScreenBtn title="Substitute"
            style={{
              ...styles.btn, backgroundColor: Colors.lightGreen,
              marginVertical: 0, width: 150, height: 25, marginLeft: 25
            }}
            txtStyle={{ color: Colors.light }}
            onPress={() => updateSubstitute()}
          />
        </View>
      </View>)
  }


}

const ChangeLineUp = ({ eventId, teamID, gameId, setCurrentView, isEnabled, mainProp }) => {
  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    headingTxt: {
      fontSize: 14,
      color: Colors.light,
      fontFamily: Fonts.SemiBold,
    },
    rowItemContainer: {
      backgroundColor: Colors.lightBlue,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 15,
      flex: 1,
      marginHorizontal: 5,
      // width: (width / 2) / 6,
      // borderRadius: ((width / 2) / 6) / 2
    }, rowItemTxt: {
      fontSize: 18,
      color: Colors.light,
      fontFamily: Fonts.SemiBold,
      textAlign: 'center',
    },
    cardBottomTxt: {
      color: Colors.fontColorGray,
      fontFamily: Fonts.Regular,
      textAlign: 'center',
      marginTop: 10
    },
  })

  const [lineupList, setLineUpList] = useState([])
  const { width, height } = useDimensions().window;

  useEffect(() => {
    // const token = SyncStorage.get('token');

    console.log(blueTeamList)

    mainProp.dispatch(getTeamCurrentLineUp(eventId, teamID, gameId, (res, resData) => {
      if (res) {
        setLineUpList(resData.lineupList);
      }
    }))

    // axios.get('http://35.184.198.142:8085/v1/log/lineup/165584893449104/165225962766807/165584356686406', {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // })
    //     .then((response) => {
    //         setLineUpList(response.data.data.lineupList)


    //     })
    //     .catch(function (error) {
    //         console.log('Error', error)
    //     });
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingRight: 10 }}>
        <View>
          {renderCurrentLineUp("Current Lineup", isEnabled ? redTeamList : blueTeamList)}
        </View>
        <PlaygroundScreenBtn title="Substitute Lineup"
          style={{
            ...styles.btn, backgroundColor: Colors.lightGreen,
            width: 150, height: 25,
          }}
          txtStyle={{ color: Colors.light }}
          onPress={() => setCurrentView("playing")}
        />
      </View>
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <ScrollView style={{ flex: 1 }} showVerticalScroll={false}>

          {
            lineupList.map(element => {
              return (
                renderLineUpInCard(element.name, element, element.description)
              )
            })
          }

        </ScrollView>
      </View>
    </View>
  )


  function renderLineUp(heading, list) {
    return (
      <View style={{}}>
        <Text style={styles.headingTxt}>
          {heading}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          {list.filter(item => item.inSquad == true).map((item, index) => {
            return (
              <View key={index} style={{
                backgroundColor: isEnabled ? Colors.lightRed : Colors.lightBlue,
                paddingVertical: 2,
                paddingHorizontal: 8,
                borderRadius: 15,
                flex: 1,
                marginHorizontal: 5,
                // width: (width / 2) / 6,
                // borderRadius: ((width / 2) / 6) / 2
              }}>
                <Text style={styles.rowItemTxt}>
                  {item.jerseyNumber}
                </Text>
              </View>)
          })}
        </View>
      </View>)
  }

  function renderCurrentLineUp(heading, list) {
    return (
      <View>
        <Text style={styles.headingTxt}>
          {heading}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          {list.map((item, index) => {
            return (
              <View key={index} style={{
                backgroundColor: isEnabled ? Colors.lightRed : Colors.lightBlue,
                paddingVertical: 2,
                paddingHorizontal: 8,
                borderRadius: 15,
                flex: 1,
                marginHorizontal: 5,
                // width: (width / 2) / 6,
                // borderRadius: ((width / 2) / 6) / 2
              }}>
                <Text style={styles.rowItemTxt}>
                  {item.jerseyNumber}
                </Text>
              </View>)
          })}
        </View>
      </View>)
  }


  function renderLineUpInCard(heading, list, bottomTxt) {

    const changeLine = (lineUpName) => {
      let teamId
      if (isEnabled) {
        teamId = totalResponse.defenderTeamInfo.teamId
      } else {
        teamId = totalResponse.challengerTeamInfo.teamId
      }

      // const token = SyncStorage.get('token');

      const data = {
        "firstPlayerId": teamId,
        "secondPlayerId": teamId,
        "court": "COURT_1",
        "quarter": "QUARTER_1",
        "gameAction": "Lineup",
        "eventTime": Date.now(),
        "teamID": teamId,
        "lineUpId": lineUpName
      }


      // axios.post('http://35.184.198.142:8085/v1/log/event/165584893449104', data, {
      //     headers: {
      //         'Authorization': `Bearer ${token}`
      //     }
      // })
      //     .then((response) => {
      //         setCurrentView("playing")
      //     })
      //     .catch(function (error) {
      //         console.log('Error', error)
      //     });

    }

    return (
      <TouchableOpacity style={{ ...CommonStyles.card, paddingVertical: 14, backgroundColor: Colors.darkGray }}
        onPress={() => changeLine(list.proposedLineUp.name)}
      >
        {renderLineUp(heading, list.proposedLineUp)}
        <Text style={styles.cardBottomTxt}>
          {bottomTxt}
        </Text>
      </TouchableOpacity>
    )

  }
}

const PlayingGameScreen = ({ isEnabled, setCurrentView, setActivePlayer,
  activePlayer, quarter, setCourtArea, courtArea,
  btnEnable, handleBtnEnable, setCourtAreaClick, courtAreaClick, madeOrMised, blueTeamScore, redTeamScore }) => {



  // change this variable to change the width of shape
  const { width, height } = useDimensions().window;

  const playGroundWidth = width * 0.45;
  const background = '#363A47';
  const foreground = '#fff';//Text Color
  const shapeDefaultBG = '#85ADFF';

  const redColor = Colors.base; //'#FF5E5E';
  const blueColor = Colors.base;//'#85ADFF';
  const yellow1Color = Colors.base; //'#E0BD90';
  const yellow2Color = Colors.base; //'#FFD884';
  const yellow3Color = Colors.base; //'#FDB927';
  //PlaygroundColor list
  const [playgroundShapesColorList, setPlaygroundShapesColorList] = useState({
    shapeTwoBGColor: Colors.base,
    shapeFourBGColor: Colors.base,
    shapeLeftCurveBGColor: Colors.base,
    shapeRightCurveBGColor: Colors.base,
    shapeLeftCurve2BGColor: Colors.base,
    shapeRightCurve2BGColor: Colors.base,
    shapeCenterCircleHolderBGColor: Colors.base,
    shapeCenterCircleBGColor: Colors.base,
    shapeHolderLeftBGColor: Colors.base,
    shapeHolderRightBGColor: Colors.base,
    shapeZeroBGColor: Colors.base,
    shapeRightHTopBGColor: Colors.base,
    shapeRightVTopBGColor: Colors.base,
  });



  const addEvent = (action) => {
    // const token = SyncStorage.get('token');

    const data = {
      "firstPlayerId": activePlayer,
      "secondPlayerId": activePlayer,
      "gameAction": action,
      "eventTime": Date.now(),
      "court": courtArea,
      "quarter": quarter
    }


    // axios.post('http://35.184.198.142:8085/v1/log/event/165584893449104', data, {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // })
    //     .then(async (response) => {
    //         const r = response.data;
    //         alert(action)

    //     })
    //     .catch(function (error) {
    //         console.log('Error', error)
    //     });



  }

  const onChangeColorHandler = (pressShapeColorKey) => {
    // console.log("pressShapeColorKey", pressShapeColorKey);
    let ShapeColors = playgroundShapesColorList;

    console.log("assaign ", pressShapeColorKey)

    Object.entries(ShapeColors).forEach(([key, value]) => {
      if (key === pressShapeColorKey) {
        ShapeColors = {
          ...ShapeColors,
          [key]: value === Colors.base ? Colors.lightBlue : Colors.base
        }
      } else {
        ShapeColors = {
          ...ShapeColors,
          [key]: Colors.base
        }
      }
    });

    setPlaygroundShapesColorList(ShapeColors);
  }

  const handleDataInser = () => {
    debugger
    let data = {
      "playerId": 1010101010292,
      "name": "Crishh",
      "pts": 10,
      "ast": 5,
      "reb": 3,
      "foul": 2
    }
    debugger
    addPlayerScoreData(data, (res) => {
      if (res) {
        debugger
      }
    })
  }
  console.log("btnnnn", isEnabled)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between' }}>
        <View style={{ width: "22%", }}>
          <ActiveTeamPlayer
            containerStyle={{ width: '100%' }}
            heading={"Active Player"}
            activePlayer={activePlayer}
            list={isEnabled == false ? blueTeamList : redTeamList}
            isBlueTeam={isEnabled}
            onPress={(e) => {
              setActivePlayer(e.playerId)
            }} />

          <View style={{ marginTop: 20, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <PlaygroundScreenBtn
                style={{ width: '45%', }}
                // title="Substitute Player"
                title="Sub Player"
                // onPress={() => handleDataInser()}
                onPress={() => setCurrentView("substitute")}
              />
              <PlaygroundScreenBtn
                title="Lineup"
                style={{ backgroundColor: Colors.darkGray, width: '45%', }}
                txtStyle={{ color: Colors.light }}
                onPress={() => setCurrentView("changelineup")}
              />
            </View>
            <PlaygroundScreenBtn
              title="Undo"
              style={{ backgroundColor: Colors.btnRed, width: '45%', alignSelf: 'flex-start' }}
              txtStyle={{ color: Colors.light }}
              onPress={() => setCurrentView("changelineup")}
            />
          </View>
        </View>
        {renderPlayground()}

        {/* <View style={{ flex: 0.9 }} pointerEvents={courtArea && activePlayer ? "auto" : "none"}>
          <PlaygroundScreenBtn title="Score"
            style={{ ...styles.btn, opacity: activePlayer && courtArea == true ? 0.6 : 1 }}
            txtStyle={{ color: Colors.light }}
            onPress={() => {
              if (activePlayer && courtArea) {
                addEvent("Score")
              }
            }}
          />
          <PlaygroundScreenBtn title="Shoot"
            style={{ ...styles.btn, opacity: activePlayer && courtArea == true ? 0.6 : 1 }}
            txtStyle={{ color: Colors.light }}
            onPress={() => {
              if (activePlayer && courtArea) {
                addEvent("Shoot")
              }
            }}
          />
          <PlaygroundScreenBtn title="Pass"
            style={{ ...styles.btn, opacity: activePlayer && courtArea == true ? 0.6 : 1 }}
            txtStyle={{ color: Colors.light }}
            onPress={() => {
              if (activePlayer && courtArea) {
                setCurrentView("pass")
              }
            }}
          />
          <PlaygroundScreenBtn title="Foul"
            style={{ ...styles.btn, backgroundColor: Colors.darkRed, opacity: activePlayer && courtArea == true ? 0.6 : 1 }}
            txtStyle={{ color: Colors.light }}
            onPress={() => {
              if (activePlayer && courtArea) {
                setCurrentView("foul")
              }
            }} />
          <PlaygroundScreenBtn title="Switch Positions"
            style={{ ...styles.btn, backgroundColor: Colors.lightGreen }}
            txtStyle={{ color: Colors.light }} />
        </View> */}

        {/* new button  */}
        <View style={{ width: '25%', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
            <PlaygroundScreenBtn title="Def. Reb"
              style={{ ...styles.btn, width: '45%', backgroundColor: Colors.btnBg, }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                debugger
                // setCurrentView('shootScore')
                setCurrentView('deffRebound')
                // console.log(cu)
                // if (activePlayer && courtArea) {
                //   addEvent("defReb")
                // }
              }}
            />
            <PlaygroundScreenBtn title="Off. Reb"
              style={{ ...styles.btn, width: '45%', backgroundColor: Colors.btnBg, }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                // setCurrentView('shootScore')
                setCurrentView('deffRebound')
                // if (activePlayer && courtArea) {
                //   addEvent("Shoot")
                // }
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <PlaygroundScreenBtn title="Turnover"
              style={{ ...styles.btn, width: '45%', backgroundColor: Colors.btnBg, }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                setCurrentView('turnOverView')
                // if (activePlayer && courtArea) {
                //   setCurrentView("pass")
                // }
              }}
            />
            <PlaygroundScreenBtn title="Steal"
              style={{ ...styles.btn, width: '45%', backgroundColor: Colors.btnBg, }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                setCurrentView('stoleBy')
                // if (activePlayer && courtArea) {
                //   setCurrentView("pass")
                // }
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <PlaygroundScreenBtn title="Assist"
              style={{ ...styles.btn, width: '45%', backgroundColor: Colors.btnBg, }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                setCurrentView('assistFlow')
                // if (activePlayer && courtArea) {
                //   setCurrentView("pass")
                // }
              }}
            />
            <PlaygroundScreenBtn title="Block"
              style={{ ...styles.btn, width: '45%', backgroundColor: Colors.btnBg, }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                setCurrentView('blockBy')
                // if (activePlayer && courtArea) {
                //   setCurrentView("pass")
                // }
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <PlaygroundScreenBtn title="Free Throw"
              style={{ ...styles.btn, backgroundColor: Colors.lightGreen, width: '45%' }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                setCurrentView('freeThrowPlayerSelect')
                // if (activePlayer && courtArea) {
                //   setCurrentView("foul")
                // }
              }} />
            <PlaygroundScreenBtn title="Foul"
              style={{ ...styles.btn, backgroundColor: Colors.darkRed, width: '45%' }}
              txtStyle={{ color: Colors.light }}
              onPress={() => {
                setCurrentView('foulType')
                // if (activePlayer && courtArea) {
                //   setCurrentView("foul")
                // }
              }} />
          </View>

          {/* <PlaygroundScreenBtn title="Switch Positions"
            style={{ ...styles.btn, backgroundColor: Colors.lightGreen }}
            txtStyle={{ color: Colors.light }} /> */}
        </View>
      </View>
    </ScrollView>
  )

  function renderPlayground() {
    return <PlayGroundBox

      clickedCourtArea={madeOrMised}
      // configs
      width={playGroundWidth}
      background={background}
      forground={foreground}
      shapeBG={shapeDefaultBG}

      //background color
      //1st row
      shapeZeroBGColor={playgroundShapesColorList.shapeZeroBGColor}// 1st row 1st vertical shape
      shapeTwoBGColor={playgroundShapesColorList.shapeTwoBGColor}// 1st row 2nd shape (horizontal width rectangular)
      shapeFourBGColor={playgroundShapesColorList.shapeFourBGColor}// 1st row center shape
      shapeRightHTopBGColor={playgroundShapesColorList.shapeRightHTopBGColor}// 2nd row 1st shape
      shapeRightVTopBGColor={playgroundShapesColorList.shapeRightVTopBGColor}// 2nd row 2nd shape
      //2nd row
      shapeLeftCurve2BGColor={playgroundShapesColorList.shapeLeftCurve2BGColor}//center 2nd row row left
      shapeRightCurve2BGColor={playgroundShapesColorList.shapeRightCurve2BGColor}//center 2nd row right
      shapeCenterCircleBGColor={playgroundShapesColorList.shapeCenterCircleBGColor}//center 2nd row row mid half circle
      shapeCenterCircleHolderBGColor={playgroundShapesColorList.shapeCenterCircleHolderBGColor}//center 2nd row row mid half circle container
      //3rd row
      shapeLeftCurveBGColor={playgroundShapesColorList.shapeLeftCurveBGColor}//bottom 3rd row left
      shapeRightCurveBGColor={playgroundShapesColorList.shapeRightCurveBGColor}// bottom 3rd row right
      shapeHolderLeftBGColor={playgroundShapesColorList.shapeHolderLeftBGColor} //bottom 3rd row center shape left half
      shapeHolderRightBGColor={playgroundShapesColorList.shapeHolderRightBGColor}//bottom 3rd row center shape right half

      // on click events
      onPressShapeZero={() => {
        // alert('onPressShapeZero');
        onChangeColorHandler("shapeZeroBGColor");
        setCourtArea("COURT_1")
        // handleBtnEnable()

      }}
      onPressShapeTwo={(e, court) => {
        // onChangeColorHandler("shapeTwoBGColor");
        // setCourtArea("COURT_2")
        setCourtAreaClick({ 'x': e.nativeEvent.locationX, 'y': e.nativeEvent.locationY, "court_nm": court })
        setCurrentView("initMadeMissedScreen")
        // setCurrentView('shootScore')
        // handleBtnEnable()
      }}

      onPressShapeFour={() => {
        //top 1st row center shape
        onChangeColorHandler("shapeFourBGColor");
        setCourtArea("COURT_3")
        // handleBtnEnable()
      }}
      //top 2nd row 1st shape
      onPressShapeLeftCurve={() => {
        // alert('onPressShapeLeftCurve');
        onChangeColorHandler("shapeLeftCurveBGColor");
        setCourtArea("COURT_4")
        // handleBtnEnable()
      }}
      onPressShapeRightCurve={() => {
        // alert('onPressShapeRightCurve');
        onChangeColorHandler("shapeRightCurveBGColor");
        setCourtArea("COURT_5")
        // handleBtnEnable()
      }}

      onPressShapeLeftCurve2={() => {
        // alert('onPressShapeLeftCurve2');
        onChangeColorHandler("shapeLeftCurve2BGColor");
        setCourtArea("COURT_6")
        // handleBtnEnable()
      }}
      onPressShapeRightCurve2={() => {
        // alert('onPressShapeRightCurve2');
        onChangeColorHandler("shapeRightCurve2BGColor");
        setCourtArea("COURT_7")
        // handleBtnEnable()
      }}
      onPressShapeCenterCircleHolder={() => {
        // alert('onPressShapeCenterCircleHolder');
        onChangeColorHandler("shapeCenterCircleHolderBGColor");
        setCourtArea("COURT_8")
        // handleBtnEnable()
      }}
      onPressShapeCenterCircle={() => {
        // alert('onPressShapeCenterCircle');
        onChangeColorHandler("shapeCenterCircleBGColor");
        setCourtArea("COURT_9")
        // handleBtnEnable()
      }}
      onPressShapeHolderLeft={() => {
        // alert('onPressShapeHolderLeft');
        onChangeColorHandler("shapeHolderLeftBGColor");
        setCourtArea("COURT_10")
        // handleBtnEnable()
      }}
      onPressShapeHolderRight={() => {
        // alert('onPressShapeHolderRight');
        onChangeColorHandler("shapeHolderRightBGColor");
        setCourtArea("COURT_11")
        // handleBtnEnable()
      }}
      onPressShapeRightHTop={() => {
        // alert('onPressShapeRightHTop');
        onChangeColorHandler("shapeRightHTopBGColor");
        setCourtArea("COURT_12")
        // handleBtnEnable()
      }}
      onPressShapeRightVTop={() => {
        // alert('onPressShapeRightVTop');
        onChangeColorHandler("shapeRightVTopBGColor");
        setCourtArea("COURT_13")
        // handleBtnEnable()
      }}

    />
  }
}


const ShootScore = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, setSelectedPlayer, selectedPlayer, title, setPlayerScore, event, setEvent }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "shootScore" || currentView == "whoShot" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
      :
      toggleSwitch()

  };

  const selectPlayer = (e) => {
    // setCurrentView('playing');
    debugger
    if (e == 'other team') {
      setSelectedPlayer(e);
      setEvent([...event, 'scored_otherTeam'])
    } else {
      setSelectedPlayer(e);
      setEvent([...event, `scored_${e.playerId}`])

    }
    debugger
    if (title == 'Who Scored') {
      setPlayerScore(e, 'pts')
      setCurrentView('assistScreen');
    } else {
      setCurrentView('gotRebound');
    }
  }

  return (
    <View style={{ paddingVertical: 20, }}>
      {isBlueTeamPlaying ?
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 9.5,
            // height: width / 9.5,
            marginTop: 35,
            // borderRadius: (width / 9.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={title}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            // if (e == 'other team') {
            selectPlayer(e)
            // } else {
            // selectPlayer(e.id)
            // }
          }} />

        :
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 9.5,
            // height: width / 9.5,
            marginTop: 35,
            // borderRadius: (width / 9.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={title}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            // if (e == 'other team') {
            selectPlayer(e)
            // } else {
            //   selectPlayer(e.id)
            // }
          }} />
      }

    </View>)
}



const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    // borderTopRightRadius: 0,
    // borderBottomRightRadius: 0,
    marginTop: 5,
    backgroundColor: Colors.lightBlue
  },
});



const mapStateToProps = (state) => {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(GameScreen)
