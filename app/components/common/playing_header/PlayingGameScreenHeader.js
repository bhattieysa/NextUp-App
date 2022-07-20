import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, StyleSheet, StatusBar } from 'react-native';
import Navigation from "../../../lib/Navigation";
import { Colors, CommonStyles, Fonts, Layout } from "../../../constants";
import Svg, { Path } from "react-native-svg"
let wide = Layout.width;

const PlayingGameScreenHeader = ({
  blueTeamScore,
  redTeamScore,
  blueTeamCaptain,
  blueTeamClubName,
  redTeamCaptain,
  redTeamClubName,
  onPressQuarter,
  round,
  style,
  isEnabled,
  toggleSwitch,
  nav,
  setView
}) => {

  useEffect(() => {
    // StatusBar.setTranslucent(true);
    // StatusBar.setBackgroundColor("transparent");
  })




  return <View style={{ ...styles.header, ...style, }}>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      width: '95%',

    }}>
      {renderBackArrow(nav, setView)}
      <View style={{ flex: 1, flexDirection: 'row', }}>
        <Text style={{ ...styles.scoreTxt }}>{blueTeamScore}</Text>
        {blueTeamDetails()}
        <Switch
          trackColor={{ false: Colors.newGrayFontColor, true: Colors.newGrayFontColor }}
          thumbColor={isEnabled ? Colors.lightRed : Colors.lightBlue}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        {redTeamDetails()}
        <Text style={{ ...styles.scoreTxt, color: Colors.lightRed }}>{redTeamScore}</Text>
      </View>
      {renderPlayingRound()}
    </View>
  </View>


  function renderBackArrow(nav, setView) {
    return <TouchableOpacity
      onPress={nav == "playing" ? () => Navigation.back() :
        nav == "shootScore" ? () => setView("initMadeMissedScreen") :
          nav == "assistScreen" ? () => setView("shootScore") :
            nav == "throwScreen" ? () => setView("assistScreen") :
              nav == "madeMissedScreen" ? () => setView("throwScreen") :
                nav == "gotRebound" ? () => setView("whoShot") :
                  () => setView("playing")
      }
    // onPress={() => Navigation.back()}    Navigation.navigate('ExploreSearch', { to: true })
    >
      <Image style={styles.backArrow} source={require('../../../Images/back_ico.png')} />
    </TouchableOpacity>
  }

  function blueTeamDetails() {
    return (
      <View style={{
        ...styles.teamDetailCNTR,
        alignItems: 'center'
      }}>
        <View style={{
          ...styles.circle, backgroundColor: Colors.lightBlue,
          justifyContent: 'center', alignItems: 'center'

        }}>
          <Text style={styles.circleTxt}>
            {blueTeamCaptain?.charAt(0)}
          </Text>
        </View>

        {renderCaptainAndTeamName()}
      </View>
    )
  }

  function renderCaptainAndTeamName() {
    return <View style={{ marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.captainName}>{blueTeamCaptain}</Text>
      {/* <Text style={styles.clubName}>{blueTeamClubName}</Text> */}
    </View>
  }

  function renderRedTeamName() {
    return <View style={{ marginRight: 5, flex: 1, alignItems: 'flex-end' }}>
      <Text style={styles.captainName}>{redTeamCaptain}</Text>
      {/* <Text style={{ ...styles.clubName, color: Colors.lightRed }}>{redTeamClubName}</Text> */}
    </View>
  }

  function redTeamDetails() {
    return <View style={{
      ...styles.teamDetailCNTR, alignItems: 'center',
    }}>
      {renderRedTeamName()}
      {/*Circle*/}
      <View style={{
        ...styles.circle,
        ...{
          backgroundColor: Colors.lightRed,
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}>
        <Text style={styles.circleTxt}>
          {redTeamCaptain?.charAt(0)}
        </Text>
      </View>

    </View>
  }

  function renderPlayingRound() {
    return <TouchableOpacity style={[styles.playingRoundContainer]}
      onPress={onPressQuarter}
      activeOpacity={1}
    >
      <Text style={styles.roundTxt}>{round}</Text>
      <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="m12 16-6-6 1.41-1.41L12 13.17l4.59-4.58L18 10l-6 6Z" fill="#fff" />
      </Svg>
    </TouchableOpacity>
  }

}

const styles = StyleSheet.create({
  header: {
    // flexDirection: 'row',
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: '1.5%',
    // paddingVertical: '1%',
    backgroundColor: '#32353E',

  },
  backArrow: {
    width: wide * 0.08, height: wide * 0.08,
    borderRadius: wide * 0.02,
    borderWidth: 1, borderColor: Colors.borderColor
  },
  scoreTxt: {
    marginHorizontal: 30,
    color: Colors.lightBlue,
    fontSize: 25,
    fontFamily: Fonts.Bold,
  },
  //    Team Names and Scores
  circle: {
    height: 35,
    width: 35,
    borderRadius: 22.5,
  },
  teamDetailCNTR: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',

  },
  captainName: {
    color: Colors.light,
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
  },
  clubName: {
    color: Colors.btnBg,
    fontSize: 10,
    marginTop: 2,
    fontFamily: Fonts.Regular,
  },
  circleTxt: {
    color: Colors.light,
    fontSize: 20,
    fontFamily: Fonts.Bold,
  },
  playingRoundContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  downArrow: {
    width: wide * 0.05,
    height: wide * 0.05,
  },
  roundTxt: {
    color: Colors.light,
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
})

export default PlayingGameScreenHeader;
