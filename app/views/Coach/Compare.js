// import React, { Component } from 'react';
// import { View, TouchableOpacity, Text, SafeAreaView, Image, StyleSheet, key, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
// import {
//     Layout,
//     Colors,
//     Fonts,
// } from '../../constants';

// import Navigation from '../../lib/Navigation';

// import AppLoader from '../../utils/Apploader';

// import { login } from '../../actions/auth';
// import { connect } from 'react-redux';
// import { showErrorAlert } from '../../utils/info';
// import isValidEmail from '../../utils/isValidEmail';

// import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
// import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import * as Progress from 'react-native-progress';
// import AnimatedInput from "../../Helpers/react-native-animated-input";
// import { isNotch } from '../../utils/deviceInfo';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import moment from 'moment'
// import { color } from 'react-native-reanimated';
// import { AirbnbRating } from 'react-native-ratings';
// import FastImage from 'react-native-fast-image';
// import Geolocation from '@react-native-community/geolocation';
// import { getObject } from '../../middleware';
// import { getComparePlayerss, getComparePlayerSrch } from '../../actions/home';
// let wide = Layout.width;
// class Compare extends Component {
//     static navigationOptions = { header: null };
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             lastLat: 0,
//             lastLong: 0,
//             arrPlayers: []
//         };
//     }
//     componentDidMount() {
//         getObject('userLoc').then((res) => {
//             if (res) {
//                 this.setState({ lastLat: res.lat, lastLong: res.lng }, () => {
//                     this.getPlayers('')
//                 })

//             } else {
//                 this.getUserCurrentLocation()
//             }
//         })
//     }
//     getUserCurrentLocation = () => {
//         try {

//             // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             this.watchID = Geolocation.getCurrentPosition((position) => {
//                 this.setState({
//                     lastLat: position.coords.latitude, lastLong: position.coords.longitude
//                 }, () => {
//                     this.getPlayers('')
//                 })
//                 setObject('userLoc', {

//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 })

//             }, (error) => {
//                 console.log(error)
//                 alert(error.message);
//                 this.getPlayers('');
//                 debugger
//             }, {

//             });
//         }
//         catch (err) {
//             debugger
//             // console.warn(err)
//         }
//     }
//     getPlayers = (strSearch) => {
//         const {
//             lastLat
//             , lastLong } = this.state;
//         // if (!this.state.isDataAllFetched) {

//         // this.setState({ loading: true }, () => {
//         const { params } = this.props.navigation.state;
//         if (strSearch === '' || strSearch === null || strSearch === undefined) {
//             this.props.dispatch(getComparePlayerss(params.playerId, strSearch, {
//                 "name": "Loc",
//                 "loc": {
//                     "type": "Point",
//                     "coordinates": [
//                         lastLong,
//                         lastLat
//                     ]
//                 }
//             }, (res, resData) => {
//                 //console.log(resData);
//                 if (res) {
//                     //   this.setState({ isDataAllFetched: true })
//                     // }

//                     this.setState({ arrPlayers: resData })


//                 }


//             }))
//         } else {
//             this.props.dispatch(getComparePlayerSrch(params.playerId, strSearch, {
//                 "name": "Loc",
//                 "loc": {
//                     "type": "Point",
//                     "coordinates": [
//                         lastLong,
//                         lastLat
//                     ]
//                 }
//             }, (res, resData) => {
//                 //console.log(resData);
//                 if (res) {
//                     //   this.setState({ isDataAllFetched: true })
//                     // }

//                     this.setState({ arrPlayers: resData })


//                 }


//             }))
//         }



//         // })
//         //}
//     }
//     _renderTrainer = ({ item }) => {
//         //  console.log(item);
//         return (
//             <View  >
//                 <View style={{ marginTop: wide * 0.01 }}>
//                     <Image style={{
//                         position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
//                     }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

//                     <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>

//                         <View style={{
//                             width: wide * 0.15, height: wide * 0.15,
//                             borderRadius: wide * 0.15 / 2, borderWidth: 3,
//                             borderColor: Colors.borderColor,
//                             justifyContent: 'center', alignItems: 'center', marginLeft: 15
//                         }}>
//                             {item.profilePictureUrl === null || item.profilePictureUrl === '500 Error' ?
//                                 <Image
//                                     style={{
//                                         width: '95%', height: '95%',
//                                         borderRadius: wide * 0.15 / 2,
//                                     }}
//                                     resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
//                                 />
//                                 :
//                                 <FastImage style={{
//                                     width: '95%', height: '95%',
//                                     borderRadius: wide * 0.15 / 2,
//                                 }}
//                                     resizeMode={'contain'}
//                                     source={{ uri: item.profilePictureUrl }} />
//                             }
//                         </View>

//                         <View style={{ paddingLeft: 15 }}>
//                             <Text style={{
//                                 color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
//                                 marginLeft: 5
//                             }}>{item.firstName}</Text>

//                             <Text style={{
//                                 color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
//                                 marginLeft: 5, marginVertical: 6
//                             }}>
//                                 #{item.ranking} | {item.position} | {item.teamName}
//                             </Text>

//                         </View>
//                         <View style={{ flex: 1 }} />
//                         <View style={{ paddingHorizontal: 15 }}>
//                             <Text style={{
//                                 color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
//                                 marginLeft: 5
//                             }}>RANK</Text>

//                             <Text style={{
//                                 color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
//                                 marginLeft: 5, marginVertical: 6, textAlign: 'right'
//                             }}>
//                                 {item.ranking}
//                             </Text>

//                         </View>
//                     </View>
//                 </View>

//             </View>
//         )
//     }
//     render() {
//         const { params } = this.props.navigation.state;
//         const { arrPlayers } = this.state;
//         // console.log('param----->>>  ', arrPlayers);

//         return (
//             <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
//                 <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
//                     <TouchableOpacity style={{ marginHorizontal: 15, width: wide * 0.1, }} onPress={() => Navigation.back()}>
//                         <Image style={{
//                             width: wide * 0.1, height: wide * 0.1,
//                             marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
//                         }} source={require('../../Images/back_ico.png')} />
//                     </TouchableOpacity>
//                 </View>
//                 <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
//                     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
//                         marginHorizontal: 15,
//                         minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
//                     }}>

