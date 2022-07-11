// import React, { Component } from 'react';
// import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
// import {
//   Layout,
//   Colors,
//   Fonts,
// } from '../../constants';

// import Navigation from '../../lib/Navigation';

// import AppLoader from '../../utils/Apploader';


// import { connect } from 'react-redux';

// import { getObject } from '../../middleware';
// import { homePlayerFeed, getReels, getUserInfo } from '../../actions/home';
// import CommonVideoComponent from '../Messages/videoView/commonVideoComponent';
// import FastImage from 'react-native-fast-image'
// import { SenderRecevrModel } from '../../constants/constant'

// let wide = Layout.width;
// var pageNum = 1

// class Home extends Component {
//   static navigationOptions = { header: null };
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       arrReel: [],
//       isPlayVideo: false,
//       videoUrlToPlay: '',
//       isDataAllFetched: false,
//       randNum: 0,
//       playerId: props.navigation.state.params !== undefined ? props.navigation.state.params.playerId : null,
//       // senderId: null,
//       // senderName: null,
//       // senderProfilePic: null,
//       // receiverId: null,
//       // receiverName: null,
//       // receiverProfilePic: null,
//       // isSender: false,
//       // isReceiver: false,
//     };
//   }
//   componentDidMount() {
//     pageNum = 1
//     this.props.navigation.addListener('didFocus', this.onScreenFocus)
//   }
//   onScreenFocus = () => {
//     this.getVideos()
//     if (this.state.playerId != null) {
//       this.setState({ loading: true }, () => {
//         console.log("HomeFeed call");
//         this.props.dispatch(homePlayerFeed(this.state.playerId, (res) => {

//           setTimeout(() => {
//             this.setState({ loading: false })
//           }, 500)

//         }))
//       })
//     } else {
//       getObject('UserId').then((obj) => {
//         this.setState({ loading: true }, () => {
//           this.props.dispatch(homePlayerFeed(obj, (res) => {
//             this.setState({ loading: false })

//             // setTimeout(() => {

//             // }, 0)

//           }))
//         })
//       })
//     }
//   }
//   getVideos = () => {
//     // if (!this.state.isDataAllFetched) {
//     if (this.state.playerId != null) {
//       this.props.dispatch(getReels(this.state.playerId, pageNum, false, (res, resData) => {
//         console.log("Video call", resData);
//         // if (resData.length === 0) {
//         //   this.setState({ isDataAllFetched: true })
//         // }
//         if (this.state.arrReel.length > 0) {
//           debugger
//           this.setState({ loading: false, arrReel: [...this.state.arrReel, ...resData] })
//         } else {
//           debugger
//           this.setState({ loading: false, arrReel: resData })
//         }

//       }))
//     } else {
//       getObject('UserId').then((obj) => {
//         // this.setState({ loading: true }, () => {
//         this.props.dispatch(getReels(obj, pageNum, false, (res, resData) => {
//           console.log(resData);
//           // if (resData.length === 0) {
//           //   this.setState({ isDataAllFetched: true })
//           // }
//           if (this.state.arrReel.length > 0) {
//             debugger
//             this.setState({ loading: false, arrReel: [...this.state.arrReel, ...resData] })
//           } else {
//             debugger
//             this.setState({ loading: false, arrReel: resData })
//           }

//         }))
//       })
//     }
//     // })
//     //}
//   }
//   _renderPhotos = (item) => {
//     return (
//       <TouchableOpacity style={{
//         width: wide * 0.33, height: wide * 0.33,
//         justifyContent: 'center', alignItems: 'center',
//       }}
//         onPress={() => {
//           // if (item.item.videoUrl !== null) {
//           //   this.setState({ videoUrlToPlay: item.item.videoUrl, isPlayVideo: true })
//           // }
//           Navigation.navigate('PostView')
//         }}
//       >
//         <View style={{
//           // borderWidth: 1,
//           margin: 5,
//           flex: 1,
//           // borderColor: Colors.lightGray,
//           justifyContent: 'center', alignItems: 'center',
//           //  backgroundColor: Colors.btnBg,

//           shadowColor: Colors.lightGray,
//           shadowOffset: { width: 0, height: 0 },
//           shadowOpacity: 1.0, width: '90%',
//         }}>

//           <FastImage

//             style={{ width: '100%', height: '100%' }}
//             source={{ uri: item.item.thumbnailUrl }}

//             resizeMode={FastImage.resizeMode.cover}
//           />
//           {/* <Image
//             source={{ uri: item.item.thumbnailUrl }}
//             //resizeMode="stretch"
//             style={{ width: '100%', height: '100%' }}
//           ></Image> */}

//           {item.item.videoUrl !== null ?
//             <Image style={{ width: '30%', height: '30%', position: 'absolute', }}
//               resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
//             :
//             null
//           }
//         </View>
//         <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
//           <Image
//             source={require("../../Images/like_ico.png")}
//             // resizeMode="contain"
//             style={{ width: wide * 0.03, height: wide * 0.03 }}
//           ></Image>
//           <Text style={{
//             color: Colors.light, fontFamily: Fonts.Medium,
//             fontSize: 12, marginLeft: 5
//           }}>{item.item.numberOfLikes} Likes</Text>
//         </View>

//       </TouchableOpacity>
//     );
//   };
//   _renderHighlights = (item) => {
//     return (
//       <TouchableOpacity style={{
//         width: wide * 0.2, height: wide * 0.2, borderRadius: (wide * 0.2) / 2,
//         justifyContent: 'center', alignItems: 'center',
//       }}
//         onPress={() => this.setState({ videoUrlToPlay: item.item.videoUrl, isPlayVideo: true })}
//       >
//         <View style={{
//           // borderWidth: 1,
//           // margin: 5,
//           // borderColor: Colors.lightGray,
//           justifyContent: 'center', alignItems: 'center',
//           // backgroundColor: Colors.btnBg,

//           width: wide * 0.18, height: wide * 0.18, borderRadius: (wide * 0.18) / 2,
//         }}>

//           {
//             <Image
//               source={{ uri: item.item.thumbnailUrl }}
//               resizeMode="stretch"
//               style={{ width: wide * 0.16, height: wide * 0.16, borderRadius: (wide * 0.16) / 2, }}
//             ></Image>
//           }

//         </View>
//         <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, }}>{item.item.name}</Text>
//       </TouchableOpacity>
//     );
//   };
//   setSender = () => {
//     this.setReceiver();
//     getObject('UserId').then((obj) => {
//       this.props.dispatch(getUserInfo(obj, (res, data) => {
//         setTimeout(() => {
//           console.log("time out call")
//           if (res) {
//             console.log("Sender called")
//             // debugger
//             SenderRecevrModel.senderId = data.id;
//             SenderRecevrModel.senderName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
//             SenderRecevrModel.senderProfilePic = data.personalInfo.profilePictureURL;
//             SenderRecevrModel.senderType = data.typeOfUser;
//             console.log("Sender Set===>> 1", data);
//             Navigation.navigate('Chat');

//             // return res;
//           }
//         }, 1000);
//       }))
//     });
//   }

//   setReceiver = () => {
//     console.log("Receiver call");
//     this.props.dispatch(getUserInfo(this.state.playerId, (res, data) => {
//       if (res) {
//         SenderRecevrModel.receiverId = data.id;
//         SenderRecevrModel.receiverName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
//         SenderRecevrModel.receiverProfilePic = data.personalInfo.profilePictureURL;
//         SenderRecevrModel.receiverType = data.typeOfUser;
//         console.log("Receiver Set===>> 2");
//       }
//     }));
//   }
//   // setSenderRecevrModel = () => {
//   //   debugger;
//   //   if (this.state.isReceiver == true && this.state.isSender == true) {
//   //     Navigation.navigate('Chat')
//   //   }
//   //   // initiating the chat
//   // }

//   handleChatRender = () => {
//     debugger;
//     if (this.state.playerId === null || this.state.playerId === undefined) {
//       Navigation.navigate('MessageList');
//     } else {
//       this.setSender();
//     }
//   }
//   render() {

//     const { dashboardData } = this.props.Home
//     console.log("Home Dash:- ", dashboardData);
//     debugger;
//     return (
//       dashboardData.length === 0 ?
//         <View style={{ flex: 1, backgroundColor: Colors.base }}>
//           {this.state.playerId !== null ?
//             <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
//               <TouchableOpacity onPress={() => Navigation.back()}>
//                 <Image style={{
//                   width: wide * 0.1, height: wide * 0.1,
//                   marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1,
//                   borderColor: Colors.borderColor, marginHorizontal: 10
//                 }} source={require('../../Images/back_ico.png')} />
//               </TouchableOpacity>
//             </View>
//             :
//             null
//           }
//           {/* <AppLoader visible={this.state.loading} /> */}

//         </View>
//         :
//         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

//           {this.state.playerId !== null ?
//             <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
//               <TouchableOpacity onPress={() => Navigation.back()}>
//                 <Image style={{
//                   width: wide * 0.1, height: wide * 0.1,
//                   marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1,
//                   borderColor: Colors.borderColor, marginHorizontal: 10
//                 }} source={require('../../Images/back_ico.png')} />
//               </TouchableOpacity>
//             </View>
//             : null}
//           <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
//             {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
//             minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
//             paddingBottom: isNotch ? 30 : 40, marginHorizontal: 15
//           }}> */}


