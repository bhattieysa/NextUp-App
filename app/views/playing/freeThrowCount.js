import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants";


const FreeThrowCount = ({ activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, clickedCourtArea, setInitMadeOrMissed, setFreeThrowCount }) => {
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
    currentView == "freeThrowCount" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer))
      :
      toggleSwitch()
  };

  const selectPlayer = (id) => {
    // setCurrentView('playing');
    // setAssistPlayer(id);
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
            Number of free throw
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
              style={{
                width: width * 0.13, height: width * 0.13,
                borderRadius: width * 0.13 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren
              }}
              onPress={() => {
                setFreeThrowCount(1)
                setCurrentView('freeThrow')
              }}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                textAlign: 'center'
                // backgroundColor: 'red'
              }}>
                1
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: width * 0.13, height: width * 0.13,
                borderRadius: width * 0.13 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren,
                marginLeft: width * 0.09
              }}
              onPress={() => {
                setFreeThrowCount(2)
                setCurrentView('freeThrow')
              }}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                textAlign: 'center'
                // backgroundColor: 'red'
              }}>
                2
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: width * 0.13, height: width * 0.13,
                borderRadius: width * 0.13 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren,
                marginLeft: width * 0.09
              }}
              onPress={() => {
                setFreeThrowCount(3)
                setCurrentView('freeThrow')
              }}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                textAlign: 'center'
                // backgroundColor: 'red'
              }}>
                3
              </Text>
            </Pressable>

          </View>

        </View>

      </View>

    </View>)
}

export { FreeThrowCount }