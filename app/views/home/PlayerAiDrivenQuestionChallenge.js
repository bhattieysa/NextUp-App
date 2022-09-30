import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, TouchableOpacity, TextInput, Button, FlatList, ScrollView, Modal } from 'react-native'
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
    getDetailsForplayerSubmission, submitPlayerData, verifyAnswer,getUserInfo
} from '../../actions/home';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from "@react-native-community/blur";
import { getObject } from '../../middleware';


const PlayerAiDrivenQuestionChallenge = (props) => {

    const [loading, setLoading] = useState(false)
    const [successAnswer, setSuccessAnswer] = useState(false)
    const [wrongAnswer, setWrongAnswer] = useState(false)
    const [verifyCheck, setVerifyCheck] = useState(false)


    const [player, setPlayer] = useState(true)
    const [notesLength, setNotesLength] = useState(0)
    const [notes, setNotes] = useState()
    const [answer, setAnswer] = useState()
    const [APIData, setAPIData] = useState()
    const [challengeDetails, setChallengeDetails] = useState()
    const [playerName, setPlayerName] = useState()



    const name = props.navigation.state?.params?.name
    const teamId = props.navigation.state?.params?.teamId
    const challengeId = props.navigation.state?.params?.challengeId
    const typeOfChallenge = props.navigation.state?.params?.typeOfChallenge
    const typeOfSubscription = props.navigation.state?.params?.typeOfSubscription
    const submissionId = props.navigation.state?.params?.submissionId




    useEffect(() => {

        setLoading(true)


        props.dispatch(getDetailsForplayerSubmission(submissionId, (result, response) => {
            setLoading(false)
            if (result) {
                console.log("details1", response)
                setChallengeDetails(response.challenge)
                setAPIData(response)
                // setPlayerData(response.listPlayersForAssignedChallengeList)
            } else {
                console.error("error", result)
            }
        }))




    }, [])




    useEffect(() => {

        if (successAnswer == true) {
            setWrongAnswer(false)
        }

    }, [successAnswer])
    useEffect(() => {

        if (wrongAnswer == true) {
            setSuccessAnswer(false)
        }

    }, [wrongAnswer])


    const verifyQuestion = () => {
        setLoading(true)
        props.dispatch(verifyAnswer(challengeId, answer, (result, response) => {

            debugger
            if (response) {

                setLoading(false)
                setSuccessAnswer(true)
                setVerifyCheck(true)
                // setWrongAnswer(false)


                console.log("details1", response)

            } else {
                // setSuccessAnswer(false)
                setLoading(false)
                setWrongAnswer(true)
                setVerifyCheck(false)
                console.log("error", wrongAnswer)
            }
        }))



    }

    useEffect(() => {
        setLoading(true)
        getObject('UserId').then((obj) => {

            props.dispatch(getUserInfo(obj, (res, resData) => {
                debugger
                console.log(resData)
                if (res) {
                    debugger
                    setLoading(false)

                    setPlayerName(resData.personalInfo.firstName + " " + resData.personalInfo.lastName)


                }


            }))


        })

    }, [])
    const uploadData = () => {
setLoading(true)

        var data = {

            "playerName": playerName,
            "questionStatsAnswer": answer

        }

        props.dispatch(submitPlayerData(submissionId, data, (res, data) => {
            if (res) {
                setLoading(false)


                console.log("uploaded Data=", data)


            }

        }))



    }


    let wide = Layout.width;
    let high = Layout.height;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />



                <ScrollView bounces={false}>

                    {challengeDetails != undefined && APIData != undefined ?

                        <View style={{ flex: 1 }}>





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
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: wide * 0.05,
                                }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Image
                                            style={{
                                                width: wide * 0.1,
                                                height: wide * 0.1,
                                                borderRadius: wide * 0.1
                                            }}
                                            resizeMode={'stretch'}
                                            source={
                                                APIData.coachProfilePicUrl == null ?
                                                    require('../../Images/coachdp.png')
                                                    :
                                                    { uri: APIData.coachProfilePicUrl }
                                            }
                                        />
                                        <View style={{ marginLeft: wide * 0.02 }}>
                                            <Text style={{
                                                color: '#B7B7B7',
                                                fontSize: 13,
                                                fontWeight: '400'
                                            }}>Coach</Text>
                                            <Text style={{
                                                color: Colors.light,
                                                fontSize: 14,
                                                fontWeight: '700'
                                            }}>{APIData.coachName}</Text>

                                        </View>






                                    </View>
                                    <View style={{ marginTop: wide * 0.05, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{

                                            fontSize: 18,
                                            fontWeight: '400',
                                            color: '#B7B7B7'



                                        }}>Total Points</Text>

                                        <Text style={{


                                            fontSize: 37,
                                            fontWeight: '700',
                                            color: Colors.light

                                        }}>{APIData.points}</Text>

                                    </View>


                                </View>




                                <View
                                    style={{
                                        marginLeft: wide * 0.035, marginRight: wide * 0.035, marginTop: wide * 0.1
                                    }}>
                                    <Text style={{
                                        fontFamily: 'Metropolis',
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: Colors.light
                                    }}>{challengeDetails.questionnaireChallenge.question}</Text>





                                    <View style={{ marginTop: wide * 0.04 }}>

                                        <FlatList
                                            data={challengeDetails.questionnaireChallenge.options}
                                            scrollEnabled={false}
                                            keyExtractor={item => item.index}
                                            renderItem={(item) =>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    marginBottom: wide * 0.04,
                                                }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => { setAnswer(item.index) }}
                                                    >
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            marginBottom: wide * 0.04,
                                                        }}>
                                                            <RadioButton
                                                                containerStyle={{
                                                                    width: wide * 0.07, height: wide * 0.07,
                                                                    borderRadius: wide * 0.07 / 2,
                                                                    backgroundColor: answer == item.index ? Colors.btnBg : Colors.radioBtnBorder,
                                                                    borderWidth: 1,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    marginHorizontal: wide * 0.006,
                                                                }}
                                                                centerStyle={{
                                                                    width: '50%', height: '50%',
                                                                    borderRadius: wide * 0.07 / 4,
                                                                    backgroundColor: Colors.btnBg,
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'

                                                                }}
                                                                isSelected={answer == item.index ? true : false}

                                                                iconCheck={true}


                                                            />

                                                            <Text style={{
                                                                color: answer == item.index ? Colors.light : Colors.txtFieldPlaceHolder,
                                                                alignSelf: 'center',
                                                                fontFamily: Fonts.SemiBold, fontSize: 16,
                                                                lineHeight: 18, marginHorizontal: wide * 0.025,
                                                                fontWeight: '600',
                                                                marginTop: wide * 0.01
                                                            }}>{item.item}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>


                                            }
                                        />

                                        {/* <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    marginBottom:wide*0.04,
                                   

                                }}
                                    activeOpacity={1}
                                    onPress={() => { setPlayer(false) }}
                                >

                                    <RadioButton
                                        containerStyle={{
                                            width: wide * 0.07, height: wide * 0.07,
                                            borderRadius: wide * 0.07 / 2,
                                            backgroundColor: player == true ? Colors.btnBg : Colors.radioBtnBorder,
                                            borderWidth: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginHorizontal: wide * 0.006,
                                        }}
                                        centerStyle={{
                                            width: '50%', height: '50%',
                                            borderRadius: wide * 0.07 / 4,
                                            backgroundColor: Colors.btnBg,
                                            alignItems:'center',
                                            justifyContent:'center'
                                            
                                        }}
                                        isSelected={player == true ? true : false}
                                        onPress={() => { setPlayer(false) }}
                                        iconCheck={true}

                                    />
                                    <Text style={{
                                        color: player == false ? Colors.light : Colors.txtFieldPlaceHolder,
                                        alignSelf: 'center',
                                        fontFamily: Fonts.SemiBold, fontSize: 16,
                                        lineHeight: 18, marginHorizontal: wide * 0.025,
                                        fontWeight: '600',
                                    }}>Team</Text>
                                </TouchableOpacity> */}











                                    </View>

                                    {verifyCheck == true ?

                                        <TouchableOpacity style={{

                                            backgroundColor: Colors.btnBg,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: wide * 0.15,
                                            borderRadius: wide * 0.1,
                                            marginTop: wide * 0.1,
                                            marginBottom: wide * 0.1
                                        }}
                                            onPress={() => {

                                                uploadData()


                                            }}>
                                            <Text style={{
                                                color: Colors.light,
                                                fontFamily: 'Metropolis',
                                                fontSize: 16,
                                                fontWeight: '700'

                                            }}>
                                                Submit


                                            </Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{

                                            backgroundColor: Colors.btnBg,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: wide * 0.15,
                                            borderRadius: wide * 0.1,
                                            marginTop: wide * 0.1,
                                            marginBottom: wide * 0.1
                                        }}
                                            onPress={() => {

                                                verifyQuestion()

                                            }}>
                                            <Text style={{
                                                color: Colors.light,
                                                fontFamily: 'Metropolis',
                                                fontSize: 16,
                                                fontWeight: '700'

                                            }}>
                                                Verify


                                            </Text>
                                        </TouchableOpacity>
                                    }


                                  
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={successAnswer}
                                        >
                                            <TouchableOpacity
                                                onPress={() => setSuccessAnswer(false)}
                                                style={{
                                                    width: wide,
                                                    height: high,
                                                    justifyContent: 'center', alignItems: 'center'
                                                }}
                                            >
                                                <BlurView style={{
                                                    width: wide,
                                                    height: high,
                                                    position: 'absolute',
                                                    // justifyContent: 'center', alignItems: 'center'
                                                }}
                                                    blurAmount={10}
                                                    blurRadius={10}
                                                />
                                                <View style={{
                                                    width: wide * 0.8, height: wide * 0.77, backgroundColor: Colors.ractangelCardColor,
                                                    marginTop: 20, borderRadius: 20, alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        width: '100%', marginTop: wide * 0.07,
                                                        alignItems: 'center', justifyContent: 'center',
                                                        // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                                                    }}>
                                                        <Image
                                                            source={require('../../Images/success.png')}
                                                        />
                                                        <Text style={{ fontStyle: 22, fontWeight: '700', color: Colors.light }}>Wooo hooo!</Text>
                                                        <Text style={{ fontStyle: 16, fontWeight: '500', color: Colors.light, marginTop: wide * 0.02, marginHorizontal: wide * 0.05, alignSelf: 'center' }}>Congratulation Your answer is correct!</Text>

                                                        <TouchableOpacity
                                                            style={{ backgroundColor: '#246BFD', width: wide * 0.6, height: wide * 0.12, justifyContent: 'center', alignItems: 'center', borderRadius: wide * 0.6 / 2, marginTop: wide * 0.08 }}

                                                            onPress={() => { setSuccessAnswer(false) }}

                                                        >
                                                            <Text style={{ color: Colors.light, fontSize: 16, fontWeight: '800' }}>Ok!</Text>
                                                        </TouchableOpacity>


                                                    </View>





                                                </View>

                                                {/* {/ </BlurView> /} */}
                                            </TouchableOpacity>
                                        </Modal>
                                     







                             
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={wrongAnswer}
                                        >
                                            <TouchableOpacity
                                                onPress={() => setWrongAnswer(false)}
                                                style={{
                                                    width: wide,
                                                    height: high,
                                                    justifyContent: 'center', alignItems: 'center'
                                                }}
                                            >
                                                <BlurView style={{
                                                    width: wide,
                                                    height: high,
                                                    position: 'absolute',
                                                    // justifyContent: 'center', alignItems: 'center'
                                                }}
                                                    blurAmount={10}
                                                    blurRadius={10}
                                                />
                                                <View style={{
                                                    width: wide * 0.8, height: wide * 0.77, backgroundColor: Colors.ractangelCardColor,
                                                    marginTop: 20, borderRadius: 20, alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        width: '100%', marginTop: wide * 0.07,
                                                        alignItems: 'center', justifyContent: 'center',
                                                        // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                                                    }}>
                                                        <Image
                                                            source={require('../../Images/wrong.png')}
                                                        />
                                                        <Text style={{ fontStyle: 22, fontWeight: '700', color: Colors.light }}>Ohh Noo!!!</Text>
                                                        <Text style={{ fontStyle: 16, fontWeight: '500', color: Colors.light, marginTop: wide * 0.02, marginHorizontal: wide * 0.05, alignSelf: 'center' }}>Bad luck!! Congratulation Your answer is wrong Please try again.</Text>

                                                        <TouchableOpacity
                                                            style={{ backgroundColor: '#246BFD', width: wide * 0.6, height: wide * 0.12, justifyContent: 'center', alignItems: 'center', borderRadius: wide * 0.6 / 2, marginTop: wide * 0.08 }}

                                                            onPress={() => { setWrongAnswer(false) }}

                                                        >
                                                            <Text style={{ color: Colors.light, fontSize: 16, fontWeight: '800' }}>Ok!</Text>
                                                        </TouchableOpacity>


                                                    </View>





                                                </View>

                                                {/* {/ </BlurView> /} */}
                                            </TouchableOpacity>
                                        </Modal>
                                    



                                </View>

                            </KeyboardAvoidingView>
                        </View>
                        :
                        null
                    }
                </ScrollView>
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

export default connect(mapStateToProps)(PlayerAiDrivenQuestionChallenge);