//             {/* <Text style={{
//                 color: Colors.light, fontFamily: Fonts.Bold, fontSize: 28, marginTop: wide * 0.05
//               }}>Photos</Text> */}



//             <FlatList
//               style={{ marginHorizontal: 15 }}
//               data={this.state.arrReel}
//               renderItem={(item, index) => this._renderPhotos(item, index)}
//               numColumns={3}
//               showsHorizontalScrollIndicator={false}
//               showsVerticalScrollIndicator={false}
//               initialNumToRender={20}
//               onEndReachedThreshold={0.1}
//               onEndReached={() => {
//                 pageNum = pageNum + 1
//                 this.getVideos()
//               }}
//               ListHeaderComponent={
//                 <>
//                   {
//                     dashboardData !== null ?
//                       <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >


//                         <View style={{ flexDirection: 'row', marginTop: wide * 0.08, alignItems: 'center' }}>
//                           <View>
//                             <Text style={{

//                               color: Colors.light, fontSize: 28,
//                               fontFamily: Fonts.Regular, lineHeight: 40
//                             }}>
//                               {dashboardData?.firstName}

//                             </Text>
//                             <Text style={{
//                               color: Colors.light, fontSize: 28, lineHeight: 36, fontFamily: Fonts.Bold
//                             }}>
//                               {dashboardData?.lastName}
//                             </Text>
//                           </View>

//                           <Image style={{
//                             marginLeft: wide * 0.07,
//                             width: 50, height: 50
//                           }} resizeMode={'contain'} source={{ uri: dashboardData?.teamLogoUrl }} />
//                         </View>
//                         <TouchableOpacity onPress={this.handleChatRender} style={{
//                           position: 'absolute', right: 0, top: wide * 0.1
//                         }}>
//                           <Image style={{
//                             width: 30, height: 30
//                           }} source={require('../../Images/chat_icon.png')} />
//                         </TouchableOpacity>
//                         <View style={{ alignSelf: 'center', zIndex: 1 }}>
//                           {
//                             dashboardData?.profilePictureUrl != null ?
//                               <FastImage
//                                 key={this.state.randNum}
//                                 style={{
//                                   width: wide * 0.3, height: wide * 0.42,
//                                   marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4, borderColor: Colors.borderColor
//                                 }}
//                                 source={{
//                                   uri: dashboardData.profilePictureUrl + '&width=200&height=200',
//                                   priority: FastImage.priority.high,
//                                 }}
//                                 // onLoadEnd={() => this.setState({ randNum: Math.random() })}
//                                 resizeMode={FastImage.resizeMode.cover}
//                               />
//                               // <Image
//                               //   key={dashboardData.profilePictureUrl}
//                               //   style={{
//                               //     width: wide * 0.3, height: wide * 0.45,
//                               //     marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4,
//                               //     borderColor: Colors.borderColor
//                               //   }} res izeMode={'cover'} source={{ uri: dashboardData.profilePictureUrl }} />
//                               :
//                               <Image style={{
//                                 width: wide * 0.3, height: wide * 0.45,
//                                 marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4, borderColor: Colors.borderColor
//                               }} resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />
//                           }
//                           <TouchableOpacity style={{
//                             width: wide * 0.3, height: wide * 0.2,
//                             bottom: 0, position: 'absolute', alignItems: 'center'
//                           }}>
//                             <Image style={{
//                               width: '96%', height: '96%',
//                             }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
//                             <Text
//                               style={{ position: 'absolute', bottom: 10, color: Colors.light, fontFamily: Fonts.Bold }} >
//                               {`#${dashboardData?.rank !== undefined ? dashboardData?.rank : ''} | ${dashboardData?.position !== undefined ? dashboardData?.position : ''}`}
//                             </Text>
//                           </TouchableOpacity>

//                         </View>

//                         <View style={{ marginTop: -wide * 0.11 }}>
//                           <Image style={{
//                             position: 'absolute', top: -wide * 0.1, left: 0, right: 0, width: '100%',
//                             borderTopLeftRadius: wide * 0.04, borderTopRightRadius: wide * 0.04
//                           }} resizeMode={'contain'} source={require('../../Images/Rectangle.png')} />
//                           {
//                             dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ?
//                               <View style={{
//                                 flexDirection: 'row', alignSelf: 'center', marginTop: wide * 0.15, alignItems: 'center',
//                               }}>
//                                 <View style={{
//                                   width: wide * 0.25, justifyContent: 'center', alignItems: 'center',
//                                   borderRightWidth: 0.3, borderRightColor: 'rgba(255,255,255,0.3)',
//                                 }}>
//                                   <Text style={{
//                                     color: Colors.fontColorGray,
//                                     fontFamily: Fonts.Bold, fontSize: 15,
//                                   }}>{Object.keys(dashboardData?.pgs)[0].toUpperCase()}</Text>
//                                   <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 20 }}>{Object.values(dashboardData?.pgs)[0]}</Text>
//                                 </View>
//                                 <View style={{
//                                   width: wide * 0.25, justifyContent: 'center', alignItems: 'center',
//                                   borderRightWidth: 0.3, borderRightColor: 'rgba(255,255,255,0.3)',
//                                 }}>
//                                   <Text style={{
//                                     color: Colors.fontColorGray,
//                                     fontFamily: Fonts.Bold, fontSize: 15,
//                                   }}>{Object.keys(dashboardData?.pgs)[1].toUpperCase()}</Text>
//                                   <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 20 }}>{Object.values(dashboardData?.pgs)[1]}</Text>
//                                 </View>
//                                 <View style={{
//                                   width: wide * 0.25, justifyContent: 'center', alignItems: 'center',
//                                 }}>
//                                   <Text style={{
//                                     color: Colors.fontColorGray, fontFamily: Fonts.Bold,
//                                     fontSize: 15,
//                                   }}>{Object.keys(dashboardData?.pgs)[2].toUpperCase()}</Text>
//                                   <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 20 }}>{Object.values(dashboardData?.pgs)[2]}</Text>
//                                 </View>
//                               </View>
//                               :
//                               null
//                           }
//                           <View style={{
//                             marginTop: wide * 0.02,
//                             borderTopWidth: dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ? 0.3 : null,
//                             borderTopColor: dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ? 'rgba(255,255,255,0.3)' : null
//                           }}>
//                             <Text style={{
//                               color: Colors.fontColorGray,
//                               fontFamily: Fonts.BoldItalic, fontSize: 16, lineHeight: 20,
//                               width: wide * 0.78, alignSelf: 'center', textAlign: 'center', marginTop: dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ? wide * 0.05 : wide * 0.15, opacity: 0.4
//                             }}>{dashboardData?.aboutMe}
//                             </Text>
//                           </View>
//                           <View style={{
//                             flexDirection: 'row', justifyContent: this.state.playerId !== null ? 'center' : 'space-between', alignItems: 'center',
//                             marginTop: wide * 0.05
//                           }}>
//                             <TouchableOpacity style={{
//                               backgroundColor: Colors.btnBg,
//                               width: wide * 0.35, height: wide * 0.11, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
//                             }}>
//                               <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Stats</Text>
//                             </TouchableOpacity>
//                             {this.state.playerId == null ?
//                               <TouchableOpacity style={{
//                                 width: wide * 0.35, height: wide * 0.11, borderRadius: 10, borderWidth: 3,
//                                 borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center'
//                               }} onPress={() => Navigation.navigate('EditProfile')}>
//                                 <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Edit</Text>
//                               </TouchableOpacity>
//                               : null}
//                           </View>

//                         </View>
//                       </View>
//                       : null}
//                   <View style={{ flex: 1, backgroundColor: Colors.base, marginLeft: 15, marginTop: wide * 0.05 }}>
//                     <Text style={{
//                       color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 26,
//                     }}>Highlights</Text>

//                     <View style={{ flexDirection: 'row', marginVertical: wide * 0.04 }}>
//                       <TouchableOpacity style={{
//                         width: wide * 0.18, height: wide * 0.18, borderRadius: (wide * 0.18) / 2,
//                         justifyContent: 'center', alignItems: 'center',
//                       }}
//                       // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
//                       >
//                         <View style={{
//                           // borderWidth: 1,
//                           margin: 5,

//                           // borderColor: Colors.lightGray,
//                           justifyContent: 'center', alignItems: 'center',
//                           backgroundColor: Colors.btnBg,
//                           borderRadius: (wide * 0.22) / 2,
//                           shadowColor: Colors.lightGray,
//                           shadowOffset: { width: 0, height: 0 },
//                           shadowOpacity: 1.0, width: wide * 0.18, height: wide * 0.18,
//                         }}>
//                           <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 40 }}>
//                             +
//                           </Text>
//                           {
//                             // <Image
//                             //   source={require("../../Images/avatar.png")}
//                             //   // resizeMode="contain"
//                             //   style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
//                             // ></Image>
//                           }

