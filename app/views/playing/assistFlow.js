import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { ScoreActiveTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { AssistTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { Colors, Fonts } from "../../constants";
import PlayGroundBox from "../../components/common/cort/PlayGroundBox";
import { Court_ptr } from "../../constants/constant";


const AssistFlow = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, setSelectedPlayer, setAssistPlayer,
  assistMadeOrMised, setAssistMadeOrMised, setCourtFoul,
  setCourtFreeThrow, courtFreeThrowPlayer,
  setPlayerScore, event, setEvent, setTypeOfEvent,
  setIsEventCompleted, setAssistFlowPtr, setAssistFlowCurrentView,
  assistFlowCurrentView, setCourtAreaClick, courtAreaClick, selectedAssistPlayer }) => {

  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const [onAssist, setOnAssist] = useState(false)
  const [onScored, setOnScored] = useState(false)
  const [onPtr, setOnPtr] = useState(false)
  const [onThrow, setOnThrow] = useState(false)
  const [onFoul, setOnFoul] = useState(false)
  const [onFreeThrow, setOnFreeThrow] = useState(false)
  const [shootPlayer, setShootPlayer] = useState('')
  const [assistFlowView, setAssistFlowView] = useState(assistFlowCurrentView)


  const fullPlayerList = playersList;

  useEffect(() => {
    setAssistFlowView('assistFlow_ast')
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "assistFlow" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer))
      :
      toggleSwitch()
  };

  useEffect(() => {
    console.log("assistViewRoot", assistFlowView)
    console.log("assistView", assistFlowView)
    debugger
    if (assistFlowView == "assistFlow_ast") {
      setOnAssist(false);
    } else if (assistFlowView == "assistFlow_score") {
      setOnScored(false);
    } else if (assistFlowView == "assistFlow_Ptr") {
      setOnPtr(false);
    } else if (assistFlowView == "assistFlow_wasItFoul") {
      setOnThrow(false);
    } else if (assistFlowView == "assistFlow_foul") {
      setOnFoul(false);
    } else if (assistFlowView == "assistFlow_freeThrow") {
      setOnFreeThrow(false);
    } else if (assistFlowView == "assistFlow_madeMiss") {
      setOnFreeThrow(false);
    }

  }, [assistFlowView])

  const selectPlayer = (e) => {
    setTypeOfEvent('assist_flow')
    if (e == 'other team') {
      setAssistPlayer(e);
      setEvent([`assist_otherTeam`])
    } else {
      setAssistPlayer(e);
      setEvent([`assist_${e.playerId}`])
      setPlayerScore(e, "ast")
    }

    setAssistFlowCurrentView('assistFlow_score')
    setOnAssist(true)
  }

  return (
    <View style={{
      width: '100%',
      height: '85%',
    }}>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        height: '90%',
        justifyContent: 'space-between'
      }}>

        {onAssist == false ?
          <View style={{
            width: '100%', alignItems: 'center',
            justifyContent: 'center'
          }}>
            {isBlueTeamPlaying ?
              <AssistTeamPlayer
                itemStyle={{
                  // width: width / 9.5,
                  // height: width / 9.5,
                  // borderRadius: (width / 9.5) / 2,
                  marginTop: 30,
                  width: 90, height: 90, borderRadius: 90 / 2,
                }}
                heading={"Who Assisted"}
                list={activePlayerList}
                isBlueTeam={isBlueTeamPlaying}
                activePlayer={selectedPlayer}
                onPress={(e) => {
                  selectPlayer(e)
                  // setCurrentView('throwScreen')
                }} />

              :
              <AssistTeamPlayer
                itemStyle={{
                  // width: width / 9.5,
                  // height: width / 9.5,
                  // borderRadius: (width / 9.5) / 2,
                  marginTop: 30,
                  width: 90, height: 90, borderRadius: 90 / 2,
                }}
                heading={"Who Assisted"}
                list={activePlayerList}
                isBlueTeam={isBlueTeamPlaying}
                activePlayer={selectedPlayer}
                onPress={(e) => {
                  selectPlayer(e)
                  // setCurrentView('throwScreen')
                }} />
            }

          </View>
          :
          onScored == false ?
            <AssistShootScore
              setOnScored={setOnScored}
              playersList={playersList}
              isBlueTeamPlaying={isBlueTeamPlaying}
              setCurrentView={setCurrentView}
              setActivePlayer={setActivePlayer}
              currentView={currentView}
              toggleSwitch={toggleSwitch}
              setSelectedPlayer={setSelectedPlayer}
              setAssistPlayer={setAssistPlayer}
              event={event}
              setEvent={setEvent}
              setShootPlayer={setShootPlayer}
              setAssistFlowCurrentView={setAssistFlowCurrentView}
            />
            :
            onPtr == false ?
              <TwiPtr
                setOnPtr={setOnPtr}
                playersList={playersList}
                isBlueTeamPlaying={isBlueTeamPlaying}
                setCurrentView={setCurrentView}
                setActivePlayer={setActivePlayer}
                currentView={currentView}
                toggleSwitch={toggleSwitch}
                setSelectedPlayer={setSelectedPlayer}
                setAssistPlayer={setAssistPlayer}
                setPlayerScore={setPlayerScore}
                shootPlayer={shootPlayer}
                event={event}
                setEvent={setEvent}
                setAssistFlowPtr={setAssistFlowPtr}
                setAssistFlowCurrentView={setAssistFlowCurrentView}
                setCourtAreaClick={setCourtAreaClick}
              />
              :
              onThrow == false ?
                <ThrowScreen
                  setOnThrow={setOnThrow}
                  playersList={playersList}
                  isBlueTeamPlaying={isBlueTeamPlaying}
                  setCurrentView={setCurrentView}
                  setActivePlayer={setActivePlayer}
                  currentView={currentView}
                  toggleSwitch={toggleSwitch}
                  setSelectedPlayer={setSelectedPlayer}
                  setAssistPlayer={setAssistPlayer}
                  event={event}
                  setEvent={setEvent}
                  setIsEventCompleted={setIsEventCompleted}
                  setAssistFlowCurrentView={setAssistFlowCurrentView}
                  selectedPlayer={selectedPlayer}
                  selectedAssistPlayer={selectedAssistPlayer}
                  courtAreaClick={courtAreaClick}
                />
                :
                onFoul == false ?
                  <FoulBy
                    setOnFoul={setOnFoul}
                    playersList={playersList}
                    isBlueTeamPlaying={isBlueTeamPlaying}
                    setCurrentView={setCurrentView}
                    setActivePlayer={setActivePlayer}
                    currentView={currentView}
                    toggleSwitch={toggleSwitch}
                    setSelectedPlayer={setSelectedPlayer}
                    setAssistPlayer={setAssistPlayer}
                    setCourtFoul={setCourtFoul}
                    setPlayerScore={setPlayerScore}
                    event={event}
                    setEvent={setEvent}
                    setAssistFlowCurrentView={setAssistFlowCurrentView}
                  />
                  :
                  onFreeThrow == false ?
                    <WhoShootFreeThrow
                      setOnFreeThrow={setOnFreeThrow}
                      playersList={playersList}
                      isBlueTeamPlaying={isBlueTeamPlaying}
                      setCurrentView={setCurrentView}
                      setActivePlayer={setActivePlayer}
                      currentView={currentView}
                      toggleSwitch={toggleSwitch}
                      setSelectedPlayer={setSelectedPlayer}
                      setAssistPlayer={setAssistPlayer}
                      setCourtFreeThrow={setCourtFreeThrow}
                      event={event}
                      setEvent={setEvent}
                      setAssistFlowCurrentView={setAssistFlowCurrentView}
                    />
                    :

                    <MadeMissScreen
                      playersList={playersList}
                      isBlueTeamPlaying={isBlueTeamPlaying}
                      setCurrentView={setCurrentView}
                      setActivePlayer={setActivePlayer}
                      currentView={currentView}
                      toggleSwitch={toggleSwitch}
                      setSelectedPlayer={setSelectedPlayer}
                      setAssistPlayer={setAssistPlayer}
                      assistMadeOrMised={assistMadeOrMised}
                      setAssistMadeOrMised={setAssistMadeOrMised}
                      courtFreeThrowPlayer={courtFreeThrowPlayer}
                      event={event}
                      setEvent={setEvent}
                      setIsEventCompleted={setIsEventCompleted}
                      setAssistFlowCurrentView={setAssistFlowCurrentView}
                    />

        }

      </View>

    </View>)
}


