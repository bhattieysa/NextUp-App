
import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Colors, Fonts, Layout } from "../../constants";

let width = Layout.width

const TeamTable = ({ info, response }) => {

  let chal = []
  let def = []

  if (response) {
    const res = Object.entries(response)
    chal = response.challengerQuarterInfo
    def = response.defenderQuarterInfo
  }
  return (
    <View style={{ flex: 1, }}>
      <View style={styles.container}>
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', }}>
          <View style={{
            width: width * 0.15,
            marginHorizontal: width * 0.015
          }}>
            <Text style={{ color: '#ffffff', }}>Team</Text>
          </View>

          <ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: width * 0.02 }}>

            {Object.keys(def).map((key) => {
              return (
                <View style={{
                  width: width * 0.12,
                  marginHorizontal: width * 0.018,

                }}>
                  <Text style={{ color: "#ffffff" }}>{key}</Text>
                </View>
              )
            })}
          </ScrollView>
        </View>

        {/* <View style={{ marginLeft: 18, marginRight: 10, marginTop: 10 }} > */}


        {/* </View> */}

      </View>

      <View style={{
        // alignSelf: 'stretch',
        flexDirection: 'row',
        marginTop: 20,
        // width: '100%'


        // backgroundColor: 'green'
      }}>
        <View style={{
          width: width * 0.15,
          marginHorizontal: width * 0.015
        }}>
          <Text style={{ color: '#85ADFF', fontWeight: "bold" }}>{response?.defenderName}</Text>
        </View>

        <ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: width * 0.02, overflow: 'visible' }}
        >
          {Object.keys(def).map((key) => {
            return (
              <View style={{
                width: width * 0.12,
                marginHorizontal: width * 0.018,
              }}>
                <Text style={{ color: "#85ADFF", fontWeight: "bold" }}>{def[key]} </Text>
              </View>
            )
          })}

        </ScrollView>
      </View>

      <View style={{
        // alignSelf: 'stretch',
        flexDirection: 'row',
        marginTop: 20,
        // width: '100%'


        // backgroundColor: 'green'
      }}>
        <View style={{
          width: width * 0.15,
          marginHorizontal: width * 0.015
        }}>
          <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{response?.challengerName}</Text>
        </View>

        <ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: width * 0.02, overflow: 'visible' }}
        >
          {Object.keys(chal).map((key) => {
            return (
              <View style={{
                width: width * 0.12,
                marginHorizontal: width * 0.018,
              }}>
                <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{chal[key]} </Text>
              </View>
            )
          })}

        </ScrollView>
      </View>
      {/* {renderRow(info?.challengerName || response?.challengerName, 2)} */}
      {/* {renderRow(info?.defenderName || response?.defenderName, 3)} */}
    </View>
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
    // backgroundColor: 'green'
  },
  name: {
    width: width / 4 + 3,
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    // marginHorizontal: 10,
    // textAlign: 'center'
  },
  number: {
    width: width / 13,
    fontSize: 16,
    color: Colors.light,
    marginHorizontal: 10
  }
})

export default TeamTable
