import { View, Text, StyleSheet, KeyboardAvoidingView, Image, ImageBackground, FlatList, } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';
import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RoadToPro from '../../views/home/Components/AIDrivenChallenge/RoadToPro';

import AIDrivenChallenges from '../../views/home/Components/AIDrivenChallenge/AIDrivenChallenges';
import { connect } from 'react-redux';
import {
    getGameDetails
} from '../../actions/home';
import { getObject } from '../../middleware';

import PieChart from 'react-native-pie-chart';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import moment from 'moment';


const GameDetails = (props) => {
    const [loading, setLoading] = useState(false)
    const [selectedTab, setSelectedtab] = useState("first")
    const [APIData, setAPIData] = useState()



    const sliceColor = ['#EDAD24', '#CE1141',]
    let playerStatData = [1, 2, 3, 4, 5]



    useEffect(() => {

        setLoading(true)
        debugger




        props.dispatch(getGameDetails("166375086957002", (res, data) => {
            if (res) {

                setLoading(false)

                setAPIData(data)

            }
        }))

    }, [])


    const starters = ({ item, index }) => {
        var isEnd = false;
        if (index == (playerStatData.length - 1)) {
            isEnd = true;
        }


        let arr = []
        if (item.kpi != null) {
            var obj = item.kpi

            for (const key in obj) {

                arr.push({
                    point_label: key,
                    value: parseFloat(obj[key])
                })
            }


        }
        debugger

        return (
            <>
                {item.kpi != null ?
                    <View style={{
                        width: '100%', flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: index == 0 ? Colors.playerStatRowSecondClr : index == 1 ? Colors.playerStatRowFirstClr :
                            (index % 2) == 0 ? Colors.playerStatRowSecondClr : Colors.playerStatRowFirstClr,
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
                            }}>{item.name}</Text>
                        </View>

                        <View style={{
                            width: '70%',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            alignSelf: "center",

                        }}>



                            {arr.map(key => {

                                return (
                                    <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.SemiBold,
                                        fontSize: 12,
                                        lineHeight: 14,
                                        fontWeight: '600',
                                        width: '15%',

                                    }}>{key.value}</Text>
                                )

                            })}



                        </View>
                    </View>
                    :
                    null
                }
            </>

        )
    }

    const starters1 = ({ item, index }) => {
        var isEnd = false;
        if (index == (playerStatData.length - 1)) {
            isEnd = true;
        }

        console.log("eysa", item)
        let ar = []
        if (item.kpi != null) {
            var obj = item.kpi

            for (const key in obj) {

                ar.push({
                    point_label: key,
                    value: parseFloat(obj[key])
                })
            }


        }
        debugger

        return (
            <>
                {item.kpi != null ?
                    <View style={{
                        width: '100%', flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: index == 0 ? Colors.playerStatRowSecondClr : index == 1 ? Colors.playerStatRowFirstClr :
                            (index % 2) == 0 ? Colors.playerStatRowSecondClr : Colors.playerStatRowFirstClr,
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
                            }}>{item.name}</Text>
                        </View>

                        <View style={{
                            width: '70%',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            alignSelf: "center",

                        }}>



                            {ar.map(key => {

                                return (
                                    <>
                                        {key.value != null ?
                                            <Text style={{
                                                color: Colors.light,
                                                fontFamily: Fonts.SemiBold,
                                                fontSize: 12,
                                                lineHeight: 14,
                                                fontWeight: '600',
                                                width: '15%',

                                            }}>{key.value}</Text>
                                            :
                                            null
                                        }
                                    </>
                                )

                            })}



                        </View>
                    </View>
                    :
                    null
                }
            </>

        )
    }


    let arr1 = []
    if (APIData?.defenderTeamKpi[0].kpi != null) {
        var obj = APIData?.defenderTeamKpi[0].kpi

        for (const key in obj) {

            arr1.push({
                point_label: key,
                value: parseFloat(obj[key])
            })
        }



    }
    let arr2 = []
    if (APIData?.challengerTeamKpi[0].kpi != null) {
        var obj = APIData?.challengerTeamKpi[0].kpi

        for (const key in obj) {

            arr2.push({
                point_label: key,
                value: parseFloat(obj[key])
            })
        }



    }





    let wide = Layout.width;
    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <ScreenHeader
                            title={"Live Games"}
                            backButtonAction={() => Navigation.back()}
                        />
                    </View>
                </View>
                {loading == false && APIData != undefined ?
                    <ScrollView bounces={false} style={{ marginBottom: wide * 0.03 }}

                        showsVerticalScrollIndicator={false}
                    >
                        <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
                            behavior={Platform.OS === 'ios' ? "padding" : null}>
                            <View style={{ marginHorizontal: 24 }}>
                                <Text style={{
                                    alignSelf: 'center',
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: 13,
                                    fontWeight: '500',
                                    marginTop: wide * 0.03

                                }}>{APIData?.address}  {`${moment((new Date(APIData?.scheduledAt / 100))).format('MMM')} , ${moment((new Date(APIData?.scheduledAt / 100))).format('DD')}, ${moment((new Date(APIData?.scheduledAt / 100))).format('HH:MM')}`}</Text>

                                {/* vs Card View */}


                                <View style={{ flexDirection: 'row', marginTop: wide * 0.08, justifyContent: 'space-between' }}>


                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <ImageBackground
                                            style={{ height: 58, width: 58, justifyContent: 'center', alignItems: 'center' }}
                                            source={require("../../Images/teamcirclewhite.png")}
                                        >
                                            <Image
                                                style={{ height: 36, width: 36, borderRadius: 36 / 2 }}
                                                source={{ uri: APIData?.defenderTeamInfo.logoUrl }}
                                            />
                                        </ImageBackground>

                                        <Text style={{

                                            color: Colors.light,
                                            fontSize: 15,
                                            fontWeight: '600',
                                            marginTop: wide * 0.02
                                        }}>{APIData?.defenderTeamInfo.name}</Text>
                                        <Text style={{

                                            color: Colors.light,
                                            fontSize: 14,
                                            fontWeight: '500',
                                            marginTop: wide * 0.02,

                                        }}>{APIData?.defenderTeamInfo.wins}-{APIData?.defenderTeamInfo.loss}</Text>

                                    </View>

                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{

                                            color: Colors.light,
                                            fontSize: 26,
                                            fontWeight: '500',




                                        }}>{APIData?.finalDefenderScore}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Image
                                            style={{ alignSelf: 'center', }}
                                            source={require("../../Images/vsicon.png")}
                                        />
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{

                                            color: Colors.light,
                                            fontSize: 26,
                                            fontWeight: '500',




                                        }}>{APIData?.finalChallengerScore}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <ImageBackground
                                            style={{ height: 58, width: 58, justifyContent: 'center', alignItems: 'center' }}
                                            source={require("../../Images/teamcirclewhite.png")}
                                        >
                                            <Image
                                                style={{ height: 46, width: 46, borderRadius: 46 / 2 }}
                                                source={{ uri: APIData?.challengerTeamInfo.logoUrl }}
                                            />
                                        </ImageBackground>

                                        <Text style={{

                                            color: Colors.light,
                                            fontSize: 15,
                                            fontWeight: '600',
                                            marginTop: wide * 0.02
                                        }}>{APIData?.challengerTeamInfo.name}</Text>
                                        <Text style={{

                                            color: Colors.light,
                                            fontSize: 14,
                                            fontWeight: '500',
                                            marginTop: wide * 0.02,

                                        }}>{APIData?.challengerTeamInfo.wins}-{APIData?.challengerTeamInfo.loss}</Text>

                                    </View>





                                </View>


                                {/* Tabs overview and team lineup */}


                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: wide * 0.08,
                                        justifyContent: 'center',
                                        alignSelf: 'center'

                                    }}>

                                        {selectedTab == "first" ?

                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginLeft: wide * 0.023,
                                                    alignItems: 'center',



                                                }}

                                            >

                                                <Text style={{


                                                    color: Colors.light,
                                                    fontWeight: '600',
                                                    fontSize: 14,
                                                    fontFamily: 'Metropolis',




                                                }}>
                                                    Overview
                                                </Text>
                                                <View style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    width: '100%',
                                                    marginTop: wide * 0.01


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
                                                        Overview
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


                                                    color: Colors.light,
                                                    fontWeight: '600',
                                                    fontSize: 14,
                                                    fontFamily: 'Metropolis',




                                                }}>
                                                    Team Lineup
                                                </Text>
                                                <View style={{

                                                    borderBottomColor: Colors.light,
                                                    borderBottomWidth: 2,
                                                    width: '100%',
                                                    marginTop: wide * 0.01

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
                                                        Team Lineup
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        }



                                    </View>






                                    {/* overview tab View */}



                                    {selectedTab == "first" ?
                                        <View style={{ marginTop: wide * 0.05 }}>

                                            <View style={{ backgroundColor: '#22252E', width: '100%', height: wide * 0.75, borderRadius: 14, justifyContent: 'space-around' }}>

                                                <Text style={{
                                                    color: Colors.light,
                                                    fontSize: 14,
                                                    fontWeight: '500',
                                                    alignSelf: 'center'


                                                }}>Prediction</Text>

                                                {APIData?.predictionDefender != null || APIData?.predictionChallenger != null ?
                                                    <PieChart
                                                        widthAndHeight={wide * 0.35}
                                                        series={[parseFloat(APIData?.predictionChallenger), parseFloat(APIData?.predictionDefender)]}

                                                        sliceColor={sliceColor}
                                                        doughnut={true}
                                                        coverRadius={0.93}
                                                        coverFill={'#22252E'}
                                                        style={{ alignSelf: 'center' }}


                                                    />
                                                    :
                                                    null
                                                }


                                                <View style={{ flexDirection: 'row', marginTop: -wide * 0.28, alignSelf: 'center', width: wide * 0.3 }}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                                        <Text style={{ color: Colors.light, fontSize: wide * 0.035, fontWeight: '500', marginRight: wide * 0.05 }}>{APIData?.defenderTeamInfo.name}</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                                        <Text style={{ color: Colors.light, fontSize: wide * 0.035, fontWeight: '500', opacity: 0.4 }}>{APIData?.challengerTeamInfo.name}</Text>
                                                    </View>
                                                </View>


                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.1, marginLeft: wide * 0.1 }}>

                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: Colors.light, fontSize: 22, fontWeight: '400' }}>{APIData?.predictionDefender}%</Text>

                                                        <ImageBackground
                                                            style={{ height: 36, width: 36, justifyContent: 'center', alignItems: 'center' }}
                                                            source={require("../../Images/circleTeam.png")}
                                                        >
                                                            <Image
                                                                style={{ height: 33, width: 33, borderRadius: 33 / 2 }}
                                                                source={{ uri: APIData?.defenderTeamInfo.logoUrl }}
                                                            />
                                                        </ImageBackground>
                                                    </View>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: wide * 0.1 }}>
                                                        <Text style={{ color: Colors.light, fontSize: 22, fontWeight: '400' }}>{APIData?.predictionChallenger}%</Text>
                                                        <ImageBackground
                                                            style={{ height: 36, width: 36, justifyContent: 'center', alignItems: 'center' }}
                                                            source={require("../../Images/circleTeam.png")}
                                                        >
                                                            <Image
                                                                style={{ height: 33, width: 33, borderRadius: 33 / 2 }}
                                                                source={{ uri: APIData?.challengerTeamInfo.logoUrl }}
                                                            />
                                                        </ImageBackground>
                                                    </View>
                                                </View>


                                            </View>

                                            <View style={{ marginTop: wide * 0.1, }}>

                                                <Text style={{ color: Colors.light, fontSize: 22, fontWeight: '600', }}>Box Score</Text>
                                                <View style={{ backgroundColor: 'rgba(34, 37, 46, 1)', width: '100%', height: wide * 0.25, borderRadius: 14, marginTop: wide * 0.04, paddingTop: wide * 0.005 }}>



                                                    <View style={{
                                                        width: '100%', flexDirection: 'row',
                                                        justifyContent: 'space-between',

                                                        height: wide * 0.075,


                                                    }}>
                                                        <View style={{
                                                            width: '25%', alignSelf: 'center',

                                                        }}>
                                                            <Text style={{
                                                                color: Colors.light,
                                                                fontFamily: Fonts.Regular, fontSize: 12,
                                                                lineHeight: 16,
                                                                fontWeight: '400',
                                                                marginLeft: wide * 0.03
                                                            }}></Text>
                                                        </View>

                                                        <View style={{
                                                            width: '70%',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            flexDirection: 'row',
                                                            alignSelf: "center",
                                                            borderBottomColor: '#6B6E74',
                                                            borderTopColor: 'transparent',
                                                            borderLeftColor: 'transparent',
                                                            borderRightColor: 'transparent',
                                                            borderWidth: 1,
                                                            paddingBottom: 10,
                                                            paddingTop: 5,
                                                            marginRight: wide * 0.1,


                                                        }}>
                                                            <Text style={{
                                                                color: Colors.light,
                                                                fontFamily: Fonts.SemiBold,
                                                                fontSize: 12,
                                                                lineHeight: 14,
                                                                fontWeight: '600',
                                                                width: '15%',

                                                            }}>Q1</Text>
                                                            <Text style={{
                                                                color: Colors.light,
                                                                fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                lineHeight: 14,
                                                                fontWeight: '600',
                                                                width: '15%',

                                                            }}>Q2</Text>
                                                            <Text style={{
                                                                color: Colors.light,
                                                                fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                lineHeight: 14,
                                                                fontWeight: '600',
                                                                width: '15%',

                                                            }}>Q3</Text>
                                                            <Text style={{
                                                                color: Colors.light,
                                                                fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                lineHeight: 14,
                                                                fontWeight: '600',
                                                                width: '15%',

                                                            }}>Q4</Text>
                                                            <Text style={{
                                                                color: Colors.light,
                                                                fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                lineHeight: 14,
                                                                fontWeight: '600',
                                                                width: '15%',

                                                            }}>Total</Text>

                                                        </View>
                                                    </View>

                                                    <View style={{
                                                        width: '100%', flexDirection: 'row',
                                                        justifyContent: 'space-between',

                                                        height: wide * 0.075,
                                                        marginTop: wide * 0.023


                                                    }}>
                                                        <View style={{
                                                            width: '25%', alignSelf: 'center',

                                                        }}>
                                                            <Image style={{

                                                                marginLeft: wide * 0.03
                                                            }}

                                                                source={{ uri: APIData?.defenderTeamInfo.logoUrl }}
                                                            />
                                                        </View>

                                                        <View style={{
                                                            width: '70%',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            flexDirection: 'row',
                                                            alignSelf: "center",


                                                            paddingBottom: 10,
                                                            paddingTop: 5,
                                                            marginRight: wide * 0.1

                                                        }}>
                                                            {APIData?.defenderQuarterWiseBoxScore.QUARTER_1 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.defenderQuarterWiseBoxScore.QUARTER_1}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }
                                                            {APIData?.defenderQuarterWiseBoxScore.QUARTER_2 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.defenderQuarterWiseBoxScore.QUARTER_2}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }




                                                            {APIData?.defenderQuarterWiseBoxScore.QUARTER_3 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.defenderQuarterWiseBoxScore.QUARTER_3}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }

                                                            {APIData?.defenderQuarterWiseBoxScore?.QUARTER_4 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.defenderQuarterWiseBoxScore?.QUARTER_4}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold, fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }
                                                            {APIData?.defenderQuarterWiseBoxScore.QUARTER_1 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.defenderQuarterWiseBoxScore.Final}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        width: '100%', flexDirection: 'row',
                                                        justifyContent: 'space-between',

                                                        height: wide * 0.075,


                                                    }}>
                                                        <View style={{
                                                            width: '25%', alignSelf: 'center',

                                                        }}>
                                                            <Image style={{

                                                                marginLeft: wide * 0.03
                                                            }}

                                                                source={{ uri: APIData?.challengerTeamInfo.logoUrl }}
                                                            />
                                                        </View>

                                                        <View style={{
                                                            width: '70%',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            flexDirection: 'row',
                                                            alignSelf: "center",

                                                            paddingBottom: 10,
                                                            paddingTop: 5,
                                                            marginRight: wide * 0.1

                                                        }}>
                                                            {APIData?.challengerQuarterWiseBoxScore.QUARTER_1 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.challengerQuarterWiseBoxScore.QUARTER_1}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }
                                                            {APIData?.challengerQuarterWiseBoxScore.QUARTER_2 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.challengerQuarterWiseBoxScore.QUARTER_2}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }
                                                            {APIData?.challengerQuarterWiseBoxScore.QUARTER_3 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.challengerQuarterWiseBoxScore.QUARTER_3}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }
                                                            {APIData?.challengerQuarterWiseBoxScore.QUARTER_4 ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.challengerQuarterWiseBoxScore.QUARTER_4}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }
                                                            {APIData?.challengerQuarterWiseBoxScore.Final ?
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>{APIData?.challengerQuarterWiseBoxScore.Final}</Text>
                                                                :
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.SemiBold,
                                                                    fontSize: 12,
                                                                    lineHeight: 14,
                                                                    fontWeight: '600',
                                                                    width: '15%',

                                                                }}>-</Text>
                                                            }

                                                        </View>
                                                    </View>

                                                </View>

                                                <View style={{ backgroundColor: 'rgba(34, 37, 46, 1)', width: '100%', justifyContent: 'space-around', height: wide * 0.5, borderRadius: 14, marginTop: wide * 0.04, paddingVertical: wide * 0.03, paddingHorizontal: wide * 0.02 }}>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>2 points</Text>

                                                            <View style={{ marginTop: wide * 0.03, flexDirection: 'row', alignItems: 'center' }} >
                                                                <Text style={{ color: '#CE1141', fontSize: 14, fontWeight: '400', marginRight: wide * 0.02 }}>{APIData?.defenderGamePoints.twoPoints}</Text>
                                                                <PieChart
                                                                    widthAndHeight={52}
                                                                    series={[parseFloat(APIData?.challengerGamePoints.twoPoints), parseFloat(APIData?.defenderGamePoints.twoPoints)]}

                                                                    sliceColor={['#FDB927', '#CE1141']}
                                                                    doughnut={true}
                                                                    coverRadius={0.96}
                                                                    coverFill={'#22252E'}



                                                                />


                                                                <Text style={{ color: '#FDB927', fontSize: 14, fontWeight: '400', marginLeft: wide * 0.02 }}>{APIData?.challengerGamePoints.twoPoints}</Text>

                                                            </View>
                                                        </View>
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>3 points</Text>

                                                            <View style={{ marginTop: wide * 0.03, flexDirection: 'row', alignItems: 'center' }} >
                                                                <Text style={{ color: '#CE1141', fontSize: 14, fontWeight: '400', marginRight: wide * 0.02 }}>{APIData?.defenderGamePoints.threePoints}</Text>
                                                                <PieChart
                                                                    widthAndHeight={52}
                                                                    series={[parseFloat(APIData?.challengerGamePoints.threePoints), parseFloat(APIData?.defenderGamePoints.threePoints)]}

                                                                    sliceColor={['#FDB927', '#CE1141']}
                                                                    doughnut={true}
                                                                    coverRadius={0.96}
                                                                    coverFill={'#22252E'}



                                                                />


                                                                <Text style={{ color: '#FDB927', fontSize: 14, fontWeight: '400', marginLeft: wide * 0.02 }}>{APIData?.challengerGamePoints.threePoints}</Text>

                                                            </View>
                                                        </View>
                                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>Free throws</Text>

                                                            <View style={{ marginTop: wide * 0.03, flexDirection: 'row', alignItems: 'center' }} >
                                                                <Text style={{ color: '#CE1141', fontSize: 14, fontWeight: '400', marginRight: wide * 0.02 }}>{APIData?.defenderGamePoints?.freeThrows}</Text>
                                                                <PieChart
                                                                    widthAndHeight={52}
                                                                    series={[parseFloat(APIData?.challengerGamePoints.freeThrows), parseFloat(APIData?.defenderGamePoints.freeThrows)]}

                                                                    sliceColor={['#FDB927', '#CE1141']}
                                                                    doughnut={true}
                                                                    coverRadius={0.96}
                                                                    coverFill={'#22252E'}



                                                                />

                                                                <Text style={{ color: '#FDB927', fontSize: 14, fontWeight: '400', marginLeft: wide * 0.02 }}>{APIData?.challengerGamePoints?.freeThrows}</Text>

                                                            </View>
                                                        </View>


                                                    </View>

                                                    <View style={{ marginTop: wide * 0.03 }}>
                                                        <Text style={{ color: '#BDBEC0', alignSelf: 'center', fontSize: 11, fontWeight: '500' }}>Rebounds</Text>
                                                        <View style={{ flexDirection: 'row', marginTop: wide * 0.02, justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{

                                                                backgroundColor: '#FF2D2D',

                                                                padding: 5,
                                                                borderRadius: 5


                                                            }}><Text style={{
                                                                fontSize: 10,
                                                                fontWeight: '500',
                                                                color: Colors.light,
                                                            }}>Foul</Text></TouchableOpacity>

                                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>{APIData?.defenderGamePoints.rebounds}</Text>

                                                            <ProgressBar style={{
                                                                backgroundColor: '#4A4E5A'
                                                            }} progress={parseFloat((APIData?.defenderGamePoints.rebounds) / 10)}
                                                                width={100}
                                                                color={'#CE1141'}

                                                            />
                                                            <ProgressBar style={{
                                                                transform: [{ rotateY: '180deg' }],
                                                                backgroundColor: '#4A4E5A'
                                                            }} progress={parseFloat((APIData?.challengerGamePoints.rebounds) / 10)}
                                                                width={100}
                                                                color={'#FDB927'}

                                                            />

                                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>{APIData?.challengerGamePoints.rebounds}</Text>



                                                            <TouchableOpacity style={{

                                                                backgroundColor: '#FF2D2D',

                                                                padding: 5,
                                                                borderRadius: 5


                                                            }}><Text style={{
                                                                fontSize: 10,
                                                                fontWeight: '500',
                                                                color: Colors.light,
                                                            }}>Foul</Text></TouchableOpacity>



                                                        </View>

                                                        <Text style={{ color: '#BDBEC0', alignSelf: 'center', fontSize: 11, fontWeight: '500' }}>Turnovers</Text>
                                                        <View style={{ flexDirection: 'row', marginTop: wide * 0.02, justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <TouchableOpacity style={{

                                                                backgroundColor: '#FF2D2D',

                                                                padding: 5,
                                                                borderRadius: 5


                                                            }}><Text style={{
                                                                fontSize: 10,
                                                                fontWeight: '500',
                                                                color: Colors.light,
                                                            }}>Foul</Text></TouchableOpacity>

                                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>{APIData?.defenderGamePoints.turnOvers}</Text>

                                                            <ProgressBar style={{
                                                                backgroundColor: '#4A4E5A'
                                                            }} progress={parseFloat((APIData?.defenderGamePoints.turnOvers) / 5)}
                                                                width={100}
                                                                color={'#CE1141'}

                                                            />
                                                            <ProgressBar style={{
                                                                transform: [{ rotateY: '180deg' }],
                                                                backgroundColor: '#4A4E5A'
                                                            }} progress={parseFloat((APIData?.challengerGamePoints.turnOvers) / 5)}
                                                                width={100}
                                                                color={'#FDB927'}

                                                            />

                                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '400' }}>{APIData?.challengerGamePoints.turnOvers}</Text>



                                                            <TouchableOpacity style={{

                                                                backgroundColor: '#FF2D2D',

                                                                padding: 5,
                                                                borderRadius: 5


                                                            }}><Text style={{
                                                                fontSize: 10,
                                                                fontWeight: '500',
                                                                color: Colors.light,
                                                            }}>Foul</Text></TouchableOpacity>



                                                        </View>

                                                    </View>


                                                </View>

                                            </View>

                                            <View style={{ marginTop: wide * 0.1 }}>

                                                <Text style={{ color: Colors.light, fontSize: 22, fontWeight: '600', }}>Player stats</Text>
                                                <View style={{ marginTop: wide * 0.05, flexDirection: 'row', alignItems: 'center' }}>
                                                    <ImageBackground

                                                        style={{
                                                            width: 34,
                                                            height: 34,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                        source={require("../../Images/whitecircle.png")}
                                                    >

                                                        <Image
                                                            style={{
                                                                width: 22,
                                                                height: 22,

                                                            }}
                                                            source={{ uri: APIData?.defenderTeamInfo.logoUrl }}
                                                        />

                                                    </ImageBackground>
                                                    <Text style={{
                                                        color: Colors.light,
                                                        fontWeight: '600',
                                                        fontSize: 14,
                                                        marginLeft: wide * 0.02

                                                    }}>{APIData?.defenderTeamInfo.name}</Text>


                                                </View>
                                            </View>
                                            <View style={{ marginTop: wide * 0.06, }}>
                                                <View style={{
                                                    width: '100%', flexDirection: 'row',
                                                    justifyContent: 'space-around',
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
                                                        }}>Starters</Text>
                                                    </View>

                                                    <View style={{
                                                        width: '70%',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-around',
                                                        flexDirection: 'row',
                                                        alignSelf: "center",


                                                    }}>







                                                        {arr1.map(key => {

                                                            return (
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.Regular, fontSize: 14,
                                                                    lineHeight: 18,
                                                                    fontWeight: '400',
                                                                    width: '15%',

                                                                }}>{key.point_label}</Text>
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
                                                    data={APIData.defenderTeamKpi}

                                                    scrollEnabled={false}



                                                    renderItem={(item, index) => starters(item, index)}

                                                />


                                            </View>




                                            {/* Los Angeles Lakers */}



                                            <View style={{ marginTop: wide * 0.05 }}>


                                                <View style={{ marginTop: wide * 0.05, flexDirection: 'row', alignItems: 'center' }}>
                                                    <ImageBackground

                                                        style={{
                                                            width: 34,
                                                            height: 34,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                        source={require("../../Images/whitecircle.png")}
                                                    >

                                                        <Image
                                                            style={{
                                                                width: 22,
                                                                height: 22,

                                                            }}
                                                            source={{ uri: APIData?.challengerTeamInfo.logoUrl }}
                                                        />

                                                    </ImageBackground>
                                                    <Text style={{
                                                        color: Colors.light,
                                                        fontWeight: '600',
                                                        fontSize: 14,
                                                        marginLeft: wide * 0.02

                                                    }}>{APIData?.challengerTeamInfo.name}</Text>


                                                </View>
                                            </View>
                                            <View style={{ marginTop: wide * 0.06, }}>
                                                <View style={{
                                                    width: '100%', flexDirection: 'row',
                                                    justifyContent: 'space-around',
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
                                                        }}>Starters</Text>
                                                    </View>

                                                    <View style={{
                                                        width: '70%',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-around',
                                                        flexDirection: 'row',
                                                        alignSelf: "center",


                                                    }}>







                                                        {arr2.map(key => {

                                                            return (
                                                                <Text style={{
                                                                    color: Colors.light,
                                                                    fontFamily: Fonts.Regular, fontSize: 14,
                                                                    lineHeight: 18,
                                                                    fontWeight: '400',
                                                                    width: '15%',

                                                                }}>{key.point_label}</Text>
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
                                                    data={APIData.challengerTeamKpi}

                                                    scrollEnabled={false}



                                                    renderItem={(item, index) => starters1(item, index)}

                                                />


                                            </View>




                                        </View>
                                        :
                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.05 }}>

                                            <ImageBackground
                                                style={{ height: wide * 1.5, width: '100%' }}
                                                source={require("../../Images/coatbg.png")}
                                                resizeMode={'contain'}
                                            >

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.05 }}>


                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.challengerTeamInfo.lineup.playerPositionsList[0].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    :
                                                                    { uri: APIData.challengerTeamInfo.lineup.playerPositionsList[0].availablePlayersList[0].playerProfilePictureUrl }

                                                            }
                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EDAD24', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.challengerTeamInfo.lineup.playerPositionsList[0].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.challengerTeamInfo.lineup.playerPositionsList[1].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    :
                                                                    { uri: APIData.challengerTeamInfo.lineup.playerPositionsList[1].availablePlayersList[0].playerProfilePictureUrl }}
                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EDAD24', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.challengerTeamInfo.lineup.playerPositionsList[1].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.07 }}>


                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.challengerTeamInfo.lineup.playerPositionsList[2].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    :
                                                                    { uri: APIData.challengerTeamInfo.lineup.playerPositionsList[2].availablePlayersList[0].playerProfilePictureUrl }}
                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EDAD24', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.challengerTeamInfo.lineup.playerPositionsList[2].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.challengerTeamInfo.lineup.playerPositionsList[3].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    : { uri: APIData.challengerTeamInfo.lineup.playerPositionsList[3].availablePlayersList[0].playerProfilePictureUrl }}
                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EDAD24', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.challengerTeamInfo.lineup.playerPositionsList[3].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.08 }}>


                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.challengerTeamInfo.lineup.playerPositionsList[4].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    : { uri: APIData.challengerTeamInfo.lineup.playerPositionsList[4].availablePlayersList[0].playerProfilePictureUrl }}
                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EDAD24', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.challengerTeamInfo.lineup.playerPositionsList[4].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>




                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.13 }}>


                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.defenderTeamInfo.lineup.playerPositionsList[0].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    : { uri: APIData.defenderTeamInfo.lineup.playerPositionsList[0].availablePlayersList[0].playerProfilePictureUrl }}

                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#CE1141', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.defenderTeamInfo.lineup.playerPositionsList[0].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>




                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.06 }}>


                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.defenderTeamInfo.lineup.playerPositionsList[1].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    : { uri: APIData.defenderTeamInfo.lineup.playerPositionsList[1].availablePlayersList[0].playerProfilePictureUrl }}

                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#CE1141', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.defenderTeamInfo.lineup.playerPositionsList[1].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.defenderTeamInfo.lineup.playerPositionsList[2].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    : { uri: APIData.defenderTeamInfo.lineup.playerPositionsList[2].availablePlayersList[0].playerProfilePictureUrl }}

                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#CE1141', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.defenderTeamInfo.lineup.playerPositionsList[2].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>

                                                </View>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wide * 0.06 }}>


                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.defenderTeamInfo.lineup.playerPositionsList[3].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    : { uri: APIData.defenderTeamInfo.lineup.playerPositionsList[3].availablePlayersList[0].playerProfilePictureUrl }}

                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#CE1141', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.defenderTeamInfo.lineup.playerPositionsList[3].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>






                                                    <View style={{ alignItems: 'center' }}>
                                                        <Image
                                                            style={{
                                                                width: 68,
                                                                height: 48
                                                            }}
                                                            source={
                                                                APIData.defenderTeamInfo.lineup.playerPositionsList[4].availablePlayersList[0].playerProfilePictureUrl == "" ?
                                                                    require("../../Images/playerpic.png")
                                                                    : { uri: APIData.defenderTeamInfo.lineup.playerPositionsList[4].availablePlayersList[0].playerProfilePictureUrl }}

                                                        />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#CE1141', width: 105, borderRadius: 15, height: 14 }}>
                                                            <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>{APIData.defenderTeamInfo.lineup.playerPositionsList[4].availablePlayersList[0].playerName}</Text>
                                                        </View>
                                                    </View>

                                                </View>




                                            </ImageBackground>

                                            {APIData.statsCalculated == false ?
                                                <TouchableOpacity style={{ backgroundColor: '#246BFD', marginVertical: wide * 0.05, width: wide * 0.8, height: wide * 0.14, borderRadius: wide * 0.1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{
                                                        color: Colors.light,
                                                        fontSize: 15,
                                                        fontWeight: '700'
                                                    }}>Edit Lineup</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                            }
                                        </View>

                                    }
                                </View>






                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                    :
                    null}
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
export default connect(mapStateToProps)(GameDetails);
