import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, ScrollView, TextInput, Platform, Dimensions } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { onBoardAPI } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';

import { characterLimit, UserModel } from '../../constants/constant';

import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { getObject, setObject } from '../../middleware';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet } from 'react-native';
import { getRoadToProDetail } from '../../actions/home';
import MoVideoPlayer from 'react-native-mo-video-player';

let wide = Layout.width;
class RoadToPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            videoPlay: false
        };
        this.inputs = {};
    }
    componentDidMount() {

        this.setState({ loading: true })

        this.props.dispatch(getRoadToProDetail((res) => {

            console.log("Data response is ", res);

            this.setState({
                loading: false
            })

        }))
    }



    render() {

        const { roadToProInfo } = this.props.Home;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                {
                    this.state.loading ? <AppLoader visible={this.state.loading} /> : null
                }





                <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                        <TouchableOpacity style={{ width: wide * 0.1, }} onPress={() => Navigation.back()}>
                            <Image style={{
                                width: wide * 0.08, height: wide * 0.08,
                                borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                            }} source={require('../../Images/back_ico.png')} />
                        </TouchableOpacity>
                        <Text style={{
                            color: Colors.light, fontSize: 16,
                            fontFamily: Fonts.Bold, lineHeight: 24,
                            marginHorizontal: 10
                        }}>
                            Road To Pro
                        </Text>
                    </View>
                </View>

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    style={{ marginTop: wide * 0.03, marginBottom: wide * 0.01 }}
                    bounces={false}
                >


                    <View style={{
                        flexDirection: "column"
                    }}>

                        <View style={{
                            alignItems: "center",
                            borderBottomColor: Colors.grey,
                            borderBottomWidth: 1.5
                        }}>

                            {
                                roadToProInfo && roadToProInfo.mediaUrl ? <MoVideoPlayer
                                    source={{
                                        uri: roadToProInfo.mediaUrl.videoUrl
                                    }}
                                    style={{
                                        width: Dimensions.get("screen").width,
                                        height: Dimensions.get("screen").height * 0.4,
                                    }}
                                    poster={roadToProInfo.mediaUrl.thumbnailUrl}
                                    autoPlay={false}
                                />
                                    : null
                            }



                            {/* {
                                this.state.videoPlay ? <MoVideoPlayer
                                    source={roadToProInfo && roadToProInfo.mediaUrl}
                                    style={{ width: Dimensions.get("screen").width, height: 500, }}
                                    poster={require("../../Images/RoadToProVideo.png")}
                                    autoPlay={false}
                                />
                                    :
                                    <TouchableOpacity activeOpacity={true} onPress={() => this.setState({
                                        videoPlay: !this.state.videoPlay
                                    })}>
                                        <Image
                                            source={require("../../Images/RoadToProVideo.png")}
                                            resizeMode="contain"
                                            style={{
                                                width: "100%",
                                                height: undefined,
                                                aspectRatio: 1
                                            }}
                                        />
                                    </TouchableOpacity>
                            } */}






                        </View>

                        <View
                            style={{
                                paddingHorizontal: 30
                            }}
                        >
                            <Text style={{
                                color: Colors.lightshade,
                                textAlign: "justify",
                                marginTop: 20
                            }}>
                                {roadToProInfo && roadToProInfo.description}
                            </Text>


                            <TouchableOpacity
                                key={true}
                                style={{
                                    width: wide * 0.8, height: 48,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 24, opacity: 1.0,
                                    justifyContent: 'center', marginTop: 20,
                                }} onPress={() => {
                                    // this.actionContinue()
                                }}>
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.Bold,
                                }}>View Plans</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{
                                marginTop: 10
                            }}>
                                <Text style={{
                                    color: Colors.light,
                                    textAlign: "center"
                                }}>
                                    Skip
                                </Text>
                            </TouchableOpacity>

                        </View>

                        {/* <Image
                            source={require('../../Images/RoadToProVideo.png')}
                        /> */}
                    </View>



                    {/* </ScrollView> */}

                </KeyboardAwareScrollView>
                {/* </KeyboardAvoidingView> */}




            </SafeAreaView>
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


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontFamily: Fonts.Bold,
        borderRadius: 4,
        color: Colors.light,
        paddingRight: 0, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 0,
        fontFamily: Fonts.Bold,
        borderRadius: 8,
        color: Colors.light,
        paddingRight: 0, // to ensure the text is never behind the icon
    },
});


export default connect(mapStateToProps)(RoadToPro);

