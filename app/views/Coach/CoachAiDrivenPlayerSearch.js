import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Image, ImageBackground, FlatList,Modal } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
    getAIDrivenPlayerSearch
} from '../../actions/home';
import { getObject } from '../../middleware';
import { BlurView } from "@react-native-community/blur";
const CoachAiDrivenPlayerSearch = (props) => {

    const teamId = props.navigation.state?.params?.teamId
    const challengeId = props.navigation.state?.params?.challengeId


    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState(false)
    const [searchFlag, setSearchFlag] = useState(false)
    const [data, setData] = useState(false)
    const [dropDownSelectedVal, setDropDownSelectedVal] = useState('Active')
    const [showSessionDropDown, setShowSessionDropDown] = useState(false)





    function getSeacrhData(search1) {

        setLoading(true)

        props.dispatch(getAIDrivenPlayerSearch(teamId, challengeId, search1, (result, response) => {

            if (result) {
                setLoading(false)

                console.log("eysadata", response.listPlayersForAssignedChallengeList)
                setData(response.listPlayersForAssignedChallengeList)
            } else {
                setLoading(false)
                console.log("eysadata", result)
            }
        }))


    }

    let wide = Layout.width;
    let high = Layout.height;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />

                <View>

                    <ScreenHeader
                        title={'Search'}
                        backButtonAction={() => Navigation.back()}
                    />


                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
                    behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <View>

                        <View style={{
                            borderColor: 'rgba(255, 255, 255, 0.24)',
                            borderWidth: 1,
                            marginHorizontal: 24,
                            height: wide * 0.13,
                            flexDirection: 'row'





                        }}>
                            <View
                                style={{
                                    marginHorizontal: wide * 0.03,
                                    flex: 4,

                                }}>
                                <TextInput
                                    placeholder='Search Players'
                                    placeholderTextColor='rgba(255, 255, 255, 0.24)'

                                    style={{
                                        color: Colors.light,
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    onChangeText={(text) => setSearch(text)}



                                ></TextInput>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    style={{
                                        height: 50, flexDirection: 'row', alignItems: 'center',
                                        marginHorizontal: 24, marginBottom: 8,
                                    }}
                                    onPress={() => { getSeacrhData(search), setSearchFlag(true) }}
                                >
                                    <Image source={require("../../Images/search.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {searchFlag == false ?
                            <View style={{
                                justifyContent: 'center',

                                alignItems: 'center',
                                marginTop: wide * 0.3,
                            }}>
                                <Image
                                    style={{
                                        width: wide * 0.5
                                    }}
                                    source={require('../../Images/datablank.png')}
                                />
                                <Text style={{
                                    fontFamily: 'Metropolis',
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: Colors.light,
                                    marginTop: wide * 0.04
                                }}>No Players found yet</Text>
                            </View>
                            :
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: wide * 0.03, marginHorizontal: 24, }}>
                                    <View style={{ flex: 4 }}>
                                        <Text style={{
                                            color: Colors.light,
                                            fontWeight: '700',
                                            fontSize: 22
                                        }}>{data?.length} Players</Text>
                                    </View>
                                    <View style={{ flex: 2 }}>
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
                                    </View>
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

                                                            onPress={()=>{setDropDownSelectedVal('Active'),setShowSessionDropDown(false)}}
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
                                                            onPress={()=>{setDropDownSelectedVal('Pending'),setShowSessionDropDown(false)}}
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
                                                            onPress={()=>{setDropDownSelectedVal('Complete'),setShowSessionDropDown(false)}}
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

                                <View style={{ marginTop: wide * 0.03, marginHorizontal: 24, }}>
                                    <FlatList
                                        data={data}
                                        bounces={false}
                                        keyExtractor={item => item.index}
                                        renderItem={(item, index) =>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    height: wide * 0.3,
                                                    backgroundColor: '#23262F',
                                                    borderRadius: wide * 0.04,
                                                    marginBottom: wide * 0.04
                                                }}>
                                                <View style={{ flexDirection: 'row', margin: wide * 0.03 }}>
                                                    <View style={{ flexDirection: 'row', flex: 3 }}>
                                                        <Image
                                                            style={{
                                                                width: wide * 0.1,
                                                                height: wide * 0.1,
                                                                borderRadius: (wide * 0.1) / 2
                                                            }}
                                                            // source={{uri:item.item.playerProfilePicUrl}}
                                                            source={require("../../Images/apple.png")}
                                                        />
                                                        <View style={{ marginLeft: wide * 0.02, marginTop: wide * 0.02 }}>
                                                            <Text style={{
                                                                fontFamily: 'Metropolis',
                                                                fontSize: 13,
                                                                fontWeight: '700',
                                                                color: Colors.light
                                                            }}>eysa</Text>
                                                            <Text style={{
                                                                fontFamily: 'Metropolis',
                                                                fontSize: 12,
                                                                fontWeight: '500',
                                                                color: '#F7CB15',
                                                                marginTop: wide * 0.01
                                                            }}>8 days left</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1, backgroundColor: Colors.btnBg, borderRadius: wide * 0.02, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: wide * 0.07 }}>
                                                        <Image
                                                            style={{
                                                                width: 10,
                                                                height: 10
                                                            }}
                                                            source={
                                                                item.item.teamLogoUrl == null || item.item.teamLogoUrl == "" ?
                                                                    require("../../Images/active.png")
                                                                    :
                                                                    { uri: item.item.teamLogoUrl }
                                                            }
                                                        />
                                                        <Text style={{ color: Colors.light, fontSize: 15, fontWeight: '600', marginLeft: wide * 0.01 }}>Active</Text>
                                                    </View>
                                                    {/* <View style={{ flex: 1.3, backgroundColor: '#3EC300', borderRadius: wide * 0.02, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: wide * 0.07, width: wide * 0.1 }}>
                                            <Image
                                                style={{
                                                    width: 15,
                                                    height: 15
                                                }}
                                                source={require("../../Images/complete.png")}
                                            />
                                            <Text style={{ color: Colors.light, fontSize: 15, fontWeight: '600', marginLeft: wide * 0.01 }}>Complete</Text>

                                        </View> */}


                                                </View>

                                                <View style={{ flexDirection: 'row', marginTop: wide * 0.01, marginLeft: wide * 0.03, }}>

                                                    <Image
                                                        source={require("../../Images/lakers.png")}
                                                    />
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 14,
                                                                    color: Colors.light

                                                                }}>PPG</Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 16,
                                                                    color: Colors.light,
                                                                    fontWeight: '700',
                                                                    marginTop: wide * 0.01

                                                                }}
                                                            >{item.item.pgs.PPG}</Text>

                                                        </View>
                                                        <View style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}></View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 14,
                                                                    color: Colors.light

                                                                }}>APG</Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 16,
                                                                    color: Colors.light,
                                                                    fontWeight: '700',
                                                                    marginTop: wide * 0.01

                                                                }}
                                                            >{item.item.pgs.APG}</Text>

                                                        </View>
                                                        <View style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' }}></View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 14,
                                                                    color: Colors.light

                                                                }}>RPG</Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 16,
                                                                    color: Colors.light,
                                                                    fontWeight: '700',
                                                                    marginTop: wide * 0.01

                                                                }}
                                                            >{item.item.pgs.RPG}</Text>

                                                        </View>
                                                    </View>





                                                </View>


                                            </View>
                                        }
                                    />

                                </View>
                            </View>
                        }


                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </View>
    )
}


function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.homePlayer
    };
}
export default connect(mapStateToProps)(CoachAiDrivenPlayerSearch);
