import React, { Component } from 'react'
import { FlatList, SafeAreaView, Text, View, Image, Alert, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard } from 'react-native'
import MessgeData, { userId } from '../data'
import Input from '../inputView'
import MessageItem from '../messageItem'
import ImagePicker from 'react-native-image-crop-picker';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import Navigation from '../../../lib/Navigation';
import { getObject, getUserAuth, getUserToken } from '../../../middleware';
import {
    createChatChannel, sendMessage, getInitialMsgForChannel, uploadImage,
    uploadChatVideo, teamInvitationAction
} from '../../../actions/chat';
import {
    Layout,
    Colors,
    Fonts,
} from '../../../constants';
// import WS from 'react-native-websocket';
import { connect } from 'react-redux';
// import { uploadPhoto } from '../../../actions/auth';
import { SenderRecevrModel } from '../../../constants/constant'
// import EventSource from 'react-native-sse';
import RNEventSource from 'react-native-event-source';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import SockJsClient from 'react-stomp';

import { getChallengeDtls } from '../../../actions/home';
import FastImage from 'react-native-fast-image'
import AppLoader from '../../../utils/Apploader'
import { Permission, PERMISSION_TYPE } from '../../../utils/permissionCheck';
import { showAppPermissionAlert } from '../../../utils/info';

const renderMessages = ({ item, index }) => <MessageItem
    data={item}
    userId={userId}
    onPrimaryAction={() => alert("primary")}
    onSecondaryAction={() => alert("secondary")}
/>
let width = Dimensions.get('window').width

// var chanelObj = {
//     firstUser: "Amit",
//     secondUser: "Payal"
// }
// var chanelObj = {
//     senderName: SenderRecevrModel.senderName,
//     senderId: SenderRecevrModel.senderId,
//     receiverId: SenderRecevrModel.receiverId,
//     receiverName: SenderRecevrModel.receiverName,
// }
// var ws;
var eventSource;
var pageNum = 0;
var numberOfStream = 1;
var isEventSource = false;
var stompClient = null;
var scjs = null;
var authTkn = '';

// var current = null;
class MessageLists extends Component {
    constructor(props) {
        console.log("Navvvvvv", props)
        super(props);
        this.state = {
            loading: false,
            dataSet: [],
            txtMsg: '',
            channelId: null,
            current_user: null,
            eventSource: null,
            msg_type: '',

            image_video_url: null,
            image_video_thumbnail: null,
            muxId: null,
            authToken: '',
            isInitialCall: true,
            msgCount: 0,


            // senderId: null,
            // // senderName: null,
            // // senderProfilePic: null,
            // // receiverId: null,
            // // receiverName: null,
            // // receiverProfilePic: null,
        };

        // this.handleEventSource();

    }
    // LOAD THE MESSAGES FOR INITIAL TIME
    componentDidMount() {
        pageNum = 0;
        numberOfStream = 1;

        this.props.navigation.addListener('didFocus', this.handleEventSource)
        // this.handleEventSource()
        // this._connect();
    }

    // For websocket
    _connect = () => {
        console.log("On Connection start");
        scjs = new SockJS("http://34.105.82.134:8085/ws");
        scjs.send()
        stompClient = Stomp.over(scjs);
        stompClient.connect({}, this._onConnected, this._onError);


        // const ws = new WebSocket("http://34.105.82.134:8085/ws/user/" + this.state.channelId);

        // ws.onopen = () => {
        //     // connection opened
        //     console.log("Connection open")
        //     ws.send('something'); // send a message
        // };

        // ws.onmessage = (e) => {
        //     // a message was received
        //     console.log(e.data);
        // };

        // ws.onerror = (e) => {
        //     // an error occurred
        //     console.log(e.message);
        // };
    };

    _onConnected = () => {
        console.log("Socket Connected");
        // console.log(currentUser);
        stompClient.subscribe(
            "/user/" + this.state.channelId + "/queue/messages",
            this._onMessageReceived
        );
    };

    _onError = (err) => {
        console.log("On Error: ", err);
        // console.log(err);
    };

    _onMessageReceived = (msg) => {
        console.log("On Message Start");
        const notification = JSON.parse(msg.body);
        console("Got a new message:- ", notification);
        // const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
        //     .chatActiveContact;

        // if (active.id === notification.senderId) {
        //     findChatMessage(notification.id).then((message) => {
        //         const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
        //             .chatMessages;
        //         newMessages.push(message);
        //         setMessages(newMessages);
        //     });
        // } else {
        //     message.info("Received a new message from " + notification.senderName);
        // }
        // loadContacts();
    };

