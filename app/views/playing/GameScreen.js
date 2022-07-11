import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, StatusBar, Modal } from 'react-native'
import { Colors, CommonStyles, Fonts, Layout } from "../../constants";
import PlayingGameScreenHeader from "../../components/common/playing_header/PlayingGameScreenHeader";
import DropDownModal from "../../components/common/playing_header/DropDownModal";
import PlayGroundBox from "../../components/common/cort/PlayGroundBox";
import ActiveTeamPlayer from "../../components/common/ActiveTeamPalyer";
import PlaygroundScreenBtn from "../../components/common/PlaygroundScreenBtn";
import { getGameInitialData } from '../../actions/home';
import { connect } from 'react-redux';
// import axios from "axios";
// import SyncStorage from 'sync-storage';
import Orientation from 'react-native-orientation-locker';
import { useDimensions } from '@react-native-community/hooks'


// const {width, height} = Dimensions.get('window');
const quarterList = [
  {
    name: 'Quarter 1',
    value: "1st quarter"
  },
  {
    name: 'Quarter 2',
    value: '2nd quarter',
  },
  {
    name: 'Quarter 3',
    value: '3rd quarter'
  },
  {
    name: 'Quarter 4',
    value: '4th quarter'
  }, {
    name: 'end',
    value: 'End of Game'
  }
]


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

  const [dropDownVisibility, setDropDownVisibility] = useState(false);
  const { btnEnable, setBtnEnable } = useState(false);
  const [preSelectedQuarter, setPreSelectedQuarter] = useState('1st quarter');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [challengerTeam, setChallengerTeam] = useState('');
  const [defenderTeam, setDefenderTeam] = useState('');

  const [currentView, setCurrentView] = useState('');
  const [activePlayer, setActivePlayer] = useState('')
  const [substitutes, setSubstitutes] = useState('')
  const [courtArea, setCourtArea] = useState('')

  useEffect(() => {
    debugger
    StatusBar.setHidden(true)
    Orientation.lockToLandscape()
    return () => {
      StatusBar.setHidden(false)
      Orientation.lockToPortrait()
    };

    // StatusBar.setTranslucent(true);
    // StatusBar.setBackgroundColor("transparent");
  }, []);

  useEffect(() => {
    // const token = SyncStorage.get('token');
    props.dispatch(getGameInitialData(async (res, response) => {
      if (res) {
        const r = response.data.data;
        totalResponse = r;
        await setChallengerTeam(r.challengerTeamInfo)
        await setDefenderTeam(r.defenderTeamInfo)
        const bTeam = r.challengerTeamKpi.filter(bTeam => bTeam.inSquad == true).map((bTeam) => {
          return {
            jerseyNumber: bTeam.jerseyNumber,
            playerId: bTeam.playerId
          }
        })

        let i = 0
        let teamList = []
        await bTeam.map(function (item) {
          teamList.push({
            "id": ++i,
            "number": item.jerseyNumber,
            "playerId": item.playerId,
            "jerseyNumber": item.jerseyNumber
          });
        })

        if (blueTeamList != teamList)
          blueTeamList = teamList


        const rTeam = r.defenderTeamKpi.filter(rTeam => rTeam.inSquad == true).map((rTeam) => {
          return {
            jerseyNumber: rTeam.jerseyNumber,
            playerId: rTeam.playerId
          }
        })

        i = 0
        teamList = []
        await rTeam.map(function (item) {
          teamList.push({
            "id": ++i,
            "number": item.jerseyNumber,
            "playerId": item.playerId,
            "jerseyNumber": item.jerseyNumber
          });
        })
        if (redTeamList != teamList)
          redTeamList = teamList


        const bTeamSub = r.challengerTeamKpi.filter(bTeam => bTeam.inSquad == false).map((bTeam) => {
          return {
            jerseyNumber: bTeam.jerseyNumber,
            playerId: bTeam.playerId
          }
        })

        i = 0
        let teamListSub = []
        await bTeamSub.map(function (item) {
          teamListSub.push({
            "id": ++i,
            "number": item.jerseyNumber,
            "playerId": item.playerId,
            "jerseyNumber": item.jerseyNumber
          });
        })

        if (blueTeamListSub != teamListSub)
          blueTeamListSub = teamListSub


        const rTeamSub = r.defenderTeamKpi.filter(rTeam => rTeam.inSquad == false).map((rTeam) => {
          return {
            jerseyNumber: rTeam.jerseyNumber,
            playerId: rTeam.playerId
          }
        })

        i = 0
        teamListSub = []
        await rTeamSub.map(function (item) {
          teamListSub.push({
            "id": ++i,
            "number": item.jerseyNumber,
            "playerId": item.playerId,
            "jerseyNumber": item.jerseyNumber
          });
        })
        if (redTeamListSub != teamListSub)
          redTeamListSub = teamListSub



        setCurrentView('playing')

      } else {
        console.log('Error', error)
      }
    }))
    // axios.post('http://35.184.198.142:8085/v1/log/start/165584329697608/165584356686406/1652921974198', {}, {
    //     headers: {
    //         'Authorization': `Bearer ${token}`
    //     }
    // })
    //     .then(async (response) => {


    //     })
    //     .catch(function (error) {
    //         console.log('Error', error)
    //     });



  }, [])

  const handleBtnEnable = () => {
    if (activePlayer !== '' && activePlayer !== undefined && courtArea !== '' && courtArea !== undefined) {
      setBtnEnable(true);
    } else {
      setBtnEnable(false);
    }

  }


  const switchView = () => {
    switch (currentView) {
      default:
      case "playing":
        return <PlayingGameScreen isEnabled={!isEnabled} setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer} activePlayer={activePlayer}
          quarter={preSelectedQuarter} setCourtArea={setCourtArea} courtArea={courtArea}
          handleBtnEnable={handleBtnEnable}
          btnEnable={btnEnable}
        />
      case "substitute":
        return <SubstitutePlayer setCurrentView={setCurrentView} isEnabled={isEnabled} />
      case "changelineup":
        return <ChangeLineUp setCurrentView={setCurrentView} isEnabled={isEnabled} />
      case "pass":
        return <PassScreen
          activePlayerId={activePlayer}
          playersList={isEnabled ? redTeamList : blueTeamList}
          isBlueTeamPlaying={!isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
        />
      case "foul":
        return <PassScreen
          playersList={isEnabled ? blueTeamList : redTeamList}
          isBlueTeamPlaying={isEnabled}
          setCurrentView={setCurrentView}
          setActivePlayer={setActivePlayer}
          currentView={currentView}
          toggleSwitch={toggleSwitch}
        />
    }
  }


  return (<View style={{ flex: 1, backgroundColor: Colors.base, }}>

    <StatusBar hidden />
    <DropDownModal
      list={quarterList}
      visibility={dropDownVisibility}
      preSelected={preSelectedQuarter}
      onPress={(item) => {
        setPreSelectedQuarter(item.value);
        setDropDownVisibility(false);
      }}
      onPressOuter={() => setDropDownVisibility(false)}
    />
    <PlayingGameScreenHeader
      blueTeamScore={challengerTeam.score}
      redTeamScore={defenderTeam.score}
      blueTeamCaptain={challengerTeam.name}
      redTeamCaptain={defenderTeam.name}
      // redTeamClubName=""
      // blueTeamClubName=""
      nav={currentView}
      setView={setCurrentView}
      round={preSelectedQuarter}
      onPressQuarter={() => {
        setDropDownVisibility(true)
      }}
      toggleSwitch={toggleSwitch}
      isEnabled={isEnabled}
    />

    {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
    <View style={{ width: '95%', alignSelf: 'center', }}>

      {switchView()}

      {/*</ScrollView>*/}

      {/*</ScrollView>*/}
    </View>

    {/* {dropDownVisibility == true ?
      <Modal animationType="fade" transparent={true} visible={true}>
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
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}
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
                    key={index}
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

const SubstitutePlayer = ({ setCurrentView, isEnabled, response }) => {
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

  const updateSubstitute = () => {


    let activeCheck = active;
    activeCheck = activeCheck - 1;
    let substituteCheck = substitute;
    substituteCheck = substituteCheck - 1;

    let player1
    let player2
    let teamId

    if (isEnabled) {
      player1 = redTeamList[activeCheck]?.playerId
      player2 = redTeamList[substituteCheck]?.playerId
      teamId = totalResponse?.defenderTeamInfo.teamId


    } else {
      player1 = blueTeamList[activeCheck]?.playerId
      player2 = blueTeamList[substituteCheck]?.playerId
      teamId = totalResponse?.challengerTeamInfo.teamId
    }

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
        <View style={{ flex: 1.5 }}>
          <ActiveTeamPlayer heading={"Select Player"} list={isEnabled ? redTeamList : blueTeamList} isBlueTeam={!isEnabled}
            onPress={
              (e) => setActive(e.id)
            }
            activePlayer={active}
          />
        </View>
        <View style={{ height: '100%', width: 1, backgroundColor: Colors.fontColorGray }} />
        <View style={{ flex: 3, paddingHorizontal: 30 }}>
          <ActiveTeamPlayer heading={"Select Substitute"} list={isEnabled ? redTeamListSub : blueTeamListSub} isBlueTeam={!isEnabled}
            onPress={
              (e) => setSubstitute(e.id)
            }
            activePlayer={substitute}
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

const ChangeLineUp = ({ setCurrentView, isEnabled }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      <View>
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
  btnEnable, handleBtnEnable }) => {



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

  // const handleBtnEnable = () => {
  //   if (activePlayer !== '' && activePlayer !== undefined && courtArea !== '' && courtArea !== undefined) {
  //     setBtnEnable(true);
  //   } else {
  //     setBtnEnable(false);
  //   }

  // }
  console.log("btnnnn", btnEnable)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <View style={{ width: "25%" }}>
          <ActiveTeamPlayer heading={"Active Player"}
            activePlayer={activePlayer}
            list={isEnabled ? blueTeamList : redTeamList} isBlueTeam={isEnabled}
            onPress={(e) => {
              setActivePlayer(e.id)
            }} />
          <View style={{ marginTop: 20, }}>
            <PlaygroundScreenBtn title="Substitute Player" onPress={() => setCurrentView("substitute")} />
            <PlaygroundScreenBtn title="Substitute Lineup"
              style={{ backgroundColor: Colors.darkGray }}
              txtStyle={{ color: Colors.light }}
              onPress={() => setCurrentView("changelineup")}
            />
          </View>
        </View>
        {renderPlayground()}

        <View style={{ flex: 0.9 }} pointerEvents={courtArea && activePlayer ? "auto" : "none"}>
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
        </View>
      </View>
    </ScrollView>
  )

  function renderPlayground() {
    return <PlayGroundBox

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
      onPressShapeTwo={() => {
        onChangeColorHandler("shapeTwoBGColor");
        setCourtArea("COURT_2")
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