const AssistShootScore = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, setSelectedPlayer, selectedPlayer, setOnScored,
  event, setEvent, setShootPlayer, setAssistFlowCurrentView }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    // debugger
    // currentView == "assistshootScore" || currentView == "whoShot" ?
    setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
    // :
    // toggleSwitch()

  };

  const selectPlayer = (e) => {
    debugger
    setShootPlayer(e);
    if (e == 'other team') {
      setSelectedPlayer(e);
      setEvent([...event, `scored_otherTeam`])
    } else {
      setSelectedPlayer(e);
      setEvent([...event, `scored_${e.playerId}`])
    }
    setOnScored(true);
    setAssistFlowCurrentView('assistFlow_Ptr')
  }

  return (
    <View style={{
      width: '100%', alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isBlueTeamPlaying ?
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 8.5,
            // height: width / 8.5,
            marginTop: 30,
            // borderRadius: (width / 8.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={'Who Scored'}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            // if (e == 'other team') {
            selectPlayer(e)

          }} />

        :
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 8.5,
            // height: width / 8.5,
            marginTop: 30,
            // borderRadius: (width / 8.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={'Who Scored'}
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


const TwiPtr = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, setSelectedPlayer, selectedPlayer, setOnPtr,
  setAssistFlowPtr, setPlayerScore, shootPlayer, setAssistFlowCurrentView, setCourtAreaClick }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);
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

  // const fullPlayerList = playersList;

  useEffect(() => {
    debugger
    // removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "initMadeMissedScreen" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer))
      :
      toggleSwitch()
  };

  const selectPlayer = (id) => {
    // setCurrentView('playing');
    setAssistPlayer(id);
  }

  return (
    <View style={{
      width: '100%',
      height: '100%',
    }}>
      <View style={{
        // flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',


      }}>
        <Text style={{
          color: Colors.newGrayFontColor, fontSize: 24,
          lineHeight: 28, fontFamily: Fonts.Regular, marginTop: 15,
        }}
        >
          Was it 2Pt or 3Pt?
        </Text>

        <View style={{
          width: '100%', alignItems: 'center',
          justifyContent: 'center',
          // marginTop: 8
        }}>
          {renderPlayground()}

        </View>
        {/* <View style={{
          width: '90%', alignItems: 'center',
          justifyContent: 'center'
        }}> */}

        {/* <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              style={{
                width: width * 0.15, height: width * 0.15,
                borderRadius: width * 0.15 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren
              }}
              onPress={() => {
                setAssistFlowPtr('ptr2')
                setPlayerScore(shootPlayer, 'ast_pts')
                setOnPtr(true)
                setAssistFlowCurrentView('assistFlow_score')
              }}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 20,
                lineHeight: 24,
                fontFamily: Fonts.Bold,
                // backgroundColor: 'red'
              }}>
                2PT
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: width * 0.12, height: width * 0.12,
                borderRadius: width * 0.12 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.lightRed,
                marginLeft: width * 0.09
              }}
              onPress={() => {
                setAssistFlowPtr('ptr3')
                setPlayerScore(shootPlayer, 'ast_pts')
                setOnPtr(true)
              }}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 20,
                lineHeight: 24,
                fontFamily: Fonts.Bold,
                textAlign: 'center'
                // backgroundColor: 'red'
              }}>
                3PT
              </Text>
            </Pressable>
          </View> */}


        {/* </View> */}

      </View>

    </View>)

  function renderPlayground() {
    return <PlayGroundBox

      // clickedCourtArea={madeOrMised}
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
        debugger
        setCourtAreaClick({ 'x': e.nativeEvent.locationX, 'y': e.nativeEvent.locationY, "court_nm": court })
        // setAssistFlowPtr('ptr2')
        setOnPtr(true)
        if (shootPlayer != 'other team') {
          setPlayerScore(shootPlayer, 'pts', court)
        }
        setAssistFlowCurrentView('assistFlow_wasItFoul')

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

const ThrowScreen = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, selectedAssistPlayer, setAssistPlayer,
  setOnThrow, event, setEvent, setIsEventCompleted, setAssistFlowCurrentView,
  courtAreaClick }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const [ptsPoints, setPtsPoints] = useState("");
  // const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    // removeActivePlayerFromList();
    if (courtAreaClick !== '' && courtAreaClick != undefined) {
      debugger
      let selected_court = courtAreaClick.court_nm;
      if (Court_ptr.ptr2.includes(selected_court)) {
        setPtsPoints(2)
      } else {
        setPtsPoints(3)
      }
    }
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "assistScreen" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer))
      :
      toggleSwitch()
  };

  const selectPlayer = (id) => {
    // setCurrentView('playing');
    setAssistPlayer(id);
  }

  return (
    <View style={{
      width: '100%',
      height: '90%',
    }}>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        height: '90%',
        justifyContent: 'space-between'
      }}>
        <View style={{
          width: '30%', justifyContent: 'center',
          marginTop: 20,
          alignItems: 'center'
          // backgroundColor: 'green'
        }}>
          {selectedPlayer != '' & selectedPlayer != undefined ?
            <View style={{ marginTop: 20, }}>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                {`+${ptsPoints}pt Shot By`}
              </Text>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                {selectedPlayer?.playerName}
              </Text>

            </View>
            :
            <></>
          }
          {selectedAssistPlayer != '' & selectedAssistPlayer != undefined ?
            <View style={{ marginTop: 20, }}>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                Assisted by
              </Text>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                {selectedAssistPlayer?.playerName}
              </Text>
            </View>
            : <></>
          }



        </View>
        <View style={{ width: 1, height: '80%', backgroundColor: Colors.newGrayFontColor, marginTop: 30 }} />

        <View style={{ width: '65%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ marginRight: 20 }}>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 24,
              lineHeight: 28, fontFamily: Fonts.Regular
            }}
            >
              Was it foul ?
              {/* And +1 Free Throw ? */}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              style={{
                width: width * 0.15, height: width * 0.15,
                borderRadius: width * 0.15 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren
              }}
              onPress={() => {
                setAssistFlowCurrentView('assistFlow_foul')
                setOnThrow(true)
              }
              }
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                // backgroundColor: 'red'
              }}>
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: width * 0.1, height: width * 0.1,
                borderRadius: width * 0.1 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.lightRed,
                marginLeft: 30
              }}
              onPress={() => {
                setEvent([...event, `foul_no`])
                setIsEventCompleted(true)
                setCurrentView('playing')

              }
              }
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                // backgroundColor: 'red'
              }}>
                No
              </Text>
            </Pressable>
          </View>

        </View>

      </View>

    </View>)
}


