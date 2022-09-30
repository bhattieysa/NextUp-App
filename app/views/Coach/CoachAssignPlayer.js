
import React, { Component, useState, useEffect } from 'react';
import {
    View, TouchableOpacity, ImageBackground, Text, SafeAreaView, Image, key,
    Alert, KeyboardAvoidingView, FlatList, TextInput, StyleSheet, Modal, Keyboard, Platform, ScrollView
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import { connect } from 'react-redux';
import {
    getNewCoachTeam, getListOfPlayers
} from '../../actions/home';
import { getObject, setObject, remove } from '../../middleware';
import FastImage from 'react-native-fast-image';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { BlurView } from "@react-native-community/blur";
import CoachAssignPlayerList from './Components/AIDrivenChallenge/CoachAssignPlayerList';

const CoachAssignPlayer = (props) => {

    const [loading, setLoading] = useState(false)
    const [teamData, setTeamData] = useState()
    const [teamId, setTeamID] = useState()
    const [selectTeam, setSelectTeam] = useState(0)


    const [showSessionDropDown, setShowSessionDropDown] = useState(false)
    const [dropDownSelectedVal, setDropDownSelectedVal] = useState('Season')



    const notes = props.navigation.state?.params?.notes
    const typeOfSubscription = props.navigation.state?.params?.typeOfSubscription
     const challengeId = props.navigation.state?.params?.challengeId
    const assignTo = props.navigation.state?.params?.assignTo




    let wide = Layout.width;
    let high = Layout.height;

    useEffect(() => {
        setLoading(true)

        getObject('UserId').then((obj) => {

            props.dispatch(getNewCoachTeam(obj, (res, data) => {
                if (res) {
                    setLoading(false)

                    setTeamData(data.teamTabInfoDtoList)
                    setTeamID(data.teamTabInfoDtoList[0].teamId)




                }
            }))
        })
    }, [])


















    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{
                flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0,
                backgroundColor: Colors.base
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                        <ScreenHeader
                            title={'Select Player'}
                            backButtonAction={() => Navigation.back()}
                        />
                    </View>
                    <View style={{ flex: 1 }}>


                        <View style={{ flexDirection: 'row', marginTop: wide * 0.03, }}>


                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', width: '80%',
                                    height: 25,
                                    justifyContent: 'flex-end',
                                }}
                                activeOpacity={1}
                                onPress={() => setShowSessionDropDown(true)}
                            >
                                <Text style={{
                                    color: Colors.light,
                                    fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16, marginRight: 5
                                }}>{dropDownSelectedVal}</Text>
                                <Image
                                    style={{
                                        width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.02, top: -1
                                    }} source={require('../../Images/dropDownIconNew.png')}
                                />
                            </TouchableOpacity>

                            {showSessionDropDown === true ?
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={showSessionDropDown}
                                >
                                    <TouchableOpacity
                                        onPress={() => setShowSessionDropDown(false)}
                                        style={{
                                            width: wide,
                                            height: high,
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                    >
                                        <BlurView style={{
                                            width: wide,
                                            height: high,
                                            position: 'absolute',
                                            // justifyContent: 'center', alignItems: 'center'
                                        }}
                                            blurAmount={10}
                                            blurRadius={10}
                                        />
                                        <View style={{
                                            width: '60%', height: wide * 0.5, backgroundColor: Colors.ractangelCardColor,
                                            marginTop: 20, borderRadius: 20, alignItems: 'center'
                                        }}>
                                            <View style={{
                                                width: '100%', height: '15%', marginTop: 10,
                                                alignItems: 'center', justifyContent: 'center',
                                                // borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                                            }}>
                                                <Text style={{
                                                    color: Colors.light, fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                                                }}>Select Status</Text>

                                            </View>


                                            <View style={{ width: '60%', height: '80%', }}>
                                                <TouchableOpacity
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        height: 50, marginTop: 10,
                                                        // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
                                                    }}
                                                    // onPress={() => this.setState({ dropDownSelectedVal: item.item, }, () => {

                                                    //     this._filterTeamSeasonWise();
                                                    //     // const { coachDash } = this.props.Home;
                                                    //     // this._filterPieChartData(coachDash.teamDetailInfo);
                                                    // })}

                                                    onPress={() => { setDropDownSelectedVal('Active'), setShowSessionDropDown(false) }}
                                                >
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 15, lineHeight: 16,
                                                        fontFamily: Fonts.Bold,
                                                    }}>Active</Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        height: 30, marginTop: 10,
                                                        // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
                                                    }}
                                                    // onPress={() => this.setState({ dropDownSelectedVal: item.item, }, () => {

                                                    //     this._filterTeamSeasonWise();
                                                    //     // const { coachDash } = this.props.Home;
                                                    //     // this._filterPieChartData(coachDash.teamDetailInfo);
                                                    // })}
                                                    onPress={() => { setDropDownSelectedVal('Pending'), setShowSessionDropDown(false) }}
                                                >

                                                    <Text style={{
                                                        color: Colors.light, fontSize: 15, lineHeight: 16,
                                                        fontFamily: Fonts.Bold,
                                                    }}>Pending</Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        justifyContent: 'center', alignItems: 'center',
                                                        height: 30, marginTop: 10,
                                                        // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
                                                    }}
                                                    // onPress={() => this.setState({ dropDownSelectedVal: item.item, }, () => {

                                                    //     this._filterTeamSeasonWise();
                                                    //     // const { coachDash } = this.props.Home;
                                                    //     // this._filterPieChartData(coachDash.teamDetailInfo);
                                                    // })}
                                                    onPress={() => { setDropDownSelectedVal('Complete'), setShowSessionDropDown(false) }}
                                                >
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 15, lineHeight: 16,
                                                        fontFamily: Fonts.Bold,
                                                    }}>Complete</Text>

                                                </TouchableOpacity>
                                            </View>


                                        </View>

                                        {/* {/ </BlurView> /} */}
                                    </TouchableOpacity>
                                </Modal>
                                : null
                            }
                        </View>


                    </View>
                </View>
                <ScrollView
                    bounces={false}
                    style={{ paddingBottom: wide * 0.04 }}

                >
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',

                    }}>


                        <FlatList

                            data={teamData}

                            showsHorizontalScrollIndicator={false}
                            horizontal
                            pagingEnabled={true}

                            legacyImplementation={false}

                            keyExtractor={item => item.index}
                            renderItem={(item) =>
                                <TouchableOpacity onPress={() => { setTeamID(item.item.teamId), setSelectTeam(item.index) }}>


                                    <ImageBackground
                                        style={{
                                            height: wide * 0.18,
                                            width: wide * 0.18,
                                            marginRight: wide * 0.02,
                                        }}


                                        source={
                                            item.index == selectTeam ?
                                                require('../../Images/selectedTeam.png')
                                                :
                                                require('../../Images/unselectedteam.png')
                                        }
                                    >
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            flex: 1
                                        }}>
                                            {item.item.teamLogoUrl == null ? <Image
                                                source={require('../../Images/selectedTeam.png')}
                                                style={{
                                                    width: wide * 0.066,
                                                    height: wide * 0.066
                                                }}
                                            /> :
                                                <FastImage
                                                    source={{ uri: item.item.teamLogoUrl }}
                                                    style={{
                                                        width: wide * 0.066,
                                                        height: wide * 0.066
                                                    }}
                                                />

                                            }
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            } />

                    </View>
{teamId!=undefined?
<CoachAssignPlayerList teamId={teamId}  assignTo={assignTo} typeOfSubscription={typeOfSubscription} challengeId={challengeId} notes={notes}  />
:
null
}



                    <AppLoader visible={loading} />
                </ScrollView>

            </SafeAreaView >
        </View>
    );
}



function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.home
    };
}

export default connect(mapStateToProps)(CoachAssignPlayer);

