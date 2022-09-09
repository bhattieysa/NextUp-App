import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, TouchableOpacity, TextInput, Button, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';
import AppLoader from '../../utils/Apploader';
import Navigation from '../../lib/Navigation';
import { RadioButton } from "../../components/common/radioButton"
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import {
    getListOFChallengesPlayerDetails
} from '../../actions/home';
import LinearGradient from 'react-native-linear-gradient';



const CoachAiDrivenPlayerDetails = (props) => {

    const [loading, setLoading] = useState(false)
    const [playerData, setPlayerData] = useState("")
    const [challengeDetails, setChallengeDetails] = useState()
    const name = props.navigation.state?.params?.name
    const teamId = props.navigation.state?.params?.teamId
    const challengeId = props.navigation.state?.params?.challengeId
    const typeOfChallenge = props.navigation.state?.params?.typeOfChallenge

    useEffect(() => {

        setLoading(true)
        props.dispatch(getListOFChallengesPlayerDetails(teamId, challengeId, (result, response) => {
            setLoading(false)
            if (result) {

                setChallengeDetails(response.challengeDetails)
                setPlayerData(response.listPlayersForAssignedChallengeList)
            } else {
                console.error("error", result)
            }
        }))
    }, [])

    let wide = Layout.width;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />
                {playerData!=undefined && challengeDetails!=undefined?
                <KeyBoardDismissHandler >


                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground source={{ uri: challengeDetails.imageUrl }}
                            style={{
                                width: wide,
                                height: wide * 0.6
                            }}
                        >
                            <LinearGradient colors={['rgba(39, 41, 48, 0)', 'rgba(24, 26, 32, 1)', '#181A20']}
                                start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.8 }}
                                style={{ flex: 1 }}
                            >
                                <ScreenHeader
                                    backButtonAction={() => Navigation.back()}
                                />
                            </LinearGradient>
                        </ImageBackground>
                        <Text style={{
                            fontFamily: 'Metropolis',
                            fontWeight: '700',
                            fontSize: 32,
                            color: Colors.light,
                            marginTop: -wide * 0.09,
                        }} >
                            {challengeDetails.name}
                        </Text>
                        <Text style={{
                            fontFamily: 'Metropolis',
                            fontSize: 12,
                            fontWeight: '500',
                            color: Colors.light,
                            marginLeft: wide * 0.04,
                            marginRight: wide * 0.04,
                            marginTop: wide * 0.02
                        }}>{challengeDetails.description}</Text>
                    </View>
                    <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
                        behavior={Platform.OS === 'ios' ? "padding" : null}>
                        <View
                            style={{
                                marginLeft: wide * 0.035, marginRight: wide * 0.035, marginTop: wide * 0.1
                            }}>
                            <Text style={{
                                fontFamily: 'Metropolis',
                                fontSize: 22,
                                fontWeight: '600',
                                color: Colors.light
                            }}>All Players</Text>
                            <View style={{ marginTop: wide * 0.04 }}>
                                            
                                
                                
                            <FlatList
                            data={playerData}



                            keyExtractor={item => item.index}
                            renderItem={(item) =>
                                <View
                                style={{
                                    width: '100%',
                                    height: wide * 0.3,
                                    backgroundColor: '#23262F',
                                    borderRadius: wide * 0.04,
                                    marginBottom:wide*0.04
                                }}>
                                <View style={{ flexDirection: 'row', margin: wide * 0.03 }}>
                                    <View style={{ flexDirection: 'row', flex: 3 }}>

                                        <Image
                                            style={{
                                                width: wide * 0.1,
                                                height: wide * 0.1,
                                                borderRadius: (wide * 0.1) / 2

                                            }}
                                            source={{uri:item.item.playerProfilePicUrl}}
                                        />
                                        <View style={{ marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                            <Text style={{
                                                fontFamily: 'Metropolis',
                                                fontSize: 13,
                                                fontWeight: '700',
                                                color: Colors.light




                                            }}>{item.item.playerName}</Text>

                                            <Text style={{
                                                fontFamily: 'Metropolis',
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#F7CB15',
                                                marginTop: wide * 0.01




                                            }}>8 days left</Text>


                                        </View>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: Colors.btnBg, borderRadius: wide * 0.02, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: wide * 0.07 }}>
                                        <Image
                                            style={{
                                                width: 10,
                                                height: 10
                                            }}
                                            source={
                                                item.item.teamLogoUrl==null || item.item.teamLogoUrl==""?
                                                require("../../Images/active.png")
                                                :
                                                {uri:item.item.teamLogoUrl}
                                            }
                                        />
                                        <Text style={{ color: Colors.light, fontSize: 15, fontWeight: '600', marginLeft: wide * 0.01 }}>Active</Text>


                                    </View>
                                    {/* <View style={{ flex: 1.3, backgroundColor: '#3EC300', borderRadius: wide * 0.02, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: wide * 0.07, width: wide * 0.1 }}>
                                            <Image
                                                style={{
                                                    width: 15,
                                                    height: 15
                                                }}
                                                source={require("../../Images/complete.png")}
                                            />
                                            <Text style={{ color: Colors.light, fontSize: 15, fontWeight: '600', marginLeft: wide * 0.01 }}>Complete</Text>

                                        </View> */}


                                </View>

                                <View style={{ flexDirection: 'row', marginTop: wide * 0.01, marginLeft: wide * 0.03, }}>

                                    <Image
                                        source={require("../../Images/lakers.png")}
                                    />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 14,
                                                    color: Colors.light

                                                }}>PPG</Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 16,
                                                    color: Colors.light,
                                                    fontWeight: '700',
                                                    marginTop: wide * 0.01

                                                }}
                                            >{item.item.pgs.PPG}</Text>

                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}></View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 14,
                                                    color: Colors.light

                                                }}>APG</Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 16,
                                                    color: Colors.light,
                                                    fontWeight: '700',
                                                    marginTop: wide * 0.01

                                                }}
                                            >{item.item.pgs.APG}</Text>

                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}></View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 14,
                                                    color: Colors.light

                                                }}>RPG</Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 16,
                                                    color: Colors.light,
                                                    fontWeight: '700',
                                                    marginTop: wide * 0.01

                                                }}
                                            >{item.item.pgs.RPG}</Text>

                                        </View>
                                    </View>





                                </View>


                            </View>
                            }
                                />
