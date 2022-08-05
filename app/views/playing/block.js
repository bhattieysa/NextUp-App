import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { ScoreActiveTeamPlayer } from '../../components/common/ActiveTeamPalyer';

const Block = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, setBlockBy, setPlayerScore,
  event, setEvent, setTypeOfEvent, setIsEventCompleted }) => {
  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    //   removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "deffRebound" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
      :
      toggleSwitch()

  };

  const selectPlayer = (e) => {
    // setCurrentView('playing');
    setTypeOfEvent('block')
    debugger
    setTypeOfEvent('block')
    if (e == 'other team') {
      setBlockBy(e);
      setEvent([`block_otherTeam`])
    } else {
      setBlockBy(e.playerId);
      setEvent([`block_${e.playerId}`])
    }
    setPlayerScore(e, 'blk')
    setIsEventCompleted(true)
    // handleEventInsert('block')
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
          heading={'Who Blocked'}
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
          heading={'Who Blocked'}
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

export { Block }