    _sendMessage = (msg) => {
        debugger;
        console.log("Message Sent start: ", msg);
        if (msg !== null && msg !== undefined) {
            const message = {
                // senderId: currentUser.id,
                // recipientId: activeContact.id,
                // senderName: currentUser.name,
                // recipientName: activeContact.name,
                // content: msg,
                timestamp: new Date(),
            };
            debugger

            // var res = stompClient.send("/app/chat", {}, JSON.stringify(msg));
            this.clientRef.sendMessage("/app/chat",
                // { "Authorization": `${'Bearer ' + this.state.authToken}` },
                JSON.stringify(msg)
            );


            console.log("Message sent successfully");
            // const newMessages = [...messages];
            // newMessages.push(message); 163542615574706
            // setMessages(newMessages);

        }
    };

    // componentWillUnmount() {
    //     this.state.eventSource.close()
    // }

    handleEventSource = () => {
        debugger
        getObject('UserId').then((obj) => {
            console.log("Chat Render")
            this.setState({ loading: true }, () => {
                if (this.state.channelId === null) {
                    this.props.dispatch(createChatChannel(
                        {
                            senderName: SenderRecevrModel.senderName,
                            senderId: SenderRecevrModel.senderId,
                            receiverId: SenderRecevrModel.receiverId,
                            receiverName: SenderRecevrModel.receiverName,
                        },
                        (res, data) => {
                            if (res) {
                                // getUserToken().then((auth) => {
                                // if (auth) {
                                // authTkn = auth;
                                // console.log("AUthhhh", auth);
                                this.setState({
                                    channelId: data.data,
                                    // authToken: auth,
                                    // loading: false,
                                }, () => {

                                    this.setInitialMessage();
                                })
                                // }
                                // });

                                // this.setState({
                                //     channelId: data.data,
                                //     // loading: false,
                                // })
                            }
                            // setTimeout(() => {
                            //     console.log('---->> data', data);
                            //     debugger;
                            // if (data.data !== null) {
                            // this.setState({
                            //     channelId: data.data,
                            //     loading: false,
                            // })
                            // this.setInitialMessage();
                            // debugger;

                            // this.setEventSource();

                            // }


                            // }, 500);

                        }))
                } else {
                    this.setInitialMessage();
                }
            })
        })



    }
    // "163342762746901"
    setInitialMessage = () => {
        console.log("Initial Msg Start", this.state.channelId)
        const { msgCount, isInitialCall } = this.state;
        var tempCount = msgCount;
        if (isInitialCall == true) {
            if (this.state.channelId !== null) {
                debugger;
                this.props.dispatch(getInitialMsgForChannel(this.state.channelId, pageNum, (res, data) => {
                    // setTimeout(() => {
                    debugger
                    if (res) {
                        if (this.state.dataSet.length > 0) {
                            this.setState({ loading: false, dataSet: [...this.state.dataSet, ...data] })
                        } else {
                            this.setState({ loading: false, dataSet: data })
                        }
                        if (this.state.dataSet.length == tempCount) {
                            this.setState({ isInitialCall: false });
                        }
                        // console.log("Initail Data Set---> ", this.state.dataSet);

                        //for websocket
                        // this._connect()

                        // for event source
                        // if (data.length > 0) {
                        //     debugger
                        //     this.setEventSourceWithTime(data[data.length - 1].createdAt, data[data.length - 1].id);
                        // } else {
                        //     this.setEventSource();
                        // }

                    }
                    // }, );

                }))
            }
        }
    }

