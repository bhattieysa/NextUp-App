import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList,
    StyleSheet, Alert, Platform, Modal, Touchable
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

import { ScrollView, TextInput } from 'react-native-gesture-handler';

import ImagePicker from 'react-native-image-crop-picker';
import { getObject } from '../../middleware';
import {
    getCoachTeam, createNewTeam, removePlayerToTeam,
    getNewCoachTeam, getPlayerListForTeam, getGameListForTeam, getUserInfo,
    removeMultiplePlayerToTeam,
    getCoachRoles,
    inviteCoachRole
} from '../../actions/home';
import FastImage from 'react-native-fast-image';
import AnimatedInput from '../../Helpers/react-native-animated-input';
import { uploadPhoto } from '../../actions/auth';
import {
    VictoryTheme, VictoryLabel, VictoryContainer, VictoryPolarAxis, VictoryChart,
    VictoryGroup, VictoryArea, VictoryBar, VictoryAxis,
    VictoryPie,
} from 'victory-native';
import moment from 'moment'
import SelectDropdown from 'react-native-select-dropdown';
import { SenderRecevrModel } from '../../constants/constant';
import { sendBulkMessage } from '../../actions/chat';
import { BlurView } from "@react-native-community/blur";
import { Title } from '../../components/common/titleLabel';
import { showErrorAlert } from '../../utils/info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


let wide = Layout.width;
let high = Layout.height;
let isSelectShow = false;

class CoachInviteNew extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedRole: "",
            isEnableBtn: false,
            email: ""
        };
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
        // this.onScreenFocus();
    }
    onScreenFocus = () => {
        this.getInitialData(false)

        console.log("getting coach roles");
        this.props.dispatch(getCoachRoles());

    }

    getInitialData = (isfromAdd) => {
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(getCoachRoles(obj, (res) => {
                    if (res) {
                        const { coachRoles } = this.props.Home
                        this.setState({
                            loading: false
                        })
                        console.log("TeammmRespp", coachRoles);
                    }
                }))
            })

        })
    }


    inviteCoach(teamId) {

        this.setState({ loading: true });

        getObject('UserId').then((obj) => {
            let postData = {
                emailId: this.state.email,
                ownerId: obj,
                teamId: teamId,
                role: this.state.selectedRole
            };

            console.log("post data is ", postData);

            this.props.dispatch(inviteCoachRole(postData, (res) => {
                this.setState({ loading: false });

                if (res) {
                    Navigation.back();
                }
                else {
                    Alert.alert("Error", "Something went wrong!");
                }
            }))

        }).catch(error => {
            this.setState({
                loading: false
            })
            Alert.alert('Error', error.message)
        })
    }


    setFields(name, value) {
        if (name === "email") {
            if (value.trim() === "") {
                this.setState({
                    isEnableBtn: false
                })
                return;
            }

            if (String(this.state.selectedRole).trim() === "") {
                this.setState({
                    isEnableBtn: false
                })
                return;
            }

        }


        if (name === "role") {
            if (String(value).trim() === "") {
                this.setState({
                    isEnableBtn: false
                });
                return;
            }

            if (this.state.email.trim() === "") {
                this.setState({
                    isEnableBtn: false
                })
                return;
            }
        }

        this.setState({
            isEnableBtn: true
        })
        return;

    }


    render() {
        const { coachRoles } = this.props.Home
        const { teamId } = this.props.navigation.state.params;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <AppLoader visible={this.state.loading} />
                <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>

                    {/* <Text style={{ color: Colors.lightshade }}>
                        {JSON.stringify(coachRoles)}
                    </Text> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                        <TouchableOpacity style={{ width: wide * 0.1, }} onPress={() => Navigation.back()}>
                            <Image style={{
                                width: wide * 0.08, height: wide * 0.08,
                                // marginTop: 20, 
                                borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                            }} source={require('../../Images/back_ico.png')} />
                        </TouchableOpacity>
                        <Text style={{
                            // marginTop: 16,
                            color: Colors.light, fontSize: 16,
                            fontFamily: Fonts.Bold, lineHeight: 24,
                            marginHorizontal: 10
                        }}>
                            Invite New
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
                        flexDirection: "column",
                        marginHorizontal: 20
                    }}>


                        {
                            coachRoles && Array.isArray(coachRoles) && coachRoles.map((role, index) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.setState({
                                            selectedRole: role.name
                                        });
                                        this.setFields("role", role.name);
                                    }}>
                                    <View key={`role-${index}`} style={{
                                        borderColor: this.state.selectedRole === role.name ? Colors.lightshade : Colors.grey,
                                        borderWidth: 1.5,
                                        padding: 20,
                                        borderRadius: 8,
                                        marginTop: 30
                                    }}>

                                        <Text style={{
                                            color: this.state.selectedRole === role.name ? Colors.lightshade : Colors.grey
                                        }}>{role.name}</Text>


                                        {
                                            role.description.split(" / ").map((desc) => (
                                                <Text style={{
                                                    color: this.state.selectedRole === role.name ? Colors.lightshade : Colors.grey,
                                                    marginLeft: 15
                                                }}>
                                                    {`\u2022`}{desc}
                                                </Text>
                                            ))
                                        }

                                    </View>
                                </TouchableOpacity>
                            ))
                        }



                        <View style={{
                            marginTop: 50
                        }}>
                            <AnimatedInput
                                placeholder="EMAIL ID"
                                onChangeText={(e) => {
                                    this.setState({ email: e });
                                    this.setFields("email", e);
                                }}
                                value={this.state.email}
                                styleInput={{
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light,
                                    fontSize: 16, lineHeight: 18
                                }}
                                styleLabel={{
                                    fontFamily: Fonts.Bold, color: Colors.newGrayFontColor,
                                    fontSize: 12,
                                }}
                                styleBodyContent={{
                                    borderBottomWidth: 1.5,
                                    borderBottomColor: Colors.borderColor,
                                    // width: wide * 0.4
                                }}
                            />
                        </View>


                        <View
                            style={{
                                paddingHorizontal: 30,
                                marginTop: 80
                            }}
                        >

                            {/* <Text style={{
                                color: Colors.lightshade
                            }}>
                                ENable btn : {JSON.stringify(this.state)}
                            </Text> */}

                            <TouchableOpacity
                                key={this.state.isEnableBtn}
                                style={{
                                    width: wide * 0.8, height: 48,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center',
                                    borderRadius: 24,
                                    opacity: this.state.isEnableBtn === false ? 0.3 : 1.0,
                                    justifyContent: 'center', marginTop: 20,
                                }} onPress={() => {
                                    // this.actionContinue()
                                    this.inviteCoach(teamId);
                                }}>
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.Bold,
                                }}>Send Invite</Text>
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

export default connect(mapStateToProps)(CoachInviteNew);














