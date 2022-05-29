import React from 'react'
import { View, Text } from 'react-native'
import Avatar from '../avatar';
import { IMAGE_TYPE, TEXT_TYPE, VIDEO_TYPE } from '../data';
import ImageView from '../imageView';
import Label from '../label';
import LinkLabel from '../label/LinkLabel';
import VideoView from '../videoView';
import { SenderRecevrModel } from '../../../constants/constant'

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

const ChatBubble = ({ ...props }) => {
    // console.log("chat buble: ", props)
    let user = {
        _avatar: props.data.senderProfilePictureUrl,
    }
    // console.log("ImgUrl : ", user);
    let current = props.data.senderId === SenderRecevrModel.senderId ? true : false;
    // console.log("Currrrr", current);
    // debugger
    return (
        <View style={{ alignItems: current ? "flex-end" : "flex-start", marginTop: 15 }}>
            <View style={{ width: "70%", flexDirection: 'row', justifyContent: current ? 'flex-end' : 'flex-start', }}>
                {!current &&
                    <Avatar
                        size={50}
                        source={{ uri: user._avatar }}
                        bordered
                    />
                }
                <View>
                    {props.data.messageType == TEXT_TYPE ?
                        <View style={[
                            {
                                marginLeft: current ? 0 : 10,
                                marginRight: current ? 10 : 0,
                                padding: 12,
                                backgroundColor: "rgb(39,42,49)",
                                borderRadius: 20,
                                // marginTop: 2
                            },
                            current ? { borderTopRightRadius: 5 } : { borderBottomLeftRadius: 5 }
                        ]}>
                            <Label
                                // data={props.data._msg} modify by keshav
                                data={props.data.message}
                                size={14}
                                bold={false}
                                color={"#fff"}
                            />
                        </View>
                        : props.data.messageType === "URL_TYPE" ?
                            <View style={[
                                {
                                    marginLeft: current ? 0 : 10,
                                    marginRight: current ? 10 : 0,
                                    // padding: 10,
                                    backgroundColor: "rgb(39,42,49)",
                                    borderRadius: 20,
                                },
                                current ? { borderTopRightRadius: 5 } : { borderBottomLeftRadius: 5 }
                            ]}>
                                <LinkLabel
                                    data={props.data.message}
                                    size={14}
                                    bold={false}
                                    color={"#fff"}
                                />
                            </View>
                            :
                            props.data.messageType == IMAGE_TYPE ? <ImageView
                                {...props}
                            />
                                :
                                <VideoView
                                    {...props}
                                />}
                    <Label
                        // data={props.data._time} modify by keshav
                        data={formatAMPM(new Date(props.data.createdAt))}
                        size={11}
                        color={"grey"}
                        style={{
                            marginLeft: current ? 0 : 15,
                            marginRight: current ? 15 : 0,
                            alignSelf: current ? "flex-start" : "flex-end",
                            marginTop: 5
                        }}
                    />
                </View>

                {current && <Avatar
                    size={50}
                    bordered
                    source={{ uri: user._avatar }}
                />}
            </View>
        </View>
    )
}

export default ChatBubble