    setEventSourceWithTime = (last_msg_time, msgId) => {
        debugger
        console.log("With Time Excute", last_msg_time, "  -- ", msgId);
        let eventUrl = "http://34.105.82.134:8085/v1/message/chats/stream/" + this.state.channelId + "/" + (last_msg_time - 10);
        console.log("---url-- ", eventUrl);
        this.state.eventSource = new RNEventSource(eventUrl);
        console.log('Event Execute')
        // eventSource.removeAllEventListeners();
        // Connection open
        this.state.eventSource.addEventListener("open", (event) => {
            console.log("Open SSE connection.");
        });
        // on message
        // eventSource.open();
        this.state.eventSource.addEventListener("message", (event) => {
            console.log("New message event:", numberOfStream);
            if (JSON.parse(event.data).id === msgId || numberOfStream === 1) {
                numberOfStream = numberOfStream + 1;
            } else {
                this.handleMessageStream(event.data);
            }
        });

        // on error
        this.state.eventSource.addEventListener("error", (event) => {
            if (event.type === "error") {
                console.error("Connection error:", event);
            } else if (event.type === "exception") {
                console.error("Error:", event.message, event.error);
            }
        });
        //on close
        this.state.eventSource.addEventListener("close", (event) => {
            console.log("Close SSE connection.");
        });

    }

    setEventSource = () => {
        console.log("Without Time Excute");
        let eventUrl = "http://34.105.82.134:8085/v1/message/chats/stream/message/" + this.state.channelId;
        this.state.eventSource = new RNEventSource(eventUrl);
        console.log('Event Execute')
        // eventSource.removeAllEventListeners();
        // if (!isEventSource) {
        // Connection open
        // isEventSource = true;
        this.state.eventSource.addEventListener("open", (event) => {
            console.log("Open SSE connection.");
        });
        // on message
        this.state.eventSource.addEventListener("message", (event) => {
            console.log("First Message Got :");
            this.handleMessageStream(event.data);
        });
        // on error
        this.state.eventSource.addEventListener("error", (event) => {
            if (event.type === "error") {
                console.error("Connection error:", event);
            } else if (event.type === "exception") {
                console.error("Error:", event.message, event.error);
            }
        });
        //on close
        this.state.eventSource.addEventListener("close", (event) => {
            console.log("Close SSE connection.");
        });
    }

    sentFirstTestMessage = () => {
        var msgObj = {
            senderId: SenderRecevrModel.senderId,
            senderName: SenderRecevrModel.senderName,
            senderProfilePictureUrl: SenderRecevrModel.senderProfilePic,
            senderType: SenderRecevrModel.senderType,

            receiverId: SenderRecevrModel.receiverId,
            receiverName: SenderRecevrModel.receiverName,
            receiverProfilePictureUrl: SenderRecevrModel.receiverProfilePic,
            receiverType: SenderRecevrModel.receiverType,

            messageType: "CONNECTION_TEST",
            message: "",
            createdAt: Date.now(),
            channelId: this.state.channelId,
        }

        this.props.dispatch(sendMessage(msgObj, (res) => {
            if (res) {
                // debugger;
                console.log("Connected Successfully...!");
            }
        }))
    }

    //Event source stream
    handleMessageStream = (obj) => {
        // const dataFromServer = JSON.parse(e);
        console.log('got reply! ', obj);
        const dataObj = JSON.parse(obj);
        debugger;
        if (dataObj !== null) {
            debugger
            if (dataObj.senderId === SenderRecevrModel.senderId) {
                // let newDataObj1 = { ...dataObj, current: true }
                // this.setState({ current_user: dataObj.senderId });
                // current = dataObj.senderId;
                this.state.dataSet.push(dataObj);
                // this.state.dataSet.push(newDataObj1);
            } else {
                // this.setState({ current_user: null });
                // let newDataObj2 = { ...dataObj, current: false }
                this.state.dataSet.push(dataObj);
                // this.state.dataSet.push(newDataObj2);
            }
            console.log("New MSG ADDED :--> ");
            // const dt = JSON.parse(obj);
            // console.log(dt.messageType);
            // alert(dt.messageType);
        }
    }

    //Web Socket stream
    handleSocketStream = (obj) => {
        // const dataFromServer = JSON.parse(e);
        console.log('got reply! ', obj);
        debugger;
        if (obj !== null) {
            debugger
            // this.setState({ loading: true }, () => {
            // this.state.dataSet.push(obj);
            var newDataArr = [obj, ...this.state.dataSet];
            this.setState({ dataSet: newDataArr });
            console.log("New MSG ADDED :--> ");
            // })

            // if (obj.senderId === SenderRecevrModel.senderId) {
            //     // let newDataObj1 = { ...dataObj, current: true }
            //     // this.setState({ current_user: dataObj.senderId });
            //     // current = dataObj.senderId;
            //     console.log("Current user null");
            //     this.state.dataSet.push(obj);
            //     // this.state.dataSet.push(newDataObj1);
            // } else {
            //     this.setState({ current_user: null });
            //     // let newDataObj2 = { ...dataObj, current: false }
            //     this.state.dataSet.push(obj);
            //     // this.state.dataSet.push(newDataObj2);
            // }

            // const dt = JSON.parse(obj);
            // console.log(dt.messageType);
            // alert(dt.messageType);
        }
    }

