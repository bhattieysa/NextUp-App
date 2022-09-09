import { View, Text, ImageBackground, Image, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Layout, Colors, Fonts, CommonStyles } from '../../../../constants'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Navigation from '../../../../lib/Navigation';
import { connect } from 'react-redux';
import {
    getListOFChallenges
} from '../../../../actions/home';
import AppLoader from '../../../../utils/Apploader';
const AIDrivenChallenges = (props) => {


    const [loading, setLoading] = useState(false)
    const [teamId, setTeamId] = useState()
    let [assignedChallenge, setAssignedChallenge] = useState()
    const [suggestedChallenge, setSuggestedChallenge] = useState()
    const [playerData, setPlayerData] = useState()

    useEffect(() => {

        setLoading(true)
        props.dispatch(getListOFChallenges(props.teamId, '1', (result, response) => {

            if (result) {
                setLoading(false)
           
                setAssignedChallenge(response.assignedChallenge);
                setSuggestedChallenge(response.suggestedChallenge)
                setPlayerData(response.assignedChallenge.subscriptionPlayerBasicInfoList)

                

            } else {
                //console.log("eysadata",props.teamId)
            }
        }))
    }, [props.teamId])


    let wide = Layout.width;
    return (

        <View style={{ marginLeft: wide * 0.04, marginRight: wide * 0.04, marginTop: wide * 0.05 }}>

            <AppLoader visible={loading} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
            {assignedChallenge?.length > 0 || suggestedChallenge?.length > 0 ?

                <View>


                    {assignedChallenge.length == 0 ? null :

                        <View>

                            <View style={{ flexDirection: 'row', marginTop: wide * 0.03 }}>
                                <View style={{
                                    flex: 3
                                }}>
                                    <Text style={{
                                        fontWeight: '600',
                                        color: Colors.light,
                                        fontSize: 16,
                                        fontFamily: 'Metropolis',

                                    }}>
                                        Assigned challenges
                                    </Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',


                                }}>
                                    <TouchableOpacity onPress={() => Navigation.navigate('CoachAiDrivenAllChallenge', { name: "assigned", teamId: props.teamId })}>
                                        <Text style={{
                                            color: Colors.btnBg,
                                            fontWeight: '700',
                                            fontSize: 14,
                                            fontFamily: 'Metropolis',

                                        }}>
                                            See All{" >"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <FlatList
                                data={assignedChallenge}
                                nestedScrollEnabled


                                keyExtractor={item => item.index}
                                renderItem={(item) =>
                                    <TouchableOpacity onPress={() => {

                                        playerData == null || playerData == "" ?

                                            item.item.typeOfChallenge == "STATS" ?
                                                Navigation.navigate('CoachAiDrivenStatsChallenge',
                                                    {
                                                        name: "assigned",
                                                        teamId: props.teamId,
                                                        challengeId: item.item.challengeId,
                                                        typeOfChallenge: item.item.typeOfChallenge
                                                    })

                                                : item.item.typeOfChallenge == "QUESTION" ?
                                                    Navigation.navigate('CoachAiDrivenQuestionChallenge',
                                                        {
                                                            name: "assigned",
                                                            teamId: props.teamId,
                                                            challengeId: item.item.challengeId,
                                                            typeOfChallenge: item.item.typeOfChallenge
                                                        })
                                                    :
                                                    Navigation.navigate('CoachAiDrivenVideoChallenge',
                                                        {
                                                            name: "assigned",
                                                            teamId: props.teamId,
                                                            challengeId: item.item.challengeId,
                                                            typeOfChallenge: item.item.typeOfChallenge
                                                        })

                                            :
                                            Navigation.navigate('CoachAiDrivenPlayerDetails',
                                                {
                                                    name: "assigned",
                                                    teamId: props.teamId,
                                                    challengeId: item.item.challengeId,
                                                    typeOfChallenge: item.item.typeOfChallenge
                                                })
                                               
                                    }}>
                                        <ImageBackground
                                            style={{
                                                height: wide * 0.263,
                                                width: '100%',

                                                marginTop: wide * 0.03

                                            }}
                                            imageStyle={{ borderRadius: wide * 0.05 }}
                                            source={{ uri: item.item.challengeImageUrl }}
                                        >
                                            <LinearGradient colors={['rgba(35, 38, 47, 1)', 'rgba(35, 38, 47, 0.76)', 'rgba(35, 38, 47, 0)']}
                                                start={{ x: 0.0, y: 0.0 }} end={{ x: 1.5, y: 1.0 }}
                                                style={{ borderRadius: wide * 0.05, flex: 1 }}
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
                                                            {item.item.challengeName}
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
                                               
                                                    <View style={{ marginTop: wide * 0.03 }}>


                                                        {playerData != null || playerData != "" ?

                                                            <FlatList

                                                                data={item.item.subscriptionPlayerBasicInfoList}

                                                                showsHorizontalScrollIndicator={false}
                                                                horizontal
                                                                pagingEnabled={true}

                                                                legacyImplementation={false}

                                                                keyExtractor={item => item.index}
                                                                renderItem={(item, index) =>


                                                                    
                                                                    <View style={{ flex: 4, flexDirection: 'row',  }}>
                                                                       
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
                                            </LinearGradient>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                }
                            />
                        </View>

                    }



                    {suggestedChallenge?.length == 0 ? null :
                        <View>

                            <View style={{ flexDirection: 'row', marginTop: wide * 0.1 }}>
                                <View style={{
                                    flex: 3
                                }}>
                                    <Text style={{
                                        fontWeight: '600',
                                        color: Colors.light,
                                        fontSize: 16,
                                        fontFamily: 'Metropolis',

                                    }}>
                                        Suggested challenges
                                    </Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',


                                }}>
                                    <TouchableOpacity onPress={() => Navigation.navigate('CoachAiDrivenAllChallenge', { name: 'suggested', teamId: props.teamId })}>
                                        <Text style={{
                                            color: Colors.btnBg,
                                            fontWeight: '700',
                                            fontSize: 14,
                                            fontFamily: 'Metropolis',

                                        }}>
                                            See All{" >"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>




                            <FlatList
                                data={suggestedChallenge}

                                nestedScrollEnabled

                                keyExtractor={item => item.index}
                                renderItem={(item) =>
                                    <TouchableOpacity onPress={() => {

                                console.log("id",item.item)

                                            item.item.typeOfChallenge == "STATS" ?
                                                Navigation.navigate('CoachAiDrivenStatsChallenge',
                                                    {
                                                        name: "suggested",
                                                        teamId: props.teamId,
                                                        challengeId: item.item.challengeId,
                                                        typeOfChallenge: item.item.typeOfChallenge
                                                    })

                                                : item.item.typeOfChallenge == "QUESTION" ?
                                                    Navigation.navigate('CoachAiDrivenQuestionChallenge',
                                                        {
                                                            name: "suggested",
                                                            teamId: props.teamId,
                                                            challengeId: item.item.challengeId,
                                                            typeOfChallenge: item.item.typeOfChallenge
                                                        })
                                                    :
                                                    Navigation.navigate('CoachAiDrivenVideoChallenge',
                                                        {
                                                            name: "suggested",
                                                            teamId: props.teamId,
                                                            challengeId: item.item.challengeId,
                                                            typeOfChallenge: item.item.typeOfChallenge
                                                        })

                                           
                                               
                                    }}>
                                    <ImageBackground
                                        style={{
                                            height: wide * 0.165,
                                            width: '100%',

                                            marginTop: wide * 0.03

                                        }}
                                        imageStyle={{ borderRadius: 15 }}
                                        source={{ uri: item.item.challengeImageUrl }}
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
                                                        {item.item.challengeName}
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
                                    </TouchableOpacity>

                                }
                            />
                        </View>

                    }

                </View>

                :
                <View style={{
                    justifyContent: 'center',

                    alignItems: 'center',
                    marginTop: wide * 0.07,

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






                    }}>No AI Driven challenges found yet</Text>
                </View>
            }
            </ScrollView>


        </View>
    )
}
function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.homePlayer
    };
}
export default connect(mapStateToProps)(AIDrivenChallenges);

