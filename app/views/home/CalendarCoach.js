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
    listOfPlayers
} from '../../actions/home';
import { getObject } from '../../middleware';

import PieChart from 'react-native-pie-chart';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {
    getCollectEvents, getCalendarDetails
} from '../../actions/home';
import moment from 'moment';

const CalendarCoach = (props) => {
    const [loading, setLoading] = useState(false)
    const [TotalDays, setTotalDays] = useState([])
    const [CollectionEvent, setCollectionEvent] = useState()
    const [Details, setDetails] = useState()


    let playerStatData = [1, 2, 3, 4, 5]

    // Calendar Code Initializing Variable
    let nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let currentDate = new Date("07/08/2022")
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var today = currentDate.getDate()

    var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).valueOf();
    var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).valueOf();

    console.log("eysatest", firstDay + "   " + lastDay)
    // Checking Either current month have 30 days or 31 or 28 days
    var maxDays = nDays[month];
    if (month == 1) { // February
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            maxDays += 1;
        }
    }
    // get day name like sun, mon
    function getDayString(date) {
        return date.toString().split(' ')[0];
    }

    // Calendar Calculations Sorting from date 1 to 30 or 31 
    function dateSubtractDays(date, days) {

        var result = new Date("07/08/2022");
        result.setDate(result.getDate() - ((today - days) - 1));
       
        return result;
        
    }

    function generateHorizontalCalendarDates(days) {
       
        var today = new Date();


        let result = [];
        for (let i = 0; i < days; i++) {
           
            result[i] = dateSubtractDays(today, i);
        }

        return result
    }


    useEffect(() => {

        if (maxDays == 30) {
            
            setTotalDays(generateHorizontalCalendarDates(30))

        } else {
           
            setTotalDays(generateHorizontalCalendarDates(31))
        }
    }, [maxDays])

    useEffect(() => {

        setLoading(true)



        console.log("Today Days", TotalDays)

        props.dispatch(getCollectEvents("166194428663704", "165788016210005", "166194421157107", (res, data) => {
            if (res) {

                setLoading(false)
                console.log("Event DAta", data)
                setCollectionEvent(data)

            }
        }))

    }, [])
    useEffect(() => {

        setLoading(true)





        props.dispatch(getCalendarDetails("166194428663704", "166194421157107", (res, data) => {
            if (res) {

                setLoading(false)
                console.log("azhar", data)

                setDetails(data)

            }
        }))

    }, [])



    let wide = Layout.width;
    // Open Flatlist with current date
    const ITEM_WIDTH = wide * 0.12;

    const ITEM_OFFSET = ITEM_WIDTH + 18;






    return (
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
            <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
                <AppLoader visible={loading} />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <Text style={{

                            color: Colors.light,
                            fontSize: 32,
                            fontWeight: '700',
                            marginTop: wide * 0.05,
                            marginLeft: wide * 0.05

                        }}>Calendar</Text>
                    </View>

                </View>
                <ScrollView bounces={false} style={{ marginBottom: wide * 0.03 }}

                    showsVerticalScrollIndicator={false}
                >
                    <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }}
                        behavior={Platform.OS === 'ios' ? "padding" : null}>
                        <View style={{ marginHorizontal: 20 }}>

                            <View style={{ marginTop: wide * 0.1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{
                                        flex: 3,

                                    }}>
                                        <Text style={{
                                            color: Colors.light,
                                            fontSize: 14,
                                            fontWeight: '400'
                                        }}>{year}</Text>
                                        <Text style={{
                                            fontWeight: '700',
                                            color: Colors.light,
                                            fontSize: 28,
                                            fontFamily: 'Metropolis',
                                            marginTop: wide * 0.01
                                        }}>
                                            {monthNames[month]}
                                        </Text>
                                    </View>
                                    <View style={{
                                        flex: 0.7,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        marginTop: wide * 0.02,


                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                            <Image
                                                source={require("../../Images/blueDot.png")}
                                                style={{ marginRight: wide * 0.02 }}
                                            />
                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '500' }}>Games</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                            <Image
                                                source={require("../../Images/yellowDot.png")}
                                                style={{ marginRight: wide * 0.02 }}
                                            />
                                            <Text style={{ color: Colors.light, fontSize: 12, fontWeight: '500' }}>Practice</Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={{ backgroundColor: '#22252E', height: wide * 0.23, width: '100%', justifyContent: 'center' }}>

                                    <FlatList
                                        data={TotalDays}
                                        showsHorizontalScrollIndicator={false}
                                        bounces={false}
                                        initialScrollIndex={today - 5.8}
                                        getItemLayout={(_, index) => ({
                                            length: ITEM_WIDTH,
                                            offset: ITEM_OFFSET * index,
                                            index,
                                        })}
                                        horizontal

                                        legacyImplementation={false}
                                        renderItem={(item, index) => {

                                            const dayNumber = item.item.getDate();
                                            const dayString = getDayString(item.item);

                                            //console.log("itm",item.item)
                                            var startDayTimeStamp = item.item.valueOf();
                                            var lastDayTimeStamp = new Date(item.item.getFullYear(), item.item.getMonth(), 2).valueOf(); 
                                            

                                            var isEvent = false
                                            var eventType = ""
                                            var eventCount = 0
                                               console.log("daystring",dayString+" "+startDayTimeStamp+" "+lastDayTimeStamp)
                                            CollectionEvent?.map(key => {
                                             
                                                if ((key.scheduledAt/100) >= (startDayTimeStamp) && (key.scheduledAt/100) < ((lastDayTimeStamp))) {
                                                    debugger
                                                    isEvent = true,
                                                        eventType = key.eventType
                                                    eventCount = eventCount + 1
                                                }
                                            })
                                            console.log("aftermap", isEvent+" "+eventType+" "+eventCount)

                                            // const isActive = isSameDay(selectedDate, item);

                                            return (

                                                <View style={{ marginLeft: wide * 0.03, justifyContent: 'center', alignItems: 'center' }}>

                                                    <View style={{ height: 60, width: 46, justifyContent: 'center', alignItems: 'center', borderRadius: 13 }}>
                                                        <View style={{
                                                            borderWidth: 1, height: 60, width: 46, justifyContent: 'center', alignItems: 'center', borderRadius: 13, flex: 9,


                                                            borderColor: dayNumber == today ? '#246BFD' : '#363A41',
                                                            backgroundColor: dayNumber == today ? '#246BFD' : '#363A41',
                                                            marginTop: dayNumber == today ? wide * 0 : 0,

                                                        }}>
                                                            <Text style={{ color: Colors.light, fontSize: 11, fontWeight: '400' }}>{dayString}</Text>
                                                            <Text style={{ color: Colors.light, fontSize: 13, fontWeight: '600', marginTop: wide * 0.02 }}>{dayNumber}</Text>

                                                        </View>
                                                        {dayNumber != 28 ?
                                                            <View style={{ paddingTop: wide * 0.02, flex: 0.01 }}>

                                                            </View>
                                                            : null}
                                                        {dayNumber == today ?
                                                            <View style={{ backgroundColor: '#FFB30D', width: 18, height: 18, borderRadius: 18 / 2, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: -wide * 0.04, }}>
                                                                <Text style={{ color: Colors.light, fontSize: 10, fontWeight: '500' }}>5</Text>
                                                            </View>
                                                            :
                                                            null
                                                        }

                                                        {isEvent == true ?

                                                            <View style={{ paddingTop: wide * 0.02, flex: 0.01, flexDirection: 'row' }}>
                                                                {eventCount == 1 ?
                                                                    <>
                                                                        {eventType == "GAME" ?
                                                                            <Image
                                                                                source={require("../../Images/blueDot.png")}

                                                                            />
                                                                            :

                                                                            <Image
                                                                                source={require("../../Images/yellowDot.png")}

                                                                            />
                                                                        }

                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Image
                                                                            source={require("../../Images/blueDot.png")}

                                                                        />
                                                                        <Image
                                                                            source={require("../../Images/yellowDot.png")}

                                                                        />

                                                                    </>}

                                                            </View>
                                                            :
                                                            null
                                                        }
                                                    </View>


                                                </View>

                                            )
                                        }

                                        }
                                    />
                                </View>


                            </View>


                            <View style={{ marginTop: wide * 0.1 }}>
                                <View style={{ flexDirection: 'row', marginTop: wide * 0.03, justifyContent: 'center' }}>
                                    <View style={{
                                        flex: 3
                                    }}>
                                        <Text style={{
                                            fontWeight: '600',
                                            color: Colors.light,
                                            fontSize: 22,
                                            fontFamily: 'Metropolis',
                                        }}>
                                            Upcoming Games
                                        </Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'flex-end',
                                        marginTop: wide * 0.01
                                    }}>
                                        <TouchableOpacity >
                                            <Text style={{
                                                color: Colors.btnBg,
                                                fontWeight: '700',
                                                fontSize: 14,
                                                fontFamily: 'Metropolis',

                                            }}>
                                                See All{" >"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: wide * 0.03 }}>
                                    <FlatList
                                        // data={coachDash.recentGames}
                                        data={Details?.gamesList}
                                        showsHorizontalScrollIndicator={false}

                                        horizontal
                                        pagingEnabled={true}
                                        legacyImplementation={false}
                                        // keyExtractor={item => item.index}
                                        renderItem={(item, index) =>
                                            <View>
                                                <TouchableOpacity style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginRight: wide * 0.05,
                                                    borderRadius: 10,
                                                    width: wide * 0.64,
                                                    height: wide * 0.33
                                                }}
                                                    activeOpacity={1}
                                                // onPress={() => Navigation.navigate('GamesRecentTab', { 'gameId': item.id })}
                                                >
                                                    <Image
                                                        source={

                                                            require('../../Images/upcomming_gameCard.png')}
                                                        style={{
                                                            width: "100%",
                                                            height: '100%',

                                                            borderRadius: 10,
                                                            position: 'absolute'
                                                        }}
                                                    />

                                                    <View style={{
                                                        marginTop: wide * 0.15,
                                                        flexDirection: 'row', alignItems: 'center',
                                                        // backgroundColor: "green",
                                                        width: '80%',
                                                        // justifyContent: 'space-between',

                                                    }}>

                                                        <View style={{
                                                            width: wide * 0.18, height: wide * 0.18,
                                                            backgroundColor: Colors.light,
                                                            borderRadius: wide * 0.18 / 2,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            borderWidth: 6,
                                                            borderColor: '#565B68',
                                                            marginLeft: wide * 0.006,

                                                        }}>

                                                            <FastImage style={{
                                                                width: wide * 0.13, height: wide * 0.13,
                                                                borderRadius: wide * 0.13 / 2
                                                            }}
                                                                // resizeMode={'contain'}

                                                                source={
                                                                    item.item.defenderTeamLogo == null ?
                                                                        require('../../Images/dummy1.png')
                                                                        :
                                                                        { uri: item.item.defenderTeamLogo }

                                                                }
                                                            // source={{ uri: item?.item?.challengerTeamLogo }}
                                                            />


                                                        </View>

                                                        <View style={{
                                                            width: wide * 0.18, height: wide * 0.18,
                                                            backgroundColor: Colors.light, borderRadius: wide * 0.18 / 2,
                                                            justifyContent: 'center', alignItems: 'center',
                                                            marginHorizontal: wide * 0.139,
                                                            borderWidth: 6,
                                                            borderColor: '#565B68'
                                                        }}>

                                                            <FastImage style={{
                                                                width: wide * 0.13, height: wide * 0.13,
                                                                borderRadius: wide * 0.13 / 2
                                                            }}
                                                                // resizeMode={'contain'}
                                                                source={
                                                                    item.item.challengerTeamLogo == null ?
                                                                        require('../../Images/dummy1.png')
                                                                        :
                                                                        { uri: item.item.challengerTeamLogo }

                                                                }
                                                            // source={{ uri: item?.item?.defenderTeamLogo }}

                                                            />

                                                        </View>

                                                    </View>

                                                    <Text style={{
                                                        color: Colors.light, fontSize: 13,
                                                        fontFamily: Fonts.Medium, fontWeight: '500',
                                                        lineHeight: 16,
                                                        marginBottom: wide * 0.08,
                                                        marginTop: wide * 0.02,
                                                    }}>



                                                        {`${moment((new Date(item.item.scheduledAt / 100))).format('HH:MM')}`}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    />
                                </View>
                            </View>



                            <View style={{ marginTop: wide * 0.1 }}>
                                <View style={{ flexDirection: 'row', marginTop: wide * 0.03, justifyContent: 'center' }}>
                                    <View style={{
                                        flex: 3
                                    }}>
                                        <Text style={{
                                            fontWeight: '600',
                                            color: Colors.light,
                                            fontSize: 22,
                                            fontFamily: 'Metropolis',
                                        }}>
                                            My Practice
                                        </Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'flex-end',
                                        marginTop: wide * 0.01
                                    }}>
                                        <TouchableOpacity >
                                            <Text style={{
                                                color: Colors.btnBg,
                                                fontWeight: '700',
                                                fontSize: 14,
                                                fontFamily: 'Metropolis',

                                            }}>
                                                See All{" >"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{
                                    height: wide * 0.46,
                                    alignSelf: 'center',
                                    // alignItems: "center",
                                    marginTop: wide * 0.03,

                                }}>
                                    <FlatList
                                        style={{


                                            overflow: 'visible',
                                        }}
                                        data={Details?.practiceList}

                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={(item, index) =>
                                            <TouchableOpacity style={{
                                                flex: 1,
                                                width: wide * 0.9,
                                                backgroundColor: Colors.playerCategoryBg,
                                                height: wide * 0.45,
                                                borderRadius: wide * 0.03,
                                                marginRight: wide * 0.03

                                            }}
                                                activeOpacity={1}
                                            // onPress={() => Navigation.navigate('GamesRecentTab', { 'gameId': item.id })}
                                            >
                                                <Image style={{
                                                    width: '95%', height: wide * 0.25,
                                                    borderRadius: 12,
                                                    marginTop: wide * 0.025,
                                                    alignSelf: 'center'
                                                }}
                                                    source={require('../../Images/schedule_ground.png')}
                                                />
                                                <View style={{
                                                    width: '92%', alignSelf: 'center',
                                                    marginTop: wide * 0.05
                                                }}>
                                                    <Text style={{
                                                        color: Colors.light,
                                                        fontFamily: Fonts.SemiBold, fontSize: 16,
                                                        lineHeight: 18, fontWeight: '600'
                                                    }}
                                                    >
                                                        {` ${moment((new Date(item.item.practiceTime / 100))).format('DD')} ${moment((new Date(item.item.practiceTime / 100))).format('MMMM')} ${moment((new Date(item.item.practiceTime / 100))).format('Y')}`}
                                                        , {`${moment((new Date(item.item.practiceTime / 100))).format('HH:MM')}`}
                                                    </Text>
                                                    <Text style={{
                                                        color: Colors.light,
                                                        fontFamily: Fonts.Medium, fontSize: 13,
                                                        lineHeight: 16, fontWeight: '500',
                                                        opacity: 0.5,
                                                        marginTop: wide * 0.01
                                                    }}
                                                    >
                                                        {item.item.address}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                            </View>



                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
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
export default connect(mapStateToProps)(CalendarCoach);
