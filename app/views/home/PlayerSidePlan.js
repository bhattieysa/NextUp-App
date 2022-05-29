import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView, Image,
    StatusBar, KeyboardAvoidingView, FlatList, ImageBackground
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
import * as Progress from 'react-native-progress';
import AppStatusBar from '../../components/common/statusBar';

let wide = Layout.width;
class PlayerSidePlan extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,
            arrLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]
        };
    }
    componentDidMount() {

    }



    renderChallenge = (item, index) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                //onPress={() => this.setState({ selectedPlanIndex: 0 })}
                style={[{
                    marginTop: wide * 0.03,
                    // height: wide * 0.23,
                    justifyContent: 'center'
                }, item.index === 0 ?
                    {
                        borderWidth: 2, borderColor: Colors.stars, borderRadius: 10
                    }
                    : item.index === 1 ?
                        {
                            borderWidth: 2, borderColor: Colors.btnBg, borderRadius: 10
                        }
                        : item.index === 2 ?
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

                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

                <View style={{ marginLeft: 15, flexDirection: 'row', marginVertical: 25 }}>

                    <View style={{ flex: 1, justifyContent: 'center' }} >

                        <Text style={{
                            color: Colors.light, fontSize: 20, lineHeight: 22,
                            fontFamily: Fonts.SemiBold, width: wide * 0.6
                        }}>

                            Dribble Challenge
</Text>
                    </View>

                    <View style={{
                        backgroundColor: item.index === 1 ? Colors.btnBg : item.index === 0 ? Colors.stars : null,
                        justifyContent: 'center', marginRight: 10, borderRadius: 5
                    }}>
                        {
                            item.index === 2 ?
                                <Image style={{
                                    width: wide * 0.08, height: wide * 0.08,

                                }} resizeMode={'contain'} source={require('../../Images/lock.png')} />
                                :
                                <Text style={{
                                    color: Colors.light, fontSize: 12, lineHeight: 14,
                                    fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                                }}>

                                    {item.item}
                                </Text>

                        }


                    </View>

                </View>


            </TouchableOpacity>
        )
    }

    render() {


        return (
            <>


                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                    <View style={{

                        position: 'absolute', top: 0, left: 0, right: 0, height: wide * 0.55, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <ImageBackground style={{ width: '100%', height: '100%' }} resizeMode={'cover'} source={require('../../Images/playerSidePlan.png')} />
                        {/* <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: Colors.overlayDark }}></View> */}
                        <Image style={{
                            width: wide * 0.2, height: wide * 0.2, position: 'absolute'
                        }} source={require('../../Images/play_ico.png')} />

                    </View>
                    <View style={{ marginHorizontal: 15, flexDirection: 'row', }}>
                        <TouchableOpacity onPress={() => Navigation.back()}>
                            <Image style={{
                                width: wide * 0.08, height: wide * 0.08, marginTop: 24,
                                borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                            }} source={require('../../Images/back_ico.png')} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <View style={{ height: wide * 0.07, borderRadius: 10, backgroundColor: Colors.light, marginTop: 18, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 16, fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 10, paddingVertical: 5,

                            }}>1 week</Text>
                        </View>

                    </View>
                    <View style={{
                        width: wide * 0.9, marginTop: wide * 0.25, alignSelf: 'center'

                    }} >
                        <Image source={require('../../Images/bgSidePlanColor.png')} />
                        <View style={{ position: 'absolute', width: '100%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    fontSize: 28, fontFamily: Fonts.Bold,
                                    marginLeft: 15, marginTop: wide * 0.07, color: Colors.light
                                }}>
                                    The Starting Plan
                        </Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{
                                    fontSize: 40, fontFamily: Fonts.Bold,
                                    marginTop: wide * 0.07, color: Colors.light
                                }}>
                                    $50
                        </Text>
                            </View>
                            <Text style={{
                                fontSize: 14, fontFamily: Fonts.Regular,
                                marginLeft: 15, marginTop: wide * 0.06, color: Colors.light
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscingert elit. Praesent in imperdiet enim. Nullam volutpat tetes augue nibh, nec dictum urna consequat et. Nullaerller convallis vulputate bibendum. Fusce interdum et ante nec pretium. Aenean consectetur consectetur arcuter sed nam.
                        </Text>
                        </View>

                    </View>
                    <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>


                        <View style={{ flex: 1, backgroundColor: Colors.base, marginTop: wide * 0.02 }} >




                            <Text style={{
                                fontSize: 28, fontFamily: Fonts.Bold,
                                marginLeft: 15, marginTop: wide * 0.07, color: Colors.light
                            }}>
                                Challenges
                        </Text>
                            <View style={{ width: wide * 0.9, marginHorizontal: 15 }}>
                                <Progress.Bar
                                    progress={0.5}
                                    width={wide * 0.92}
                                    borderColor={Colors.base}
                                    unfilledColor={Colors.borderColor}
                                    color={Colors.light}
                                    style={{ marginTop: wide * 0.07 }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{
                                        fontSize: 14, fontFamily: Fonts.MediumItalic,
                                        marginTop: wide * 0.02, color: Colors.light
                                    }}>
                                        Start
                        </Text>
                                    <View style={{ flex: 1 }}></View>
                                    <Text style={{
                                        fontSize: 14, fontFamily: Fonts.MediumItalic,
                                        marginTop: wide * 0.02, color: Colors.light, alignSelf: 'flex-end'
                                    }}>
                                        Complete
                        </Text>
                                </View>




                            </View>
                            <FlatList
                                style={{ flex: 1, marginTop: wide * 0.05, marginHorizontal: 15 }}
                                data={['Active', 'Completed', '']}
                                renderItem={(item, index) => this.renderChallenge(item, index)}
                            />


                        </View>

                    </KeyboardAvoidingView>

                </SafeAreaView >
            </>
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

export default connect(mapStateToProps)(PlayerSidePlan);
