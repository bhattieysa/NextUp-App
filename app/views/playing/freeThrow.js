import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants";


const FreeThrow = ({ activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, freeThrowCount, freeThrowPlayer, event, setEvent,
  setIsEventCompleted }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);

  const [firstThrow, setFirstTrow] = useState(null)
  const [firstThrowVal, setFirstTrowVal] = useState('')
  const [secondThrow, setSecondTrow] = useState(null)
  const [secondThrowVal, setSecondTrowVal] = useState('')
  const [thirdThrow, setThirdTrow] = useState(null)
  const [thiedThrowVal, setThirdTrowVal] = useState('')
  const [throwCount, setThrowCount] = useState(freeThrowCount)
  const [currentCount, setCurrentCount] = useState(1)
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

  const handleMadeOrMissed = (val) => {
    if (currentCount == 1) {
      setFirstTrowVal(val)
      if (val == true) {
        setEvent([...event, `freeThrow1_made`])
      } else {
        setEvent([...event, `freeThrow1_missed`])
      }
      if (currentCount == throwCount) {
        // handleEventInsert('freeThrow')
        setIsEventCompleted(true);
        setCurrentView('playing')
      } else {
        setCurrentCount(currentCount + 1)
      }
    } else if (currentCount == 2) {
      setSecondTrowVal(val)
      if (val == true) {
        setEvent([...event, `freeThrow2_made`])
      } else {
        setEvent([...event, `freeThrow2_missed`])
      }
      if (currentCount == throwCount) {
        // handleEventInsert('freeThrow')
        setIsEventCompleted(true);
        setCurrentView('playing')
      } else {
        setCurrentCount(currentCount + 1)
      }
    } else if (currentCount == 3) {
      setThirdTrowVal(val)
      if (val == true) {
        setEvent([...event, `freeThrow3_made`])
      } else {
        setEvent([...event, `freeThrow3_missed`])
      }
      if (currentCount == throwCount) {
        // handleEventInsert('freeThrow')
        setIsEventCompleted(true);
        setCurrentView('playing')
      } else {
        setCurrentCount(currentCount + 1)
      }
    }
  }

  return (
    <View style={{
      width: '100%',
      height: '90%',
      alignItems: 'center'
    }}>


      <View style={{
        width: '90%',
        height: '70%',
        marginTop: 10,
      }}>
        <Text style={{
          color: Colors.newGrayFontColor, fontSize: 24,
          lineHeight: 28, fontFamily: Fonts.Regular
        }}
        >
          {`${currentCount} Free Throw`}
        </Text>
        <View style={{
          flexDirection: 'row',
          marginTop: 10,
          // marginHorizontal: width * 0.02,
          width: '100%',
          height: '90%',
          justifyContent: 'space-around',
        }}>

          <View style={{
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: width * 0.04
          }}>

            <Pressable
              style={{
                width: width * 0.14, height: width * 0.14,
                borderRadius: width * 0.14 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: Colors.btnGren
              }}
              onPress={() => handleMadeOrMissed(true)}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                textAlign: 'center'
                // backgroundColor: 'red'
              }}>
                Made
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: width * 0.14, height: width * 0.14,
                borderRadius: width * 0.14 / 2,
                alignItems: 'center', justifyContent: 'center',
                marginHorizontal: width * 0.04,
                backgroundColor: Colors.lightRed
              }}
              onPress={() => handleMadeOrMissed(false)}
            >
              <Text style={{
                color: Colors.base,
                fontSize: 22,
                lineHeight: 26,
                fontFamily: Fonts.Bold,
                textAlign: 'center'
                // backgroundColor: 'red'
              }}>
                Missed
              </Text>
            </Pressable>
          </View>
        </View>

      </View>

      {/* <Pressable
        style={{
          width: width * 0.1, height: width * 0.04,
          borderRadius: 8,
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: Colors.btnGren,
          marginTop: 8,
          marginLeft: 20
        }}
        onPress={() => {
          setCurrentView('playing')
        }}
      >
        <Text style={{
          color: Colors.base,
          fontSize: 20,
          lineHeight: 26,
          fontFamily: Fonts.Bold,
          textAlign: 'center'
          // backgroundColor: 'red'
        }}>
          Done
        </Text>
      </Pressable> */}

    </View>)
}

export { FreeThrow }