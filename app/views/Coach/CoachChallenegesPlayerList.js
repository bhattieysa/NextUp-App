import React, { Component, useState } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView,
    Image, key, KeyboardAvoidingView, FlatList, Alert, StyleSheet, ImageBackground, ActionSheetIOS, Modal,
    Keyboard, StatusBar
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
import { uploadChallengeVideoURL, getChallengeDataWithPlayerDtls } from '../../actions/home';
import { CoachChallenegeApproveData } from '../../constants/constant';
import { getObject } from '../../middleware';
import moment from 'moment';
import { Title } from '../../components/common/titleLabel';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';

let wide = Layout.width;

// let data = {
//     "createdAt": 1635146768502,
//     "updatedAt": 1635146768502,
//     "updatedBy": 0,
//     "propertyChanged": "New appInfo created",
//     "id": 163514676850202,
//     "creatorId": 163188828525507,
//     "trailerVideoUrl": {
//         "muxId": "",
//         "name": "",
//         "thumbnailUrl": "https://images.unsplash.com/photo-1499754162586-08f451261482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//         "videoUrl": "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4",
//         "addedAt": null,
//         "numberOfLikes": 0
//     },
//     "contentVideoUrl": {
//         "muxId": "",
//         "name": "",
//         "thumbnailUrl": "https://images.unsplash.com/photo-1499754162586-08f451261482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//         "videoUrl": "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4",
//         "addedAt": null,
//         "numberOfLikes": 0
//     },
//     "name": "Dribble Plans",
//     "description": "kdjwkjadjwdjkwakjdwajafkjwabkfjawkfbjkwabfkjabwkjfwjkfjawjfkawbfbawjbfbawdwadawdawdwakjbfwkajbfjkabwjfbaw",
//     "numberOfWeeks": 1,
//     "bookingCount": 2,
//     "price": "345",
//     "geoLocation": {
//         "name": "Loc",
//         "loc": {
//             "type": "Point",
//             "coordinates": [
//                 6565656.89,
//                 8989898.9
//             ]
//         }
//     },
//     "subscriptionLevelInfoList": [
//         {
//             "levelName": "First",
//             "levelDescription": null,
//             "challengeList": [
//                 {
//                     "createdAt": 0,
//                     "updatedAt": 0,
//                     "updatedBy": 0,
//                     "name": "Dribble Challenge",
//                     "trailerVideoUrl": {
//                         "muxId": "",
//                         "name": "",
//                         "thumbnailUrl": "https://images.unsplash.com/photo-1499754162586-08f451261482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//                         "videoUrl": "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4",
//                         "addedAt": null,
//                         "numberOfLikes": 0
//                     },
//                     "contentVideoUrl": {
//                         "muxId": "",
//                         "name": "",
//                         "thumbnailUrl": "https://images.unsplash.com/photo-1499754162586-08f451261482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
//                         "videoUrl": "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4",
//                         "addedAt": null,
//                         "numberOfLikes": 0
//                     },
//                     "description": "dljwakjdwakjdkjwankdjwajkdkjwadkjwakdjnawkjnkwjnfkjwkjfnwakjnfkjawnfkjawjfnakwjnfkjawnkfjnawj",
//                     "proTips": "dkwakjdwkjdkjwaadkjnawkdjaw"
//                 }
//             ]
//         }
//     ],
//     "roadToPro": false,
//     "active": true
// }

