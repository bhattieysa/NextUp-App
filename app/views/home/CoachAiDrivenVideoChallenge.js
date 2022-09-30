import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, TouchableOpacity, TextInput, Button } from 'react-native'
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
    getListOFChallengesPlayerDetails, getListOFChallengesSuggested
} from '../../actions/home';
import LinearGradient from 'react-native-linear-gradient';



const CoachAiDrivenVideoChallenge = (props) => {

    const [loading, setLoading] = useState(false)
    const [player, setPlayer] = useState(true)
    const [notesLength, setNotesLength] = useState(0)
    const [notes, setNotes] = useState()

    const [challengeDetails, setChallengeDetails] = useState()
    const name = props.navigation.state?.params?.name
    const teamId = props.navigation.state?.params?.teamId
    const challengeId = props.navigation.state?.params?.challengeId
    const typeOfChallenge = props.navigation.state?.params?.typeOfChallenge
    const typeOfSubscription = props.navigation.state?.params?.typeOfSubscription
    

    useEffect(() => {

        setLoading(true)
        {
            name == "assigned" ?

                props.dispatch(getListOFChallengesPlayerDetails(teamId, challengeId, (result, response) => {
                    setLoading(false)
                    if (result) {

                        setChallengeDetails(response.challengeDetails)
                        // setPlayerData(response.listPlayersForAssignedChallengeList)
                    } else {
                        console.error("error", result)
                    }
                }))
                :

                props.dispatch(getListOFChallengesSuggested(teamId, challengeId, (result, response) => {
                    setLoading(false)
                    console.error("eysa", response)
                    if (result) {



                        setChallengeDetails(response)


                    } else {
                        console.log("error", result)
                    }
                }))
        }
    }, [])


    let wide = Layout.width;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />

                {challengeDetails != undefined ?
                    <KeyBoardDismissHandler >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ImageBackground source={{ uri: challengeDetails.imageUrl }}
                                style={{
                                    width: wide,
                                    height: wide * 0.6,
                                }}
                            >
                                
                                <LinearGradient colors={['rgba(39, 41, 48, 0)', 'rgba(24, 26, 32, 1)', '#181A20']}
                                    start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.8 }}
                                    style={{ flex: 1 }}
                                >
                                    <ScreenHeader
                                        backButtonAction={() => Navigation.back()}
                                    />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.15 }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                Navigation.navigate('VideoPlayer',
                                                    { name: "assigned", videoUrl: challengeDetails.videoChallenge.contentVideoUrl.videoUrl })
                                            }
                                        >
                                            <Image
                                                style={{
                                                    width: wide * 0.15,
                                                    height: wide * 0.15
                                                }}
                                                source={require("../../Images/video.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
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
                                    color: Colors.light,
                                    fontFamily: 'Metropolis',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    marginTop: wide * 0.06
                                }}>Add Notes</Text>
                                <View style={{
                                    borderColor: '#75777D',
                                    width: '100%',
                                    height: wide * 0.25,
                                    borderStyle: 'solid',
                                    borderWidth: 0.2,
                                    borderRadius: wide * 0.015,
                                    marginTop: wide * 0.04

                                }}>

                                    <View
                                        style={{
                                            margin: wide * 0.02,
                                            alignItems: 'flex-start',

                                            flex: 1
                                        }}>
                                        <TextInput
                                            style={{
                                                color: Colors.light,
                                                height: '100%',
                                                width: '100%',
                                            }}
                                            multiline={true}
                                            onChangeText={(text) => {
                                                setNotes(text),
                                                    setNotesLength(text.length)
                                            }}
                                            maxLength={260}
                                        ></TextInput>
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end',
                                            marginRight: wide * 0.03,
                                            marginBottom: wide * 0.02,

                                        }}>
                                        <Text style={{
                                            color: Colors.light,
                                            fontFamily: 'Metropolis',
                                            fontSize: 12,
                                            fontWeight: '600',

                                        }}>{notesLength}/260</Text>
                                    </View>
                                </View>

                                <TouchableOpacity style={{

                                    backgroundColor: Colors.btnBg,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: wide * 0.15,
                                    borderRadius: wide * 0.1,
                                    marginTop: wide * 0.1
                                }}
                                onPress={() => {
                                    player==true?
                                    Navigation.navigate('CoachAssignPlayer', { notes:notes,typeOfSubscription:typeOfSubscription,assignTo:'Player',challengeId:challengeId  })
                                    :
                                    Navigation.navigate('CoachAssignPlayer', { notes:notes,typeOfSubscription:typeOfSubscription,assignTo:'Team',challengeId:challengeId  })
                                    
                                 } }
                                
                                >
                                    <Text style={{
                                        color: Colors.light,
                                        fontFamily: 'Metropolis',
                                        fontSize: 16,
                                        fontWeight: '700'

                                    }}>Submit</Text>
                                </TouchableOpacity>



                            </View>

                        </KeyboardAvoidingView>
                    </KeyBoardDismissHandler>
                    :
                    null}

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

export default connect(mapStateToProps)(CoachAiDrivenVideoChallenge);
