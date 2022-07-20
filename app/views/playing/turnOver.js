import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants";


const TurnOver = ({ activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, clickedCourtArea, setInitMadeOrMissed }) => {
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
            Steal By? / Offensive Foul On?
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              style={{
                width: width * 0.16, height: width * 0.16,
                borderRadius: width * 0.16 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren
              }}
              onPress={() => {
                setCurrentView('stoleBy')
              }}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 20,
                lineHeight: 24,
                fontFamily: Fonts.Bold,
                // backgroundColor: 'red'
              }}>
                Steal
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: width * 0.14, height: width * 0.14,
                borderRadius: width * 0.14 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.lightRed,
                marginLeft: width * 0.09
              }}
              onPress={() => {
                setCurrentView('foulBy')
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
                Offensive Foul
              </Text>
            </Pressable>
          </View>

        </View>

      </View>

    </View>)
}

export { TurnOver }