//                         <View style={{ flex: 1, backgroundColor: Colors.base }} >
//                             <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06, marginHorizontal: 15 }}>
//                                 <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold }}>
//                                     Compare  </Text>
//                             </View>
//                             <View style={{ marginTop: wide * 0.05, marginHorizontal: 15, }}>

//                                 <Image style={{
//                                     position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
//                                 }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

//                                 <View style={{ marginHorizontal: 10 }}>
//                                     {/* <Image style={{
//                                         position: 'absolute', top: 0, bottom: 0, left: 0,
//                                          right: 0, width: '100%', height: '100%'
//                                     }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} /> */}
//                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <View style={{ alignSelf: 'center', zIndex: 1, marginBottom: Platform.OS === 'android' ? wide * 0.04 : null }}>

//                                             <FastImage style={{
//                                                 width: wide * 0.2, height: wide * 0.25,
//                                                 borderRadius: wide * 0.03, borderWidth: 4,
//                                                 borderColor: Colors.borderColor
//                                             }} source={{ uri: params.profilePictureUrl }} />
//                                             <TouchableOpacity style={{
//                                                 width: wide * 0.2, height: wide * 0.15,
//                                                 bottom: 0, position: 'absolute', alignItems: 'center'
//                                             }}>
//                                                 <Image style={{
//                                                     width: '96%', height: '96%',
//                                                 }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
//                                                 <View style={{ marginTop: -wide * 0.03 }}>
//                                                     <Text
//                                                         style={{ bottom: 10, color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12 }} >
//                                                         #{params.ranking} | {params.position}
//                                                     </Text>
//                                                 </View>
//                                             </TouchableOpacity>

//                                         </View>



//                                         <View style={{
//                                             marginHorizontal: wide * 0.05,
//                                             flex: 1
//                                         }}>
//                                             {/* <View > */}
//                                             <View style={{
//                                                 flexDirection: 'row',
//                                                 justifyContent: 'space-between',
//                                                 width: '100%',

//                                             }}>


//                                                 <View style={{ marginTop: wide * 0.04, }}>
//                                                     <Text style={{
//                                                         color: Colors.light, fontSize: 24,
//                                                         fontFamily: Fonts.Regular,
//                                                     }}>
//                                                         {params.firstName}

//                                                     </Text>
//                                                     <Text style={{
//                                                         color: Colors.light, fontSize: 24, lineHeight: 25, fontFamily: Fonts.Bold
//                                                     }}>
//                                                         {params.lastName}
//                                                     </Text>
//                                                 </View>
//                                                 {/* <View style={{ flex: 1 }} /> */}
//                                                 {/* <FastImage
//                                                         source={{uri: params.}}
//                                                         resizeMode="contain"
//                                                         style={{
//                                                             width: wide * 0.12,
//                                                             height: wide * 0.12,

//                                                         }}
//                                                     ></FastImage> */}

//                                             </View>

//                                             {params.kpiValues !== null ?
//                                                 <View style={{
//                                                     marginTop: wide * 0.04,
//                                                     flexDirection: 'row',
//                                                     justifyContent: 'space-between',
//                                                     width: '90%'
//                                                 }}>
//                                                     <View >
//                                                         <Text style={styles.textPointHeading}>{Object.keys(params.pgs)[0]?.toUpperCase()}</Text>
//                                                         <Text style={styles.textPoint}>
//                                                             {Object.values(params.kpiValues)[0]}
//                                                         </Text>
//                                                     </View>
//                                                     <View >
//                                                         <Text style={styles.textPointHeading}>{Object.keys(params.pgs)[1]?.toUpperCase()}</Text>
//                                                         <Text style={styles.textPoint}>
//                                                             {Object.values(params.kpiValues)[1]}
//                                                         </Text>
//                                                     </View>
//                                                     <View >
//                                                         <Text style={styles.textPointHeading}>{Object.keys(params.pgs)[2]?.toUpperCase()}</Text>
//                                                         <Text style={styles.textPoint}>
//                                                             {Object.values(params.kpiValues)[2]}
//                                                         </Text>
//                                                     </View>
//                                                 </View> : null}
//                                             {/* <View >
//                                                         <Text style={{
//                                                             color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

//                                                         }}>PPG</Text>
//                                                         <Text style={{
//                                                             color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
//                                                             marginTop: 6,
//                                                         }}>
//                                                             35
//                                                         </Text>
//                                                     </View>
//                                                     <View >
//                                                         <Text style={{
//                                                             color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

//                                                         }}>RPG</Text>
//                                                         <Text style={{
//                                                             color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
//                                                             marginTop: 6,
//                                                         }}>
//                                                             6
//                                                         </Text>
//                                                     </View>
//                                                     <View >
//                                                         <Text style={{
//                                                             color: Colors.fontColorGray, fontSize: 13,
//                                                             fontFamily: Fonts.Bold,

//                                                         }}>APG</Text>
//                                                         <Text style={{
//                                                             color: Colors.light, fontSize: 22,
//                                                             fontFamily: Fonts.Bold,
//                                                             marginTop: 6,
//                                                         }}>
//                                                             4
//                                                         </Text>
//                                                     </View> */}

//                                             {/* </View> */}
//                                         </View>


//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{
//                                 width: wide * 0.85, height: wide * 0.1,
//                                 alignItems: 'center',
//                                 marginVertical: wide * 0.06,
//                             }}>
//                                 <Text style={{
//                                     color: Colors.light, fontSize: 28, lineHeight: 30, fontFamily: Fonts.SemiBold
//                                 }}>
//                                     VS
//                                 </Text>
//                             </View>

//                             <View style={{ marginHorizontal: 15 }}>


//                                 <TextInput style={{
//                                     borderWidth: 3, borderColor: Colors.borderColor,
//                                     fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.1,
//                                     borderRadius: 5, color: Colors.light, fontSize: 16
//                                 }}
//                                     placeholder={"SEARCH"}
//                                     placeholderTextColor={Colors.borderColor}
//                                     autoCorrect={false}
//                                     autoCapitalize='none'
//                                     onChangeText={(e) => this.getPlayers(e)}


