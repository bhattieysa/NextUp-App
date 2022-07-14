import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, CommonStyles } from "../../constants";
import TextInCircle from "./TextInCircle";

const ScoreActiveTeamPlayer = ({ heading, list, activePlayer, isBlueTeam, onPress, itemStyle, containerStyle }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);

  useEffect(() => {
    setNumberList(list);
    setBgColor(isBlueTeam ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 10,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ width: '100%', alignSelf: 'center' }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{ ...listContainer, ...containerStyle, justifyContent: 'space-around' }}>
      {
        numberList.map((e, index) => <TextInCircle
          key={index}
          text={e.number}
          onPress={() => onPress(e)}
          style={{
            ...{
              width: 55,
              height: 55,
              marginTop: 10,
              borderRadius: 55 / 2,
              borderWidth: 1,
              borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
              backgroundColor: e.id === activePlayer ? Colors.lightGreen : bgColor
            }, ...itemStyle
          }}
          txtStyle={{ color: Colors.base, }} />)
      }
      <TextInCircle
        text={'Other Team'}
        onPress={() => onPress('other team')}
        style={{
          ...{
            width: 55,
            height: 55,
            marginTop: 10,
            borderRadius: 55 / 2,
            borderWidth: 1,
            borderColor: activePlayer == 'other team' ? Colors.darkYellow : bgColor,
            backgroundColor: activePlayer == 'other team' ? Colors.lightGreen : bgColor
          }, ...itemStyle
        }}
        txtStyle={{ color: Colors.base, }} />
    </View>
  </View>
}


// new active team player
const ActiveTeamPlayer = ({ heading, list, activePlayer, isBlueTeam, onPress, itemStyle, containerStyle }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);
  useEffect(() => {
    console.log("user listtt", list)
    setNumberList(list);
    setBgColor(isBlueTeam ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    // marginLeft: 10,
    // alignItems: 'center',
    // justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 10,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ ...containerStyle, }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{ ...listContainer, }}>
      <View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ width: '60%' }}>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 14,
              lineHeight: 16, fontFamily: Fonts.Bold
            }}>Player</Text>

          </View>
          <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-between', alignItems: "center" }}>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 14,
              lineHeight: 16, fontFamily: Fonts.Bold,
            }}>PTS</Text>
            <Text style={{
              color: Colors.overlayWhite, fontSize: 14,
              lineHeight: 16, fontFamily: Fonts.Bold,
            }}>AST</Text>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          {numberList.map((e, index) => {
            return (
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '60%' }}>
                  <Text style={{
                    color: Colors.light, fontSize: 14,
                    lineHeight: 20, fontFamily: Fonts.Regular
                  }}>Player name</Text>

                </View>
                <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{
                    color: Colors.light, fontSize: 14,
                    lineHeight: 20, fontFamily: Fonts.Regular,
                    marginLeft: 4
                  }}>12</Text>
                  <Text style={{
                    color: Colors.light, fontSize: 14,
                    lineHeight: 20, fontFamily: Fonts.Regular, marginRight: 4
                  }}>10</Text>
                </View>
              </View>
            )
          })}

        </View>

      </View>



      {/* {
        numberList.map((e, index) => <TextInCircle
          key={index}
          text={e.number}
          onPress={() => onPress(e)}
          style={{
            ...{
              width: 55,
              height: 55,
              marginTop: 10,
              borderRadius: 55 / 2,
              borderWidth: 1,
              borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
              backgroundColor: e.id === activePlayer ? Colors.lightGreen : bgColor
            }, ...itemStyle
          }}
          txtStyle={{ color: Colors.base, }} />)
      } */}
    </View>
  </View>
}


const AssistTeamPlayer = ({ heading, list, activePlayer, isBlueTeam, onPress, itemStyle, containerStyle }) => {
  const [numberList, setNumberList] = useState([]);
  const [bgColor, setBgColor] = useState(Colors.lightBlue);

  useEffect(() => {
    setNumberList(list);
    setBgColor(isBlueTeam ? Colors.lightBlue : Colors.lightRed)
  }, [list]);

  const listContainer = {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

  }

  const headingTxt = {
    marginLeft: 10,
    color: Colors.fontColorGray,
    fontFamily: Fonts.SemiBold,
  }

  return <View style={{ width: '100%', marginBottom: 40 }}>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{ ...listContainer, ...containerStyle, justifyContent: 'space-around' }}>
      {
        numberList.map((e, index) => <TextInCircle
          key={index}
          text={e.number}
          onPress={() => onPress(e)}
          style={{
            ...{
              width: 55,
              height: 55,
              marginTop: 10,
              borderRadius: 55 / 2,
              borderWidth: 1,
              borderColor: e.id === activePlayer ? Colors.darkYellow : bgColor,
              backgroundColor: e.id === activePlayer ? Colors.lightGreen : bgColor
            }, ...itemStyle
          }}
          txtStyle={{ color: Colors.base, }} />)
      }

    </View>
  </View>
}


export { ActiveTeamPlayer, ScoreActiveTeamPlayer, AssistTeamPlayer };
