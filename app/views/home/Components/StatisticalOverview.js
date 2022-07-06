import React from 'react'
import { Title } from '../../../components/common/titleLabel'
import { View, Text } from 'react-native'
import { Colors } from '../../../constants'

function StatisticalOverview({
  awayRecord = "",
  homeRecord = ""
}) {
  return <>
    <Title data={'Statistical Overview'} />
    <View style={{
      flexDirection: "row",
      backgroundColor: "#23262F",
      marginHorizontal: 10,
      borderRadius: 10,
      marginTop: 15,
      paddingTop: 10,
      paddingBottom: 10
    }}>
      <View style={{ flex: 1, alignItems: "center", paddingVertical: 15, borderRightColor: Colors.grey, borderRightWidth: 1 }}>
        {homeRecord != "" && homeRecord != null ?
          <Text style={{ color: Colors.lightshade, fontSize: 24, fontWeight: "bold" }}>{homeRecord}</Text>
          :
          <Text style={{ color: Colors.lightshade, fontSize: 24, fontWeight: "bold" }}>0 - 0</Text>
        }
        <Text style={{ color: Colors.grey, marginTop: 5 }}>Home Record</Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", paddingVertical: 15 }}>
        {awayRecord != "" && awayRecord != null ?
          <Text style={{ color: Colors.lightshade, fontSize: 24, fontWeight: "bold" }}>{awayRecord}</Text>
          :
          <Text style={{ color: Colors.lightshade, fontSize: 24, fontWeight: "bold" }}>0 - 0</Text>

        }
        <Text style={{ color: Colors.grey, marginTop: 5 }}>Away Record</Text>
      </View>

    </View>

  </>
}

export default StatisticalOverview