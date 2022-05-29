
import React, { Component, useState } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView,
    Image, key, KeyboardAvoidingView, FlatList, StyleSheet, ImageBackground, ActionSheetIOS, Modal, Alert, StatusBar, Keyboard, Platform
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import VideoPlay from '../../components/common/VideoPlay';
import ImagePicker from 'react-native-image-crop-picker';
import CommonVideoComponent from '../Messages/videoView/commonVideoComponent';
import { uploadChallengeVideo, uploadChallengeVideoURL, getSubscriptionDetailsById } from '../../actions/home';
import { getObject } from '../../middleware';
import moment from 'moment';
import { Title } from '../../components/common/titleLabel';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Orientation from 'react-native-orientation-locker';

let wide = Layout.width;

class UploadVideoOfChallenge extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,
            rating: 2,
            isApproved: false,
            show: false,
            vidUrl: '',
            remark: '',
            notes: '',
            isPlayVideo: false,
            videoPath: null,
            datedAt: '',
            playerTxtNote: '',
            uploadedVideoData: null,
            isUploadVideoPlay: false,
            isBtnEnable: false,
            videoThumbNail: '',

            // challengePlanId: props.navigation.state.params !== undefined ? props.navigation.state.params.entityId : null,
        };
    }

    // componentDidMount() {
    //     this.getChallengeInfo()
    // }

    // getChallengeInfo = () => {
    //     this.setState({ loading: true }, () => {
    //         if (this.state.challengePlanId !== null) {
    //             this.props.dispatch(getSubscriptionDetailsById(this.state.challengePlanId, (res, data) => {
    //                 setTimeout(() => {
    //                     if (res) {
    //                         this.setState({ recentAttempData: data, loading: false })
    //                     }
    //                 }, 500);

    //             }))
    //         }

    //     })
    // }


    _renderVideo = ({ item }) => {
        debugger;
        console.log("Prev-->", item)
        return (
            <View style={{
                justifyContent: 'center',
                height: wide * 0.4,
                marginTop: wide * 0.05,
                borderRadius: wide * 0.015
            }} >
                <FastImage style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                    width: '100%', height: wide * 0.4, borderRadius: wide * 0.015
                }}
                    // source={{ uri: item.videoResponse.thumbnailUrl }} 
                    source={{
                        uri: item.videoInfo.thumbnailUrl,
                        priority: FastImage.priority.high,
                    }}
                />

                {/* </Image> */}
                <TouchableOpacity onPress={() => this.setState({
                    show: true,
                    vidUrl: item.videoInfo.videoUrl,
                    videoThumbNail: item.videoInfo.thumbnailUrl,
                    remark: item.playerRemarks,
                    notes: item.notes, datedAt: moment(item.updatedAt).format('MMM DD, YYYY')
                })}>
                    <Image style={{
                        width: 80, height: 80, alignContent: 'center',
                        justifyContent: 'center', alignSelf: 'center',
                    }} source={require('../../Images/play_ico.png')} ></Image>
                </TouchableOpacity>
            </View>


        )
    }
    pickSingle() {
        Alert.alert(
            "Video",
            'Pick from',
            [
                {
                    text: 'Gallery',
                    onPress: () => {
                        ImagePicker.openPicker({

                            //cropping: cropit,
                            compressImageQuality: 0.8,
                            compressVideoPreset: 'MediumQuality',
                            includeExif: true,
                            // cropperStatusBarColor: 'white',
                            // cropperToolbarColor: 'white',
                            // cropperActiveWidgetColor: 'white',
                            // cropperToolbarWidgetColor: '#3498DB',
                            mediaType: "video",
                            smartAlbums: ['Videos', 'SlomoVideos']
                        })
                            .then((image) => {
                                // console.log('received image', image);

                                this.setState({ videoPath: image.path }, () => {
                                    this._uploadSelectedVideo();
                                })

                                // this.sendAttempt(image.path)
                                // 

                            })
                            .catch((e) => {
                                console.log(e);
                                // Alert.alert(e.message ? e.message : e);
                            });
                    }
                },
                {
                    text: 'Camera', onPress: () => {
                        ImagePicker.openCamera({
                            // width: 300,
                            // height: 400,
                            //cropping: true,
                            mediaType: "video"
                        }).then(image => {

                            this.setState({ videoPath: image.path }, () => {
                                this._uploadSelectedVideo();
                            })
                            // this.sendAttempt(image.path)


                        });
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );

    }

    _uploadSelectedVideo = () => {
        if (this, this.state.videoPath !== null) {
            getObject('UserId').then((userId) => {
                this.setState({ loading: true }, () => {
                    this.props.dispatch(uploadChallengeVideo(userId, this.state.videoPath, (res, resData) => {
                        if (res) {
                            console.log('Video Data:---', resData)
                            this.setState({ uploadedVideoData: resData, loading: false, isBtnEnable: true });
                        }
                    }))
                })
            })
        }
    }

    sendAttempt = () => {
        const { roadToProData } = this.props.Home
        const { challengeData, isUpload, planId, roadToPro, levelIndex, challengeIndex } = this.props.navigation.state.params;
        const roadToProPlanId = planId !== undefined && planId !== null ? planId : roadToProData.id;
        debugger;
        if (this, this.state.uploadedVideoData !== null) {
            // getObject('UserId').then((userId) => {
            // this.setState({ loading: true }, () => {
            // this.props.dispatch(uploadChallengeVideo(userId, this.state.videoPath, (res, resData) => {
            // if (res) {
            var objVid = {
                "roadToPro": roadToPro !== undefined && roadToPro !== null ? roadToPro : true,
                "levelIndex": levelIndex !== undefined && levelIndex !== null ? levelIndex : roadToProData.currentLevelState,
                "challengeIndex": challengeIndex !== undefined && challengeIndex !== null ? challengeIndex : roadToProData.currentChallengeState,
                "responseIndex": 0,
                "addedBy": "PLAYER",
                "previousResponses": {
                    "playerRemarks": this.state.playerTxtNote,
                    "addedAt": Date.now(),
                    "playerProfileUrl": "",
                    "playerName": "",
                    "videoInfo": this.state.uploadedVideoData
                }
            }
            console.log("----PlayerUpload", objVid);
            debugger;
            this.setState({ loading: true }, () => {
                this.props.dispatch(uploadChallengeVideoURL(roadToProPlanId, objVid, (res) => {
                    // this.setState({ loading: false }, () => {
                    if (res) {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                Navigation.back();

                            }, 200)
                        })
                        // debugger;
                        // setTimeout(() => {
                        //     Alert.alert(
                        //         '',
                        //         'Your attempt was sent', // <- this part is optional, you can pass an empty string
                        //         [
                        //             { text: 'OK', onPress: () => Navigation.back() },
                        //         ],
                        //         { cancelable: false },
                        //     );
                        // }, 500)
                    } else {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                showErrorAlert('Something went wrong!')
                            }, 500);
                        })

                    }
                    // }, 0.5)

                }))
            })

            // }

            // }))
            // })
            // })

        } else {
            alert('Please upload a video to submit.')
        }

    }

    handlePrevModelClose = () => {
        Orientation.getOrientation((res) => {
            if (res == 'PORTRAIT') {
                this.setState({ show: false })
            } else if (res == 'LANDSCAPE-LEFT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            } else if (res == 'LANDSCAPE-RIGHT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            }
        })
    }

    handleChallengeModelClose = () => {
        Orientation.getOrientation((res) => {
            if (res == 'PORTRAIT') {
                this.setState({ isPlayVideo: false })
            } else if (res == 'LANDSCAPE-LEFT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            } else if (res == 'LANDSCAPE-RIGHT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            }
        })
    }

    handleUploadeModelClose = () => {
        Orientation.getOrientation((res) => {
            if (res == 'PORTRAIT') {
                this.setState({ isUploadVideoPlay: false })
            } else if (res == 'LANDSCAPE-LEFT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            } else if (res == 'LANDSCAPE-RIGHT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            }
        })
    }

    render() {
        const { challengeData, isUpload } = this.props.navigation.state.params;
        const { playerTxtNote, isBtnEnable } = this.state;
        console.log('challeng__Dataaa---', challengeData)
        return (
            <KeyBoardDismissHandler>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                    {/* <AppStatusBar color={'transparent'} /> */}
                    {/* <StatusBar translucent backgroundColor='transparent' /> */}
                    {/* <View style={{ marginHorizontal: 32, }}>
                    <TouchableOpacity onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                </View> */}


                    <ScrollView showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                            // marginHorizontal: 15,
                            // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                            paddingBottom: 10
                        }}>
                        {/* <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}> */}
                        {/* <StatusBar backgroundColor='transparent' /> */}
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={false}
                            enableOnAndroid={true}
                            bounces={false}
                        >
                            <View>
                                <TouchableOpacity
                                    style={{ marginBottom: wide * 0.03, }}
                                    onPress={() => this.setState({ isPlayVideo: true })}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between', zIndex: 99,
                                        marginHorizontal: 15, marginTop: 10
                                    }}>
                                        <TouchableOpacity onPress={() => Navigation.back()}>
                                            <Image style={
                                                styles.BackIcon
                                            }
                                                source={require('../../Images/back_ico.png')}
                                            />
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity >
                                        <Image style={
                                            {
                                                width: wide * 0.07, height: wide * 0.07,

                                                tintColor: 'white'
                                            }
                                        } source={require('../../Images/forward_ico.png')} />
                                    </TouchableOpacity> */}
                                    </View>

                                    <Image style={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        left: 0, right: 0, width: '100%',
                                        height: wide * 0.6,
                                        // borderTopLeftRadius: 5, borderTopRightRadius: 5
                                    }} resizeMode={'stretch'} source={{ uri: challengeData?.trailerVideoUrl?.thumbnailUrl }} >
                                    </Image>

                                    <Image style={{
                                        position: 'absolute', top: 0, bottom: 0,
                                        left: 0, right: 0, width: '100%', height: wide * 0.6
                                    }} resizeMode={'stretch'} source={require('../../Images/Rect_dummy.png')} >

                                    </Image>

                                    <Image style={{
                                        width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: wide * 0.03
                                    }} source={require('../../Images/play_ico.png')} ></Image>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        {/* <Text style={{
                                    color: Colors.white_08, fontSize: 32,
                                    fontFamily: Fonts.Regular, lineHeight: 40, marginLeft: 15,
                                }}>
                                    Dribble
                                </Text> */}
                                        <Text style={{
                                            color: Colors.light, fontSize: 32, lineHeight: 40, fontFamily: Fonts.Bold, marginLeft: 10,
                                        }}>
                                            {challengeData.name}
                                        </Text>

                                    </View>
                                    <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.Regular, fontSize: 12, lineHeight: 16,
                                        width: wide * 0.78, alignSelf: 'center',
                                        textAlign: 'center', marginTop: wide * 0.01, opacity: 1
                                    }}>{challengeData.description}</Text>
                                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                                    <Image style={{
                                        position: 'absolute', width: "100%", height: 35, marginTop: wide * 0.05, top: 0, bottom: 0, left: 0, right: 0, borderRadius: wide * 0.01,
                                    }} source={require('../../Images/Pro.png')} ></Image>
                                    <Image style={{
                                        width: 20, height: 20, top: 27, marginLeft: wide * 0.08
                                    }} source={require('../../Images/bulb.png')} ></Image>
                                    <Text style={{
                                        color: Colors.light, fontSize: 14, lineHeight: 15,
                                        fontFamily: Fonts.SemiBold, marginTop: wide * 0.073, textAlign: 'center', fontStyle: 'italic'
                                    }}>   Pro Tip:</Text>
                                    <Text style={{
                                        color: Colors.light, fontSize: 13, lineHeight: 14, fontFamily: Fonts.Regular,
                                        marginTop: wide * 0.075, textAlign: 'center', fontStyle: 'italic'
                                    }}>{challengeData.proTips}</Text>
                                </View> */}
                                </TouchableOpacity>
                                {isUpload ?
                                    // <KeyboardAwareScrollView
                                    //     showsVerticalScrollIndicator={false}
                                    //     enableOnAndroid={true}
                                    // >
                                    <>
                                        <View style={{ marginTop: wide * 0.1, }}>
                                            <Title data={'Response'} />
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            {this.state.uploadedVideoData === null ?
                                                <TouchableOpacity
                                                    onPress={() => this.pickSingle()}
                                                    activeOpacity={1}
                                                    style={{
                                                        width: '85%', height: wide * 0.4,
                                                        marginTop: 10, borderRadius: wide * 0.01, borderWidth: 2,
                                                        borderColor: Colors.newGrayFontColor,
                                                        justifyContent: 'center', alignItems: 'center',

                                                    }}>

                                                    <Image
                                                        style={{ width: 30, height: 30 }}
                                                        source={require('../../Images/AddTeamIcon.png')}
                                                    />

                                                    <Text style={{
                                                        color: Colors.newGrayFontColor,
                                                        fontSize: 12, lineHeight: 16, fontFamily: Fonts.Bold,
                                                        textAlign: 'center', marginLeft: 5, marginTop: 10

                                                    }}>Upload Video</Text>

                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    onPress={() => this.setState({ isUploadVideoPlay: true })}
                                                    activeOpacity={1}
                                                    style={{
                                                        width: '85%', height: wide * 0.4,
                                                        marginTop: 10, borderRadius: wide * 0.01, borderWidth: 2,
                                                        borderColor: Colors.newGrayFontColor,
                                                        justifyContent: 'center', alignItems: 'center'
                                                    }}>
                                                    <FastImage
                                                        style={{
                                                            position: 'absolute',
                                                            width: '100%', height: wide * 0.39,
                                                        }}
                                                        resizeMode={'stretch'}
                                                        source={{ uri: this.state.uploadedVideoData.thumbnailUrl }}
                                                    />
                                                    <Image style={{
                                                        width: 80, height: 80, alignContent: 'center',
                                                        justifyContent: 'center', alignSelf: 'center',
                                                        marginTop: wide * 0.03
                                                    }} source={require('../../Images/play_ico.png')} >

                                                    </Image>

                                                </TouchableOpacity>
                                            }

                                            <View style={{ width: '85%', alignItems: 'center', marginTop: 25 }}>
                                                <View style={{
                                                    width: '100%', flexDirection: "row",
                                                    justifyContent: 'flex-end'
                                                }}>
                                                    <Text style={{
                                                        fontFamily: Fonts.Bold,
                                                        color: Colors.light, fontSize: 12,
                                                        // marginRight: 5

                                                    }}>{playerTxtNote.trim().length}/266</Text>
                                                </View>


                                                <TextInput
                                                    //valid={() => isValidEmail(email)}
                                                    // errorText="Error"
                                                    onChangeText={(e) => this.setState({ playerTxtNote: e })}
                                                    value={playerTxtNote}
                                                    style={{
                                                        marginTop: 5,
                                                        fontFamily: Fonts.Regular, color: Colors.light,
                                                        fontSize: 16,
                                                        width: '100%',
                                                        lineHeight: 18, height: wide * 0.2,
                                                        borderWidth: 1.5,
                                                        borderColor: Colors.newGrayFontColor,
                                                        padding: 10,
                                                        textAlignVertical: 'top',
                                                    }}

                                                    placeholder={'Add Your Remark Here...'}
                                                    placeholderTextColor={Colors.newGrayFontColor}
                                                    multiline
                                                    maxLength={266}
                                                    returnKeyType='done'
                                                    onSubmitEditing={Keyboard.dismiss}
                                                />
                                            </View>
                                            <TouchableOpacity
                                                key={isBtnEnable}
                                                style={{
                                                    width: wide * 0.8, height: 48,
                                                    backgroundColor: Colors.btnBg,
                                                    alignSelf: 'center', borderRadius: 24,
                                                    justifyContent: 'center',
                                                    marginTop: 30,
                                                    opacity: isBtnEnable === false ? 0.3 : 1.0,
                                                }}
                                                onPress={() => this.sendAttempt()}
                                            >
                                                <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Submit</Text>
                                            </TouchableOpacity>


                                        </View>
                                    </>

                                    // </KeyboardAwareScrollView>

                                    :
                                    <></>
                                }
                                {challengeData.previousResponses !== null && challengeData?.previousResponses?.length > 0 ?
                                    <>

                                        <View style={{ marginTop: wide * 0.1 }}>
                                            <Title data={'Previous Attempt'} />
                                        </View>

                                        {/* <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.16 }}>
                                             <Text style={{ color: Colors.light, fontSize: 24, lineHeight: 26, fontFamily: Fonts.Bold }}>
                                                 Previous Attempt ({challengeData.previousResponses?.length})   </Text>

                                         </View> */}


                                        <FlatList
                                            bounces={false}
                                            style={{
                                                marginBottom: 15,
                                                // backgroundColor: 'green',
                                                width: '90%',
                                                marginHorizontal: 24,

                                            }}
                                            data={challengeData.previousResponses}
                                            renderItem={(item, index) => this._renderVideo(item)
                                            }
                                            // showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            vertical
                                        />
                                    </>
                                    : null
                                }



                                {/* {this.state.isApproved ? <TouchableOpacity
                                // key={isbtnEnable}
                                style={{
                                    width: wide * 0.8, height: 48,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 24, opacity: 1,
                                    justifyContent: 'center', bottom: 0,
                                }}>
                                <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Done</Text>
                            </TouchableOpacity> : <></>} */}


                            </View>
                        </KeyboardAwareScrollView>
                        {/* </KeyboardAvoidingView> */}

                    </ScrollView>
                    {this.state.isPlayVideo ?
                        <Modal visible={this.state.isPlayVideo} animationType="slide"
                            supportedOrientations={['portrait', 'landscape']}
                        >
                            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>


                                <VideoPlay
                                    source={{ uri: challengeData?.trailerVideoUrl?.videoUrl }}
                                    thumbnailUrl={challengeData?.trailerVideoUrl?.thumbnailUrl}
                                    onBackPress={() => this.handleChallengeModelClose()}
                                />

                            </SafeAreaView>
                        </Modal>

                        :
                        null
                    }
                    {this.state.isUploadVideoPlay ?
                        <Modal visible={this.state.isUploadVideoPlay} animationType="slide" supportedOrientations={['portrait', 'landscape']}>
                            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                                {/* <TouchableOpacity
                                    onPress={() => this.handleUploadeModelClose()}

                                    style={{
                                        // flexDirection: 'row',
                                        // marginTop: Platform.OS == 'ios' ? wide * 0.07 : wide * 0.02,
                                        top: Platform.OS == 'ios' ? isNotch ? 50 : 8 : 10,
                                        zIndex: 1, position: 'absolute',

                                        width: wide * 0.12, height: wide * 0.1,
                                        marginLeft: 10,
                                        alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <Image style={{
                                        width: wide * 0.09, height: wide * 0.09,
                                        borderRadius: wide * 0.03, borderWidth: 1,
                                        borderColor: Colors.borderColor,
                                        backgroundColor: Colors.base,

                                    }}
                                        source={require('../../Images/back_ico.png')}
                                    />
                                </TouchableOpacity> */}

                                <VideoPlay
                                    source={{ uri: this.state.uploadedVideoData?.videoUrl }}
                                    thumbnailUrl={this.state.uploadedVideoData?.thumbnailUrl}
                                    onBackPress={() => this.handleUploadeModelClose()}
                                />

                            </SafeAreaView>
                        </Modal>

                        :
                        null
                    }
                    <Modal visible={this.state.show} animationType="slide" supportedOrientations={['portrait', 'landscape']}>
                        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                            {/* <TouchableOpacity
                                onPress={() => this.handlePrevModelClose()}

                                style={{
                                    // flexDirection: 'row',
                                    // marginTop: Platform.OS == 'ios' ? wide * 0.07 : wide * 0.02,
                                    top: Platform.OS == 'ios' ? isNotch ? 50 : 8 : 10,
                                    zIndex: 1, position: 'absolute',

                                    width: wide * 0.12, height: wide * 0.1,
                                    marginLeft: 10,
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <Image style={{
                                    width: wide * 0.09, height: wide * 0.09,
                                    borderRadius: wide * 0.03, borderWidth: 1,
                                    borderColor: Colors.borderColor,
                                    backgroundColor: Colors.base,

                                }}
                                    source={require('../../Images/back_ico.png')}
                                />
                            </TouchableOpacity> */}

                            <VideoPlay
                                source={{ uri: this.state.vidUrl }}
                                thumbnailUrl={this.state.videoThumbNail}
                                onBackPress={() => this.handlePrevModelClose()}
                            />
                            <View style={{
                                justifyContent: 'space-between', marginTop: wide * 0.06
                            }}>
                                {this.state.remark !== '' && this.state.remark !== null ?
                                    <View style={{ marginTop: wide * 0.01 }}>
                                        <Title data={'Player Remarks'} />
                                        <View style={{
                                            width: '90%', marginHorizontal: wide * 0.08,
                                            marginTop: wide * 0.02,
                                        }}>
                                            <Text style={{
                                                color: Colors.light, fontSize: 14,
                                                lineHeight: 16, fontFamily: Fonts.Bold,
                                            }}>
                                                {this.state.remark}
                                            </Text>
                                        </View>
                                    </View>
                                    : null
                                }
                                {this.state.notes !== '' && this.state.notes !== null ?
                                    <View style={{ marginTop: wide * 0.07 }}>
                                        <Title data={'Coach Remarks'} />
                                        <View style={{
                                            width: '90%', marginHorizontal: wide * 0.08,
                                            marginTop: wide * 0.02,
                                        }}>
                                            <Text style={{
                                                color: Colors.light, fontSize: 14, lineHeight: 16,
                                                fontFamily: Fonts.Bold,
                                            }}>
                                                {this.state.notes}
                                            </Text>
                                        </View>

                                    </View>
                                    : null
                                }

                                {/* <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                            Player Remark:  </Text>
                                        <View style={{ width: wide * 0.38 }} />
                                        <Text style={{ color: Colors.light, fontSize: 11, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                            {this.state.datedAt}</Text>
                                    </View>
                                    <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                        {this.state.remark}</Text>
                                    <View style={{ backgroundColor: Colors.grey, height: 0.5, width: wide * 0.9, top: 20 }} />

                                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                        <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                            Notes:  </Text>
                                    </View>
                                    <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                        {this.state.notes}</Text>

                                         */}
                            </View>
                        </SafeAreaView>
                    </Modal>
                    <AppLoader visible={this.state.loading} />

                </SafeAreaView >
            </KeyBoardDismissHandler>
        )
    }
}

const styles = StyleSheet.create({
    BackIcon: {
        width: wide * 0.09, height: wide * 0.09,
        borderRadius: wide * 0.03, borderWidth: 1,
        borderColor: Colors.borderColor,
    },
    mediumHeaderText: {

        color: Colors.light, fontSize: 23, lineHeight: 26, fontFamily: Fonts.SemiBold

    },
})



function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(UploadVideoOfChallenge);