import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { ScoreActiveTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { AssistTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { Colors, Fonts } from "../../constants";


const AssistFlow = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, setSelectedPlayer, setAssistPlayer,
  assistMadeOrMised, setAssistMadeOrMised, setCourtFoul, setCourtFreeThrow }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const [onAssist, setOnAssist] = useState(false)
  const [onScored, setOnScored] = useState(false)
  const [onPtr, setOnPtr] = useState(false)
  const [onThrow, setOnThrow] = useState(false)
  const [onFoul, setOnFoul] = useState(false)
  const [onFreeThrow, setOnFreeThrow] = useState(false)


  const fullPlayerList = playersList;

  useEffect(() => {

    // console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "assistFlow" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer))
      :
      toggleSwitch()
  };

  const selectPlayer = (id) => {
    setAssistPlayer(id);
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
          <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
            {isBlueTeamPlaying ?
              <AssistTeamPlayer
                itemStyle={{
                  width: width / 9.5,
                  height: width / 9.5,
                  borderRadius: (width / 9.5) / 2,
                }}
                heading={"Who Assisted"}
                list={activePlayerList}
                isBlueTeam={isBlueTeamPlaying}
                activePlayer={selectedPlayer}
                onPress={(e) => {
                  selectPlayer(e.id)
                  // setCurrentView('throwScreen')
                }} />

              :
              <AssistTeamPlayer
                itemStyle={{
                  width: width / 9.5,
                  height: width / 9.5,
                  borderRadius: (width / 9.5) / 2,
                }}
                heading={"Who Assisted"}
                list={activePlayerList}
                isBlueTeam={isBlueTeamPlaying}
                activePlayer={selectedPlayer}
                onPress={(e) => {
                  selectPlayer(e.id)
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
                setAssistPlayer={setAssistPlayer} />
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
                  setAssistPlayer={setAssistPlayer} />
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
                    />

        }

      </View>

    </View>)
}


const AssistShootScore = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, setSelectedPlayer, selectedPlayer, setOnScored }) => {
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

  const selectPlayer = (id) => {
    setSelectedPlayer(id);
    setOnScored(true);
  }

  return (
    <View style={{ paddingVertical: 20, }}>
      {isBlueTeamPlaying ?
        <ScoreActiveTeamPlayer
          itemStyle={{
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
          }}
          heading={'Who Scored'}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            if (e == 'other team') {
              selectPlayer(e)
            } else {
              selectPlayer(e.id)
            }
          }} />

        :
        <ScoreActiveTeamPlayer
          itemStyle={{
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
          }}
          heading={'Who Scored'}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            if (e == 'other team') {
              selectPlayer(e)
            } else {
              selectPlayer(e.id)
            }
          }} />
      }

    </View>)
}


const TwiPtr = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, setSelectedPlayer, selectedPlayer, setOnPtr }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
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
      height: '90%',
    }}>
      <View style={{
        // flexDirection: 'row',
        width: '100%',
        height: '90%',
        justifyContent: 'center'

      }}>

        <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{
            color: Colors.newGrayFontColor, fontSize: 24,
            lineHeight: 28, fontFamily: Fonts.Regular
          }}
          >
            Was it 2Pt or 3Pt?
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              style={{
                width: width * 0.15, height: width * 0.15,
                borderRadius: width * 0.15 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren
              }}
              onPress={() => {
                setOnPtr(true)
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
          </View>

        </View>

      </View>

    </View>)
}

const ThrowScreen = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, selectedAssistPlayer, setAssistPlayer, setOnThrow }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  // const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
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
          <View style={{ marginTop: 20, }}>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 24,
              lineHeight: 28, fontFamily: Fonts.Regular
            }}
            >
              Pippen Jr.
            </Text>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 24,
              lineHeight: 28, fontFamily: Fonts.Regular
            }}
            >
              +3pt Shot
            </Text>
          </View>
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
                Chris Paul
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
              onPress={() => setOnThrow(true)}
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
              onPress={() => setCurrentView('playing')}
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
  clickedCourtArea, setMadeOrMissed, madeOrMissed, assistMadeOrMised, setAssistMadeOrMised }) => {
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
          <View style={{ marginTop: 20, }}>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 24,
              lineHeight: 28, fontFamily: Fonts.Regular
            }}
            >
              Pippen Jr.
            </Text>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 24,
              lineHeight: 28, fontFamily: Fonts.Regular
            }}
            >
              +3pt Shot
            </Text>
          </View>
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
                Chris Paul
              </Text>
            </View>
            : <></>
          }

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
  setCourtFoul }) => {
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

  const selectPlayer = (id) => {
    // setCurrentView('playing');
    setCourtFoul(id);
    setOnFoul(true);

  }

  return (
    <View style={{ paddingVertical: 20, }}>
      {isBlueTeamPlaying ?
        <ScoreActiveTeamPlayer
          itemStyle={{
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
          }}
          heading={'Who fouled'}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            if (e == 'other team') {
              selectPlayer(e)
            } else {
              selectPlayer(e.id)
            }
          }} />

        :
        <ScoreActiveTeamPlayer
          itemStyle={{
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
          }}
          heading={'Who fouled'}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            if (e == 'other team') {
              selectPlayer(e)
            } else {
              selectPlayer(e.id)
            }
          }} />
      }

    </View>)
}


const WhoShootFreeThrow = ({ setOnFreeThrow, playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, setCourtFreeThrow }) => {

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

  const selectPlayer = (id) => {
    // setCurrentView('playing');
    setCourtFreeThrow(id);
    setOnFreeThrow(true);

  }

  return (
    <View style={{ paddingVertical: 20, }}>
      {isBlueTeamPlaying ?
        <ScoreActiveTeamPlayer
          itemStyle={{
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
          }}
          heading={'Who shooting the free throw ?'}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            if (e == 'other team') {
              selectPlayer(e)
            } else {
              selectPlayer(e.id)
            }
          }} />

        :
        <ScoreActiveTeamPlayer
          itemStyle={{
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
          }}
          heading={'Who shooting the free throw ?'}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            if (e == 'other team') {
              selectPlayer(e)
            } else {
              selectPlayer(e.id)
            }
          }} />
      }

    </View>)
}



export { AssistFlow, AssistShootScore }