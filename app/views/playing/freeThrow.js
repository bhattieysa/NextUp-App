import React, { useEffect, useState } from "react";
import { useDimensions } from "@react-native-community/hooks";
import { Pressable, Text, View } from "react-native";
import { Colors, Fonts } from "../../constants";


const FreeThrow = ({ activePlayerId, isBlueTeamPlaying, setCurrentView,
  currentView, toggleSwitch, clickedCourtArea, setInitMadeOrMissed, setFoulType }) => {
  // const [activePlayerList, setActivePlayerList] = useState(playersList);
  const [firstThrow, setFirstTrow] = useState(null)
  const [firstThrowVal, setFirstTrowVal] = useState('')
  const [secondThrow, setSecondTrow] = useState(null)
  const [secondThrowVal, setSecondTrowVal] = useState('')
  const [thirdThrow, setThirdTrow] = useState(null)
  const [thiedThrowVal, setThirdTrowVal] = useState('')
  const [throwCount, setThrowCount] = useState('')
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
    if (firstThrow == true) {
      setFirstTrowVal(val)
    }
    if (secondThrow == true) {
      setSecondTrowVal(val)
    }
    if (thirdThrow == true) {
      setThirdTrowVal(val)
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
      }}>
        <Text style={{
          color: Colors.newGrayFontColor, fontSize: 24,
          lineHeight: 28, fontFamily: Fonts.Regular
        }}
        >
          Free Throw
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
            width: '50%',
            marginTop: 10,
            justifyContent: 'space-around',
          }}>
            <Pressable
              style={{
                width: width * 0.1, height: width * 0.1,
                borderRadius: width * 0.1 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: firstThrow == true ? Colors.lightGreen : Colors.lightRed
              }}
              onPress={() => {
                setFirstTrow(true)
                setSecondTrow(false)
                setThirdTrow(false)

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
                width: width * 0.1, height: width * 0.1,
                borderRadius: width * 0.1 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: secondThrow == true ? Colors.lightGreen : Colors.lightRed
              }}
              onPress={() => {
                setFirstTrow(false)
                setSecondTrow(true)
                setThirdTrow(false)
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
                width: width * 0.1, height: width * 0.1,
                borderRadius: width * 0.1 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: thirdThrow == true ? Colors.lightGreen : Colors.lightRed
              }}
              onPress={() => {
                setFirstTrow(false)
                setSecondTrow(false)
                setThirdTrow(true)
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
          <View style={{
            height: '70%',
            backgroundColor: Colors.newGrayFontColor, width: 1,
            marginHorizontal: width * 0.04
          }} />
          <View style={{
            flexDirection: 'row',
            marginTop: 10,
            marginHorizontal: width * 0.04
          }}>

            <Pressable
              style={{
                width: width * 0.1, height: width * 0.1,
                borderRadius: width * 0.1 / 2,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: firstThrow == true ?
                  firstThrowVal == true ? Colors.btnGren : Colors.lightRed
                  : secondThrow == true ? secondThrowVal == true ? Colors.btnGren : Colors.lightRed
                    : thirdThrow == true ? thiedThrowVal == true ? Colors.btnGren : Colors.lightRed
                      : Colors.lightRed
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
                width: width * 0.1, height: width * 0.1,
                borderRadius: width * 0.1 / 2,
                alignItems: 'center', justifyContent: 'center',
                marginHorizontal: width * 0.04,
                backgroundColor: firstThrow == true ?
                  firstThrowVal == false ? Colors.btnGren : Colors.lightRed
                  : secondThrow == true ? secondThrowVal == false ? Colors.btnGren : Colors.lightRed
                    : thirdThrow == true ? thiedThrowVal == false ? Colors.btnGren : Colors.lightRed
                      : Colors.lightRed
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

      <Pressable
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
      </Pressable>


    </View>)
}

export { FreeThrow }