class CoachChallengesPlayerList extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            respSubmitLoad: false,
            selectedIndex: 0,
            rating: 2,
            isApproved: false,
            isAccepted: null,
            show: false,
            txtNotes: '',

            vidUrl: '',
            remark: '',
            notes: '',
            isPlayVideo: false,
            videoPath: '',
            datedAt: '',
            recentAttempData: [],
            playerList: [],
            challengeList: [],
            selectedPlayer: '',
            plainID: props.navigation.state.params !== undefined ? props.navigation.state.params.planId : null,
            isRecentAttempt: false,
            recentAttemptIndex: 0,
            videoThumbNail: '',

        };
    }

    componentDidMount() {
        console.log("Propsss--->> ", this.props)
        this.getRecentAttemp();
        // this.getRecentAttemp();
    }

    getRecentAttemp = () => {
        debugger
        if (this.state.plainID != null) {
            getObject('UserId').then((obj) => {
                this.setState({ loading: true }, () => {
                    this.props.dispatch(getChallengeDataWithPlayerDtls(obj, this.state.plainID, (res, data) => {
                        setTimeout(() => {
                            if (res) {
                                debugger

                                if (data.playerInfoForSubscriptionList !== null) {
                                    var id = data.playerInfoForSubscriptionList[0].playerId;
                                    var challenges = data.subscriptionsList;
                                    var selectedPlayerChallenge;
                                    challenges.forEach(element => {
                                        if (element.playerId == id) {
                                            selectedPlayerChallenge = element;
                                        }
                                    });
                                    this.setState({
                                        selectedPlayer: data.playerInfoForSubscriptionList[0].playerId,
                                        playerList: data.playerInfoForSubscriptionList,
                                        recentAttempData: selectedPlayerChallenge,
                                        challengeList: data.subscriptionsList,
                                        loading: false
                                    });
                                    this.checkForRecentAttempt();

                                }
                                // this.setState({ recentAttempData: data, loading: false })
                            }
                        }, 500);

                    }))
                })
            })
        }
    }

    checkForRecentAttempt = () => {
        const { recentAttempData } = this.state;
        debugger
        if (recentAttempData !== null) {
            debugger
            const prevRes = recentAttempData?.subscriptionLevelInfoList[0]?.challengeList[0]?.previousResponses;
            if (prevRes != undefined && prevRes.length > 0) {
                debugger
                prevRes.forEach((itm, index) => {
                    if (itm.accepted === null) {
                        this.setState({ isRecentAttempt: true, recentAttemptIndex: index });
                    }
                })
            } else {
                this.setState({ isRecentAttempt: false, recentAttemptIndex: 0 });
            }
        }
    }

    _renderVideo = (item) => {
        return (
            <View style={{ paddingBottom: 50, marginTop: wide * 0.02, justifyContent: 'center' }} >
                <FastImage style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                    width: '100%', height: wide * 0.4, borderRadius: wide * 0.015
                }}
                    source={{ uri: item.item.videoInfo.thumbnailUrl }}
                >
                </FastImage>
                <TouchableOpacity onPress={() => this.setState({
                    show: true,
                    vidUrl: item.item.videoInfo.videoUrl,
                    videoThumbNail: item.item.videoInfo.thumbnailUrl,
                    remark: item.item.playerRemarks,
                    notes: item.item.notes,
                    datedAt: moment(item.updatedAt).format('MMM DD, YYYY')
                })}>
                    <Image style={{
                        width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: wide * 0.09
                    }} source={require('../../Images/play_ico.png')} ></Image>
                </TouchableOpacity>
            </View>
        )

    }

    handleUserSelect = (item) => {
        // this.setState({ loading: true }, () => {
        var challenges = this.state.challengeList;
        var selectedPlayerChallenge;
        challenges.forEach(element => {
            if (element.playerId == item.item.playerId) {
                selectedPlayerChallenge = element;
            }
        });
        const prevRes = selectedPlayerChallenge?.subscriptionLevelInfoList[0]?.challengeList[0]?.previousResponses;
        if (prevRes != undefined && prevRes.length > 0) {
            debugger
            prevRes.forEach((itm, index) => {
                if (itm.accepted === null) {
                    this.setState({ isRecentAttempt: true, recentAttemptIndex: index });
                } else {
                    this.setState({ isRecentAttempt: false, recentAttemptIndex: index });
                }
            })
        } else {
            this.setState({ isRecentAttempt: false, recentAttemptIndex: 0 });
        }
        debugger
        this.setState({
            selectedPlayer: item.item.playerId,
            recentAttempData: selectedPlayerChallenge,
            selectedIndex: item.index,
            isApproved: false,
            isAccepted: null,
            // loading: false
        })


        // })        
    }

    _renderUserCat = (item, index) => {
        return (
            <TouchableOpacity style={{
                height: wide * 0.3,
                // justifyContent: 'center',
                alignItems: 'center',
                paddingRight: wide * 0.04,
                marginLeft: wide * 0.01
            }}
                activeOpacity={1}
                onPress={() => this.handleUserSelect(item)}
            >
                <View style={{ justifyContent: 'center', opacity: this.state.selectedIndex === item.index ? 1 : 0.5 }}>
                    {
                        this.state.selectedIndex == item.index ?
                            <Image style={{
                                position: 'absolute', width: 20, height: 20, backgroundColor: Colors.light,
                                borderRadius: (wide * 0.2) / 2, tintColor: Colors.btnBg, zIndex: 1, left: 50, top: 0
                            }}
                                // resizeMode={'contain'}
                                source={require('../../Images/tick.png')} />
                            : null
                    }
                    <View style={{
                        width: wide * 0.18, height: wide * 0.18,
                        borderRadius: (wide * 0.18) / 2, borderWidth: 3,
                        borderColor: Colors.newGrayFontColor,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image style={{ width: '100%', height: '100%', borderRadius: (wide * 0.18) / 2 }}
                            // resizeMode={'contain'}
                            source={{ uri: item.item.profilePicUrl }} />
                    </View>
                    <Text style={{
                        color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray,
                        fontSize: 14, lineHeight: 18,
                        fontFamily: Fonts.Bold, textAlign: 'center', top: 5
                    }}>{item.item.name}</Text>
                    <Text numberOfLines={2} style={{
                        color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray, fontSize: 12, lineHeight: 14,
                        fontFamily: Fonts.Regular, textAlign: 'center', top: 10, fontStyle: 'italic'

                    }}>#31/c</Text>


                </View>
                {/* <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View> */}



            </TouchableOpacity>
        );
    };

    handleSubmit = () => {
        const { recentAttempData } = this.state
        if (this.state.isAccepted !== null) {
            var prevRes = recentAttempData?.subscriptionLevelInfoList;
            var videoData = prevRes[0]?.challengeList[0].previousResponses[prevRes[0]?.challengeList[0].previousResponses.length - 1]
            var objVid = {
                "roadToPro": false,
                "levelIndex": recentAttempData.currentLevelState,
                "challengeIndex": recentAttempData.currentChallengeState,
                "responseIndex": 0,
                "addedBy": "COACH",
                "previousResponses": {
                    "accepted": this.state.isAccepted,
                    "playerRemarks": "Remarks",
                    "notes": this.state.txtNotes,
                    "coachRemarks": this.state.txtNotes,
                    "ratings": this.state.rating,
                    "updatedAt": Date.now(),
                    "addedAt": Date.now(),
                    "videoInfo": videoData.videoInfo
                }
            }
            this.setState({ respSubmitLoad: true }, () => {
                this.props.dispatch(uploadChallengeVideoURL(recentAttempData.id, objVid, (res) => {
                    if (res) {
                        this.setState({ respSubmitLoad: false }, () => {
                            setTimeout(() => {
                                Navigation.back()
                            }, 200);
                        })

                        // setTimeout(() => {

                        //     Alert.alert(
                        //         '',
                        //         'Your response  was sent', // <- this part is optional, you can pass an empty string
                        //         [
                        //             { text: 'OK', onPress: () => Navigation.back() },
                        //         ],
                        //         { cancelable: false },
                        //     );
                        // }, 1000)
                    }

                }))
            })


        } else {
            alert("Please add a response accepted or declined")
        }
        // this.setState({ txtNotes: '', isApproved: false })
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

    render() {
        debugger;
        const { recentAttempData, playerList } = this.state;
        let recentData = recentAttempData?.subscriptionLevelInfoList;
        // console.log('recentData--->>', recentAttempData);
        // return (
        //     // <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

        //     // </SafeAreaView>

        //     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

        //         {/* <View style={{ marginHorizontal: 32, }}>
        //             <TouchableOpacity onPress={() => Navigation.back()}>
        //                 <Image style={{
        //                     width: wide * 0.1, height: wide * 0.1,
        //                     marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
        //                 }} source={require('../../Images/back_ico.png')} />
        //             </TouchableOpacity>
        //         </View> */}
        //         {this.state.loading === false && recentAttempData !== undefined ?
        //             <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
        //                 <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        //                     marginHorizontal: 15,
        //                     minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
        //                     paddingBottom: isNotch ? 0 : 10
        //                 }}>
        //                     <View>
        //                         <View style={{
        //                             flexDirection: 'row',
        //                             justifyContent: 'space-between', zIndex: 99, 
        //                             marginHorizontal: 15
        //                         }}>
        //                             <TouchableOpacity onPress={() => Navigation.back()}>
        //                                 <Image style={
        //                                     styles.BackIcon
        //                                 }
        //                                     source={require('../../Images/back_ico.png')}
        //                                 />
        //                             </TouchableOpacity>
        //                             <TouchableOpacity >
        //                                 <Image style={
        //                                     {
        //                                         width: wide * 0.07, height: wide * 0.07,

        //                                         tintColor: 'white'
        //                                     }
        //                                 } source={require('../../Images/forward_ico.png')} />
        //                             </TouchableOpacity>
        //                         </View>
        //                         <Image style={{
        //                             position: 'absolute', top: 0, bottom: 0,
        //                             left: 0, right: 0, width: '100%', height: wide * 0.5
        //                         }} resizeMode={'stretch'}
        //                             source={require('../../Images/dummy1.png')} >

        //                         </Image>

        //                         <TouchableOpacity>
        //                             <Image style={{
        //                                 width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: wide * 0.03
        //                             }} source={require('../../Images/play_ico.png')} ></Image>
        //                         </TouchableOpacity>

        //                         <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        //                             <Text style={{
        //                                 color: Colors.white_08, fontSize: 32,
        //                                 fontFamily: Fonts.Regular, lineHeight: 40, marginLeft: 15,
        //                             }}>
        //                                 {recentAttempData?.subscriptionLevelInfoList[0]?.challengeList[0].name}
        //                             </Text>
        //                             {/* <Text style={{
        //                             color: Colors.light, fontSize: 32, lineHeight: 40, fontFamily: Fonts.Bold, marginLeft: 10,
        //                         }}>
        //                             Challenge
        //                         </Text> */}

        //                         </View>
        //                         <Text style={{
        //                             color: Colors.light,
        //                             fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
        //                             width: wide * 0.78, alignSelf: 'center',
        //                             textAlign: 'center', marginTop: wide * 0.01, opacity: 1
        //                         }} numberOfLines={2}>
        //                             {recentAttempData?.subscriptionLevelInfoList[0]?.challengeList[0].description}
        //                         </Text>
        //                         <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
        //                             <Image style={{
        //                                 position: 'absolute', width: "100%", height: 35, marginTop: wide * 0.05, top: 0, bottom: 0, left: 0, right: 0, borderRadius: wide * 0.01,
        //                             }} source={require('../../Images/Pro.png')} ></Image>
        //                             <Image style={{
        //                                 width: 20, height: 20, top: 27, marginLeft: wide * 0.08
        //                             }} source={require('../../Images/bulb.png')} ></Image>
        //                             <Text style={{
        //                                 color: Colors.light, fontSize: 14, lineHeight: 15,
        //                                 fontFamily: Fonts.SemiBold, marginTop: wide * 0.073, textAlign: 'center', fontStyle: 'italic'
        //                             }}>   Pro Tip:</Text>
        //                             <Text style={{
        //                                 color: Colors.light, fontSize: 13, lineHeight: 14, fontFamily: Fonts.Regular,
        //                                 marginTop: wide * 0.075, textAlign: 'center', fontStyle: 'italic'
        //                             }}>
        //                                 {recentData[0].challengeList[0].proTips}
        //                             </Text>
        //                         </View>
        //                         <View style={{ marginHorizontal: 15 }}>
        //                             {/* <View style={{
        //                                 backgroundColor: Colors.base, marginTop: wide * 0.1,
        //                                 marginHorizontal: 0
        //                             }}>
        //                                 <Text style={styles.mediumHeaderText}>
        //                                     Choose Player </Text>
        //                             </View>
        //                             <View >
        //                                 <FlatList
        //                                     // style={{ marginLeft: 15 }}
        //                                     data={[1, 2, 3, 4, 5, 6, 7, 8, 9,]}
        //                                     renderItem={(item, index) => this._renderUserCat(item, index)}
        //                                     showsHorizontalScrollIndicator={false}
        //                                     horizontal
        //                                     style={{ overflow: 'visible' }}
        //                                 />
        //                             </View> */}
        //                             <View style={{ marginTop: wide * 0.03 }}>
        //                                 <RecentCards
        //                                     action1={() => this.setState({ isApproved: true, isAccepted: true })}
        //                                     action={() => this.setState({ isApproved: true, isAccepted: false })}
        //                                     data={recentData[0]?.challengeList[0].previousResponses[recentData[0]?.challengeList[0].previousResponses.length - 1]}
        //                                     isApprove={this.state.isAccepted} />
        //                             </View>
        //                             {this.state.isApproved ? <View>

        //                                 <View style={{ flexDirection: 'row', marginTop: wide * 0.05 }}>
        //                                     <Text style={{
        //                                         color: Colors.light, fontSize: 20,
        //                                         lineHeight: 22, fontFamily: Fonts.Bold
        //                                     }}>
        //                                         Ratings  </Text>
        //                                     <View style={{ flex: 1 }} />
        //                                     <Text style={{
        //                                         color: Colors.light, fontSize: 15,
        //                                         lineHeight: 26, fontFamily: Fonts.SemiBold,
        //                                         fontStyle: 'italic',
        //                                     }}>
        //                                         {this.state.rating} Star  </Text>


        //                                 </View>



        //                                 <StarRating
        //                                     count={this.state.rating}
        //                                     changedCount={(e) => this.setState({ rating: e })} />


        //                                 <View style={{
        //                                     backgroundColor: Colors.base,
        //                                     marginTop: wide * 0.08, justifyContent: 'space-between'
        //                                 }}>
        //                                     <View style={{ flexDirection: 'row' }}>
        //                                         <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
        //                                             Notes  </Text>
        //                                         <View style={{ flex: 1 }} />
        //                                         <Text style={{
        //                                             color: Colors.light, fontSize: 15,
        //                                             lineHeight: 26, fontFamily: Fonts.SemiBold, fontStyle: 'italic'
        //                                         }}>
        //                                             {this.state.txtNotes.length}/260 </Text>
        //                                     </View>
        //                                     <View style={{
        //                                         backgroundColor: Colors.base,
        //                                         borderRadius: wide * 0.01, flexDirection: 'row', borderWidth: 3, borderColor: Colors.blackShade,
        //                                         justifyContent: 'center', alignItems: 'center',
        //                                         height: wide * 0.3, marginTop: wide * 0.03
        //                                     }}>
        //                                         <TextInput
        //                                             style={{
        //                                                 color: Colors.light, paddingRight: 15, width: '100%',
        //                                                 height: wide * 0.3, fontFamily: Fonts.SemiBold, paddingTop: 15,
        //                                                 paddingLeft: 15, lineHeight: 16,
        //                                             }}
        //                                             value={this.state.txtNotes}
        //                                             onChangeText={(val) => this.setState({ txtNotes: val })}
        //                                             maxLength={260}
        //                                             multiline
        //                                             textAlignVertical={'top'}
        //                                         />
        //                                     </View>

        //                                 </View>
        //                             </View> : <></>}

        //                             {!this.state.isApproved ?
        //                                 <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06 }}>
        //                                     {/* <View style={{ flexDirection: 'row' }}> */}
        //                                     <Text style={{ color: Colors.light, fontSize: 24, lineHeight: 26, fontFamily: Fonts.Bold }}>
        //                                         Previous Attempt ()   </Text>
        //                                     {/* </View> */}

        //                                 </View>
        //                                 : null
        //                             }
        //                             {!this.state.isApproved ?
        //                                 <FlatList
        //                                     style={{
        //                                         marginBottom: 15
        //                                     }}

        //                                     data={recentData[0]?.challengeList[0].previousResponses}
        //                                     renderItem={(item, index) => this._renderVideo(item)
        //                                     }
        //                                     showsHorizontalScrollIndicator={false}
        //                                     vertical />
        //                                 : null
        //                             }
        //                             {this.state.isApproved ? <TouchableOpacity
        //                                 // key={isbtnEnable}
        //                                 style={{
        //                                     width: wide * 0.8, height: 48,
        //                                     backgroundColor: Colors.btnBg,
        //                                     alignSelf: 'center', borderRadius: 24, opacity: 1,
        //                                     justifyContent: 'center', marginTop: wide * 0.025
        //                                 }}
        //                                 onPress={this.handleSubmit}
        //                             >
        //                                 <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Done</Text>
        //                             </TouchableOpacity> : <></>}


        //                         </View>
        //                     </View>

        //                 </ScrollView>
        //                 <Modal visible={this.state.show}>
        //                     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
        //                         <View style={{
        //                             flexDirection: 'row',
        //                             marginTop: wide * 0.1, zIndex: 99, position: 'absolute'
        //                         }}>
        //                             <TouchableOpacity onPress={() => this.setState({ show: false })}>
        //                                 <Image style={
        //                                     [styles.BackIcon, { marginTop: wide * 0.05, marginLeft: 15 }]
        //                                 }
        //                                     source={require('../../Images/back_ico.png')}
        //                                 />
        //                             </TouchableOpacity>

        //                         </View>
        //                         <VideoPlay
        //                             source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}

        //                             sty={{ height: wide * 0.6, width: wide, position: 'relative' }}
        //                         />
        //                         <View style={{
        //                             backgroundColor: Colors.base, marginHorizontal: 15,
        //                             justifyContent: 'space-between', marginTop: wide * 0.1
        //                         }}>
        //                             <View style={{ flexDirection: 'row' }}>
        //                                 <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
        //                                     Player Remark:  {this.state.remark}</Text>
        //                                 <View style={{ width: wide * 0.38 }} />
        //                                 <Text style={{ color: Colors.light, fontSize: 11, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
        //                                     Jan 13, 2021</Text>
        //                             </View>
        //                             {/* <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
        //                             </Text> */}
        //                             <View style={{ backgroundColor: Colors.grey, height: 0.5, width: wide * 0.9, top: 20 }} />

        //                             <View style={{ flexDirection: 'row', marginTop: 30 }}>
        //                                 <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
        //                                     Notes: {this.state.notes} </Text>
        //                             </View>
        //                             {/* <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
        //                             Improve your speed</Text> */}
        //                         </View>
        //                     </SafeAreaView>
        //                 </Modal>
        //             </KeyboardAvoidingView >

        //             : <AppLoader visible={this.state.loading} />
        //         }
        //     </SafeAreaView >
        // )
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                {this.state.loading === false && recentData !== undefined ?
                    <>
                        {/* <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}> */}
                        <ScrollView showsVerticalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={{
                                // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, 
                                paddingBottom: isNotch ? 0 : 10
                            }}>
                            <AppLoader visible={this.state.respSubmitLoad} />
                            <KeyboardAwareScrollView
                                showsVerticalScrollIndicator={false}
                                enableOnAndroid={true}
                                bounces={false}
                            >
                                <View>
                                    <TouchableOpacity
                                        style={{ marginBottom: wide * 0.03, }}
                                        onPress={() =>
                                            this.setState({ isPlayVideo: true })
                                        }
                                    >
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between', zIndex: 99,
                                            marginHorizontal: 24,

                                        }}>
                                            <TouchableOpacity style={{
                                                width: wide * 0.1,
                                                marginTop: 10
                                            }}
                                                onPress={() => Navigation.back()}
                                            >
                                                <Image style={
                                                    styles.BackIcon
                                                }

                                                    source={require('../../Images/back_ico.png')}
                                                />
                                            </TouchableOpacity>

                                        </View>
                                        <Image style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            left: 0, right: 0, width: '100%',
                                            height: wide * 0.5,
                                            // borderTopLeftRadius: 5, borderTopRightRadius: 5
                                        }} resizeMode={'stretch'} source={{ uri: recentData[0].challengeList[0].trailerVideoUrl?.thumbnailUrl }} >
                                        </Image>
                                        <Image style={{
                                            position: 'absolute', top: 0, bottom: 0,
                                            left: 0, right: 0, width: '100%', height: wide * 0.5
                                        }} resizeMode={'stretch'}
                                            source={require('../../Images/dummy1.png')} >

                                        </Image>

                                        <TouchableOpacity onPress={() =>
                                            this.setState({ isPlayVideo: true })
                                        }>
                                            <Image style={{
                                                width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: wide * 0.03
                                            }} source={require('../../Images/play_ico.png')} ></Image>
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                            <Text style={{
                                                color: Colors.white_08, fontSize: 32,
                                                fontFamily: Fonts.Regular, lineHeight: 40, marginLeft: 15,
                                            }}>
                                                {recentData[0].challengeList[0].name}
                                            </Text>

                                        </View>
                                        <Text style={{
                                            color: Colors.light,
                                            fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
                                            width: wide * 0.78, alignSelf: 'center',
                                            textAlign: 'center', marginTop: wide * 0.01, opacity: 1
                                        }} numberOfLines={2}>
                                            {recentData[0].challengeList[0].description}
                                        </Text>
                                    </TouchableOpacity>

                                    <View>
                                        <View style={{ marginTop: wide * 0.07, alignItems: 'center' }}>
                                            <Title data={'Choose Player'} />

                                            <View style={{
                                                alignItems: 'center', marginTop: 10, width: '100%',
                                            }}>
                                                <FlatList
                                                    style={{ width: '90%', overflow: 'visible' }}
                                                    data={playerList}
                                                    renderItem={(item, index) => this._renderUserCat(item, index)}
                                                    showsHorizontalScrollIndicator={false}
                                                    horizontal
                                                />
                                            </View>
                                            {this.state.isRecentAttempt ?
                                                <View style={{
                                                    marginTop: wide * 0.01,
                                                    width: '85%',
                                                }}>
                                                    <RecentCards
                                                        action1={() => this.setState({ isApproved: true, isAccepted: true })}
                                                        action={() => this.setState({ isApproved: true, isAccepted: false })}
                                                        data={recentData[0]?.challengeList[0].previousResponses[recentData[0]?.challengeList[0].previousResponses.length - 1]}
                                                        isApprove={this.state.isAccepted} />
                                                </View>
                                                : false
                                            }

                                        </View>

                                        {this.state.isApproved ?
                                            <View style={{ marginTop: wide * 0.07 }}>
                                                <View>
                                                    <Title data={'Ratings'} />
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                        width: '90%',
                                                        marginHorizontal: wide * 0.05
                                                    }}>
                                                        <Text style={{
                                                            color: Colors.light, fontSize: 12,
                                                            lineHeight: 20, fontFamily: Fonts.Bold,
                                                            fontStyle: 'italic',
                                                        }}>
                                                            {this.state.rating} Star
                                                        </Text>
                                                    </View>
                                                    <View style={{
                                                        marginTop: wide * 0.04,
                                                        marginBottom: 5,
                                                        marginHorizontal: wide * 0.01
                                                    }}>
                                                        <StarRating
                                                            count={this.state.rating}
                                                            changedCount={(e) => this.setState({ rating: e })}
                                                        />
                                                    </View>
                                                </View>

                                                <View style={{
                                                    marginTop: wide * 0.07,
                                                    justifyContent: 'space-between',
                                                    // backgroundColor: 'green',
                                                    alignItems: 'center',
                                                }}>
                                                    <Title data={'Notes'} />
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                        width: '85%',
                                                        marginHorizontal: wide * 0.06
                                                    }}>
                                                        {/* <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                                        Notes  </Text> */}
                                                        {/* <View style={{ flex: 1 }} /> */}
                                                        <Text style={{
                                                            color: Colors.light, fontSize: 12,
                                                            lineHeight: 20, fontFamily: Fonts.Bold,
                                                            fontStyle: 'italic'
                                                        }}>
                                                            {this.state.txtNotes.length}/260 </Text>
                                                    </View>
                                                    <View style={{
                                                        width: '85%',
                                                        // marginHorizontal: wide * 0.08,
                                                        borderRadius: wide * 0.01, flexDirection: 'row',
                                                        borderWidth: 2, borderColor: Colors.newGrayFontColor,
                                                        justifyContent: 'center', alignItems: 'center',
                                                        height: wide * 0.3, marginTop: wide * 0.02,
                                                        marginBottom: 5

                                                    }}>
                                                        <TextInput
                                                            style={{
                                                                color: Colors.light,
                                                                width: '100%',
                                                                height: wide * 0.3, fontFamily: Fonts.Regular,
                                                                fontSize: 16,
                                                                padding: 10, lineHeight: 18,
                                                            }}
                                                            value={this.state.txtNotes}
                                                            onChangeText={(val) => this.setState({ txtNotes: val })}
                                                            maxLength={260}
                                                            multiline
                                                            textAlignVertical={'top'}
                                                            returnKeyType='done'
                                                            onSubmitEditing={Keyboard.dismiss}
                                                        />
                                                    </View>

                                                </View>

                                                <TouchableOpacity
                                                    // key={isbtnEnable}
                                                    style={{
                                                        width: wide * 0.8, height: 48,
                                                        backgroundColor: Colors.btnBg,
                                                        alignSelf: 'center', borderRadius: 24, opacity: 1,
                                                        justifyContent: 'center', marginTop: wide * 0.06
                                                    }}
                                                    onPress={this.handleSubmit}
                                                >
                                                    <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Done</Text>
                                                </TouchableOpacity>
                                                {/* : <></>
                                            } */}
                                            </View>
                                            : <></>
                                        }

                                        {!this.state.isApproved ?
                                            recentData[0]?.challengeList[0].previousResponses !== undefined ?

                                                <View style={{ marginTop: wide * 0.07 }}>
                                                    {/* <View style={{ flexDirection: 'row' }}> */}
                                                    {/* <Text style={{ color: Colors.light, fontSize: 24, lineHeight: 26, fontFamily: Fonts.Bold }}>
                                                Previous Attempt ()   </Text> */}
                                                    <Title data={'Previous Attempt'} />
                                                    {/* </View> */}

                                                </View>
                                                : null
                                            : <></>
                                        }
                                        {!this.state.isApproved ?
                                            <FlatList
                                                bounces={false}
                                                style={{
                                                    marginBottom: 15,
                                                    // backgroundColor: 'green',
                                                    width: '90%',
                                                    marginHorizontal: 24
                                                }}

                                                data={recentData[0]?.challengeList[0].previousResponses}
                                                renderItem={(item, index) => this._renderVideo(item)
                                                }
                                                showsHorizontalScrollIndicator={false}
                                                vertical />
                                            : null
                                        }



                                    </View>
                                </View>
                            </KeyboardAwareScrollView>

                        </ScrollView>

                        {this.state.isPlayVideo ?
                            <Modal visible={this.state.isPlayVideo} animationType="slide"
                                supportedOrientations={['portrait', 'landscape']}
                            >
                                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                                    {/* <TouchableOpacity
                                        onPress={() => this.handleChallengeModelClose()}

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
                                        source={{ uri: recentData[0].challengeList[0].trailerVideoUrl?.videoUrl }}
                                        thumbnailUrl={recentData[0].challengeList[0].trailerVideoUrl?.thumbnailUrl}
                                        onBackPress={() => this.handleChallengeModelClose()}
                                    />

                                </SafeAreaView>
                            </Modal>
                            :
                            null
                        }

                        <Modal visible={this.state.show} animationType="slide" supportedOrientations={['portrait', 'landscape']}>
                            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                                {/* <View style={{
                                    flexDirection: 'row',
                                    marginTop: wide * 0.1, zIndex: 99, position: 'absolute'
                                }}>
                                    <TouchableOpacity onPress={() => this.setState({ show: false })}>
                                        <Image style={
                                            [styles.BackIcon, { marginTop: wide * 0.05, marginLeft: 15 }]
                                        }
                                            source={require('../../Images/back_ico.png')}
                                        />
                                    </TouchableOpacity>

                                </View> */}
                                {/* <VideoPlay
                                    source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
                                    sty={{ height: wide * 0.6, width: wide, position: 'relative' }}
                                /> */}
                                <VideoPlay
                                    source={{ uri: this.state.vidUrl }}
                                    thumbnailUrl={this.state.videoThumbNail}
                                    onBackPress={() => this.handlePrevModelClose()}
                                />
                                <View style={{
                                    // backgroundColor: 'green',
                                    justifyContent: 'space-between',
                                    marginTop: wide * 0.06

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
                                                    lineHeight: 16, fontFamily: Fonts.Bold
                                                }}>
                                                    {this.state.remark}
                                                </Text>
                                                {/* <Text style={{ color: Colors.light, fontSize: 11, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                            Jan 13, 2021</Text> */}
                                            </View>
                                        </View>
                                        : null
                                    }

                                    {/* <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    </Text> */}
                                    {/* <View style={{ backgroundColor: Colors.grey, height: 0.5, width: wide * 0.9, top: 20 }} /> */}
                                    {this.state.notes !== '' && this.state.notes !== null ?
                                        <View style={{ marginTop: wide * 0.07 }}>
                                            <Title data={'Coach Remarks'} />
                                            <View style={{
                                                width: '90%', marginHorizontal: wide * 0.08,
                                                marginTop: wide * 0.02,
                                            }}>
                                                <Text style={{
                                                    color: Colors.light, fontSize: 16, lineHeight: 16,
                                                    fontFamily: Fonts.Bold
                                                }}>
                                                    {this.state.notes}
                                                </Text>
                                            </View>

                                        </View>
                                        : null
                                    }

                                    {/* <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    Improve your speed</Text> */}
                                </View>
                            </SafeAreaView>
                        </Modal>
                    </>
                    //  </KeyboardAvoidingView > 

                    : <AppLoader visible={this.state.loading} />
                }
            </SafeAreaView >
        )
    }
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(CoachChallengesPlayerList);


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
export const RecentCards = ({ isApprove, action1, action, data }) => {
    const [videoData, setvideoData] = useState({
        vidUrl: '',
        remark: '',
        notes: '',
        isPlayVideo: false,
        videoPath: '',
        datedAt: '',
        show: false,
        videoThumbNail: '',
    })
    debugger
    console.log(data.isAccepted);

    const handleRecentModelClose = () => {
        Orientation.getOrientation((res) => {
            if (res == 'PORTRAIT') {
                setvideoData({ show: false })
            } else if (res == 'LANDSCAPE-LEFT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            } else if (res == 'LANDSCAPE-RIGHT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            }
        })
    }

    return (
        <ImageBackground style={{

            position: 'relative', marginTop: wide * 0.03, bottom: 0,
            left: 0, right: 0, width: '100%', justifyContent: 'center', paddingVertical: wide * 0.03
        }} resizeMode={'stretch'} source={require('../../Images/dummy2.png')} >
            <View style={{ flexDirection: 'row', width: '100%' }}>

                <View>
                    <Text style={{
                        color: Colors.light, fontSize: 23, lineHeight: 26,
                        fontFamily: Fonts.Bold, marginLeft: 20, marginTop: 8
                    }}>
                        Recent Attempt  </Text>
                    <View style={{ flexDirection: 'row', top: 5 }}>
                        <Text
                            numberOfLines={2}
                            style={{
                                color: Colors.light, fontSize: 15, lineHeight: 20,
                                fontFamily: Fonts.SemiBold, marginLeft: 20
                            }}>
                            Remark:
                            {data.playerRemarks}
                        </Text>
                        {/* <Text
                            numberOfLines={2}
                            style={{
                                color: Colors.light, fontSize: 15, lineHeight: 20,
                                width: wide * 0.3, fontFamily: Fonts.Regular,
                            }}>
                            I hope I did best Challenge </Text> */}

                    </View>
                    {/* <Text style={{
                        color: Colors.light, fontSize: 12, lineHeight: 20, marginTop: wide * 0.05
                        , fontFamily: Fonts.Regular, marginLeft: 20, fontStyle: 'italic'
                    }}>
                        OCT 29, 2021  </Text> */}

                </View>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                    onPress={() => {
                        setvideoData({
                            show: true,
                            vidUrl: data.videoInfo.videoUrl,
                            videoThumbNail: data.videoInfo.thumbnailUrl,
                            remark: data.notes,
                            remark: data.playerRemarks,
                            datedAt: data.videoInfo.addedAt,
                        })
                    }}
                >
                    <Image style={{
                        width: 80, height: 80, top: -5,
                    }} source={require('../../Images/play_ico.png')} ></Image>
                </TouchableOpacity>
                <Modal visible={videoData.show} animationType="slide" supportedOrientations={['portrait', 'landscape']}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                        {/* <TouchableOpacity
                            onPress={handleRecentModelClose}

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
                            source={{ uri: videoData.vidUrl }}
                            thumbnailUrl={videoData.thumbnailUrl}
                            onBackPress={handleRecentModelClose}
                        />
                        {/* <VideoPlay
                            source={{ uri: videoData.vidUrl }}

                            sty={{ height: wide * 0.6, width: wide, position: 'relative' }}
                        /> */}
                        <View style={{
                            backgroundColor: Colors.base, marginHorizontal: 15,
                            justifyContent: 'space-between', marginTop: wide * 0.1
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                    Player Remark:  {videoData.remark}</Text>
                                <View style={{ width: wide * 0.38 }} />
                                {/* <Text style={{ color: Colors.light, fontSize: 11, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    {moment(new Date(data.videoInfo.addedAt)).format('MMM')}  {moment(new Date(data.videoInfo.addedAt)).date()}  {moment(new Date(data.videoInfo.addedAt)).year()}
                                </Text> */}
                            </View>
                            <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                            </Text>
                            <View style={{ backgroundColor: Colors.grey, height: 0.5, width: wide * 0.9, top: 20 }} />

                            {/* <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                    Notes: {videoData.notes} </Text>
                            </View>
                            <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                Improve your speed</Text> */}
                        </View>
                    </SafeAreaView>
                </Modal>
            </View >
            {data.isAccepted ? <Text style={{
                color: Colors.light, fontSize: 20, lineHeight: 20, marginTop: 0
                , fontFamily: Fonts.Bold, alignSelf: 'flex-end', marginRight: 20
            }}>
                Approved  </Text> :

                isApprove ? <Text style={{
                    color: Colors.light, fontSize: 20, lineHeight: 20, marginTop: 0
                    , fontFamily: Fonts.Bold, alignSelf: 'flex-end', marginRight: 20
                }}>
                    Approved  </Text> : <></>
            }

            {!isApprove && isApprove !== null ? <Text style={{
                color: Colors.light, fontSize: 20, lineHeight: 20, marginTop: 0
                , fontFamily: Fonts.Bold, alignSelf: 'flex-end', marginRight: 20
            }}>
                Declined  </Text> : <></>}

            {data.isAccepted === true ? <></> :
                (isApprove === null ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wide * 0.02, marginHorizontal: 20 }}>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.light,
                            borderRadius: wide * 0.01, flexDirection: 'row', borderWidth: 2, borderColor: 'white',
                            justifyContent: 'center', alignItems: 'center', width: '48%', height: wide * 0.09
                        }}
                            onPress={action1}
                        >
                            <Text style={{
                                color: Colors.btnBg, fontSize: 15, fontFamily: Fonts.Regular,
                                lineHeight: 15, textAlign: 'center',
                            }} >Approve</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            // backgroundColor: Colors.base,
                            borderRadius: wide * 0.01, flexDirection: 'row', borderWidth: 2, borderColor: 'white',
                            justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '48%'
                            , height: wide * 0.09
                        }}
                            onPress={action}
                        >

                            <Text style={{
                                color: Colors.light, fontSize: 15, fontFamily: Fonts.SemiBold,
                                lineHeight: 15, textAlign: 'center',
                            }} >Decline</Text>
                        </TouchableOpacity>

                    </View>

                    : <></>)}




        </ImageBackground >
    )

}

const StarRating = ({ count, changedCount }) => {
    const [currCount, onChange] = useState(count)
    return <View style={{ flexDirection: 'row', justifyContent: 'space-around', bottom: 30 }}>
        {[1, 2, 3, 4, 5].map((item, index) => <TouchableOpacity style={{ marginTop: wide * 0.1 }} onPress={() => {

            onChange(index + 1);
            changedCount(index + 1)
        }}>
            <Image
                source={index < currCount ? require('../../Images/BallSelected.png') : require('../../Images/BallUnselect.png')}
                style={{ height: 30, width: 30, justifyContent: 'space-around' }}
            />
        </TouchableOpacity>)}
    </View>
}