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
        <Text style={{ color: Colors.lightshade, marginTop: 15 }}>
          {
            bannerInfo && bannerInfo.description && bannerInfo.description.split("/").map((desc) => (

              <Text style={{ color: Colors.lightshade }}>{desc}</Text>

            ))
          }

        </Text>

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
          width: Dimensions.get("window").width * 0.87,
          minHeight: 125,
          alignSelf: "center",
          flexDirection: "column"
        }}
        imageStyle={{
          borderRadius: 5
        }}
      >

        <View style={{
          flexDirection: "row"
        }}>

          <View style={{
            flex: 2
          }}>
            <Text style={{
              fontWeight: "bold",
              fontSize: 20,
              paddingLeft: 15,
              paddingTop: 20
            }}>{bannerInfo && bannerInfo.title}</Text>
          </View>

          <View style={{
            flex: 1,
            paddingTop: 20
          }}>
            <Text style={{
              fontStyle: "italic",
              textAlign: "right",
              marginTop: 5
            }}>Get Premium</Text>
          </View>

          <View style={{
            flex: 1 / 2,
            paddingRight: 15,
            paddingTop: 20
          }}>
            <Text style={{
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 20
            }}>{bannerInfo && bannerInfo.price}</Text>
          </View>

        </View>

        <View style={{
          marginTop: 10,
          paddingHorizontal: 15,

        }}>


          {
            bannerInfo && bannerInfo.description && bannerInfo.description.split("/").map((desc) => (

              <Text style={{ textAlign: "left" }}>{desc}</Text>

            ))
          }


        </View>

      </ImageBackground>
    </TouchableOpacity>

  )
}

export default GamePlanCard