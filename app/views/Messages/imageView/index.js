import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Animated, Dimensions, Modal, SafeAreaView, Text } from 'react-native';
import { SenderRecevrModel } from '../../../constants/constant';
import FastImage from 'react-native-fast-image'
import {
    Layout,
    Colors,
    Fonts,
} from '../../../constants';

const { height, width } = Dimensions.get('window')
let wide = Layout.width;
let high = Layout.height;

const ImageView = ({ ...props }) => {
    // let user = props.data._user
    let user = {
        _avatar: props.data.senderProfilePictureUrl,
    }
    let current = props.data.senderId === SenderRecevrModel.senderId ? true : false; //user._id == props.userId
    const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];
    const [show, onShow] = useState(false)
    const handleZoom = () => {
        onShow(true)
        // Animated.spring(value, {
        //     toValue: { x: width, y: height },
        //     speed: 1,
        //     useNativeDriver: false
        // }).start()
        // setTimeout(() => {
        //     onShow(true)
        // }, 100);
    }

    const dismissImage = () => {
        onShow(false)
        // Animated.spring(value, {
        //     toValue: { x: 0, y: 0 },
        //     speed: 1,
        //     useNativeDriver: false
        // }).start()
        // setTimeout(() => {
        //     onShow(false)
        // }, 100);
    }

    return (

        <TouchableOpacity onPress={handleZoom}>
            <FastImage
                // source={{ uri: props.data.src }}  modify by keshav
                source={{
                    uri: props.data.imageInfo.imageUrl,
                    priority: FastImage.priority.high,
                }}
                style={[
                    {
                        marginLeft: current ? 0 : 10,
                        marginRight: current ? 10 : 0,
                        borderRadius: 20, width: 200, height: 200
                    },
                    current ? { borderTopRightRadius: 5 } : { borderBottomLeftRadius: 5 }
                ]}
                resizeMode={FastImage.resizeMode.cover}
            // resizeMode={'cover'}
            />
            <Modal visible={show} animationType="slide">
                <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(39,42,49)" }}>

                    {/* <TouchableOpacity
                        onPress={dismissImage}
                        style={{
                            height: 40, width: 40, 
                            borderWidth: 2, borderColor: '#fff', borderRadius: 20, justifyContent: 'center', alignItems: 'center',
                            zIndex: 99, marginLeft: 20, marginTop: width * 0.05
                        }}>
                        <Text style={{ fontSize: 22, color: '#fff', }}>X</Text>
                    </TouchableOpacity> */}
                    <View style={{ width: wide, height: high, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={dismissImage}

                            style={{
                                // flexDirection: 'row',
                                // marginTop: wide * 0.02,
                                zIndex: 1, position: 'absolute',

                                width: wide * 0.12, height: wide * 0.1,
                                marginLeft: 10,
                                top: 0, left: 10

                                // alignItems: 'center', justifyContent: 'center'
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
                        <FastImage
                            // resizeMode={FastImage.resizeMode.contain}
                            // source={{ uri: props.data.src }} 
                            source={{
                                uri: props.data.imageInfo.imageUrl,
                                priority: FastImage.priority.high,
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                // marginTop: wide * 0.02,
                                // position: 'absolute',
                                // top: 0,
                                // right: 0,
                                // bottom: 0,
                                // left: 0,

                            }}>

                        </FastImage>
                    </View>
                </SafeAreaView>
            </Modal>
        </TouchableOpacity>
    )
}

export default ImageView