//                                 />
//                                 <Image style={{
//                                     position: 'absolute',
//                                     width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
//                                 }} source={require('../../Images/search_ico.png')} />
//                             </View>



//                             <View style={{ flex: 1, marginHorizontal: 15 }}>

//                                 <FlatList
//                                     style={{ marginTop: wide * 0.02 }}
//                                     data={arrPlayers}
//                                     renderItem={(item, index) => this._renderTrainer(item, index)}
//                                     showsHorizontalScrollIndicator={false}

//                                 />
//                             </View>

//                         </View>
//                     </ScrollView>
//                 </KeyboardAvoidingView>

//             </SafeAreaView >
//         );
//     }
// }

// function mapStateToProps(state) {
//     const { entities } = state;
//     return {
//         authReducer: state.authReducer,
//         User: entities.user,
//         Home: entities.home
//     };
// }

// export default connect(mapStateToProps)(Compare);
// const styles = StyleSheet.create({
//     BackIcon: {
//         width: wide * 0.09, height: wide * 0.09,
//         marginTop: 20, borderRadius: wide * 0.03, borderWidth: 1,
//         borderColor: Colors.borderColor, marginHorizontal: 10
//     },
//     headerText: {

//         color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold

//     },
//     mediumHeaderText: {

//         color: Colors.light, fontSize: 25, lineHeight: 26, fontFamily: Fonts.SemiBold

//     },
//     textPoint: {
//         color: Colors.light, fontSize: 20, fontFamily: Fonts.Bold,
//         marginTop: 6,
//     },
//     textPointHeading: {
//         color: Colors.fontColorGray, fontSize: 15, fontFamily: Fonts.SemiBold,
//     },
//     textPointCenter: {
//         color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
//         marginTop: 6, textAlign: 'center'
//     },
// });




import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, StyleSheet, key,
  KeyboardAvoidingView, FlatList, Platform, Modal, Keyboard
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
  CommonStyles
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';

