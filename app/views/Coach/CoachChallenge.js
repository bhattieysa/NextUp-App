import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { isNotch } from '../../utils/deviceInfo';
import moment from 'moment'
import { getObject } from '../../middleware';
import { getCoachPlayers, getChallengeTabData } from '../../actions/home';

let wide = Layout.width;
class CoachChallenge extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: null,
            selectedPlanIndex: 0,
            selectedIndex: 0,
            starCount: 3.5,
            challengeListData: []
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
    }

    onScreenFocus = () => {
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(getChallengeTabData(obj, (res, data) => {
                    if (res) {
                        this.setState({
                            loading: false,
                            challengeListData: data,
                        })
                    }


                }))
            })

        })
    }

    componentWillUnmount() {
        this.setState({ loading: null });
    }
    // onStarRatingPress(rating) {
    //     this.setState({
    //         starCount: rating
    //     });
    // }
    // _renderPlan = (item, index) => {
    //     return (
    //         <TouchableOpacity style={{
    //             height: wide * 0.15,
    //             justifyContent: 'center',
    //             alignItems: 'center', paddingRight: 5
    //         }}
    //             activeOpacity={1}
    //             onPress={() => this.setState({ selectedIndex: item.index })}
    //         >


    //             <Text numberOfLines={2} style={{
    //                 color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray, fontSize: 18, lineHeight: 22,
    //                 fontFamily: Fonts.SemiBold, width: wide * 0.15, textAlign: 'center'
    //             }}>SF</Text>
    //             <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>



    //         </TouchableOpacity>
    //     );
    // };
    // _renderTrainer = ({ item, index }) => {
    //     return (
    //         <View style={{ marginTop: wide * 0.03 }} >

    //             <Image style={{
    //                 position: 'absolute', top: -wide * 0.1, left: 0, right: 0, width: '100%'
    //             }} resizeMode={'contain'} source={require('../../Images/Rectangle.png')} />

    //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>

    //                 <View style={{
    //                     width: wide * 0.15, height: wide * 0.15,
    //                     borderRadius: wide * 0.15 / 2, borderWidth: 3,
    //                     borderColor: Colors.borderColor,
    //                     justifyContent: 'center', alignItems: 'center', marginLeft: 15
    //                 }}>
    //                     <Image style={{ width: '95%', height: '95%', borderRadius: wide * 0.15 / 2, }}
    //                         resizeMode={'cover'} source={{ uri: item.profilePictureUrl }} />
    //                 </View>

    //                 <View style={{ paddingLeft: 15 }}>
    //                     <Text style={{
    //                         color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
    //                         marginLeft: 5
    //                     }}>{item.firstName}</Text>

    //                     <Text style={{
    //                         color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
    //                         marginLeft: 5, marginVertical: 6
    //                     }}>
    //                         #{item.ranking} | {item.position}
    //                         {/* | Bulls */}
    //                     </Text>

    //                 </View>
    //                 <View style={{ flex: 1 }} />
    //                 <View style={{ paddingHorizontal: 15 }}>
    //                     <Text style={{
    //                         color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
    //                         marginLeft: 5, marginTop: Platform.OS === 'android' ? 5 : null
    //                     }}>RANK</Text>

    //                     <Text style={{
    //                         color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
    //                         marginLeft: 5, marginVertical: 6, textAlign: 'right'
    //                     }}>
    //                         {item.ranking}
    //                     </Text>

    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: wide * 0.02, alignItems: 'center' }}>
    //                 <View style={{
    //                     width: wide * 0.25, justifyContent: 'center', alignItems: 'center',
    //                     borderRightWidth: 0.3, borderRightColor: 'rgba(255,255,255,0.3)',
    //                 }}>
    //                     <Text style={{
    //                         color: Colors.white_08,
    //                         fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 18, textAlign: 'center'
    //                     }}>Active
    //                         Challenge</Text>
    //                     <Text style={{
    //                         color: Colors.light, fontFamily: Fonts.SemiBold,
    //                         fontSize: 24, marginTop: 3
    //                     }}>{item.activeChallenges}</Text>
    //                 </View>
    //                 <View style={{
    //                     width: wide * 0.25, justifyContent: 'center', alignItems: 'center',
    //                     borderRightWidth: 0.3, borderRightColor: 'rgba(255,255,255,0.3)',
    //                 }}>
    //                     <Text style={{
    //                         color: Colors.white_08,
    //                         fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 18, textAlign: 'center'
    //                     }}>Completed
    //                         Challenge</Text>
    //                     <Text style={{
    //                         color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 24,
    //                         marginTop: 3
    //                     }}>{item.completedChallenges}</Text>
    //                 </View>
    //                 <View style={{
    //                     width: wide * 0.25, justifyContent: 'center', alignItems: 'center',

    //                 }}>
    //                     <Text style={{
    //                         color: Colors.white_08,
    //                         fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 18, textAlign: 'center'
    //                     }}>Trainer Assigned</Text>
    //                     <Text style={{
    //                         color: Colors.light, fontFamily: Fonts.SemiBold
    //                         , fontSize: 24, marginTop: 3
    //                     }}>{item.trainerAssigned == true ? 'Yes' : 'No'}</Text>
    //                 </View>
    //             </View>
    //             <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: wide * 0.05 }}>
    //                 <TouchableOpacity onPress={() => Navigation.navigate('CoachAssignedTrainner')} style={{
    //                     backgroundColor: Colors.btnBg,
    //                     width: '46%', height: wide * 0.09, borderRadius: 8, justifyContent: 'center', alignItems: 'center'
    //                 }}>
    //                     <Text style={{ color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 16, }}>Assign Trainer</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{
    //                     width: '46%', height: wide * 0.09, borderRadius: 8, borderWidth: 2,
    //                     borderColor: Colors.light, justifyContent: 'center', alignItems: 'center'
    //                 }}
    //                     onPress={() => Navigation.navigate('CoachAssignTask', { playerId: item.playerId })}
    //                 >
    //                     <Text style={{ color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 16, }}>Assign Task</Text>
    //                 </TouchableOpacity>
    //             </View>


    //         </View>
    //     )
    // }

    renderChallenge = (item, index) => {
        // console.log('iiiiii', item.item.planId)
        return (
            <TouchableOpacity
                activeOpacity={1}
                // onPress={() => {
                //   if (roadToProData.currentLevelState > this.state.selectedIndex) {
                //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
                //   } else if (item.index == roadToProData.currentChallengeState) {
                //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: true })
                //   } else if (item.index < roadToProData.currentChallengeState) {
                //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
                //   }
                // }}
                onPress={() => { Navigation.navigate('CoachChallenegesPlayerList', { planId: item.item.planId }) }}
                style={[{
                    marginTop: wide * 0.03,
                    justifyContent: 'center'
                },
                // item.item.active === true ?
                {
                    borderWidth: 2, borderColor: Colors.stars, borderRadius: 10
                }
                    // : {
                    //     borderWidth: 2, borderColor: Colors.statDropColor2, borderRadius: 10
                    // }
                ]}>
                <Image style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0,
                    right: 0, width: '100%', height: '100%', borderRadius: 10,
                    borderBottomLeftRadius: 8

                }} resizeMode={'stretch'} source={require('../../Images/Rect_dummy.png')} />

                <View style={{ marginLeft: 15, flexDirection: 'row', marginVertical: 25 }}>

                    <View style={{ flex: 1, justifyContent: 'center' }} >

                        <Text style={{
                            color: Colors.light, fontSize: 20, lineHeight: 22,
                            fontFamily: Fonts.SemiBold, width: wide * 0.6
                        }}>
                            {item.item.subscriptionLevelInfoList[0].challengeList[0].name}
                        </Text>
                    </View>

                    <View style={{
                        justifyContent: 'center', marginRight: 10, borderRadius: 5
                    }}>
                        <Text style={{
                            color: Colors.stars, fontSize: 12, lineHeight: 14,
                            fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                        }}>
                            1 Players
                        </Text>
                        {/* {
                            item.item.active !== true ?
                                <Text style={{
                                    color: Colors.light, fontSize: 12, lineHeight: 14,
                                    fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                                }}>


                                    Completed
                                </Text>
                                :

                                <Text style={{
                                    color: Colors.light, fontSize: 12, lineHeight: 14,
                                    fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                                }}>
                                    Active
                                </Text>

                        } */}


                    </View>

                </View>


            </TouchableOpacity>

        )
    }

    render() {
        const { challengeListData, loading } = this.state
        console.log("Loadddd", challengeListData.length);
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                {/* loading == null ? <></> : */}
                <AppLoader visible={loading} />
                {challengeListData.length > 0 && challengeListData != null ?

                    <KeyboardAvoidingView keyboardVerticalOffset={10} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                        <ScrollView showsVerticalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={{
                                // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                                paddingBottom: 20
                            }}>

                            <View style={{ alignItems: 'center' }} >
                                <View style={{ width: '90%', marginTop: wide * 0.03 }}>
                                    <FlatList
                                        data={challengeListData}
                                        style={{ marginBottom: 10 }}
                                        renderItem={(item, index) => this.renderChallenge(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        bounces={false}
                                    />
                                </View>

                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    :
                    // challengeListData.length == 0 && loading == false ?
                    //     <View style={{
                    //         width: '100%', height: '70%',
                    //         justifyContent: 'center', alignItems: 'center',
                    //         // backgroundColor: 'green',
                    //         marginTop: wide * 0.1
                    //     }}>
                    //         <Text
                    //             style={{
                    //                 color: Colors.fontColorGray,
                    //                 fontSize: 20, lineHeight: 20,
                    //                 fontFamily: Fonts.SemiBold, textAlign: 'center',
                    //                 marginTop: wide * 0.15
                    //             }}>Nothing to display...</Text>

                    //     </View>
                    //     :
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

export default connect(mapStateToProps)(CoachChallenge);
// export default CoachChallenge;
