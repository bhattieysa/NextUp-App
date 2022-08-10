
// import React, { Component } from 'react';
// import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
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
// import { AirbnbRating } from 'react-native-ratings';
// import { getObject } from '../../middleware';
// import { getCoachDashboard, getPlayersForCoachProfile } from '../../actions/home';
// import FastImage from 'react-native-fast-image';
// let wide = Layout.width;
// var pageNum = 1
// class CoachProfile extends Component {
//     static navigationOptions = { header: null };
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             arrPlayers: []
//         };
//     }
//     componentDidMount() {
//         pageNum = 1
//         this.props.navigation.addListener('didFocus', this.onScreenFocus)

//     }
//     onScreenFocus = () => {
//         this.getPlayers()
//         getObject('UserId').then((obj) => {
//             this.setState({ loading: true }, () => {
//                 this.props.dispatch(getCoachDashboard(obj, (res) => {
//                     this.setState({
//                         loading: false
//                     })
//                 }))
//             })

//         })
//     }
//     getPlayers = () => {
//         // if (!this.state.isDataAllFetched) {
//         getObject('UserId').then((obj) => {
//             // this.setState({ loading: true }, () => {
//             this.props.dispatch(getPlayersForCoachProfile(obj, pageNum, (res, resData) => {
//                 console.log(resData);
//                 // if (resData.length === 0) {
//                 //   this.setState({ isDataAllFetched: true })
//                 // }
//                 if (this.state.arrPlayers.length > 0) {
//                     debugger
//                     this.setState({ loading: false, arrPlayers: [...this.state.arrPlayers, ...resData] })
//                 } else {
//                     debugger
//                     this.setState({ loading: false, arrPlayers: resData })
//                 }
//             }))
//         })

//         // })
//         //}
//     }
//     _renderHotPlayers = ({ item, index }) => {
//         debugger;
//         if (item !== null) {
//             return (

//                 <TouchableOpacity style={{
//                     marginLeft: 15,
//                     justifyContent: 'center',
//                     alignItems: 'center', //paddingRight: wide * 0.05
//                 }}
//                     activeOpacity={1}
//                     onPress={() => Navigation.navigate('PlayerProfile', { playerId: item.id })}
//                 >


//                     <View style={{
//                         width: wide * 0.32, height: wide * 0.4,
//                         marginTop: wide * 0.04, borderRadius: 10, borderWidth: 3,
//                         borderColor: Colors.borderColor,
//                         justifyContent: 'center', alignItems: 'center'
//                     }}>
//                         <FastImage style={{ width: '95%', height: '95%', borderRadius: 5 }} resizeMode={'cover'}
//                             source={{ uri: item.imageUrl }} />

//                     </View>


//                     <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>

//                         <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 9, marginLeft: 5 }}>Rank {item.rank}</Text>
//                         {
//                             item.improved === true ?
//                                 <Image
//                                     source={require("../../Images/upArrow.png")}
//                                     // resizeMode="contain"
//                                     style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
//                                 ></Image>
//                                 :
//                                 <Image
//                                     source={require("../../Images/downArrow.png")}
//                                     // resizeMode="contain"
//                                     style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
//                                 ></Image>
//                         }

//                     </View>

//                 </TouchableOpacity>
//             );
//         }
//     };
//     _renderPhotos = ({ item }) => {
//         return (
//             <TouchableOpacity style={{
//                 width: wide * 0.32, height: wide * 0.4,
//                 justifyContent: 'center', alignItems: 'center',
//             }}
//             // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
//             >
//                 <View style={{
//                     // borderWidth: 1,
//                     margin: 5,
//                     flex: 1,
//                     // borderColor: Colors.lightGray,
//                     justifyContent: 'center', alignItems: 'center',
//                     //  backgroundColor: Colors.btnBg,

//                     shadowColor: Colors.lightGray,
//                     shadowOffset: { width: 0, height: 0 },
//                     shadowOpacity: 1.0, width: '90%',
//                 }}>

//                     {
//                         <Image
//                             source={require("../../Images/avatar.png")}
//                             //resizeMode="stretch"
//                             style={{ width: '100%', height: '100%' }}
//                         ></Image>
//                     }

//                 </View>


//             </TouchableOpacity>
//         );
//     };
//     _renderHighlights = ({ item }) => {
//         debugger;
//         return (
//             <TouchableOpacity style={{
//                 width: wide * 0.25, height: wide * 0.25,
//                 justifyContent: 'center', alignItems: 'center',
//             }}
//             // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
//             >
//                 <View style={{
//                     // borderWidth: 1,
//                     margin: 5,
//                     flex: 1,
//                     // borderColor: Colors.lightGray,
//                     justifyContent: 'center', alignItems: 'center',
//                     // backgroundColor: Colors.btnBg,
//                     borderRadius: (wide * 0.22) / 2,
//                     shadowColor: Colors.lightGray,
//                     shadowOffset: { width: 0, height: 0 },
//                     shadowOpacity: 1.0, width: '80%', height: '80%'
//                 }}>

//                     {
//                         <FastImage
//                             source={{ uri: item.imageUrl }}
//                             // resizeMode="contain"
//                             style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
//                         ></FastImage>
//                     }

//                 </View>
//                 <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12 }}>{item.name}</Text>
//             </TouchableOpacity>
//         );
//     };



//     render() {
//         debugger
//         const { coachDash } = this.props.Home
//         const { arrPlayers } = this.state
//         console.log(coachDash);
//         console.log(coachDash.profilePictureUrl)

//         let iosProfile = <FlatList
//             contentContainerStyle={{ marginHorizontal: 10 }}
//             style={{ overflow: 'visible' }}
//             data={arrPlayers} //{coachDash.myPlayers} 
//             renderItem={(item, index) => this._renderHotPlayers(item, index)}
//             showsHorizontalScrollIndicator={false}
//             showsVerticalScrollIndicator={false}
//             numColumns={3}
//             initialNumToRender={20}
//             onEndReachedThreshold={0.1}
//             onEndReached={() => {
//                 pageNum = pageNum + 1
//                 this.getPlayers()
//             }}
//             ListHeaderComponent={

//                 <View style={{ flex: 1, }}>
//                     <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >


//                         <View style={{
//                             flexDirection: 'row',
//                             marginTop: wide * 0.07,
//                         }}>
//                             <View>

//                                 <Text style={{
//                                     color: Colors.light, fontSize: 28,
//                                     lineHeight: 30, fontFamily: Fonts.Bold
//                                 }}>
//                                     {coachDash.firstName} {coachDash.lastName}
//                                 </Text>
//                                 <Text style={{
//                                     color: Colors.overlayWhite,
//                                     fontSize: 18, lineHeight: 20,
//                                     fontFamily: Fonts.Regular,
//                                     marginTop: 10, fontStyle: 'italic'
//                                 }}>
//                                     {coachDash.certificateName}
//                                 </Text>
//                             </View>

//                             <View style={{ flex: 1 }} />

//                             <View style={{
//                                 width: wide * 0.12,
//                                 justifyContent: 'space-between', alignItems: 'center'
//                             }}>
//                                 <TouchableOpacity
//                                 // onPress={() => { Navigation.navigate('MessageList') }} 
//                                 >
//                                     <Image style={{
//                                         width: 25, height: 25,
//                                         tintColor: Colors.light
//                                     }} source={require('../../Images/newCalenderIcon.png')} />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }}>
//                                     <Image style={{
//                                         width: 25, height: 25,
//                                         tintColor: Colors.light
//                                     }} source={require('../../Images/edit.png')} />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View style={{ alignSelf: 'center', zIndex: 1 }}>
//                             {coachDash.verified === true ? <Image style={{
//                                 position: 'absolute',
//                                 right: -5, top: 15,
//                                 width: 20, height: 20, zIndex: 1
//                             }} source={require('../../Images/sort_tick_selected.png')} /> : null}
//                             {/* {coachDash.profilePictureUrl !== null ? */}
//                             <FastImage style={{
//                                 width: wide * 0.3, height: wide * 0.4,
//                                 marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4,
//                                 borderColor: Colors.borderColor
//                             }} source={{ uri: coachDash.profilePictureUrl }} />
//                             <TouchableOpacity style={{
//                                 width: wide * 0.3, height: wide * 0.2,
//                                 bottom: 0, position: 'absolute', alignItems: 'center'
//                             }}>
//                                 <Image style={{
//                                     width: '96%', height: '96%',
//                                 }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
//                                 <View style={{ marginTop: -wide * 0.06 }}>
//                                     <AirbnbRating

//                                         ratingColor={Colors.stars}
//                                         isDisabled={true}
//                                         size={12}
//                                         showRating={false}
//                                         selectedColor={Colors.stars}

//                                         defaultRating={coachDash.ratings}

//                                     />
//                                 </View>
//                             </TouchableOpacity>

//                         </View>

//                         <View style={{ marginTop: -wide * 0.11 }}>
//                             <Image style={{
//                                 position: 'absolute', top: -wide * 0.1, left: 0, right: 0, width: '100%'
//                             }} resizeMode={'contain'} source={require('../../Images/Rectangle_Copy.png')} />
//                             <View style={{ marginTop: wide * 0.08, }}>
//                                 <Text style={{

//                                     color: Colors.light,
//                                     fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 20,
//                                     width: wide * 0.78, alignSelf: 'center', textAlign: 'center', marginTop: wide * 0.05, opacity: 0.4
//                                 }}>{coachDash.title}</Text>
//                             </View>


//                             <Text style={{
//                                 color: Colors.light,
//                                 fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
//                                 width: wide * 0.78, alignSelf: 'center',
//                                 textAlign: 'center', marginTop: wide * 0.01, opacity: 0.4
//                             }}>{coachDash.aboutMe}</Text>
//                             <View style={{
//                                 flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//                                 marginTop: wide * 0.05
//                             }}>
//                                 <TouchableOpacity style={{
//                                     backgroundColor: Colors.btnBg,
//                                     width: wide * 0.35, height: wide * 0.09, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
//                                 }}>
//                                     <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Insights</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }} style={{
//                                     width: wide * 0.35, height: wide * 0.1, borderRadius: 10, borderWidth: 3,
//                                     borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center'
//                                 }}>
//                                     <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Edit</Text>
//                                 </TouchableOpacity>
//                             </View>

//                         </View>


//                     </View>
//                     {
//                         coachDash.teamDetailInfo !== null && coachDash.teamDetailInfo !== undefined ?
//                             <View style={{ marginTop: wide * 0.06, marginHorizontal: 15 }}>
//                                 <Text style={{
//                                     color: Colors.light, fontSize: 28, lineHeight: 30,
//                                     fontFamily: Fonts.SemiBold
//                                 }}>
//                                     My Team
//                                 </Text>
//                                 <View style={{ marginTop: wide * 0.04 }}>
//                                     <Image style={{
//                                         position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
//                                     }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
//                                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <View style={{ marginLeft: wide * 0.04, alignItems: 'center' }}>
//                                             <View style={{
//                                                 width: wide * 0.27, height: wide * 0.27,
//                                                 marginTop: 10, borderRadius: wide * 0.27 / 2, borderWidth: 3,
//                                                 borderColor: Colors.borderColor, alignItems: 'center',
//                                                 justifyContent: 'center',
//                                             }}>
//                                                 <FastImage style={{ width: '80%', height: '80%', }} resizeMode={'contain'}
//                                                     source={{ uri: coachDash.teamDetailInfo.teamLogoUrl }} />

