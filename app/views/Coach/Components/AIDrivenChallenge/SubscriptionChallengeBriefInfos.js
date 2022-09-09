import { View, Text, ImageBackground, Image, FlatList } from 'react-native'

import React, { useEffect, useState, useRef } from 'react'
import { Layout, Colors, Fonts, CommonStyles } from '../../../../constants'
const SubscriptionChallengeBriefInfos = (props) => {

    let wide = Layout.width;
    const selectedLevel = props.selectedLevel;
    const data = props.data[selectedLevel].subscriptionChallengeBriefInfos

    const [playerData, setPlayerData] = useState()


    return (

        <FlatList

            data={data}
            pagingEnabled={true}

            keyExtractor={item => item.index}
            renderItem={(item, index) =>

                <View style={{ marginTop: wide * 0.035 }}>
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
                                {setPlayerData(item.item.subscriptionPlayerBasicInfoList)}




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
                                }








                            </View>


                        </View>

                    </ImageBackground>

                </View >


            }
        />


    )
}
export default SubscriptionChallengeBriefInfos