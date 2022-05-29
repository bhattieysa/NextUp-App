import React, { Component, useState } from 'react';
import {
    View, TouchableOpacity, Text,
    SafeAreaView, Image,
    ScrollView,
    KeyboardAvoidingView, StyleSheet, FlatList, Linking
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
    CommonStyles
} from '../../constants';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { isNotch } from '../../utils/deviceInfo';
import { calenderTabInfo, calenderIndicatorInfo } from '../../actions/home';
import { getObject } from '../../middleware';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Title } from '../../components/common/titleLabel';
let wide = Layout.width;


class Calender extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            arrCalendarIndicatorData: []
        };
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.onScreenFocus)
    }
    onScreenFocus = () => {
        getObject('UserId').then((obj) => {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).valueOf();
            this.getIndicatorDetail(obj, firstDay, lastDay)
            this.getDetail(obj, Date.now())

        })
    }
    getDetail(obj, currentDate) {
        this.setState({ loading: true }, () => {
            this.props.dispatch(calenderTabInfo(obj, currentDate, (res) => {
                this.setState({ loading: false })

            }))
        })
    }
    getIndicatorDetail = (obj, date1, date2) => {
        debugger
        this.setState({ loading: true }, () => {

            this.props.dispatch(calenderIndicatorInfo(obj, date1, date2, (res, resData) => {
                this.setState({ loading: false })
                if (res) {

                    this.setState({ arrCalendarIndicatorData: resData })
                }
            }))
        })
    }

    listMatches = ({ item }) => {
        const d = new Date(item.scheduledAt);
        // console.log(item)
        return (
            <>
                {/* <TouchableOpacity style={{
                    backgroundColor: '#23262F',//Colors.gameTabCardBg,
                    justifyContent: 'center',
                    alignItems: 'center', marginRight: wide * 0.05, borderRadius: 10,
                    paddingHorizontal: 15,
                    marginTop: wide * 0.03, width: wide * 0.64
                }}
                <Image source={require('../../Images/Rectangle_sort.png')} style={{
                    position: 'absolute', top: 0, left: 10,
                    right: 0, bottom: 0, width: '95%', height: '100%', borderRadius: 10
                }} /> */}
                <TouchableOpacity style={{
                    // marginTop: 10,
                    // justifyContent: 'center',
                    // alignItems: 'center',

                    backgroundColor: '#23262F',//Colors.gameTabCardBg,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginRight: wide * 0.05, 
                    borderRadius: 10,
                    // paddingHorizontal: 15,
                    // marginTop: wide * 0.03, 
                    width: wide * 0.75,
                    marginHorizontal: wide * 0.04,
                }}
                    activeOpacity={1}
                    onPress={() => this.setState({ selectedIndex: item.index })}
                >

                    <Text style={{
                        color: Colors.light, fontSize: 12, fontFamily: Fonts.Bold,
                        lineHeight: 16, marginTop: 10,
                    }}>
                        {moment(d).format('DD MMM YYYY / hh:mm a')}
                        {/* 11 Dec 2020 / 11:00 AM EST */}
                    </Text>

                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row', alignItems: 'center'
                    }}>
                        {/* edit by keshav */}
                        <View style={{
                            width: wide * 0.2, height: wide * 0.2,
                            backgroundColor: Colors.light, borderRadius: wide * 0.2 / 2,
                            justifyContent: 'center', alignItems: 'center'
                        }}>

                            <FastImage style={{ width: wide * 0.14, height: wide * 0.14, }} resizeMode={'contain'}
                                source={{ uri: item.challengerLogoUrl }} />
                        </View>
                        <Text style={{
                            color: Colors.light, fontSize: 24, fontFamily: Fonts.Regular,
                            lineHeight: 30, paddingHorizontal: wide * 0.08

                        }}>VS</Text>
                        <View style={{
                            width: wide * 0.2, height: wide * 0.2,
                            backgroundColor: Colors.light, borderRadius: wide * 0.2 / 2,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <FastImage style={{ width: wide * 0.13, height: wide * 0.13, }}
                                resizeMode={'contain'}
                                source={{ uri: item.defenderLogoUrl }} />
                        </View>
                    </View>



                    <TouchableOpacity style={{
                        backgroundColor: Colors.btnBg,
                        borderRadius: wide * 0.2, flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center', marginTop: wide * 0.02,
                        marginBottom: wide * 0.05
                    }}
                        onPress={() => {
                            var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                            var url = scheme + `${item.geoLocation?.loc?.coordinates[1]},${item.geoLocation?.loc?.coordinates[0]}`;
                            Linking.openURL(url);
                        }}
                    >
                        <Image source={require('../../Images/get_direction.png')} style={{
                            width: 15, height: 15, marginLeft: 15
                        }} />
                        <Text style={{
                            color: Colors.light, fontSize: 11, fontFamily: Fonts.Bold,
                            lineHeight: 12, paddingTop: 8, paddingRight: 15,
                            paddingBottom: 8, paddingLeft: 5
                        }} >Get Direction</Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            </>
        );
    };

    _handleChallengeUploadNavigation = (data) => {
        var data1 = data?.subscriptionLevelInfoList[0]?.challengeList[0];
        let isUpload = true;
        if (data1.hasOwnProperty('previousResponses')) {
            data1.previousResponses.forEach(element => {
                if (element.accepted === null || element.accepted == true) {
                    isUpload = false;
                }
            });
        }

        Navigation.navigate('UploadVideoOfChallenge', {
            challengeData: data1,
            isUpload: isUpload,
            planId: data.id,
            roadToPro: data.roadToPro,
            levelIndex: data.currentLevelState,
            challengeIndex: data.currentChallengeState
        })
    }

    _listOfChalengesNew = (item, index) => {
        // const { roadToProData } = this.props.Home
        const { calenderTabInfoData } = this.props.Home
        console.log("--->", item.item.description)
        // const challangeListData = calenderTabInfoData.subscriptionsList[0];
        // if (item.item.roadToPro === true) {
        let data1 = item?.item.subscriptionLevelInfoList[0];
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this._handleChallengeUploadNavigation(item.item)}
                style={[{
                    marginTop: wide * 0.04,
                    // height: wide * 0.23,
                    justifyContent: 'center'
                },
                item.item.active === true ?
                    {
                        borderWidth: 2, borderColor: Colors.stars, borderRadius: 10
                    }
                    : {
                        borderWidth: 2, borderColor: Colors.statDropColor2, borderRadius: 10
                    }
                ]}>
                <Image style={{
                    position: 'absolute',
                    width: '100%', height: "100%",
                    borderRadius: 30
                }}
                    resizeMode={'stretch'}
                    source={{ uri: data1.challengeList[0].trailerVideoUrl?.thumbnailUrl }}
                ></Image>
                <Image style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0,
                    right: 0, width: '100%', height: '100%',
                    borderRadius: 30,

                }} resizeMode={'stretch'} source={require('../../Images/Rect_dummy.png')} />

                <View style={{ marginLeft: 15, flexDirection: 'row', marginVertical: 25 }}>

                    <View style={{ flex: 1, justifyContent: 'center' }} >

                        <Text style={{
                            color: Colors.light, fontSize: 20, lineHeight: 22,
                            fontFamily: Fonts.SemiBold, width: wide * 0.6
                        }}>
                            {data1.challengeList[0].name}
                            {/* {item.item.subscriptionLevelInfoList[0].challengeList[0].name} */}
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: item.item.active === true ? Colors.stars : Colors.statDropColor2,
                        justifyContent: 'center', marginRight: 10, borderRadius: 5
                    }}>
                        {
                            item.item.active !== true ?
                                <Text style={{
                                    color: Colors.light, fontSize: 12, lineHeight: 14,
                                    fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                                }}>


                                    Completed
                                </Text>
                                :

                                <Text style={{
                                    color: Colors.light, fontSize: 12, lineHeight: 14,
                                    fontFamily: Fonts.SemiBoldItalic, paddingHorizontal: 15, textAlign: 'right',
                                }}>
                                    Active
                                </Text>

                        }


                    </View>

                </View>


            </TouchableOpacity>

        )
        // }
    }




    _listOfChalenges = (item, index) => {
        const { calenderTabInfoData } = this.props.Home
        console.log("--->", item.item.description)
        const challangeListData = calenderTabInfoData.subscriptionsList[0];
        if (item.item.roadToPro === false) {
            let data1 = item?.item.subscriptionLevelInfoList[0];
            return (
                <TouchableOpacity
                    style={{
                        margin: 15,
                    }}
                    onPress={() => Navigation.navigate('UploadVideoOfChallenge', {
                        challengeData: data1.challengeList[0],
                        isUpload: true,
                        planId: challangeListData.id,
                        roadToPro: challangeListData.roadToPro,
                        levelIndex: challangeListData.currentLevelState,
                        challengeIndex: challangeListData.currentChallengeState
                    })}
                >
                    {/* <Image source={require('../../Images/Rectangle_sort.png')} style={{
                        position: 'absolute', top: 5, left: - 10,
                        right: -10, bottom: 0, width: wide * 0.5, borderRadius: (wide * 0.06) / 2, height: wide * 0.42
                    }} /> */}
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{
                            marginTop: 3,
                            flex: 1

                        }}>
                            <Image style={{
                                position: 'absolute',
                                width: '100%', height: wide * 0.4, borderTopLeftRadius: 5, borderTopRightRadius: 5
                            }} resizeMode={'stretch'} source={{ uri: data1.challengeList[0].trailerVideoUrl?.thumbnailUrl }} >

                            </Image>
                            <Image style={{
                                position: 'absolute', width: '100%', height: wide * 0.6
                            }}
                                resizeMode={"contain"}
                                source={require('../../Images/Rect_dummy.png')} >

                            </Image>

                            {/* <Image style={{
                                width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: wide * 0.03
                            }} source={require('../../Images/play_ico.png')} ></Image> */}


                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                <Text style={{
                                    color: Colors.light, fontSize: 25, lineHeight: 40, fontFamily: Fonts.Bold, marginLeft: 10,
                                }}>
                                    {data1.challengeList[0].name}
                                </Text>

                            </View>
                            <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
                                width: wide * 0.78, alignSelf: 'center',
                                textAlign: 'center', marginTop: wide * 0.01, opacity: 1
                            }}>{data1.challengeList[0].description}</Text>

                            <View style={{ flexDirection: 'row', marginTop: wide * 0.03 }}>
                                <Image style={{
                                    position: 'absolute', width: "100%", height: wide * 0.1, marginTop: wide * 0.05, borderRadius: wide * 0.01,
                                }} source={require('../../Images/Pro.png')} ></Image>
                                <Image style={{
                                    width: 20, height: 20, top: 27, marginLeft: wide * 0.08
                                }} source={require('../../Images/bulb.png')} ></Image>
                                <Text style={{
                                    color: Colors.light, fontSize: 14, lineHeight: 15,
                                    fontFamily: Fonts.SemiBold, marginTop: wide * 0.073, textAlign: 'center', fontStyle: 'italic'
                                }}>   Pro Tip:</Text>
                                <Text style={{
                                    color: Colors.light, fontSize: 13, lineHeight: 14, fontFamily: Fonts.Regular,
                                    marginTop: wide * 0.075, textAlign: 'center', fontStyle: 'italic'
                                }}>{data1.challengeList[0].proTips}</Text>
                            </View>






                            {/* <Text style={{
                                color: Colors.shade, fontSize: 10, fontFamily: Fonts.SemiBold,
                                lineHeight: 14, marginTop: 15, marginLeft: 20, alignItems: 'center'
    
                            }}>     Posted By </Text>
                            <Image style={{ width: wide * 0.25, height: wide * 0.25, borderRadius: (wide * 0.25) / 2, marginTop: 5 }}
                                // resizeMode={'contain'}
                                source={require('../../Images/avatar.png')} />
                            <Text style={{
                                color: Colors.light, fontSize: 10,
                                lineHeight: 20, fontFamily: Fonts.Bold, marginTop: 5, marginLeft: 17
                            }}>{item.item.name}</Text>
    
                        </View>
    
    
                        <View >
                            <Text style={{
                                color: Colors.shade,
                                fontFamily: Fonts.Regular, fontSize: 12, lineHeight: 15,
                                width: wide * 0.5, marginTop: wide * 0.1, opacity: 1, left: 10
                            }}>
                                {item.item.description}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: 10, left: 10 }}>
                                <Image source={require('../../Images/clock.png')} style={{
                                    width: 15, height: 15,
                                }} />
                                <Text style={{
                                    color: Colors.shade,
                                    fontFamily: Fonts.Medium, fontSize: 12, lineHeight: 15,
                                    width: wide * 0.5, opacity: 1,
                                }}>  Expiry Date - 17 Dec 2021</Text>
                            </View> */}

                        </View>
                    </View>

                </TouchableOpacity >

            );
        }
        // console.log(challangeListData.roadToPro);
        // console.log("Plan id: ", challangeListData?.subscriptionsList[0].planId);

    }


    render() {
        const { calenderTabInfoData } = this.props.Home
        // console.log("--->>0", calenderTabInfoData?.subscriptionsList[0].subscriptionLevelInfoList[0].challengeList)
        // const challangeListData = calenderTabInfoData.subscriptionsList[0];
        console.log(calenderTabInfoData);
        // console.log("0 ", calenderTabInfoData.challengeList[0].contentVideoUrl);
        // console.log("1 ", calenderTabInfoData.challengeList[0].trailerVideoUrl);
        return (
            calenderTabInfoData.length === 0 ?
                <View style={{ flex: 1, backgroundColor: Colors.base }}>
                    <AppLoader visible={this.state.loading} />
                </View>
                :
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                    {/* <AppLoader visible={this.state.loading} /> */}
                    <View style={[CommonStyles.headerBottomLine]}>
                        <ScreenHeader
                            title={'Calendar'}
                            backButtonAction={() => Navigation.back()}
                        />
                    </View>
                    {/* <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
                        <TouchableOpacity onPress={() => Navigation.back()}>
                            <Image style={{
                                width: wide * 0.1, height: wide * 0.1,
                                marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1,
                                borderColor: Colors.borderColor, marginHorizontal: 10
                            }} source={require('../../Images/back_ico.png')} />
                        </TouchableOpacity>
                    </View> */}

                    <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                        <ScrollView showsVerticalScrollIndicator={false}
                            bounces={false}
                            contentContainerStyle={{
                                // marginHorizontal: 15,
                                // backgroundColor: "green",
                                // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, 
                                paddingBottom: isNotch ? 0 : 10
                            }}>
                            {/* <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.08, marginHorizontal: 15 }}>
                            <Text style={styles.headerText}>
                                Calendar  </Text>
                        </View> */}
                            <View style={{ marginHorizontal: 24, }}>
                                <CalenderPick
                                    arrData={this.state.arrCalendarIndicatorData}
                                    actionMonthChange={(e) => {

                                        getObject('UserId').then((obj) => {
                                            var date = new Date(e.dateString)
                                            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
                                            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).valueOf();
                                            this.getIndicatorDetail(obj, firstDay, lastDay)
                                        })
                                    }}
                                    actionDateChange={(e) => {
                                        getObject('UserId').then((obj) => {
                                            var date = new Date(e.dateString).valueOf()
                                            this.getDetail(obj, date)
                                        })
                                    }}
                                // done={(e) => this.RentAction(e)}
                                // close={() => this.setState({ show: false })} 
                                />
                                <View style={{
                                    backgroundColor: Colors.base, marginTop: wide * 0.02,

                                    flexDirection: 'row'
                                }}>
                                    {/* <View>
                                    <Text style={{
                                        color: Colors.light, fontSize: 18, lineHeight: 26, fontFamily: Fonts.Regular
                                    }}>
                                        {moment().format('YYYY')} </Text>
                                    <Text style={styles.headerText} >
                                        {moment().format('MMMM')}  </Text>
                                </View> */}

                                    <View style={{ marginTop: 20, width: '100%', }}>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <Image source={require('../../Images/blue.png')} style={{
                                                width: 10, height: 10,
                                            }} />
                                            <Text style={{
                                                color: Colors.light, fontSize: 12, lineHeight: 12, left: 3, fontFamily: Fonts.SemiBold,
                                            }}>
                                                Match  </Text>
                                            <View style={{ flex: 1 }}></View>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignContent: 'flex-end',
                                                justifyContent: 'flex-end'
                                            }}>
                                                <Image source={require('../../Images/yellow.png')} style={{

                                                    width: 10, height: 10,
                                                }} />
                                                <Text style={{
                                                    color: Colors.light, fontSize: 12, lineHeight: 12, left: 3, fontFamily: Fonts.SemiBold, alignSelf: 'flex-end',
                                                }}>
                                                    Challenge  </Text>
                                            </View>
                                        </View>

                                    </View>

                                </View>

                            </View>
                            {calenderTabInfoData?.gameBriefInfoList?.length > 0 ?
                                <>
                                    <View style={{ marginTop: 30, }}>
                                        <Title data={'Matches'} />
                                    </View>
                                    <View style={{ marginHorizontal: 10, marginTop: wide * 0.05, }}>
                                        <FlatList
                                            keyExtractor={(item, index) => index.toString()}
                                            data={calenderTabInfoData?.gameBriefInfoList}
                                            renderItem={(item, index) => this.listMatches(item, index)}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal
                                            pagingEnabled
                                        />

                                    </View>
                                </>

                                : null
                            }


                            {calenderTabInfoData.subscriptionsList !== null && calenderTabInfoData.subscriptionsList[0] !== undefined ?
                                // {calenderTabInfoData.subscriptionsList !== null ?
                                <>
                                    <View style={{ marginTop: 30, }}>
                                        <Title data={'Challenge'} />
                                    </View>



                                    <FlatList
                                        style={{
                                            marginTop: wide * 0.01,
                                            // overflow: 'visible', 
                                            marginHorizontal: 24,
                                            // backgroundColor: 'green'
                                        }}
                                        data={calenderTabInfoData.subscriptionsList}
                                        // data={challangeListData?.subscriptionLevelInfoList[0].challengeList}
                                        renderItem={(item, index) => this._listOfChalengesNew(item, index)}
                                        showsVerticalScrollIndicator={false}
                                    // horizontal
                                    // pagingEnabled
                                    />
                                </>
                                : null
                            }
                            {/* <Challenges /> */}
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView >

        )
    }
}
function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(Calender);

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
    searchIcon: {
        position: 'absolute',
        top: wide * 0.08,
        left: wide * 0.04,
    },
    filter: {
        height: wide * 0.1,
        width: wide * 0.1,
        backgroundColor: Colors.base,
        borderRadius: (wide * 0.1) / 2,
    },
    filterlabel: {
        fontSize: 12,
        color: Colors.darkshade,
        fontFamily: Fonts.Regular,
    },
});


