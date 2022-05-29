
import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView, Image, key,
    Alert, KeyboardAvoidingView, FlatList, TextInput, StyleSheet, Keyboard, Platform
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

import { addPlayerToTeam, getPlayerss, getInitialPlayerss } from '../../actions/home';
import { getObject, setObject, remove } from '../../middleware';
import FastImage from 'react-native-fast-image';
import { showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';

let wide = Layout.width;
var pageNum = 1

class CoachAddPlayer extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            arrPlayers: [],
            selectedIndex: 0,
            starCount: 3.5,
            lastLat: 0,
            lastLong: 0,
            srchTxt: '',
        };
    }
    componentDidMount() {
        pageNum = 1
        this.onScreenFocus();
        // getObject('userLoc').then((res) => {
        //     if (res) {
        //         this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
        //             this.getPlayers('')
        //         })

        //     } else {
        //         this.getUserCurrentLocation()
        //     }
        // })
    }

    onScreenFocus = async () => {
        const res = await Permission.checkPermission(PERMISSION_TYPE.location);
        const res1 = await Permission.checkPermission(PERMISSION_TYPE.locationWhenInUse);
        if (res) {
            debugger
            getObject('userLoc').then((res) => {
                if (res) {
                    this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
                        this.getPlayers('')
                    })

                } else {
                    this.getUserCurrentLocation()
                }
            })
        } else {
            if (res1) {
                getObject('userLoc').then((res) => {
                    if (res) {
                        this.setState({ cityName: res.name, lastLat: res.lat, lastLong: res.lng }, () => {
                            this.getPlayers('')
                        })

                    } else {
                        this.getUserCurrentLocation()
                    }
                })

            } else {
                debugger
                remove('userLoc');
                if (Platform.OS == 'ios') {
                    showAppPermissionAlert("Alert", "You have not granted location permission.")
                }
            }

        }
    }

    getUserCurrentLocation = () => {
        try {
            // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.watchID = Geolocation.getCurrentPosition((position) => {
                this.setState({
                    lastLat: position.coords.latitude, lastLong: position.coords.longitude
                }, () => {
                    this.getPlayers('')
                })
                setObject('userLoc', {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })

            }, (error) => {
                console.log(error)
                debugger
            }, {

            });
        }
        catch (err) {
            debugger
            // console.warn(err)
        }
    }
    // edited by keshav (initialplayer)
    getPlayers = (strSearch) => {
        const {
            lastLat
            , lastLong } = this.state;
        debugger;
        // if (!this.state.isDataAllFetched) {

        getObject('UserId').then((obj) => {
            // this.setState({ loading: true }, () => {
            if (strSearch === '' || strSearch === null || strSearch === undefined) {
                this.setState({ loading: true }, () => {
                    this.props.dispatch(getInitialPlayerss(obj, pageNum, {
                        "name": "Loc",
                        "loc": {
                            "type": "Point",
                            "coordinates": [
                                lastLong,
                                lastLat
                            ]
                        }
                    }, (res, resData) => {
                        //console.log(resData);
                        if (res) {
                            //   this.setState({ isDataAllFetched: true })
                            // }

                            this.setState({ loading: false, arrPlayers: resData })


                        }
                    }))
                })

            } else {
                this.props.dispatch(getPlayerss(obj, strSearch, {
                    "name": "Loc",
                    "loc": {
                        "type": "Point",
                        "coordinates": [
                            lastLong,
                            lastLat
                        ]
                    }
                }, (res, resData) => {
                    //console.log(resData);
                    if (res) {
                        //   this.setState({ isDataAllFetched: true })
                        // }

                        this.setState({ loading: false, arrPlayers: resData })


                    }
                }))
            }
            // })

        })
        // })
        //}
    }


    // getPlayers = (strSearch) => {
    //     const {
    //         lastLat
    //         , lastLong } = this.state;
    //     // if (!this.state.isDataAllFetched) {
    //     getObject('UserId').then((obj) => {
    //         // this.setState({ loading: true }, () => {
    //         this.props.dispatch(getPlayerss(obj, strSearch, {
    //             "name": "Loc",
    //             "loc": {
    //                 "type": "Point",
    //                 "coordinates": [
    //                     lastLong,
    //                     lastLat
    //                 ]
    //             }
    //         }, (res, resData) => {
    //             //console.log(resData);
    //             if (res) {
    //                 //   this.setState({ isDataAllFetched: true })
    //                 // }

    //                 this.setState({ arrPlayers: resData })


    //             }
    //         }))
    //     })

    //     // })
    //     //}
    // }

    addPlayerToPosition = (item) => {
        // console.log(item);
        // console.log(this.props.navigation.state.params.teamDetails, this.props.navigation.state.params.playerDetails.index);
        var objec = {
            "playerId": item.playerId,
            "playerName": item.firstName + ' ' + item.lastName,
            "playingPosition": this.props.navigation.state.params.playerDetails.playingPosition,
            "index": this.props.navigation.state.params.playerDetails.index,
            "acceptedAt": Date.now()
        }
        // getObject('UserId').then((obj) => {
        this.setState({ loading: true }, () => {
            this.props.dispatch(addPlayerToTeam(this.props.navigation.state.params.teamDetails.teamId, objec, (res, resData) => {
                // console.log(resData); // Need to change here showing alert on api fail also
                // this.setState({ loading: false }, () => {
                // setTimeout(() => {
                if (res) {
                    this.setState({ loading: false }, () => {
                        setTimeout(() => {
                            Navigation.back();
                        }, 200);

                    })
                    // Alert.alert(
                    //     'Alert',
                    //     'Player added to the position',
                    //     [
                    //         { text: 'OK', onPress: () => { Navigation.back() } },
                    //     ],
                    //     { cancelable: false },
                    // );
                } else {
                    Alert.alert(
                        'Alert',
                        'Something went wrong. Please try again!',
                        [
                            {
                                text: 'OK', onPress: () => this.setState({ loading: false }, () => {
                                    Navigation.back();

                                })
                            },
                        ],
                        { cancelable: false },
                    );
                }


                // }, 1000)
                // })


            }))
        })
        // })

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
    _renderTrainer = ({ item }) => {

        return (
            // <View  >
            //     <View style={{ marginTop: wide * 0.03 }}>
            //         <Image style={{
            //             position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
            //         }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

            //         <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            //             <Text style={{
            //                 color: Colors.light, fontSize: 16, fontFamily: Fonts.SemiBold,
            //                 marginHorizontal: 15
            //             }}>{item.rank}</Text>
            //             <View style={{
            //                 width: wide * 0.15, height: wide * 0.15,
            //                 borderRadius: wide * 0.15 / 2, borderWidth: 3,
            //                 borderColor: Colors.borderColor,
            //                 justifyContent: 'center', alignItems: 'center'
            //             }}>
            //                 <FastImage style={{
            //                     width: '80%', height: '80%',
            //                     borderRadius: wide * 0.15 / 2,
            //                 }}
            //                     resizeMode={'contain'}
            //                     source={{ uri: item.imageUrl }} />
            //             </View>

            //             <View style={{ paddingLeft: 15 }}>
            //                 <Text style={{
            //                     color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
            //                     marginLeft: 5
            //                 }}>{item.name}</Text>

            //                 {/* <Text style={{
            //                     color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
            //                     marginLeft: 5, marginVertical: 6
            //                 }}>
            //                     EXP - 3 YEARS
            //                 </Text> */}

            //             </View>
            //             <View style={{ flex: 1 }} />
            //             {/* <View style={{ paddingHorizontal: 20 }}>
            //                 <Image style={{
            //                     width: wide * 0.07, height: wide * 0.07,

            //                 }} resizeMode={'stretch'} source={item.index % 2 == 0 ? require('../../Images/sort_tick_selected.png') : require('../../Images/tick_unselected.png')} />

            //             </View> */}
            //         </View>
            //     </View>

            // </View>
            <TouchableOpacity style={{
                marginTop: wide * 0.03,
                // backgroundColor: 'red'
            }} onPress={() =>
                this.addPlayerToPosition(item)
            }>

                <Image style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '90%'
                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

                <View style={{ marginTop: wide * 0.02, marginHorizontal: 8, }}>
                    {/* <Image style={{
                                        position: 'absolute', top: 0, bottom: 0, left: 0,
                                         right: 0, width: '100%', height: '100%'
                                    }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} /> */}
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{
                            // backgroundColor: 'green',
                            width: wide * 0.22, height: wide * 0.28
                        }}>
                            {item.profilePictureUrl === null || item.profilePictureUrl === '500 Error' ?
                                <Image
                                    style={{
                                        width: wide * 0.2, height: wide * 0.25,
                                        borderRadius: wide * 0.02, borderWidth: 4,
                                        borderColor: Colors.newGrayFontColor,
                                        // marginBottom: item.pgs !== null ? 10 : null,
                                    }}
                                    resizeMode={'cover'}
                                    source={require('../../Images/placeHolderProf.png')}
                                />
                                :
                                <FastImage style={{
                                    width: wide * 0.2, height: wide * 0.25,
                                    borderRadius: wide * 0.03, borderWidth: 4,
                                    borderColor: Colors.newGrayFontColor,
                                    // marginBottom: item.pgs !== null ? 10 : null,
                                }}
                                    resizeMode={'cover'}
                                    source={{ uri: item.profilePictureUrl }}
                                />
                            }
                            {/* <TouchableOpacity style={{
                                width: wide * 0.2, height: wide * 0.18,
                                bottom: 0,
                                // bottom: item?.firstName !== null ? 0 : 10,
                                position: 'absolute',
                                alignItems: 'center',
                                // backgroundColor: 'green'
                            }}>
                                <Image style={{
                                    width: wide * 0.2, height: wide * 0.16,
                                    borderRadius: wide * 0.03,

                                }}
                                    resizeMode={'stretch'}
                                    source={require('../../Images/edit_profile_gradiant.png')}
                                />
                                <View style={{ marginTop: -wide * 0.03 }}>
                                    <Text
                                        style={{ bottom: 10, color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12 }} >
                                        #{item.ranking} | {item.position}
                                    </Text>
                                </View>
                            </TouchableOpacity> */}

                        </View>


                        <View style={{
                            marginHorizontal: wide * 0.05,
                            flex: 1,
                        }}>
                            <View >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}>

                                    <View>
                                        <Text style={{

                                            color: Colors.light, fontSize: 20,
                                            fontFamily: Fonts.Regular,
                                        }}>
                                            {item.firstName} {item.lastName}

                                        </Text>
                                        {/* <Text style={{
                                            color: Colors.light, fontSize: 20, fontFamily: Fonts.Bold
                                        }}>
                                            {item.lastName}
                                        </Text> */}
                                    </View>
                                    {/* <View style={{ flex: 1 }} /> */}
                                    {/* <Image
                                        source={require("../../Images/Los_Angeles_Lakers_logo.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: wide * 0.12,
                                            height: wide * 0.12,

                                        }} {Object.keys(item.pgs)[0]?.toUpperCase()}
                                            {Object.values(item.pgs)[0]}
                                            {Object.keys(item.pgs)[1]?.toUpperCase()}
                                            {Object.values(item.pgs)[1]}
                                            {Object.keys(item.pgs)[2]?.toUpperCase()}
                                            {Object.values(item.pgs)[2]}
                                    ></Image> */}

                                </View>
                                {/* kpiValues key changes to pgs */}
                                {item.pgs !== null ?
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '100%', marginTop: wide * 0.03,
                                        justifyContent: 'space-between'
                                    }}>
                                        <View >
                                            <Text style={styles.textPointHeading}>{Object.keys(item.pgs)[0]?.toUpperCase()}</Text>
                                            <Text style={styles.textPoint}>
                                                {Object.values(item.pgs)[0]}
                                            </Text>
                                        </View>
                                        <View >
                                            <Text style={styles.textPointHeading}>{Object.keys(item.pgs)[1]?.toUpperCase()}</Text>
                                            <Text style={styles.textPoint}>
                                                {Object.values(item.pgs)[1]}
                                            </Text>
                                        </View>
                                        <View >
                                            <Text style={styles.textPointHeading}>{Object.keys(item.pgs)[2]?.toUpperCase()}</Text>
                                            <Text style={styles.textPoint}>
                                                {Object.values(item.pgs)[2]}
                                            </Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={{
                                        flexDirection: 'row',
                                        width: '100%', marginTop: wide * 0.02,
                                        justifyContent: 'space-between'
                                    }}>
                                        <View >
                                            <Text style={styles.textPointHeading}>PPG</Text>
                                            <Text style={{
                                                color: Colors.light, fontSize: 28,
                                                lineHeight: 40,
                                                fontFamily: Fonts.Bold,
                                                marginTop: 6,
                                                marginHorizontal: 8,
                                            }}>
                                                -
                                            </Text>
                                        </View>
                                        <View >
                                            <Text style={styles.textPointHeading}>RPG</Text>
                                            <Text style={{
                                                color: Colors.light, fontSize: 28,
                                                lineHeight: 40,
                                                fontFamily: Fonts.Bold,
                                                marginTop: 6,
                                                marginHorizontal: 8,
                                            }}>
                                                -
                                            </Text>
                                        </View>
                                        <View >
                                            <Text style={styles.textPointHeading}>APG</Text>
                                            <Text style={{
                                                color: Colors.light, fontSize: 28,
                                                lineHeight: 40,
                                                fontFamily: Fonts.Bold,
                                                marginTop: 6,
                                                marginHorizontal: 8,
                                            }}>
                                                -
                                            </Text>
                                        </View>
                                    </View>
                                }

                                {/* <View style={{
                                    flexDirection: 'row',
                                    width: '100%', marginTop: wide * 0.06,
                                    justifyContent: 'space-between'
                                }}>

                                    <View >
                                        <Text style={{
                                            color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

                                        }}>PPG</Text>
                                        <Text style={{
                                            color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
                                            marginTop: 6,
                                        }}>
                                            35
                                        </Text>
                                    </View>
                                    <View >
                                        <Text style={{
                                            color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

                                        }}>RPG</Text>
                                        <Text style={{
                                            color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
                                            marginTop: 6,
                                        }}>
                                            6
                                        </Text>
                                    </View>
                                    <View >
                                        <Text style={{
                                            color: Colors.fontColorGray, fontSize: 13,
                                            fontFamily: Fonts.Bold,

                                        }}>APG</Text>
                                        <Text style={{
                                            color: Colors.light, fontSize: 22,
                                            fontFamily: Fonts.Bold,
                                            marginTop: 6,
                                        }}>
                                            4
                                        </Text>
                                    </View>
                                </View> */}
                            </View>
                        </View>
                        {/* <AppLoader visible={this.state.loading} /> */}


                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {

        const { arrPlayers } = this.state
        console.log("Dattaaaa", arrPlayers);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
                    <TouchableOpacity style={{ marginHorizontal: 15, width: wide * 0.1, }}
                        onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{
                        color: Colors.light, fontSize: 18,
                        lineHeight: 28,
                        fontFamily: Fonts.Bold, textAlign: 'left', position: 'absolute', alignSelf: 'center', marginTop: wide * 0.08,
                    }}>{this.props.navigation.state.params.playerDetails.playingPosition}</Text>
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>

                    <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >

                        <View style={{ marginTop: wide * 0.05, marginHorizontal: 15, flexDirection: 'row' }}>
                            {/* <Text numberOfLines={1} style={{
                                color: Colors.light, fontSize: 18,
                                lineHeight: 28,
                                fontFamily: Fonts.Regular, textAlign: 'left'
                            }}>{this.props.navigation.state.params.teamDetails.name}</Text>
                            <View style={{ flex: 1 }} /> */}

                            <TextInput style={{
                                borderWidth: 3, borderColor: Colors.borderColor,
                                fontFamily: Fonts.Bold, height: 60, paddingHorizontal: 10,
                                borderRadius: 5, color: Colors.light, fontSize: 16, width: '100%'
                            }}
                                value={this.state.srchTxt}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholder={"SEARCH"}
                                placeholderTextColor={Colors.borderColor}
                                onChangeText={(e) => {
                                    this.setState({ srchTxt: e }, () => {
                                        if (e.length == 0) {
                                            Keyboard.dismiss();
                                        }
                                        this.getPlayers(e)
                                    })
                                }}

                            />

                            {this.state.srchTxt == '' ?
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    width: 20, height: 20, right: wide * 0.04, top: wide * 0.04,
                                    justifyContent: 'center', alignItems: 'center'
                                }}
                                    activeOpacity={1}
                                >
                                    <Image
                                        style={{
                                            // position: 'absolute',
                                            width: 20, height: 20, //right: wide * 0.05, //top: wide * 0.05
                                        }}
                                        source={require('../../Images/search_ico.png')}
                                        resizeMode={'contain'}
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    width: 20, height: 20, right: wide * 0.04, top: wide * 0.04,
                                    justifyContent: 'center', alignItems: 'center',
                                    // backgroundColor: 'green'
                                }}
                                    activeOpacity={1}
                                    onPress={() => {
                                        this.setState({
                                            srchTxt: ''
                                        }, () => {
                                            Keyboard.dismiss();
                                            this.getPlayers('')
                                        })
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        lineHeight: 24, fontFamily: Fonts.Bold,
                                        color: Colors.light
                                    }}>X</Text>
                                </TouchableOpacity>
                            }

                            {/* <Image style={{
                                position: 'absolute',
                                width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
                            }} source={require('../../Images/search_ico.png')} /> */}
                        </View>



                        <View style={{ flex: 1, marginHorizontal: 15 }}>

                            <FlatList
                                data={arrPlayers}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                initialNumToRender={20}
                                // onEndReachedThreshold={0.1}
                                // onEndReached={() => {
                                //     pageNum = pageNum + 1
                                //     this.getPlayers()
                                // }}


                                style={{
                                    marginTop: wide * 0.03, marginBottom: wide * 0.03,
                                    // backgroundColor: 'green'
                                }}

                                renderItem={(item, index) => this._renderTrainer(item, index)}
                            />
                        </View>

                    </View>
                    <AppLoader visible={this.state.loading} />
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

export default connect(mapStateToProps)(CoachAddPlayer);

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
        color: Colors.fontColorGray, fontSize: 17, fontFamily: Fonts.SemiBold,
    },
    textPointCenter: {
        color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
        marginTop: 6, textAlign: 'center'
    },
});