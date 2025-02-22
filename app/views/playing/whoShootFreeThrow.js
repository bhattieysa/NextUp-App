import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { ScoreActiveTeamPlayer } from '../../components/common/ActiveTeamPalyer';

const WhoShootFreeThrow = ({ playersList, activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, selectedPlayer, setCourtFreeThrow, setPlayerScore,
  event, setEvent }) => {

  const [activePlayerList, setActivePlayerList] = useState(null);
  const { width, height } = useDimensions().window;
  const fullPlayerList = playersList;

  useEffect(() => {
    // console.log("is blueee", isBlueTeamPlaying, "..")
    removeActivePlayerFromList();
  }, []);

  const removeActivePlayerFromList = () => {
    debugger
    currentView == "whoShootFreeThrow" ?
      setActivePlayerList(fullPlayerList.filter(player => player.id !== activePlayerId))
      :
      toggleSwitch()

  };

  const selectPlayer = (e) => {
    // setCurrentView('playing');
    if (e == "other team") {
      setCourtFreeThrow(e);
    } else {
      setCourtFreeThrow(e);
    }
    // setPlayerScore(e, 'thr')
    setCurrentView('madeMissedScreen');

  }

  return (
    <>
      {activePlayerList != null ?
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
              heading={'Who shooting the free throw ?'}
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
              heading={'Who shooting the free throw ?'}
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

        </View>
        :
        <></>
      }
    </>
  )
}

export { WhoShootFreeThrow }