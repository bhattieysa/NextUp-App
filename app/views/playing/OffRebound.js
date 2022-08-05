import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { ScoreActiveTeamPlayer } from '../../components/common/ActiveTeamPalyer';

const OffRebound = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, reboundPlayer, setReboundPlayer,
  title, setPlayerScore, event, setEvent, setTypeOfEvent, setIsEventCompleted }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    //   removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "offRebound" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
      :
      toggleSwitch()

  };

  const selectPlayer = (e) => {
    setTypeOfEvent('off_reb')
    if (e == 'other team') {
      setReboundPlayer(e)
      setEvent([`offRebounded_otherTeam`])
    } else {
      setReboundPlayer(e.playerId)
      setEvent([`offRebounded_${e.playerId}`])
    }
    setPlayerScore(e, "reb")
    setIsEventCompleted(true)
    setCurrentView('playing');

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
          heading={title}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
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
          heading={title}
          list={activePlayerList}
          isBlueTeam={isBlueTeamPlaying}
          activePlayer={selectedPlayer}
          onPress={(e) => {
            selectPlayer(e)
          }} />
      }

    </View>)
}

export { OffRebound }