import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList } from 'react-native';
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
let wide = Layout.width;
class CoachAssignedTrainner extends Component {
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
    _renderTrainer = (item, index) => {
        return (
            <View>
                <View style={{ marginTop: wide * 0.03 }}>
                    <Image style={{
                        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
                    }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <Text style={{
                            color: Colors.light, fontSize: 16, fontFamily: Fonts.SemiBold,
                            marginHorizontal: 15
                        }}>{item.index + 1}</Text>
                        <View style={{
                            width: wide * 0.15, height: wide * 0.15,
                            borderRadius: wide * 0.15 / 2, borderWidth: 3,
                            borderColor: Colors.borderColor,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image style={{ width: '80%', height: '80%', borderRadius: wide * 0.15 / 2, }} resizeMode={'contain'} source={require('../../Images/Los_Angeles_Lakers_logo.png')} />
                        </View>

                        <View style={{ paddingLeft: 15 }}>
                            <Text style={{
                                color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
                                marginLeft: 5
                            }}>RONY</Text>

                            <Text style={{
                                color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                                marginLeft: 5, marginVertical: 6
                            }}>
                                EXP - 3 YEARS
                            </Text>

                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ paddingHorizontal: 20 }}>
                            <Image style={{
                                width: wide * 0.07, height: wide * 0.07,

                            }} resizeMode={'stretch'} source={item.index % 2 == 0 ? require('../../Images/sort_tick_selected.png') : require('../../Images/tick_unselected.png')} />

                        </View>
                    </View>
                </View>

            </View>
        )
    }
    render() {


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
                    <TouchableOpacity style={{ marginHorizontal: 15, width: wide * 0.1 }} onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? "padding" : null}>


                    <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >

                        <View style={{ marginTop: wide * 0.05, marginHorizontal: 15 }}>

                            <TextInput style={{
                                borderWidth: 3, borderColor: Colors.borderColor,
                                fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.1,
                                borderRadius: 5, color: Colors.light, fontSize: 16
                            }}
                                placeholder={"SEARCH"}
                                placeholderTextColor={Colors.borderColor}
                                autoCorrect={false}
                                autoCapitalize='none'
                            />
                            <Image style={{
                                position: 'absolute',
                                width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
                            }} source={require('../../Images/search_ico.png')} />
                        </View>

                        <View style={{ flex: 1, marginHorizontal: 15 }}>

                            <FlatList
                                style={{ marginTop: wide * 0.05 }}
                                data={[1, 2, 3, 4, 1, 2, 3, 4]}
                                renderItem={(item, index) => this._renderTrainer(item, index)}
                                showsHorizontalScrollIndicator={false}

                            />
                        </View>
                        <TouchableOpacity

                            style={{
                                width: '90%', height: 56,
                                backgroundColor: Colors.btnBg,
                                alignSelf: 'center', borderRadius: 28,
                                justifyContent: 'center', margin: 10
                            }} onPress={() => {

                            }}>
                            <Text style={{
                                alignSelf: 'center', color: Colors.light,
                                fontFamily: Fonts.Bold, fontSize: 16
                            }}>Assign</Text>
                        </TouchableOpacity>
                    </View>

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

export default connect(mapStateToProps)(CoachAssignedTrainner);
