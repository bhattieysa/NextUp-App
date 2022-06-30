import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView, Image, KeyboardAvoidingView,
    Alert, Platform,
} from 'react-native';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';


import ImagePicker from 'react-native-image-crop-picker';
import { getObject } from '../../middleware';
import { createNewTeam } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import AnimatedInput from '../../Helpers/react-native-animated-input';
import { uploadPhoto } from '../../actions/auth';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { Title } from '../../components/common/titleLabel';
import { showErrorAlert, showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';

let wide = Layout.width;


class CoachAddTeam extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            avatar: "",
            teamName: '',
            removeLoading: false,
            isbtnEnable: false,
        };
    }
    componentDidMount() {
        // this.props.navigation.addListener('didFocus', this.onScreenFocus)
        // this.onScreenFocus();
    }
    onScreenFocus = () => {
        // this.getInitialData(false)
    }
    getInitialData = (isfromAdd) => {
        getObject('UserId').then((obj) => {
            this.setState({ loading: true, selectedKpi: [] }, () => {
                this.props.dispatch(getNewCoachTeam(obj, (res) => {
                    const { coachTeam } = this.props.Home
                    debugger
                    if (coachTeam?.teamTabInfoDtoList === null || coachTeam?.teamTabInfoDtoList.length == 0) {
                        this.setState({
                            loading: false,
                            removeLoading: false,
                            isAddTeam: true
                        })
                    } else {
                        debugger;
                        // this.state.selectedKpi.push(coachTeam?.teamTabInfoDtoList[0].kpi[0]);
                        this.setState({
                            loading: false,
                            removeLoading: false,
                            defaultKpi: coachTeam?.teamTabInfoDtoList[0].kpi[0],
                            dropDownSelectedVal: coachTeam?.seasonList[0],
                        }, () => {
                            if (isfromAdd) {
                                this.setState({
                                    teamName: '', avatar: '',
                                    selectedIndex: coachTeam?.length - 1, isAddTeam: false
                                }, () => {
                                    // setTimeout(() => {
                                    //     alert('Team Added Successfully.')

                                    // }, 1000)
                                })

                            }
                            this._filterTeamSeasonWise();
                            // this.filterBarChartData(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamStatsTabDto);
                            // this._callPlayerTabApi(coachTeam?.teamTabInfoDtoList[this.state.selectedIndex]?.teamId);

                        })

                    }

                }))
            })

        })
    }

    actionAddTeam = () => {

        const { teamName, avatar } = this.state;
        debugger
        if (teamName.length == 0 || avatar.length == 0) {
            alert('Please enter name/logo to add the team.')
            return
        }
        debugger
        this.setState({ loading: true }, () => {
            getObject('UserId').then((obj) => {

                console.log("res0 ", obj);

                this.props.dispatch(uploadPhoto(avatar, obj, 'team', 'TEAM_LOGO', (res, uploadedUrl) => {
                    debugger

                    console.log("res1 ", res);

                    if (res) {

                        debugger
                        console.log("creating new team");
                        this.props.dispatch(createNewTeam({
                            "name": teamName,
                            "coachId": obj,
                            "teamLogo": uploadedUrl,
                            "seasonType": "2020-21",
                            "ownerId": obj,
                        }, (res) => {

                            console.log("res2 ", res);

                            if (res) {
                                debugger
                                this.setState({ loading: false }, () => {
                                    setTimeout(() => {
                                        Navigation.back();
                                    }, 200);
                                })

                                // Alert.alert(
                                //     '',
                                //     'Team added successfully',
                                //     [
                                //         {
                                //             text: 'OK', onPress: () => this.setState({ loading: false }, Navigation.back())
                                //         },
                                //     ],
                                // )
                            }
                        }))
                    }
                    else {
                        this.setState({ loading: false }, () => {
                            setTimeout(() => {
                                showErrorAlert('Something went wrong!')
                            }, 500);
                        })

                    }
                }))
            })
        })
    }


    pickSingle(cropit, circular = false, isFrom) {
        const { teamName, avatar } = this.state;
        Alert.alert(
            "Image",
            'Pick from',
            [
                {
                    text: 'Gallery',
                    onPress: async () => {
                        const res = await Permission.checkPermission(PERMISSION_TYPE.gallery);
                        if (res) {
                            ImagePicker.openPicker({
                                width: 500,
                                height: 500,
                                cropping: cropit,
                                cropperCircleOverlay: circular,
                                sortOrder: 'none',
                                compressImageMaxWidth: 1000,
                                compressImageMaxHeight: 1000,
                                compressImageQuality: 1,
                                compressVideoPreset: 'MediumQuality',
                                includeExif: true,
                                cropperStatusBarColor: 'white',
                                cropperToolbarColor: 'white',
                                cropperActiveWidgetColor: 'white',
                                cropperToolbarWidgetColor: '#3498DB',
                                mediaType: 'photo'
                            })
                                .then((image) => {
                                    // console.log('received image', image);

                                    this.setState({ avatar: image.path }, () => {
                                        this.handleBtnEnable();
                                    })

                                    // 

                                })
                                .catch((e) => {
                                    console.log(e);
                                    // Alert.alert(e.message ? e.message : e);
                                });
                        } else {
                            if (Platform.OS == 'ios') {
                                showAppPermissionAlert("Alert", "You have not granted permission for photo library.")
                            }
                        }

                    }
                },
                {
                    text: 'Camera',
                    onPress: async () => {
                        const res = await Permission.checkPermission(PERMISSION_TYPE.camera);
                        if (res) {
                            ImagePicker.openCamera({
                                width: 300,
                                height: 400,
                                cropping: true,
                                mediaType: 'photo'
                            }).then(image => {

                                this.setState({ avatar: image.path }, () => {
                                    this.handleBtnEnable();
                                })

                            });
                        } else {
                            if (Platform.OS == 'ios') {
                                showAppPermissionAlert("Alert", "You have not granted permission for camera.")
                            }
                        }
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );
    }

    handleBtnEnable = () => {
        const { avatar, teamName } = this.state
        if (avatar.length !== 0 && teamName.length !== 0) {
            this.setState({ isbtnEnable: true })
        } else {
            this.setState({ isbtnEnable: false })
        }
    }

    render() {
        const { teamName, avatar, isbtnEnable } = this.state;
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <AppLoader visible={this.state.loading} />
                <KeyBoardDismissHandler>
                    <View style={[CommonStyles.headerBottomLine]}>
                        <ScreenHeader
                            title={'Add Team'}
                            backButtonAction={() => Navigation.back()}
                        />
                    </View>
                    <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>

                        <View >
                            <View style={{
                                marginTop: 50,
                                flexDirection: 'row', alignItems: 'center',
                                marginHorizontal: wide * 0.02,
                                justifyContent: 'center'
                            }}>

                                {/* <View style={{  }}> */}
                                <TouchableOpacity onPress={() => this.pickSingle(true, false, 'ava')}
                                    style={{
                                        width: 160, height: 160,
                                        borderRadius: wide * 0.01, borderWidth: 2,
                                        borderColor: Colors.newGrayFontColor,
                                        justifyContent: 'center', alignItems: 'center',
                                    }}>
                                    {
                                        avatar !== ''
                                            ?
                                            <FastImage
                                                source={{ uri: avatar }}
                                                style={{ width: '95%', height: '95%', borderRadius: 5 }}
                                            />
                                            :
                                            <>
                                                <Image
                                                    style={{ width: 20, height: 20 }}
                                                    source={require('../../Images/AddTeamIcon.png')}
                                                />

                                                <Text numberOfLines={1} style={{
                                                    color: Colors.newGrayFontColor, fontSize: 16,
                                                    lineHeight: 24,
                                                    fontFamily: Fonts.Bold,
                                                    marginTop: 14,
                                                }}>Add Logo</Text>
                                            </>

                                    }

                                </TouchableOpacity>

                                {/* </View> */}
                            </View>
                            <View style={{
                                // backgroundColor: 'green',
                                marginHorizontal: 35,
                                marginTop: 60,

                                marginBottom: wide * 0.03,
                            }}>
                                <AnimatedInput
                                    placeholder="TEAM NAME"
                                    onChangeText={(e) => this.setState({ teamName: e }, () => {
                                        this.handleBtnEnable();
                                    })}
                                    value={teamName}
                                    styleInput={{
                                        fontFamily: Fonts.Bold,
                                        color: Colors.light,
                                        fontSize: 16, lineHeight: 18
                                    }}
                                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                                    styleBodyContent={{
                                        borderBottomWidth: 1.5,
                                        borderBottomColor: Colors.borderColor,
                                        width: wide * 0.8
                                    }}
                                // multiline
                                />

                            </View>
                            {/* <AppLoader visible={this.state.loading} /> */}

                        </View>

                        {/* <AppLoader visible={this.state.removeLoading} /> */}
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        key={isbtnEnable}
                        activeOpacity={0.3}
                        style={{
                            width: wide * 0.8, height: 48,
                            backgroundColor: Colors.btnBg,
                            alignSelf: 'center', borderRadius: 24,
                            justifyContent: 'center',
                            opacity: isbtnEnable === false ? 0.3 : 1.0,
                            marginBottom: 50,
                            // marginTop: 20,
                        }} onPress={() => {
                            if (isbtnEnable) {
                                this.actionAddTeam()
                            }
                        }}>
                        <Text style={{
                            alignSelf: 'center', color: Colors.light,
                            fontFamily: Fonts.Bold,
                        }}>Done</Text>
                    </TouchableOpacity>
                </KeyBoardDismissHandler>
            </SafeAreaView >

        );
    }
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(CoachAddTeam);