import { characterLimit, selectedUserType, SenderRecevrModel, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { color } from 'react-native-reanimated';
import { AirbnbRating } from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import { getObject, setObject } from '../../middleware';
import { getComparePlayerss, getComparePlayerSrch, getPlayerCompare } from '../../actions/home';
import {
  VictoryTheme, VictoryLabel, VictoryContainer, VictoryPolarAxis, VictoryChart,
  VictoryGroup, VictoryArea, VictoryBar, VictoryAxis
} from 'victory-native';
import { BlurView } from "@react-native-community/blur";
import SideBySideBarGraph from '../../components/common/SideBySideBar';
import { ScreenHeader } from '../../components/common/ScreenHeader'

// const characterData = [
//     { 'strength': 1, 'intelligence': 250, 'luck': 1, 'stealth': 40, 'charisma': 50 },
//     { 'strength': 2, 'intelligence': 300, 'luck': 2, 'stealth': 80, 'charisma': 90 },
// ];

const characterData = [
  { "2PT% +20%": 10, "AST -10%": 0.8, "BPG -20%": 2, "FG% -10%": 4.8, "PTS +4%": 9, "RPG +3%": 5.7, "STL +10%": 3.6 },
  { "2PT% +20%": 10, "AST -10%": 0.6, "BPG -20%": 2, "FG% -10%": 4.8, "PTS +4%": 9, "RPG +3%": 5.7, "STL +10%": 4.6 }
]

let wide = Layout.width;
let high = Layout.height;
class Compare extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lastLat: 0,
      lastLong: 0,
      arrPlayers: [],
      showModel: false,
      secondPlayerSelected: {},
      firstPlayerSelected: {},
      comparePlayer: {},
      radarChartData: [],
      data: [],//this.processData(characterData),
      maxima: [], //this.getMaxima(characterData)
      sideBySideBarData: [],
      initialRadarData: [],
      srchTxt: ''
    };
  }
  componentDidMount() {
    getObject('userLoc').then((res) => {
      if (res) {
        this.setState({ lastLat: res.lat, lastLong: res.lng }, () => {
          this.getPlayers('')
        })

      } else {
        this.getUserCurrentLocation()
      }
    })
    this.setInitialData();
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
        alert(error.message);
        this.getPlayers('');
        debugger
      }, {

      });
    }
    catch (err) {
      debugger
      // console.warn(err)
    }
  }
  getPlayers = (strSearch) => {
    const {
      lastLat
      , lastLong } = this.state;
    // if (!this.state.isDataAllFetched) {

    // this.setState({ loading: true }, () => {
    const { params } = this.props.navigation.state;
    if (strSearch === '' || strSearch === null || strSearch === undefined) {
      this.props.dispatch(getComparePlayerss(params.playerId, strSearch, {
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

          this.setState({ arrPlayers: resData })


        }
      }))
    } else {
      this.props.dispatch(getComparePlayerSrch(params.playerId, strSearch, {
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

          this.setState({ arrPlayers: resData })

        }

      }))
    }
  }

  setInitialData = () => {
    const { params } = this.props.navigation.state;
    debugger
    if (params?.userBarGraphComparisonDto?.radarKpi !== null && params?.userBarGraphComparisonDto?.radarKpi !== undefined) {
      // this.setState({ loading: true });
      var usrRadarVal = params?.userBarGraphComparisonDto?.userRadarValues;
      var kpiLabel = params?.userBarGraphComparisonDto?.radarKpi;
      debugger

      var arr1 = [];
      var dataObj1 = {};
      // var arr = [];
      if (kpiLabel != null && kpiLabel != undefined) {
        for (let i = 0; i < kpiLabel.length; i++) {
          var lbl = kpiLabel[i];
          // var tObj = {};
          dataObj1[`${lbl}`] = usrRadarVal[i];
          // console.log("lbllll", typeof lbl);
          debugger
          // dataObj1 = {
          //     ...dataObj1, [`${lbl}`]: usrRadarVal[i]
          // }
        }
        debugger
        arr1.push(dataObj1);

      }

      // console.log('arrInit: --', this.processData(characterData));
      console.log('arrInit: --', arr1)
      this.setState({ radarChartData: arr1, data: this.processData(arr1), maxima: this.getMaxima(arr1) })
    }
    if (params?.userBarGraphComparisonDto?.userKpi != null && params?.userBarGraphComparisonDto?.userKpi != undefined) {
      var arr = [];
      arr.push(params?.userBarGraphComparisonDto?.userKpi)
      this.setState({ sideBySideBarData: arr, })
    }
  }

  getNewComparePlayerData = (secondPlayer) => {
    const { params } = this.props.navigation.state;
    this.props.dispatch(getPlayerCompare(params.playerId,
      secondPlayer.playerId, (res, resData) => {
        if (res) {
          debugger
          var firstPlayer = null;
          var secondPlayer = null;
          var playerArr = resData?.compareResponseList;
          playerArr.forEach(element => {
            if (element.playerId === params.playerId) {
              firstPlayer = element;
            } else {
              secondPlayer = element;
            }
          })
          debugger;
          this.setState({
            showModel: false,
            firstPlayerSelected: firstPlayer,//resData.compareResponseList[0],
            secondPlayerSelected: secondPlayer//resData.compareResponseList[1]
          }, () => {
            this.prepareRadarChartData(resData);
          })
        }
      }))
  }

  prepareRadarChartData = (data) => {
    debugger
    const { params } = this.props.navigation.state;
    var arr = [];
    var arr1 = [];
    var firstPlayerKpi, secondPlayerKpi;
    this.setState({ radarChartData: [], data: [], maxima: [] })
    // var playerArr = data?.compareResponseList;
    // playerArr.forEach(element => {

    // })


    // var obj1 = data.compareResponseList[0]?.compareKpis
    // var obj2 = data.compareResponseList[1]?.compareKpis
    // obj1['RPG'] = 9.5;
    // obj2['PPG'] = 9.5
    // obj1['RPG1'] = 9.5;
    // obj2['PPG1'] = 9.5
    // obj1['RPG2'] = 9.5;
    // obj2['PPG2'] = 9.5
    // obj1['RPG3'] = 9.5;
    // obj2['PPG3'] = 9.5
    // obj1['RPG4'] = 9.5;
    // obj2['PPG4'] = 9.5
    // arr1.push(obj1);
    // arr1.push(obj2);
    // arr1.push(data.compareResponseList[0]?.compareKpis);
    // arr1.push(data.compareResponseList[1]?.compareKpis);
    debugger
    data.compareResponseList.forEach((obj) => {
      var rdVal = obj.radarValue;
      var dataObj = {};
      debugger
      for (let i = 0; i < data.radarProKpi.length; i++) {
        var lbl = data.radarProKpi[i];
        dataObj[lbl] = rdVal[i];
        // dataObj = { ...dataObj, [lbl]: rdVal[i] }
      }
      arr.push(dataObj);
      if (obj.playerId === params.playerId) {
        firstPlayerKpi = obj.compareKpis;
        console.log("kppppiii---", firstPlayerKpi);
      } else {
        secondPlayerKpi = obj.compareKpis;
      }
      // arr.push(dataObj);
    })
    debugger
    arr1.push(firstPlayerKpi);
    arr1.push(secondPlayerKpi);


    console.log("arrraaayyy", arr);
    this.setState({ radarChartData: arr, sideBySideBarData: arr1, data: this.processData(arr), maxima: this.getMaxima(arr) })
  }


  _renderTrainer = ({ item }) => {
    console.log(item);
    return (
      <View>
        <TouchableOpacity style={{ marginTop: wide * 0.01, }}
          onPress={() => this.getNewComparePlayerData(item)}
        >
          {/* <Image style={{
                        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
                    }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} /> */}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-around' }}>

            <View style={{
              width: wide * 0.15, height: wide * 0.15,
              borderRadius: wide * 0.15 / 2, borderWidth: 3,
              borderColor: Colors.borderColor,
              justifyContent: 'center', alignItems: 'center',
            }}>
              {item.profilePictureUrl === null || item.profilePictureUrl === '500 Error' ?
                <Image
                  style={{
                    width: '95%', height: '95%',
                    borderRadius: wide * 0.15 / 2,
                  }}
                  resizeMode={'contain'} source={require('../../Images/placeHolderProf.png')}
                />
                :
                <FastImage style={{
                  width: '95%', height: '95%',
                  borderRadius: wide * 0.15 / 2,
                }}
                  // resizeMode={'contain'}
                  source={{ uri: item.profilePictureUrl }} />
              }
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', width: '35%', right: 20 }}>
              <Text style={{
                color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                marginLeft: 5
              }}>{item.firstName}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{
                  color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                  marginLeft: 5, marginVertical: 6
                }}>
                  #{item.playerCategory}
                </Text>
                {/* <Text style={{
                                    color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                                    marginLeft: 5, marginVertical: 6
                                }}>
                                    #{item.ranking}
                                </Text>
                                {item.position !== null ?
                                    <Text style={{
                                        color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                                        marginLeft: 5, marginVertical: 6
                                    }}>
                                        | {item.position}
                                    </Text>
                                    : <></>
                                } */}
                {item.teamName !== null ?
                  <Text style={{
                    color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                    marginLeft: 5, marginVertical: 6
                  }}>
                    | {item.teamName}
                  </Text>
                  : <></>
                }
              </View>

            </View>

            <View style={{
              width: wide * 0.1, height: wide * 0.1,
              borderRadius: wide * 0.1 / 2,
              // borderWidth: 3,
              // borderColor: Colors.borderColor,
              justifyContent: 'center', alignItems: 'center',
            }}>
              {item.teamLogo === null || item.teamLogo === '500 Error' ?
                <></>
                :
                <FastImage style={{
                  width: '95%', height: '95%',
                  borderRadius: wide * 0.15 / 2,
                }}
                  // resizeMode={'contain'}
                  source={{ uri: item.teamLogo }} />
              }
            </View>


            {/* <View style={{ flex: 1 }} /> */}
            <View style={{ paddingHorizontal: 15, }}>
              <Text style={{
                color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,
                marginLeft: 5
              }}>RANK</Text>

              <Text style={{
                color: Colors.light, fontSize: 26, fontFamily: Fonts.Bold,
                marginLeft: 5, marginVertical: 6, textAlign: 'right'
              }}>
                {item.ranking}
              </Text>

            </View>
          </View>
        </TouchableOpacity>

      </View>
    )
  }

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };

    return data.map((datum) => makeDataArray(datum));
  }

  // _renderInitialBars = () => {
  //     return (

  //     )
  // }


  render() {
    const { params } = this.props.navigation.state;
    // const params = params.data;
    const { arrPlayers, secondPlayerSelected, firstPlayerSelected, data, radarChartData } = this.state;
    console.log('param data----->>>  ', radarChartData);
    debugger

    return (
      <View style={{ flex: 1, backgroundColor: Colors.base }}>
        <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base, }}>
          <View style={[CommonStyles.headerBottomLine]}>
            <ScreenHeader
              title={'Compare'}
              backButtonAction={() => Navigation.back()}
            />
            {/* <TouchableOpacity style={{ marginHorizontal: 15, width: wide * 0.1, }} onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity> */}
          </View>
          {/* <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => this.setState({ showModel: false })}> */}
          <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
            <ScrollView showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={{
                // marginHorizontal: 15,
                // opacity: this.state.showModel === true ? 0.5 : 1,
                // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, 
                paddingBottom: 20,
                marginTop: 25,
              }}>

              <View style={{ marginBottom: 15, }}>
                {/* <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06, marginHorizontal: 15 }}>
                                <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold }}>
                                    Compare  </Text>
                            </View> */}
                <View style={{
                  // marginTop: wide * 0.05,
                  marginHorizontal: 24,
                  flexDirection: 'row', alignItems: 'center',
                  justifyContent: 'space-between',
                  // backgroundColor: 'red',
                  width: '90%'

                }}>

                  <View style={{
                    alignSelf: 'center',
                    marginBottom: Platform.OS === 'android' ? wide * 0.04 : null,
                    alignItems: "center", borderWidth: 3,
                    borderColor: Colors.compareFirstPlayerBorder,
                    borderRadius: wide * 0.02,
                    width: wide * 0.28, height: wide * 0.4,
                    justifyContent: 'center'
                  }}>

                    <FastImage
                      // resizeMode="cover"
                      style={{
                        width: '99%', height: '99%',
                        borderRadius: wide * 0.01,
                      }}
                      source={{ uri: params.profilePictureUrl }}
                    />
                    {/* <TouchableOpacity style={{
                                        width: wide * 0.27, height: wide * 0.18,
                                        bottom: 0, position: 'absolute', alignItems: 'center'
                                    }}>
                                        <Image style={{
                                            width: '96%', height: '96%',
                                        }} resizeMode={'stretch'}
                                            source={require('../../Images/edit_profile_gradiant.png')} />
                                        <View style={{ marginTop: -wide * 0.03 }}>
                                            <Text
                                                style={{ bottom: 10, color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12 }} >
                                                #{params.ranking} | {params.position}
                                            </Text>
                                        </View>
                                    </TouchableOpacity> */}

                  </View>

                  <View>
                    <Text style={{
                      color: Colors.light, fontSize: 24, lineHeight: 24, fontFamily: Fonts.Bold
                    }}>
                      VS
                    </Text>
                  </View>

                  {secondPlayerSelected == null || !secondPlayerSelected.hasOwnProperty('firstName') ?
                    <View style={{
                      alignSelf: 'center',
                      marginBottom: Platform.OS === 'android' ? wide * 0.04 : null,
                      alignItems: "center", borderWidth: 3, borderColor: Colors.comparePlayerEmptyBorder,
                      borderRadius: wide * 0.02, width: wide * 0.28, height: wide * 0.4,
                    }}>

                      <TouchableOpacity style={{
                        width: '90%', height: '90%',
                        justifyContent: "center", alignItems: "center"
                      }}
                        onPress={() => this.setState({ showModel: true })}
                      >
                        <Text style={{
                          color: Colors.light, fontSize: 24, lineHeight: 30, fontFamily: Fonts.Bold
                        }}>+</Text>
                      </TouchableOpacity>
                    </View>

                    :
                    <TouchableOpacity style={{
                      alignSelf: 'center',
                      marginBottom: Platform.OS === 'android' ? wide * 0.04 : null,
                      alignItems: "center", borderWidth: 3,
                      borderColor: Colors.compareSecondPlayerBorder,
                      borderRadius: wide * 0.02,
                      width: wide * 0.28, height: wide * 0.4,
                      justifyContent: 'center'
                    }}
                      activeOpacity={1}
                      onPress={() => this.setState({ showModel: true })}
                    >
                      <FastImage
                        // resizeMode="cover"
                        style={{
                          width: '99%', height: '99%',
                          borderRadius: wide * 0.01,

                        }} source={{ uri: secondPlayerSelected.profilePictureUrl }} />
                      {/* <TouchableOpacity style={{
                                            width: wide * 0.27, height: wide * 0.18,
                                            bottom: 0, position: 'absolute', alignItems: 'center'
                                        }}>
                                            <Image style={{
                                                width: '96%', height: '96%',
                                            }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
                                            <View style={{ marginTop: -wide * 0.03 }}>
                                                <Text
                                                    style={{ bottom: 10, color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12 }} >
                                                    #{secondPlayerSelected.ranking} | {secondPlayerSelected.position}
                                                </Text>
                                            </View>
                                        </TouchableOpacity> */}


                    </TouchableOpacity>
                  }
                </View>

                <View style={{
                  height: wide * 0.25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // backgroundColor: 'red'
                }}>
                  <View style={{
                    // justifyContent: 'space-between',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: wide * 0.02,
                    width: wide * 0.35, height: wide * 0.25,
                    // backgroundColor: "green",
                  }}>
                    <View style={{ marginHorizontal: wide * 0.01 }}>
                      <Text style={{
                        color: Colors.light, fontSize: 18, lineHeight: 36,
                        fontFamily: Fonts.Bold,
                      }}>
                        {params.firstName} {params.lastName}

                      </Text>
                    </View>

                    {params.playerCategory !== null ?
                      <View style={{ marginTop: wide * 0.01 }}>
                        <Text style={{
                          color: Colors.compareRankColor, fontSize: 12,
                          lineHeight: 14, fontFamily: Fonts.Bold,
                        }}>
                          {params.playerCategory}
                          {/* Rank #{params.ranking} | {params.position} */}
                        </Text>

                      </View>
                      : null
                    }

                    {/* Team Logo */}
                    {firstPlayerSelected.teamLogo !== null ?
                      <View style={{ justifyContent: 'center', alignItems: "center", marginTop: wide * 0.02 }}>
                        <FastImage
                          resizeMode="cover"
                          style={{
                            width: 30, height: 30,
                            borderRadius: 15,
                          }} source={{ uri: firstPlayerSelected.teamLogo }} />

                      </View>
                      : null
                    }
                  </View>



                  {secondPlayerSelected === null || !secondPlayerSelected.hasOwnProperty('firstName') ?
                    <View style={{
                      width: wide * 0.35,
                      height: wide * 0.08,
                      marginTop: wide * 0.01,
                      right: 5, alignItems: 'center',
                      // backgroundColor: 'green'
                    }}>
                      <Text style={{
                        color: Colors.light, fontSize: 16, lineHeight: 36,
                        fontFamily: Fonts.Bold,
                      }}>Add to Compare</Text>
                    </View>
                    :

                    <View style={{
                      // justifyContent: 'space-between',
                      // justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: wide * 0.02,
                      width: wide * 0.35,
                      height: wide * 0.23,
                      // bottom: 10,
                      // backgroundColor: 'blue'
                    }}>
                      <View style={{ marginTop: wide * 0.01 }}>
                        <Text style={{
                          color: Colors.light, fontSize: 18, lineHeight: 36,
                          fontFamily: Fonts.Bold,
                        }}>
                          {secondPlayerSelected.firstName} {secondPlayerSelected.lastName}
                        </Text>
                      </View>
                      {secondPlayerSelected.playerCategory !== null ?
                        <View style={{ marginTop: wide * 0.01 }}>
                          <Text style={{
                            color: Colors.fontColorGray, fontSize: 12, lineHeight: 14,
                            fontFamily: Fonts.Bold,
                            // marginLeft: 5,
                          }}>
                            {secondPlayerSelected.playerCategory}
                            {/* Rank #{secondPlayerSelected.ranking} | {secondPlayerSelected.position} */}
                          </Text>

                        </View>
                        : <></>
                      }

                      {/* Team Logo */}
                      {secondPlayerSelected.teamLogo != null ?
                        <View style={{
                          justifyContent: 'center',
                          alignItems: "center", marginTop: wide * 0.02
                        }}>
                          <FastImage
                            resizeMode="cover"
                            style={{
                              width: 30, height: 30,
                              borderRadius: 15,
                            }} source={{ uri: secondPlayerSelected.teamLogo }} />

                        </View>
                        : null
                      }
                    </View>
                  }

                </View>

                {/* ComareBars  */}
                <View style={{
                  // height: wide * 0.5,
                  width: '90%',
                  // marginTop: 30,
                  // marginTop: this.state.sideBySideBarData[0] !== undefined ? (
                  //     Object.keys(this.state.sideBySideBarData[0]).length < 8 ? 30
                  //         : 35)
                  //     : 0,
                  marginHorizontal: 20,
                  // backgroundColor: 'red',
                  // overflow: 'hidden',
                  // justifyContent: this.state.sideBySideBarData[0] !== undefined ? (
                  //     Object.keys(this.state.sideBySideBarData[0]).length < 8 ? 'center'
                  //         : null)
                  //     : null



                }}>
                  {this.state.sideBySideBarData !== undefined && this.state.sideBySideBarData.length > 0 ?
                    <SideBySideBarGraph pgsData={this.state.sideBySideBarData} />
                    : null
                  }

                  {/* new dynamic side by side bar graph */}


                </View>
                {this.state.radarChartData.length > 0 ?
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor: 'green',
                    marginTop: 50,//Object.keys(this.state.sideBySideBarData[0]).length > 8 ? 50 : 20,
                  }}>
                    <VictoryChart
                      polar
                      theme={VictoryTheme.material}
                      domain={{ y: [0, 1] }}
                      height={280}
                      width={320}
                      // animate
                      backgroundComponent={<VictoryContainer responsive={false} />}

                    // containerComponent={<VictoryContainer responsive={false} />}

                    >

                      <VictoryGroup
                        colorScale={["#D8A433", '#74C896',]}
                        // colorScale={["green", 'red']}
                        // color='#D8A433'
                        style={{ data: { fillOpacity: 0.3, strokeWidth: 2, } }}
                      >
                        {this.state.data.map((data, i) => {
                          debugger
                          return <VictoryArea key={i} data={data} />;
                        })}

                        {/* {this.state.data.map((data, i) => {


                                            if (i == 0 || i == 1) {
                                                return <VictoryArea key={i}
                                                    data={data}
                                                    colorScale={["#D8A433"]}
                                                // colorScale={['#74C896']}

                                                />;
                                            }

                                            else {
                                                return <VictoryArea key={i}
                                                    data={data}
                                                    colorScale={['#74C896']}
                                                />;
                                            }

                                        })} */}
                      </VictoryGroup>


                      {
                        Object.keys(this.state.maxima).map((key, i) => {
                          return (
                            <VictoryPolarAxis
                              key={i}
                              dependentAxis
                              labelPlacement="vertical"
                              tickFormat={() => ""}
                              style={{
                                axisLabel: { fontSize: 14, lineHeight: 16, fill: Colors.light, padding: 40 },
                                axis: { stroke: "grey", opacity: 0.1, },
                                grid: { stroke: Colors.base, opacity: 0.01 },
                              }}
                              // tickLabelComponent={
                              //     <VictoryLabel labelPlacement="vertical"

                              //     />
                              // }
                              // labelPlacement="perpendicular"
                              axisValue={i + 1}
                              label={key}
                            // tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                            // tickValues={[0.25, 0.5, 0.75]}

                            />
                          );

                        })
                      }
                      {/* <VictoryPolarAxis
                                        labelPlacement="parallel"
                                        tickFormat={() => ""}
                                        style={{
                                            axis: { stroke: "none" },
                                            grid: { stroke: "grey", opacity: 0.5 }
                                        }}
                                    /> */}

                    </VictoryChart>

                  </View>

                  : null
                }

              </View>

            </ScrollView>

            {this.state.showModel === true ?
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.showModel}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showModel: false })}
                  style={{
                    width: wide,
                    height: high,
                    justifyContent: 'center',
                    alignItems: 'center'

                  }}
                >

                  <BlurView style={{
                    width: wide,
                    height: high,
                    position: 'absolute'
                  }}

                    blurAmount={10}
                    blurRadius={10}
                  // reducedTransparencyFallbackColor="white"

                  />

                  <View style={{
                    width: '90%', height: wide * 1.7,
                    backgroundColor: Colors.ractangelCardColor,
                    marginTop: 20, borderRadius: 20, alignItems: 'center'
                  }}>
                    {/* <View style={{
                                            width: '100%', height: '15%', marginTop: 10,
                                            alignItems: 'center', justifyContent: 'center',
                                            borderBottomColor: Colors.newGrayFontColor, borderBottomWidth: 1
                                        }}>
                                            <Text style={{
                                                color: Colors.light, fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16
                                            }}>Select</Text>
                                        </View> */}
                    <View style={{ width: '90%', margin: wide * 0.05 }}>
                      <TextInput style={{
                        borderWidth: 3, borderColor: Colors.borderColor,
                        fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.1,
                        borderRadius: 5, color: Colors.light, fontSize: 16
                      }}
                        placeholder={"SEARCH"}
                        placeholderTextColor={Colors.borderColor}
                        autoCorrect={false}
                        autoCapitalize='none'
                        value={this.state.srchTxt}
                        // onChangeText={(e) => this.getPlayers(e)}
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


                    <View style={{ flex: 1, width: wide * 0.8 }}>

                      <FlatList
                        style={{ marginTop: wide * 0.02 }}
                        data={arrPlayers}
                        renderItem={(item, index) => this._renderTrainer(item, index)}
                        showsHorizontalScrollIndicator={false}

                      />
                    </View>


                  </View>

                </TouchableOpacity>
              </Modal>
              : null
            }



            {/* {this.state.showModel === true ?





                        <View style={{
                            width: '95%', height: wide * 1.1, bottom: wide * 0.34, left: wide * 0.02,
                            borderRadius: 20,
                            backgroundColor: Colors.ractangelCardColor,
                            justifyContent: "center", alignItems: 'center',
                            opacity: 1,
                        }}>

                            <View style={{ width: '90%', margin: wide * 0.05 }}>
                                <TextInput style={{
                                    borderWidth: 3, borderColor: Colors.borderColor,
                                    fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.1,
                                    borderRadius: 5, color: Colors.light, fontSize: 16
                                }}
                                    placeholder={"SEARCH"}
                                    placeholderTextColor={Colors.borderColor}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(e) => this.getPlayers(e)}


                                />
                                <Image style={{
                                    position: 'absolute',
                                    width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
                                }} source={require('../../Images/search_ico.png')} />
                            </View>

                            <View style={{ flex: 1, width: wide * 0.8 }}>

                                <FlatList
                                    style={{ marginTop: wide * 0.02 }}
                                    data={arrPlayers}
                                    renderItem={(item, index) => this._renderTrainer(item, index)}
                                    showsHorizontalScrollIndicator={false}

                                />
                            </View>
                        </View>
                        : null} */}
          </KeyboardAvoidingView>
          {/* </TouchableOpacity> */}

        </SafeAreaView >
      </View>
    );
  }
}