    // For back to and close the event source connection
    handleBackPress = () => {
        SenderRecevrModel.senderId = ""
        SenderRecevrModel.receiverId = ""
        // this.state.eventSource.removeAllListeners();
        // this.state.eventSource.close();
        console.log("event closed")
        Navigation.back();
    }

    // sent message process 
    handleImageVideoUpload = (imgObj) => {
        debugger
        if (imgObj.mime.includes('image')) {
            let img = imgObj.path;
            //upload image
            this.setState({ loading: true }, () => {
                getObject('UserId').then((obj) => {
                    this.props.dispatch(uploadImage(img, obj, 'chat', 'CHAT_IMAGE', (res, uploadedUrl) => {
                        debugger
                        // setTimeout(() => {
                        if (res) {
                            console.log("Image Uploadddd", uploadedUrl);
                            this.setState({ image_video_url: uploadedUrl }, () => {
                                this.handleImgMsgSent();
                            }) // thumbnail need to add

                        }
                        // }, 500);

                    }))
                })
            })

        } else if (imgObj.mime.includes('video')) {
            //upload video
            //need to add a checck for size and show alert
            let vid = imgObj.path;
            this.setState({ loading: true }, () => {
                getObject('UserId').then((obj) => {
                    this.props.dispatch(uploadChatVideo(obj, vid, (res, data) => {
                        debugger
                        // setTimeout(() => {
                        if (res) {
                            // console.log("Video Uploaded---->> ", data);
                            this.setState({
                                image_video_url: data.videoUrl,
                                image_video_thumbnail: data.thumbnailUrl,
                                muxId: data.muxId
                            }, () => {
                                this.handleVideoMsgSent();

                            })
                            // console.log("Img UR: ", uploadedUrl);
                        }
                        // }, 500);

                    }))
                })
            })

        }
    }

    handleImgMsgSent = () => {
        const sentTs = Date.now();
        if (this.state.image_video_url !== null && this.state.image_video_url !== "") {
            var msgObj = {
                senderId: SenderRecevrModel.senderId,
                senderName: SenderRecevrModel.senderName,
                senderProfilePictureUrl: SenderRecevrModel.senderProfilePic,
                senderType: SenderRecevrModel.senderType,

                receiverId: SenderRecevrModel.receiverId,
                receiverName: SenderRecevrModel.receiverName,
                receiverProfilePictureUrl: SenderRecevrModel.receiverProfilePic,
                receiverType: SenderRecevrModel.receiverType,

                messageType: "IMAGE_TYPE",
                message: "",
                imageInfo:
                {
                    imageUrl: this.state.image_video_url,
                    // thumbnail: this.state.image_video_thumbnail,
                },
                createdAt: sentTs,
                channelId: this.state.channelId,
            }
            console.log("Image MSG Start", msgObj);
            // msg sent through web socket
            this._sendMessage(msgObj);

            // msg sent through api (Axios)
            // this.props.dispatch(sendMessage(msgObj, (res) => {
            //     if (res) {
            //         // debugger;
            //         console.log("Message Sent successfully")
            this.setState({ image_video_url: null, image_video_thumbnail: null, loading: false })
            //     }
            // }))
        }
    }
    // video message sent   https://youtu.be/22gBV3YhwFk
    handleVideoMsgSent = () => {
        const sentTs = Date.now();
        if (this.state.image_video_url !== null && this.state.image_video_url !== "") {
            var msgObj = {
                senderId: SenderRecevrModel.senderId,
                senderName: SenderRecevrModel.senderName,
                senderProfilePictureUrl: SenderRecevrModel.senderProfilePic,
                senderType: SenderRecevrModel.senderType,

                receiverId: SenderRecevrModel.receiverId,
                receiverName: SenderRecevrModel.receiverName,
                receiverProfilePictureUrl: SenderRecevrModel.receiverProfilePic,
                receiverType: SenderRecevrModel.receiverType,

                messageType: "VIDEO_TYPE",
                message: "",
                imageInfo: {},
                videoInfo:
                {
                    videoUrl: this.state.image_video_url,
                    thumbnailUrl: this.state.image_video_thumbnail,
                    muxId: this.state.muxId,
                },
                createdAt: sentTs,
                channelId: this.state.channelId,
            }
            console.log("Video MSG Start", msgObj);
            // msg sent through web socket
            this._sendMessage(msgObj);
            // msg sent through api (Axios)
            // this.props.dispatch(sendMessage(msgObj, (res) => {
            //     if (res) {
            //         // debugger;
            //         console.log("Message Sent successfully")
            this.setState({ image_video_url: null, image_video_thumbnail: null, muxId: null, loading: false })
            //     }
            // }))
        }
    }

