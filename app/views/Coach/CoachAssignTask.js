
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, Modal, FlatList, StyleSheet, Alert } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
    CommonStyles
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { isNotch } from '../../utils/deviceInfo';
import moment from 'moment'
import VideoPlay from '../../components/common/VideoPlay';
import CommonVideoComponent from '../Messages/videoView/commonVideoComponent';
import { getObject } from '../../middleware';
import { getChallengeListForCoach, createSubscriptionForId, createSubscriptionForMultiplePlayer } from '../../actions/home';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { NoDataLabel } from '../../components/common/label'

let wide = Layout.width;
class CoachAssignTask extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            selectedIndex: 0,
            rating: 2,
            isApproved: false,
            show: false,
            txtNotes: '',
            vidUrl: '',
            // remark: '',
            // notes: '',
            // isPlayVideo: false,
            // videoPath: '',
            challengeTitle: '',
            challenge_descp: '',
            challenge_tips: '',
            planId: '',
            datedAt: '',
            challenge_price: '',
            challengeList: [],
            selectedChallengeIndx: null,  //[]
            // selectedChallenge: [],
            playerId: props.navigation.state.params !== undefined ? props.navigation.state.params.playerId : null,
            isBtnActive: false,
        };

    }
    componentDidMount() {
        this.getChallenges();
    }

    getChallenges = () => {
        getObject('UserId').then((userId) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(getChallengeListForCoach(userId, (res, resData) => {
                    if (res) {
                        debugger;
                        this.setState({ challengeList: resData, loading: false })
                    }
                }))
            })
        })
    }

    _handleChallengeSelect = (item, index) => {
        // const { selectedChallenge, selectedChallengeIndx } = this.state;
        // var indxArr = [];
        // var challengeArr = [];
        // if (selectedChallengeIndx.length > 0) {
        //     indxArr = selectedChallengeIndx;
        //     challengeArr = selectedChallenge;
        //     if (indxArr.includes(index)) {
        //         indxArr = indxArr.filter((obj) => {
        //             return obj !== index;
        //         });
        //         challengeArr = challengeArr.filter((obj) => {
        //             return obj !== item.item.id;
        //         });
        //     } else {
        //         indxArr.push(index);
        //         challengeArr.push(item.item.id)
        //     }
        // } else {
        // indxArr.push(index);
        // challengeArr.push(item.item.id);
        // }
        this.setState({
            selectedChallengeIndx: index,
            planId: item.item.id,
            challenge_price: item.item.price,
            datedAt: moment(item.item.updatedAt).format('MMM DD, YYYY'),
            isBtnActive: true,
        });

    }

    _renderPlans = (item, index) => {
        debugger;
        const data = item.item?.subscriptionLevelInfoList[0]?.challengeList[0];
        // console.log("Item 1---->> ", item.index)
        return (
            //new Card
            <TouchableOpacity
                style={[{
                    // margin: 15,
                    width: '100%',
                    height: 80,
                    marginTop: wide * 0.05,
                    justifyContent: 'center'
                },
                item.item.active === true ?
                    {
                        borderWidth: 2, borderColor: Colors.stars, borderRadius: 5
                    }
                    : {
                        borderWidth: 2, borderColor: Colors.statDropColor2, borderRadius: 5
                    }
                ]}
                onPress={() =>
                    this._handleChallengeSelect(item, item.index)
                    //     this.setState({
                    //     // show: true,
                    //     // vidUrl: data.contentVideoUrl.videoUrl,
                    //     // challengeTitle: data.name,
                    //     // challenge_descp: data.description,
                    //     // challenge_tips: data.proTips,
                    //     planId: item.item.id,
                    //     challenge_price: item.item.price,
                    //     datedAt: moment(item.item.updatedAt).format('MMM DD, YYYY')
                    // })
                }
                activeOpacity={1}
            >
                <Image style={{
                    position: 'absolute',
                    width: '100%', height: "100%", borderRadius: 10
                }}
                    resizeMode={'stretch'}
                    // source={require('../../Images/dummy1.png')}
                    source={{ uri: data?.trailerVideoUrl?.thumbnailUrl }}
                >

                </Image>
                <Image style={{
                    position: 'absolute', width: '100%', height: '100%', borderRadius: 10
                }}
                    resizeMode={"stretch"}
                    source={require('../../Images/Rect_dummy.png')} >

                </Image>

                {/* <Image style={{
                    width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center',
                }} source={require('../../Images/play_ico.png')} >
                </Image> */}

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text style={{
                        color: Colors.light, fontSize: 16, lineHeight: 20,
                        fontFamily: Fonts.Bold, marginLeft: 10,
                    }}>
                        {data.name}
                    </Text>

                    <TouchableOpacity style={{
                        width: 30, height: 30, borderRadius: 30 / 2,
                        backgroundColor: this.state.selectedChallengeIndx === item.index ? Colors.btnBg : Colors.teamTabSelectedCheckBg,
                        right: 30,
                        justifyContent: 'center', alignItems: 'center'
                    }}
                        onPress={() => this._handleChallengeSelect(item, item.index)}
                        activeOpacity={1}
                    >
                        <Image
                            source={require("../../Images/check_Icon.png")}
                            style={{
                                width: wide * 0.04, height: wide * 0.04,
                                tintColor: this.state.selectedChallengeIndx === item.index ? Colors.light : Colors.teamTabPlayerCardBorder,
                            }}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>

                </View>
                {/* <Text style={{
                    color: Colors.light,
                    fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
                    width: wide * 0.78, alignSelf: 'center',
                    textAlign: 'center', opacity: 1,
                }} numberOfLines={2} >
                    {data.description}
                </Text> */}

                {/* <View style={{ flexDirection: 'row', marginTop: wide * 0.01 }}>
                    <Image style={{
                        position: 'absolute', width: "100%", height: wide * 0.1, borderRadius: wide * 0.01,
                    }} source={require('../../Images/Pro.png')} ></Image>
                    <Image style={{
                        width: 20, height: 20, marginLeft: wide * 0.08, marginTop: wide * 0.02
                    }} source={require('../../Images/bulb.png')} ></Image>
                    <Text style={{
                        color: Colors.light, fontSize: 14, lineHeight: 15,
                        fontFamily: Fonts.SemiBold, marginTop: wide * 0.03, textAlign: 'center', fontStyle: 'italic'
                    }}>   Pro Tip:</Text>
                    <Text style={{
                        color: Colors.light, fontSize: 13, lineHeight: 14, fontFamily: Fonts.Regular,
                        marginTop: wide * 0.03, textAlign: 'center', fontStyle: 'italic'
                    }}>
                        {data.proTips}
                    </Text>
                </View> */}

            </TouchableOpacity >
        )
    }

    _handleAsignChallenge = () => {
        const { playerId } = this.state;
        debugger;
        console.log("Challenege Assign call")
        if (this.state.playerId !== null) {
            getObject('UserId').then((userId) => {
                this.setState({ loading: true }, () => {
                    var data_arr = [];
                    playerId.forEach(element => {
                        data_arr.push({
                            "playerId": element,
                            "planId": this.state.planId,
                            "creatorId": userId,
                            "StartDate": Date.now(),
                            "totalPrice": this.state.challenge_price,
                            "roadToPro": false,
                            "addedBy": "COACH",
                        })
                    });
                    console.log('dataarr--', data_arr);
                    // var obj = {
                    //     "playerId": this.state.playerId,
                    //     "planId": this.state.planId,
                    //     "creatorId": userId,
                    //     "StartDate": Date.now(),
                    //     "totalPrice": this.state.challenge_price,
                    //     "roadToPro": false,
                    //     "addedBy": "COACH",
                    // }

                    this.props.dispatch(createSubscriptionForMultiplePlayer(data_arr, (res) => {
                        if (res) {
                            this.setState({ selectedChallengeIndx: null, isBtnActive: false, loading: false }, () => {
                                Navigation.back()
                            })
                            // Alert.alert(
                            //     '',
                            //     'Successfully Assign Challenge To Player', // <- this part is optional, you can pass an empty string
                            //     [
                            //         { text: 'OK', onPress: () => this.setState({ loading: false }, () => Navigation.back()) },
                            //     ],
                            //     { cancelable: false },
                            // );
                        }
                    }))
                })
            })
        } else {
            // console.log("Something went wrong...");
            alert("Something went wrong...");
        }

    }


    render() {
        const { loading } = this.state;
        // console.log(this.props.navigation.state.params);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <AppLoader visible={this.state.loading} />
                <View style={[CommonStyles.headerBottomLine]}>
                    <ScreenHeader
                        title={'Select Challenges'}
                        backButtonAction={() => Navigation.back()}
                    />
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? "padding" : null}>
                    {
                        // loading == true ?
                        //     <AppLoader visible={this.state.loading} />
                        //     :
                        this.state.challengeList !== null && this.state.challengeList.length > 0 ?
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>

                                <View style={{
                                    // backgroundColor: 'green',
                                    marginHorizontal: 24,
                                    // marginBottom: 15,
                                    // flex: 1
                                }} >

                                    <FlatList
                                        keyExtractor={(item, index) => index.toString()}
                                        contentContainerStyle={{ marginBottom: 15, }}
                                        data={this.state.challengeList}
                                        renderItem={(item, index) => this._renderPlans(item, index)}
                                        // showsHorizontalScrollIndicator={false}
                                        // ListEmptyComponent={() => <NoDataLabel height={wide} />}
                                        showsVerticalScrollIndicator={false}
                                        bounces={false}

                                    />
                                </View>

                                {this.state.challengeList !== null && this.state.challengeList.length > 0 ?
                                    <TouchableOpacity
                                        key={this.state.isBtnActive}
                                        style={{
                                            width: wide * 0.8, height: 48,
                                            backgroundColor: Colors.btnBg,
                                            alignSelf: 'center', borderRadius: 24,
                                            justifyContent: 'center',
                                            marginTop: wide * 0.03,
                                            marginBottom: wide * 0.08,
                                            opacity: this.state.isBtnActive === false ? 0.3 : 1.0,
                                            // marginTop: wide * 0.1
                                        }}
                                        onPress={
                                            () => {
                                                if (this.state.isBtnActive == true) {
                                                    this._handleAsignChallenge()
                                                }
                                            }
                                        }
                                    >
                                        <Text style={{
                                            alignSelf: 'center', color: Colors.light,
                                            fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                                        }}>Assign</Text>
                                    </TouchableOpacity>
                                    : <></>
                                }

                            </View>
                            :
                            <></>
                        // <View style={{
                        //     width: '100%', height: wide,
                        //     justifyContent: 'center', alignItems: 'center',

                        // }}>
                        //     <Text
                        //         style={{
                        //             color: Colors.fontColorGray,
                        //             fontSize: 20, lineHeight: 20,
                        //             fontFamily: Fonts.SemiBold, textAlign: 'center'
                        //         }}>Nothing to display...</Text>
                        // </View>
                    }

                    {/* <ScrollView style={{ backgroundColor: 'green' }}> */}



                    {/* </ScrollView> */}

                    <Modal visible={this.state.show}>
                        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                            <View style={{
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

                            </View>
                            <VideoPlay
                                source={{ uri: this.state.vidUrl }}
                                sty={{ height: wide * 0.6, width: wide, position: 'relative' }}
                            />
                            <View style={{
                                backgroundColor: Colors.base, marginHorizontal: 15,
                                justifyContent: 'space-between', marginTop: wide * 0.1
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                        {this.state.challengeTitle}  </Text>
                                    <View style={{ width: wide * 0.38 }} />
                                    <Text style={{ marginLeft: -20, color: Colors.light, fontSize: 12, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                        {this.state.datedAt}
                                    </Text>
                                </View>
                                {/* <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    {this.state.remark}</Text> */}
                                <View style={{ backgroundColor: Colors.grey, height: 0.5, width: wide * 0.9, top: 20 }} />

                                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                    <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                        Description:  </Text>
                                </View>
                                <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    {this.state.challenge_descp}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                    <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                        Pro Tips:  </Text>
                                </View>
                                <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    {this.state.challenge_tips}
                                </Text>
                            </View>
                            <TouchableOpacity
                                key={this.state.isBtnActive}
                                style={{
                                    width: wide * 0.8, height: 48,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 24,
                                    justifyContent: 'center',
                                    marginTop: wide * 0.03,
                                    marginBottom: wide * 0.08,
                                    opacity: this.state.isBtnActive === false ? 0.3 : 1.0,
                                    // marginTop: wide * 0.1
                                }}
                                onPress={
                                    () => {
                                        if (this.state.isBtnActive == true) {
                                            this._handleAsignChallenge()
                                        }
                                    }
                                }
                            >
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                                }}>Assign</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </Modal>

                </KeyboardAvoidingView>
            </SafeAreaView >
        );
    }
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.home
    };
}

export default connect(mapStateToProps)(CoachAssignTask);
const styles = StyleSheet.create({
    BackIcon: {
        width: wide * 0.09, height: wide * 0.09,
        marginTop: 20, borderRadius: wide * 0.03, borderWidth: 1,
        borderColor: Colors.borderColor, marginHorizontal: 10
    },
    headerText: {

        color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold

    },
    mediumHeaderText: {

        color: Colors.light, fontSize: 25, lineHeight: 26, fontFamily: Fonts.SemiBold

    },
    textPoint: {
        color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold,
        marginTop: 6,
    },
    textPointHeading: {
        color: Colors.fontColorGray, fontSize: 17, fontFamily: Fonts.Bold,
    },
    textPointCenter: {
        color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
        marginTop: 6, textAlign: 'center'
    },
});