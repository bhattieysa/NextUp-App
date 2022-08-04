
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Colors, Fonts, Layout } from "../../constants";

let width = Layout.width

const TeamTable = ({ info, response }) => {

  let chal = []
  let def

  if (response) {
    const res = Object.entries(response)

    chal = response.challengerQuarterInfo
    def = response.defenderQuarterInfo
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={{ ...styles.name, color: Colors.light }}>Team</Text>
        <Text style={{
          ...styles.number,
          fontFamily: Fonts.SemiBold,
          color: Colors.light
        }}>1</Text>

        <Text style={{
          ...styles.number,
          fontFamily: Fonts.SemiBold,
          color: Colors.light
        }}>2</Text>

        <Text style={{
          ...styles.number,
          fontFamily: Fonts.SemiBold,
          color: Colors.light
        }}>3</Text>

        <Text style={{
          ...styles.number,
          fontFamily: Fonts.SemiBold,
          color: Colors.light
        }}>4</Text>

        {/* <Text style={{
                ...styles.number,
                fontFamily:Fonts.SemiBold,
                color: Colors.light
                }}>T</Text> */}

      </View>
      {renderRow(info?.challengerName || response?.challengerName, 2)}
      {renderRow(info?.defenderName || response?.defenderName, 3)}
    </>
  )

  function renderRow(team, rowNo) {
    return <View style={styles.container}>
      <Text style={{ ...styles.name, color: rowNo === 2 ? Colors.lightBlue : Colors.light }}>{team}</Text>

      {
        renderRowNbr(rowNo, rowNo == 2 ? chal?.QUARTER_1 : def?.QUARTER_1)
      }{
        renderRowNbr(rowNo, rowNo == 2 ? chal?.QUARTER_2 : def?.QUARTER_2)
      }{
        renderRowNbr(rowNo, rowNo == 2 ? chal?.QUARTER_3 : def?.QUARTER_3)
      }{
        renderRowNbr(rowNo, rowNo == 2 ? chal?.Final : def?.Final)

      }



    </View>
  }

  function renderRowNbr(rowNo, number) {
    return <Text style={{
      ...styles.number,
      fontFamily: rowNo === 3 ? Fonts.Regular : Fonts.SemiBold,
      color: rowNo === 1 ? Colors.light : rowNo === 2 ? Colors.lightBlue : Colors.fontGray
    }}>{number}</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  name: {
    width: width / 4 + 3,
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    // marginHorizontal: 10,
    textAlign: 'center'
  },
  number: {
    width: width / 13,
    fontSize: 16,
    color: Colors.light,
    marginHorizontal: 10
  }
})

export default TeamTable
