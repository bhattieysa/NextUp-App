import React from 'react'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
const Avatar = ({ source, size, bordered, resizemode }) => <FastImage
    style={[{ height: size, width: size, borderRadius: size / 2, marginTop: -2 }, bordered && { borderWidth: 2, borderColor: "rgb(39,42,49)", }]}
    source={source}
    resizeMode={resizemode !== null ? resizemode : 'cover'}
/>

export default Avatar
