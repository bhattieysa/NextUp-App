import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { ScoreActiveTeamPlayer } from '../../components/common/ActiveTeamPalyer';

const FoulBy = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, reboundPlayer, setReboundPlayer, setFoulBy }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "foulBy" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
      :
      toggleSwitch()

  };

  const selectPlayer = (id) => {
    // setCurrentView('playing');
    setFoulBy(id);
    setCurrentView('foulType');

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

export { FoulBy }