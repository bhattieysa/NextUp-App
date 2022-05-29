
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, StyleSheet } from 'react-native';
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
import moment from 'moment'
import { color } from 'react-native-reanimated';

let wide = Layout.width;
class TrainerManage extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,

        };
    }
    componentDidMount() {
    }
    _renderMessageUserCat = ({ item, index }) => {
        console.log(item.name, "ll");
        return (
            <TouchableOpacity style={{
                height: wide * 0.15,
                justifyContent: 'center',
                alignItems: 'center', paddingRight: 20
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: index })}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text numberOfLines={1} style={{
                        color: this.state.selectedIndex === index ? Colors.light : Colors.fontColorGray,
                        fontSize: 20,
                        lineHeight: 22,
                        fontFamily: Fonts.Bold, textAlign: 'left'
                    }}>{item.name}</Text>
                    {
                        this.state.selectedIndex !== index ?
                            <View style={{
                                width: 8, height: 8, borderRadius: 4,
                                // backgroundColor: Colors.btnBg,
                            }} />
                            : null
                    }
                    <View style={{
                        height: 3,
                        backgroundColor: this.state.selectedIndex === index ? Colors.light : 'transparent',
                        width: wide * 0.04, top: 30, left: 30, alignSelf: 'flex-end', justifyContent: 'center', position: 'absolute'
                    }}></View>

                </View>
                {/* <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View> */}



            </TouchableOpacity >
        );
    };
    _renderPlans = () => {
        return (
            <TouchableOpacity onPress={() => Navigation.navigate('TrainerChallenges')}
                style={{
                    width: '100%', marginTop: wide * 0.02, alignSelf: 'center'

                }} >
                {/* <View style={{
                width: wide * 0.9, marginTop: wide * 0.02, alignSelf: 'center', borderRadius: wide * 0.5

            }} > */}
                <Image source={require('../../Images/bgSidePlanColor.png')}
                    resizeMode={'cover'}
                    style={{ width: '100%', borderRadius: wide * 0.01, position: 'absolute', height: '100%' }}
                />
                <View style={{ width: '100%', marginBottom: wide * 0.05 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontSize: 25, fontFamily: Fonts.Bold,
                            marginLeft: 15, marginTop: wide * 0.05, color: Colors.light
                        }}>
                            The Starting Plan
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Text style={{
                            fontSize: 35, fontFamily: Fonts.Bold,
                            marginTop: wide * 0.05, color: Colors.light, marginRight: 15
                        }}>
                            $50
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: 12, fontFamily: Fonts.SemiBoldItalic, fontStyle: 'italic', top: -10,
                        marginLeft: 15, color: Colors.white_08
                    }}>
                        345 Player Active                        </Text>
                    <Text style={{
                        fontSize: 14, fontFamily: Fonts.Regular,
                        marginLeft: 15, marginTop: wide * 0.02, color: Colors.light, marginRight: 15
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscingert elit. Praesent in imperdiet
                        enim. Nullam volutpat tetes augue nibh, nec dictum urna consequat et. Nullaerller convallis enim. Nullam volutpat tetes augu enim. Nullam volutpat tetes augu vulputate bibendum. Fusce interdum et ante nec pretium. Aenean consectetur consectetur arcuter sed nam.
                        </Text>
                </View>

            </TouchableOpacity>
        )
    }

    _renderTrainer = (item, index) => {
        return (

            <View style={{ marginTop: 0 }}>
                <Image style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>

                    <View style={{
                        width: wide * 0.15, height: wide * 0.15,
                        borderRadius: wide * 0.15 / 2, borderWidth: 3,
                        borderColor: Colors.borderColor, marginHorizontal: 15,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image style={{ width: '80%', height: '80%', borderRadius: wide * 0.15 / 2, }} resizeMode={'contain'} source={require('../../Images/Los_Angeles_Lakers_logo.png')} />
                    </View>

                    <View style={{ paddingLeft: 0 }}>
                        <Text style={{
                            color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
                            marginLeft: 5
                        }}>RONY</Text>

                        <Text style={{
                            color: Colors.lightshade, fontSize: 15, fontFamily: Fonts.SemiBold,
                            marginLeft: 5, marginVertical: 6, fontStyle: 'italic'
                        }}>
                            #31/c
                                    </Text>

                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ paddingHorizontal: 15 }}>
                        <View style={{
                            width: wide * 0.09, height: wide * 0.09,
                            top: -20


                        }}>
                            <Image style={{
                                width: '80%', height: '80%',
                                borderRadius: wide * 0.15 / 2,
                            }} resizeMode={'contain'} source={require('../../Images/Los_Angeles_Lakers_logo.png')} />
                        </View>

                    </View>
                </View>
            </View>


        )
    }


    render() {
        const DataTeam = [{
            id: 0,
            name: "Challenges"
        }, {
            id: 1,
            name: "Players"
        },]
        const DataTeam2 = [{
            id: 0,
            name: " Active Players"
        }, {
            id: 1,
            name: "All Players"
        },]

        console.log(this.state.selectedIndex);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <ScrollView>

                        <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >

                            <View style={{ marginTop: wide * 0.08, marginHorizontal: 15 }}>


                                <Text style={{
                                    color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold, marginLeft: 5,
                                }}>
                                    Manage
            </Text>

                            </View>
                            <View style={{ marginHorizontal: 15 }}>
                                <FlatList
                                    style={{ marginLeft: 5 }}
                                    data={DataTeam}
                                    renderItem={(item, index) => this._renderMessageUserCat(item, index)}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                />
                            </View>
                            {this.state.selectedIndex == 0 ? <>
                                <View style={{ flexDirection: 'row', paddingTop: 5, marginHorizontal: 15 }}>
                                    <TouchableOpacity onPress={() => Navigation.navigate('TrainerCreatePlan')}
                                        style={{
                                            width: '100%', height: wide * 0.25,
                                            marginTop: 10, borderRadius: wide * 0.015, borderWidth: 3,
                                            borderColor: Colors.borderColor,
                                            justifyContent: 'center', alignItems: 'center', marginBottom: 20
                                        }}>
                                        <View style={{
                                            width: wide * 0.07, height: wide * 0.07,
                                            borderRadius: (wide * 0.07) / 2,
                                            backgroundColor: Colors.btnBg, justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: Colors.light, fontSize: 18,
                                                fontFamily: Fonts.Medium, textAlign: 'center'

                                            }}>+</Text>

                                        </View>
                                        <Text style={{
                                            color: Colors.grey, fontSize: 15, top: 10, fontFamily: Fonts.Medium, textAlign: 'center', marginLeft: 5, marginTop: 2

                                        }}>Create New</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    style={{ marginHorizontal: 15 }}
                                    data={[1, 2, 3,]}
                                    renderItem={(item, index) => this._renderPlans(item, index)}
                                    showsHorizontalScrollIndicator={false}

                                />
                            </>
                                : <>
                                    <View style={{ marginTop: wide * 0.03, marginHorizontal: 5 }}>


                                        <TextInput style={{
                                            borderWidth: 3, borderColor: Colors.borderColor,
                                            fontFamily: Fonts.Bold, height: 60, paddingLeft: 10,
                                            borderRadius: 5, color: Colors.light, fontSize: 16, paddingRight: wide * 0.1
                                        }}
                                            placeholder={"SEARCH"}
                                            placeholderTextColor={Colors.borderColor}


                                        />
                                        <Image style={{
                                            position: 'absolute',
                                            width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
                                        }} source={require('../../Images/search_ico.png')} />
                                    </View>
                                    <FlatList
                                        style={{ marginLeft: 5, top: 5, paddingBottom: 20 }}
                                        data={DataTeam2}
                                        renderItem={(item, index) => this._renderMessageUserCat(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    />

                                    <FlatList
                                        // style={{ marginTop: wide * 0.15 }}
                                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11,]}
                                        renderItem={(item, index) => this._renderTrainer(item, index)}
                                        showsHorizontalScrollIndicator={false}

                                    />

                                </>}
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
        Home: entities.home
    };
}

export default connect(mapStateToProps)(TrainerManage);
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