// export const LeftBars = ({ pgsData }) => {
//     console.log('---->>', pgsData)

//     return (
//         <View style={{ width: '50%', height: wide * 0.6, }}>
//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-end',
//             }}>
//                 <Text style={{ fontSize: 14, color: Colors.compareBar, paddingRight: 8, fontFamily: Fonts.Bold }}>{pgsData?.PTS}</Text>
//                 {pgsData?.PTS !== undefined ?
//                     <View style={{
//                         width: pgsData?.PTS >= 15 ? `${45 + pgsData?.PTS}%` : `${45 - pgsData?.PTS}%`,
//                         backgroundColor: Colors.compareBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-end'
//             }}>
//                 <Text style={{ fontSize: 14, color: Colors.compareBar, paddingRight: 8, fontFamily: Fonts.Bold }}>{pgsData?.STL}</Text>
//                 {pgsData?.STL !== undefined ?
//                     <View style={{
//                         width: pgsData?.STL >= 15 ? `${45 + pgsData?.STL}%` : `${45 - pgsData?.STL}%`,
//                         backgroundColor: Colors.compareBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-end'
//             }}>
//                 <Text style={{ fontSize: 14, color: Colors.compareBar, paddingRight: 8, fontFamily: Fonts.Bold }}>{pgsData?.RPG}</Text>
//                 {pgsData?.RPG !== undefined && pgsData?.Rpg !== 0 ?
//                     <View style={{
//                         width: pgsData?.RPG >= 15 ? `${45 + pgsData?.RRPGpg}%` : `${45 - pgsData?.RPG}%`,
//                         backgroundColor: Colors.compareBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-end'
//             }}>
//                 <Text style={{ fontSize: 14, color: Colors.compareBar, paddingRight: 8, fontFamily: Fonts.Bold }}>{pgsData?.APG}</Text>
//                 {pgsData?.APG !== undefined ?
//                     <View style={{
//                         width: pgsData?.APG >= 15 ? `${45 + pgsData?.APG}%` : `${45 - pgsData?.APG}%`,
//                         backgroundColor: Colors.compareBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-end'
//             }}>
//                 <Text style={{ fontSize: 14, color: Colors.compareBar, paddingRight: 8, fontFamily: Fonts.Bold }}>{pgsData?.FG}</Text>
//                 {pgsData?.FG !== undefined ?
//                     <View style={{
//                         width: pgsData?.FG >= 15 ? `${45 + pgsData?.FG}%` : `${45 - pgsData?.FG}%`,
//                         backgroundColor: Colors.compareBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-end'
//             }}>
//                 <Text style={{ fontSize: 14, color: Colors.compareBar, paddingRight: 8, fontFamily: Fonts.Bold }}>{pgsData?.PT2}</Text>
//                 {pgsData?.PT2 !== undefined ?
//                     <View style={{
//                         width: pgsData?.PT2 >= 15 ? `${45 + pgsData?.PT2}%` : `${45 - pgsData?.PT2}%`,
//                         backgroundColor: Colors.compareBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-end'
//             }}>
//                 <Text style={{ fontSize: 14, color: Colors.compareBar, paddingRight: 8, fontFamily: Fonts.Bold }}>{pgsData?.G}</Text>
//                 {pgsData?.G !== undefined ?
//                     <View style={{
//                         width: pgsData?.G >= 15 ? `${45 + pgsData?.G}%` : `${45 - pgsData?.G}%`,
//                         backgroundColor: Colors.compareBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//             </View>
//         </View>