const MadeMissScreen = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, selectedAssistPlayer, setAssistPlayer,
  clickedCourtArea, setMadeOrMissed, madeOrMissed, assistMadeOrMised, setAssistMadeOrMised,
  event, setEvent, setIsEventCompleted, courtFreeThrowPlayer, setAssistFlowCurrentView }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  // const fullPlayerList = playersList;

  useEffect(() => {
    debugger
    // console.log("is blueee", clickedCourtArea)
    // removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "assistScreen" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer))
      :
      toggleSwitch()
  };

  const selectPlayer = (id) => {
    // setCurrentView('playing');
    setAssistPlayer(id);
  }

  return (
    <View style={{
      width: '100%',
      height: '90%',
    }}>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        height: '90%',
        justifyContent: 'space-between'
      }}>
        <View style={{
          width: '30%', justifyContent: 'center',
          marginTop: 20,
          alignItems: 'center'
          // backgroundColor: 'green'
        }}>
          {courtFreeThrowPlayer != '' && courtFreeThrowPlayer != undefined ?
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                Free Throw Shot By
              </Text>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                {courtFreeThrowPlayer?.playerName}
              </Text>
            </View>
            : <></>
          }
          {/* {selectedAssistPlayer != '' & selectedAssistPlayer != undefined ?
            <View style={{ marginTop: 20, }}>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                Assisted by
              </Text>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                Chris Paul
              </Text>
            </View>
            : <></>
          } */}

          {/* <View style={{
            justifyContent: 'center',
            marginTop: 30,

          }}>
            <Pressable style={{
              width: 85, height: 25, backgroundColor: Colors.btnRed,
              borderRadius: 8, justifyContent: 'center', alignItems: 'center',
              // marginLeft: width * 0.02
            }}>
              <Text style={{
                color: Colors.light, fontSize: 12,
                lineHeight: 18, fontFamily: Fonts.Regular
              }}>Undo</Text>
            </Pressable>

          </View> */}

        </View>
        <View style={{ width: 1, height: '80%', backgroundColor: Colors.newGrayFontColor, marginTop: 30 }} />

        <View style={{ width: '65%', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ marginRight: 20 }}>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 24,
              lineHeight: 28, fontFamily: Fonts.Regular
            }}
            >
              1 Free Throw shot only
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              style={{
                width: width * 0.15, height: width * 0.15,
                borderRadius: width * 0.15 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren
              }}
              onPress={() => {
                debugger
                if (assistMadeOrMised != undefined && assistMadeOrMised != null) {
                  debugger
                  setAssistMadeOrMised([
                    ...assistMadeOrMised,
                    {
                      // "x": clickedCourtArea.x,
                      // "y": clickedCourtArea.y,
                      "isMade": true
                    }
                  ])
                  setEvent([...event, `free_throw_made_${courtFreeThrowPlayer}`])
                  setIsEventCompleted(true)
                  setCurrentView("playing")
                } else {
                  debugger
                  setAssistMadeOrMised([
                    {
                      // "x": clickedCourtArea.x,
                      // "y": clickedCourtArea.y,
                      "isMade": true
                    }
                  ])
                  setEvent([...event, `free_throw_made_${courtFreeThrowPlayer}`])
                  setIsEventCompleted(true)
                  setCurrentView("playing")
                }

              }}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                // backgroundColor: 'red'
              }}>
                Made
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: width * 0.1, height: width * 0.1,
                borderRadius: width * 0.1 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.lightRed,
                marginLeft: 30
              }}
              onPress={() => {
                if (assistMadeOrMised != undefined && assistMadeOrMised != null) {
                  debugger
                  setAssistMadeOrMised([
                    ...assistMadeOrMised,
                    {
                      // "x": clickedCourtArea.x,
                      // "y": clickedCourtArea.y,
                      "isMade": false
                    }
                  ])
                  setEvent([...event, `free_throw_missed_${courtFreeThrowPlayer}`])
                  setIsEventCompleted(true)
                  setCurrentView("playing")
                } else {
                  debugger
                  setAssistMadeOrMised([
                    {
                      // "x": clickedCourtArea.x,
                      // "y": clickedCourtArea.y,
                      "isMade": false
                    }
                  ])
                  setEvent([...event, `free_throw_missed_${courtFreeThrowPlayer}`])
                  setIsEventCompleted(true)
                  setCurrentView("playing")
                }
              }}
            // onPress={onPress}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                // backgroundColor: 'red'
              }}>
                Missed
              </Text>
            </Pressable>
          </View>

        </View>

      </View>

    </View>)
}