    handelTextMsgSent = () => {
        debugger;
        const msg = this.state.txtMsg;
        const sentTs = Date.now();
        if (this.state.txtMsg !== null && this.state.txtMsg !== '') {
            var msgTyp = "";
            if (this.state.txtMsg.includes("https://") || this.state.txtMsg.includes("http://")) {
                msgTyp = "URL_TYPE";
            } else {
                msgTyp = "TEXT_TYPE";
            }
            var txtObj = {
                senderId: SenderRecevrModel.senderId,
                senderName: SenderRecevrModel.senderName,
                senderProfilePictureUrl: SenderRecevrModel.senderProfilePic,
                senderType: SenderRecevrModel.senderType,

                receiverId: SenderRecevrModel.receiverId,
                receiverName: SenderRecevrModel.receiverName,
                receiverProfilePictureUrl: SenderRecevrModel.receiverProfilePic,
                receiverType: SenderRecevrModel.receiverType,

                messageType: msgTyp,
                message: msg,
                createdAt: sentTs,
                channelId: this.state.channelId,
            }
            // console.log("Message start", txtObj);

            // msg sent through web socket
            this._sendMessage(txtObj);
            // Message sent through the api (Axios)
            // this.props.dispatch(sendMessage(txtObj, (res) => {
            //     // setTimeout(() => {
            //     if (res) {
            //         debugger;
            //         console.log("Message Sent successfully")
            this.setState({ txtMsg: '', msg_type: '' })
            //     }
            //     // }, 200);

            // }))
        }
    }

    postNewMessage = () => {
        debugger;
        if (this.state.txtMsg !== null && this.state.txtMsg !== "") {
            // this.setState({ msg_type: "TEXT_TYPE" });
            this.handelTextMsgSent();
        }
        // else {
        //     this.handleImageVideoUpload()
        // }
    }

    _handleTeamInvitationAction = (teamID, index, isAccept) => {
        debugger;
        this.props.dispatch(teamInvitationAction(teamID, index, isAccept, (res, data) => {
            debugger
            // setTimeout(() => {
            if (res) {
                pageNum = 0;
                this.setState({ msgCount: 0, isInitialCall: true, dataSet: [], }, () => {
                    this.handleEventSource();
                })
                // console.log("Invitation Action---->> ", res, "---", data);

                // this.handleVideoMsgSent();
                // console.log("Img UR: ", uploadedUrl);
            }
            // }, 500);

        }))
    }

    _handleChallengeBannerAction = (planID) => {
        debugger;
        pageNum = 0;
        if (SenderRecevrModel.senderType === 'COACH') {
            this.setState({ dataSet: [], isInitialCall: true, msgCount: 0 }, () => {
                Navigation.navigate('CoachChallengeAction', { entityId: planID });
            })
        } else {
            if (SenderRecevrModel.senderType === 'PLAYER') {
                this.props.dispatch(getChallengeDtls(planID, (res, data) => {
                    if (res) {
                        var challengeList = data?.subscriptionLevelInfoList[0]?.challengeList[0];
                        console.log('entityID:---', data);
                        let isUpload = true;
                        if (challengeList.hasOwnProperty('previousResponses')) {
                            challengeList.previousResponses.forEach(element => {
                                if (element.accepted === null || element.accepted == true) {
                                    isUpload = false;
                                }
                            });
                        }
                        this.setState({ dataSet: [], isInitialCall: true, msgCount: 0 }, () => {
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
                        })
                    }

                }))

            }
        }
    }

    handleVideoView = (src, thumbnailSrc) => {
        debugger
        pageNum = 0;
        this.setState({ dataSet: [], isInitialCall: true, msgCount: 0 }, () => {
            Navigation.navigate('ChatVideoPlayer', {
                source: src,
                thumbnailUrl: thumbnailSrc
            })
        })

    }