//                                             </View>

//                                             <Text style={{
//                                                 color: Colors.light, fontSize: 12,
//                                                 fontFamily: Fonts.SemiBold,
//                                                 marginTop: wide * 0.02,
//                                             }}>
//                                                 RANK #{coachDash.teamDetailInfo.stats.rankBasedUponCurrentLocation}
//                                             </Text></View>




//                                         <View style={{
//                                             marginHorizontal: wide * 0.05,
//                                             flex: 1
//                                         }}>
//                                             <View >
//                                                 <View style={{
//                                                     flexDirection: 'row',
//                                                     justifyContent: 'space-between',
//                                                     width: '100%'
//                                                 }}>


//                                                     <Text style={{
//                                                         color: Colors.light, fontSize: 16,
//                                                         fontFamily: Fonts.SemiBold,
//                                                         marginTop: wide * 0.06,
//                                                     }}>
//                                                         {coachDash.teamDetailInfo.name}
//                                                     </Text>


//                                                 </View>
//                                                 {/* commented by keshav */}
//                                                 {/* <Text style={{
//                                                     color: Colors.light, fontSize: 11,
//                                                     fontFamily: Fonts.Regular,
//                                                     marginTop: 8, fontStyle: 'italic'
//                                                 }}>
//                                                     Since 2014
//                                                 </Text>
//                                                 <Text style={{
//                                                     color: Colors.light, fontSize: 11,
//                                                     fontFamily: Fonts.Regular,
//                                                     marginTop: 8, fontStyle: 'italic'
//                                                 }}>
//                                                     “The best team I have played with.”
//                                                 </Text> */}

//                                                 <View style={{
//                                                     flexDirection: 'row',
//                                                     width: '100%', marginTop: wide * 0.03, justifyContent: 'space-between'
//                                                 }}>

//                                                     <View >
//                                                         <Text style={{
//                                                             color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

//                                                         }}>PLAYED</Text>
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

//                                                         }}>WON</Text>
//                                                         <Text style={{
//                                                             color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
//                                                             marginTop: 6,
//                                                         }}>
//                                                             {coachDash.teamDetailInfo.stats.wins}
//                                                         </Text>
//                                                     </View>
//                                                     <View >
//                                                         <Text style={{
//                                                             color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

//                                                         }}>LOST</Text>
//                                                         <Text style={{
//                                                             color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
//                                                             marginTop: 6,
//                                                         }}>
//                                                             {coachDash.teamDetailInfo.stats.loss}
//                                                         </Text>
//                                                     </View>
//                                                 </View>
//                                             </View>
//                                         </View>

//                                     </View>
//                                 </View>
//                             </View>
//                             : null
//                     }
//                     <View style={{ flex: 1, backgroundColor: Colors.base, marginLeft: 15, marginTop: wide * 0.08 }}>
//                         {coachDash.recentGames !== null && coachDash.recentGames !== undefined && coachDash.recentGames?.length !== 0 ?
//                             <>
//                                 <Text style={{
//                                     color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
//                                 }}>Recent Games</Text>

//                                 <View style={{ flexDirection: 'row', marginTop: wide * 0.03 }}>

//                                     <FlatList
//                                         style={{ overflow: 'visible' }}
//                                         data={coachDash.recentGames}
//                                         renderItem={(item, index) => this._renderHighlights(item, index)}
//                                         horizontal
//                                         showsHorizontalScrollIndicator={false}
//                                     />
//                                 </View>
//                             </>
//                             : null}
//                         {coachDash.opponents !== null && coachDash.opponents !== undefined && coachDash.opponents !== [] ?
//                             <>
//                                 <View style={{ flexDirection: 'row', marginTop: wide * 0.08 }}>
//                                     <Text style={{
//                                         color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
//                                     }}>Opponents</Text>
//                                     <View style={{ flex: 1 }} />
//                                     <Text style={{
//                                         color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold, paddingRight: 15
//                                     }}>
//                                         See All

//                                     </Text>
//                                 </View>
//                                 <View style={{ flexDirection: 'row', marginTop: wide * 0.04 }}>

//                                     <FlatList
//                                         style={{ overflow: 'visible' }}
//                                         data={[1, 2, 3, 4, 5]}
//                                         renderItem={(item, index) => this._renderPhotos(item, index)}
//                                         horizontal
//                                         showsHorizontalScrollIndicator={false}
//                                     />
//                                 </View>
//                             </>
//                             : null
//                         }
//                     </View>
//                     <View style={{ marginTop: wide * 0.08, marginLeft: 15, }}>
//                         <View style={{ flexDirection: 'row' }}>
//                             {arrPlayers.length !== 0 ? <Text style={{
//                                 color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
//                             }}>
//                                 My Players

//                             </Text> : null}
//                             <View style={{ flex: 1 }} />
//                             {/* <Text style={{
//                 color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold, paddingRight: 15
//             }}>
//                 See All

//             </Text> */}
//                         </View>
//                     </View>
//                     {/* </ScrollView> */}
//                 </View>
//             }
//         />

//         let android_Profile = <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
//             minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
//             paddingBottom: isNotch ? 30 : 40, marginHorizontal: 10
//         }}>

//             {
//                 <FlatList
//                     keyExtractor={(item, index) => index.toString()}
//                     contentContainerStyle={{ marginHorizontal: 10 }}
//                     style={{ overflow: 'visible' }}
//                     data={arrPlayers} //{coachDash.myPlayers} 
//                     renderItem={(item, index) => this._renderHotPlayers(item, index)}
//                     showsHorizontalScrollIndicator={false}
//                     showsVerticalScrollIndicator={false}
//                     numColumns={3}
//                     initialNumToRender={20}
//                     onEndReachedThreshold={0.1}
//                     onEndReached={() => {
//                         pageNum = pageNum + 1
//                         this.getPlayers()
//                     }}
//                     ListHeaderComponent={

//                         <View style={{ flex: 1, }}>
//                             <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >


//                                 <View style={{
//                                     flexDirection: 'row',
//                                     marginTop: wide * 0.07,
//                                 }}>
//                                     <View>

//                                         <Text style={{
//                                             color: Colors.light, fontSize: 28,
//                                             lineHeight: 30, fontFamily: Fonts.Bold
//                                         }}>
//                                             {coachDash.firstName} {coachDash.lastName}
//                                         </Text>
//                                         <Text style={{
//                                             color: Colors.overlayWhite,
//                                             fontSize: 18, lineHeight: 20,
//                                             fontFamily: Fonts.Regular,
//                                             marginTop: 10, fontStyle: 'italic'
//                                         }}>
//                                             {coachDash.certificateName}
//                                         </Text>
//                                     </View>
//                                     <View style={{ flex: 1 }} />

//                                     <View style={{ width: wide * 0.04 }} />
//                                     <TouchableOpacity onPress={() => { Navigation.navigate('MessageList') }} style={{

//                                     }}>
//                                         <Image style={{

//                                             width: 30, height: 30
//                                         }} source={require('../../Images/chat_icon.png')} />
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View style={{ alignSelf: 'center', zIndex: 1 }}>
//                                     {coachDash.verified === true ? <Image style={{
//                                         position: 'absolute',
//                                         right: -5, top: 15,
//                                         width: 20, height: 20, zIndex: 1
//                                     }} source={require('../../Images/sort_tick_selected.png')} /> : null}
//                                     {/* {coachDash.profilePictureUrl !== null ? */}
//                                     <FastImage style={{
//                                         width: wide * 0.3, height: wide * 0.4,
//                                         marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4,
//                                         borderColor: Colors.borderColor
//                                     }} source={{ uri: coachDash.profilePictureUrl }} />
//                                     <TouchableOpacity style={{
//                                         width: wide * 0.3, height: wide * 0.2,
//                                         bottom: 0, position: 'absolute', alignItems: 'center'
//                                     }}>
//                                         <Image style={{
//                                             width: '96%', height: '96%',
//                                         }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
//                                         <View style={{ marginTop: -wide * 0.06 }}>
//                                             <AirbnbRating

//                                                 ratingColor={Colors.stars}
//                                                 isDisabled={true}
//                                                 size={12}
//                                                 showRating={false}
//                                                 selectedColor={Colors.stars}

//                                                 defaultRating={coachDash.ratings}


//                                             />
//                                         </View>
//                                     </TouchableOpacity>

//                                 </View>

//                                 <View style={{ marginTop: -wide * 0.11 }}>
//                                     <Image style={{
//                                         position: 'absolute', top: -wide * 0.1, left: 0, right: 0, width: '100%'
//                                     }} resizeMode={'contain'} source={require('../../Images/Rectangle.png')} />
//                                     <View style={{ marginTop: wide * 0.08, }}>
//                                         <Text style={{

//                                             color: Colors.light,
//                                             fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 20,
//                                             width: wide * 0.78, alignSelf: 'center', textAlign: 'center', marginTop: wide * 0.05, opacity: 0.4
//                                         }}>{coachDash.title}</Text>
//                                     </View>


//                                     <Text style={{
//                                         color: Colors.light,
//                                         fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
//                                         width: wide * 0.78, alignSelf: 'center',
//                                         textAlign: 'center', marginTop: wide * 0.01, opacity: 0.4
//                                     }}>{coachDash.aboutMe}</Text>
//                                     <View style={{
//                                         flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
//                                         marginTop: wide * 0.05
//                                     }}>
//                                         <TouchableOpacity style={{
//                                             backgroundColor: Colors.btnBg,
//                                             width: wide * 0.35, height: wide * 0.09, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
//                                         }}>
//                                             <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Insights</Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }} style={{
//                                             width: wide * 0.35, height: wide * 0.1, borderRadius: 10, borderWidth: 3,
//                                             borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center'
//                                         }}>
//                                             <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Edit</Text>
//                                         </TouchableOpacity>
//                                     </View>

//                                 </View>


//                             </View>
//                             {
//                                 coachDash.teamDetailInfo !== null && coachDash.teamDetailInfo !== undefined ?
//                                     <View style={{ marginTop: wide * 0.06, marginHorizontal: 15 }}>
//                                         <Text style={{
//                                             color: Colors.light, fontSize: 28, lineHeight: 30,
//                                             fontFamily: Fonts.SemiBold
//                                         }}>
//                                             My Team
//                                         </Text>
//                                         <View style={{ marginTop: wide * 0.04 }}>
//                                             <Image style={{
//                                                 position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
//                                             }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
//                                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                                 <View style={{ marginLeft: wide * 0.05, alignItems: 'center' }}>
//                                                     <View style={{
//                                                         width: wide * 0.27, height: wide * 0.27,
//                                                         marginTop: 10, borderRadius: wide * 0.27 / 2, borderWidth: 3,
//                                                         borderColor: Colors.borderColor, alignItems: 'center',
//                                                         justifyContent: 'center',
//                                                     }}>
//                                                         <FastImage style={{ width: '80%', height: '80%', }} resizeMode={'contain'}
//                                                             source={{ uri: coachDash.teamDetailInfo.teamLogoUrl }} />

