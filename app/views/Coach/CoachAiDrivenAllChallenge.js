import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import {
    getListOFALLChallenges
} from '../../actions/home';



const CoachAiDrivenAllChallenge = (props) => {
    const [loading, setLoading] = useState(false)
    const [allData, setAllData] = useState()
    const [playerData, setPlayerData] = useState()

    const name = props.navigation.state?.params?.name
    const teamId = props.navigation.state?.params?.teamId
    const typeOfSubscription = props.navigation.state?.params?.typeOfSubscription

    let wide = Layout.width;


    useEffect(() => {
setLoading(true)

        props.dispatch(getListOFALLChallenges(teamId, name, (result, response) => {

            if (result) {

                setAllData(response);
                setLoading(false)

            } else {
                //console.log("eysadata",props.teamId)
            }
        }))
    }, [teamId])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />

                <View>
                    <ScreenHeader
                        title={'Ai driven challenge-See all'}
                        backButtonAction={() => Navigation.back()}
                    />
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
                    behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <View style={{ marginLeft: wide * 0.035, marginRight: wide * 0.035 }}>


                        <FlatList
                            data={allData}


bounces={false}
                            keyExtractor={item => item.index}
                            renderItem={(item) =>

                                <View>
                                    {name == "assigned" ?
                                    <TouchableOpacity
                                    onPress={()=>{

                                      

                                        item.item.typeOfChallenge == "STATS" ?
                                            Navigation.navigate('CoachAiDrivenStatsChallenge',
                                                {
                                                    name: "assigned",
                                                    teamId:teamId,
                                                    challengeId: item.item.challengeId,
                                                    typeOfChallenge: item.item.typeOfChallenge,
                                                    typeOfSubscription:typeOfSubscription,
                                                    submissionId:item.item.submissionId
                                                })

                                            : item.item.typeOfChallenge == "QUESTION" ?
                                                Navigation.navigate('CoachAiDrivenQuestionChallenge',
                                                    {
                                                        name: "assigned",
                                                        teamId: teamId,
                                                        challengeId: item.item.challengeId,
                                                        typeOfChallenge: item.item.typeOfChallenge,
                                                        typeOfSubscription:typeOfSubscription,
                                                        submissionId:item.item.submissionId
                                                    })
                                                :
                                                Navigation.navigate('CoachAiDrivenVideoChallenge',
                                                    {
                                                        name: "assigned",
                                                        teamId: teamId,
                                                        challengeId: item.item.challengeId,
                                                        typeOfChallenge: item.item.typeOfChallenge,
                                                        typeOfSubscription:typeOfSubscription,
                                                        submissionId:item.item.submissionId
                                                    })

                                        
                                      


                                    }}
                                    >
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
                                                                source={require('../../Images/Vector.png')}
                                                            />
                                                            :
                                                            item.item.typeOfChallenge == "QUESTION" ?
                                                                <Image style={{ marginLeft: wide * 0.015 }}
                                                                    source={require('../../Images/texticon.png')}
                                                                />
                                                                :
                                                                <Image style={{ marginLeft: wide * 0.015 }}
                                                                    source={require('../../Images/videoicon.png')}
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


                                                        {item.item.subscriptionPlayerBasicInfoList != null || item.item.subscriptionPlayerBasicInfoList != "" ?

                                                            <FlatList

                                                                data={item.item.subscriptionPlayerBasicInfoList}

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
                                            </LinearGradient>
                                        </ImageBackground>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                        onPress={()=>{
    
                                          
    
                                            item.item.typeOfChallenge == "STATS" ?
                                                Navigation.navigate('CoachAiDrivenStatsChallenge',
                                                    {
                                                        name: "suggested",
                                                        teamId:teamId,
                                                        challengeId: item.item.id,
                                                        typeOfChallenge: item.item.typeOfChallenge,
                                                        submissionId:item.item.submissionId
                                                    })
    
                                                : item.item.typeOfChallenge == "QUESTION" ?
                                                    Navigation.navigate('CoachAiDrivenQuestionChallenge',
                                                        {
                                                            name: "suggested",
                                                            teamId: teamId,
                                                            challengeId: item.item.id,
                                                            typeOfChallenge: item.item.typeOfChallenge,
                                                            submissionId:item.item.submissionId
                                                        })
                                                    :
                                                    Navigation.navigate('CoachAiDrivenVideoChallenge',
                                                        {
                                                            name: "suggested",
                                                            teamId: teamId,
                                                            challengeId: item.item.id,
                                                            typeOfChallenge: item.item.typeOfChallenge,
                                                            submissionId:item.item.submissionId
                                                        })
    
                
    
    
                                        }}
                                        >
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
                                                                source={require('../../Images/Vector.png')}
                                                            />
                                                            :
                                                            item.item.typeOfChallenge == "QUESTION" ?
                                                                <Image style={{ marginLeft: wide * 0.015 }}
                                                                    source={require('../../Images/texticon.png')}
                                                                />
                                                                :
                                                                <Image style={{ marginLeft: wide * 0.015 }}
                                                                    source={require('../../Images/videoicon.png')}
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
                                </View>
                            }
                        />



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
        Home: entities.home
    };
}

export default connect(mapStateToProps)(CoachAiDrivenAllChallenge);

