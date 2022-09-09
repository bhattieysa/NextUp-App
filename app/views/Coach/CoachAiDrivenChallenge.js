import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoadToPro from '../../views/Coach/Components/AIDrivenChallenge/RoadToPro';
import AIDrivenChallenges from '../../views/Coach/Components/AIDrivenChallenge/AIDrivenChallenges';
import { connect } from 'react-redux';
import {
    getNewCoachTeam
} from '../../actions/home';
import { getObject } from '../../middleware';
const CoachAiDrivenChallenge = (props) => {
    const [loading, setLoading] = useState(false)
    const [selectedTab, setSelectedtab] = useState("first")
    const [teamData, setTeamData] = useState()
    const [teamId, setTeamID] = useState()
    const [selectTeam, setSelectTeam] = useState(0)


    useEffect(() => {
        setLoading(true)
    
        getObject('UserId').then((obj) => {
         
            props.dispatch(getNewCoachTeam(obj, (res, data) => {
                if (res) {
                    setLoading(false)
                  console.log("data",data.teamTabInfoDtoList[0].teamId)
                    setTeamData(data.teamTabInfoDtoList)
                    setTeamID(data.teamTabInfoDtoList[0].teamId)

                   
                }
            }))
        })
    }, [])
    let wide = Layout.width;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />

                <View>
                    <ScreenHeader
                        title={'Ai driven challenge'}
                        backButtonAction={() => Navigation.back()}
                    />
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
                    behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <View>


                        <View style={{ marginLeft: wide * 0.04, marginRight: wide * 0.04, flexDirection: 'row' }}>
                            <FlatList

                                data={teamData}

                                showsHorizontalScrollIndicator={false}
                                horizontal
                                pagingEnabled={true}

                                legacyImplementation={false}

                                keyExtractor={item => item.index}
                                renderItem={(item) =>
                                    <TouchableOpacity onPress={() => { setTeamID(item.item.teamId), setSelectTeam(item.index),console.log("sec",item.item.teamId) }}>
                                        {/* {selectTeam == 0 ?
                                            setTeamID(item.item.teamId) : null

                                        } */}

                                        <ImageBackground
                                            style={{
                                                height: wide * 0.18,
                                                width: wide * 0.18,
                                                marginRight: wide * 0.02,
                                            }}


                                            source={
                                                item.index == selectTeam ?
                                                    require('../../Images/selectedTeam.png')
                                                    :
                                                    require('../../Images/unselectedteam.png')
                                            }
                                        >
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                flex: 1
                                            }}>
                                                {item.item.teamLogoUrl == null ? <Image
                                                    source={require('../../Images/selectedTeam.png')}
                                                    style={{
                                                        width: wide * 0.066,
                                                        height: wide * 0.066
                                                    }}
                                                /> :
                                                    <Image
                                                        source={{ uri: item.item.teamLogoUrl }}
                                                        style={{
                                                            width: wide * 0.066,
                                                            height: wide * 0.066
                                                        }}
                                                    />

                                                }


                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                } />





                        </View>
    {loading == false ?
                        <View style={{
                            flexDirection: 'row',
                            marginTop: wide * 0.05,
                            justifyContent: 'center',
                            alignSelf: 'center'

                        }}>

                            {selectedTab == "first" ?

                                <View
                                    style={{
                                        flex: 1,
                                        marginLeft: wide * 0.023,
                                        alignItems: 'center',
                                        justifyContent: 'center',


                                    }}

                                >

                                    <Text style={{

                                        borderBottomColor: Colors.light,
                                        borderBottomWidth: 2,
                                        color: Colors.light,
                                        fontWeight: '600',
                                        fontSize: 14,
                                        fontFamily: 'Metropolis',




                                    }}>
                                        Road to pro
                                    </Text>
                                    <View style={{

                                        borderBottomColor: Colors.light,
                                        borderBottomWidth: 2,
                                        width: wide * 0.25,


                                    }}
                                    />

                                </View>

                                :

                                <View
                                    style={{
                                        flex: 1,
                                        marginLeft: wide * 0.023,
                                        alignItems: 'center',
                                        justifyContent: 'center',


                                    }}
                                >
                                    <TouchableOpacity onPress={() => { setSelectedtab("first") }}>
                                        <Text style={{


                                            color: Colors.titleLabelColor,
                                            fontWeight: '400',
                                            fontSize: 14,
                                            fontFamily: 'Metropolis',


                                        }}>
                                            Road to pro
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }


                            {selectedTab == "secound" ?

                                <View
                                    style={{
                                        flex: 1,
                                        marginRight: wide * 0.023,
                                        alignItems: 'center',
                                        justifyContent: 'center',



                                    }}
                                >
                                    <Text style={{

                                        borderBottomColor: Colors.light,
                                        borderBottomWidth: 2,
                                        color: Colors.light,
                                        fontWeight: '600',
                                        fontSize: 14,
                                        fontFamily: 'Metropolis',




                                    }}>
                                        AI Driven challenges
                                    </Text>
                                    <View style={{

                                        borderBottomColor: Colors.light,
                                        borderBottomWidth: 2,
                                        width: wide * 0.43,


                                    }}
                                    />

                                </View>
                                :

                                <View
                                    style={{
                                        flex: 1,
                                        marginRight: wide * 0.023,
                                        alignItems: 'center',
                                        justifyContent: 'center',


                                    }}
                                >
                                    <TouchableOpacity onPress={() => { setSelectedtab("secound") }}>
                                        <Text style={{


                                            color: Colors.titleLabelColor,
                                            fontWeight: '400',
                                            fontSize: 14,
                                            fontFamily: 'Metropolis',


                                        }}>
                                            AI Driven challenges
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }



                        </View>
:null}
                        {loading == false &&teamId!=undefined?
                            <View>

                                {selectedTab == "first" ?
                                    <RoadToPro 
                                    teamId={teamId} 
                                 
                                  

                                    />
                                    :
                                    <AIDrivenChallenges 
                                    teamId={teamId}
                                  
                                    />

                                }

                            </View>
                            : null}
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
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
export default connect(mapStateToProps)(CoachAiDrivenChallenge);