//                                                     </View>

//                                                     <Text style={{
//                                                         color: Colors.light, fontSize: 12,
//                                                         fontFamily: Fonts.SemiBold,
//                                                         marginTop: wide * 0.02,
//                                                     }}>
//                                                         RANK #{coachDash.teamDetailInfo.stats.rankBasedUponCurrentLocation}
//                                                     </Text></View>




//                                                 <View style={{
//                                                     marginHorizontal: wide * 0.05,
//                                                     flex: 1
//                                                 }}>
//                                                     <View >
//                                                         <View style={{
//                                                             flexDirection: 'row',
//                                                             justifyContent: 'space-between',
//                                                             width: '100%'
//                                                         }}>


//                                                             <Text style={{
//                                                                 color: Colors.light, fontSize: 16,
//                                                                 fontFamily: Fonts.SemiBold,
//                                                                 marginTop: wide * 0.06,
//                                                             }}>
//                                                                 {coachDash.teamDetailInfo.name}
//                                                             </Text>


//                                                         </View>
//                                                         {/* commented by keshav */}
//                                                         {/* <Text style={{
//                                                     color: Colors.light, fontSize: 11,
//                                                     fontFamily: Fonts.Regular,
//                                                     marginTop: 8, fontStyle: 'italic'
//                                                 }}>
//                                                     Since 2014
//                                                 </Text>
//                                                 <Text style={{
//                                                     color: Colors.light, fontSize: 11,
//                                                     fontFamily: Fonts.Regular,
//                                                     marginTop: 8, fontStyle: 'italic'
//                                                 }}>
//                                                     “The best team I have played with.”
//                                                 </Text> */}

//                                                         <View style={{
//                                                             flexDirection: 'row',
//                                                             width: '100%', marginTop: wide * 0.03, justifyContent: 'space-between'
//                                                         }}>

//                                                             <View >
//                                                                 <Text style={{
//                                                                     color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

//                                                                 }}>PLAYED</Text>
//                                                                 <Text style={{
//                                                                     color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
//                                                                     marginTop: 6,
//                                                                 }}>
//                                                                     35
//                                                                 </Text>
//                                                             </View>
//                                                             <View >
//                                                                 <Text style={{
//                                                                     color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

//                                                                 }}>WON</Text>
//                                                                 <Text style={{
//                                                                     color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
//                                                                     marginTop: 6,
//                                                                 }}>
//                                                                     {coachDash.teamDetailInfo.stats.wins}
//                                                                 </Text>
//                                                             </View>
//                                                             <View >
//                                                                 <Text style={{
//                                                                     color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

//                                                                 }}>LOST</Text>
//                                                                 <Text style={{
//                                                                     color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
//                                                                     marginTop: 6,
//                                                                 }}>
//                                                                     {coachDash.teamDetailInfo.stats.loss}
//                                                                 </Text>
//                                                             </View>
//                                                         </View>
//                                                     </View>
//                                                 </View>

//                                             </View>
//                                         </View>
//                                     </View>
//                                     : null
//                             }
//                             <View style={{ flex: 1, backgroundColor: Colors.base, marginLeft: 15, marginTop: wide * 0.08 }}>
//                                 {coachDash.recentGames !== null && coachDash.recentGames !== undefined && coachDash.recentGames?.length !== 0 ?
//                                     <>
//                                         <Text style={{
//                                             color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
//                                         }}>Recent Games</Text>

//                                         <View style={{ flexDirection: 'row', marginTop: wide * 0.03 }}>

//                                             <FlatList
//                                                 style={{ overflow: 'visible' }}
//                                                 data={coachDash.recentGames}
//                                                 renderItem={(item, index) => this._renderHighlights(item, index)}
//                                                 horizontal
//                                                 showsHorizontalScrollIndicator={false}
//                                             />
//                                         </View>
//                                     </>
//                                     : null}
//                                 {coachDash.opponents !== null && coachDash.opponents !== undefined && coachDash.opponents !== [] ?
//                                     <>
//                                         <View style={{ flexDirection: 'row', marginTop: wide * 0.08 }}>
//                                             <Text style={{
//                                                 color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
//                                             }}>Opponents</Text>
//                                             <View style={{ flex: 1 }} />
//                                             <Text style={{
//                                                 color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold, paddingRight: 15
//                                             }}>
//                                                 See All

//                                             </Text>
//                                         </View>
//                                         <View style={{ flexDirection: 'row', marginTop: wide * 0.04 }}>

//                                             <FlatList
//                                                 style={{ overflow: 'visible' }}
//                                                 data={[1, 2, 3, 4, 5]}
//                                                 renderItem={(item, index) => this._renderPhotos(item, index)}
//                                                 horizontal
//                                                 showsHorizontalScrollIndicator={false}
//                                             />
//                                         </View>
//                                     </>
//                                     : null
//                                 }
//                             </View>
//                             <View style={{ marginTop: wide * 0.08, marginLeft: 15, }}>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     {arrPlayers.length !== 0 ? <Text style={{
//                                         color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
//                                     }}>
//                                         My Players

//                                     </Text> : null}
//                                     <View style={{ flex: 1 }} />
//                                     {/* <Text style={{
//                         color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold, paddingRight: 15
//                     }}>
//                         See All

//                     </Text> */}
//                                 </View>
//                             </View>
//                             {/* </ScrollView> */}
//                         </View>
//                     }
//                 />
//             }
//         </ScrollView>

//         return (
//             coachDash.length === 0 ?
//                 <View style={{ flex: 1, backgroundColor: Colors.base }}>
//                     {/* <AppLoader visible={this.state.loading} /> */}
//                 </View>
//                 :
//                 <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
//                     <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>

//                         {Platform.OS === 'ios' ?
//                             iosProfile
//                             :
//                             android_Profile
//                         }

//                     </KeyboardAvoidingView>

//                 </SafeAreaView >
//         );
//     }
// }

// function mapStateToProps(state) {
//     const { entities } = state;
//     return {
//         authReducer: state.authReducer,
//         Home: entities.homePlayer
//     };
// }

// export default connect(mapStateToProps)(CoachProfile);



// New coach profile design    By Keshav

import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform, StyleSheet, Modal, ImageBackground } from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import isValidEmail from '../../utils/isValidEmail';

import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { AirbnbRating } from 'react-native-ratings';
import { getObject } from '../../middleware';
import { getCoachDashboard, getPlayersForCoachProfile } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import { VictoryPie, VictoryChart, VictoryAxis } from 'victory-native'
import { DropDown } from '../../components/common/dropDown'
import ShareMenu from 'react-native-share-menu';
import { SHOW_SHARE_SCREEN, userToken, SenderRecevrModel } from '../../constants/constant';
import CoachNewProfile from '../Coach/CoachNewProfile'
import { Title } from '../../components/common/titleLabel'
import { BlurView } from "@react-native-community/blur";
import { Card } from '../../components/common/DashBoardCard'
import NotifService from '../../utils/notificationService/service';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { EmptyPieChart } from './Components/EmptyPieChart';
import Orientation from 'react-native-orientation-locker';


let wide = Layout.width;
let high = Layout.height;
var pageNum = 1
var showShareWindow = false;

// const upcomingGame = [
//     {
//         name: null,
//         challengerTeamId: 163212514587104,
//         defenderTeamId: 163212514587204,
//         challengerLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1200px-Los_Angeles_Lakers_logo.svg.png",
//         defenderLogoUrl: "https://ftw.usatoday.com/wp-content/uploads/sites/90/2020/03/1280px-chicago_bulls_logo.svg-1.png?w=991",
//         finalScore: null,
//         scheduledAt: 1632249000000,
//         geoLocation: {
//             name: "Loc",
//             loc: {
//                 type: "Point",
//                 coordinates: [
//                     77.4128187,
//                     28.5156075
//                 ]
//             }
//         },
//         gameId: 163223246545308,
//         liveVideoUrl: null,
//         venue: "La,CA",
//         live: null
//     },
// ]


