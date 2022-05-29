
import React, { useState } from 'react'
import { View, Text, Image, ImageBackground, Dimensions, TouchableOpacity, Modal } from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome'
import VideoPlayer from './player'

let wide = Dimensions.get('window').width

const CommonVideoComponent = ({ videoUrl, closeVideoView }) => {
    const [isplay, onChange] = useState(true)
    return (
        <Modal visible={isplay}>
            <VideoPlayer
                source={videoUrl}
                close={() => {
                    onChange(false)
                    closeVideoView()
                }}
            />
        </Modal>
    )
}

export default CommonVideoComponent
