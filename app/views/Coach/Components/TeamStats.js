import React from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Title } from '../../../components/common/titleLabel';
import { Colors } from '../../../constants';
import moment from 'moment';

function TeamStats({ data, onPress }) {
  return (

    <TouchableOpacity
      style={{ marginTop: 30 }}
      onPress={onPress}
    >

      {/* <Title data={"Saturday, 1st July 2020"} /> */}
      <Title data={moment.unix(data.playedDate).format("dddd, Do MMMM YYYY")} />

      <View style={{ flex: 1 }}>
        <View style={{
          marginTop: 20,
          marginHorizontal: 10,
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: '#23262F',
          borderRadius: 10,
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
          <View style={{}} >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                borderRadius: 60 / 2,
                backgroundColor: '#85ADFF',
              }}>
                <Text style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 15,
                }}>{Array.from(data.defenderName)[0].toUpperCase()}</Text>

              </View>
              <View style={{ marginLeft: 10, marginTop: 12, color: '#ffffff', }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.lightshade, }}>
                  {data.defenderName}
                </Text>
                {/* <Text style={{ fontSize: 10, color: '#85ADFF', }}>
                                    Copper King
                                </Text> */}
              </View>
            </View>
          </View>

          <View>
            <View style={{ flex: 1, flexDirection: 'row' }}>

              <View style={{ marginLeft: 20, color: '#ffffff', marginTop: 8 }}>
                <Text style={{ fontSize: 15, color: '#ffffff', }}>
                  VS
                </Text>

              </View>
            </View>
          </View>

          <View>
            <View style={{ flex: 3, flexDirection: 'row' }}>

              <View style={{ marginLeft: 5, marginTop: 12, color: '#ffffff', marginRight: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.lightshade, }}>
                  {data.challengerName}
                </Text>
                {/* <Text style={{ fontSize: 10, color: '#FF5E5E', }}>
                                    Falcons
                                </Text> */}
              </View>
              <View style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                borderRadius: 60 / 2,
                backgroundColor: '#FF5E5E',
              }}>
                <Text style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: 15,
                }}>{Array.from(data.challengerName)[0].toUpperCase()}</Text>

              </View>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 18, marginRight: 10, marginTop: 10 }} >


          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
            <View style={{
              width: Dimensions.get("screen").width * 0.2
            }}>
              <Text style={{ color: '#ffffff', }}>Team</Text>
            </View>


            <ScrollView scrollEnabled={true} horizontal={true}>
              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> 1 </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> 2 </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> 3 </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> 4 </Text>

              </View>
            </ScrollView>
          </View>

        </View>
        <View style={{ marginLeft: 18, marginRight: 10, marginTop: 20 }} >

          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
            <View style={{
              width: Dimensions.get("screen").width * 0.2
            }}>
              <Text style={{ color: '#85ADFF', fontWeight: "bold" }}>{data.defenderName}</Text>
            </View>

            <ScrollView scrollEnabled={true} horizontal={true}>
              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#85ADFF", fontWeight: "bold" }}> {data?.defenderQuarterInfo?.QUARTER_1} </Text>
              </View>
              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#85ADFF", fontWeight: "bold" }}> {data?.defenderQuarterInfo?.QUARTER_2} </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#85ADFF", fontWeight: "bold" }}> {data?.defenderQuarterInfo?.QUARTER_3} </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#85ADFF", fontWeight: "bold" }}> {data?.defenderQuarterInfo?.Final} </Text>
              </View>

            </ScrollView>
          </View>

        </View>
        <View style={{ marginLeft: 18, marginRight: 10, marginTop: 20 }} >


          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>

            <View style={{
              width: Dimensions.get("screen").width * 0.2
            }}>
              <Text style={{ color: '#ffffff', }}>{data.challengerName}</Text>
            </View>



            <ScrollView scrollEnabled={true} horizontal={true}>
              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> {data?.challengerQuarterInfo?.QUARTER_1} </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> {data?.challengerQuarterInfo?.QUARTER_2} </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> {data?.challengerQuarterInfo?.QUARTER_3} </Text>
              </View>

              <View style={{
                width: Dimensions.get("screen").width * 0.2
              }}>
                <Text style={{ color: "#ffffff" }}> {data?.challengerQuarterInfo?.Final} </Text>
              </View>
            </ScrollView>
          </View>


        </View>

      </View>
    </TouchableOpacity>
  )
}

export default TeamStats