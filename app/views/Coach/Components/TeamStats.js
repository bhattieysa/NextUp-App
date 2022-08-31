import React from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Title } from '../../../components/common/titleLabel';
import { Colors, Fonts } from '../../../constants';
import moment from 'moment';
import { getFontScaleSync } from 'react-native-device-info';

function TeamStats({ data, onPress, premium }) {
  console.log("RecentGameDatat---", data)
  return (

    <TouchableOpacity
      style={{ marginTop: 30, width: "95%", alignSelf: 'center', }}
      onPress={onPress}
    >

      {/* <Title data={"Saturday, 1st July 2020"} /> */}
      {/* <Title data={moment.unix(data.playedDate).format("dddd, Do MMMM YYYY")} /> */}
      <View style={{
        width: "95%", alignSelf: 'center',
        flexDirection: 'row'
        // marginTop: wide * 0.09
      }}>
        <Text style={{
          color: Colors.light,
          fontFamily: Fonts.Bold, fontSize: 16,
          lineHeight: 22, fontWeight: '700'
        }}
        >
          {moment.unix(data.playedDate).format("dddd, Do MMMM YYYY")}
        </Text>
        {premium == true ?
          <Image
            style={{ width: 20, height: 20, marginLeft: 10 }}
            source={require('../../../Images/premiumPurchased.png')}
          />
          : <></>
        }
      </View>

      <View style={{
        flex: 1,
        //  backgroundColor: 'red',
        width: '100%',
        alignSelf: 'center'
      }}>
        <View style={{
          marginTop: 20,
          marginHorizontal: 10,
          paddingVertical: 15,
          paddingHorizontal: 10,
          // backgroundColor: '#23262F',
          borderRadius: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',

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
                  fontWeight: '400',
                  color: '#ffffff',
                  fontSize: 16,
                  lineHeight: 16,
                  fontFamily: Fonts.Regular
                }}>{Array.from(data.defenderName)[0].toUpperCase()}</Text>

              </View>
              <View style={{ marginLeft: 10, marginTop: 12, color: '#ffffff', }}>
                <Text style={{
                  fontSize: 13, lineHeight: 13,
                  fontFamily: Fonts.SemiBold,
                  fontWeight: "600", color: Colors.lightBlue,
                }}>
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
              <View style={{ marginLeft: 20, color: '#ffffff', marginTop: 10, }}>
                <Text style={{
                  fontSize: 14,
                  lineHeight: 22,
                  fontWeight: '400',
                  fontFamily: Fonts.Regular, color: '#ffffff',
                  opacity: 0.6
                }}>
                  VS
                </Text>

              </View>
            </View>
          </View>

          <View>
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <View style={{ marginLeft: 5, marginTop: 12, color: '#ffffff', marginRight: 10 }}>
                <Text style={{
                  fontSize: 13, lineHeight: 13,
                  fontFamily: Fonts.SemiBold,
                  fontWeight: "600", color: Colors.lightRed,
                }}>
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
                  fontWeight: '400',
                  color: '#ffffff',
                  fontSize: 16,
                  lineHeight: 16,
                  fontFamily: Fonts.Regular
                }}>{Array.from(data.challengerName)[0].toUpperCase()}</Text>

              </View>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 18, marginRight: 10, marginTop: 10 }} >


          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
            <View style={{
              width: Dimensions.get("screen").width * 0.15,
              marginHorizontal: Dimensions.get("screen").width * 0.015
            }}>
              <Text style={{
                fontWeight: '500',
                color: Colors.light,
                fontSize: 12,
                lineHeight: 14,
                fontFamily: Fonts.Regular,
              }}>Team</Text>
            </View>
            <ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>

              {Object.keys(data?.defenderQuarterInfo).map((key) => {
                return (
                  <View style={{
                    width: Dimensions.get("screen").width * 0.12,
                    marginHorizontal: Dimensions.get("screen").width * 0.015,
                  }}>
                    <Text style={{
                      fontWeight: '500',
                      color: Colors.light,
                      fontSize: 12,
                      lineHeight: 14,
                      fontFamily: Fonts.Medium,
                    }}>{key}</Text>
                  </View>
                )
              })}

            </ScrollView>
          </View>
        </View>

        <View style={{ marginLeft: 18, marginRight: 10, marginTop: 20 }} >
          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
            <View style={{
              width: Dimensions.get("screen").width * 0.15,
              marginHorizontal: Dimensions.get("screen").width * 0.015
            }}>
              <Text style={{
                color: '#85ADFF', fontWeight: '600',
                fontSize: 12,
                lineHeight: 14,
                fontFamily: Fonts.Regular,
              }}>{data.defenderName}</Text>
            </View>

            <ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
              {Object.keys(data?.defenderQuarterInfo).map((key) => {
                return (
                  <View style={{
                    width: Dimensions.get("screen").width * 0.12,
                    marginHorizontal: Dimensions.get("screen").width * 0.015,
                  }}>
                    <Text style={{
                      color: "#85ADFF", fontWeight: '600',
                      fontSize: 12,
                      lineHeight: 14,
                      fontFamily: Fonts.SemiBold,
                    }}>{data?.defenderQuarterInfo[key]} </Text>
                  </View>
                )
              })}

            </ScrollView>
          </View>

        </View>
        <View style={{ marginLeft: 18, marginRight: 10, marginTop: 20 }} >


          <View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>

            <View style={{
              width: Dimensions.get("screen").width * 0.15,
              marginHorizontal: Dimensions.get("screen").width * 0.015
            }}>
              <Text style={{
                color: '#ffffff',
                fontWeight: '600',
                fontSize: 12,
                lineHeight: 14,
                fontFamily: Fonts.Regular,
              }}>{data?.challengerName}</Text>
            </View>



            <ScrollView scrollEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>

              {Object.keys(data?.defenderQuarterInfo).map((key) => {
                return (
                  <View style={{
                    width: Dimensions.get("screen").width * 0.12,
                    marginHorizontal: Dimensions.get("screen").width * 0.015,
                  }}>
                    <Text style={{
                      color: "#ffffff", fontWeight: '600',
                      fontSize: 12,
                      lineHeight: 14,
                      fontFamily: Fonts.SemiBold,
                    }}>{data?.challengerQuarterInfo[key]} </Text>
                  </View>
                )
              })}

              {/* <View style={{
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
              </View> */}
            </ScrollView>
          </View>


        </View>

      </View>
    </TouchableOpacity>
  )
}

export default TeamStats