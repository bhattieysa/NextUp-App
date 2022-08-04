import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, Fonts, Layout } from "../../../constants";
let wide = Layout.width;

import HeadingWithLine from '../../../components/common/HeadingWithLine';
// import SyncStorage from 'sync-storage';

var rowHeadingLength = 6;
//Total Score Row
const totalScore = [
  "T",
  "5-5",
  "0-0",
  "0-0",
  "0",
  "0",
  // "1",//PTS
  "0",
]


const QuickBoxScoreTable = ({ heading, point, title, rowId, teamId, data, kpiList }) => {
  const [defenderWithEachQuarter, setDefenderWithEachQuarter] = useState(data);
  const [rowHeadingList, setRowHeadingList] = useState(["TD", "FG", "AST", "3PT", "FT", "REB"]);

  useEffect(() => {
    debugger
    rowHeadingLength = kpiList.length;
    // setRowHeadingList(kpiList)
  })


  // useEffect(() => {
  //     // addingPlayerIdToObjects();
  //     // console.log(defenderKpiWithEachQuarter);
  // }, [])

  // const addingPlayerIdToObjects = () => {
  //     //Here adding #0 ,#1, #2, player ids which is missing in the server data to design the table proper li

  //     const token = SyncStorage.get('token')

  //     axios.get('http://35.184.198.142:8085/v1/game/advance/stats/165584356686406', {
  //         headers: {
  //             'Authorization': `Bearer ${token}`
  //         }
  //     })
  //         .then((response) => {
  //             let newArray = []
  //             response.data.data.defenderKpiWithEachQuarter.map((obj, index) => {
  //                 newArray.push({ ...obj, id: "#" + index });
  //             })
  //             //setting new array which also contain ids
  //             setDefenderWithEachQuarter(newArray)
  //         })
  //         .catch(function (error) {
  //             console.log('Error', error)
  //         });
  // }


  return <View style={{ flex: 1 }}>
    <View style={styles.teamNameAndBoxesSoreTxt}>
      {/* <Text style={styles.teamName}></Text> */}
      {/* <Text style={{...styles.teamName, color:Colors.light}}> Quick Box Score</Text> */}
    </View>
    {renderHeadingRow(rowHeadingList)}
    {defenderWithEachQuarter.map((item, index) => {
      debugger
      return (
        renderResultsRow(item, index)
      )
    })}

  </View>

  // ? renderResultsRow(defenderWithEachQuarter[0], 0) : null}
  //   {renderResultsRow(defenderWithEachQuarter[1], 1)}
  //   {renderResultsRow(defenderWithEachQuarter[2], 2)}
  //   {renderResultsRow(defenderWithEachQuarter[3], 3)}
  //   {renderResultsRow(defenderWithEachQuarter[4], 4)}
  //    {renderLastRow(totalScore)}

  function renderHeadingRow(list) {
    debugger
    return <View style={styles.rowContainer}>
      {
        <View style={{ ...styles.rowItemContainer, backgroundColor: Colors.base }} />
      }
      {
        list.map((item, index) => {
          debugger
          return <View key={index} style={{
            ...styles.rowItemContainer,
            borderTopLeftRadius: index === 0 ? 9 : 0,
            borderTopRightRadius: (index + 1) === list.length ? 9 : 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}>
            <Text style={styles.rowHeadingTxt}>{item}</Text>
          </View>
        })
      }
    </View>
  }

  function renderLastRow(list) {
    return <View style={styles.rowContainer}>
      {list.map((item, index) => {
        return <View key={index} style={{
          ...styles.rowItemContainer,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: (index === 0) ? 9 : 0,
          borderBottomRightRadius: ((index + 1) === list.length) ? 9 : 0,
        }}>
          <Text style={{
            ...styles.rowHeadingTxt,
            color: Colors.lightBlue
          }}>{item}</Text>
        </View>
      })}
    </View>
  }
  // "TD", "FG", "AST", "3PT", "FT", "REB"
  function renderResultsRow(item, row) {
    debugger
    return <View style={styles.rowContainer}>
      {renderResultItem(item?.id, 0, row)}
      {renderResultItem(item?.TD, 2, row)}
      {item ? renderResultItem(item["FG"], 3, row) : null}
      {renderResultItem(item?.AST, 4, row)}
      {renderResultItem(item['3PT'], 5, row)}

      {renderResultItem(item?.FT, 6, row)}
      {renderResultItem(item?.REB, 7, row)}
      {item?.SSL ?
        renderResultItem(item?.SSL, 8, row)
        : null
      }

      {item?.ML ?
        renderResultItem(item?.ML, 9, row)
        : null
      }
    </View>
  }

  function renderResultItem(txt, index, row) {
    debugger
    return <View style={{
      ...styles.rowItemContainer,
      borderTopLeftRadius: (index === 0 && row === 0) ? 9 : 0,
    }}>
      <Text style={{ ...styles.rowHeadingTxt }}>{txt}</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  teamNameAndBoxesSoreTxt: {
    width: '100%',
    flexDirection: 'row',
    marginTop: wide * 0.01,
    marginBottom: 10,
  },
  teamName: {
    color: Colors.lightBlue,
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  rowItemContainer: {
    width: (wide * 0.9) / (rowHeadingLength + 1.8), //if pts will come so you should divide the width with 9 or can do experiment
    height: 30,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
  }, rowHeadingTxt: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
    color: Colors.light
  }
})

export default QuickBoxScoreTable
