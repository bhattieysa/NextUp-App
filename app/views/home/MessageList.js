
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList } from 'react-native';
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

import { characterLimit, selectedUserType, UserModel, SenderRecevrModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { color } from 'react-native-reanimated';
import { AirbnbRating } from 'react-native-ratings';
import { getChatUserList } from '../../actions/chat';
import { getUserInfo } from '../../actions/home';
// import { messageList } from '../Messages/data';
import { getObject } from '../../middleware';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler'
import FastImage from 'react-native-fast-image';

let wide = Layout.width;
var pageNum = 1;

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
// var userId = null;
class MessageList extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedPlanIndex: 0,
      selectedIndex: 0,
      selectedCat_nm: 'Player',
      // starCount: 3.5,
      curr_userId: null,
      category: [{ id: 1, cat_nm: 'Player' }, { id: 2, cat_nm: 'Coach' }, { id: 3, cat_nm: 'Road to Pro' }, { id: 4, cat_nm: 'Others' }],
      srchTxt: '',

    };
  }
  componentDidMount() {
    pageNum = 1
    this.props.navigation.addListener('didFocus', this.getChatUserListHistory)
  }
  getChatUserListHistory = () => {
    console.log("Didmount Execute")
    debugger;
    getObject('UserId').then((obj) => {
      // userId = obj;
      this.setState({ loading: true }, () => {
        this.props.dispatch(getChatUserList(obj, pageNum, (res) => {
          // setTimeout(() => {
          if (res) {
            debugger;
            this.setState({
              loading: false,
              curr_userId: obj
            })
          }
          // }, 200);

        }))
      })
    })
  }

  // onStarRatingPress(rating) {
  //     this.setState({
  //         starCount: rating
  //     });
  // }
  _renderMessageUserCat = (item, index) => {
    return (
      <TouchableOpacity style={{
        height: wide * 0.15,
        // width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingRight: 25,
        // backgroundColor: 'green', 
        marginHorizontal: 5, marginRight: 5
      }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedIndex: item.index, selectedCat_nm: item.item.cat_nm })}
      >

        <View style={{
          flexDirection: 'row', height: '70%',
          alignItems: 'center',
          // backgroundColor: 'red',
          borderBottomColor: this.state.selectedIndex === item.index ? Colors.light : null,
          borderBottomWidth: this.state.selectedIndex === item.index ? 1 : null,
        }}>
          <Text style={{
            color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray,
            fontSize: 16, lineHeight: 18,
            fontFamily: Fonts.Bold,
            //  textAlign: 'center'
          }}>
            {item.item.cat_nm}
          </Text>
          {/* {
                        this.state.selectedIndex !== item.index ?
                            <View style={{
                                width: 8, height: 8, borderRadius: 4,
                                backgroundColor: Colors.btnBg,
                            }} />
                            : null
                    } */}

        </View>
        {/* <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View> */}

      </TouchableOpacity>
    );
  };

  setSenderRecieverInfo = (itmObj, cb) => {
    const { curr_userId } = this.state;
    debugger
    SenderRecevrModel.senderId = curr_userId;
    SenderRecevrModel.senderName = UserModel.fname + " " + UserModel.lname;
    SenderRecevrModel.senderProfilePic = UserModel.profileUrl;
    SenderRecevrModel.senderType = UserModel.selectedUserType.toUpperCase();

    if (curr_userId == itmObj.receiverId) {
      SenderRecevrModel.receiverId = itmObj?.senderId;
      SenderRecevrModel.receiverName = itmObj?.senderName;
      SenderRecevrModel.receiverProfilePic = itmObj?.senderProfilePictureUrl;
      SenderRecevrModel.receiverType = itmObj?.senderType;
      cb(true);
    } else {
      SenderRecevrModel.receiverId = itmObj?.receiverId;
      SenderRecevrModel.receiverName = itmObj?.receiverName;
      SenderRecevrModel.receiverProfilePic = itmObj?.receiverProfilePictureUrl;
      SenderRecevrModel.receiverType = itmObj?.receiverType;
      cb(true);
    }

    // debugger;
    // let recvrId = null;
    // getObject('UserId').then((obj) => {
    //     this.props.dispatch(getUserInfo(obj, (res, data) => {
    //         debugger
    //         if (res) {
    //             SenderRecevrModel.senderId = data.id;
    //             SenderRecevrModel.senderName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
    //             SenderRecevrModel.senderProfilePic = data.personalInfo.profilePictureURL;
    //             SenderRecevrModel.senderType = data.typeOfUser;

    //             // console.log("===>> 1", data);
    //         }
    //     }));
    //     debugger;
    //     if (obj === itmObj.receiverId) {
    //         recvrId = itmObj.senderId;
    //     } else {
    //         recvrId = itmObj.receiverId;
    //     }
    //     this.props.dispatch(getUserInfo(recvrId, (res, data) => {
    //         debugger;
    //         if (res) {
    //             SenderRecevrModel.receiverId = data.id;
    //             SenderRecevrModel.receiverName = data.personalInfo.firstName + " " + data.personalInfo.lastName;
    //             SenderRecevrModel.receiverProfilePic = data.personalInfo.profilePictureURL;
    //             SenderRecevrModel.receiverType = data.typeOfUser;

    //             // console.log("===>> 2", data);
    //             Navigation.navigate('Chat')
    //         }
    //     }))
    // })
  }

  _renderChatScreen = (item) => {
    // console.log("Itemmmm", item);
    // this.setSenderRecieverInfo(item);

    this.setSenderRecieverInfo(item, (res) => {
      if (res) {
        Navigation.navigate('Chat');
      }
    })
  }

  _renderList = (item, index) => {
    console.log("ListItmmm", item);
    // let userId = await getObject('UserId');
    // console.log("UserId: --- ", userId);
    let typ = "Sender"
    // debugger;
    if (this.state.curr_userId === item.senderId) {
      typ = 'Sender';
    } else {
      typ = "Receiver";
    }
    return (
      <TouchableOpacity
        style={{ marginTop: wide * 0.03, borderBottomWidth: 1, borderBottomColor: Colors.borderColor }}
        onPress={() => this._renderChatScreen(item)}
      >

        <View style={{ flexDirection: 'row', marginVertical: 15 }}>

          <View style={{
            width: wide * 0.15, height: wide * 0.15,
            borderRadius: wide * 0.15 / 2, borderWidth: 3,
            borderColor: Colors.newGrayFontColor,
            justifyContent: 'center', alignItems: 'center'
          }}>
            {typ === "Sender" ?
              <FastImage style={{ width: '97%', height: '97%', borderRadius: wide * 0.15 / 2, }}
                resizeMode={FastImage.resizeMode.cover}
                // source={item.user._avatar}
                source={{
                  uri: item.receiverProfilePictureUrl,
                  priority: FastImage.priority.normal,
                }}
              />
              :
              <FastImage style={{ width: '97%', height: '97%', borderRadius: wide * 0.15 / 2, }}
                resizeMode={FastImage.resizeMode.cover}
                // source={item.user._avatar}
                source={{
                  uri: item.senderProfilePictureUrl,
                  priority: FastImage.priority.normal,
                }}
              />
            }
          </View>

          <View style={{ paddingLeft: 15, justifyContent: 'center', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              {typ === "Sender" ?
                <Text style={{
                  color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
                  marginLeft: 5
                }}>{item.receiverName}</Text>
                :
                <Text style={{
                  color: Colors.light, fontSize: 16, fontFamily: Fonts.Bold,
                  marginLeft: 5
                }}>{item.senderName}</Text>
              }
              {/* Lorem Ipsum Name */}
              <View style={{ flex: 1 }} />
              <Text style={{
                color: Colors.light, fontSize: 12, fontFamily: Fonts.Regular,
                paddingHorizontal: 5
              }}>{formatAMPM(new Date(item.createdAt))}</Text>
            </View>
            {item.messageType == "IMAGE_TYPE" ?
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wide * 0.01 }}>
                {/* <View style={{
                                    width: wide * 0.07, height: wide * 0.07,
                                    marginTop: wide * 0.01
                                }}> */}
                <FastImage
                  style={{
                    width: wide * 0.05, height: wide * 0.05,
                    // borderRadius: wide * 0.06 / 2,
                  }}
                  source={require('../../Images/imageTypMsg.png')} />
                {/* </View> */}

                <Text style={{
                  color: Colors.light, fontSize: 14, fontFamily: Fonts.Regular,
                  marginLeft: 8, marginVertical: 6
                }}>
                  Image
                </Text>
              </View>
              : item.messageType == "VIDEO_TYPE" ?
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wide * 0.01 }}>
                  {/* <View style={{
                                        width: wide * 0.07, height: wide * 0.07,
                                    }}> */}
                  <FastImage
                    style={{
                      width: wide * 0.05, height: wide * 0.05,
                      // borderRadius: wide * 0.06 / 2,
                    }}
                    source={require('../../Images/videoTypMsg.png')}
                  />
                  {/* </View> */}
                  <Text style={{
                    color: Colors.light, fontSize: 14, fontFamily: Fonts.Regular,
                    marginLeft: 8, marginVertical: 6
                  }}>
                    Video
                  </Text>
                </View>
                : item.messageType == "BANNER_TYPE" ?
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wide * 0.01 }}>
                    {/* <View style={{
                                            width: wide * 0.07, height: wide * 0.07,
                                        }}> */}
                    <FastImage
                      style={{
                        width: wide * 0.05, height: wide * 0.05,
                        // borderRadius: wide * 0.06 / 2,
                      }}
                      source={require('../../Images/bannerTypMsg.png')} />
                    {/* </View> */}
                    <Text style={{
                      color: Colors.light, fontSize: 14, fontFamily: Fonts.Regular,
                      marginLeft: 8, marginVertical: 6
                    }}>
                      Banner
                    </Text>

                  </View>
                  :
                  <Text style={{
                    color: Colors.light, fontSize: 14, fontFamily: Fonts.Regular,
                    marginLeft: 5, marginVertical: 6
                  }}>
                    {item.message}
                    {/* Lorem Ipsum is simply dummy text of the… */}
                  </Text>
            }

          </View>
        </View>
      </TouchableOpacity>

    )
  }
  render() {
    const { selectedCat_nm } = this.state;
    const { chatUsersList } = this.props.ChatData;  // need to render in _renderList function in flatlist
    let player = null;
    let coach = null;
    let trainer = null;
    let others = null;
    let l = chatUsersList.length

    debugger;
    for (let i = 0; i < chatUsersList.length; i++) {   // need to change with chatUsersList
      const element = chatUsersList[i];
      if (element.userType === "PLAYER") {
        player = element.messagesList;
      } else if (element.userType === "COACH") {
        coach = element.messagesList;
      } else if (element.userType === "TRAINER") {
        trainer = element.messagesList;
      } else if (element.userType === "OTHER") {
        others = element.messagesList;
      }
    }
    console.log("Chat List", player);
    return (
      <KeyBoardDismissHandler>
        {/* {this.state.loading === true ?
                    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                        <AppLoader visible={this.state.loading} />
                    </SafeAreaView>
                    : */}
        <View style={{ flex: 1, backgroundColor: Colors.base, }}>

          <SafeAreaView style={{
            flex: 1,
            marginTop: Platform.OS == 'android' ? 30 : 0,
            backgroundColor: Colors.base
          }}>
            <AppLoader visible={this.state.loading} />
            {/* <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, flexDirection: 'row' }}> */}
            {/* <TouchableOpacity onPress={() => Navigation.back()}>
                                <Image style={{
                                    width: wide * 0.1, height: wide * 0.1,
                                    marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                                }} source={require('../../Images/back_ico.png')} />
                            </TouchableOpacity> */}
            {/* <View style={{ flex: 1 }} /> */}
            {/* <TouchableOpacity
                            >
                                <Image style={{
                                    width: wide * 0.09, height: wide * 0.09,
                                    marginTop: 18
                                }} source={require('../../Images/edit_ico_layer.png')} />
                            </TouchableOpacity> */}
            {/* </View> */}
            <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
              <View style={{}} >

                <View style={{
                  marginTop: wide * 0.03,
                  alignItems: 'center',
                  // marginHorizontal: 15,
                }}>

                  <TextInput style={{
                    borderWidth: 2,
                    borderColor: Colors.newGrayFontColor,
                    fontFamily: Fonts.Bold, height: 50,
                    width: '90%',
                    paddingLeft: 10, paddingRight: wide * 0.1,
                    borderRadius: 5, color: Colors.light, fontSize: 16
                  }}
                    value={this.state.srchTxt}
                    onChangeText={(e) => this.setState({ srchTxt: e })}
                    placeholder={"SEARCH"}
                    placeholderTextColor={Colors.borderColor}
                    returnKeyType='search'
                  />
                  {this.state.srchTxt === '' ?
                    <FastImage style={{
                      position: 'absolute',
                      width: 20, height: 20, right: wide * 0.1, top: wide * 0.044
                    }} source={require('../../Images/search_ico.png')} />
                    :
                    <TouchableOpacity style={{
                      position: 'absolute',
                      width: 20, height: 20, right: wide * 0.08, top: wide * 0.038
                    }}
                      activeOpacity={1}
                      onPress={() => this.setState({ srchTxt: '' })}
                    >
                      <Text style={{
                        fontSize: 16,
                        lineHeight: 24, fontFamily: Fonts.Bold,
                        color: Colors.light
                      }}>X</Text>
                    </TouchableOpacity>
                  }
                </View>


                <View style={{
                  marginTop: wide * 0.04,
                  alignItems: 'center'
                }}>
                  <FlatList
                    style={{
                      overflow: 'visible',
                      width: '90%',
                      // backgroundColor: 'green',
                    }}
                    contentContainerStyle={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    data={this.state.category}
                    renderItem={(item, index) => this._renderMessageUserCat(item, index)}
                    showsHorizontalScrollIndicator={false}
                    horizontal

                  />
                </View>
                <View style={{
                  marginTop: wide * 0.01,
                  // backgroundColor: 'red'
                }}>
                  <FlatList
                    style={{ marginHorizontal: 15, marginBottom: wide * 0.03 }}
                    // data={selectedCat_nm === 'Player' ? messageList.Palyer
                    //     : selectedCat_nm === 'Coach' ? messageList.Coach
                    //         : selectedCat_nm === 'Trainer' ? messageList.Trainer : messageList.Others
                    // }
                    data={selectedCat_nm === 'Player' ? player
                      : selectedCat_nm === 'Coach' ? coach
                        : selectedCat_nm === 'Trainer' ? trainer : others
                    }
                    renderItem={(item, index) => this._renderList(item.item, index)}
                    showsHorizontalScrollIndicator={false}

                  />
                </View>

              </View>

            </KeyboardAvoidingView>


          </SafeAreaView >
        </View>
        {/* } */}
      </KeyBoardDismissHandler>
    );
  }
}

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    ChatData: entities.chat
  };
}

export default connect(mapStateToProps)(MessageList);
// export default MessageList;
