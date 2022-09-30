import { View, Text, Image, ImageBackground, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Layout, Colors, Fonts, CommonStyles } from '../../../../constants'
import { getListOFChallenges } from '../../../../actions/home'
import AppLoader from '../../../../utils/Apploader';
import { connect } from 'react-redux';
import SubscriptionChallengeBriefInfos from './SubscriptionChallengeBriefInfos';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SwitchToggle from "react-native-switch-toggle";


const RoadToPro = (props) => {
    const [loading, setLoading] = useState(false)
    const [teamId, setTeamId] = useState()
    const [roadToProData, setRoadToProData] = useState()
    const [selectedLevel, setSelectedLevel] = useState(0)
    const [paymentCheck, setPaymentCheck] = useState(true)

    useEffect(() => {
        setLoading(true)

        props.dispatch(getListOFChallenges(props.teamId, '0', (result, response) => {

            if (result) {
               
                setRoadToProData(response.subscriptionLevelResponseArrayList);
                setPaymentCheck(response.premiumPurchased)
                setLoading(false)
            } else {
                //console.log("eysadata",props.teamId)
            }
        }))
    }, [props.teamId])

    let wide = Layout.width;
    return (
        <View style={{ marginLeft: wide * 0.04, marginRight: wide * 0.04, marginTop: wide * 0.01 }}>
            {paymentCheck ?
                <ScrollView
                    bounces={true}
                >
                    <View  >
                        <AppLoader visible={loading} />

                        {/* For Level Bottom bar */}
                        {/* <FlatList

                        data={roadToProData}

                        showsHorizontalScrollIndicator={false}
                        horizontal
                        pagingEnabled={true}

                        legacyImplementation={false}

                        keyExtractor={item => item.index}
                        renderItem={(item, index) =>

                            <View style={{ height: wide * 0.5 }}>
                                <TouchableOpacity onPress={() => { setSelectedLevel(item.index) }}>
                                    <View style={{
                                        width: wide * 0.23, height: wide * 0.32,
                                        marginTop: 24, borderRadius: wide * 0.03, borderWidth: 3,
                                        borderColor: Colors.borderColor,


                                        justifyContent: 'center', alignItems: 'center',
                                        marginLeft: item.index === 0 ? 0 : wide * 0.05


                                    }}>
                                        {item.item.levelImageUrl == "" ?
                                            <Image style={{
                                                width: '60%', height: '60%', tintColor: item.index === 0 ? Colors.stars :
                                                    item.index === 1 ?
                                                        Colors.light : Colors.overlayWhite
                                            }} resizeMode={'contain'}
                                                source={require('../../../../Images/level_gold.png')} />
                                            :
                                            <Image style={{
                                                width: '60%', height: '60%', tintColor: item.index === 0 ? Colors.stars :
                                                    item.index === 1 ?
                                                        Colors.light : Colors.overlayWhite
                                            }} resizeMode={'contain'}

                                                source={{ uri: item.item.levelImageUrl }}
                                            />
                                        }

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
                                        left: item.index === 0 ? wide * 0.1 / 9 : 0,
                                        borderTopRightRadius: roadToProData.length > 0 ? item.index === roadToProData.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                                        borderBottomRightRadius: roadToProData.length > 0 ? item.index === roadToProData.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                                        Right: roadToProData.length > 0 ? item.index === roadToProData.length - 1 ? wide * 0.1 / 2 : 0 : 0,
                                    }}>


                                    </View>
                                    <Image style={{
                                        width: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07,
                                        height: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07,
                                        position: 'absolute',
                                        left: wide * 0.14,
                                        left: item.index === 0 ? wide * 0.1 : wide * 0.14,
                                        tintColor: item.index === 0 ? Colors.stars : item.index === 1 ? Colors.shade : null
                                    }} resizeMode={'contain'}
                                        source={item.index === 0 || item.index === 1 ? require('../../../../Images/tick_selected.png') : require('../../../../Images/lock_circle.png')} />
                                </View>
                            </View>

                        }
                    /> */}


                        <FlatList

                            data={roadToProData}

                            showsHorizontalScrollIndicator={false}
                            horizontal
                            pagingEnabled={true}
                            bounces={false}
                            legacyImplementation={false}

                            keyExtractor={item => item.index}
                            renderItem={(item, index) =>

                                <View style={{ height: wide * 0.4 }}>
                                    <TouchableOpacity onPress={() => { setSelectedLevel(item.index) }}>
                                        <View style={{
                                            width: wide * 0.23, height: wide * 0.32,
                                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 3,
                                            borderColor: Colors.borderColor,

                                            backgroundColor: selectedLevel == item.index ? '#246BFD' : '#181A20',


                                            justifyContent: 'center', alignItems: 'center',
                                            marginLeft: item.index === 0 ? 0 : wide * 0.05


                                        }}>

                                            <Image style={{
                                                width: '60%', height: '60%'
                                            }} resizeMode={'contain'}
                                                source={
                                                    item.item.levelImageUrl == "" ?
                                                        require('../../../../Images/coachlevel.png')
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

                                </View>

                            }
                        />


                        {roadToProData != undefined ?
                            <SubscriptionChallengeBriefInfos data={roadToProData} selectedLevel={selectedLevel} teamId={props.teamId} />
                            :
                            null
                        }




                    </View >
                </ScrollView>
                :
                <View>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{
                            width: '98%',
                            height: wide * 1.16,
                            alignSelf: 'center',
                            marginTop: wide * 0.06,
                            borderRadius: wide * 0.03,
                            // alignItems: 'center',

                        }}>
                            <Image
                                source={require('../../../../Images/premiumCard.png')}
                                style={{
                                    width: '100%', height: '100%', position: 'absolute',
                                    borderRadius: wide * 0.03,
                                }}
                                resizeMode={'cover'}
                            />
                            <View style={{
                                marginTop: wide * 0.05,
                                flexDirection: "row", width: '95%',
                                alignSelf: 'center'
                            }}>
                                <Image
                                    source={require('../../../../Images/premiumCardTagIcon.png')}
                                    style={{
                                        width: wide * 0.09, height: wide * 0.09,
                                        marginLeft: wide * 0.01,
                                    }}
                                    resizeMode={'cover'}
                                />
                                <View style={{
                                    marginLeft: wide * 0.07, alignItems: 'center',
                                    marginTop: wide * 0.02
                                }}>
                                    <Text style={{
                                        fontWeight: "500",
                                        fontSize: 15,
                                        lineHeight: 22,
                                        fontFamily: Fonts.Medium,
                                        color: Colors.light
                                    }}>GET THE</Text>

                                    <Text style={{
                                        fontWeight: "800",
                                        fontSize: 26,
                                        lineHeight: 28,
                                        fontFamily: Fonts.XBold,
                                        color: Colors.light
                                    }}>NEXTUP PRIME</Text>
                                </View>
                            </View>

                            <View style={{
                                // alignItems: 'center',
                                marginTop: wide * 0.19,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'center',
                                    marginLeft: wide * 0.06,
                                }}>
                                    <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                                        style={{ width: 15, height: 15 }}
                                    />
                                    <Text style={{
                                        fontWeight: "600",
                                        fontSize: 15,
                                        lineHeight: 22,
                                        fontFamily: Fonts.SemiBold,
                                        color: Colors.light,
                                        marginLeft: wide * 0.02
                                    }}>Create Multiple Lineup</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'center',
                                    marginLeft: wide * 0.06,
                                    marginTop: wide * 0.03
                                }}>
                                    <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                                        style={{ width: 15, height: 15 }}
                                    />
                                    <Text style={{
                                        fontWeight: "600",
                                        fontSize: 15,
                                        lineHeight: 22,
                                        fontFamily: Fonts.SemiBold,
                                        color: Colors.light,
                                        marginLeft: wide * 0.02
                                    }}>Road to Pro challenges</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'center',
                                    marginLeft: wide * 0.06,
                                    marginTop: wide * 0.03
                                }}>
                                    <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                                        style={{ width: 15, height: 15 }}
                                    />
                                    <Text style={{
                                        fontWeight: "600",
                                        fontSize: 15,
                                        lineHeight: 22,
                                        fontFamily: Fonts.SemiBold,
                                        color: Colors.light,
                                        marginLeft: wide * 0.02
                                    }}>Asigned multiple challenges</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'center',
                                    marginLeft: wide * 0.06,
                                    marginTop: wide * 0.03
                                }}>
                                    <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                                        style={{ width: 15, height: 15 }}
                                    />
                                    <Text style={{
                                        fontWeight: "600",
                                        fontSize: 15,
                                        lineHeight: 22,
                                        fontFamily: Fonts.SemiBold,
                                        color: Colors.light,
                                        marginLeft: wide * 0.02
                                    }}>See game advance statistics</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'center',
                                    marginLeft: wide * 0.06,
                                    marginTop: wide * 0.04
                                }}>
                                    <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                                        style={{ width: 15, height: 15 }}
                                    />
                                    <Text style={{
                                        fontWeight: "600",
                                        fontSize: 15,
                                        lineHeight: 22,
                                        fontFamily: Fonts.SemiBold,
                                        color: Colors.light,
                                        marginLeft: wide * 0.02
                                    }}>See player advance statistics</Text>
                                </View>
                            </View>
                            <View style={{
                                justifyContent: 'center', alignItems: 'center',
                                marginTop: wide * 0.05,
                            }}>
                                <Text style={{
                                    fontWeight: "700",
                                    fontSize: 37,
                                    lineHeight: 40,
                                    fontFamily: Fonts.Bold,
                                    color: Colors.premiumPriceColor,
                                    marginLeft: wide * 0.02
                                }}>$ 78.99</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', marginTop: wide * 0.05, alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontWeight: "700",
                                    fontSize: 14,
                                    lineHeight: 18,
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light,
                                    marginHorizontal: wide * 0.03
                                }}>Monthly</Text>
                                <SwitchToggle
                                    // switchOn={on}
                                    containerStyle={{
                                        // marginTop: 16,
                                        width: wide * 0.18,
                                        height: 38,
                                        borderRadius: 25,
                                        padding: 5,
                                    }}
                                    circleStyle={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,

                                    }}
                                    // onPress={() => off(!on)}
                                    circleColorOff={Colors.light}
                                    circleColorOn={Colors.light}
                                    backgroundColorOn='#444856'
                                    backgroundColorOff='#444856'
                                />

                                <Text style={{
                                    fontWeight: "700",
                                    fontSize: 14,
                                    lineHeight: 18,
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light,
                                    marginHorizontal: wide * 0.03
                                }}>Yearly</Text>


                            </View>
                        </View>


                    </View>

                    <TouchableOpacity
                        // key={isbtnEnable}
                        activeOpacity={0.3}
                        style={{
                            width: wide * 0.8, height: 48,
                            backgroundColor: Colors.btnBg,
                            alignSelf: 'center', borderRadius: 24,
                            justifyContent: 'center',
                            // opacity: isbtnEnable === false ? 0.3 : 1.0,
                            // marginBottom: 50,
                            marginTop: wide * 0.1,
                        }}
                    // onPress={() => {
                    //   if (isbtnEnable) {
                    //     this.actionAddTeam()
                    //   }
                    // }}
                    >
                        <Text style={{
                            alignSelf: 'center', color: Colors.light,
                            fontFamily: Fonts.Bold,
                            fontSize: 14, lineHeight: 18, fontWeight: '700'
                        }}>Subscribe now</Text>
                    </TouchableOpacity>
                </View>
            }
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
export default connect(mapStateToProps)(RoadToPro);