const FoulBy = ({ setOnFoul, playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, reboundPlayer, setReboundPlayer,
  setCourtFoul, event, setEvent, setPlayerScore, setAssistFlowCurrentView }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    // currentView == "foulBy" ?
    setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
    // :
    // toggleSwitch()

  };

  const selectPlayer = (e) => {
    // setCurrentView('playing');
    if (e == 'other team') {
      setCourtFoul(e);
      setEvent([...event, `foul_yes_otherTeam`])
    } else {
      setCourtFoul(e);
      setEvent([...event, `foul_yes_${e.playerId}`])
      setPlayerScore(e, 'fl')
    }

    setOnFoul(true);
    setAssistFlowCurrentView('assistFlow_freeThrow')

  }

  return (
    <View style={{ paddingVertical: 20, }}>
      {isBlueTeamPlaying ?
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 8.5,
            // height: width / 8.5,
            marginTop: 30,
            // borderRadius: (width / 8.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={'Who fouled'}
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

        :
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 8.5,
            // height: width / 8.5,
            marginTop: 10,
            // borderRadius: (width / 8.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={'Who fouled'}
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


const WhoShootFreeThrow = ({ setOnFreeThrow, playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, setCourtFreeThrow, event, setEvent,
  setAssistFlowCurrentView }) => {

  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))

  };

  const selectPlayer = (e) => {
    // setCurrentView('playing');
    if (e == 'other team') {
      setCourtFreeThrow(e);
    } else {
      setCourtFreeThrow(e);
    }
    setOnFreeThrow(true);
    setAssistFlowCurrentView('assistFlow_madeMiss')

  }

  return (
    <View style={{ paddingVertical: 20, }}>
      {isBlueTeamPlaying ?
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 8.5,
            // height: width / 8.5,
            marginTop: 30,
            // borderRadius: (width / 8.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={'Who shooting the free throw ?'}
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

        :
        <ScoreActiveTeamPlayer
          itemStyle={{
            // width: width / 8.5,
            // height: width / 8.5,
            marginTop: 30,
            // borderRadius: (width / 8.5) / 2,
            width: 90, height: 90, borderRadius: 90 / 2,
          }}
          heading={'Who shooting the free throw ?'}
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




export { AssistFlow, AssistShootScore }