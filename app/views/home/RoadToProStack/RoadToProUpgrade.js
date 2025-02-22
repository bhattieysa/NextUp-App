import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Alert,
    ScrollView
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../../constants';

import Navigation from '../../../lib/Navigation';

import AppLoader from '../../../utils/Apploader';

import { login } from '../../../actions/auth';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { getObject } from '../../../middleware';
import { cancelSubscription, createSubscriptionForId, getSubscriptionInfoById } from '../../../actions/home';

let wide = Layout.width;
class RoadToProUpgrade extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedIndex: this.props.Home.roadToProData?.currentLevelState !== undefined ?
                this.props.Home.roadToProData?.currentLevelState : 0,
            arrLevels: 0,

        };
    }
    componentDidMount() {
        console.log("Road to pro----")
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
        // this.onScreenFocus();


    }
    onScreenFocus = () => {

        console.log("The screen focus working")

        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {

                console.log("User ID is ", obj);
                // this.props.dispatch(createSubscriptionForId(obj));

                this.props.dispatch(getSubscriptionInfoById(obj, (res) => {
                    if (res) {
                        const { roadToProData } = this.props.Home;
                        const params = this.props.navigation.state.params;

                        if (roadToProData && !roadToProData.roadToPro) {
                            this.setState({
                                loading: false
                            });

                            let packageList = roadToProData.packagesList;

                            console.log("packagelist2 ", JSON.stringify(roadToProData));

                            // Navigation.navigate("PlayerRoadToProPlan", { packageList, type: params.type });
                            return false;
                        }

                        if (roadToProData.subscriptionLevelInfoList !== null || roadToProData.planId !== null) {
                            this.setState({ arrLevels: roadToProData.subscriptionLevelInfoList.length });
                        }
                        this.setState({
                            loading: false,
                            selectedIndex: this.props.Home.roadToProData?.currentLevelState !== undefined ?
                                this.props.Home.roadToProData?.currentLevelState : 0
                        })
                    }

                }))

            })

        })



    }

    cancelTheSubscription = () => {
        Alert.alert("Are you sure?", "You want to cancel this subscription?", [
            {
                text: "NO",
                style: 'cancel'
            },
            {
                text: "YES",
                onPress: () => {
                    console.log("Cancel the subscription!")

                    getObject('UserId').then((obj) => {
                        this.setState({ loading: true }, () => {

                            this.props.dispatch(cancelSubscription(obj, (res) => {
                                if (res) {
                                    this.setState({
                                        loading: false,
                                    })
                                    Navigation.navigate("RoadToPro_3");
                                }

                            }))

                        })

                    })

                }
            }
        ])
    }

    _renderLevel = (item, index) => {
        const { roadToProData } = this.props.Home
        debugger
        return (
            <TouchableOpacity activeOpacity={1}
                style={{ height: wide * 0.5, }}
                onPress={() => {
                    if (roadToProData.currentLevelState >= item.index) {
                        this.setState({ selectedIndex: item.index })
                    }

                }}
            >
                <View style={{
                    width: wide * 0.23, height: wide * 0.32,
                    marginTop: 24, borderRadius: wide * 0.03, borderWidth: 3,
                    borderColor: Colors.borderColor, marginLeft: wide * 0.05,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image style={{
                        width: '60%', height: '60%',
                        tintColor: roadToProData.currentLevelState === undefined && item.index === 0 ? Colors.light : item.index < roadToProData.currentLevelState ? Colors.stars :
                            item.index === roadToProData.currentLevelState ?
                                Colors.light : Colors.overlayWhite
                    }} resizeMode={'contain'}
                        source={require('../../../Images/level_gold.png')} />
                    <Text style={{
                        color: roadToProData.currentLevelState === undefined && item.index === 0 ? Colors.light : item.index <= roadToProData.currentLevelState ? Colors.light : Colors.overlayWhite, fontSize: 12, fontFamily: Fonts.Bold,
                        marginLeft: 5, marginTop: wide * 0.03
                    }}>
                        Level {item.item.levelName}
                    </Text>

                </View>
                <View style={{
                    height: wide * 0.1, width: '100%',
                    justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0
                }}>
                    <View style={{
                        width: '100%', height: wide * 0.02,
                        backgroundColor: Colors.borderColor,

                        justifyContent: 'center', alignItems: 'center',
                        borderTopLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                        borderBottomLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                        left: item.index === 0 ? wide * 0.1 / 2 : 0,
                        borderTopRightRadius: this.state.arrLevels > 0 ? item.index === this.state.arrLevels - 1 ? wide * 0.02 / 2 : 0 : 0,
                        borderBottomRightRadius: this.state.arrLevels > 0 ? item.index === this.state.arrLevels - 1 ? wide * 0.02 / 2 : 0 : 0,
                        Right: this.state.arrLevels > 0 ? item.index === this.state.arrLevels - 1 ? wide * 0.1 / 2 : 0 : 0,
                    }}>
                    </View>
                    <Image style={{
                        width: roadToProData.currentLevelState === undefined && item.index === 0 ? wide * 0.05 : item.index <= roadToProData.currentLevelState ? wide * 0.05 : wide * 0.07, height: item.index <= roadToProData.currentLevelState ? wide * 0.05 : wide * 0.07, position: 'absolute', left: wide * 0.14,
                        tintColor: roadToProData.currentLevelState === undefined && item.index === 0 ? Colors.shade : item.index < roadToProData.currentLevelState ? Colors.stars : item.index === roadToProData.currentLevelState ? Colors.shade : null
                    }} resizeMode={'contain'}
                        source={roadToProData.currentLevelState === undefined && item.index === 0 ? require('../../../Images/tick_selected.png') : item.index <= roadToProData.currentLevelState ? require('../../../Images/tick_selected.png') : require('../../../Images/lock_circle.png')} />
                </View>
            </TouchableOpacity>
        );
    };

    renderChallenge = (item, index) => {
        const { roadToProData } = this.props.Home
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if (roadToProData.currentLevelState > this.state.selectedIndex) {
                        Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
                    } else if (item.index == roadToProData.currentChallengeState) {
                        Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: true })
                    } else if (item.index < roadToProData.currentChallengeState) {
                        Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
                    }
                }}
                style={[{
                    marginTop: wide * 0.03,
                    // height: wide * 0.23,
                    justifyContent: 'center'
                },
                roadToProData.currentLevelState > this.state.selectedIndex ?
                    {
                        borderWidth: 2, borderColor: Colors.stars, borderRadius: 10
                    }
                    : item.index < roadToProData.currentChallengeState ?
                        {
                            borderWidth: 2, borderColor: Colors.stars, borderRadius: 10
                        }
                        : item.index === roadToProData.currentChallengeState ?
                            {
                                borderWidth: 2, borderColor: Colors.statDropColor2, borderRadius: 10
                            }
                            : item.index > roadToProData.currentChallengeState ?
                                {
                                    borderWidth: 2, borderColor: Colors.fontGray, borderRadius: 10
                                }
                                :

                                null
                ]}>
                <Image style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0,
                    right: 0, width: '100%', height: '100%', borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 10

                }} resizeMode={'stretch'} source={require('../../../Images/Rectangle.png')} />

                <View style={{ marginLeft: 15, flexDirection: 'row', marginVertical: 25 }}>

                    <View style={{ flex: 1, justifyContent: 'center' }} >

                        <Text style={{
                            color: Colors.light, fontSize: 20, lineHeight: 22,
                            fontFamily: Fonts.SemiBold, width: wide * 0.6
                        }}>

                            {item.item.name}
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: roadToProData.currentLevelState > this.state.selectedIndex ? Colors.stars : item.index === roadToProData.currentChallengeState ? Colors.btnBg : item.index < roadToProData.currentChallengeState ? Colors.stars : null,
                        justifyContent: 'center', marginRight: 10, borderRadius: 5
                    }}>
                        {
                            roadToProData.currentLevelState > this.state.selectedIndex ?
                                <Text style={{
                                    color: Colors.light, fontSize: 12, lineHeight: 14,
                                    fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                                }}>

                                    Completed
                                </Text>
                                :
                                item.index > roadToProData.currentChallengeState ?
                                    <Image style={{
                                        width: wide * 0.08, height: wide * 0.08,

                                    }} resizeMode={'contain'} source={require('../../../Images/lock.png')} />
                                    :
                                    <Text style={{
                                        color: Colors.light, fontSize: 12, lineHeight: 14,
                                        fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                                    }}>

                                        {
                                            item.index === roadToProData.currentChallengeState ?
                                                "Active" :
                                                item.index < roadToProData.currentChallengeState ?
                                                    "Completed" :
                                                    null
                                        }
                                    </Text>

                        }


                    </View>

                </View>


            </TouchableOpacity>
        )
    }

    handleCreateSubsciption = () => {
        const { roadToProData } = this.props.Home
        getObject('UserId').then((userId) => {
            this.setState({ loading: true }, () => {
                var obj = {
                    "playerId": userId,
                    "planId": roadToProData.planId,
                    "StartDate": Date.now(),
                    "totalPrice": roadToProData.totalPrice,
                    "roadToPro": true
                }
                this.props.dispatch(createSubscriptionForId(obj, (res) => {
                    if (res) {
                        this.onScreenFocus();
                        // this.setState({ loading: false })

                    }
                }))
            })

        })
    }

    render() {
        const { roadToProData } = this.props.Home
        console.log('prodata---->>> ', roadToProData);


        return (
            roadToProData.length === 0 ?
                <View style={{ flex: 1, backgroundColor: Colors.base }}>
                    <AppLoader visible={this.state.loading} />
                </View>
                :
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                    {roadToProData && !roadToProData.packagesList ?
                        <View style={{
                            width: '90%', justifyContent: 'flex-end', flexDirection: 'row',
                            alignSelf: 'center', alignItems: "center",
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: '30%', height: 40,
                                    // backgroundColor: Colors.btnBg,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: Colors.compareFirstPlayerBorder,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    marginTop: wide * 0.02,
                                    marginRight: wide * 0.02,
                                    marginBottom: wide * 0.01
                                }} onPress={() => {
                                    this.cancelTheSubscription()
                                }}>
                                <Text style={{
                                    color: Colors.light,
                                    fontFamily: Fonts.Bold, fontSize: 16
                                }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>



                        :
                        <></>

                    }
                    {roadToProData.subscriptionLevelInfoList !== null || roadToProData.planId !== null ?
                        <ScrollView bounces={false} style={{ marginBottom: wide * 0.06, }} contentContainerStyle={{ flex: 1 }}>

                            {/* <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}> */}
                            <AppLoader visible={this.state.loading} />
                            <View style={{ flex: 1, backgroundColor: Colors.base }} >

                                <View style={{ marginTop: wide * 0.01, marginBottom: wide * 0.02 }}>
                                    <FlatList
                                        style={{ overflow: 'visible' }}
                                        data={roadToProData?.subscriptionLevelInfoList}
                                        renderItem={(item, index) => this._renderLevel(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    />

                                </View>
                                {roadToProData.currentLevelState !== undefined ?
                                    <View style={{
                                        // backgroundColor: 'green',
                                        alignItems: 'center',
                                        marginBottom: wide * 0.01
                                    }}>
                                        {/* <Text style={{
                                                    fontSize: 28, fontFamily: Fonts.Bold,
                                                    marginTop: wide * 0.07, color: Colors.light
                                                }}>
                                                    Challenges
                                                </Text> */}
                                        <View style={{ width: '90%' }}>
                                            <Progress.Bar
                                                progress={roadToProData.completedChallengePercentage / 100}
                                                width={wide * 0.9}
                                                borderColor={Colors.base}
                                                unfilledColor={Colors.borderColor}
                                                color={Colors.stars}
                                                style={{ marginTop: wide * 0.07 }}
                                            />


                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{
                                                    fontSize: 12, lineHeight: 12,
                                                    fontFamily: Fonts.Regular,
                                                    marginTop: wide * 0.02, color: Colors.light
                                                }}>
                                                    Start
                                                </Text>
                                                <View style={{ flex: 1 }}></View>
                                                <Text style={{
                                                    fontSize: 12, lineHeight: 12,
                                                    fontFamily: Fonts.Regular,
                                                    marginTop: wide * 0.02, color: Colors.light, alignSelf: 'flex-end'
                                                }}>
                                                    Complete
                                                </Text>
                                            </View>




                                        </View>
                                    </View>
                                    :
                                    <View style={{ alignItems: 'center' }}>


                                        {roadToProData?.subscriptionLevelInfoList.length > 0 ?
                                            <View style={{
                                                // marginTop: wide * 0.05,
                                                width: '90%',
                                                paddingBottom: wide * 0.04,
                                            }}>

                                                {/* <Image style={{
                                                        width: '25%', height: '40%',
                                                        // tintColor:Colors.light,
                                                        marginTop: wide * 0.07
                                                    }} resizeMode={'contain'}
                                                        source={require('../../Images/level_gold.png')}
                                                    /> */}
                                                <Text style={{
                                                    color: Colors.light, fontSize: 20,
                                                    fontFamily: Fonts.Bold,
                                                    lineHeight: 40,
                                                    marginTop: wide * 0.03,
                                                    // paddingRight: wide * 0.25
                                                }}>
                                                    {roadToProData?.subscriptionLevelInfoList[0]?.levelName}
                                                </Text>
                                                <Text style={{
                                                    color: Colors.light, fontSize: 12,
                                                    fontFamily: Fonts.Regular,
                                                    lineHeight: 14,
                                                    marginTop: wide * 0.05,
                                                    // paddingRight: wide * 0.25
                                                }}>
                                                    {roadToProData?.subscriptionLevelInfoList !== undefined ? roadToProData?.subscriptionLevelInfoList[0]?.levelDescription : ''}
                                                </Text>

                                            </View>


                                            : null
                                        }

                                        {roadToProData && roadToProData.roadToPro ? <TouchableOpacity
                                            // sds
                                            style={{
                                                width: '85%', height: 45,
                                                backgroundColor: Colors.btnBg,
                                                alignSelf: 'center', borderRadius: 28,
                                                justifyContent: 'center', marginTop: 30,
                                                paddingHorizontal: 10, marginRight: 10,
                                            }} onPress={() => {
                                                this.handleCreateSubsciption();
                                            }}>
                                            <Text style={{
                                                alignSelf: 'center', color: Colors.light,
                                                fontFamily: Fonts.Bold, fontSize: 16
                                            }}>Start</Text>
                                        </TouchableOpacity>
                                            :
                                            null
                                        }




                                    </View>
                                }

                                <FlatList
                                    style={{ flex: 1, marginHorizontal: 15, marginTop: wide * 0.03 }}
                                    data={roadToProData !== undefined && roadToProData.currentLevelState !== undefined ? roadToProData.subscriptionLevelInfoList[this.state.selectedIndex].challengeList : []}
                                    renderItem={(item, index) => this.renderChallenge(item, index)}

                                />

                                {roadToProData && !roadToProData.packagesList ? <>
                                    {/* <TouchableOpacity
                                        // sds
                                        style={{
                                            width: '85%', height: 45,
                                            backgroundColor: Colors.btnBg,
                                            alignSelf: 'center', borderRadius: 28,
                                            justifyContent: 'center', marginTop: 30,
                                            paddingHorizontal: 10, marginRight: 10,
                                            marginBottom: 10
                                        }}
                                    onPress={() => {
                                        this.cancelTheSubscription()
                                    }}
                                    >
                                        <Text style={{
                                            alignSelf: 'center', color: Colors.light,
                                            fontFamily: Fonts.Bold, fontSize: 16
                                        }}>Cancel</Text>
                                    </TouchableOpacity> */}


                                </>
                                    :
                                    <TouchableOpacity

                                        style={{
                                            width: '90%', height: 56,
                                            backgroundColor: Colors.btnBg,
                                            alignSelf: 'center', borderRadius: 28,
                                            justifyContent: 'center', marginTop: 30, paddingHorizontal: 15,
                                            position: "absolute",
                                            bottom: 20,
                                            // top: 50
                                        }} onPress={() => {
                                            Navigation.navigate('PlayerRoadToProPlan', { type: "Player", packageList: roadToProData.packagesList })
                                        }}>
                                        <Text style={{
                                            alignSelf: 'center', color: Colors.light,
                                            fontFamily: Fonts.Bold, fontSize: 16
                                        }}>Get Monthly Subscription</Text>
                                    </TouchableOpacity>
                                }



                            </View>


                            {/* </KeyboardAvoidingView> */}
                        </ScrollView>
                        :

                        <></>
                    }
                </SafeAreaView >

        );

    }
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(RoadToProUpgrade);
