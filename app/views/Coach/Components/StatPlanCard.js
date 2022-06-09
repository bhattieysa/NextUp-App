import React from 'react'
import { View, TouchableOpacity, ImageBackground, Text, Dimensions } from 'react-native';
import Navigation from '../../../lib/Navigation';
import { Colors } from '../../../constants';


function StatPlanCard({ premium = false, bannerInfo = null }) {

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
        <View style={{
            marginTop: 25,
            borderRadius: 10,
        }}>
            <TouchableOpacity activeOpacity={true} onPress={() => Navigation.navigate("CoachRoadToPro")}>
                <ImageBackground
                    source={require('../../../Images/plan_bk_1.png')}
                    style={{
                        width: Dimensions.get("window").width * 0.87,
                        minHeight: 125,
                        alignSelf: "center",
                        flexDirection: "column"
                    }}
                    imageStyle={{
                        borderRadius: 10
                    }}
                >

                    <View style={{
                        flexDirection: "row"
                    }}>

                        <View style={{
                            flex: 3
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                paddingLeft: 15,
                                paddingTop: 20
                            }}>{bannerInfo?.title}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            paddingTop: 20
                        }}>
                            <Text style={{
                                fontStyle: "italic",
                                textAlign: "right",
                                fontSize: 12
                            }}>Get Premium</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            paddingRight: 15,
                            paddingTop: 20
                        }}>
                            <Text style={{
                                textAlign: "right",
                                fontWeight: "bold",
                                fontSize: 20
                            }}>{bannerInfo?.price}</Text>
                        </View>

                    </View>

                    <View style={{
                        marginTop: 10,
                        paddingHorizontal: 15,

                    }}>
                        <Text style={{
                            textAlign: "justify"
                        }}>

                            {
                                bannerInfo && bannerInfo.description && bannerInfo.description.split("/").map((desc) => (

                                    <Text>{desc}</Text>

                                ))
                            }
                        </Text>
                    </View>

                </ImageBackground>
            </TouchableOpacity>
        </View>

    )
}

export default StatPlanCard