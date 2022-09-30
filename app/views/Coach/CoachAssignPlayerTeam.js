
import React, { Component, useState, useEffect } from 'react';
import {
    View, TouchableOpacity, ImageBackground, Text, SafeAreaView, Image, key,
    Alert, KeyboardAvoidingView, FlatList, TextInput, StyleSheet, Keyboard, Platform, ScrollView
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import {
    assignPlayersChallenge,assignPlayersRoadToPro
} from '../../actions/home';

import { addPlayerToTeam, getPlayerss, getInitialPlayerss } from '../../actions/home';
import { getObject, setObject, remove } from '../../middleware';
import FastImage from 'react-native-fast-image';
import { showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import AnimatedInput from '../../Helpers/react-native-animated-input';


let wide = Layout.width;

const CoachAssignPlayerTeam = (props) => {

    const [loading, setLoading] = useState(false)
    const [selectData, setSelectData] = useState()
    const [selectedPlayerList, setSelectedPlayerList] = useState(props.navigation.state?.params?.selectedPlayer)
    const [playerDataList, setPlayerData] = useState(props.navigation.state?.params?.playerData)
    const [categoryList, setCategoryList] = useState()
    const [createrId, setCreaterId] = useState()


    console.log("selected", props.navigation.state?.params?.selectedPlayer)
    console.log("player", props.navigation.state?.params?.playerData)


    var postDataArray = []
    var datapostarray = [{
        "creatorId": 165942821142500,
        "typeOfSubscription": "CHALLENGE",
        "playerId": 165950953779006,
        "teamId": 166323313840706,
        "StartDate": 1656941178469,
        "notes": "swdwdw",
        "challengeSubscriptionInfo": {
            "challengeId": 166220531017003
        }
    },
    {
        "creatorId": 165942821142500,
        "typeOfSubscription": "CHALLENGE",
        "playerId": 165950953779006,
        "teamId": 166323313840706,
        "StartDate": 1656941178469,
        "notes": "swdwdw",
        "challengeSubscriptionInfo": {
            "challengeId": 166220531017003
        }
    }]

    const selectedPlayerIds = props.navigation.state?.params?.selectedPlayerIds
    const selectedPlayer = props.navigation.state?.params?.selectedPlayer
    const playerData = props.navigation.state?.params?.playerData




    const teamId = props.navigation.state?.params?.teamId
    const typeOfSubscription = props.navigation.state?.params?.typeOfSubscription
    const challengeId = props.navigation.state?.params?.challengeId
    const notes = props.navigation.state?.params?.notes
    const startDate = props.navigation.state?.params?.startDate


    console.log("eysa", challengeId)




    const postData = () => {
        console.log("selectedData", selectedPlayer)



        if (typeOfSubscription == "CHALLENGE") {
            setLoading(true)
            selectedPlayer.map(element => {
                var temData = {
                    "creatorId": createrId,
                    "typeOfSubscription": typeOfSubscription,
                    "playerId": element.playerId,
                    "teamId": teamId,
                    "StartDate": 1656941178469,
                    "notes": notes,
                    "challengeSubscriptionInfo": {
                        "challengeId": challengeId
                    }
                }
                postDataArray.push(temData)
            }
            )
            console.log("postDataArray", postDataArray)
            console.log("datapostarray", datapostarray)

            props.dispatch(assignPlayersChallenge(postDataArray, (res, data) => {
                if (res) {
                    setLoading(false)


                    console.log("uploaded Data=", data)


                }

            }))

        }else{
            setLoading(true)
            selectedPlayer.map(element => {
                var temData = {
                    "creatorId": createrId,
                    "typeOfSubscription": typeOfSubscription,
                    "playerId": element.playerId,
                    "teamId": teamId,
                    "StartDate": 1656941178469,
                    "notes": notes,
                    "roadToProSubscription": {
                        "roadToProId": challengeId
                    }
                }
                postDataArray.push(temData)
            }
            )
            console.log("postDataArray", postDataArray)
            console.log("datapostarray", datapostarray)

            props.dispatch(assignPlayersRoadToPro(postDataArray, (res, data) => {
                if (res) {
                    setLoading(false)


                    console.log("uploaded Data=", data)


                }

            }))

        }



    }


    getObject('UserId').then((obj) => {


        setCreaterId(obj)
    })






    var filterSelectedPlayer = selectedPlayer.map(element => {
        return element.positions
    }
    )




    useEffect(() => {

        var newplayerid = playerData.filter(obj => {

            if (filterSelectedPlayer.includes(obj.teamPosition)) {
                return obj
            }
        })
        setCategoryList(newplayerid)


    }, [])



    const renderPlayer = ({ item, index }) => {

        var data = selectedPlayerList.filter(obj => {
            return obj.positions == item.teamPosition;
        })




        return (
            <>

                <View style={{
                    flexDirection: 'row',
                    height: wide * 0.1,
                    width: '100%',
                    borderRadius: wide * 0.025,
                    backgroundColor: Colors.playerCategoryBg,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: wide * 0.05,

                }}>
                    <Text style={{
                        color: Colors.light, fontSize: 16, lineHeight: 24,
                        fontFamily: Fonts.SemiBold,
                        marginHorizontal: wide * 0.04,
                        marginTop: wide * 0.004
                    }}>{item.teamPosition}</Text>
                    <TouchableOpacity

                        style={{
                            width: '25%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: wide * 0.02,
                        }}
                        activeOpacity={1}
                    >


                        {/* <Text style={{
                color: Colors.btnBg, fontSize: 16, lineHeight: 20,
                fontFamily: Fonts.Medium, marginHorizontal: wide * 0.006,
                fontWeight: '500'
            }}>Select</Text> */}

                    </TouchableOpacity>


                </View>


                <FlatList
                    data={data}
                    numColumns={4}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(item1, index) => (<View>
                        <View style={{
                            marginBottom: wide * 0.03,
                            marginTop: wide * 0.05,
                            marginRight: wide * 0.04,
                        }}>
                            <TouchableOpacity style={{ marginBottom: -wide * 0.04, zIndex: 3, elevation: 3, marginRight: wide * 0.02 }}
                                onPress={() => {


                                    var data1 = selectedPlayerList.filter(obj => {
                                        return obj.playerId != item1.item.playerId;
                                    })


                                    var isCategory = true

                                    data1.forEach(element => {
                                        debugger
                                        if (element.positions == item1.item.positions) {
                                            isCategory = false
                                        }
                                    })

                                    if (isCategory == true) {

                                        var category1 = categoryList.filter(obj => {
                                            return obj.teamPosition != item1.item.positions;
                                        })

                                        setCategoryList(category1)
                                    }


                                    setSelectedPlayerList(data1)


                                }}
                            >
                                <FastImage style={{
                                    width: 17, height: 17, borderRadius: wide * 0.14 / 2,
                                    alignSelf: 'flex-end',


                                }}

                                    source={require('../../Images/remove.png')}
                                />

                            </TouchableOpacity>
                            <View style={{
                                alignItems: 'center', justifyContent: 'center',
                                // marginTop: wide * 0.04,
                            }}>
                                <TouchableOpacity style={{
                                    // borderWidth: item.item.profilePictureUrl == null ? 1.5 : 0,
                                    // borderColor: item.item.profilePictureUrl == null ? Colors.newGrayFontColor : null,
                                    width: wide * 0.14,
                                    height: wide * 0.14,
                                    borderRadius: wide * 0.14 / 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    <FastImage style={{
                                        width: '98%', height: '98%', borderRadius: wide * 0.14 / 2,
                                        alignSelf: 'center'
                                    }}
                                        // resizeMode={'contain'}
                                        // source={{ uri: item.item.profilePictureUrl }}
                                        source={
                                            item1.item.playerProfilePictureUrl == "" ?
                                                require('../../Images/dummy2.png')
                                                :
                                                { uri: item1.item.playerProfilePictureUrl }

                                        }
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ width: wide * 0.18 }}
                                    activeOpacity={1}
                                >
                                    <Text style={{
                                        color: Colors.light, fontSize: 12,
                                        lineHeight: 11,
                                        fontFamily: Fonts.SemiBold,
                                        fontWeight: '600',
                                        marginTop: wide * 0.015,
                                        textAlign: 'center',
                                    }}>{item1.item.playerName}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>)
                    }
                />
            </>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{
                flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0,
                backgroundColor: Colors.base
            }}>
                <View>
                    <ScreenHeader
                        title={'Select Player'}
                        backButtonAction={() => Navigation.back()}
                    />
                </View>

                <ScrollView
                    bounces={false}
                    style={{ paddingBottom: wide * 0.04 }}

                >
                    <View style={{
                        width: '90%',
                        alignSelf: 'center',

                    }}>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>

                            <FlatList
                                style={{
                                    flex: 1
                                }}
                                data={categoryList}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                                renderItem={(item, index) => renderPlayer(item, index)}

                            />
                        </View>

                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: wide * 0.8,
                            height: 48,
                            backgroundColor: Colors.btnBg,
                            alignSelf: 'center', borderRadius: 24,
                            justifyContent: 'center',
                            marginTop: wide * 0.08,
                            // position: 'absolute',
                            // bottom: 50,

                        }}
                        onPress={() => postData()}
                    >
                        <Text style={{
                            alignSelf: 'center', color: Colors.light,
                            fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                            fontWeight: '700',
                        }}>Assign Changes</Text>
                    </TouchableOpacity>

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

export default connect(mapStateToProps)(CoachAssignPlayerTeam);