//                         </View>
//                         <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12 }}>Add New</Text>
//                       </TouchableOpacity>
//                       <View style={{ marginLeft: wide * 0.02, }}>
//                         <FlatList
//                           data={dashboardData?.userContentInfoList?.highlightVideos}
//                           renderItem={(item, index) => this._renderHighlights(item, index)}
//                           horizontal
//                           showsHorizontalScrollIndicator={false}
//                         />
//                       </View>
//                     </View>
//                     <View style={{ flexDirection: 'row', marginTop: wide * 0.05, alignItems: 'center' }}>
//                       {this.state.arrReel.length > 0 ? <Text style={{
//                         color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 26,
//                       }}>Posts</Text> : null}
//                       <View style={{ flex: 1 }} />
//                       {/* <Text onPress={() => Navigation.navigate('PostView')} style={{
//                       color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold, paddingRight: 15
//                     }}>
//                       See All

//                     </Text> */}
//                     </View>
//                   </View>
//                 </>
//               }
//             />



//             {/* </ScrollView> */}
//             <TouchableOpacity style={{
//               flex: 1,
//               justifyContent: 'center', alignItems: 'center',
//               backgroundColor: Colors.btnBg,
//               borderRadius: (wide * 0.18) / 2,
//               shadowColor: Colors.lightGray,
//               shadowOffset: { width: 0, height: 0 },
//               shadowOpacity: 1.0, width: wide * 0.18, height: wide * 0.18, position: 'absolute',
//               right: 10, bottom: wide * 0.05
//             }}>
//               <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 35 }}>
//                 +
//               </Text>
//               {/* <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 13, paddingBottom: 15 }}>
//               Add Post
//             </Text> */}
//               {
//                 // <Image
//                 //   source={require("../../Images/avatar.png")}
//                 //   // resizeMode="contain"
//                 //   style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
//                 // ></Image>
//               }

//             </TouchableOpacity>
//             {
//               this.state.isPlayVideo ?
//                 <CommonVideoComponent
//                   videoUrl={this.state.videoUrlToPlay}
//                   closeVideoView={() => this.setState({ isPlayVideo: false })}
//                 />
//                 :
//                 null
//             }
//             {/* <AppLoader visible={this.state.loading} /> */}
//           </KeyboardAvoidingView>

//         </SafeAreaView>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { entities } = state;
//   return {
//     authReducer: state.authReducer,
//     Home: entities.homePlayer
//   };
// }

// export default connect(mapStateToProps)(Home);

// New Player Screen

import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key,
  KeyboardAvoidingView, FlatList, Platform, ScrollView
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
  CommonStyles,

} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';


import { connect } from 'react-redux';

import { getObject } from '../../middleware';
import { homePlayerFeed, getReels, getUserInfo, getChallengeDtls } from '../../actions/home';
import CommonVideoComponent from '../Messages/videoView/commonVideoComponent';
import FastImage from 'react-native-fast-image'
import { SenderRecevrModel, UserModel, SHOW_SHARE_SCREEN } from '../../constants/constant'
// import { ScrollView } from 'react-native-gesture-handler';
import { isNotch } from '../../utils/deviceInfo';
import {
  VictoryTheme, VictoryLabel, VictoryContainer, VictoryPolarAxis, VictoryChart,
  VictoryGroup, VictoryArea, VictoryBar, VictoryAxis
} from 'victory-native';
import * as Progress from 'react-native-progress';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import { Card } from '../../components/common/DashBoardCard';
import { Title } from '../../components/common/titleLabel';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import NotifService from '../../utils/notificationService/service';
import ShareMenu from 'react-native-share-menu';
import { EmptyBarChart } from '../Coach/Components/EmptyPieChart';

let wide = Layout.width;
var pageNum = 1