export const Challenges = () => {
    return (
        <View style={{
            margin: 15,
        }}>
            <Image source={require('../../Images/Rectangle_sort.png')} style={{
                position: 'absolute', top: 5, left: - 10,
                right: -10, bottom: 0, width: wide * 0.93, borderRadius: (wide * 0.06) / 2, height: wide * 0.42
            }} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{

                    marginTop: 3

                }}>
                    <Text style={{
                        color: Colors.shade, fontSize: 8, fontFamily: Fonts.SemiBold,
                        lineHeight: 14, marginTop: 15, marginLeft: 20, alignItems: 'center'

                    }}>     Posted By </Text>
                    <Image style={{ width: wide * 0.25, height: wide * 0.25, borderRadius: (wide * 0.25) / 2, marginTop: 5 }}
                        // resizeMode={'contain'}
                        source={require('../../Images/avatar.png')} />
                    <Text style={{
                        color: Colors.light, fontSize: 10,
                        lineHeight: 20, fontFamily: Fonts.Bold, marginTop: 5, marginLeft: 17
                    }}>Vaibhav Chibbar</Text>

                </View>


                <View >
                    <Text style={{
                        color: Colors.shade,
                        fontFamily: Fonts.Regular, fontSize: 12, lineHeight: 15,
                        width: wide * 0.5, marginTop: wide * 0.1, opacity: 1, left: 10
                    }}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Etiam vitae turpis libero.Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Etiam vitae turpis libero</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, left: 10 }}>
                        <Image source={require('../../Images/clock.png')} style={{
                            width: 15, height: 15,
                        }} />
                        <Text style={{
                            color: Colors.shade,
                            fontFamily: Fonts.Medium, fontSize: 12, lineHeight: 10,
                            width: wide * 0.5, opacity: 1, marginTop: 3
                        }}>  Expiry Date - 17 Dec 2021</Text>
                    </View>

                </View>
            </View>


        </View >

    );
};

