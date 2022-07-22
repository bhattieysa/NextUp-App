import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { ScoreActiveTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { AssistTeamPlayer } from "../../components/common/ActiveTeamPalyer";
import { Colors, Fonts } from "../../constants";


const AssistScreen = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView, setActivePlayer,
  currentView, toggleSwitch, selectedPlayer, setAssistPlayer, setPlayerScore }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {

    // console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "assistScreen" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== selectedPlayer))
      :
      toggleSwitch()
  };

  const selectPlayer = (e) => {
    // setCurrentView('playing');
    setAssistPlayer(e.id);
    setPlayerScore(e, "ast")
    setCurrentView('throwScreen')


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
        <View style={{ width: '30%', justifyContent: 'center', marginBottom: 20, }}>
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
        <View style={{ width: 1, height: '70%', backgroundColor: Colors.newGrayFontColor, marginTop: 30 }} />

        <View style={{ width: '65%', alignItems: 'center', justifyContent: 'center' }}>
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
                selectPlayer(e)
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
                selectPlayer(e)
                // setCurrentView('throwScreen')
              }} />
          }

        </View>

      </View>
      <View style={{
        width: '100%', flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Pressable style={{
          width: 85, height: 25, backgroundColor: Colors.btnRed,
          borderRadius: 8, justifyContent: 'center', alignItems: 'center',
          marginLeft: width * 0.1
        }}
          onPress={() => setCurrentView('throwScreen')}
        >
          <Text style={{
            color: Colors.light, fontSize: 12,
            lineHeight: 18, fontFamily: Fonts.Regular
          }}>Skip</Text>
        </Pressable>

      </View>






    </View>)
}

export default AssistScreen