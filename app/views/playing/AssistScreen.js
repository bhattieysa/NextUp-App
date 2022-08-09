import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { ScoreActiveTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { AssistTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { Colors, Fonts, } from "../../constants";
import { Court_ptr } from '../../constants/constant';


const AssistScreen = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, setAssistPlayer, setPlayerScore,
  event, setEvent, clickedCourtArea }) => {

  const [activePlayerList, setActivePlayerList] = useState(null);
  const [ptsPoints, setPtsPoints] = useState("");
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    debugger
    if (clickedCourtArea !== '' && clickedCourtArea != undefined) {
      debugger
      let selected_court = clickedCourtArea.court_nm;
      if (Court_ptr.ptr2.includes(selected_court)) {
        setPtsPoints(2)
      } else {
        setPtsPoints(3)
      }
    }
    debugger
    console.log("is blueee", selectedPlayer)
    console.log("is Ptsss", ptsPoints)


    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger

    currentView == "assistScreen" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer.id))
      :
      toggleSwitch()
  };

  const selectPlayer = (e) => {
    // setCurrentView('playing');
    debugger
    if (e == 'other team') {
      setAssistPlayer(e);
      setEvent([...event, `assist_otherTeam`])
    } else {
      setAssistPlayer(e);
      setEvent([...event, `assist_${e.playerId}`])

    }
    debugger
    setPlayerScore(e, "ast")
    setCurrentView('throwScreen')
  }

  return (
    <>
      {activePlayerList != null ?
        <View style={{
          width: '100%',
          height: '85%',
        }}>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            height: '90%',
            justifyContent: 'space-between',
            // backgroundColor: 'red'
          }}>
            <View style={{
              width: '20%', justifyContent: 'center',
              marginBottom: 20,
              alignItems: 'center'
              // backgroundColor: 'green'
            }}>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular
              }}
              >
                {`+${ptsPoints}pt Shot By`}
              </Text>
              <Text style={{
                color: Colors.newGrayFontColor, fontSize: 24,
                lineHeight: 28, fontFamily: Fonts.Regular,
                marginTop: 5,
              }}
              >
                {selectedPlayer?.playerName}
              </Text>

            </View>
            <View style={{
              width: 1, height: '70%',
              backgroundColor: Colors.newGrayFontColor, marginTop: 30
            }} />

            <View style={{
              width: '75%', alignItems: 'center',
              justifyContent: 'center', marginTop: 10
            }}>
              {isBlueTeamPlaying ?
                <AssistTeamPlayer
                  itemStyle={{
                    // width: width / 9.5,
                    // height: width / 9.5,
                    // borderRadius: (width / 9.5) / 2,
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

          </View>
          <View style={{
            width: '100%', flexDirection: 'row',
            justifyContent: 'center',
            // marginTop: -10,
          }}>
            <Pressable style={{
              width: 85, height: 25, backgroundColor: Colors.btnRed,
              borderRadius: 8, justifyContent: 'center', alignItems: 'center',
              // marginLeft: width * 0.01
            }}
              onPress={() => setCurrentView('throwScreen')}
            >
              <Text style={{
                color: Colors.light, fontSize: 12,
                lineHeight: 18, fontFamily: Fonts.Regular
              }}>Skip</Text>
            </Pressable>

          </View>






        </View>
        :
        <></>
      }
    </>
  )
}

export default AssistScreen