class CoachProfile extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotification.bind(this),
    );
    this.regesterNotiIOS()
    this.state = {
      loading: false,
      arrPlayers: [],
      dropDownSelectedVal: null,
      teamDropDownSelectedVal: 'Golden slack',
      pieChartData: [],
      totalMatches: null,
      teamDropDownData: [],
      sharedData: '',
      sharedMimeType: '',
      sharedExtraData: null,
      showSessionModal: false,
      showTeamModal: false,
      isStatNull: false,
      winStreak: null,
      last_10: null,

    };
  }

  onRegister = (token) => {
    // console.log("tkn", token);
    // console.log("ios_tkn", userToken.DEVICE_TOKEN);
  }

  onNotification(notif) {
    debugger
    console.log("notification_home", notif);
    if (notif.userInteraction == true) {
      const notif_data = notif.data;
      if (notif_data.notificationType == "team") {

        const notification_payload = JSON.parse(notif_data.notificationData);
        console.log("notif_data", notification_payload, "  _type", typeof notification_payload);
        this.props.navigation.navigate("MyTeam");

      } else if (notif_data.notificationType == "subscription") {

        const notification_payload = JSON.parse(notif_data.notificationData);
        Navigation.navigate('CoachChallengeAction', { entityId: notification_payload.subscriptionId });

      } else if (notif_data.notificationType == "new_message") {

        const notification_payload = JSON.parse(notif_data.notificationData);
        this.handleNotifChatRender(notification_payload);
        // SenderRecevrModel.senderId = notification_payload.senderId;
        // SenderRecevrModel.senderName = notification_payload.senderName;
        // SenderRecevrModel.senderProfilePic = notification_payload.senderProfilePicUrl;
        // SenderRecevrModel.senderType = UserModel.selectedUserType.toUpperCase();

        // SenderRecevrModel.receiverId = notification_payload.receiverId;
        // SenderRecevrModel.receiverName = notification_payload.receiverName;
        // SenderRecevrModel.receiverProfilePic = notification_payload.receiverProfilePicUrl;
        // SenderRecevrModel.receiverType = UserModel.selectedUserType.toUpperCase() == 'COACH' ? "PLAYER" : 'COACH';

        // Navigation.navigate("Chat");
      }

    }


  }

  handleNotifChatRender = (notif_data) => {
    getObject('UserId').then((obj) => {
      if (obj == notif_data.senderId) {
        SenderRecevrModel.senderId = parseInt(notif_data.senderId);
        SenderRecevrModel.senderName = notif_data.senderName;
        SenderRecevrModel.senderProfilePic = notif_data.senderProfilePicUrl;
        SenderRecevrModel.senderType = notif_data.senderType;

        SenderRecevrModel.receiverId = parseInt(notif_data.receiverId);
        SenderRecevrModel.receiverName = notif_data.receiverName;
        SenderRecevrModel.receiverProfilePic = notif_data.receiverProfilePicUrl;
        SenderRecevrModel.receiverType = notif_data.receiverType;

        Navigation.navigate("Chat");
      } else {
        SenderRecevrModel.senderId = parseInt(notif_data.receiverId);
        SenderRecevrModel.senderName = notif_data.receiverName;
        SenderRecevrModel.senderProfilePic = notif_data.receiverProfilePicUrl;
        SenderRecevrModel.senderType = notif_data.receiverType;

        SenderRecevrModel.receiverId = parseInt(notif_data.senderId);
        SenderRecevrModel.receiverName = notif_data.senderName;
        SenderRecevrModel.receiverProfilePic = notif_data.senderProfilePicUrl;
        SenderRecevrModel.receiverType = notif_data.senderType;

        Navigation.navigate("Chat");
      }
    })
  }

  regesterNotiIOS = () => {
    console.log("Notif_IOSSS");
    if (Platform.OS == 'ios') {
      PushNotificationIOS.addEventListener('notification', this.onRemoteNotification);
      PushNotificationIOS.addEventListener('localNotification', this.onLocalNotification,);

      PushNotificationIOS.requestPermissions().then(
        // (data) => {
        //     console.log('PushNotificationIOS.requestPermissions', data);
        // },

        // (data) => {
        //     console.log('PushNotificationIOS.requestPermissions failed', data);
        // },
      );
    }
  }
  onRemoteNotification = (e) => {
    console.log("Notification IOSSS_REMOTE", e);
  }
  onLocalNotification = (e) => {
    console.log("IOS_LOCALLLL", e);
    // Navigation.navigate("OrderHistory")
  }

  handleShare = (item) => {
    // debugger
    if (item?.data == null || item?.data.length <= 0 || !item) {
      return;
    } else {
      const { mimeType, data, extraData } = item;
      this.setState({ sharedData: data, sharedMimeType: mimeType, sharedExtraData: extraData });
      SHOW_SHARE_SCREEN.show = true;
    }

  }

  componentDidMount() {
    pageNum = 1
    // debugger
    // console.log("ios_tkn dashboard", this.props.navigation);
    ShareMenu.getInitialShare(this.handleShare);
    const listener = ShareMenu.addNewShareListener(this.handleShare);
    this.props.navigation.addListener('didFocus', this.onScreenFocus)
    return () => {
      listener.remove();
    };
  }


  onScreenFocus = () => {
    // this.getPlayers()
    debugger;
    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        debugger;
        this.props.dispatch(getCoachDashboard(obj, (res) => {
          if (res) {
            const { coachDash } = this.props.Home;
            if (coachDash.teamDetailInfo !== null) {
              var teamData = coachDash?.teamDetailInfo;

              var teamDropArr = [];
              teamData.map(obj => {
                debugger;
                if (obj.teamName !== null) {
                  teamDropArr.push(obj.teamName);
                } else {
                  teamDropArr.push("Golden slack");
                }
              })
              this.setState({
                dropDownSelectedVal: coachDash.seasonList[0],
                teamDropDownData: teamDropArr,
                teamDropDownSelectedVal: teamDropArr[0]

              }, () => {
                this._filterPieChartData(coachDash.teamDetailInfo);
              })
            }

          }
          // this.setState({

          // })
        }))
      })

    })

  }
  getPlayers = () => {
    // if (!this.state.isDataAllFetched) {
    getObject('UserId').then((obj) => {
      // this.setState({ loading: true }, () => {
      this.props.dispatch(getPlayersForCoachProfile(obj, pageNum, (res, resData) => {
        console.log(resData);
        // if (resData.length === 0) {
        //   this.setState({ isDataAllFetched: true })
        // }
        if (this.state.arrPlayers.length > 0) {
          debugger
          this.setState({ loading: false, arrPlayers: [...this.state.arrPlayers, ...resData] })
        } else {
          debugger
          this.setState({ loading: false, arrPlayers: resData })
        }
      }))
    })

    // })
    //}
  }

  _filterPieChartData = (data) => {
    const { dropDownSelectedVal, teamDropDownSelectedVal } = this.state;
    console.log("--drrr", teamDropDownSelectedVal, "  ", dropDownSelectedVal);
    var teamStatarr = [];
    debugger
    if (teamDropDownSelectedVal != null) {
      data.forEach(obj => {
        if (obj.teamName == teamDropDownSelectedVal && obj.statsWithSeasonsList !== null) {
          teamStatarr = obj.statsWithSeasonsList;
        }
      })
      var arr = [];
      // var teamArr = []; data replace by teamStatarr
      var tot = 0;
      var isTeamStatNull = false;
      debugger
      var streak = null;
      var lastMatch = null;
      console.log('teammmmDatata', teamStatarr.length)
      if (teamStatarr.length > 0) {
        debugger
        teamStatarr.forEach(obj => {
          if (obj.seasonType === dropDownSelectedVal) {     //seasonList
            debugger
            console.log('Filter calll')
            if (obj.statsSummary !== null) {            // obj.stats
              isTeamStatNull = false;
              streak = obj.statsSummary.streak;
              lastMatch = obj.statsSummary.lastMatches;
              if (obj.statsSummary.hasOwnProperty('wins')) {
                arr.push(obj.statsSummary.wins);

                tot = tot + obj.statsSummary.wins;
              }
              if (obj.statsSummary.hasOwnProperty('loss')) {
                arr.push(obj.statsSummary.loss);
                tot = tot + obj.statsSummary.loss;
              }
              if (obj.statsSummary.hasOwnProperty('draw')) {
                arr.push(obj.statsSummary.draw);
                tot = tot + obj.statsSummary.draw;
              }
            }
            // teamArr.push(obj.teamName) teamDropDownData: teamArr,
          }
        });
      } else {
        debugger
        arr.push(30);
        arr.push(30);
        arr.push(30);
        isTeamStatNull = true;
      }
      debugger
      this.setState({
        pieChartData: arr, totalMatches: tot, isStatNull: isTeamStatNull, winStreak: streak,
        last_10: lastMatch,
      })
    }

    this.setState({ showSessionModal: false, showTeamModal: false, loading: false })

  }


  _renderHotPlayers = ({ item, index }) => {
    // debugger;
    if (item !== null) {
      return (

        <TouchableOpacity style={{
          marginLeft: 15,
          justifyContent: 'center',
          alignItems: 'center', //paddingRight: wide * 0.05
        }}
          activeOpacity={1}
          onPress={() => Navigation.navigate('PlayerProfile', { playerId: item.id })}
        >


          <View style={{
            width: wide * 0.32, height: wide * 0.4,
            marginTop: wide * 0.04, borderRadius: 10, borderWidth: 3,
            borderColor: Colors.borderColor,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <FastImage style={{ width: '95%', height: '95%', borderRadius: 5 }} resizeMode={'cover'}
              source={{ uri: item.imageUrl }} />

          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>

            <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 9, marginLeft: 5 }}>Rank {item.rank}</Text>
            {
              item.improved === true ?
                <Image
                  source={require("../../Images/upArrow.png")}
                  // resizeMode="contain"
                  style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
                ></Image>
                :
                <Image
                  source={require("../../Images/downArrow.png")}
                  // resizeMode="contain"
                  style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
                ></Image>
            }

          </View>

        </TouchableOpacity>
      );
    }
  };
  _renderPhotos = ({ item }) => {
    return (
      <TouchableOpacity style={{
        width: wide * 0.32, height: wide * 0.4,
        justifyContent: 'center', alignItems: 'center',
      }}
      // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
      >
        <View style={{
          // borderWidth: 1,
          margin: 5,
          flex: 1,
          // borderColor: Colors.lightGray,
          justifyContent: 'center', alignItems: 'center',
          //  backgroundColor: Colors.btnBg,

          shadowColor: Colors.lightGray,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1.0, width: '90%',
        }}>

          {
            <Image
              source={require("../../Images/avatar.png")}
              //resizeMode="stretch"
              style={{ width: '100%', height: '100%' }}
            ></Image>
          }

        </View>


      </TouchableOpacity>
    );
  };
  _renderHighlights = ({ item }) => {
    // debugger;
    return (
      <TouchableOpacity style={{
        width: wide * 0.25, height: wide * 0.25,
        justifyContent: 'center', alignItems: 'center',
      }}
      // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
      >
        <View style={{
          // borderWidth: 1,
          margin: 5,
          flex: 1,
          // borderColor: Colors.lightGray,
          justifyContent: 'center', alignItems: 'center',
          // backgroundColor: Colors.btnBg,
          borderRadius: (wide * 0.22) / 2,
          shadowColor: Colors.lightGray,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1.0, width: '80%', height: '80%'
        }}>

          {
            <FastImage
              source={{ uri: item.imageUrl }}
              // resizeMode="contain"
              style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
            ></FastImage>
          }

        </View>
        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  // recent player
  _renderRecentPlayer = ({ item }) => {
    // debugger;
    return (
      // <TouchableOpacity style={{
      //     width: 105,
      //     height: 105,
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //     paddingHorizontal: wide * 0.01
      // }}
      //     onPress={() =>
      //         Navigation.navigate('PlayerProfile', { playerId: item.playerId })
      //     }
      // >
      //     <View style={{
      //         borderWidth: 3,
      //         margin: 5,
      //         // flex: 1,
      //         borderColor: Colors.newGrayFontColor,
      //         justifyContent: 'center', alignItems: 'center',
      //         // backgroundColor: '#23262F',
      //         borderRadius: 80 / 2,
      //         // shadowColor: Colors.lightGray,
      //         // shadowOffset: { width: 0, height: 0 },
      //         // shadowOpacity: 1.0, 
      //         width: '78%', height: '78%'
      //     }}>

      //         {
      //             <FastImage
      //                 source={{ uri: item.playerProfilePictureUrl }}
      //                 style={{ width: '95%', height: '95%', borderRadius: 80 / 2, }}
      //             ></FastImage>
      //         }

      //     </View>
      //     <Text style={{
      //         color: Colors.light, fontFamily: Fonts.Bold, fontSize: 16,
      //         lineHeight: 18, marginBottom: 5
      //     }}>{item.name}</Text>
      // </TouchableOpacity>



      <TouchableOpacity style={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: wide * 0.06,
        marginLeft: wide * 0.01
        // backgroundColor: 'green'
      }}
        activeOpacity={1}
        onPress={() =>
          Navigation.navigate('PlayerProfile', { playerId: item.playerId })
        }
      >


        <View style={{
          width: wide * 0.18, height: wide * 0.18,
          marginTop: wide * 0.05,
          borderRadius: wide * 0.18 / 2,
          borderWidth: 3,
          borderColor: Colors.newGrayFontColor,
          justifyContent: 'center', alignItems: 'center',
          // backgroundColor: 'red'
        }}>
          {/* edit by keshav */}
          {item.playerProfilePictureUrl === null || item.playerProfilePictureUrl === '500 Error' ?
            null
            :
            <FastImage style={{
              width: wide * 0.16, height: wide * 0.16,
              borderRadius: wide * 0.16 / 2,
            }}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: item.playerProfilePictureUrl }}
            />
          }

        </View>


        <Text style={{
          color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
          lineHeight: 18, marginTop: wide * 0.012, marginBottom: 5
        }}>{item.name}</Text>

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', }}>

        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, marginLeft: 5 }}>Rank 1</Text>
        <Image
            source={item.item.improved ? require("../../Images/upArrow.png") : require("../../Images/downArrow.png")}
            // resizeMode="contain"
            style={{ width: wide * 0.02, height: wide * 0.02, marginLeft: 5 }}
        ></Image>
    </View> */}
        {/* <Text style={{
        color: Colors.light, fontSize: 16, fontFamily: Fonts.Regular,
        lineHeight: 18, marginTop: 5
    }}>{item.item.teamName}</Text> */}

      </TouchableOpacity>
    );
  };

  // Upcoming match
  _renderListOfUpcomingMatches = ({ item }) => {
    const d = new Date(item.scheduledAt);
    console.log(moment((new Date(item.scheduledAt))).format('DD'));
    return (
      <>
        <TouchableOpacity style={{
          backgroundColor: '#23262F',//Colors.gameTabCardBg,
          justifyContent: 'center',
          alignItems: 'center', marginRight: wide * 0.05, borderRadius: 10,
          paddingHorizontal: 15,
          marginTop: wide * 0.03,
          width: wide * 0.64
        }}
          activeOpacity={1}
          onPress={() => {
            // Orientation.lockToLandscapeRight()
            Navigation.navigate('GamesRecentTab', { 'gameId': item.id })
          }
          }
        >
          <View style={{
            marginTop: 24,
            flexDirection: 'row', alignItems: 'center'
          }}>
            {/* edit by keshav */}
            <View style={{
              width: wide * 0.18, height: wide * 0.18,
              backgroundColor: Colors.light, borderRadius: wide * 0.18 / 2,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <FastImage style={{ width: wide * 0.13, height: wide * 0.13, }}
                resizeMode={'contain'}
                source={{ uri: item.challengerTeamInfo.logoUrl }} />

            </View>
            <Text style={{
              color: Colors.light, fontSize: 24, fontFamily: Fonts.Regular,
              lineHeight: 30, paddingHorizontal: 10

            }}>VS</Text>
            <View style={{
              width: wide * 0.18, height: wide * 0.19,
              backgroundColor: Colors.light, borderRadius: wide * 0.18 / 2,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <FastImage style={{ width: wide * 0.13, height: wide * 0.13, }}
                resizeMode={'contain'} source={{ uri: item.defenderTeamInfo.logoUrl }} />
            </View>

          </View>

          <Text style={{
            color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
            lineHeight: 20, paddingBottom: 10, marginTop: 5
          }}>{moment((new Date(item.scheduledAt))).format('DD')}  {moment((new Date(item.scheduledAt))).format('MMM')}</Text>
        </TouchableOpacity>
      </>
    );
  };

  _renderSessionList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          height: 50, marginTop: 10,
          // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
        }}
        onPress={() => this.setState({ dropDownSelectedVal: item.item }, () => {
          const { coachDash } = this.props.Home;
          this._filterPieChartData(coachDash.teamDetailInfo);
        })}
      >
        <Text style={{
          color: Colors.light, fontSize: 15, lineHeight: 16,
          fontFamily: Fonts.Bold,
        }}>{item.item}</Text>

      </TouchableOpacity>
    )
  }

  _renderTeamList = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          height: 50, marginTop: 10,
          // borderBottomWidth: 1, borderBottomColor: Colors.newGrayFontColor
        }}
        onPress={() => this.setState({ teamDropDownSelectedVal: item.item }, () => {
          const { coachDash } = this.props.Home;
          this._filterPieChartData(coachDash.teamDetailInfo);
        })}
      >
        <Text style={{
          color: Colors.light, fontSize: 15, lineHeight: 16,
          fontFamily: Fonts.Bold,
        }}>{item.item}</Text>

      </TouchableOpacity>
    )
  }

  render() {
    // debugger
    const { coachDash } = this.props.Home
    const { arrPlayers, pieChartData, teamDropDownData, sharedData,
      sharedMimeType, dropDownSelectedVal, teamDropDownSelectedVal, isStatNull, winStreak, last_10 } = this.state
    console.log("coach dashh", pieChartData);
    // console.log("teammInfooo--", coachDash.teamDetailInfo.length)
    // console.log('show----> ', pieChartData);


    // let iosProfile = <FlatList
    //     keyExtractor={(item, index) => index.toString()}
    //     contentContainerStyle={{ marginHorizontal: 10 }}
    //     style={{ overflow: 'visible' }}
    //     data={arrPlayers} //{coachDash.myPlayers} 
    //     renderItem={(item, index) => this._renderHotPlayers(item, index)}
    //     showsHorizontalScrollIndicator={false}
    //     showsVerticalScrollIndicator={false}
    //     numColumns={3}
    //     initialNumToRender={20}
    //     onEndReachedThreshold={0.1}
    //     onEndReached={() => {
    //         pageNum = pageNum + 1
    //         this.getPlayers()
    //     }}
    //     ListHeaderComponent={

    //         <View style={{ flex: 1, }}>
    //             <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >


    //                 <View style={{
    //                     flexDirection: 'row',
    //                     marginTop: wide * 0.07,
    //                 }}>
    //                     <View>

    //                         <Text style={{
    //                             color: Colors.light, fontSize: 28,
    //                             lineHeight: 30, fontFamily: Fonts.Bold
    //                         }}>
    //                             {coachDash.firstName} {coachDash.lastName}
    //                         </Text>
    //                         <Text style={{
    //                             color: Colors.overlayWhite,
    //                             fontSize: 18, lineHeight: 20,
    //                             fontFamily: Fonts.Regular,
    //                             marginTop: 10, fontStyle: 'italic'
    //                         }}>
    //                             {coachDash.certificateName}
    //                         </Text>
    //                     </View>

    //                     <View style={{ flex: 1 }} />

    //                     <View style={{
    //                         width: wide * 0.12,
    //                         justifyContent: 'space-between', alignItems: 'center'
    //                     }}>
    //                         <TouchableOpacity
    //                             // onPress={() => { Navigation.navigate('MessageList') }} 
    //                             onPress={() => { Navigation.navigate('Calender') }}
    //                         >
    //                             <Image style={{
    //                                 width: 25, height: 25,
    //                                 tintColor: Colors.light
    //                             }} source={require('../../Images/newCalenderIcon.png')} />
    //                         </TouchableOpacity>
    //                         <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }}>
    //                             <Image style={{
    //                                 width: 25, height: 25,
    //                                 tintColor: Colors.light
    //                             }} source={require('../../Images/edit.png')} />
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //                 <View style={{ alignSelf: 'center', zIndex: 1, }}>
    //                     {coachDash.verified === true ? <Image style={{
    //                         position: 'absolute',
    //                         right: -5, top: 15,
    //                         width: 20, height: 20, zIndex: 1
    //                     }} source={require('../../Images/sort_tick_selected.png')} /> : null}
    //                     {/* {coachDash.profilePictureUrl !== null ? */}
    //                     <FastImage style={{
    //                         width: wide * 0.3, height: wide * 0.4,
    //                         marginTop: 5,
    //                         borderRadius: wide * 0.03, borderWidth: 4,
    //                         borderColor: Colors.borderColor
    //                     }} source={{ uri: coachDash.profilePictureUrl }} />
    //                     <TouchableOpacity style={{
    //                         width: wide * 0.3, height: wide * 0.2,
    //                         bottom: 0, position: 'absolute', alignItems: 'center'
    //                     }}>
    //                         <Image style={{
    //                             width: '96%', height: '96%',
    //                         }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
    //                         <View style={{ marginTop: -wide * 0.06 }}>
    //                             <AirbnbRating

    //                                 ratingColor={Colors.stars}
    //                                 isDisabled={true}
    //                                 size={12}
    //                                 showRating={false}
    //                                 selectedColor={Colors.stars}

    //                                 defaultRating={coachDash.ratings}

    //                             />
    //                         </View>
    //                     </TouchableOpacity>

    //                 </View>

    //                 <View style={{ marginTop: -wide * 0.09 }}>
    //                     <Image style={{
    //                         position: 'absolute', top: -wide * 0.07, left: 0, right: 0, width: '100%',
    //                         height: 250,

    //                     }} resizeMode={'contain'} source={require('../../Images/Rectangle_Copy.png')} />
    //                     <View style={{ marginTop: wide * 0.05, }}>
    //                         <Text style={{

    //                             color: Colors.light,
    //                             fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 20,
    //                             width: wide * 0.78, alignSelf: 'center', textAlign: 'center', marginTop: wide * 0.05, opacity: 0.4
    //                         }}>
    //                             Exp - 7 years . 500+ connects
    //                             {/* {coachDash.title} */}
    //                         </Text>
    //                     </View>


    //                     <Text style={{
    //                         color: Colors.light,
    //                         fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
    //                         width: wide * 0.78, alignSelf: 'center',
    //                         textAlign: 'center', marginTop: wide * 0.01, opacity: 0.4
    //                     }}>{coachDash.aboutMe}</Text>
    //                     {coachDash.teamDetailInfo !== null ?
    //                         <View style={{ top: 20, width: '90%', left: 20 }}>
    //                             <FlatList
    //                                 keyExtractor={(item, index) => index.toString()}
    //                                 data={coachDash.teamDetailInfo}
    //                                 horizontal
    //                                 showsHorizontalScrollIndicator={false}
    //                                 renderItem={(item, index) =>
    //                                     <View style={{
    //                                         flexDirection: 'row',
    //                                         justifyContent: 'space-around', alignItems: "center",
    //                                         width: wide * 0.3, marginHorizontal: 20
    //                                     }}>
    //                                         <FastImage
    //                                             style={{ height: wide * 0.07, width: wide * 0.07 }}
    //                                             source={{ uri: item.item.teamLogoUrl }}
    //                                         />
    //                                         <Text style={{
    //                                             color: '#8B8D94',
    //                                             fontFamily: Fonts.Regular, fontSize: 15, lineHeight: 20,

    //                                         }}>
    //                                             La Lakers
    //                                         </Text>
    //                                     </View>

    //                                 }



    //                             />
    //                         </View>
    //                         : null
    //                     }


    //                     {/* <View style={{
    //                             flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    //                             marginTop: wide * 0.05
    //                         }}>
    //                             <TouchableOpacity style={{
    //                                 backgroundColor: Colors.btnBg,
    //                                 width: wide * 0.35, height: wide * 0.09, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
    //                             }}>
    //                                 <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Insights</Text>
    //                             </TouchableOpacity>
    //                             <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }} style={{
    //                                 width: wide * 0.35, height: wide * 0.1, borderRadius: 10, borderWidth: 3,
    //                                 borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center'
    //                             }}>
    //                                 <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Edit</Text>
    //                             </TouchableOpacity>
    //                         </View> */}

    //                 </View>
    //             </View>

    //             <View style={{
    //                 width: '90%', height: wide * 0.65,
    //                 marginTop: wide * 0.16, marginHorizontal: wide * 0.04,
    //                 flexDirection: 'row', justifyContent: "space-between"
    //             }}>
    //                 {/* <svg width={300} height={300}> */}
    //                 {/* <Text>200 Total</Text> */}
    //                 {pieChartData !== null && pieChartData !== undefined ?
    //                     <View style={{ width: '70%', marginLeft: -wide * 0.14, marginTop: -wide * 0.06 }}>
    //                         {this.state.totalMatches !== null && this.state.totalMatches > 0 ?
    //                             <View style={{
    //                                 position: 'absolute', top: wide * 0.32, left: wide * 0.24,
    //                                 alignItems: 'center'
    //                             }}>
    //                                 <Text style={{
    //                                     color: Colors.light,
    //                                     fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16,

    //                                 }}>{this.state.totalMatches}</Text>
    //                                 <Text style={{
    //                                     color: Colors.light,
    //                                     fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16
    //                                 }}>Total Games</Text>
    //                             </View>
    //                             : null
    //                         }

    //                         <VictoryChart
    //                             width={300}
    //                             height={300}
    //                         >
    //                             <VictoryPie
    //                                 colorScale={["#246BFD", "#CE1141", "#FDB927",]}
    //                                 standalone={false}
    //                                 width={200} height={200}
    //                                 innerRadius={60}
    //                                 data={pieChartData}
    //                                 style={{
    //                                     labels: { display: "none" }
    //                                 }}
    //                             />
    //                             <VictoryAxis style={{
    //                                 axis: { stroke: "transparent" },
    //                                 ticks: { stroke: "transparent" },
    //                                 tickLabels: { fill: "transparent" }
    //                             }} />
    //                             <VictoryAxis dependentAxis style={{
    //                                 axis: { stroke: "transparent" },
    //                                 ticks: { stroke: "transparent" },
    //                                 tickLabels: { fill: "transparent" }
    //                             }} />
    //                             {/* <VictoryAxis /> */}
    //                         </VictoryChart>

    //                     </View>
    //                     : null
    //                 }
    //                 <View style={{ width: '35%', justifyContent: 'space-around', }}>
    //                     <View style={{ marginTop: 10, height: '25%', justifyContent: 'space-evenly' }}>
    //                         <Text style={{
    //                             color: Colors.light,
    //                             fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12
    //                         }}>Session:</Text>
    //                         <DropDown
    //                             dropData={coachDash.seasonList}
    //                             onSelectionChange={(val) =>
    //                                 this.setState({ dropDownSelectedVal: val }, () => {
    //                                     this._filterPieChartData(coachDash.teamDetailInfo);
    //                                 })
    //                             }
    //                         />
    //                     </View>
    //                     <View style={{ height: '20%', justifyContent: 'space-evenly' }}>
    //                         <Text style={{
    //                             color: Colors.light,
    //                             fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12
    //                         }}>Team:</Text>
    //                         <DropDown
    //                             dropData={["Golden Figma", "Golden Slack"]}
    //                             onSelectionChange={(val) =>
    //                                 this.setState({ teamDropDownSelectedVal: val }, () => {
    //                                     this._filterPieChartData(coachDash.teamDetailInfo);
    //                                 })
    //                             }
    //                         />
    //                     </View>

    //                     <View style={{ justifyContent: 'space-between', alignItems: 'center', height: '25%', }}>
    //                         {pieChartData !== undefined && pieChartData.length > 0 ?
    //                             <>
    //                                 <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
    //                                     <>
    //                                         <View style={{ width: 28, height: 0, backgroundColor: '#246BFD' }}></View>
    //                                         <Text style={{
    //                                             color: '#246BFD', fontSize: 12, lineHeight: 12,
    //                                             fontFamily: Fonts.Bold, marginHorizontal: 10
    //                                         }}>{pieChartData[0]} Wins</Text>
    //                                     </>

    //                                 </View>
    //                                 <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
    //                                     <>
    //                                         <View style={{ width: 28, backgroundColor: '#CE1141' }}></View>
    //                                         <Text style={{
    //                                             color: '#CE1141', fontSize: 12, lineHeight: 12,
    //                                             fontFamily: Fonts.Bold, marginHorizontal: 10
    //                                         }}>{pieChartData[1]} Losses</Text>
    //                                     </>

    //                                 </View>

    //                                 <View style={{ width: '75%', flexDirection: 'row', alignItems: 'center', }}>
    //                                     {pieChartData.length > 2 ?
    //                                         <>
    //                                             <View style={{ width: 28, height: 5, backgroundColor: '#FDB927' }}></View>
    //                                             <Text style={{
    //                                                 color: '#FDB927', fontSize: 12, lineHeight: 12,
    //                                                 fontFamily: Fonts.Bold, marginHorizontal: 10
    //                                             }}>{pieChartData[2]} Draw</Text>
    //                                         </>
    //                                         : null
    //                                     }

    //                                 </View>
    //                             </>
    //                             : null
    //                         }


    //                     </View>
    //                 </View>

    //                 {/* </svg> */}

    //             </View>

    //             <View style={{ flex: 1, backgroundColor: Colors.base, marginLeft: 15, marginTop: wide * 0.16, }}>
    //                 {coachDash.recentGames !== null && coachDash.recentGames !== undefined && coachDash.recentGames?.length !== 0 ?
    //                     <>
    //                         <Text style={{
    //                             color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
    //                         }}>Upcoming Games</Text>

    //                         <View style={{ flexDirection: 'row', marginTop: wide * 0.025 }}>

    //                             <FlatList
    //                                 keyExtractor={(item, index) => index.toString()}
    //                                 style={{ overflow: 'visible' }}
    //                                 // data={upcomingGame}
    //                                 data={coachDash.recentGames}
    //                                 renderItem={(item, index) => this._renderListOfUpcomingMatches(item, index)}
    //                                 horizontal
    //                                 showsHorizontalScrollIndicator={false}
    //                             />
    //                         </View>
    //                     </>
    //                     : null
    //                 }

    //             </View>


    //             {/* {
    //                     coachDash.teamDetailInfo !== null && coachDash.teamDetailInfo !== undefined ?
    //                         <View style={{ marginTop: wide * 0.06, marginHorizontal: 15 }}>
    //                             <Text style={{
    //                                 color: Colors.light, fontSize: 28, lineHeight: 30,
    //                                 fontFamily: Fonts.SemiBold
    //                             }}>
    //                                 My Team
    //                             </Text>
    //                             <View style={{ marginTop: wide * 0.04 }}>
    //                                 <Image style={{
    //                                     position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
    //                                 }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
    //                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                                     <View style={{ marginLeft: wide * 0.04, alignItems: 'center' }}>
    //                                         <View style={{
    //                                             width: wide * 0.27, height: wide * 0.27,
    //                                             marginTop: 10, borderRadius: wide * 0.27 / 2, borderWidth: 3,
    //                                             borderColor: Colors.borderColor, alignItems: 'center',
    //                                             justifyContent: 'center',
    //                                         }}>
    //                                             <FastImage style={{ width: '80%', height: '80%', }} resizeMode={'contain'}
    //                                                 source={{ uri: coachDash.teamDetailInfo.teamLogoUrl }} />

    //                                         </View>

    //                                         <Text style={{
    //                                             color: Colors.light, fontSize: 12,
    //                                             fontFamily: Fonts.SemiBold,
    //                                             marginTop: wide * 0.02,
    //                                         }}>
    //                                             RANK #{coachDash.teamDetailInfo.stats.rankBasedUponCurrentLocation}
    //                                         </Text></View>




    //                                     <View style={{
    //                                         marginHorizontal: wide * 0.05,
    //                                         flex: 1
    //                                     }}>
    //                                         <View >
    //                                             <View style={{
    //                                                 flexDirection: 'row',
    //                                                 justifyContent: 'space-between',
    //                                                 width: '100%'
    //                                             }}>


    //                                                 <Text style={{
    //                                                     color: Colors.light, fontSize: 16,
    //                                                     fontFamily: Fonts.SemiBold,
    //                                                     marginTop: wide * 0.06,
    //                                                 }}>
    //                                                     {coachDash.teamDetailInfo.name}
    //                                                 </Text>


    //                                             </View>


    //                                             <View style={{
    //                                                 flexDirection: 'row',
    //                                                 width: '100%', marginTop: wide * 0.03, justifyContent: 'space-between'
    //                                             }}>

    //                                                 <View >
    //                                                     <Text style={{
    //                                                         color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

    //                                                     }}>PLAYED</Text>
    //                                                     <Text style={{
    //                                                         color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
    //                                                         marginTop: 6,
    //                                                     }}>
    //                                                         35
    //                                                     </Text>
    //                                                 </View>
    //                                                 <View >
    //                                                     <Text style={{
    //                                                         color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

    //                                                     }}>WON</Text>
    //                                                     <Text style={{
    //                                                         color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
    //                                                         marginTop: 6,
    //                                                     }}>
    //                                                         {coachDash.teamDetailInfo.stats.wins}
    //                                                     </Text>
    //                                                 </View>
    //                                                 <View >
    //                                                     <Text style={{
    //                                                         color: Colors.fontColorGray, fontSize: 13, fontFamily: Fonts.Bold,

    //                                                     }}>LOST</Text>
    //                                                     <Text style={{
    //                                                         color: Colors.light, fontSize: 22, fontFamily: Fonts.Bold,
    //                                                         marginTop: 6,
    //                                                     }}>
    //                                                         {coachDash.teamDetailInfo.stats.loss}
    //                                                     </Text>
    //                                                 </View>
    //                                             </View>
    //                                         </View>
    //                                     </View>

    //                                 </View>
    //                             </View>
    //                         </View>
    //                         : null
    //                 } */}
    //             {coachDash.teamPlayersInfo !== null && coachDash.teamPlayersInfo !== undefined && coachDash.teamPlayersInfo?.length !== 0 ?
    //                 <View style={{ flex: 1, backgroundColor: Colors.base, marginLeft: 15, marginTop: wide * 0.25 }}>
    //                     {/* {coachDash.teamPlayersInfo !== null && coachDash.teamPlayersInfo !== undefined && coachDash.teamPlayersInfo?.length !== 0 ? */}
    //                     <>
    //                         <Text style={{
    //                             color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
    //                         }}>Recent Players</Text>

    //                         <View style={{ flexDirection: 'row', marginTop: wide * 0.03 }}>

    //                             <FlatList
    //                                 keyExtractor={(item, index) => index.toString()}
    //                                 style={{ overflow: 'visible', }}
    //                                 data={coachDash.teamPlayersInfo}
    //                                 renderItem={(item, index) => this._renderRecentPlayer(item, index)}
    //                                 horizontal
    //                                 showsHorizontalScrollIndicator={false}
    //                             />
    //                         </View>
    //                     </>
    //                     {/* // : null} */}
    //                     {/* {coachDash.opponents !== null && coachDash.opponents !== undefined && coachDash.opponents !== [] ?
    //                     <>
    //                         <View style={{ flexDirection: 'row', marginTop: wide * 0.08 }}>
    //                             <Text style={{
    //                                 color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
    //                             }}>Opponents</Text>
    //                             <View style={{ flex: 1 }} />
    //                             <Text style={{
    //                                 color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold, paddingRight: 15
    //                             }}>
    //                                 See All

    //                             </Text>
    //                         </View>
    //                         <View style={{ flexDirection: 'row', marginTop: wide * 0.04 }}>

    //                             <FlatList
    //                                 keyExtractor={(item, index) => index.toString()}
    //                                 style={{ overflow: 'visible' }}
    //                                 data={[1, 2, 3, 4, 5]}
    //                                 renderItem={(item, index) => this._renderPhotos(item, index)}
    //                                 horizontal
    //                                 showsHorizontalScrollIndicator={false}
    //                             />
    //                         </View>
    //                     </>
    //                     : null
    //                 } */}
    //                 </View>
    //                 : null}
    //             {/* <View style={{ marginTop: wide * 0.08, marginLeft: 15, }}>
    //                     <View style={{ flexDirection: 'row' }}>
    //                         {arrPlayers.length !== 0 ? <Text style={{
    //                             color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
    //                         }}>
    //                             My Players

    //                         </Text> : null}
    //                         <View style={{ flex: 1 }} />
    //                     </View>
    //                 </View> */}
    //             {/* </ScrollView> */}
    //         </View>
    //     }
    // />

    let android_Profile =
      // <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          // minHeight: isNotch ? Layout.height - 100 : Layout.height - 80,
          paddingBottom: 20,
          // backgroundColor: "green",
        }}
      >
        <View style={{ flex: 1, }}>
          <View style={{ marginHorizontal: 15, }} >


            <View style={{
              flexDirection: 'row',
              marginTop: wide * 0.06,
              // backgroundColor: 'red'

            }}>
              <View>
                <Text style={{
                  color: Colors.light, fontSize: 30,
                  lineHeight: 36, fontFamily: Fonts.Bold,
                }}>
                  {coachDash.firstName} {coachDash.lastName}
                </Text>

              </View>

              <View style={{ flex: 1 }} />

              <View style={{
                width: wide * 0.12,
                justifyContent: 'space-between', alignItems: 'center'
              }}>
                <TouchableOpacity
                  style={{
                    width: 30, height: 30,
                    // tintColor: Colors.light
                  }}
                  // onPress={() => { Navigation.navigate('MessageList') }} 
                  onPress={() => { Navigation.navigate('Calender') }}
                >
                  <Image style={{
                    width: 20, height: 20,
                    tintColor: Colors.light
                  }} source={require('../../Images/newCalenderIcon.png')} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }}>
                                <Image style={{
                                    width: 20, height: 20,
                                    tintColor: Colors.light, top: 18,
                                }} source={require('../../Images/edit.png')} />
                            </TouchableOpacity> */}
              </View>
            </View>
            <View style={{ flexDirection: 'row', }}>
              {coachDash.verified === true ? <Image style={{
                // position: 'absolute',
                // right: -6,
                width: 20, height: 20, //zIndex: 1
              }} source={require('../../Images/sort_tick_selected.png')} />
                : null
              }
              <Text style={{
                color: Colors.overlayWhite,
                fontSize: 14, lineHeight: 16,
                fontFamily: Fonts.Regular,
                marginTop: 5, fontStyle: 'italic', marginHorizontal: wide * 0.03
              }}>
                {coachDash.certificateName}
              </Text>
            </View>

            <View style={{
              width: wide * 0.32, height: wide * 0.32,
              borderRadius: wide * 0.32 / 2, borderWidth: 4,
              borderColor: Colors.borderColor,
              alignSelf: 'center', zIndex: 1,
              justifyContent: 'center', alignItems: 'center',
              backgroundColor: coachDash.profilePictureUrl === null ? '#272930' : null,
            }}>
              {coachDash.profilePictureUrl !== null ?
                <FastImage style={{
                  width: wide * 0.28, height: wide * 0.28,

                  borderRadius: wide * 0.28 / 2,
                  //  borderWidth: 4,
                  // borderColor: Colors.borderColor
                }}
                  resizeMode='contain'
                  source={{
                    uri: coachDash.profilePictureUrl,
                    priority: FastImage.priority.high,
                  }}
                />
                : null
              }

              {/* <TouchableOpacity style={{
                            width: wide * 0.3, height: wide * 0.2,
                            bottom: 0, position: 'absolute', alignItems: 'center'
                        }}>
                            <Image style={{
                                width: '96%', height: '96%',
                            }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
                            <View style={{ marginTop: -wide * 0.06 }}>
                                <AirbnbRating
                                    ratingColor={Colors.stars}
                                    isDisabled={true}
                                    size={12}
                                    showRating={false}
                                    selectedColor={Colors.stars}

                                    defaultRating={coachDash.ratings}

                                />
                            </View>
                        </TouchableOpacity> */}

            </View>

            <View style={{
              marginTop: Platform.OS == 'ios' ? -wide * 0.15 : -wide * 0.15,
              // backgroundColor: "red",
              flex: 1, height: coachDash?.teamDetailInfo?.length > 0 ? wide * 0.55 : wide * 0.4,
              // bottom: 5
            }}>
              {/* <ImageBackground style={{
                            // position: 'absolute', 
                            // top: -wide * 0.07, left: 0, right: 0,
                            width: '100%',
                            height: coachDash?.teamDetailInfo?.length > 0 ? 230 : 180,
                        }}
                            resizeMode='stretch'
                            source={require('../../Images/Rectangle_Copy.png')}
                        > */}
              <Card style={{
                // flex: 1,
                marginBottom: 5,
                borderRadius: 25,
                // height: 100
              }}>
                <TouchableOpacity
                  onPress={() => { Navigation.navigate('EditProfile') }}

                  style={{
                    height: '15%',
                    width: '85%', marginHorizontal: wide * 0.045,
                    alignItems: 'flex-end',
                    // backgroundColor: 'red',
                    marginTop: 40,
                  }}
                >
                  <Image style={{
                    width: 25, height: 25,
                    tintColor: Colors.light, top:
                      Platform.OS == 'ios' ? -10 : -10
                  }} source={require('../../Images/edit.png')} />
                </TouchableOpacity>
                <View style={{
                  marginTop: -wide * 0.02,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // width: '90%',
                  marginHorizontal: wide * 0.045,
                  height: wide * 0.1,
                  // backgroundColor: 'green'

                }}>
                  <View>
                    <AirbnbRating
                      ratingColor={Colors.stars}
                      isDisabled={true}
                      size={12}
                      showRating={false}
                      selectedColor={Colors.stars}

                      defaultRating={coachDash.ratings}

                    />
                  </View>
                  {/* <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.Bold, fontSize: 20, lineHeight: 15,
                                        opacity: 0.4, width: wide * 0.025,

                                    }}>.</Text>
                                    <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 20,
                                        alignSelf: 'center', textAlign: 'center',
                                        opacity: 0.4
                                    }}>
                                        Exp - 7 years
                                        {coachDash.title}
                                    </Text>
                                    <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.Bold, fontSize: 20, lineHeight: 15,
                                        opacity: 0.4, width: wide * 0.025,
                                    }}>.</Text>
                                    <Text style={{
                                        color: Colors.light,
                                        fontFamily: Fonts.Regular, fontSize: 14, lineHeight: 20,
                                        alignSelf: 'center', textAlign: 'center',
                                        opacity: 0.4
                                    }}>
                                        500+ connects
                                        {coachDash.title}
                                    </Text> */}
                </View>
                {coachDash.aboutMe !== null ?
                  <View style={{
                    width: '90%', marginHorizontal: wide * 0.045,
                    marginBottom: coachDash.teamDetailInfo == null ? wide * 0.1 : 5,
                    marginTop: wide * 0.02

                  }}>
                    <Text style={{
                      color: Colors.light,
                      fontFamily: Fonts.Regular,
                      fontSize: 14, lineHeight: 14,
                      alignSelf: 'center',
                      textAlign: 'center', marginTop: wide * 0.01,
                      opacity: 0.4
                    }}>{coachDash.aboutMe}</Text>
                  </View>
                  : <></>
                }

                {coachDash.teamDetailInfo !== null ?
                  <View style={{
                    top: 15, width: '90%', left: 20,
                    justifyContent: 'center', alignItems: 'center', bottom: 20
                  }}>
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      data={coachDash?.teamDetailInfo}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ marginBottom: wide * 0.1 }}
                      renderItem={(item, index) =>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around', alignItems: "center",
                          // width: wide * 0.3,
                          marginHorizontal: 10,

                        }}>
                          <FastImage
                            style={{
                              height: wide * 0.1, width: wide * 0.1,
                              borderRadius: wide * 0.1 / 2,
                              borderWidth: 2,
                              borderColor: Colors.newGrayFontColor,
                            }}
                            source={{ uri: item.item.teamLogoUrl }}
                          />
                          <Text style={{
                            color: '#8B8D94',
                            fontFamily: Fonts.Bold, fontSize: 18,
                            lineHeight: 20,
                            marginHorizontal: 10

                          }}>
                            {item.item.teamName}
                          </Text>
                        </View>

                      }

                    />
                  </View>
                  : null
                }
              </Card>
              {/* </ImageBackground> */}
            </View>
          </View>
          {coachDash?.teamDetailInfo !== null && coachDash?.teamDetailInfo?.length > 0 ?
            <View style={{
              flexDirection: 'row', height: wide * 0.15,
              width: '90%', alignItems: 'center', marginHorizontal: wide * 0.06,
              marginTop: wide * 0.06,
              // backgroundColor: 'red'
            }}>
              <View style={{ justifyContent: 'space-evenly', width: '40%', }}>
                <Text style={{
                  color: Colors.light,
                  fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12
                }}>Team:</Text>

                <TouchableOpacity
                  style={{
                    marginTop: 10, flexDirection: 'row', height: '50%',
                    alignItems: 'center', width: '80%',
                  }}
                  activeOpacity={1}
                  onPress={() => this.setState({ showTeamModal: true })}
                >
                  <Text style={{
                    color: Colors.light,
                    fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16
                  }}>{teamDropDownSelectedVal}</Text>
                  <Image
                    style={{
                      width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.04
                    }} source={require('../../Images/dropDownIconNew.png')} />
                </TouchableOpacity>

                {/* <DropDown
                            dropData={coachDash.seasonList}
                            onSelectionChange={(val) =>
                                this.setState({ dropDownSelectedVal: val }, () => {
                                    this._filterPieChartData(coachDash.teamDetailInfo);
                                })
                            }
                        /> */}
              </View>
              {coachDash?.seasonList != null && coachDash?.seasonList.length > 0 ?
                <View style={{ justifyContent: 'space-evenly', width: '40%', marginHorizontal: wide * 0.1 }}>
                  <Text style={{
                    color: Colors.light,
                    fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12
                  }}>Session:</Text>

                  <TouchableOpacity
                    style={{
                      marginTop: 10, flexDirection: 'row', height: '50%',
                      alignItems: 'center', width: '80%',
                    }}
                    activeOpacity={1}
                    onPress={() => this.setState({ showSessionModal: true })}
                  >
                    <Text style={{
                      color: Colors.light,
                      fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16
                    }}>{dropDownSelectedVal}</Text>
                    <Image
                      style={{
                        width: wide * 0.035, height: wide * 0.025, marginHorizontal: wide * 0.04
                      }} source={require('../../Images/dropDownIconNew.png')} />
                  </TouchableOpacity>

                  {/* <DropDown
                            dropData={coachDash.seasonList}
                            onSelectionChange={(val) =>
                                this.setState({ dropDownSelectedVal: val }, () => {
                                    this._filterPieChartData(coachDash.teamDetailInfo);
                                })
                            }
                        /> */}
                </View>
                : <></>
              }
            </View>
            : null
          }
          {coachDash?.teamDetailInfo !== null && coachDash?.teamDetailInfo?.length > 0 ?
            <View style={{
              width: '90%', height: wide * 0.75,
              marginTop: wide * 0.05,
              marginHorizontal: wide * 0.05,
              // flexDirection: 'row', 
              justifyContent: "space-between",
              alignItems: 'center',
              // backgroundColor: 'green'


            }}>
              {pieChartData !== null && pieChartData.length > 0 ?
                <>
                  <>
                    {this.state.totalMatches !== null && this.state.totalMatches > 0 ?
                      <View style={{
                        position: 'absolute', top: 80,
                        alignItems: 'center', justifyContent: 'center', width: wide * 0.25, height: wide * 0.15,
                      }}>
                        <Text style={{
                          color: Colors.light,
                          fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24,

                        }}>{isStatNull ? 0 : this.state.totalMatches}</Text>
                        <Text style={{
                          color: Colors.light,
                          fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 14
                        }}>Total Games</Text>
                      </View>
                      : null
                    }
                    {pieChartData !== null && pieChartData !== undefined ?
                      <View style={{ height: '70%', bottom: 30 }}>
                        <VictoryChart
                          width={300}
                          height={280}
                        >
                          <VictoryPie
                            colorScale={["#246BFD", "#CE1141", "#FDB927",]}
                            standalone={false}
                            width={200} height={200}
                            innerRadius={60}
                            data={pieChartData}
                            style={{
                              labels: { display: "none" }
                            }}
                          />
                          <VictoryAxis style={{
                            axis: { stroke: "transparent" },
                            ticks: { stroke: "transparent" },
                            tickLabels: { fill: "transparent" }
                          }} />
                          <VictoryAxis dependentAxis style={{
                            axis: { stroke: "transparent" },
                            ticks: { stroke: "transparent" },
                            tickLabels: { fill: "transparent" }
                          }} />
                        </VictoryChart>

                      </View>
                      : null
                    }
                  </>
                  {/* <View style={{ justifyContent: 'space-around', marginRight: wide * 0.03, backgroundColor: 'red' }}> */}

                  <View style={{
                    justifyContent: 'flex-end',
                    width: '100%', height: '25%', flexDirection: 'row',
                    // bottom: 10
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      width: '55%',
                      justifyContent: 'space-around',
                      marginRight: wide * 0.06,
                      // alignItems: 'center'
                    }}>
                      <View style={{
                        height: '60%',
                        alignItems: "center", justifyContent: 'space-between'
                      }}>
                        <Text style={{
                          color: Colors.newGrayFontColor, fontSize: 12, lineHeight: 16,
                          fontFamily: Fonts.Bold,
                        }}>Streak</Text>

                        <Text style={{
                          color: Colors.light, fontSize: 16, lineHeight: 18,
                          fontFamily: Fonts.Bold,
                        }}>{winStreak != null ? winStreak : '_'}</Text>
                      </View>
                      <View style={{
                        height: '60%',
                        alignItems: "center", justifyContent: 'space-between'
                      }}>
                        <Text style={{
                          color: Colors.newGrayFontColor, fontSize: 12, lineHeight: 16,
                          fontFamily: Fonts.Bold,
                        }}>Last 10</Text>
                        <Text style={{
                          color: Colors.light, fontSize: 16, lineHeight: 18,
                          fontFamily: Fonts.Bold,
                        }}>{last_10 != null ? last_10 : '_'}</Text>
                      </View>
                    </View>

                    <View>
                      {pieChartData !== undefined && pieChartData.length > 0 ?
                        <>
                          <View style={{ width: '78%', flexDirection: 'row', alignItems: 'center', }}>
                            <>
                              <View style={{ width: 28, height: 2, backgroundColor: '#246BFD' }}></View>
                              <Text style={{
                                color: '#246BFD', fontSize: 16, lineHeight: 16,
                                fontFamily: Fonts.Bold, marginHorizontal: 10
                              }}>{isStatNull ? 0 : pieChartData[0]} Wins</Text>
                            </>

                          </View>
                          <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                            <>
                              <View style={{ width: 28, height: 2, backgroundColor: '#CE1141' }}></View>
                              <Text style={{
                                color: '#CE1141', fontSize: 16, lineHeight: 16,
                                fontFamily: Fonts.Bold, marginHorizontal: 10
                              }}>{isStatNull ? 0 : pieChartData[1]} Losses</Text>
                            </>

                          </View>
                          {pieChartData.length > 2 ?
                            <View style={{ width: '78%', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>

                              <>
                                <View style={{ width: 28, height: 2, backgroundColor: '#FDB927' }}></View>
                                <Text style={{
                                  color: '#FDB927', fontSize: 16, lineHeight: 16,
                                  fontFamily: Fonts.Bold, marginHorizontal: 10
                                }}>
                                  {isStatNull ? 0 : pieChartData[2]} Draw
                                </Text>
                              </>


                            </View>
                            : null
                          }
                        </>
                        : null
                      }
                    </View>



                  </View>
                </>
                :
                <EmptyPieChart />
              }



              {/* </View> */}


            </View>
            : null
          }
          {coachDash.recentGames !== null && coachDash?.recentGames?.length > 0 ?
            <>
              {/* <Title data={'Upcoming Games'} />&& coachDash?.recentGames?.length > 0 */}
              <View style={{
                backgroundColor: Colors.base, marginLeft: 15,
                marginTop: coachDash.teamDetailInfo !== null && coachDash?.teamDetailInfo?.length > 0 ? wide * 0.01 : wide * 0.06,
              }}>
                <View style={{ marginLeft: -15, marginTop: 25 }}>
                  <Title data={'Upcoming Games'} />

                </View>
                {/* <Text style={{
                            color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24,
                        }}>Upcoming Games</Text> */}

                <View style={{ flexDirection: 'row', }}>

                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    style={{ overflow: 'visible' }}
                    // data={upcomingGame}
                    data={coachDash.recentGames}
                    renderItem={(item, index) => this._renderListOfUpcomingMatches(item, index)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>


              </View>
            </>
            : null
          }



          {coachDash?.teamPlayersInfo !== null && coachDash?.teamPlayersInfo !== undefined && coachDash?.teamPlayersInfo?.length !== 0 ?
            <>
              <View style={{
                // backgroundColor: "green",
                // marginLeft: 15,
                marginTop: coachDash.recentGames !== null && coachDash.recentGames.length > 0 ? wide * 0.02 :
                  coachDash.teamDetailInfo !== null && coachDash.teamDetailInfo.length > 0 ? wide * 0.01 : wide * 0.025,

              }}>
                <View style={{ marginTop: 25 }}>
                  <Title data={'Recent Players'} />

                </View>

                {/* <View style={{
                                width: '100%', flexDirection: 'row',
                                justifyContent: 'space-between', alignItems: 'center',
                                marginTop: 30,
                            }}>
                                <View style={{
                                    backgroundColor: Colors.fontColorGray, width: '5%', height: '2%',
                                    borderBottomColor: Colors.fontColorGray,
                                }} />
                                <Text style={{
                                    color: Colors.titleLabelColor, fontSize: 16,
                                    lineHeight: 24, fontFamily: Fonts.Bold, width: '38%', marginLeft: 8,
                                }}>
                                    Recent Players
                                </Text>
                                <View style={{
                                    width: '65%', height: '2%', borderColor: Colors.fontColorGray,
                                    backgroundColor: Colors.fontColorGray, marginLeft: -20
                                }} />
                            </View> */}

                {/* <Text style={{
                            color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24
                        }}>Recent Players</Text> */}

                <View style={{ marginTop: wide * 0.01, width: '90%', alignSelf: 'center' }}>
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    style={{ overflow: 'visible', marginTop: 5 }}
                    data={coachDash.teamPlayersInfo}
                    renderItem={(item, index) => this._renderRecentPlayer(item, index)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                {/* // : null} */}

              </View>
            </>
            : null
          }

        </View>

      </ScrollView >
    // </View>




    return (
      coachDash.length === 0 ?
        <View style={{ flex: 1, backgroundColor: Colors.base }}>
          {/* <AppLoader visible={this.state.loading} /> */}
        </View>
        :
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>
          <SafeAreaView style={{
            flex: 1, marginTop: Platform.OS == 'android' ? 20 : 0,
            backgroundColor: Colors.base
          }}>
            <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>

              {SHOW_SHARE_SCREEN.show === true ?
                Navigation.navigate('ShareScreen', { shareData: sharedData, shareMimeType: sharedMimeType })
                :

                android_Profile
              }
            </KeyboardAvoidingView>
            {this.state.showSessionModal === true ?
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.showSessionModal}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showSessionModal: false })}
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
                  }}
                    blurAmount={10}
                    blurRadius={10}
                  />
                  <View style={{
                    width: '60%', height: wide * 0.5, backgroundColor: Colors.ractangelCardColor,
                    marginTop: 20, borderRadius: 20, alignItems: 'center',
                    position: 'absolute',

                  }}>
                    <View style={{
                      width: '100%', height: '15%', marginTop: 10,
                      alignItems: 'center', justifyContent: 'center',
                      // borderBottomColor: Colors.newGrayFontColor, 
                      // borderBottomWidth: 1
                    }}>
                      <Text style={{
                        color: Colors.light, fontFamily: Fonts.Bold,
                        fontSize: 14, lineHeight: 16
                      }}>Select</Text>
                    </View>


                    <View style={{ width: '60%', height: '80%', }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{ flex: 1 }}
                        // data={[{ session: '2020-21' }, { session: '2019-20' }]}
                        data={coachDash?.seasonList}
                        renderItem={(item, index) => this._renderSessionList(item, index)}
                      />
                    </View>


                  </View>

                  {/* </BlurView> */}
                </TouchableOpacity>
              </Modal>
              : null
            }

            {this.state.showTeamModal === true ?
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.showTeamModal}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showTeamModal: false })}
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
                      }}>Select</Text>
                    </View>


                    <View style={{ width: '60%', height: '80%' }}>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{ flex: 1 }}
                        // data={[{ teamName: 'La Lakers' }, { teamName: 'Golden Figma' }]}
                        data={this.state.teamDropDownData}
                        renderItem={(item, index) => this._renderTeamList(item, index)}
                      />
                    </View>


                  </View>

                  {/* </BlurView> */}
                </TouchableOpacity>
              </Modal>
              : null
            }

          </SafeAreaView >
        </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(CoachProfile);