const CalenderPick = ({ close, done, arrData, actionMonthChange, actionDateChange }) => {
    const [date1, onChange] = useState(moment().format('yyyy-MM-DD').toString())

    const vacation = { key: 'vacation', color: Colors.matchColor };
    const massage = { key: 'massage', color: Colors.challengeColor };
    // const workout = { key: 'workout', color: 'green' };
    let obj = {}
    obj[`${date1}`] = { selected: true, marked: true, selectedColor: Colors.grey }
    //console.log(arrData);
    arrData.map((info) => {
        console.log(info.game);
        var dates = moment(info.currentDate).format('yyyy-MM-DD').toString();
        obj[`${dates}`] = { marked: true, dots: info.game === true ? [vacation] : [massage] }
    })
    // console.log(obj);
    //  date1 : { selected: true, marked: true, selectedColor: Colors.grey },
    // '2021-05-17': { marked: true, dots: [vacation] },
    // '2021-05-18': { marked: true, dotColor: 'yellow', activeOpacity: 0, dots: [vacation, massage,] },
    // '2021-05-21': { disabled: true, disableTouchEvent: true }
    // }
    return <SafeAreaView style={{ flex: 1 }}>

        <Calendar
            style={{ backgroundColor: Colors.base, marginTop: wide * 0.06 }}
            theme={{
                backgroundColor: Colors.grey,
                calendarBackground: Colors.base,
                textSectionTitleColor: "#ffff",
                dayTextColor: "#ffff",
                monthTextColor: "#ffff",
                // "stylesheet.calendar.header": {
                //     header: {
                //         height: 0,
                //         opacity: 0
                //     }
                // }
            }}
            onMonthChange={(e) => actionMonthChange(e)}
            markingType={'multi-dot'}
            markedDates={obj}
            onDayPress={(e) => {
                actionDateChange(e)
                onChange(moment(e.dateString).format('yyyy-MM-DD').toString())
            }}
        />


    </SafeAreaView>
}