<TouchableOpacity style={{
   
   backgroundColor:Colors.btnBg,
   justifyContent:'center',
   alignItems:'center',
   height:wide*0.15,
   borderRadius:wide*0.1,
   marginTop:wide*0.1
}}
onPress={() => 
    typeOfChallenge == "STATS" ?
    Navigation.navigate('CoachAiDrivenStatsChallenge',
        {
            name: "assigned",
            teamId:teamId,
            challengeId:challengeId,
            typeOfChallenge: typeOfChallenge
        })

    : typeOfChallenge == "QUESTION" ?
        Navigation.navigate('CoachAiDrivenQuestionChallenge',
            {
                name: "assigned",
            teamId:teamId,
            challengeId:challengeId,
            typeOfChallenge: typeOfChallenge
            })
        :
        Navigation.navigate('CoachAiDrivenVideoChallenge',
            {
                name: "assigned",
            teamId:teamId,
            challengeId:challengeId,
            typeOfChallenge: typeOfChallenge
            })


    
    
        }

>
  <Text style={{
color:Colors.light,
fontFamily: 'Metropolis',
fontSize:16,
fontWeight:'700'

  }}>Add Particpants</Text>
</TouchableOpacity>

                            </View>
                        </View>
                    </KeyboardAvoidingView>

                </KeyBoardDismissHandler>
                                    :
                                    null
                }
            </SafeAreaView>
        </View>
    )
}
function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.home
    };
}

export default connect(mapStateToProps)(CoachAiDrivenPlayerDetails);
