import React, { useState } from 'react'
import { View, Text, Image, ImageBackground, Dimensions, TouchableOpacity, Modal } from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome'
import VideoPlayer from './player';
import { SenderRecevrModel } from '../../../constants/constant';
import FastImage from 'react-native-fast-image'
import Navigation from '../../../lib/Navigation';

let wide = Dimensions.get('window').width

const VideoView = ({ ...props }) => {
    // console.log("Video Props: ", props);
    //let user = null//props.data._user
    let current = props.data.senderId === SenderRecevrModel.senderId ? true : false; //user._id == props.userId
    const [isplay, onChange] = useState(false)

    const onVideoView = (src, thumbnail) => {
        props.onVideoPress(src, thumbnail);
    }

    return (
        <>
            <TouchableOpacity
                // onPress={() => onChange(true)}
                onPress={() => onVideoView(props.data.videoInfo.videoUrl, props.data.videoInfo.thumbnailUrl)
                    //      Navigation.navigate('ChatVideoPlayer', {
                    //     source: props.data.videoInfo.videoUrl,
                    //     thumbnailUrl: props.data.videoInfo.thumbnailUrl
                    // })
                }
            >
                {props.data.videoInfo.thumbnailUrl !== null && props.data.videoInfo.thumbnailUrl !== undefined ?
                    <FastImage
                        // source={props.data.src} 
                        source={{ uri: props.data.videoInfo.thumbnailUrl }}

                        imageStyle={[
                            {
                                borderRadius: 20,
                            },
                            current ? { borderTopRightRadius: 5 } : { borderBottomLeftRadius: 5 }
                        ]}
                        style={[
                            {
                                marginLeft: current ? 0 : 10,
                                marginRight: current ? 10 : 0,
                                height: 180,
                                width: wide * .6,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            },
                        ]}
                    >
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('../Assets/play_ico_tint.png')}
                        />
                        {/* <Icon
                        name={"play-circle-o"}
                        size={40}
                        color={"#fff"}
                    /> */}
                    </FastImage>
                    : null}
            </TouchableOpacity>
            {/* <Modal visible={isplay}>
                <VideoPlayer
                    source={props.data.videoInfo.videoUrl}
                    thumbnailUrl={props.data.videoInfo.thumbnailUrl}
                    close={() => onChange(false)}
                />
            </Modal> */}
        </>
    )
}

export default VideoView
