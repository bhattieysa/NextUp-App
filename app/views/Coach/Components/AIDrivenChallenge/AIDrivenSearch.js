import { View, Text, ImageBackground, Image, FlatList } from 'react-native'

import React, { useEffect, useState, useRef } from 'react'
import { Layout, Colors, Fonts, CommonStyles } from '../../../../constants'
import LinearGradient from 'react-native-linear-gradient';

const AIDrivenSearch = (props) => {


    let wide = Layout.width;

    const data = props.data
    const categories = props.categories
    const typeOfChallenge = props.typeOfChallenge
    const [playerData, setPlayerData] = useState()
    const data1 = data.filter(item => {
        return item.typeOfChallenge == typeOfChallenge;
    }).map(function (item) {
        return item;

    });
    const data12 = data1.filter(item => {
        return item.category == categories;
    }).map(function (item) {
        return item;
    });


    //  const id = data.filter(obj => obj.typeOfChallenge == e.typeOfChallenge)
    //  setCurrentApp({ ...currentApp, [e.target.id]: e.target.value, ["hospitalID"]: id.hospitalID })  


    return (
        <View>

            {data12.length == 0 || data1.length == 0 ?
                <View style={{
                    justifyContent: 'center',

                    alignItems: 'center',
                    marginTop: wide * 0.3,
                }}>
                    <Image
                        style={{
                            width: wide * 0.5
                        }}
                        source={require('../../../../Images/datablank.png')}
                    />
                    <Text style={{
                        fontFamily: 'Metropolis',
                        fontSize: 15,
                        fontWeight: '400',
                        color: Colors.light,
                        marginTop: wide * 0.04
                    }}>No {typeOfChallenge} challenges found yet</Text>
                </View>
                :
                <FlatList
                    data={data12}
                    bounces={false}
                    keyExtractor={item => item.index}
                    renderItem={(item, index) =>
                        <View style={{ marginTop: wide * 0.05 }}>
                            {item.item.roadToPro == true ?
                                <ImageBackground
                                    source={require('../../../../Images/challenge.png')}
                                    style={{
                                        width: '100%',
                                        height: wide * 0.46
                                    }}
                                >
                                    <View >
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1 }}>
                                                <Image
                                                    style={{
                                                        marginLeft: wide * 0.05,
                                                        marginTop: wide * 0.05,
                                                    }}
                                                    source={require('../../../../Images/circle.png')}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: wide * 0.04, marginTop: wide * 0.05 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{
                                                    color: Colors.light,
                                                    fontWeight: '700',
                                                    fontSize: 17,
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 17,
                                                }}>
                                                    {item.item.name}
                                                </Text>
                                                {item.item.typeOfChallenge == "STATS" ?
                                                    <Image style={{ marginLeft: wide * 0.015 }}
                                                        source={require('../../../../Images/Vector.png')}
                                                    />
                                                    :
                                                    item.item.typeOfChallenge == "QUESTION" ?
                                                        <Image style={{ marginLeft: wide * 0.015 }}
                                                            source={require('../../../../Images/texticon.png')}
                                                        />
                                                        :
                                                        <Image style={{ marginLeft: wide * 0.015 }}
                                                            source={require('../../../../Images/videoicon.png')}
                                                        />
                                                }
                                            </View>

                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 12,
                                                    fontWeight: '600',
                                                    color: '#FFB920',
                                                    marginTop: wide * 0.01

                                                }}
                                            >08 Days Left</Text>
                                            {/* {setPlayerData(item.item.subscriptionPlayerBasicInfoList)} */}


                                            {/* 

                                {playerData != null || playerData != "" ?

                                    <FlatList

                                        data={playerData}

                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        pagingEnabled={true}

                                        legacyImplementation={false}

                                        keyExtractor={item => item.index}
                                        renderItem={(item, index) =>
                                            <View style={{ flex: 4, flexDirection: 'row', marginTop: wide * 0.02 }}>
                                                <Image style={{
                                                    height: wide * 0.07,
                                                    width: wide * 0.07,
                                                    borderRadius: wide * 0.07 / 2,

                                                }}
                                                    source={{ uri: item.item.profilePictureUrl }}
                                                />
                                            </View>

                                        }
                                    />


                                    :
                                    null
                                } */}

                                        </View>
                                    </View>
                                </ImageBackground>
                                :
                                <ImageBackground
                                    style={{
                                        height: wide * 0.165,
                                        width: '100%',
                                        marginTop: wide * 0.03
                                    }}
                                    imageStyle={{ borderRadius: 15 }}
                                    source={{ uri: item.item.imageUrl }}
                                >
                                    <LinearGradient colors={['rgba(35, 38, 47, 1)', 'rgba(35, 38, 47, 0.76)', 'rgba(35, 38, 47, 0)']}
                                        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.5, y: 1.0 }}
                                        style={{ borderRadius: 15, flex: 1 }}
                                    >
                                        <View style={{ marginTop: wide * 0.05, marginLeft: wide * 0.03 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{
                                                    color: Colors.light,
                                                    fontWeight: '700',
                                                    fontSize: 17,
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 17,

                                                }}>
                                                    {item.item.name}
                                                </Text>
                                                {item.item.typeOfChallenge == "STATS" ?
                                                    <Image style={{ marginLeft: wide * 0.015 }}
                                                        source={require('../../../../Images/Vector.png')}
                                                    />
                                                    :
                                                    item.item.typeOfChallenge == "QUESTION" ?
                                                        <Image style={{ marginLeft: wide * 0.015 }}
                                                            source={require('../../../../Images/texticon.png')}
                                                        />
                                                        :
                                                        <Image style={{ marginLeft: wide * 0.015 }}
                                                            source={require('../../../../Images/videoicon.png')}
                                                        />
                                                }
                                            </View>

                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 12,
                                                    fontWeight: '600',
                                                    color: '#FFB920',
                                                    marginTop: wide * 0.01

                                                }}
                                            >08 Days Left</Text>




                                        </View>
                                    </LinearGradient>
                                </ImageBackground>
                            }

                        </View >

                    }
                />
            }
        </View>

    )
}
export default AIDrivenSearch