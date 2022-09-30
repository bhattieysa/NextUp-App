import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, Alert, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native'
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
  getDetailsForplayerSubmission, uploadVideo, getUserInfo, submitPlayerData
} from '../../actions/home';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import { getObject } from '../../middleware';
import { FlatList } from 'react-native-gesture-handler';

const CoachAiDrivenPlayerDetailsVideoSubmission = (props) => {

  const [loading, setLoading] = useState(false)
  const [player, setPlayer] = useState(true)
  const [notesLength, setNotesLength] = useState(0)
  const [notes, setNotes] = useState()
  const [APIData, setAPIData] = useState()
  const [challengeDetails, setChallengeDetails] = useState()
  const [videoData, setVideoData] = useState()
  const [videoURL, setVideoURL] = useState()
  const [coachName, setCoachName] = useState()
  const [coachPPU, setCoachPPU] = useState()
  const [previousResponse, setPreviousResponse] = useState()


  const name = props.navigation.state?.params?.name
  const teamId = props.navigation.state?.params?.teamId
  const challengeId = props.navigation.state?.params?.challengeId
  const typeOfChallenge = props.navigation.state?.params?.typeOfChallenge
  const typeOfSubscription = props.navigation.state?.params?.typeOfSubscription
  const submissionId = props.navigation.state?.params?.submissionId

  useEffect(() => {

    setLoading(true)
    {


      props.dispatch(getDetailsForplayerSubmission(submissionId, (result, response) => {
        setLoading(false)
        if (result) {

          setChallengeDetails(response.challenge)
          setAPIData(response)
          setPreviousResponse(response.playerChallengeSubmission.previousResponsesList)
          console.log("eysa", response)
          // setPlayerData(response.listPlayersForAssignedChallengeList)
        } else {
          console.error("error", result)
        }
      }))
    }

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


    setLoading(true)
    if (notes != null && notes != undefined) {
        var data = {
           
            "coachName": coachName,
            "coachProfilePictureUrl": coachPPU,
            "coachRemarks" : notes,
             "responseId": APIData.playerChallengeSubmission.previousResponsesList[0].id,
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
        <ScrollView bounces={false}>
          {challengeDetails != undefined && APIData != undefined ?
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
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.15 }}>
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
                                    </View> */}
                  </LinearGradient>

                </ImageBackground>
                <Text style={{
                  fontFamily: 'Metropolis',
                  fontWeight: '700',
                  fontSize: 32,
                  color: Colors.light,
                  marginTop: -wide * 0.15,
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




                {APIData.playerChallengeSubmission.submissionStatus == "COMPLETED" ?
                  <View
                    style={{
                      marginLeft: wide * 0.035, marginRight: wide * 0.035, marginTop: wide * 0.1
                    }}>



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
                      null
                    }

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



                    <View style={{
                      marginTop: wide * 0.1
                    }}>

                      <FlatList
                        data={previousResponse}


                        bounces={false}
                        keyExtractor={item => item.index}
                        renderItem={(item) =>
                          <View>
                            <ImageBackground source={{ uri: item.item.videoInfo.thumbnailUrl }}
                              style={{
                                width: "100%",
                                height: wide * 0.6,
                                borderRadius: wide * 0.03,
                                marginTop: wide * 0.06
                              }}
                            >

                              <LinearGradient colors={['rgba(39, 41, 48, 0)', 'rgba(24, 26, 32, 1)', '#181A20']}
                                start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.8 }}
                                style={{ flex: 1, borderRadius: wide * 0.03 }}
                              >

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.2 }}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      Navigation.navigate('VideoPlayer',
                                        { videoUrl: item.item.videoInfo.videoUrl })
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
                            <View style={{
                              backgroundColor: 'rgba(35, 38, 47, 1)',

                              width: '100%',
                              borderRadius: wide * 0.03,
                              justifyContent: 'center',
                              paddingVertical: wide * 0.04


                            }}>
                              <Text style={{ color: Colors.light, fontSize: 17, fontWeight: '700', marginLeft: wide * 0.05 }}>Note</Text>
                              <Text
                                style={{
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  marginHorizontal: wide * 0.05,
                                  marginTop: wide * 0.01

                                }}

                              >{item.item.playerRemarks}</Text>


                            </View>

                            {item.item.coachRemarks != null ?
                              <View>
                                <View style={{ flexDirection: 'row', marginTop: wide * 0.05 }}>

                                  <Image
                                    style={{
                                      width: wide * 0.09,
                                      height: wide * 0.09,
                                      borderRadius: wide * 0.09
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

                                <View style={{
                                  backgroundColor: 'rgba(35, 38, 47, 1)',

                                  width: wide * 0.83,
                                  borderRadius: wide * 0.03,
                                  justifyContent: 'center',
                                  paddingVertical: wide * 0.04,
                                  marginLeft: wide * 0.1,
                                  marginTop: wide * 0.04


                                }}>
                                  <Text style={{ color: Colors.light, fontSize: 17, fontWeight: '700', marginLeft: wide * 0.05 }}>Comment</Text>
                                  <Text
                                    style={{
                                      color: 'rgba(255, 255, 255, 0.7)',
                                      marginHorizontal: wide * 0.05,
                                      marginTop: wide * 0.01

                                    }}

                                  >{item.item.coachRemarks}</Text>


                                </View>

                              </View>
                              :
                              null

                            }


                            <View style={{

                              borderWidth: 0.7,
                              borderColor: 'rgba(255, 255, 255, 1)',
                              opacity: 0.2,
                              marginTop: wide * 0.06
                            }}></View>

                          </View>

                        }
                      />
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

                  <View style={{marginTop:wide*0.3}}>

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
              </KeyboardAvoidingView>
            </KeyBoardDismissHandler>
            :
            null}
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

export default connect(mapStateToProps)(CoachAiDrivenPlayerDetailsVideoSubmission);