const characterData = [
  { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
  { strength: 2, intelligence: 300, luck: 2, stealth: 80, charisma: 90 },
  { strength: 1, intelligence: 250, luck: 1, stealth: 40, charisma: 50 },
];
const barData = [
  { month: 1, value: 250 },
  { month: 2, value: 350 },
  { month: 3, value: 450 },
  { month: 4, value: 550 },
  { month: 5, value: 650 },
  { month: 6, value: 750 },
];

const pgs = {
  "2PT%": "10.5",
  "STL": "10.5",
  "PTS": "10.5"
}

class Home extends Component {
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
      arrReel: [],
      isPlayVideo: false,
      videoUrlToPlay: '',
      isDataAllFetched: false,
      randNum: 0,
      playerId: props.navigation.state.params !== undefined ? props.navigation.state.params.playerId : null,
      tabs: [{ id: 1, tab_nm: 'Stats' }, { id: 2, tab_nm: 'Challenges' }],
      selectedTab: "Stats",
      selectedTabIndex: 0,
      data: [],//this.processData(characterData),
      maxima: [],//this.getMaxima(characterData),
      radarChartData: [],
      bar1_Data: [],
      bar2_Data: [],
      showBar: false,
      isRadarLblShow: true,
      isBarLblShow: true,

      sharedData: '',
      sharedMimeType: '',
      sharedExtraData: null,

      // senderId: null,
      // senderName: null,
      // senderProfilePic: null,
      // receiverId: null,
      // receiverName: null,
      // receiverProfilePic: null,
      // isSender: false,
      // isReceiver: false,
    };
  }

  handleShare = (item) => {
    debugger
    if (item?.data == null || item?.data.length <= 0 || !item) {
      debugger
      return;
    } else {
      debugger
      const { mimeType, data, extraData } = item;
      this.setState({ sharedData: data, sharedMimeType: mimeType, sharedExtraData: extraData });
      SHOW_SHARE_SCREEN.show = true;
    }

  }

  componentDidMount() {
    pageNum = 1
    ShareMenu.getInitialShare(this.handleShare);
    const listener = ShareMenu.addNewShareListener(this.handleShare);
    this.props.navigation.addListener('didFocus', this.onScreenFocus)
    return () => {
      listener.remove();
    };
  }

  onRegister = (token) => {

  }

  onNotification(notif) {
    debugger
    console.log("notification_Player_home", notif);
    if (notif.userInteraction == true) {
      const notif_data = notif.data;
      // const notification_payload = JSON.parse(notif_data.notification_data);
      // console.log("notif_data", notification_payload, "  _type", typeof notification_payload);
      if (notif_data.notificationType == "team") {
        const notification_payload = JSON.parse(notif_data.notificationData);
        console.log("notif_data", notification_payload, "  _type", typeof notification_payload);
        this.props.navigation.navigate("MyStanding");
        // Navigation.navigate("MyTeam", { 'teamId': notification_payload?.teamId });
      } else if (notif_data.notificationType == "road_to_pro") {
        const notification_payload = null;
        if (notif_data.notificationData !== undefined) {
          notification_payload = JSON.parse(notif_data.notificationData);
        }
        this.props.navigation.navigate("Pro");
      } else if (notif_data.notificationType == "subscription") {
        const notification_payload = JSON.parse(notif_data.notificationData);
        this.handleNotificationChallenege(notification_payload);
      }
      else if (notif_data.notificationType == "new_message") {

        const notification_payload = JSON.parse(notif_data.notificationData);
        this.handleNotifChatRender(notification_payload);

        // SenderRecevrModel.senderId = notification_payload.senderId;
        // SenderRecevrModel.senderName = notification_payload.senderName;
        // SenderRecevrModel.senderProfilePic = notification_payload.senderProfilePicUrl;
        // // SenderRecevrModel.senderType = UserModel.selectedUserType.toUpperCase();

        // SenderRecevrModel.receiverId = notification_payload.receiverId;
        // SenderRecevrModel.receiverName = notification_payload.receiverName;
        // SenderRecevrModel.receiverProfilePic = notification_payload.receiverProfilePicUrl;
        // // SenderRecevrModel.receiverType = UserModel.selectedUserType.toUpperCase() == 'COACH' ? "PLAYER" : 'COACH';
        // Navigation.navigate("Chat");
      }
    }

  }

  handleNotifChatRender = (notif_data) => {
    getObject('UserId').then((obj) => {
      debugger
      if (obj == notif_data.senderId) {
        debugger
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
        debugger
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

  handleNotificationChallenege = (notif_data) => {
    console.log("Subscription_notif_player", notif_data);
    this.props.dispatch(getChallengeDtls(notif_data.subscriptionId, (res, data) => {
      if (res) {
        var challengeList = data?.subscriptionLevelInfoList[0]?.challengeList[0];
        let isUpload = true;
        if (challengeList.hasOwnProperty('previousResponses')) {
          challengeList.previousResponses.forEach(element => {
            if (element.accepted === null || element.accepted == true) {
              isUpload = false;
            }
          });
        }

        Navigation.navigate('UploadVideoOfChallenge',
          {
            challengeData: data?.subscriptionLevelInfoList[0]?.challengeList[0],
            isUpload: isUpload,
            planId: data?.id,
            roadToPro: data?.roadToPro,
            levelIndex: data?.currentLevelState,
            challengeIndex: data?.currentChallengeState
          }
        );
      }

    }))
  }

  onScreenFocus = () => {
    // this.getVideos() 

    if (this.state.playerId != null) {
      this.setState({ loading: true }, () => {
        console.log("HomeFeed call");
        this.props.dispatch(homePlayerFeed(this.state.playerId, (res) => {
          if (res) {
            // setTimeout(() => {
            this.setState({ loading: false }, () => {
              this.filterBarChartData();
            })
            // }, 500)
          }
        }))
      })
    } else {
      getObject('UserId').then((obj) => {
        this.setState({ loading: true }, () => {
          this.props.dispatch(homePlayerFeed(obj, (res) => {
            if (res) {
              this.setState({ loading: false }, () => {
                this.filterBarChartData();
              })
            }


            // setTimeout(() => {

            // }, 0)

          }))
        })
      })
    }

  }

  getVideos = () => {
    // if (!this.state.isDataAllFetched) {
    if (this.state.playerId != null) {
      this.props.dispatch(getReels(this.state.playerId, pageNum, false, (res, resData) => {
        console.log("Video call", resData);
        // if (resData.length === 0) {
        //   this.setState({ isDataAllFetched: true })
        // }
        if (this.state.arrReel.length > 0) {
          debugger
          this.setState({ loading: false, arrReel: [...this.state.arrReel, ...resData] })
        } else {
          debugger
          this.setState({ loading: false, arrReel: resData })
        }

      }))
    } else {
      getObject('UserId').then((obj) => {
        // this.setState({ loading: true }, () => {
        this.props.dispatch(getReels(obj, pageNum, false, (res, resData) => {
          console.log(resData);
          // if (resData.length === 0) {
          //   this.setState({ isDataAllFetched: true })
          // }
          if (this.state.arrReel.length > 0) {
            debugger
            this.setState({ loading: false, arrReel: [...this.state.arrReel, ...resData] })
          } else {
            debugger
            this.setState({ loading: false, arrReel: resData })
          }

        }))
      })
    }
    // })
    //}
  }

  filterBarChartData = () => {
    this.setState({ loading: true, bar1_Data: [], bar2_Data: [], showBar: false });
    const { dashboardData } = this.props.Home
    debugger
    var isBarShow = false;
    var isBarLbl = true;
    if (dashboardData !== null) {
      var bar1 = dashboardData.userBarGraphComparisonDto?.playerAverageKpi;
      var arr1 = [];
      if (bar1 !== null && bar1 !== undefined) {
        isBarShow = true;
        for (let key in bar1) {
          arr1.push({ x: key, y: parseFloat(bar1[key]) })
        }
      }
      console.log("----a-a-a", arr1);
      // this.setState({  });
      var bar2 = dashboardData.userBarGraphComparisonDto.userKpi;
      var arr2 = [];
      if (bar2 !== null && bar2 !== undefined) {
        isBarShow = true;
        for (let key in bar2) {
          arr2.push({ x: key, y: parseFloat(bar2[key]) })
        }
        if (arr1.length <= 0 || arr2.length <= 0) {
          isBarLbl = false
        }
      }
      // arr2.push({ x: "Lbl1", y: 8.8 })
      // arr2.push({ x: "Lbl2", y: 10.8 })
      // arr2.push({ x: "Lbl3", y: 12.8 })
      // arr2.push({ x: "Lbl4", y: 14.8 })
      // arr2.push({ x: "Lbl5", y: 18.8 })
      // arr2.push({ x: "Lbl6", y: 8.8 })
      // arr2.push({ x: "Lbl7", y: 10.8 })
      // arr2.push({ x: "Lbl8", y: 12.8 })
      // arr2.push({ x: "Lbl9", y: 14.8 })
      // arr2.push({ x: "Lb1", y: 18.8 })
      // arr2.push({ x: "Lb2", y: 18.8 })
      // arr2.push({ x: "Lb3", y: 18.8 })
      // arr2.push({ x: "Lb4", y: 18.8 })

      console.log("----a-a-a", arr2);
      this.setState({ bar2_Data: arr2, bar1_Data: arr1, showBar: isBarShow, isBarLblShow: isBarLbl }, () => {
        this.prepareRadarChartData(dashboardData);

      });
    }
    // this.setState({ loading: false });
  }

  prepareRadarChartData = (data) => {
    var usrRadarVal = data.userBarGraphComparisonDto?.userRadarValues;
    var avgRadarVal = data.userBarGraphComparisonDto?.averageRadarValue;
    var kpiLabel = data.userBarGraphComparisonDto?.radarKpi;
    var dataObj1;
    var dataObj2;
    var arr = [];
    if (usrRadarVal !== null && usrRadarVal !== undefined) {
      for (let i = 0; i < kpiLabel.length; i++) {
        var lbl = kpiLabel[i];
        dataObj1 = { ...dataObj1, [lbl]: avgRadarVal[i] }
        dataObj2 = { ...dataObj2, [lbl]: usrRadarVal[i] }
      }
      arr.push(dataObj1);
      arr.push(dataObj2);
      console.log("arrraaayyy", arr);
      this.setState({ radarChartData: arr, data: this.processData(arr), maxima: this.getMaxima(arr), loading: false, })
    } else {
      this.setState({ radarChartData: [], data: [], maxima: [], loading: false, })
    }

  }



  _renderPhotos = (item) => {
    return (
      <TouchableOpacity style={{
        width: wide * 0.33, height: wide * 0.33,
        justifyContent: 'center', alignItems: 'center',
      }}
        onPress={() => {
          // if (item.item.videoUrl !== null) {
          //   this.setState({ videoUrlToPlay: item.item.videoUrl, isPlayVideo: true })
          // }
          Navigation.navigate('PostView')
        }}
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

          <FastImage

            style={{ width: '100%', height: '100%' }}
            source={{ uri: item.item.thumbnailUrl }}

            resizeMode={FastImage.resizeMode.cover}
          />
          {/* <Image
            source={{ uri: item.item.thumbnailUrl }}
            //resizeMode="stretch"
            style={{ width: '100%', height: '100%' }}
          ></Image> */}

          {item.item.videoUrl !== null ?
            <Image style={{ width: '30%', height: '30%', position: 'absolute', }}
              resizeMode={'contain'} source={require('../../Images/play_ico_tint.png')} />
            :
            null
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
          <Image
            source={require("../../Images/like_ico.png")}
            // resizeMode="contain"
            style={{ width: wide * 0.03, height: wide * 0.03 }}
          ></Image>
          <Text style={{
            color: Colors.light, fontFamily: Fonts.Medium,
            fontSize: 12, marginLeft: 5
          }}>{item.item.numberOfLikes} Likes</Text>
        </View>

      </TouchableOpacity>
    );
  };
  _renderHighlights = (item) => {
    return (
      <TouchableOpacity style={{
        width: wide * 0.2, height: wide * 0.2, borderRadius: (wide * 0.2) / 2,
        justifyContent: 'center', alignItems: 'center',
      }}
        onPress={() => this.setState({ videoUrlToPlay: item.item.videoUrl, isPlayVideo: true })}
      >
        <View style={{
          // borderWidth: 1,
          // margin: 5,
          // borderColor: Colors.lightGray,
          justifyContent: 'center', alignItems: 'center',
          // backgroundColor: Colors.btnBg,

          width: wide * 0.18, height: wide * 0.18, borderRadius: (wide * 0.18) / 2,
        }}>

          {
            <Image
              source={{ uri: item.item.thumbnailUrl }}
              resizeMode="stretch"
              style={{ width: wide * 0.16, height: wide * 0.16, borderRadius: (wide * 0.16) / 2, }}
            ></Image>
          }

        </View>
        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, }}>{item.item.name}</Text>
      </TouchableOpacity>
    );
  };

  setSender = () => {
    this.setReceiver();
    getObject('UserId').then((obj) => {
      this.props.dispatch(getUserInfo(obj, (res, data) => {
        setTimeout(() => {
          console.log("time out call")
          if (res) {
            console.log("Sender called")
            // debugger
            SenderRecevrModel.senderId = data.id;
            SenderRecevrModel.senderName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
            SenderRecevrModel.senderProfilePic = data.personalInfo.profilePictureURL;
            SenderRecevrModel.senderType = data.typeOfUser;
            console.log("Sender Set===>> 1", data);
            Navigation.navigate('Chat');

            // return res;
          }
        }, 1000);
      }))
    });
  }

  setReceiver = () => {
    console.log("Receiver call");
    this.props.dispatch(getUserInfo(this.state.playerId, (res, data) => {
      if (res) {
        SenderRecevrModel.receiverId = data.id;
        SenderRecevrModel.receiverName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
        SenderRecevrModel.receiverProfilePic = data.personalInfo.profilePictureURL;
        SenderRecevrModel.receiverType = data.typeOfUser;
        console.log("Receiver Set===>> 2");
      }
    }));
  }
  // setSenderRecevrModel = () => {
  //   debugger;
  //   if (this.state.isReceiver == true && this.state.isSender == true) {
  //     Navigation.navigate('Chat')
  //   }
  //   // initiating the chat
  // }

  handleChatRender = () => {
    debugger;
    if (UserModel.selectedUserType.toUpperCase() === 'COACH') {
      this.setSender();
    }
  }

  _renderTabs = (item, index) => {
    return (

      <TouchableOpacity style={{
        height: wide * 0.12,
        width: wide * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        // marginHorizontal: 10
      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedTabIndex: item.index, selectedTab: item.item.tab_nm })}
      >

        <View style={{
          flexDirection: 'row', height: '70%', alignItems: 'center',
          borderBottomColor: Colors.light,
          borderBottomWidth: this.state.selectedTabIndex === item.index ? 2 : 0
        }}>
          <Text style={{
            color: this.state.selectedTabIndex === item.index ? Colors.light : Colors.fontColorGray,
            fontSize: 16, lineHeight: 24,
            fontFamily: Fonts.Bold, textAlign: 'center',

          }}>
            {item.item.tab_nm}
          </Text>

        </View>
        {/* <View style={{ height: 3, backgroundColor: this.state.selectedTabIndex === item.index ? Colors.light : 'transparent', width: wide * 0.06, marginTop: 5 }}></View> */}

      </TouchableOpacity>



      // <TouchableOpacity style={{
      //   height: wide * 0.15,
      //   justifyContent: 'center',
      //   alignItems: 'center', paddingRight: 25,
      // }}
      //   activeOpacity={1}
      //   onPress={() => this.setState({ selectedTabIndex: item.index, selectedTab: item.item.tab_nm })}
      // >

      //   <View style={{
      //     flexDirection: 'row', justifyContent: this.state.playerId !== null ? 'center' : 'space-between', alignItems: 'center',
      //     marginTop: wide * 0.05
      //   }}>
      //     <TouchableOpacity style={{
      //       // backgroundColor: Colors.btnBg,
      //       width: wide * 0.35, height: wide * 0.11, borderRadius: 10, justifyContent: 'center',
      //       alignItems: 'center',
      //     }}>
      //       <Text style={{
      //         color: Colors.light,
      //         fontSize: 18, lineHeight: 22,
      //         fontFamily: Fonts.SemiBold, width: wide * 0.16, textAlign: 'center'
      //       }}>
      //         Stats
      //       </Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity style={{
      //       width: wide * 0.35, height: wide * 0.11, borderRadius: 10,
      //       justifyContent: 'center', alignItems: 'center'
      //     }} onPress={() => Navigation.navigate('EditProfile')}>
      //       <Text style={{ color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 18, }}>Challenges</Text>
      //     </TouchableOpacity>
      //   </View>
      //   <View style={{ height: 3, backgroundColor: this.state.selectedTabIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>

      // </TouchableOpacity>
    );
  };

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

  handleChallengeNavigation = (data) => {
    if (UserModel.selectedUserType.toUpperCase() === 'PLAYER') {
      console.log("---", data);
      var data1 = data?.subscriptionLevelInfoList[0]?.challengeList[0];
      console.log("---", data1);
      let isUpload = true;
      console.log("PreviousRes:--", data1.previousResponses)
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
      // if (roadToProData.currentLevelState > this.state.selectedIndex) {
      //   Navigation.navigate('UploadVideoOfChallenge', { challengeData: data.item, isUpload: false })
      // } else if (item.index == roadToProData.currentChallengeState) {
      //   Navigation.navigate('UploadVideoOfChallenge', { challengeData: data.item, isUpload: true })
      // } else if (item.index < roadToProData.currentChallengeState) {
      //   Navigation.navigate('UploadVideoOfChallenge', { challengeData: data.item, isUpload: false })
      // }

    } else {
      Navigation.navigate('CoachChallengeAction', { entityId: data.item.id });

    }
  }



  renderChallenge = (item, index) => {
    // const { roadToProData } = this.props.Home
    console.log('iiiiii', item)
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.handleChallengeNavigation(item.item);
          //   if (roadToProData.currentLevelState > this.state.selectedIndex) {
          //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
          //   } else if (item.index == roadToProData.currentChallengeState) {
          //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: true })
          //   } else if (item.index < roadToProData.currentChallengeState) {
          //     Navigation.navigate('UploadVideoOfChallenge', { challengeData: item.item, isUpload: false })
          //   }
        }}
        style={[{
          marginTop: wide * 0.03,
          // height: wide * 0.23,
          justifyContent: 'center',
          // flex: 1
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
          position: 'absolute', top: 0, bottom: 0, left: 0,
          right: 0, width: '100%', height: '100%', borderBottomRightRadius: 25,
          borderBottomLeftRadius: 8

        }} resizeMode={'stretch'} source={require('../../Images/Rect_dummy.png')} />

        <View style={{ marginLeft: 15, flexDirection: 'row', marginVertical: 25 }}>

          <View style={{ flex: 1, justifyContent: 'center' }} >

            <Text style={{
              color: Colors.light, fontSize: 20, lineHeight: 22,
              fontFamily: Fonts.SemiBold, width: wide * 0.6
            }}>

              {item.item.subscriptionLevelInfoList[0].challengeList[0].name}
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
  }

  render() {

    const { dashboardData } = this.props.Home
    const { sharedData, sharedMimeType } = this.state;
    // if (this.state.playerId !== null) {
    //   dashboardData['playerId'] = this.state.playerId;


    // }
    console.log("Home Dash:- ", this.state.bar1_Data.length, "  ", this.state.bar2_Data.length);
    debugger

    let content = dashboardData.length === 0 ?
      <View style={{ flex: 1, backgroundColor: Colors.base }}>
        {this.state.playerId !== null ?
          <View style={[CommonStyles.headerBottomLine]}>
            <ScreenHeader
              title={'Player'}
              backButtonAction={() => Navigation.back()}
            />

          </View>
          :
          null
        }
        {/* <AppLoader visible={this.state.loading} /> */}

      </View>
      :
      <>
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}> */}

        {this.state.playerId !== null ?
          <View style={[CommonStyles.headerBottomLine]}>
            <ScreenHeader
              title={'Player'}
              backButtonAction={() => Navigation.back()}
            />

          </View>
          : null}
        <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
          <ScrollView showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              // marginTop: 20,
              // marginHorizontal: 15,
              // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10,
              // backgroundColor: 'red'
            }}>

            {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
      minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
      paddingBottom: isNotch ? 30 : 40, marginHorizontal: 15
    }}> */}


            {/* <Text style={{
          color: Colors.light, fontFamily: Fonts.Bold, fontSize: 28, marginTop: wide * 0.05
        }}>Photos</Text> */}



            {/* <FlatList
                      style={{ marginHorizontal: 15 }}
                      data={this.state.arrReel}
                      renderItem={(item, index) => this._renderPhotos(item, index)}
                      numColumns={3}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      initialNumToRender={20}
                      onEndReachedThreshold={0.1}
                      onEndReached={() => {
                          pageNum = pageNum + 1
                          this.getVideos()
                      }}
                      ListHeaderComponent={ */}

            <>
              {
                dashboardData !== null ?
                  <View style={{
                    // flex: 1,
                    // marginHorizontal: 15
                  }} >
                    <View style={{
                      flexDirection: 'row',
                      marginTop: wide * 0.02,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: 24,
                      // backgroundColor: 'red'
                    }}>
                      <View style={{ paddingHorizontal: wide * 0.01, }}>
                        <Text style={{
                          color: Colors.light, fontSize: 24,
                          fontFamily: Fonts.Bold, lineHeight: 40
                        }}>
                          {dashboardData?.firstName} {dashboardData?.lastName}

                        </Text>
                        {dashboardData?.teamLogoUrl !== null ?
                          <View style={{
                            height: 40, width: 40, borderRadius: 20,
                            borderWidth: 3, borderColor: Colors.newGrayFontColor,
                            alignItems: 'center', justifyContent: 'center'
                          }}>

                            <FastImage style={{
                              // marginLeft: wide * 0.06,
                              width: 36, height: 36,
                              borderRadius: 18
                            }}
                              // resizeMode={'contain'}
                              source={{ uri: dashboardData?.teamLogoUrl }}
                            // source={require('../../Images/newCalenderIcon.png')}
                            />
                          </View>
                          : null
                        }
                      </View>

                      {/* new calender edit logo */}

                      <View style={{
                        width: wide * 0.12,
                        height: wide * 0.16,

                        justifyContent: dashboardData?.teamLogoUrl == null ? 'center' : null,
                        alignItems: 'center',
                        // backgroundColor: 'red'
                      }}>
                        {this.state.playerId === null ?

                          <TouchableOpacity
                            // onPress={() => { Navigation.navigate("MyTeam", { 'teamId': 1239101010101 }) }}
                            onPress={() => { Navigation.navigate('Calender') }}
                          >
                            <Image style={{
                              width: 20, height: 20,
                              tintColor: Colors.light
                            }} source={require('../../Images/newCalenderIcon.png')} />
                          </TouchableOpacity>
                          : null
                        }
                        {UserModel.selectedUserType.toUpperCase() === 'COACH' ?
                          <TouchableOpacity onPress={this.handleChatRender} >
                            <Image style={{
                              width: 30, height: 30
                            }} source={require('../../Images/chat_icon.png')} />
                          </TouchableOpacity>
                          : <></>
                        }

                        {/* {this.state.playerId === null ?
                      <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }}>
                        <Image style={{
                          width: 25, height: 25,
                          tintColor: Colors.light
                        }} source={require('../../Images/edit.png')} />
                      </TouchableOpacity>
                      : null
                    } */}
                      </View>

                    </View>



                    <View style={{
                      width: wide * 0.32, height: wide * 0.32,
                      borderRadius: wide * 0.32 / 2,
                      borderWidth: 4,
                      borderColor: Colors.borderColor,
                      alignSelf: 'center',
                      zIndex: 1,
                      justifyContent: 'center', alignItems: 'center',
                      backgroundColor: dashboardData.profilePictureUrl === null ? '#272930' : null,
                    }}>
                      {
                        dashboardData?.profilePictureUrl != null ?
                          <FastImage
                            key={this.state.randNum}
                            style={{
                              width: wide * 0.28, height: wide * 0.28,

                              borderRadius: wide * 0.28 / 2,
                              // marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4, borderColor: Colors.borderColor
                            }}
                            source={{
                              uri: dashboardData?.profilePictureUrl,
                              priority: FastImage.priority.high,
                            }}
                            // onLoadEnd={() => this.setState({ randNum: Math.random() })}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                          // <Image
                          //   key={dashboardData.profilePictureUrl}
                          //   style={{
                          //     width: wide * 0.3, height: wide * 0.45,
                          //     marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4,
                          //     borderColor: Colors.borderColor
                          //   }} res izeMode={'cover'} source={{ uri: dashboardData.profilePictureUrl }} />
                          :
                          <></>
                        // <Image style={{
                        //   width: wide * 0.28, height: wide * 0.28,
                        //   borderRadius: wide * 0.28 / 2,
                        // }} resizeMode={'cover'} source={require('../../Images/placeHolderProf.png')} />
                      }
                      {/* <TouchableOpacity style={{
                    width: wide * 0.3, height: wide * 0.2,
                    bottom: 0, position: 'absolute', alignItems: 'center'
                  }}>
                    <Image style={{
                      width: '96%', height: '96%',
                    }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
                    <Text
                      style={{ position: 'absolute', bottom: 10, color: Colors.light, fontFamily: Fonts.Bold }} >
                      {`#${dashboardData?.rank !== undefined ? dashboardData?.rank : ''} | ${dashboardData?.position !== undefined ? dashboardData?.position : ''}`}
                    </Text>
                  </TouchableOpacity> */}

                    </View>

                    <View style={{ marginTop: -wide * 0.14, }}>
                      {/* <Image style={{
                    position: 'absolute', top: -wide * 0.1, left: 0, right: 0, width: '100%',
                    borderTopLeftRadius: wide * 0.04, borderTopRightRadius: wide * 0.04
                  }} resizeMode={'contain'} source={require('../../Images/Rectangle_Copy.png')} /> */}
                      <Card style={{
                        flex: 1, marginBottom: 10, borderRadius: 25,
                        marginHorizontal: 24,
                        height: dashboardData?.pgs !== null || dashboardData?.playerCategories !== null ? null : 100
                      }}>

                        {this.state.playerId === null ?
                          <TouchableOpacity onPress={() => { Navigation.navigate('EditProfile') }}
                            style={{
                              height: '15%',
                              width: '90%',
                              marginHorizontal: wide * 0.02,
                              alignItems: 'flex-end',
                              // backgroundColor: 'red',
                              marginTop: 25,
                            }}
                          >
                            <Image style={{
                              width: 25, height: 25,
                              tintColor: Colors.light
                            }} source={require('../../Images/edit.png')} />
                          </TouchableOpacity>
                          : null
                        }

                        {dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ?
                          // dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ?
                          <View style={{
                            flexDirection: 'row', alignSelf: 'center', alignItems: 'center',
                            marginTop: this.state.playerId !== null ? 70 : 25,
                            marginBottom: dashboardData?.playerCategories === null ? 20 : 0
                          }}>
                            <View style={{
                              width: wide * 0.25, height: 50,
                              justifyContent: 'space-between', alignItems: 'center',
                              borderRightWidth: 1, borderRightColor: Colors.newGrayFontColor,
                            }}>
                              <Text style={{
                                color: Colors.newGrayFontColor,
                                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                              }}>
                                {/* {Object.keys(pgs)[0].toUpperCase()} */}
                                {Object.keys(dashboardData?.pgs).length > 0 ? Object.keys(dashboardData?.pgs)[0].toUpperCase() : ""}
                              </Text>
                              <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24 }}>
                                {Object.values(dashboardData?.pgs).length > 0 ? Object.values(dashboardData?.pgs)[0] : ""}
                                {/* {Object.values(pgs)[0]} */}
                              </Text>
                            </View>
                            <View style={{
                              width: wide * 0.25, height: 50, justifyContent: 'space-between', alignItems: 'center',
                              borderRightWidth: 1, borderRightColor: Colors.newGrayFontColor,
                            }}>
                              <Text style={{
                                color: Colors.newGrayFontColor,
                                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                              }}>
                                {Object.values(dashboardData?.pgs).length > 1 ? Object.keys(dashboardData?.pgs)[1].toUpperCase() : ""}
                                {/* {Object.keys(pgs)[1].toUpperCase()} */}
                              </Text>
                              <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24 }}>
                                {Object.values(dashboardData?.pgs).length > 1 ? Object.values(dashboardData?.pgs)[1] : ""}
                                {/* {Object.values(pgs)[1]} */}
                              </Text>
                            </View>
                            <View style={{
                              width: wide * 0.25, height: 50, justifyContent: 'space-between', alignItems: 'center',
                            }}>
                              <Text style={{
                                color: Colors.newGrayFontColor,
                                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                              }}>
                                {Object.values(dashboardData?.pgs).length > 2 ? Object.keys(dashboardData?.pgs)[2].toUpperCase() : ""}
                                {/* {Object.keys(pgs)[2].toUpperCase()} */}
                              </Text>
                              <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 24, lineHeight: 24 }}>
                                {Object.values(dashboardData?.pgs).length > 2 ? Object.values(dashboardData?.pgs)[2] : ""}
                                {/* {Object.values(pgs)[2]} */}
                              </Text>
                            </View>
                          </View>
                          :
                          null
                        }
                        {dashboardData?.playerCategories !== null ?
                          <View style={{
                            marginTop: 20,
                            marginBottom: 15,
                            // borderTopWidth: dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ? 0.3 : null,
                            borderTopWidth: 0.3,
                            // borderTopColor: dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ? 'rgba(255,255,255,0.3)' : null
                            borderTopColor: Colors.newGrayFontColor,
                            // backgroundColor: 'red',
                            height: wide * 0.14,
                            // justifyContent: 'flex-end'
                          }}>
                            <Text style={{
                              color: Colors.light,
                              fontFamily: Fonts.Bold, fontSize: 16, lineHeight: 16,
                              width: wide * 0.78, alignSelf: 'center', textAlign: 'center',
                              // marginTop: dashboardData?.pgs !== undefined && dashboardData?.pgs !== null ? wide * 0.05 : 15,
                              marginTop: 20,
                              // opacity: 0.4,
                              // backgroundColor: 'red'
                            }}>
                              {/* {dashboardData?.aboutMe}playerCategories */}
                              {dashboardData?.playerCategories}
                            </Text>
                          </View>
                          : null
                        }
                      </Card>
                      <View style={{
                        flexDirection: 'row', justifyContent: this.state.playerId !== null ? 'center' : 'space-between', alignItems: 'center',
                        marginTop: wide * 0.04,
                        marginHorizontal: 40,
                        // backgroundColor: 'red'
                      }}>
                        <FlatList
                          // style={{ overflow: 'visible', }}
                          // contentContainerStyle={{ justifyContent: 'space-around', }}
                          data={this.state.tabs}
                          renderItem={(item, index) => this._renderTabs(item, index)}
                          showsHorizontalScrollIndicator={false}
                          horizontal
                        />
                      </View>
                      {this.state.selectedTab === 'Stats' ?
                        // this.state.radarChartData !== null && this.state.radarChartData.length == 0 && this.state.showBar == false ?
                        //   <>
                        //     <View style={{
                        //       width: '100%', height: 150,
                        //       justifyContent: 'center', alignItems: 'center',
                        //       // backgroundColor: 'green',
                        //       marginTop: wide * 0.2
                        //     }}>
                        //       <Text
                        //         style={{
                        //           color: Colors.fontColorGray,
                        //           fontSize: 20, lineHeight: 20,
                        //           fontFamily: Fonts.SemiBold, textAlign: 'center'
                        //         }}>Nothing to display...</Text>
                        //     </View>
                        //   </>
                        //   :

                        <>
                          {this.state.radarChartData !== null && this.state.radarChartData.length > 0 ?
                            <View style={{ marginTop: 30 }}>
                              <Title data={'Summary'} />

                            </View>
                            : null
                          }
                          {this.state.radarChartData !== null && this.state.radarChartData.length > 0 ?
                            <View style={{
                              marginTop: wide * 0.03,
                              // borderRadius: 20,
                              // backgroundColor: Colors.ractangelCardColor,
                              justifyContent: "center", alignItems: 'center',
                              // backgroundColor: 'green',
                              marginHorizontal: 24

                            }}>

                              {this.state.radarChartData !== null && this.state.radarChartData.length > 0 ?
                                <View style={{
                                  justifyContent: 'center',
                                  // backgroundColor: 'red',
                                  width: '95%',
                                  alignItems: 'center'

                                }}>
                                  <VictoryChart
                                    polar
                                    theme={VictoryTheme.material}
                                    domain={{ y: [0, 1] }}
                                    height={280}
                                    width={310}
                                    animate
                                  // containerComponent={<VictoryContainer responsive={false} />}

                                  >
                                    <VictoryGroup colorScale={[Colors.compareBar, Colors.light]}
                                      style={{ data: { fillOpacity: 0.1, strokeWidth: 2 } }}
                                    >
                                      {this.state.data.map((data, i) => {
                                        return <VictoryArea key={i} data={data} />;
                                      })}
                                    </VictoryGroup>
                                    {/* {
                        Object.keys(this.state.maxima).map((key, i) => {
                          return (
                            <VictoryPolarAxis
                              key={i} dependentAxis
                              style={{
                                axisLabel: { padding: 10 },
                                axis: { stroke: "none" },
                                grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
                              }}
                              tickLabelComponent={
                                <VictoryLabel labelPlacement="vertical" />
                              }
                              labelPlacement="perpendicular"
                              axisValue={i + 1}
                              label={key}
                              tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                              tickValues={[0.25, 0.5, 0.75]}
                            />
                          );
                        })
                      } */}
                                    {
                                      Object.keys(this.state.maxima).map((key, i) => {
                                        return (
                                          <VictoryPolarAxis
                                            key={i} dependentAxis
                                            labelPlacement="vertical"
                                            tickFormat={() => ""}
                                            style={{
                                              axisLabel: { fontSize: 15, fill: Colors.light, padding: 35 },
                                              axis: { stroke: "grey", opacity: 0.1, },
                                              grid: { stroke: "grey", opacity: 0.01 }
                                            }}
                                            // tickLabelComponent={
                                            //   <VictoryLabel labelPlacement="vertical"

                                            //   />
                                            // }
                                            axisValue={i + 1}
                                            label={key}
                                          />
                                        );

                                      })
                                    }

                                  </VictoryChart>
                                </View>
                                : null
                              }
                              <View style={{
                                width: wide * 0.3,
                                height: wide * 0.09,
                                marginTop: 20, flexDirection: 'row',
                                justifyContent: 'space-between',
                                // backgroundColor: "red",
                              }}>
                                <View style={{
                                  // marginTop: 10,
                                  // width: wide * 0.4,
                                  // top: 0, right: 8,
                                  justifyContent: 'space-around',
                                  alignItems: 'center'
                                }}>
                                  <View style={{ width: 35, backgroundColor: Colors.light, borderBottomWidth: 2, borderBottomColor: Colors.light }}></View>
                                  <View style={{ width: 35, backgroundColor: Colors.compareBar, borderBottomWidth: 2, borderBottomColor: Colors.compareBar }}></View>

                                </View>
                                <View style={{
                                  // marginTop: 30, 
                                  // width: wide * 0.3,
                                  // top: 0, right: 10,
                                  justifyContent: 'space-around',
                                  // alignItems: 'center'
                                }}>
                                  <Text style={{
                                    color: Colors.light, fontSize: 10, lineHeight: 12,
                                    fontFamily: Fonts.Bold,
                                  }}>Team Average</Text>

                                  <Text style={{
                                    color: Colors.compareBar, fontSize: 10,
                                    lineHeight: 12,
                                    fontFamily: Fonts.Bold,
                                  }}>Player Stats</Text>
                                </View>
                              </View>
                            </View>
                            : null
                          }
                          {this.state.bar1_Data.length > 0 || this.state.bar2_Data.length > 0 ?
                            <>
                              {this.state.showBar === true ?
                                <View style={{
                                  justifyContent: "center",
                                  alignItems: 'center',
                                  marginTop: 25,
                                  flex: 1
                                }}>
                                  {this.state.isBarLblShow ?
                                    <Title data={'Comparison'} />
                                    : <></>
                                  }


                                  <View style={{
                                    width: '90%',
                                    justifyContent: 'center',
                                    marginTop: wide * 0.03,
                                    alignItems: 'center',
                                    // backgroundColor: 'green',
                                  }}>
                                    {this.state.showBar === true ?
                                      <MyPlayerStats barData1={this.state.bar1_Data} barData2={this.state.bar2_Data} />
                                      : null
                                    }
                                  </View>

                                  {/* </View> */}

                                  <View style={{
                                    // backgroundColor: 'green',
                                    width: '80%',
                                    alignItems: 'center',
                                    marginHorizontal: 20,
                                    marginTop: 20,
                                    marginBottom: 10,
                                    // backgroundColor: 'red',


                                  }}>
                                    {this.state.isBarLblShow ?
                                      <View style={{
                                        marginTop: 10, flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'space-between', //backgroundColor: 'red',
                                        height: 18
                                      }}>
                                        <View style={{
                                          // marginTop: 10,
                                          //  width: wide * 0.4,
                                          flexDirection: 'row',

                                          justifyContent: 'space-between', alignItems: 'center'
                                        }}>
                                          <View style={{ width: 28, height: 6, backgroundColor: '#4F5155' }}></View>
                                          <Text style={{
                                            color: Colors.light, fontSize: 12, lineHeight: 12,
                                            fontFamily: Fonts.Bold, marginLeft: 12
                                          }}>Player Excluded</Text>
                                        </View>
                                        <View style={{
                                          // marginTop: 30,
                                          // width: wide * 0.4,
                                          flexDirection: 'row',
                                          justifyContent: 'space-around', alignItems: 'center', marginLeft: 20
                                        }}>
                                          <View style={{ width: 28, height: 6, backgroundColor: Colors.compareBar }}></View>
                                          <Text style={{
                                            color: Colors.compareBar, fontSize: 12, lineHeight: 12,
                                            fontFamily: Fonts.Bold, marginLeft: 12
                                          }}>Player Included</Text>
                                        </View>
                                      </View>
                                      : <></>
                                    }
                                    <View style={{ marginTop: 15, height: 12 }}>
                                      <Text style={{
                                        color: Colors.compareBar, fontSize: 14, lineHeight: 16,
                                        fontFamily: Fonts.Bold, //marginLeft: 12
                                      }}>
                                        {dashboardData?.userBarGraphComparisonDto?.comparisonRemark}
                                      </Text>

                                    </View>
                                    {this.state.playerId !== null ?
                                      <TouchableOpacity style={{
                                        backgroundColor: Colors.btnBg,
                                        width: 140, height: 30, borderRadius: 5,
                                        justifyContent: 'center', alignItems: 'center',
                                        marginTop: 18,
                                        marginBottom: wide * 0.04,
                                      }}
                                        onPress={() => Navigation.navigate('Compare', dashboardData)}
                                      >
                                        <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16, }}>Add to Compare</Text>
                                      </TouchableOpacity>
                                      : null}

                                  </View>


                                </View>
                                : null
                              }
                            </>
                            :
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                              <EmptyBarChart kpi={dashboardData?.userBarGraphComparisonDto?.kpi != null ? dashboardData?.userBarGraphComparisonDto?.kpi : []} />

                            </View>
                            // <Text style={{ color: 'white', alignItems: 'center', marginTop: 20, fontSize: 18 }}>This is statttt</Text>
                          }

                        </>
                        : null}
                      {this.state.selectedTab === 'Challenges' ?
                        <View style={{ flex: 1, alignItems: 'center', }}>

                          {dashboardData.subscriptionsList.length !== undefined && dashboardData.subscriptionsList.length !== 0 ?

                            <View style={{ marginTop: 20, width: wide * 0.9, }}>
                              <Progress.Bar
                                // progress={dashboardData.subscriptionsList[0].completedChallengePercentage / 100}
                                width={wide * 0.9}
                                borderColor={Colors.base}
                                unfilledColor={Colors.borderColor}
                                color={Colors.stars}
                                style={{ marginTop: wide * 0.02 }}
                              />
                              <View style={{}}>
                                {/* <Text style={{
                                  fontSize: 12, fontFamily: Fonts.BoldItalic,
                                  marginTop: wide * 0.02, color: Colors.light, lineHeight: 14
                                }}>1 / 3 Completed</Text> */}
                              </View>
                            </View>
                            : null
                          }

                          {dashboardData.subscriptionsList.length !== undefined && dashboardData.subscriptionsList.length !== 0 ?
                            <FlatList
                              bounces={false}
                              showsVerticalScrollIndicator={false}
                              style={{
                                width: '90%',
                                // height: wide * 0.8,
                                marginTop: 10,
                                marginBottom: wide * 0.04,
                                // maxHeight: wide * 0.8,
                              }}
                              // nestedScrollEnabled
                              data={dashboardData.subscriptionsList}
                              renderItem={(item, index) => this.renderChallenge(item, index)}
                            />

                            :
                            <></>
                            // <View style={{
                            //   width: '100%', height: wide * 0.36,
                            //   justifyContent: 'center', alignItems: 'center',
                            //   marginTop: wide * 0.2
                            // }}>
                            //   <Text
                            //     style={{
                            //       color: Colors.fontColorGray,
                            //       fontSize: 20, lineHeight: 20,
                            //       fontFamily: Fonts.SemiBold, textAlign: 'center'
                            //     }}>Nothing to display...</Text>
                            // </View>
                          }

                          {/* ListHeaderComponent={
                        //   dashboardData.subscriptionsList.length !== undefined ?
                        //     <View style={{ marginTop: 5 }}>

                        //       <View style={{ width: wide * 0.9, backgroundColor: 'green' }}>
                        //         <Progress.Bar
                        //           // progress={dashboardData.subscriptionsList[0].completedChallengePercentage / 100}
                        //           width={wide * 0.92}
                        //           borderColor={Colors.base}
                        //           unfilledColor={Colors.borderColor}
                        //           color={Colors.stars}
                        //           style={{ marginTop: wide * 0.02 }}
                        //         />
                        //         <View style={{}}>
                        //           <Text style={{
                        //             fontSize: 12, fontFamily: Fonts.BoldItalic,
                        //             marginTop: wide * 0.02, color: Colors.light, lineHeight: 14
                        //           }}>1 / 3 Completed</Text>
                        //         </View>
                        //       </View>
                        //     </View>
                        //     : null
                        // } */}

                          {
                            this.state.playerId !== null ?
                              <TouchableOpacity style={{
                                backgroundColor: Colors.btnBg,
                                width: 140, height: 30, borderRadius: 5,
                                justifyContent: 'center', alignItems: 'center',
                                marginTop: 30, marginBottom: 10,

                              }}
                                onPress={() => Navigation.navigate('CoachAssignTask', { playerId: [dashboardData.playerId] })}
                              >
                                <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 12, lineHeight: 12 }}>Assign Challenge</Text>
                              </TouchableOpacity>
                              : null
                          }

                        </View>
                        : null
                      }

                    </View>
                  </View>
                  : null}
              {/* <View style={{ flex: 1, backgroundColor: Colors.base, marginLeft: 15, marginTop: wide * 0.05 }}>
                                  <Text style={{
                                      color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 26,
                                  }}>Highlights</Text>

                                  <View style={{ flexDirection: 'row', marginVertical: wide * 0.04 }}>
                                      <TouchableOpacity style={{
                                          width: wide * 0.18, height: wide * 0.18, borderRadius: (wide * 0.18) / 2,
                                          justifyContent: 'center', alignItems: 'center',
                                      }} */}
              {/* // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })} */}
              {/* > */}
              {/* <View style={{
                                              // borderWidth: 1,
                                              margin: 5,

                                              // borderColor: Colors.lightGray,
                                              justifyContent: 'center', alignItems: 'center',
                                              backgroundColor: Colors.btnBg,
                                              borderRadius: (wide * 0.22) / 2,
                                              shadowColor: Colors.lightGray,
                                              shadowOffset: { width: 0, height: 0 },
                                              shadowOpacity: 1.0, width: wide * 0.18, height: wide * 0.18,
                                          }}> */}
              {/* <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 40 }}>
                                                  +
                                              </Text> */}
              {
                // <Image
                //   source={require("../../Images/avatar.png")}
                //   // resizeMode="contain"
                //   style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
                // ></Image>
              }

              {/* </View> */}
              {/* <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12 }}>Add New</Text> */}
              {/* </TouchableOpacity> */}
              {/* <View style={{ marginLeft: wide * 0.02, }}>
                                          <FlatList
                                              data={dashboardData?.userContentInfoList?.highlightVideos}
                                              renderItem={(item, index) => this._renderHighlights(item, index)}
                                              horizontal
                                              showsHorizontalScrollIndicator={false}
                                          />
                                      </View> */}
              {/* </View> */}
              {/* <View style={{ flexDirection: 'row', marginTop: wide * 0.05, alignItems: 'center' }}>
                                      {this.state.arrReel.length > 0 ? <Text style={{
                                          color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 26,
                                      }}>Posts</Text> : null}
                                      <View style={{ flex: 1 }} /> */}
              {/* <Text onPress={() => Navigation.navigate('PostView')} style={{
                color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold, paddingRight: 15
              }}>
                See All

              </Text> */}
              {/* </View> */}
              {/* </View> */}
            </>
            {/* } */}
            {/* /> */}



            {/* </ScrollView> */}
            {/* <TouchableOpacity style={{
        flex: 1,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: Colors.btnBg,
        borderRadius: (wide * 0.18) / 2,
        shadowColor: Colors.lightGray,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1.0, width: wide * 0.18, height: wide * 0.18, position: 'absolute',
        right: 10, bottom: wide * 0.05
      }}>
        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 35 }}>
          +
        </Text> */}
            {/* <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 13, paddingBottom: 15 }}>
        Add Post
      </Text> */}
            {
              // <Image
              //   source={require("../../Images/avatar.png")}
              //   // resizeMode="contain"
              //   style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
              // ></Image>
            }

            {/* </TouchableOpacity> */}
            {/* {
        this.state.isPlayVideo ?
          <CommonVideoComponent
            videoUrl={this.state.videoUrlToPlay}
            closeVideoView={() => this.setState({ isPlayVideo: false })}
          />
          :
          null
      } */}
            {/* <AppLoader visible={this.state.loading} /> */}

          </ScrollView>
        </KeyboardAvoidingView>

        {/* </SafeAreaView > */}
      </>


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
        {SHOW_SHARE_SCREEN.show === true ?
          Navigation.navigate('ShareScreen', { shareData: sharedData, shareMimeType: sharedMimeType })
          :
          content
        }
      </SafeAreaView >
    );
  }
}

