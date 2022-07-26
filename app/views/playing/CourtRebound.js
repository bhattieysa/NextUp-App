import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { ScoreActiveTeamPlayer } from '../../components/common/ActiveTeamPalyer';

const CourtRebound = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, reboundPlayer, setReboundPlayer,
  title, setPlayerScore, event, setEvent, setTypeOfEvent, setIsEventCompleted,
  clickedCourtArea, madeOrMissed, setMadeOrMissed, initMadeOrMissed }) => {

  const [activePlayerList, setActivePlayerList] = useState(playersList);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    //   removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "courtRebound" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
      :
      toggleSwitch()

  };

  const selectPlayer = (e) => {
    setTypeOfEvent('court_score_missed')
    if (madeOrMissed != undefined && madeOrMissed != null) {
      setMadeOrMissed([
        ...madeOrMissed,
        {
          "x": clickedCourtArea.x,
          "y": clickedCourtArea.y,
          "isMade": initMadeOrMissed.isMade
        }
      ])
    } else {
      setMadeOrMissed([
        {
          "x": clickedCourtArea.x,
          "y": clickedCourtArea.y,
          "isMade": initMadeOrMissed.isMade
        }
      ])
    }

    if (e == 'other team') {
      setReboundPlayer(e)
      setEvent([...event, `rebounded_otherTeam`])
    } else {
      setReboundPlayer(e.playerId)
      setEvent([...event, `rebounded_${e.playerId}`])
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
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
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
            width: width / 8.5,
            height: width / 8.5,
            marginTop: 30,
            borderRadius: (width / 8.5) / 2,
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

export { CourtRebound }