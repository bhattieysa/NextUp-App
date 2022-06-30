import React from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { VictoryAxis, VictoryChart, VictoryPie } from 'victory-native';
import { Colors, Fonts, Layout } from '../../../constants';
import Navigation from '../../../lib/Navigation';

let wide = Layout.width

function EmptyPieChart({ }) {

  return (

    <View style={{
      width: '90%', height: wide * 0.75,
      marginTop: wide * 0.01,
      marginHorizontal: wide * 0.05,
      // flexDirection: 'row', 
      justifyContent: "space-between",
      alignItems: 'center',
      // backgroundColor: 'green'


    }}>
      <>
        <View style={{
          position: 'absolute', top: 80,
          alignItems: 'center', justifyContent: 'center', width: wide * 0.25, height: wide * 0.15,
        }}>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24,

          }}>0</Text>
          <Text style={{
            color: Colors.light,
            fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 14
          }}>Total Games</Text>
        </View>

        <View style={{ height: '70%', bottom: 30 }}>
          <VictoryChart
            width={300}
            height={280}
          >
            <VictoryPie
              colorScale={["#246BFD"]}
              standalone={false}
              width={200} height={200}
              innerRadius={60}
              data={[10]}
              style={{
                labels: { display: "none" }
              }}
            />
            <VictoryAxis style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" }
            }} />
            <VictoryAxis dependentAxis style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" }
            }} />
          </VictoryChart>

        </View>

      </>

      <View style={{
        justifyContent: 'space-between',
        width: '100%', height: '25%', flexDirection: 'row',
        // backgroundColor: 'blue',
        bottom: 10
      }}>
        <View style={{
          flexDirection: 'row', //backgroundColor: 'green',
          width: '55%',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <View style={{
            height: '60%',
            alignItems: "center", justifyContent: 'space-between'
          }}>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 12, lineHeight: 16,
              fontFamily: Fonts.Bold,
            }}>Streak</Text>
            <Text style={{
              color: Colors.light, fontSize: 16, lineHeight: 18,
              fontFamily: Fonts.Bold,
            }}>_</Text>
          </View>
          <View style={{
            height: '60%',
            alignItems: "center", justifyContent: 'space-between'
          }}>
            <Text style={{
              color: Colors.newGrayFontColor, fontSize: 12, lineHeight: 16,
              fontFamily: Fonts.Bold,
            }}>Last 10</Text>
            <Text style={{
              color: Colors.light, fontSize: 16, lineHeight: 18,
              fontFamily: Fonts.Bold,
            }}>_</Text>
          </View>
        </View>
        <View style={{ width: '40%', justifyContent: 'center' }}>
          <>
            <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
              <>
                <View style={{ width: 28, height: 2, backgroundColor: '#246BFD' }}></View>
                <Text style={{
                  color: '#246BFD', fontSize: 16, lineHeight: 16,
                  fontFamily: Fonts.Bold, marginHorizontal: 10
                }}>0 Wins</Text>
              </>

            </View>
            <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <>
                <View style={{ width: 28, height: 2, backgroundColor: '#CE1141' }}></View>
                <Text style={{
                  color: '#CE1141', fontSize: 16, lineHeight: 16,
                  fontFamily: Fonts.Bold, marginHorizontal: 10
                }}>0 Losses</Text>
              </>

            </View>
            <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>

              <>
                <View style={{ width: 28, height: 2, backgroundColor: '#FDB927' }}></View>
                <Text style={{
                  color: '#FDB927', fontSize: 16, lineHeight: 16,
                  fontFamily: Fonts.Bold, marginHorizontal: 10
                }}>
                  0 Draw
                </Text>
              </>


            </View>

          </>

        </View>
      </View>

    </View>

  )
}

export default EmptyPieChart