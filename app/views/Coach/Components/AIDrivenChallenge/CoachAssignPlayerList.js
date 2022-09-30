
import React, { Component, useState, useEffect } from 'react';
import {
    View, TouchableOpacity, ImageBackground, Text, SafeAreaView, Image, key,
    Alert, KeyboardAvoidingView, FlatList, TextInput, StyleSheet, Modal, Keyboard, Platform, ScrollView
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../../../constants';
import FastImage from 'react-native-fast-image';
import {
    getNewCoachTeam, getListOfPlayers
} from '../../../../actions/home';
import { connect } from 'react-redux';
import AppLoader from '../../../../utils/Apploader';
import Navigation from '../../../../lib/Navigation';



const CoachAssignPlayerList = (props) => {

    const [playerData, setPlayerData] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedCategory, setselectedCategory] = useState([])
    const [selectedPlayerIds, setSelectedPlayerIds] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState([])
    const [availablePlayList, setAvailablePlayList] = useState([])








    let wide = Layout.width;
    let high = Layout.height;
    var assignTo = props.assignTo
    var teamId = props.teamId
    var typeOfSubscription = props.typeOfSubscription
    var challengeId = props.challengeId
    var notes = props.notes
    var startDate = "121212121212"


var selectedPlayerTeam=[]


    useEffect(() => {
        setLoading(true)
        props.dispatch(getListOfPlayers(props.teamId, "2020-21", (res, data) => {
            if (res) {
                setLoading(false)
                setPlayerData(data)
            }

        }))
    }, [props.teamId])


    const selectPlayerByCatgory = (category) => {


        var playerid = selectedPlayerIds
        var player = selectedPlayer;
        var cat = selectedCategory;

        if (cat.includes(category.teamPosition)) {
            var newCat = cat.filter(obj => {
                return obj != category.teamPosition;
            })

            var cat_player_id = category.availablePlayersList.map(element => {
                return element.playerId
            }
            );

            var newplayerid = playerid.filter(obj => {
                if (cat_player_id.includes(obj)) {

                } else {
                    return obj
                }
            })



            var newPlayer = player.filter(obj => {
                if (category.availablePlayersList.includes(obj)) {

                } else {
                    return obj
                }
            })



            setselectedCategory(newCat)
            setSelectedPlayerIds(newplayerid)
            setSelectedPlayer(newPlayer)

        } else {
            cat.push(category.teamPosition)



            category.availablePlayersList.map(element => {
                if (!playerid.includes(element.playerId)) {
                    playerid.push(element.playerId)
                }
            }
            );

            category.availablePlayersList.map(element => {
                if (!player.includes(element)) {
                    player.push(element)
                }
            }
            );

            var newCat = cat.filter(obj => {
                return obj
            })
            var newPlayer = player.filter(obj => {
                return obj
            })
            var newPlayerId = playerid.filter(obj => {
                return obj
            })




            setselectedCategory(newCat)
            setSelectedPlayerIds(newPlayerId)
            setSelectedPlayer(newPlayer)


        }

    }
    const selectSinglePlayer = (playerObj, position) => {
        var playerid1 = selectedPlayerIds
        var player1 = selectedPlayer;
        var cat = selectedCategory;

        if (playerid1.includes(playerObj.playerId)) {


            var newplayerid1 = playerid1.filter(obj => {
                return obj != playerObj.playerId;
            })

            var Newplayer1 = player1.filter(obj => {
                return obj != playerObj
            })


            setSelectedPlayerIds(newplayerid1)
            setSelectedPlayer(Newplayer1)


        } else {
            player1.push(playerObj)
            playerid1.push(playerObj.playerId)



            var newPlayer = player1.filter(obj => {
                return obj
            })
            var newPlayerId = playerid1.filter(obj => {
                return obj
            })









            setSelectedPlayerIds(newPlayerId)
            setSelectedPlayer(newPlayer)

        }





    }




    return (
        <View>
            <AppLoader visible={loading} />
            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: wide * 0.04,
                    width: '90%',
                    alignSelf: 'center',
                }}>

                    <FlatList
                        style={{
                            flex: 1
                        }}
                        data={playerData}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        renderItem={(item, index) =>
                            <>

                            {
                            
                            item.item.availablePlayersList!=null?
                            item.item.availablePlayersList.length!=0?

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
                                    }}>{item.item.teamPosition}</Text>

                                    {assignTo == "Player" ?
                                        <TouchableOpacity

                                            style={{
                                                width: '25%',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: wide * 0.02,
                                            }}
                                            activeOpacity={1}
                                            onPress={() => { selectPlayerByCatgory(item.item) }}
                                        >


                                            <Text style={{
                                                color: Colors.btnBg, fontSize: 16, lineHeight: 20,
                                                fontFamily: Fonts.Medium, marginHorizontal: wide * 0.006,
                                                fontWeight: '500'
                                            }}>Select</Text>

                                        </TouchableOpacity>
                                        :
                                        null
                                    }
                                </View>
:
null
:
null
                        }