//     )
// }

// export const RightBars = ({ pgsData }) => {
//     // console.log('---->>', pgsData)

//     return (
//         <View style={{ height: wide * 0.6, width: '50%', }}>
//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-start',
//             }}>

//                 {pgsData?.PTS !== undefined && pgsData?.PTS !== 0 ?
//                     <View style={{
//                         width: pgsData?.PTS >= 15 ? `${45 + pgsData?.PTS}%` : `${45 - pgsData?.PTS}%`,
//                         backgroundColor: Colors.compareRightBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//                 <Text style={{ fontSize: 14, color: Colors.compareRightBar, paddingLeft: 8, fontFamily: Fonts.Bold }}>{pgsData?.PTS}</Text>
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-start'
//             }}>

//                 {pgsData?.STL !== undefined && pgsData?.STL !== 0 ?
//                     <View style={{
//                         width: pgsData?.STL >= 15 ? `${45 + pgsData?.STL}%` : `${45 - pgsData?.STL}%`,
//                         backgroundColor: Colors.compareRightBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//                 <Text style={{ fontSize: 14, color: Colors.compareRightBar, paddingLeft: 8, fontFamily: Fonts.Bold }}>{pgsData?.STL}</Text>
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-start'
//             }}>

//                 {pgsData?.RPG !== undefined && pgsData?.RPG !== 0 ?
//                     <View style={{
//                         width: pgsData?.RPG >= 15 ? `${45 + pgsData?.RPG}%` : `${45 - pgsData?.RPG}%`,
//                         backgroundColor: Colors.compareRightBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//                 <Text style={{ fontSize: 14, color: Colors.compareRightBar, paddingLeft: 8, fontFamily: Fonts.Bold }}>{pgsData?.RPG}</Text>
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-start'
//             }}>

