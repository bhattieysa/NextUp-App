import React from 'react';
import { Text, View, StyleSheet, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, CommonStyles, Fonts } from "../../constants";
import Navigation from "../../lib/Navigation";


const TeamVsCard = ({ rightTeamCaptain, rightTeamClubName, leftTeamCaptain, leftTeamClubName, style }) => {
  return <View style={{
    ...styles.card,
    ...styles.mainContainer,
    ...style
  }}>
    {leftTeamDetail()}
    <Text style={styles.vsTxt}>VS</Text>
    {rightTeamDetail()}
  </View>


  function leftTeamDetail() {


    return <View style={styles.teamDetailCNTR}>

      <TouchableOpacity onPress={() => console.log("Left team pressed")}>
        <View style={{ ...styles.numberContainerCircle, ...styles.circle }}>
          <Text style={styles.circleTxt}>
            {leftTeamCaptain?.charAt(0)}
          </Text>
        </View>
      </TouchableOpacity>
      {renderCaptainAndTeamName()}
    </View>
  }

  function renderCaptainAndTeamName() {

    return <View style={{ paddingLeft: 5, flex: 1 }}>
      <TouchableOpacity onPress={() => console.log("Captain team pressed")}>
        <Text style={styles.captainName}>{leftTeamCaptain}</Text>
      </TouchableOpacity>
      {/* <Text style={styles.clubName}>{leftTeamClubName}</Text> */}
    </View>
  }

  function rightTeamDetail() {


    return <View style={{ ...styles.teamDetailCNTR, ...{ justifyContent: 'flex-end' } }}>
      {/*Names*/}
      <View style={{ marginRight: 5, flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => console.log("Right team pressed")}>
          <Text style={styles.captainName}>{rightTeamCaptain}</Text>
        </ TouchableOpacity>
        {/* <Text style={styles.clubName}>{rightTeamClubName}</Text> */}
      </View>
      {/*Circle*/}
      <TouchableOpacity onPress={() => console.log("Right team pressed")}>
        <View style={{
          ...styles.numberContainerCircle, ...styles.circle,
          ...{ backgroundColor: Colors.lightRed, }
        }}>
          <Text style={styles.circleTxt}>
            {rightTeamCaptain?.charAt(0)}
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20
  },
  vsTxt: {
    fontSize: 16,
    color: Colors.light,
    marginHorizontal: 10
  },
  circle: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
  },
  teamDetailCNTR: {
    flexDirection: "row",
    flex: 1, alignItems: 'center'
  },
  captainName: {
    color: Colors.light, fontSize: 14,
    fontFamily: Fonts.SemiBold,
  },
  clubName: {
    color: Colors.btnBg, fontSize: 12,
    marginTop: 4,
    fontFamily: Fonts.Regular,

  },
  circleTxt: {
    color: Colors.light, fontSize: 22,
    fontFamily: Fonts.Bold,
  },
  numberContainerCircle: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    backgroundColor: Colors.lightBlue,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.lightDark,
  }
})

export default TeamVsCard;
