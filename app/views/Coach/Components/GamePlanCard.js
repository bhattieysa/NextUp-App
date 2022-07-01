import React from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants';
import Navigation from '../../../lib/Navigation';


function GamePlanCard({ premium = false, bannerInfo = null }) {

  if (premium) {
    return (
      <View style={{
        marginTop: 35,
        marginHorizontal: 20,
        marginBottom: 30
      }}>
        <Text style={{ color: Colors.lightshade, fontSize: 20, fontWeight: "bold" }}>{bannerInfo && bannerInfo.title}</Text>
        <View style={{ width: '95%' }}>
          <Text style={{ color: Colors.lightshade, marginTop: 15, textAlign: 'justify' }}>
            {bannerInfo?.description}
            {/* {
            bannerInfo && bannerInfo.description && bannerInfo.description.split("/").map((desc) => (

              <Text style={{ color: Colors.lightshade }}>{desc}</Text>

            ))
          } */}

          </Text>
        </View>

      </View>
    )
  }

  return (
    <TouchableOpacity
      activeOpacity={true}
      onPress={() => Navigation.navigate("CoachRoadToPro")}
      style={{
        marginTop: 30,
        borderRadius: 10,
      }}>
      <ImageBackground
        source={require('../../../Images/plan_bk_1.png')}
        style={{
          width: Dimensions.get("window").width * 0.9,
          // minHeight: 150,
          alignSelf: "center",
          flexDirection: "column"
        }}
        imageStyle={{
          borderRadius: 5
        }}
      >

        <View style={{
          flexDirection: "row",
          justifyContent: 'space-between',
        }}>

          <View>
            <Text style={{
              fontWeight: "bold",
              fontSize: 20,
              paddingLeft: 15,
              paddingTop: 15
            }}>{bannerInfo && bannerInfo.title}</Text>
          </View>

          <View style={{ width: '50%', alignItems: 'center' }}>
            <View style={{
              paddingTop: 10,
              // backgroundColor: 'green'
            }}>
              <Text style={{
                fontStyle: "italic",
              }}>Get Premium</Text>
            </View>

            <View style={{
            }}>
              <Text style={{
                fontWeight: "bold",
                fontSize: 20
              }}>{bannerInfo && bannerInfo.price}</Text>
            </View>
          </View>


        </View>

        <View style={{
          marginTop: 10,
          marginBottom: 10,
          // paddingHorizontal: 15,
          // backgroundColor: 'red',
          width: '95%',
          alignSelf: 'center'

        }}
        >
          <Text style={{ textAlign: 'justify' }}>{bannerInfo?.description}</Text>

          {/* {
            bannerInfo && bannerInfo.description && bannerInfo.description.split("/").map((desc) => (

              <Text style={{ textAlign: '' }}>{desc}</Text>

            ))
          } */}


        </View>

      </ImageBackground>
    </TouchableOpacity>

  )
}

export default GamePlanCard