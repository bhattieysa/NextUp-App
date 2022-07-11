import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, CommonStyles } from "../../constants";
import TextInCircle from "./TextInCircle";

const ActiveTeamPlayer = ({ heading, list, activePlayer, isBlueTeam, onPress, itemStyle, containerStyle }) => {
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

  return <>
    <Text style={headingTxt}>
      {heading}
    </Text>
    <View style={{ ...listContainer, ...containerStyle, }}>

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
  </>
}


export default ActiveTeamPlayer;
