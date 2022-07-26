import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants";


const CourtMadeMissScreen = ({ activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, clickedCourtArea, setInitMadeOrMissed, event, setEvent,
  setTypeOfEvent }) => {
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
            Made / Missed
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
                setInitMadeOrMissed({ "isMade": true })
                setEvent(["made"])
                setTypeOfEvent('court_score')
                setCurrentView('shootScore')
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
                marginLeft: width * 0.09
              }}
              onPress={() => {
                setInitMadeOrMissed({ "isMade": false })
                setEvent(["missed"])
                setTypeOfEvent('court_score')
                setCurrentView('whoShot')
                // setCurrentView('playing')
              }}
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

export { CourtMadeMissScreen }