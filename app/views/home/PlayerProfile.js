import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, FlatList, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoadToPro from '../Coach/Components/AIDrivenChallenge/RoadToPro';
import AIDrivenChallenges from '../Coach/Components/AIDrivenChallenge/AIDrivenChallenges';
import { connect } from 'react-redux';
import {
    getProfileData
} from '../../actions/home';
import { getObject } from '../../middleware';
import FastImage from 'react-native-fast-image';
import { BlurView } from "@react-native-community/blur";

import LinearGradient from 'react-native-linear-gradient';
import { getListOFChallenges } from '../../actions/home'


const PlayerProfile = (props) => {
    const [loading, setLoading] = useState(false)
    const [selectedTab, setSelectedtab] = useState("first")
    const [more, setMore] = useState(false)

    let playerStatData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const scrollViewRef = useRef();
    const [isEnd, setIsEnd] = useState(false)
    const [showSessionDropDown, setShowSessionDropDown] = useState(false)
    const [dropDownSelectedVal, setDropDownSelectedVal] = useState('Active')

    const [roadToProData, setRoadToProData] = useState()
    const [APIData, setAPIData] = useState()
    const [selectedLevel, setSelectedLevel] = useState(0)
    const [arrLevels, setArrLevels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11])

    let wide = Layout.width;
    let high = Layout.height;




    useEffect(() => {

        setLoading(true)
        {

            getObject('UserId').then((obj) => {
                props.dispatch(getProfileData(obj, (result, response) => {
                    setLoading(false)
                    if (result) {
                        console.log("asasasasas", response)
                        setAPIData(response)
                    } else {
                        console.error("error", result)
                    }
                }))
            })
        }

    }, [])


    let arr = []
    if (APIData?.stats != null) {
        var obj = APIData?.stats

        for (const key in obj) {

            arr.push({
                point_label: key,
                value: parseFloat(obj[key])
            })
        }


    }



    return (


        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <AppLoader visible={loading} />
            {APIData != undefined ?
                <View>

                    <ScrollView
                        bounces={false}
                        ref={scrollViewRef}

                        onContentSizeChange={() => {
                            selectedTab == "first" ?
                                scrollViewRef.current.scrollToEnd({ animated: true })
                                :
                                null
                        }}

                    >


                        <Image style={{
                            width: '100%', height: wide * 1.1,


                        }}

                            resizeMode={'stretch'}
                            // source={{ uri: item.item.profilePictureUrl }}

                            source={
                                APIData.playerProfilePicUrl == null ?
                                    require('../../Images/playerimage.png')
                                    :
                                    { uri: APIData.playerProfilePicUrl }

                            }
                        />


                        <View style={{ marginTop: -wide * 0.2 }}>

                            <ImageBackground
                                style={{
                                    width: '100%', height: wide * 0.4


                                }}
                                source={require('../../Images/playercard.png')}
                            >

                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', zIndex: 3, position: 'absolute', marginTop: wide * 0.03 }}>
                                    <Image
                                        style={{ marginRight: wide * 0.03 }}
                                        source={require('../../Images/playerprofileIcon.png')}
                                    />
                                    <Image
                                        style={{ marginRight: wide * 0.02 }}
                                        source={require('../../Images/playerprofileIcon2.png')}
                                    />
                                </View>

                                <View style={{
                                    backgroundColor: '#181A20',
                                    height: wide * 0.35,
                                    marginTop: wide * 0.13,
                                    flexDirection: 'row'
                                }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -wide * 0.05 }}>
                                        <Text style={{
                                            color: '#FDB927',
                                            fontSize: 40,
                                            fontWeight: '700'
                                        }}>{APIData.rank}</Text>
                                        <Text style={{
                                            color: Colors.light,
                                            fontSize: 13,
                                            fontWeight: '500'
                                        }}>Rank</Text>
                                    </View>
                                    <View style={{ borderColor: Colors.light, borderLeftWidth: 1, opacity: 0.2, height: 30, alignSelf: 'center', marginTop: -wide * 0.05 }}></View>
                                    <View style={{ flex: 3, justifyContent: 'center', marginLeft: wide * 0.03, marginTop: -wide * 0.05 }}>
                                        <View style={{ flexDirection: 'row' }} >
                                            <Text style={{
                                                color: Colors.light,
                                                fontSize: 24,
                                                fontWeight: '700',

                                            }}>{APIData.playerName}</Text>
                                            <Image
                                                style={{ alignSelf: 'center', marginLeft: wide * 0.02, marginTop: wide * 0.01 }}
                                                height={wide * 0.05}
                                                wide={wide * 0.05}
                                                source={require("../../Images/playerIcon.png")}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', marginTop: wide * 0.01 }}>
                                            <Text style={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                fontSize: 14,
                                                fontWeight: '400',
                                                marginRight: wide * 0.02
                                            }}>{APIData.subtitle}</Text>


                                        </View>


                                    </View>




                                </View>

                                {loading == false ?
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: -wide * 0.055,

                                        justifyContent: 'center',


                                    }}>

                                        {selectedTab == "first" ?

                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginLeft: wide * 0.023,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',


                                                }}

                                            >

                                                <Text style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    color: Colors.light,
                                                    fontWeight: '600',
                                                    fontSize: 14,
                                                    fontFamily: 'Metropolis',




                                                }}>
                                                    Stats
                                                </Text>
                                                <View style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    width: wide * 0.2,


                                                }}
                                                />

                                            </View>


                                            :

                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginLeft: wide * 0.023,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',


                                                }}
                                            >
                                                <TouchableOpacity onPress={() => { setSelectedtab("first") }}>
                                                    <Text style={{


                                                        color: Colors.titleLabelColor,
                                                        fontWeight: '400',
                                                        fontSize: 14,
                                                        fontFamily: 'Metropolis',


                                                    }}>
                                                        Stats
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        }


                                        {selectedTab == "secound" ?

                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginRight: wide * 0.023,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',



                                                }}
                                            >
                                                <Text style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    color: Colors.light,
                                                    fontWeight: '600',
                                                    fontSize: 14,
                                                    fontFamily: 'Metropolis',




                                                }}>
                                                    Road To Pro
                                                </Text>
                                                <View style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    width: wide * 0.33,


                                                }}
                                                />

                                            </View>
                                            :

                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginRight: wide * 0.023,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',


                                                }}
                                            >
                                                <TouchableOpacity onPress={() => { setSelectedtab("secound") }}>
                                                    <Text style={{


                                                        color: Colors.titleLabelColor,
                                                        fontWeight: '400',
                                                        fontSize: 14,
                                                        fontFamily: 'Metropolis',


                                                    }}>
                                                        Road To Pro
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        {selectedTab == "third" ?

                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginRight: wide * 0.023,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',



                                                }}
                                            >
                                                <Text style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    color: Colors.light,
                                                    fontWeight: '600',
                                                    fontSize: 14,
                                                    fontFamily: 'Metropolis',




                                                }}>
                                                    Content
                                                </Text>
                                                <View style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    width: wide * 0.23,


                                                }}
                                                />

                                            </View>
                                            :

                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginRight: wide * 0.023,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',


                                                }}
                                            >
                                                <TouchableOpacity onPress={() => { setSelectedtab("third") }}>
                                                    <Text style={{


                                                        color: Colors.titleLabelColor,
                                                        fontWeight: '400',
                                                        fontSize: 14,
                                                        fontFamily: 'Metropolis',


                                                    }}>
                                                        Content
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        }



                                    </View>
                                    : null}


                            </ImageBackground>
                        </View>

                        {selectedTab == "first" ?
                            <View style={{ marginTop: wide * 0.07 }}>
                                <View style={{ justifyContent: 'center', backgroundColor: 'rgba(35, 38, 47, 1)' }}>
                                    <View style={{ marginTop: wide * 0.07 }}>



                                        <View style={{ marginBottom: wide * 0.07 }}>
                                            <FlatList
                                                keyExtractor={(item, index) => index.toString()}
                                                data={arr}
                                                showsVerticalScrollIndicator={false}
                                                bounces={false}
                                                numColumns={3}
                                                scrollEnabled={false}
                                                renderItem={(item) =>
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 40,
                                                                    color: Colors.light,
                                                                    fontWeight: '700',


                                                                }}
                                                            > {item.item?.value}</Text>
                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 14,
                                                                    color: Colors.light,
                                                                    marginTop: wide * 0.02,

                                                                    alignSelf: 'center'

                                                                }}> {item.item?.point_label}</Text>
                                                        </View>

                                                        <View style={{ borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', height: wide * 0.1, marginLeft: wide * 0.1 }}></View>

                                                    </View>
                                                }
                                            />
                                        </View>




                                    </View>
                                </View>
                                {!more ?
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.07, flexDirection: 'row' }}
                                        onPress={() => { setMore(true) }}
                                    >
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, fontWeight: '400' }}>View more</Text>
                                        <Image
                                            style={{
                                                width: wide * 0.03, tintColor: 'rgba(255, 255, 255, 0.7)', height: wide * 0.02, marginHorizontal: wide * 0.015, top: 1
                                            }} source={require('../../Images/dropDownIconNew.png')}
                                        />
                                    </TouchableOpacity>
                                    : null}
                                {more ?



                                    <View>
                                        {APIData.carrerStats != null ?
                                            <View style={{ marginTop: wide * 0.06, marginHorizontal: wide * 0.02 }} >
                                                <View style={{ flexDirection: 'row', marginBottom: wide * 0.03 }}>
                                                    <View style={{ flex: 4 }}>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontWeight: '700',
                                                            fontSize: 22
                                                        }}>Career Stats</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
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





                                                <View style={{
                                                    width: '100%', flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    backgroundColor: Colors.playerStatRowFirstClr,
                                                    height: wide * 0.075,
                                                    borderTopLeftRadius: wide * 0.025,
                                                    borderTopRightRadius: wide * 0.025,
                                                }}>
                                                    <View style={{
                                                        width: '30%', alignSelf: 'center',

                                                    }}>
                                                        <Text style={{
                                                            color: Colors.btnBg,
                                                            fontFamily: Fonts.SemiBold, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '600',
                                                            marginLeft: wide * 0.03
                                                        }}>Season</Text>
                                                    </View>

                                                    <View style={{
                                                        width: '70%',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        flexDirection: 'row',
                                                        alignSelf: "center",

                                                    }}>

                                                        {APIData.carrerStats?.kpi.map(key => {

                                                            return (
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.Regular, fontSize: 14,
                                                                    lineHeight: 18,
                                                                    fontWeight: '400',
                                                                    width: '15%'
                                                                }}>{key}</Text>
                                                            )
                                                        })}


                                                        {/* <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'

                                                        }}>FG</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>3PT</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>AST</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>PF</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%',

                                                        }}>PTS</Text> */}
                                                    </View>
                                                </View>
                                                <FlatList
                                                    keyExtractor={(item, index) => index.toString()}
                                                    style={{ flex: 1 }}
                                                    data={APIData?.carrerStats?.stats}
                                                    scrollEnabled={false}
                                                    renderItem={(item, index) =>
                                                        <View>
                                                            {item.index == (playerStatData.length - 1) ? setIsEnd(false) : null}
                                                            <View style={{
                                                                width: '100%', flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                backgroundColor: item.index == 0 ? Colors.playerStatRowSecondClr : item.index == 1 ? Colors.playerStatRowFirstClr :
                                                                    (item.index % 2) == 0 ? Colors.playerStatRowSecondClr : Colors.playerStatRowFirstClr,
                                                                height: wide * 0.075,
                                                                borderBottomLeftRadius: isEnd == true ? wide * 0.025 : 0,
                                                                borderBottomRightRadius: isEnd == true ? wide * 0.025 : 0,
                                                            }}>
                                                                <View style={{
                                                                    width: '30%', alignSelf: 'center',

                                                                }}>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.Regular, fontSize: 12,
                                                                        lineHeight: 16,
                                                                        fontWeight: '400',
                                                                        marginLeft: wide * 0.03
                                                                    }}>{item.item.season}</Text>
                                                                </View>

                                                                <View style={{
                                                                    width: '70%',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    alignSelf: "center",


                                                                }}>

                                                                    {APIData.carrerStats.kpi.map(key => {

                                                                        return (
                                                                            <Text style={{
                                                                                color: Colors.light,
                                                                                fontFamily: Fonts.SemiBold,
                                                                                fontSize: 12,
                                                                                lineHeight: 14,
                                                                                fontWeight: '600',
                                                                                width: '15%',

                                                                            }}>{item.item.stats[key]}</Text>
                                                                        )

                                                                    })}





                                                                    {/* <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>5-10</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>2-5</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>8</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>1</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>12</Text> */}
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }

                                                />

                                            </View>
                                            :
                                            null
                                        }
                                        {APIData.playOffStats != null ?
                                            <View style={{ marginTop: wide * 0.06, marginHorizontal: wide * 0.02 }} >
                                                <View style={{ flexDirection: 'row', marginBottom: wide * 0.03 }}>
                                                    <View style={{ flex: 4 }}>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontWeight: '700',
                                                            fontSize: 22
                                                        }}>Playoff Stats</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
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





                                                <View style={{
                                                    width: '100%', flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    backgroundColor: Colors.playerStatRowFirstClr,
                                                    height: wide * 0.075,
                                                    borderTopLeftRadius: wide * 0.025,
                                                    borderTopRightRadius: wide * 0.025,
                                                }}>
                                                    <View style={{
                                                        width: '30%', alignSelf: 'center',

                                                    }}>
                                                        <Text style={{
                                                            color: Colors.btnBg,
                                                            fontFamily: Fonts.SemiBold, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '600',
                                                            marginLeft: wide * 0.03
                                                        }}>Season</Text>
                                                    </View>

                                                    <View style={{
                                                        width: '70%',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        flexDirection: 'row',
                                                        alignSelf: "center",

                                                    }}>

                                                        {APIData.playOffStats?.kpi.map(key => {

                                                            return (
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.Regular, fontSize: 14,
                                                                    lineHeight: 18,
                                                                    fontWeight: '400',
                                                                    width: '15%'
                                                                }}>{key}</Text>
                                                            )
                                                        })}


                                                        {/* <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'

                                                        }}>FG</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>3PT</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>AST</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>PF</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%',

                                                        }}>PTS</Text> */}
                                                    </View>
                                                </View>
                                                <FlatList
                                                    keyExtractor={(item, index) => index.toString()}
                                                    style={{ flex: 1 }}
                                                    data={APIData?.playOffStats?.stats}
                                                    scrollEnabled={false}
                                                    renderItem={(item, index) =>
                                                        <View>
                                                            {item.index == (playerStatData.length - 1) ? setIsEnd(false) : null}
                                                            <View style={{
                                                                width: '100%', flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                backgroundColor: item.index == 0 ? Colors.playerStatRowSecondClr : item.index == 1 ? Colors.playerStatRowFirstClr :
                                                                    (item.index % 2) == 0 ? Colors.playerStatRowSecondClr : Colors.playerStatRowFirstClr,
                                                                height: wide * 0.075,
                                                                borderBottomLeftRadius: isEnd == true ? wide * 0.025 : 0,
                                                                borderBottomRightRadius: isEnd == true ? wide * 0.025 : 0,
                                                            }}>
                                                                <View style={{
                                                                    width: '30%', alignSelf: 'center',

                                                                }}>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.Regular, fontSize: 12,
                                                                        lineHeight: 16,
                                                                        fontWeight: '400',
                                                                        marginLeft: wide * 0.03
                                                                    }}>{item.item.season}</Text>
                                                                </View>

                                                                <View style={{
                                                                    width: '70%',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    alignSelf: "center",


                                                                }}>

                                                                    {APIData.carrerStats.kpi.map(key => {

                                                                        return (
                                                                            <Text style={{
                                                                                color: Colors.light,
                                                                                fontFamily: Fonts.SemiBold,
                                                                                fontSize: 12,
                                                                                lineHeight: 14,
                                                                                fontWeight: '600',
                                                                                width: '15%',

                                                                            }}>{item.item.stats[key]}</Text>
                                                                        )

                                                                    })}





                                                                    {/* <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>5-10</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>2-5</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>8</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>1</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>12</Text> */}
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }

                                                />

                                            </View>
                                            :
                                            null
                                        }
                                        {APIData.playInStats != null ?
                                            <View style={{ marginTop: wide * 0.06, marginHorizontal: wide * 0.02 }} >
                                                <View style={{ flexDirection: 'row', marginBottom: wide * 0.03 }}>
                                                    <View style={{ flex: 4 }}>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontWeight: '700',
                                                            fontSize: 22
                                                        }}>Play in Stats</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
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





                                                <View style={{
                                                    width: '100%', flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    backgroundColor: Colors.playerStatRowFirstClr,
                                                    height: wide * 0.075,
                                                    borderTopLeftRadius: wide * 0.025,
                                                    borderTopRightRadius: wide * 0.025,
                                                }}>
                                                    <View style={{
                                                        width: '30%', alignSelf: 'center',

                                                    }}>
                                                        <Text style={{
                                                            color: Colors.btnBg,
                                                            fontFamily: Fonts.SemiBold, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '600',
                                                            marginLeft: wide * 0.03
                                                        }}>Season</Text>
                                                    </View>

                                                    <View style={{
                                                        width: '70%',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        flexDirection: 'row',
                                                        alignSelf: "center",

                                                    }}>

                                                        {APIData.playInStats?.kpi.map(key => {

                                                            return (
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.Regular, fontSize: 14,
                                                                    lineHeight: 18,
                                                                    fontWeight: '400',
                                                                    width: '15%'
                                                                }}>{key}</Text>
                                                            )
                                                        })}


                                                        {/* <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'

                                                        }}>FG</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>3PT</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>AST</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%'
                                                        }}>PF</Text>
                                                        <Text style={{
                                                            color: Colors.light,
                                                            fontFamily: Fonts.Regular, fontSize: 14,
                                                            lineHeight: 18,
                                                            fontWeight: '400',
                                                            width: '15%',

                                                        }}>PTS</Text> */}
                                                    </View>
                                                </View>
                                                <FlatList
                                                    keyExtractor={(item, index) => index.toString()}
                                                    style={{ flex: 1 }}
                                                    data={APIData?.playInStats?.stats}
                                                    scrollEnabled={false}
                                                    renderItem={(item, index) =>
                                                        <View>
                                                            {item.index == (playerStatData.length - 1) ? setIsEnd(false) : null}
                                                            <View style={{
                                                                width: '100%', flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                backgroundColor: item.index == 0 ? Colors.playerStatRowSecondClr : item.index == 1 ? Colors.playerStatRowFirstClr :
                                                                    (item.index % 2) == 0 ? Colors.playerStatRowSecondClr : Colors.playerStatRowFirstClr,
                                                                height: wide * 0.075,
                                                                borderBottomLeftRadius: isEnd == true ? wide * 0.025 : 0,
                                                                borderBottomRightRadius: isEnd == true ? wide * 0.025 : 0,
                                                            }}>
                                                                <View style={{
                                                                    width: '30%', alignSelf: 'center',

                                                                }}>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.Regular, fontSize: 12,
                                                                        lineHeight: 16,
                                                                        fontWeight: '400',
                                                                        marginLeft: wide * 0.03
                                                                    }}>{item.item.season}</Text>
                                                                </View>

                                                                <View style={{
                                                                    width: '70%',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: 'row',
                                                                    alignSelf: "center",


                                                                }}>

                                                                    {APIData.carrerStats.kpi.map(key => {

                                                                        return (
                                                                            <Text style={{
                                                                                color: Colors.light,
                                                                                fontFamily: Fonts.SemiBold,
                                                                                fontSize: 12,
                                                                                lineHeight: 14,
                                                                                fontWeight: '600',
                                                                                width: '15%',

                                                                            }}>{item.item.stats[key]}</Text>
                                                                        )

                                                                    })}





                                                                    {/* <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>5-10</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>2-5</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>8</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>1</Text>
                                                                    <Text style={{
                                                                        color: Colors.light,
                                                                        fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                        lineHeight: 14,
                                                                        fontWeight: '600',
                                                                        width: '15%',

                                                                    }}>12</Text> */}
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }

                                                />



                                            </View>
                                            :
                                            null
                                        }

                                    </View>
                                    :
                                    null}

                                {more ?
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.05, flexDirection: 'row', marginBottom: wide * 0.05 }}
                                        onPress={() => { setMore(false) }}
                                    >
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, fontWeight: '400' }}>View Less</Text>
                                        <Image
                                            style={{
                                                width: wide * 0.03, tintColor: 'rgba(255, 255, 255, 0.7)', height: wide * 0.02, marginHorizontal: wide * 0.015, top: 1
                                            }} source={require('../../Images/dropDownIconTop.png')}
                                        />
                                    </TouchableOpacity>
                                    : null}

                            </View>
                            :
                            selectedTab == "secound" ?
                                <View style={{ marginTop: wide * 0.07, }}>
                                    <FlatList

                                        data={APIData.subscriptionLevelResponseArrayList}
                                        style={{ marginHorizontal: wide * 0.04 }}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        pagingEnabled={true}
                                        bounces={false}
                                        legacyImplementation={false}

                                        keyExtractor={item => item.index}
                                        renderItem={(item, index) =>

                                            <View style={{ height: wide * 0.5, }}>
                                                <TouchableOpacity onPress={() => { setSelectedLevel(item.index) }}

                                                >
                                                    <View style={{
                                                        width: wide * 0.23, height: wide * 0.32,
                                                        marginTop: 24, borderRadius: wide * 0.03, borderWidth: 3,
                                                        borderColor: Colors.borderColor,

                                                        backgroundColor: selectedLevel == item.index ? '#246BFD' : '#181A20',


                                                        justifyContent: 'center', alignItems: 'center',
                                                        marginLeft: item.index === 0 ? 0 : wide * 0.04


                                                    }}>

                                                        <Image style={{
                                                            width: '60%', height: '60%'
                                                        }} resizeMode={'contain'}
                                                            source={
                                                                item.item.levelImageUrl == "" ?
                                                                    require('../../Images/coachlevel.png')
                                                                    :
                                                                    { uri: item.item.levelImageUrl }
                                                            } />


                                                        <Text style={{
                                                            color: item.index === 1 || item.index === 0 ? Colors.light : Colors.overlayWhite, fontSize: 12, fontFamily: Fonts.Bold,
                                                            marginLeft: 5, marginTop: wide * 0.03
                                                        }}>
                                                            Level {item.index + 1}
                                                        </Text>

                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{
                                                    height: wide * 0.1, width: '100%',
                                                    justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0
                                                }}>
                                                    <View style={{
                                                        width: '100%', height: wide * 0.02,
                                                        backgroundColor: Colors.borderColor,

                                                        justifyContent: 'center', alignItems: 'center',
                                                        borderTopLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                                                        borderBottomLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                                                        left: item.index === 0 ? wide * 0.02 / 2 : 0,
                                                        borderTopRightRadius: arrLevels.length > 0 ? item.index === arrLevels.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                                                        borderBottomRightRadius: arrLevels.length > 0 ? item.index === arrLevels.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                                                        Right: arrLevels.length > 0 ? item.index === arrLevels.length - 1 ? wide * 0.1 / 2 : 0 : 0,
                                                    }}>


                                                    </View>
                                                    <Image style={{
                                                        width: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07, height: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07, position: 'absolute', left: wide * 0.12,
                                                        tintColor: item.index === 0 ? Colors.stars : item.index === 1 ? Colors.shade : null
                                                    }} resizeMode={'contain'}
                                                        source={item.index === 0 || item.index === 1 ? require('../../Images/tick_selected.png') : require('../../Images/lock_circle.png')} />
                                                </View>
                                            </View>

                                        }
                                    />


                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: wide * 0.07 }}>
                                        <Text style={{

                                            fontSize: 18,
                                            fontWeight: '400',
                                            color: '#B7B7B7'



                                        }}>Total Points</Text>

                                        <Text style={{


                                            fontSize: 37,
                                            fontWeight: '700',
                                            color: Colors.light

                                        }}>{APIData.totalPoints}</Text>

                                    </View>

                                    <FlatList

                                        data={APIData.subscriptionLevelResponseArrayList[selectedLevel].subscriptionChallengeBriefInfos}



                                        pagingEnabled={true}
                                        bounces={false}
                                        legacyImplementation={false}

                                        keyExtractor={item => item.index}
                                        renderItem={(item, index) =>

                                            <View style={{ marginTop: wide * 0.035, marginHorizontal: wide * 0.04, marginBottom: wide * 0.1 }}>
                                                <ImageBackground
                                                    source={require('../../Images/challenge.png')}
                                                    style={{
                                                        width: '100%',
                                                        height: wide * 0.46
                                                    }}
                                                >
                                                    <View >
                                                        <View style={{ flexDirection: 'row' }}>

                                                            <View style={{ flex: 1 }}>
                                                                <Image
                                                                    style={{
                                                                        marginLeft: wide * 0.05,
                                                                        marginTop: wide * 0.05,
                                                                    }}
                                                                    source={require('../../Images/circle.png')}
                                                                />
                                                            </View>

                                                        </View>
                                                        <View style={{ marginLeft: wide * 0.04, marginTop: wide * 0.05 }}>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontWeight: '700',
                                                                    fontSize: 17,
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 17,



                                                                }}>
                                                                    {item.item.name}
                                                                </Text>
                                                                {item.item.typeOfChallenge == "STATS" ?
                                                                    <Image style={{ marginLeft: wide * 0.015 }}
                                                                        source={require('../../Images/Vector.png')}
                                                                    />
                                                                    :
                                                                    item.item.typeOfChallenge == "QUESTION" ?
                                                                        <Image style={{ marginLeft: wide * 0.015 }}
                                                                            source={require('../../Images/texticon.png')}
                                                                        />
                                                                        :
                                                                        <Image style={{ marginLeft: wide * 0.015 }}
                                                                            source={require('../../Images/videoicon.png')}
                                                                        />
                                                                }
                                                            </View>

                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Metropolis',
                                                                    fontSize: 12,
                                                                    fontWeight: '600',
                                                                    color: '#FFB920',
                                                                    marginTop: wide * 0.01

                                                                }}
                                                            >Step 1</Text>













                                                        </View>


                                                    </View>

                                                </ImageBackground>

                                            </View >
                                        }
                                    />
                                </View>
                                :

                                
                                <View style={{ marginTop: wide * 0.07, }}>
                                    {APIData?.content!=null?
                                    <View style={{ justifyContent: 'center', backgroundColor: 'rgba(35, 38, 47, 1)' }}>

                                        <FlatList
                                            keyExtractor={(item, index) => index.toString()}
                                            style={{ flex: 1 }}
                                            data={APIData?.content}
                                            scrollEnabled={false}
                                            renderItem={(item, index) =>

                                                <View style={{ marginTop: wide * 0.05, marginLeft: wide * 0.03, marginRight: wide * 0.03, marginBottom: wide * 0.05 }}>
                                                    <ImageBackground source={{uri:item.item.thumbnailUrl}}
                                                        style={{
                                                            width: '100%',
                                                            height: wide * 0.6,

                                                        }}
                                                        borderRadius={wide * 0.04}
                                                    >

                                                        <LinearGradient colors={['rgba(36, 107, 253, 0)', 'rgba(36, 107, 253, 1)']}
                                                            start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 0.9 }}
                                                            style={{ flex: 1, borderRadius: wide * 0.04 }}
                                                        >

                                                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.15 }}>
                                                                <TouchableOpacity
                                                                onPress={() =>
                                                                    Navigation.navigate('VideoPlayer',
                                                                        { videoUrl: item.item.videoUrl })
                                                                }
                                                                >
                                                                    <Image
                                                                        style={{
                                                                            width: wide * 0.15,
                                                                            height: wide * 0.15
                                                                        }}
                                                                        source={require("../../Images/video.png")}
                                                                    />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </LinearGradient>

                                                    </ImageBackground>
                                                </View>
                                            }
                                        />





                                    </View>
                                    :
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: wide * 0.07,
                                        marginBottom:wide*0.07 
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
                                        }}>No content found yet</Text>
                                    </View>

                                        }
                                </View>
                        }



                    </ScrollView>
                </View>

                :
                null
            }
        </View >
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
export default connect(mapStateToProps)(PlayerProfile);
