import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform, StatusBar } from "react-native";
import Video from "react-native-video";
import MediaControls, {
    PLAYER_STATES,
} from "react-native-media-controls";
import { Layout, Colors, Fonts, } from '../../../constants';
import MoVideoPlayer from 'react-native-mo-video-player';
import Navigation from '../../../lib/Navigation';
import Orientation from 'react-native-orientation-locker';

const { height, width } = Dimensions.get('window')
const dimension = Dimensions.get("window");

let wide = Layout.width;

const noop = () => { };

// OLD video player

// const VideoPlayer = ({ source, close }) => {
//     const videoPlayer = useRef(null);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isFullScreen, setIsFullScreen] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [paused, setPaused] = useState(false);
//     const [playerState, setPlayerState] = useState(1);

//     const onSeek = (seek) => {
//         videoPlayer?.current.seek(seek);
//     };

//     const onPaused = (playerState) => {
//         setPaused(!paused);
//         setPlayerState(playerState);
//     };

//     const onReplay = () => {
//         setPlayerState(PLAYER_STATES.PLAYING);
//         videoPlayer?.current.seek(0);
//     };

//     const onProgress = (data) => {
//         // Video Player will continue progress even if the video already ended
//         if (!isLoading) {
//             setCurrentTime(data.currentTime);
//         }
//     };

//     const onLoad = (data) => {
//         setDuration(data.duration);
//         setIsLoading(false);
//     };

//     const onLoadStart = () => {
//         // videoPlayer.current.presentFullscreenPlayer()
//         setPlayerState(PLAYER_STATES.PLAYING);
//         setIsLoading(true);

//     }

//     const onEnd = () => {
//         setPlayerState(PLAYER_STATES.ENDED);
//     };

//     const onSeeking = (currentTime) => setCurrentTime(currentTime);

//     return (
//         <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb(39,42,49)" }]}>
//             <TouchableOpacity onPress={close} style={{
//                 height: 40, width: 40, borderWidth: 2, borderColor: '#fff', borderRadius: 20, justifyContent: 'center', alignItems: 'center',
//                 zIndex: 99, left: 20, position: 'absolute', top: width * 0.18
//             }}>
//                 <Text style={{ fontSize: 22, color: '#fff', }}>X</Text>
//             </TouchableOpacity>
//             <View style={{ height: height * 0.6, width: width, position: 'relative' }}>
//                 <Video
//                     onEnd={onEnd}
//                     onLoad={onLoad}
//                     onLoadStart={onLoadStart}
//                     fullscreen={isFullScreen}
//                     onProgress={onProgress}
//                     onFullscreenPlayerDidDismiss={() => { videoPlayer.current.dismissFullscreenPlayer(); close() }}
//                     paused={paused}
//                     ref={(ref) => (videoPlayer.current = ref)}
//                     resizeMode="cover"
//                     source={{ uri: source }}
//                     onError={(err) => console.log(err)}
//                     repeat={false}
//                     style={styles.mediaPlayer}
//                     volume={1}

//                 />
//                 <MediaControls
//                     isFullScreen={isFullScreen}
//                     duration={duration}
//                     isLoading={isLoading}
//                     mainColor={"white"}
//                     onFullScreen={() => setIsFullScreen(true)}
//                     onPaused={onPaused}
//                     onReplay={onReplay}
//                     onSeek={onSeek}
//                     onSeeking={onSeeking}
//                     playerState={playerState}
//                     progress={currentTime}
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     toolbar: {
//         marginTop: 30,
//         backgroundColor: "white",
//         padding: 10,
//         borderRadius: 5,
//     },
//     mediaPlayer: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         backgroundColor: "black",
//     },
// });

const VideoPlayer = ({ source, sty, thumbnailUrl, close, ...props }) => {
    var bacPressCount = 1;
    console.log("Video----propp", props)

    const handleBackPress = () => {
        Orientation.getOrientation((res) => {
            if (res == 'PORTRAIT') {
                Navigation.back()
            } else if (res == 'LANDSCAPE-LEFT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            } else if (res == 'LANDSCAPE-RIGHT') {
                Orientation.lockToPortrait()
                StatusBar.setHidden(false)
            }
        })

    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: Colors.base }} >
                {/* <StatusBar /> */}
                {/* <View style={{
                    flexDirection: 'row',
                    marginTop: wide * 0.1, zIndex: 99, position: 'absolute',
                }}> */}
                <TouchableOpacity
                    onPress={handleBackPress}

                    style={{
                        // flexDirection: 'row',
                        marginTop: wide * 0.02,
                        zIndex: 1, position: 'absolute',

                        width: wide * 0.12, height: wide * 0.1,
                        marginLeft: 10,
                        alignItems: 'center', justifyContent: 'center'
                    }}
                // onPress={() => this.setState({ show: false })}
                >
                    <Image style={{
                        width: wide * 0.09, height: wide * 0.09,
                        borderRadius: wide * 0.03, borderWidth: 1,
                        borderColor: Colors.borderColor,
                        backgroundColor: Colors.base,
                        // marginTop: wide * 0.02, 

                    }}
                        source={require('../../../Images/back_ico.png')}
                    />
                </TouchableOpacity>

                {/* </View> */}
                <MoVideoPlayer
                    style={{ width: dimension.width, height: 300, }}
                    source={props.navigation.state.params.source}
                    poster={props.navigation.state.params.thumbnailUrl}
                    // source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
                    // poster='https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg'
                    // title='React Native MO-VIDEO-PLAYER'
                    autoPlay={true}
                    // playInBackground={false}
                    // playList={[
                    //   {
                    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
                    //     poster: 'https://www.carage.net/media/halfhd/carage_fahrzeuge_square_8.jpg',
                    //     title: 'Video 1'
                    //   },
                    //   {
                    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
                    //     poster: 'https://carsguide-res.cloudinary.com/image/upload/f_auto%2Cfl_lossy%2Cq_auto%2Ct_default/v1/editorial/story/hero_image/1908-Ford-Model-T_0.jpg',
                    //     title: 'Video 2'
                    //   },
                    //   {
                    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                    //     poster: 'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/surfing-dog-photo-is-funner-or-funnest-a-real-word-5670-6d512231d0a52079b0c9fbf474f9a6c9@1x.jpg',
                    //     title: 'Video 3'
                    //   },
                    //   {
                    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                    //     poster: 'https://wikiimg.tojsiabtv.com/wikipedia/en/6/6f/War_official_poster.jpg',
                    //     title: 'Video 4'
                    //   },
                    //   {
                    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                    //     poster: 'https://www.alsharqtoday.com/wp-content/uploads/2020/09/%D8%A7%D9%84%D8%AC%D9%84%D9%8A%D8%AF.jpg',
                    //     title: 'Video 5'
                    //   },
                    //   {
                    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    //     poster: 'https://pbs.twimg.com/media/FDX7UCbVcAUcNXj.jpg',
                    //     title: 'Video 6'
                    //   },
                    // ]}
                    // showHeader={true}
                    // showSeeking10SecondsButton={true}
                    // showCoverButton={true}
                    showFullScreenButton={true}
                    // showSettingButton={true}
                    showMuteButton={true}
                />
            </View>

        </>
    );
};


export default VideoPlayer;