//                 {pgsData?.APG !== undefined && pgsData?.APG !== 0 ?
//                     <View style={{
//                         width: pgsData?.APG >= 15 ? `${45 + pgsData?.APG}%` : `${45 - pgsData?.APG}%`,
//                         backgroundColor: Colors.compareRightBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//                 <Text style={{ fontSize: 14, color: Colors.compareRightBar, paddingLeft: 8, fontFamily: Fonts.Bold }}>{pgsData?.APG}</Text>
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-start'
//             }}>

//                 {pgsData?.FG !== undefined && pgsData?.FG !== 0 ?
//                     <View style={{
//                         width: pgsData?.FG >= 15 ? `${45 + pgsData?.FG}%` : `${45 - pgsData?.FG}%`,
//                         backgroundColor: Colors.compareRightBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//                 <Text style={{ fontSize: 14, color: Colors.compareRightBar, paddingLeft: 8, fontFamily: Fonts.Bold }}>{pgsData?.FG}</Text>
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-start'
//             }}>

//                 {pgsData?.PT2 !== undefined && pgsData?.PT2 !== 0 ?
//                     <View style={{
//                         width: pgsData?.PT2 >= 15 ? `${45 + pgsData?.PT2}%` : `${45 - pgsData?.PT2}%`,
//                         backgroundColor: Colors.compareRightBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//                 <Text style={{ fontSize: 14, color: Colors.compareRightBar, paddingLeft: 8, fontFamily: Fonts.Bold }}>{pgsData?.PT2}</Text>
//             </View>