    _renderMessages = ({ item, index }) => {
        return (
            <MessageItem
                data={item}
                userId={userId}
                onTeamInvitationAction={this._handleTeamInvitationAction}
                onRejectAction={() => alert("secondary")}
                onChallengeAction={this._handleChallengeBannerAction}
                onVideoPress={this.handleVideoView}
            />
        )
    }




    render() {
        // const { messageList } = this.props.ChatData;  // To be render in renderMessages
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base, }} >
                {/* {this.state.channelId !== null && this.state.channelId !== undefined ?
                <WS
                    ref={ref => { ws = ref }}
                    url={"http://34.105.82.134:8085/v1/message/chats/stream/" + this.state.channelId}
                    onOpen={() => {
                        console.log('Open!')
                        ws.send('Hello')
                    }}
                    onMessage={this.handleMessage}
                    onError={console.log}
                    onClose={console.log}{
                                "Authorization": `${'Bearer ' + this.state.authToken}`,
                            }
                // reconnect // Will try to reconnect onClose
                />
                : null
            } */}
                {this.state.channelId !== null && this.state.dataSet.length != null ?
                    <SockJsClient
                        url='http://34.105.82.134:8085/ws'
                        topics={["/user/" + this.state.channelId + "/queue/messages"]}
                        // headers={{
                        //     "Authorization": `${'Bearer ' + this.state.authToken}`,
                        // }}
                        onMessage={(msg) => { this.handleSocketStream(msg); }}
                        ref={(client) => { this.clientRef = client }}
                        onConnect={() => { console.log('Connected websocket') }}
                        onDisconnect={() => { console.log('Not --Connected websocket') }}
                    />
                    : null
                }
                <View style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: Colors.newGrayFontColor,
                    alignItems: 'center',
                    height: width * 0.2,
                }}>
                    <View style={{
                        // backgroundColor: 'green',
                        flexDirection: 'row',
                        marginTop: width * 0.02,
                        alignItems: 'center',
                        width: '90%',



                    }}>
                        <TouchableOpacity onPress={this.handleBackPress}>
                            <Image style={{
                                width: width * 0.09,
                                height: width * 0.09,
                                // marginTop: 24,
                                borderRadius: width * 0.03,
                                borderWidth: 1, borderColor: Colors.borderColor
                            }} source={require('../../../Images/back_ico.png')} />
                        </TouchableOpacity>
                        <View style={{
                            width: width * 0.13,
                            height: width * 0.13,
                            borderRadius: width * 0.13 / 2,
                            borderWidth: 2, borderColor: Colors.newGrayFontColor,
                            alignItems: 'center', justifyContent: 'center',
                            marginHorizontal: 15,

                        }}>
                            <FastImage style={{
                                width: '92%', height: '92%', borderRadius: width * 0.13 / 2,

                            }}
                                resizeMode={'contain'}
                                // source={item.user._avatar}
                                source={{ uri: SenderRecevrModel.receiverProfilePic }}
                            />

                        </View>
                        <Text style={{
                            color: Colors.light, fontSize: 18,
                            lineHeight: 24, fontFamily: Fonts.Bold,
                            marginHorizontal: 6,
                        }}>
                            {SenderRecevrModel.receiverName}
                        </Text>

                    </View >

                </View>
                {/* {this.state.loading == true ? <></>
                    : */}
                <KeyboardAvoidingView keyboardVerticalOffset={35} style={{ flex: 1 }}
                    behavior={"padding"}

                >
                    {/* {this.state.dataSet.length > 0 ? */}
                    <FlatList
                        // key={this.state.dataSet.length}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.dataSet}   //messageList
                        renderItem={(item, index) => this._renderMessages(item, index)}
                        // keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}
                        // initialNumToRender={20}
                        inverted
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        // extraData={this.state.dataSet.length}
                        onEndReached={() => {
                            pageNum = pageNum + 1;
                            this.setInitialMessage();
                        }}
                        onEndReachedThreshold={0.5}


                    // initialScrollIndex={this.st - 2}
                    />
                    {/* : null
                    } */}
                    <Input
                        valForInput={this.state.txtMsg}
                        pickImageVideo={() => {
                            console.log('Image picker open');
                            Alert.alert(
                                'Select Media',
                                'Pick from',
                                [
                                    {
                                        text: 'Gallery',
                                        onPress: async () => {
                                            const res = await Permission.checkPermission(PERMISSION_TYPE.gallery);
                                            if (res) {
                                                ImagePicker.openPicker({
                                                    width: 500,
                                                    height: 500,
                                                    // cropping: true,
                                                    // cropperCircleOverlay: circular,
                                                    sortOrder: 'none',
                                                    compressImageMaxWidth: 1000,
                                                    compressImageMaxHeight: 1000,
                                                    compressImageQuality: 0.8,
                                                    compressVideoPreset: 'MediumQuality',
                                                    includeExif: true,
                                                    cropperStatusBarColor: 'white',
                                                    cropperToolbarColor: 'white',
                                                    cropperActiveWidgetColor: 'white',
                                                    cropperToolbarWidgetColor: '#3498DB',
                                                    multiple: false,
                                                    // mediaType: 'any',
                                                    smartAlbums: ['Videos', 'SlomoVideos', 'UserLibrary']
                                                })
                                                    .then((image) => {
                                                        console.log('received image', image);
                                                        this.handleImageVideoUpload(image);
                                                        //this.setState({ avatar: image.path })
                                                        // this.state.dataSet.push(
                                                        //     {
                                                        //         _id: 3,
                                                        //         _user: {
                                                        //             _id: 12,
                                                        //             _avatar: require("../user1.jpeg"),
                                                        //             _name: "Jason Mamoa"
                                                        //         },
                                                        //         _type: "IMAGE_TYPE",
                                                        //         src: image.path,
                                                        //         _time: "12.30 AM"
                                                        //     }
                                                        // )
                                                    })
                                                    .catch((e) => {
                                                        console.log(e);
                                                        // Alert.alert(e.message ? e.message : e);
                                                    });
                                            } else {
                                                if (Platform.OS == 'ios') {
                                                    showAppPermissionAlert("Alert", "You have not granted permission for photo library.")
                                                }
                                            }

                                        }
                                    },
                                    {
                                        text: 'Camera',
                                        onPress: async () => {
                                            const res = await Permission.checkPermission(PERMISSION_TYPE.camera);
                                            if (res) {
                                                // const res1 = await Permission.checkPermission(PERMISSION_TYPE.microPhone);
                                                // if (res1) {
                                                ImagePicker.openCamera({
                                                    // width: 300,
                                                    // height: 400,
                                                    compressVideoPreset: 'MediumQuality',
                                                    includeExif: true,
                                                    // cropperStatusBarColor: 'white',
                                                    // cropperToolbarColor: 'white',
                                                    // cropperActiveWidgetColor: 'white',
                                                    // cropperToolbarWidgetColor: '#3498DB',
                                                    // multiple: false,
                                                    // cropping: true,
                                                    // mediaType: 'video',
                                                }).then(image => {
                                                    console.log('received image', image);
                                                    this.handleImageVideoUpload(image);
                                                    //this.setState({ avatar: image.path })
                                                });
                                                // } else {
                                                //     if (Platform.OS == 'ios') {
                                                //         showAppPermissionAlert("Alert", "You have not granted permission for microphone.")
                                                //     }
                                                // }
                                            } else {
                                                if (Platform.OS == 'ios') {
                                                    showAppPermissionAlert("Alert", "You have not granted permission for camera.")
                                                }
                                            }
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel'
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        onChange={(msg) => {
                            // alert(msg)
                            this.setState({ txtMsg: msg })
                        }}
                        sendMsg={
                            () => this.postNewMessage()
                            //     () => {
                            //     this.state.dataSet.push(
                            //         {
                            //             _id: 3,
                            //             _user: {
                            //                 _id: 12,
                            //                 _avatar: require("../user1.jpeg"),
                            //                 _name: "Jason Mamoa"
                            //             },
                            //             _type: "TEXT_TYPE",
                            //             _msg: this.state.txtMsg,
                            //             _time: "12.30 AM"
                            //         }
                            //     )
                            //     this.setState({ txtMsg: '' })
                            // }
                        }
                    />

                </KeyboardAvoidingView>
                {/* } */}
                <AppLoader visible={this.state.loading} />
            </SafeAreaView >

        )
    }
}


function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        ChatData: entities.chat
    };
}

export default connect(mapStateToProps)(MessageLists);
// export default MessageLists;
