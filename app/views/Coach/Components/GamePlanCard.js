import React from 'react'
import { View, Text, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Layout } from '../../../constants';
import Navigation from '../../../lib/Navigation';

let wide = Layout.width;


function GamePlanCard({ premium = false, bannerInfo = null, onPurchasePress }) {

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
    // old card
    // <TouchableOpacity
    //   activeOpacity={true}
    //   onPress={() => Navigation.navigate("CoachRoadToPro")}
    //   style={{
    //     marginTop: 30,
    //     borderRadius: 10,
    //   }}>
    //   <ImageBackground
    //     source={require('../../../Images/plan_bk_1.png')}
    //     style={{
    //       width: Dimensions.get("window").width * 0.9,
    //       // minHeight: 150,
    //       alignSelf: "center",
    //       flexDirection: "column"
    //     }}
    //     imageStyle={{
    //       borderRadius: 5
    //     }}
    //   >

    //     <View style={{
    //       flexDirection: "row",
    //       justifyContent: 'space-between',
    //     }}>

    //       <View>
    //         <Text style={{
    //           fontWeight: "bold",
    //           fontSize: 20,
    //           paddingLeft: 15,
    //           paddingTop: 15
    //         }}>{bannerInfo && bannerInfo.title}</Text>
    //       </View>

    //       <View style={{ width: '50%', alignItems: 'center' }}>
    //         <View style={{
    //           paddingTop: 10,
    //           // backgroundColor: 'green'
    //         }}>
    //           <Text style={{
    //             fontStyle: "italic",
    //           }}>Get Premium</Text>
    //         </View>

    //         <View style={{
    //         }}>
    //           <Text style={{
    //             fontWeight: "bold",
    //             fontSize: 20
    //           }}>{bannerInfo && bannerInfo.price}</Text>
    //         </View>
    //       </View>


    //     </View>

    //     <View style={{
    //       marginTop: 10,
    //       marginBottom: 10,
    //       // paddingHorizontal: 15,
    //       // backgroundColor: 'red',
    //       width: '95%',
    //       alignSelf: 'center'

    //     }}
    //     >
    //       <Text style={{ textAlign: 'justify' }}>{bannerInfo?.description}</Text>

    //       {/* {
    //         bannerInfo && bannerInfo.description && bannerInfo.description.split("/").map((desc) => (

    //           <Text style={{ textAlign: '' }}>{desc}</Text>

    //         ))
    //       } */}


    //     </View>

    //   </ImageBackground>
    // </TouchableOpacity>


    <TouchableOpacity
      activeOpacity={true}
      onPress={() => Navigation.navigate("CoachRoadToPro")}
      style={{
        // marginTop: 30,
        width: '100%',
        backgroundColor: Colors.btnBg,
        // borderRadius: 10,
      }}>
      {/* <ImageBackground
        source={require('../../../Images/plan_bk_1.png')}
        style={{
          // width: Dimensions.get("window").width * 0.9,
          // minHeight: 150,
          alignSelf: "center",
          flexDirection: "column"
        }}
        imageStyle={{
          borderRadius: 5
        }}
      > */}

      <View style={{
        width: '90%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: wide * 0.03
      }}>

        <View>
          <Text style={{
            fontWeight: "500",
            fontSize: 13,
            lineHeight: 20,
            fontFamily: Fonts.Medium,
            color: Colors.light
          }}>GET THE</Text>

          <Text style={{
            fontWeight: "700",
            fontSize: 20,
            lineHeight: 22,
            fontFamily: Fonts.Bold,
            color: Colors.light
          }}>NEXTUP PRIME</Text>
        </View>

        <TouchableOpacity style={{
          width: 80, height: 32, backgroundColor: Colors.base,
          borderRadius: wide * 0.015,
          alignItems: 'center', justifyContent: 'center'
        }}
          onPress={onPurchasePress}
        >
          <Text style={{
            fontWeight: "500",
            fontSize: 14,
            lineHeight: 15,
            fontFamily: Fonts.Medium,
            color: Colors.light
          }}>Purchase</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        marginTop: wide * 0.02,
        marginBottom: wide * 0.03,
        // paddingHorizontal: 15,
        width: '90%',
        alignSelf: 'center'

      }}
      >
        <Text style={{
          textAlign: 'justify',
          fontWeight: "400",
          fontSize: 12,
          lineHeight: 15,
          fontFamily: Fonts.Regular,
          color: Colors.light
        }}>{bannerInfo?.description}</Text>

      </View>

      {/* </ImageBackground> */}
    </TouchableOpacity >

  )
}

export default GamePlanCard