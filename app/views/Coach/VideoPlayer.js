import { View, Text, StyleSheet, KeyboardAvoidingView,StatusBar, Image, ImageBackground, TouchableOpacity, TextInput, Button, SafeAreaView } from 'react-native'
import React, { useState,useEffect,useRef } from 'react'

import Video from 'react-native-video'
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
import MoVideoPlayer from 'react-native-mo-video-player'
import Orientation from 'react-native-orientation-locker';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import Navigation from '../../lib/Navigation';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';

const VideoPlayer = (props) => {


  const videoUrl = props.navigation.state?.params?.videoUrl


console.log(videoUrl)

  useEffect(() => {
    StatusBar.setHidden(true)
    Orientation.lockToLandscapeRight()
    return () => {
      Orientation.lockToPortrait()
      StatusBar.setHidden(false)

    };
  }, [])
  const videoPlayer = useRef(null);



 



 




  return (
    <View style={{flex: 1,backgroundColor: Colors.base,}}>
        {/* <ScreenHeader
                                backButtonAction={() => Navigation.back()}
                            /> */}
      <Video

        paused={false}
        ref={videoPlayer}
        resizeMode={"cover"}
   
        source={{
          uri:videoUrl,
        }}
        style={styles.mediaPlayer}
        volume={10}
        controls={true}
      />

    </View>
  );
};
 
export default VideoPlayer;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
   
    justifyContent: 'center',
  },
});