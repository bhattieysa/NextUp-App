import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Platform, Image } from "react-native";
import Video from "react-native-video";
import MediaControls, {
    PLAYER_STATES,
} from "react-native-media-controls";
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import MoVideoPlayer from 'react-native-mo-video-player';

const { height, width } = Dimensions.get('window')
const dimension = Dimensions.get("window");
const noop = () => { };

let wide = Layout.width;
// const VideoPlay = ({ source, close, sty }) => {
//     const videoPlayer = useRef(null);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isFullScreen, setIsFullScreen] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [paused, setPaused] = useState(true);
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

//     const onLoadStart = () => setIsLoading(true);

//     const onEnd = () => {
//         setPlayerState(PLAYER_STATES.ENDED);
//     };

//     const onSeeking = (currentTime) => setCurrentTime(currentTime);

//     return (
//         <View style={[{ justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb(39,42,49)" }]}>

//             <View style={sty}>
//                 <Video
//                     onEnd={onEnd}
//                     onLoad={onLoad}
//                     onLoadStart={onLoadStart}
//                     fullscreen={isFullScreen}
//                     onProgress={onProgress}
//                     onFullscreenPlayerDidDismiss={() => setIsFullScreen(false)}
//                     paused={paused}
//                     ref={(ref) => (videoPlayer.current = ref)}
//                     resizeMode="cover"
//                     source={source}
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

const VideoPlay = ({ source, sty, thumbnailUrl, onBackPress }) => {
    return (
        <View>

            {/* <View style={{ flex: 1, }} > */}
            {/* <StatusBar /> */}
            <TouchableOpacity
                onPress={onBackPress}

                style={{
                    // flexDirection: 'row',
                    // marginTop: Platform.OS == 'ios' ? wide * 0.07 : wide * 0.02,
                    // top: Platform.OS == 'ios' ? isNotch ? 50 : 8 : 10,
                    top: 0,
                    zIndex: 1, position: 'absolute',

                    width: wide * 0.12, height: wide * 0.1,
                    marginLeft: 10,
                    alignItems: 'center', justifyContent: 'center'
                }}
            >
                <Image style={{
                    width: wide * 0.09, height: wide * 0.09,
                    borderRadius: wide * 0.03, borderWidth: 1,
                    borderColor: Colors.borderColor,
                    backgroundColor: Colors.base,

                }}
                    source={require('../../Images/back_ico.png')}
                />
            </TouchableOpacity>
            <MoVideoPlayer
                style={{ width: dimension.width, height: 300, }}
                source={source}
                poster={thumbnailUrl}
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
            {/* </View> */}

        </View>
    );
};



export default VideoPlay;