{setAvailablePlayList(item.item.availablePlayersList)}
                                <FlatList
                                    data={item.item.availablePlayersList}
                                    numColumns={4}
                                    scrollEnabled={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={(item1, index) => (<View>
                                        <>



                                            <View style={{
                                                marginBottom: wide * 0.03,
                                                marginTop: wide * 0.05,
                                                marginRight: wide * 0.04,
                                            }}>

                                                {selectedPlayerIds.includes(item1.item.playerId) || assignTo == "Team" ?
                                                    <View style={{ marginBottom: -wide * 0.04, zIndex: 3, elevation: 3, marginRight: wide * 0.02 }}>
                                                        <FastImage style={{
                                                            width: 17, height: 17, borderRadius: wide * 0.14 / 2,
                                                            alignSelf: 'flex-end',


                                                        }}
                                                            // resizeMode={'contain'}
                                                            // source={{ uri: item.item.profilePictureUrl }}
                                                            source={require('../../../../Images/select.png')}
                                                        />

                                                    </View>
                                                    :
                                                    null



                                                }

                                                <View style={{
                                                    alignItems: 'center', justifyContent: 'center',
                                                    // marginTop: wide * 0.04,
                                                }}>
                                                    {assignTo == "Player" ?
                                                        <TouchableOpacity style={{
                                                            // borderWidth: item.item.profilePictureUrl == null ? 1.5 : 0,
                                                            // borderColor: item.item.profilePictureUrl == null ? Colors.newGrayFontColor : null,
                                                            width: wide * 0.14,
                                                            height: wide * 0.14,
                                                            borderRadius: wide * 0.14 / 2,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}

                                                            onPress={() => { selectSinglePlayer(item1.item, item.item.teamPosition) }}

                                                        >
                                                            <FastImage style={{
                                                                width: '98%', height: '98%', borderRadius: wide * 0.14 / 2,
                                                                alignSelf: 'center'
                                                            }}
                                                                // resizeMode={'contain'}
                                                                // source={{ uri: item.item.profilePictureUrl }}

                                                                source={
                                                                    item1.item.playerProfilePictureUrl == "" ?
                                                                        require('../../../../Images/dummy2.png')
                                                                        :
                                                                        { uri: item1.item.playerProfilePictureUrl }

                                                                }
                                                            />
                                                        </TouchableOpacity>

                                                        :
                                                        <View style={{
                                                            // borderWidth: item.item.profilePictureUrl == null ? 1.5 : 0,
                                                            // borderColor: item.item.profilePictureUrl == null ? Colors.newGrayFontColor : null,
                                                            width: wide * 0.14,
                                                            height: wide * 0.14,
                                                            borderRadius: wide * 0.14 / 2,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}

                                                            onPress={() => { selectSinglePlayer(item1.item, item.item.teamPosition) }}

                                                        >
                                                            <FastImage style={{
                                                                width: '98%', height: '98%', borderRadius: wide * 0.14 / 2,
                                                                alignSelf: 'center'
                                                            }}
                                                                // resizeMode={'contain'}
                                                                // source={{ uri: item.item.profilePictureUrl }}

                                                                source={
                                                                    item1.item.playerProfilePictureUrl == "" ?
                                                                        require('../../../../Images/dummy2.png')
                                                                        :
                                                                        { uri: item1.item.playerProfilePictureUrl }

                                                                }
                                                            />
                                                        </View>}
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
                                        </>
                                    </View>)
                                    }
                                />
                            </>
                        }

                    />
                </View>

                {assignTo == "Player" && playerData!=undefined?
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

                        onPress={() => {

                            Navigation.navigate('CoachAssignPlayerTeam', {
                                selectedPlayerIds: selectedPlayerIds, selectedPlayer: selectedPlayer, playerData: playerData, assignTo: assignTo, teamId: teamId, typeOfSubscription: typeOfSubscription, challengeId: challengeId, notes: notes, startDate: startDate
                            })







                        }}

                    >
                        <Text style={{
                            alignSelf: 'center', color: Colors.light,
                            fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                            fontWeight: '700',
                        }}>Next</Text>
                    </TouchableOpacity>
                    :
                    playerData!=undefined?
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: wide * 0.8,
                            height: 48,
                            backgroundColor: Colors.btnBg,
                            alignSelf: 'center', borderRadius: 24,
                            justifyContent: 'center',
                            marginTop: wide * 0.08,
                        }}

                        onPress={() => {



                            playerData.map(element => {
                                if (element.availablePlayersList != null) {
                                    element.availablePlayersList.map(element1 => {
                                      
                                        selectedPlayerTeam.push(element1)
                                    }
                                    );
                                }
                            }
                            );


                            Navigation.navigate('CoachAssignPlayerTeam', {
                                selectedPlayerIds: selectedPlayerIds, selectedPlayer: selectedPlayerTeam, playerData: playerData, assignTo: assignTo, teamId: teamId, typeOfSubscription: typeOfSubscription, challengeId: challengeId, notes: notes, startDate: startDate
                            })







                        }}

                    >
                        <Text style={{
                            alignSelf: 'center', color: Colors.light,
                            fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                            fontWeight: '700',
                        }}>Next</Text>
                    </TouchableOpacity>
                :
                null    
                
                }
            </View>

        </View>

    )
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.home
    };
}

export default connect(mapStateToProps)(CoachAssignPlayerList);
