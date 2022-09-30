import { View, Text, StyleSheet, KeyboardAvoidingView, Image, FlatList, ImageBackground, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native'
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
    getDetailsForplayerSubmission, getUserInfo, submitPlayerData
} from '../../actions/home';
import LinearGradient from 'react-native-linear-gradient';
import { getObject } from '../../middleware';

const CoachAiDrivenPlayerDetailsStatSubmission = (props) => {

    const [loading, setLoading] = useState(false)
    const [player, setPlayer] = useState(true)
    const [notesLength, setNotesLength] = useState(0)
    const [notes, setNotes] = useState()
    const [stats, setStats] = useState()
    const [challengeDetails, setChallengeDetails] = useState()
    const [APIData, setAPIData] = useState()
    const [coachName, setCoachName] = useState()
    const [coachPPU, setCoachPPU] = useState()




    const submissionId = props.navigation.state?.params?.submissionId



    let arr = []
    if (challengeDetails?.statsBasedChallenge.stats != null) {
        var obj = challengeDetails?.statsBasedChallenge.stats

        for (const key in obj) {

            arr.push({
                point_label: key,
                value: parseFloat(obj[key])
            })
        }


    }




    useEffect(() => {

        setLoading(true)


        props.dispatch(getDetailsForplayerSubmission(submissionId, (result, response) => {
            setLoading(false)
            if (result) {
                setAPIData(response)
                setChallengeDetails(response.challenge)
                // setPlayerData(response.listPlayersForAssignedChallengeList)
                console.log("error", response)
            } else {
                console.error("error", result)
            }
        }))




    }, [])

    useEffect(() => {
        setLoading(true)
        getObject('UserId').then((obj) => {

            props.dispatch(getUserInfo(obj, (res, resData) => {
                debugger
                console.log(resData)
                if (res) {
                    debugger
                    setLoading(false)

                    setCoachName(resData.personalInfo.firstName + " " + resData.personalInfo.lastName)
                    setCoachPPU(resData.personalInfo.profilePictureUR)


                }


            }))


        })

    }, [])


    const submitData = (status) => {

        console.log("heloooo",status)
        setLoading(true)
        if (notes != null && notes != undefined) {
            var data = {
               
                "coachName": coachName,
                "coachProfilePictureUrl": coachPPU,
                "coachRemarks" : notes,
                // "responseId": APIData.playerChallengeSubmission.previousResponsesList[0].id,
                "submissionStatus" : status

            }
            getObject('UserId').then((obj) => {
                props.dispatch(submitPlayerData(submissionId, data, (res, data) => {
                    if (res) {
                        setLoading(false)


                        console.log("uploaded Data=", data)


                    }

                }))
            })
        }

    }


    let wide = Layout.width;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />
                {challengeDetails != undefined ?

                    <ScrollView
                        bounces={false}
                    >
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
                                        fontSize: 15,
                                        fontWeight: '700',
                                        color: Colors.light
                                    }}> Stats of Focus</Text>
                                    <View style={{ marginTop: wide * 0.04 }}>


                                        <FlatList
                                            keyExtractor={(item, index) => index.toString()}
                                            data={arr}
                                            showsVerticalScrollIndicator={false}
                                            bounces={false}
                                            numColumns={4}
                                            scrollEnabled={false}
                                            renderItem={(item) =>

                                                <TouchableOpacity style={{
                                                    width: wide * 0.21,
                                                    height: wide * 0.16,
                                                    borderRadius: 10,
                                                    flexDirection: 'column',
                                                    marginVertical: wide * 0.015,
                                                    marginHorizontal: wide * 0.01,
                                                    backgroundColor: Colors.lightDark,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',

                                                }}>

                                                    <Text style={{
                                                        // marginTop: 16,
                                                        color: Colors.light, fontSize: 24,
                                                        fontFamily: Fonts.Bold, lineHeight: 30,
                                                        // marginHorizontal: 10
                                                    }}>
                                                        {item.item?.value}
                                                    </Text>

                                                    <Text style={{
                                                        // marginTop: 16,
                                                        color: Colors.newGrayFontColor, fontSize: 14,
                                                        fontFamily: Fonts.SemiBold, lineHeight: 20,
                                                        // marginHorizontal: 10
                                                    }}>
                                                        {item.item?.point_label}
                                                    </Text>


                                                </TouchableOpacity>


                                            }



                                        />


                                        {/*                                        
                                <FlatList
                                keyExtractor={item => item.index}
                data={arr}
            
                showsVerticalScrollIndicator={false}
                bounces={false}
                numColumns={4}
                scrollEnabled={false}
                renderItem={(item, index) =>
               
                       <View style={{ flex: 1, marginRight: wide * 0.02 }}>
                       <View
                           style={{
                               width: wide * 0.21,
                               height: wide * 0.18,
    
                               backgroundColor: '#23262F',
                               borderRadius: wide * 0.02,
                               justifyContent: 'center',
                               alignItems: 'center'
                           }}>
                           <Text style={{
                               color: Colors.light,
                               fontFamily: 'Metropolis',
                               fontSize: 23,
                               fontWeight: '400'
                           }}>56.0</Text>
                           <Text style={{
                               fontFamily: 'Metropolis',
                               fontSize: 13,
                               fontWeight: '400',
                               color: Colors.light,
                               opacity: 0.5,
                               marginTop: wide * 0.015
    
    
    
                           }} >Points</Text>
                       </View>
                   </View>
    
    
                }
              /> */}



                                    </View>

                                    {APIData.playerChallengeSubmission.submissionStatus == "COMPLETED" ?
                                        <View>

                                            {APIData.playerChallengeSubmission.previousResponsesList[0].playerRemarks != null ?
                                                <View>
                                                    <Text style={{
                                                        color: Colors.light,
                                                        fontFamily: 'Metropolis',
                                                        fontSize: 18,
                                                        fontWeight: '700',
                                                        marginTop: wide * 0.06
                                                    }}>Notes</Text>
                                                    <View style={{
                                                        borderColor: '#75777D',
                                                        width: '100%',

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
                                                            <Text
                                                                style={{
                                                                    color: Colors.light,

                                                                    width: '100%',
                                                                }}



                                                            >
                                                                {APIData.playerChallengeSubmission.previousResponsesList[0].playerRemarks}
                                                            </Text>
                                                        </View>

                                                    </View>
                                                </View>
                                                :
                                                null}



                                            <Text style={{
                                                color: Colors.light,
                                                fontFamily: 'Metropolis',
                                                fontSize: 18,
                                                fontWeight: '700',
                                                marginTop: wide * 0.06
                                            }}>Comments</Text>
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
                                                marginTop: wide * 0.1,
                                                marginBottom: wide * 0.05
                                            }}
                                                onPress={() => {

                                                    submitData('APPROVED')


                                                }}>
                                                <Text style={{
                                                    color: Colors.light,
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 16,
                                                    fontWeight: '700'

                                                }}>
                                                    Approve



                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{


                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: wide * 0.15,
                                                borderRadius: wide * 0.1,

                                                marginBottom: wide * 0.1,
                                                borderColor: Colors.light,
                                                borderWidth: 1
                                            }}
                                                onPress={() => {

                                                    submitData('DISAPPROVED')

                                                }}>
                                                <Text style={{
                                                    color: Colors.light,
                                                    fontFamily: 'Metropolis',
                                                    fontSize: 16,
                                                    fontWeight: '700'

                                                }}>
                                                    Disapprove


                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                        :
                                        <View>

                                            <View style={{
                                                borderColor: '#75777D',
                                                width: '100%',

                                                borderStyle: 'solid',
                                                borderWidth: 0.2,
                                                borderRadius: wide * 0.015,
                                                marginTop: wide * 0.1,
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                            }}>

                                                <View
                                                    style={{
                                                        margin: wide * 0.02,


                                                        flex: 1
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: Colors.light,

                                                            width: '100%',
                                                        }}



                                                    >
                                                        Player hasn’t submitted the response
                                                    </Text>
                                                </View>

                                            </View>
                                        </View>
                                    }

                                </View>
                            </KeyboardAvoidingView>
                        </KeyBoardDismissHandler>
                    </ScrollView>
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

export default connect(mapStateToProps)(CoachAiDrivenPlayerDetailsStatSubmission);
