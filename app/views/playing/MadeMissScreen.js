import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { ScoreActiveTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { AssistTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { Colors, Fonts } from "../../constants";


const MadeMissScreen = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, selectedAssistPlayer, setAssistPlayer,
  clickedCourtArea, setMadeOrMissed, madeOrMissed, initMadeOrMissed,
  courtFreeThrowPlayer, event, setEvent, setIsEventCompleted }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  // const fullPlayerList = playersList;

  useEffect(() => {
    debugger
    console.log("is blueee", clickedCourtArea)
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
                if (madeOrMissed != undefined && madeOrMissed != null) {
                  debugger
                  setMadeOrMissed([
                    ...madeOrMissed,
                    {
                      "x": clickedCourtArea.x,
                      "y": clickedCourtArea.y,
                      "isMade": initMadeOrMissed.isMade
                    }
                  ])
                  setEvent([...event, `free_throw_made_${courtFreeThrowPlayer}`])
                  // handleEventInsert('court_score')
                  setIsEventCompleted(true)
                  setCurrentView("playing")
                } else {
                  debugger
                  setMadeOrMissed([
                    {
                      "x": clickedCourtArea.x,
                      "y": clickedCourtArea.y,
                      "isMade": initMadeOrMissed.isMade,
                    }
                  ])
                  setEvent([...event, `free_throw_made_${courtFreeThrowPlayer}`])
                  // handleEventInsert('court_score')
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
                if (madeOrMissed != undefined && madeOrMissed != null) {
                  debugger
                  setMadeOrMissed([
                    ...madeOrMissed,
                    {
                      "x": clickedCourtArea.x,
                      "y": clickedCourtArea.y,
                      "isMade": initMadeOrMissed.isMade,
                    }
                  ])
                  setEvent([...event, `free_throw_missed_${courtFreeThrowPlayer}`])
                  // handleEventInsert('court_score')
                  setIsEventCompleted(true)
                  setCurrentView("playing")
                } else {
                  debugger
                  setMadeOrMissed([
                    {
                      "x": clickedCourtArea.x,
                      "y": clickedCourtArea.y,
                      "isMade": initMadeOrMissed.isMade,
                    }
                  ])
                  setEvent([...event, `free_throw_missed_${courtFreeThrowPlayer}`])
                  // handleEventInsert('court_score')
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

export default MadeMissScreen