export const MyPlayerStats = ({ barData1, barData2, }) => {
  console.log('---dttt', barData1, barData2)
  var heightToBe = barData1;
  var isBothArr = false;
  if (barData1.length <= 0) {
    heightToBe = barData2;
  }
  if (barData1.length > 0 && barData2.length > 0) {
    isBothArr = true;
  }
  return (
    <>
      <View style={{
        justifyContent: 'center', marginTop: -wide * 0.05,
        width: '90%', alignItems: 'center',
      }}>
        <VictoryChart
          width={340}
          height={isBothArr ? (heightToBe.length <= 2 ? 80
            : heightToBe.length <= 3 ? 140
              : heightToBe.length <= 5 ? 200
                : heightToBe.length <= 8 ? 350
                  : heightToBe.length <= 10 ? 400
                    : heightToBe.length <= 13 ? 480
                      : heightToBe.length <= 15 ? 550
                        : heightToBe.length <= 18 ? 650 : 750) :
            (heightToBe.length <= 2 ? 70
              : heightToBe.length <= 3 ? 100
                : heightToBe.length <= 5 ? 160
                  : heightToBe.length <= 8 ? 270
                    : heightToBe.length <= 10 ? 320
                      : heightToBe.length <= 13 ? 390
                        : heightToBe.length <= 15 ? 450
                          : heightToBe.length <= 18 ? 550 : 750)}
          // height={250}
          horizontal
          padding={{ left: 60, top: 30, right: 40, bottom: 10 }}
          domainPadding={{ x: 10, y: 20, }}


        >
          <VictoryGroup offset={15} colorScale={'qualitative'}>
            {/* {barData2 !== null && selectedKpiLength > 1 ? */}
            {barData2.length > 0 ?
              <VictoryBar
                // data={[
                //     { x: 1, y: 200 },
                //     { x: 2, y: 150 },
                //     { x: 3, y: 320 },
                //     { x: 4, y: 150 },

                // ]}
                data={barData2}
                labels={({ datum }) => `${datum.y.toString()}`}
                // animate={{
                //   duration: 2000,
                //   onLoad: { duration: 1000 },
                // }}
                // x="name"
                // y="value"
                // cornerRadius={6}
                style={{
                  data: {
                    // fill: '#4F5155',
                    fill: '#D8A433',
                  },
                  labels: {
                    fill: '#D8A433',
                    fontSize: 16
                  }

                }}

                barWidth={12}

              // labelComponent={<VictoryLabel dx={10}
              //     style={{ fill: 'red', padding: 20 }} />
              // }
              />
              : null
            }
            {barData1.length > 0 ?
              <VictoryBar

                data={barData1}
                // animate={{
                //   duration: 2000,
                //   onLoad: { duration: 1000 },
                // }}
                labels={({ datum }) => `${datum.y.toString()}`}
                // x="name"
                // y="value"
                // cornerRadius={6}
                style={{
                  data: {
                    // fill: '#D8A433',
                    fill: '#4F5155',
                    // marginRight: 40
                  },
                  labels: {
                    fill: '#D8A433',
                    fontSize: 16
                  }

                }}
                barWidth={12}
              // labelComponent={<VictoryLabel dx={10}
              //     style={{ fill: 'red', padding: 20 }} />
              // }
              />
              : null
            }

            {/* : null} */}

            {/* <VictoryAxis
                          style={{
                              tickLabels: { fill: Colors.light, },
                          }}
                      /> */}
            {/* <VictoryAxis
                                dependentAxis={true}
                                tickValues={['₹0K', '₹10K', '₹20K', '₹30K']}
                                style={{
                                  tickLabels: { fill: 'white' },
                                  ticks: { stroke: 'black' },
                                }}
                              /> */}
          </VictoryGroup>
          <VictoryAxis
            // fixLabelOverlap={true}
            // width={100}
            offsetX={50}
            style={{
              tickLabels: {
                fill: Colors.light, fontSize: 14,
                // padding: 30
              },
              axis: { stroke: Colors.base, }
            }}

          />
        </VictoryChart>
      </View>
    </>

  )

}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(Home);