//             <View style={{
//                 width: '100%', height: '10%', flexDirection: 'row',
//                 justifyContent: 'flex-start'
//             }}>

//                 {pgsData?.G !== undefined && pgsData?.G !== 0 ?
//                     <View style={{
//                         width: pgsData?.G >= 15 ? `${45 + pgsData?.G}%` : `${45 - pgsData?.G}%`,
//                         backgroundColor: Colors.compareRightBar, height: 12
//                     }}></View>
//                     :
//                     <View style={{
//                         width: '70%',
//                         backgroundColor: Colors.emptyBar, height: 12
//                     }}></View>
//                 }
//                 <Text style={{ fontSize: 14, color: Colors.compareRightBar, paddingLeft: 8, fontFamily: Fonts.Bold }}>{pgsData?.G}</Text>
//             </View>
//         </View>

//     )
// }


function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    User: entities.user,
    Home: entities.home
  };
}

export default connect(mapStateToProps)(Compare);
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
    color: Colors.light, fontSize: 20, fontFamily: Fonts.Bold,
    marginTop: 6,
  },
  textPointHeading: {
    color: Colors.fontColorGray, fontSize: 15, fontFamily: Fonts.SemiBold,
  },
  textPointCenter: {
    color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
    marginTop: 6, textAlign: 'center'
  },
});