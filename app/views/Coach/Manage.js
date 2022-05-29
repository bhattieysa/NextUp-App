import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
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
import isValidEmail from '../../utils/isValidEmail';

import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { color } from 'react-native-reanimated';
import { AirbnbRating } from 'react-native-ratings';
import { getObject } from '../../middleware';
import { getCoachPlayers } from '../../actions/home';
let wide = Layout.width;
class Manage extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedPlanIndex: 0,
            selectedIndex: 0,
            starCount: 3.5
        };
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus)

    }
    onScreenFocus = () => {
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(getCoachPlayers(obj, (res) => {
                    this.setState({
                        loading: false
                    })
                }))
            })

        })
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    _renderPlan = (item, index) => {
        return (
            <TouchableOpacity style={{
                height: wide * 0.15,
                justifyContent: 'center',
                alignItems: 'center', paddingRight: 5
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: item.index })}
            >


                <Text numberOfLines={2} style={{
                    color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray, fontSize: 18, lineHeight: 22,
                    fontFamily: Fonts.SemiBold, width: wide * 0.15, textAlign: 'center'
                }}>SF</Text>
                <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>



            </TouchableOpacity>
        );
    };
    _renderTrainer = ({ item, index }) => {
        return (
            <View style={{ marginTop: wide * 0.03 }} >

                <Image style={{
                    position: 'absolute', top: -wide * 0.1, left: 0, right: 0, width: '100%'
                }} resizeMode={'contain'} source={require('../../Images/Rectangle.png')} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{
                        width: wide * 0.15, height: wide * 0.15,
                        borderRadius: wide * 0.15 / 2, borderWidth: 3,
                        borderColor: Colors.borderColor,
                        justifyContent: 'center', alignItems: 'center', marginLeft: 15
                    }}>
                        <Image style={{ width: '95%', height: '95%', borderRadius: wide * 0.15 / 2, }}
                            resizeMode={'cover'} source={{ uri: item.profilePictureUrl }} />
                    </View>

                    <View style={{ paddingLeft: 15 }}>
                        <Text style={{
                            color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                            marginLeft: 5
                        }}>{item.firstName}</Text>

                        <Text style={{
                            color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                            marginLeft: 5, marginVertical: 6
                        }}>
                            #{item.ranking} | {item.position}
                            {/* | Bulls */}
                        </Text>

                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{
                            color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                            marginLeft: 5, marginTop: Platform.OS === 'android' ? 5 : null
                        }}>RANK</Text>

                        <Text style={{
                            color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
                            marginLeft: 5, marginVertical: 6, textAlign: 'right'
                        }}>
                            {item.ranking}
                        </Text>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: wide * 0.02, alignItems: 'center' }}>
                    <View style={{
                        width: wide * 0.25, justifyContent: 'center', alignItems: 'center',
                        borderRightWidth: 0.3, borderRightColor: 'rgba(255,255,255,0.3)',
                    }}>
                        <Text style={{
                            color: Colors.white_08,
                            fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 18, textAlign: 'center'
                        }}>Active
                            Challenge</Text>
                        <Text style={{
                            color: Colors.light, fontFamily: Fonts.SemiBold,
                            fontSize: 24, marginTop: 3
                        }}>{item.activeChallenges}</Text>
                    </View>
                    <View style={{
                        width: wide * 0.25, justifyContent: 'center', alignItems: 'center',
                        borderRightWidth: 0.3, borderRightColor: 'rgba(255,255,255,0.3)',
                    }}>
                        <Text style={{
                            color: Colors.white_08,
                            fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 18, textAlign: 'center'
                        }}>Completed
                            Challenge</Text>
                        <Text style={{
                            color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 24,
                            marginTop: 3
                        }}>{item.completedChallenges}</Text>
                    </View>
                    <View style={{
                        width: wide * 0.25, justifyContent: 'center', alignItems: 'center',

                    }}>
                        <Text style={{
                            color: Colors.white_08,
                            fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 18, textAlign: 'center'
                        }}>Trainer Assigned</Text>
                        <Text style={{
                            color: Colors.light, fontFamily: Fonts.SemiBold
                            , fontSize: 24, marginTop: 3
                        }}>{item.trainerAssigned == true ? 'Yes' : 'No'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginVertical: wide * 0.05 }}>
                    <TouchableOpacity onPress={() => Navigation.navigate('CoachAssignedTrainner')} style={{
                        backgroundColor: Colors.btnBg,
                        width: '46%', height: wide * 0.09, borderRadius: 8, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 16, }}>Assign Trainer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '46%', height: wide * 0.09, borderRadius: 8, borderWidth: 2,
                        borderColor: Colors.light, justifyContent: 'center', alignItems: 'center'
                    }}
                        onPress={() => Navigation.navigate('CoachAssignTask', { playerId: item.playerId })}
                    >
                        <Text style={{ color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 16, }}>Assign Task</Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
    render() {

        const { coachPlayers } = this.props.Home
        console.log(coachPlayers);
        return (
            coachPlayers.length === 0 ?
                <View style={{ flex: 1, backgroundColor: Colors.base }}>
                    <AppLoader visible={this.state.loading} />
                </View>
                :
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                    <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                            minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
                        }}>

                            <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >
                                {/* <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06, marginHorizontal: 15 }}>
                                    <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold }}>
                                        Manage  </Text>
                                </View> */}


                                <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.07, marginHorizontal: 15 }}>
                                    <Text style={{ color: Colors.light, fontSize: 28, lineHeight: 36, fontFamily: Fonts.SemiBold }}>
                                        Players  </Text>
                                </View>



                                <View style={{ flex: 1, marginHorizontal: 15 }}>

                                    <FlatList
                                        style={{ marginTop: wide * 0.07 }}
                                        data={coachPlayers}
                                        renderItem={(item, index) => this._renderTrainer(item, index)}
                                        showsHorizontalScrollIndicator={false}

                                    />
                                </View>

                            </View>
                        </ScrollView>
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
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(Manage);
