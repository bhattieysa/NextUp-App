import React, { Component, useState } from 'react';
import {
    View, TouchableOpacity, Text,
    SafeAreaView, Image,
    ScrollView, TextInput, StyleSheet,
    KeyboardAvoidingView, FlatList, ImageBackground, Dimensions, Share, ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';

import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { isNotch } from '../../utils/deviceInfo';
import { getReels } from '../../actions/home';
import { getObject } from '../../middleware';

let wide = Layout.width;
const { height, width } = Dimensions.get('window');
const videos = [
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },

    },


    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    },
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    },
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    },
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    },
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    },
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        // url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        url: null,
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    },
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    },
    {
        id: 1,
        //url: require('../../Images/mother.mp4'),
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        user: {

            image: "https://i.pinimg.com/originals/7b/8f/49/7b8f492529fd236dc59baf184faf8488.jpg"
            // image: "https://p16-va-default.akamaized.net/img/musically-maliva-obj/1606484041765893~c5_720x720.jpeg"
        },
    }
]

export const VideoComp = ({ item, index, currentVisibleIndex }) => {
    const [isPause, onChangePause] = useState(true)
    const [isload, onChangeLoad] = useState(true)
    //console.log(item.videoUrl);

    return (
        <>
            {/* <View style={{
        height: wide * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between', marginLeft: 15,
    }}
    > */}
            {/* <View style={{
            width: wide * 0.12, height: wide * 0.12,
            borderRadius: wide * 0.15 / 2, borderWidth: 3,
            borderColor: Colors.borderColor,
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Image style={{ width: '90%', height: '90%', borderRadius: wide * 0.12 / 2, }}
                resizeMode={'contain'} source={require('../../Images/avatar.png')} />
        </View>

        <View style={{ paddingHorizontal: 6, flex: 1, marginTop: 5 }}>
            <Text style={{
                color: Colors.light, fontSize: 18,
                lineHeight: 20, fontFamily: Fonts.SemiBold
            }}> Vaibhav Chibbar</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                    color: Colors.shade, fontSize: 11,
                    lineHeight: 14, fontFamily: Fonts.Regular, marginTop: 5
                }}>   Forward center1 #9 </Text>

            </View>
        </View> */}
            {/* </View> */}

            <TouchableOpacity
                onPress={() => onChangePause(!isPause)}
                activeOpacity={0.9}
                style={{
                    height: Layout.height * 0.91,
                    // backgroundColor: this.getRandomColor(),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Video
                    poster={item.thumbnailUrl}//+ '&width=400&height=400'
                    source={{ uri: item.videoUrl }}
                    ref={(ref) => {
                        // this.player = ref;
                    }}
                    onLoad={() => onChangeLoad(!isload)}
                    paused={index !== currentVisibleIndex || !isPause}
                    repeat
                    resizeMode='cover'
                    posterResizeMode='cover'

                    // resizeMode="stretch"
                    style={{
                        //  backgroundColor: '#ccc',
                        height: Layout.height * 0.91,
                        width: '100%'
                    }}
                />
                {
                    !isPause ? <Image source={require('../../Images/play_ico.png')} style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        height: 80, width: 80,
                        zIndex: 10,
                        tintColor: Colors.light
                    }} /> : null
                }
                {
                    isload ? <ActivityIndicator animating size='large' color={Colors.light} style={{ position: 'absolute' }} /> : null
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}
                style={{
                    flex: 1,
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: Colors.btnBg,
                    borderRadius: (wide * 0.2) / 2,
                    // shadowColor: Colors.lightGray,
                    // shadowOffset: { width: 0, height: 0 },
                    // shadowOpacity: 1.0,
                    width: wide * 0.15,
                    height: wide * 0.15, position: 'absolute',
                    right: 10, bottom: wide * 0.05
                }}>
                <Image
                    source={require("../../Images/share.png")}
                    // resizeMode="contain"
                    style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 40, width: '25%', height: '25%', top: -2 }}

                ></Image>
                <Text style={{
                    color: Colors.light, fontFamily: Fonts.SemiBold,
                    fontSize: 10
                }}>
                    Share
                </Text>


            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 1,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: Colors.btnBg,
                borderRadius: (wide * 0.2) / 2,
                // shadowColor: Colors.lightGray,
                // shadowOffset: { width: 0, height: 0 },
                // shadowOpacity: 1.0,
                width: wide * 0.15, height: wide * 0.15, position: 'absolute',
                right: 10, bottom: wide * 0.25
            }}>
                <Image
                    source={require("../../Images/like_ico.png")}
                    // resizeMode="contain"
                    style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 40, width: '25%', height: '25%', top: -2 }}

                ></Image>
                <Text style={{
                    color: Colors.light, fontFamily: Fonts.SemiBold,
                    fontSize: 10
                }}>
                    {item.numberOfLikes} Likes
                </Text>
                {
                    // <Image
                    //   source={require("../../Images/avatar.png")}
                    //   // resizeMode="contain"
                    //   style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
                    // ></Image>
                }

            </TouchableOpacity>
            <TouchableOpacity
                // onPress={console.log("ll")}
                style={{
                    flex: 1,
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: Colors.btnBg,
                    borderRadius: (wide * 0.2) / 2,
                    // shadowColor: Colors.lightGray,
                    // shadowOffset: { width: 0, height: 0 },
                    // shadowOpacity: 1.0,
                    width: wide * 0.15, height: wide * 0.15, position: 'absolute',
                    right: 10, bottom: wide * 0.44
                }}>
                <Image
                    source={require("../../Images/send.png")}
                    // resizeMode="contain"
                    style={{
                        color: Colors.light, fontFamily: Fonts.Medium,
                        fontSize: 40, width: '25%', height: '25%', top: -2
                    }}

                ></Image>
                <Text style={{
                    color: Colors.light, fontFamily: Fonts.SemiBold,
                    fontSize: 10
                }}>

                    Message </Text>


            </TouchableOpacity>
        </>
    )
};


var pageNum = 1
class PostView extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,
            isGamesOpen: true,
            currentVisibleIndex: null,
            isPause: true,
            arrReel: []
        };
        this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 70 };
        this.index = 0;
    }
    componentDidMount() {
        pageNum = 1
        this.getVideos()
    }

    getVideos = () => {
        getObject('UserId').then((obj) => {
            this.setState({ loading: true }, () => {
                this.props.dispatch(getReels(obj, pageNum, true, (res, resData) => {
                    console.log(resData);
                    if (resData.length == 0) {
                        pageNum = pageNum - 1
                    }
                    if (this.state.arrReel.length > 0) {
                        debugger

                        this.setState({ loading: false, arrReel: [...this.state.arrReel, ...resData] })
                    } else {
                        debugger
                        this.setState({ loading: false, arrReel: resData })
                    }




                }))
            })

        })
    }

    _onViewableItemsChanged = (props) => {
        const changed = props.changed;
        const viewableItems = props.viewableItems;
        if (viewableItems && viewableItems.length > 0) {
            this.setState({ currentVisibleIndex: viewableItems[0].index });
        }
    };


    isLegitIndex(index, length) {
        if (index < 0 || index >= length) return false;
        return true;
    }


    pagination = (velocity) => {
        let nextIndex;
        if (Platform.OS == "ios")
            nextIndex = velocity >= 0 ? this.index + 1 : (this.index > 1 ? this.index - 1 : 0);
        else

            nextIndex = velocity < 0 ? this.index : this.index + 1;
        if (this.isLegitIndex(nextIndex, this.state.arrReel.length)) {
            this.index = nextIndex;
        }
        this.setState({ isPause: true })
        //  this.flatListRef.scrollToIndex({ index: this.index, animated: true });
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        let { navigation } = this.props;
        let { currentVisibleIndex, isPause } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>


                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>

                    {/* <ImageBackground source={require('../../Images/dummyImage.png')} style={{ width: wide, height: wide * 1.8 }}>

                    </ImageBackground> */}
                    <FlatList
                        pagingEnabled={true}
                        showsVerticalScrollIndicator={false}
                        data={this.state.arrReel}
                        initialNumToRender={20}
                        onEndReachedThreshold={0.1}
                        keyExtractor={(item, index) => `${index}`}
                        // renderItem={({ item, index }) => {
                        //     return (
                        //         <>
                        //             {/* <View style={{
                        //     height: wide * 0.1,
                        //     flexDirection: 'row',
                        //     justifyContent: 'space-between', marginLeft: 15,
                        // }}
                        // > */}
                        //             {/* <View style={{
                        //         width: wide * 0.12, height: wide * 0.12,
                        //         borderRadius: wide * 0.15 / 2, borderWidth: 3,
                        //         borderColor: Colors.borderColor,
                        //         justifyContent: 'center', alignItems: 'center'
                        //     }}>
                        //         <Image style={{ width: '90%', height: '90%', borderRadius: wide * 0.12 / 2, }}
                        //             resizeMode={'contain'} source={require('../../Images/avatar.png')} />
                        //     </View>

                        //     <View style={{ paddingHorizontal: 6, flex: 1, marginTop: 5 }}>
                        //         <Text style={{
                        //             color: Colors.light, fontSize: 18,
                        //             lineHeight: 20, fontFamily: Fonts.SemiBold
                        //         }}> Vaibhav Chibbar</Text>
                        //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        //             <Text style={{
                        //                 color: Colors.shade, fontSize: 11,
                        //                 lineHeight: 14, fontFamily: Fonts.Regular, marginTop: 5
                        //             }}>   Forward center1 #9 </Text>

                        //         </View>
                        //     </View> */}
                        //             {/* </View> */}

                        //             <TouchableOpacity
                        //                 onPress={() => this.setState({ isPause: !isPause })}
                        //                 activeOpacity={0.9}
                        //                 style={{
                        //                     height: Layout.height * 0.91,
                        //                     // backgroundColor: this.getRandomColor(),
                        //                     justifyContent: 'center',
                        //                     alignItems: 'center'
                        //                 }}>
                        //                 <Video
                        //                     poster={item.thumbnailUrl}//+ '&width=400&height=400'
                        //                     source={{ uri: item.videoUrl }}
                        //                     ref={(ref) => {
                        //                         //this.player = ref;
                        //                     }}
                        //                     paused={index !== currentVisibleIndex || !isPause}
                        //                     repeat
                        //                     resizeMode='cover'
                        //                     posterResizeMode='cover'

                        //                     // resizeMode="stretch"
                        //                     style={{

                        //                         height: Layout.height * 0.91,
                        //                         width: '100%'
                        //                     }}
                        //                 />
                        //                 {
                        //                     !isPause ? <Image source={require('../../Images/play_ico.png')} style={{
                        //                         position: 'absolute',
                        //                         alignSelf: 'center',
                        //                         height: 80, width: 80,
                        //                         zIndex: 10,
                        //                         tintColor: Colors.light
                        //                     }} /> : null
                        //                 }
                        //             </TouchableOpacity>
                        //             <TouchableOpacity onPress={onShare}
                        //                 style={{
                        //                     flex: 1,
                        //                     justifyContent: 'center', alignItems: 'center',
                        //                     backgroundColor: Colors.btnBg,
                        //                     borderRadius: (wide * 0.2) / 2,
                        //                     // shadowColor: Colors.lightGray,
                        //                     // shadowOffset: { width: 0, height: 0 },
                        //                     // shadowOpacity: 1.0,
                        //                     width: wide * 0.15,
                        //                     height: wide * 0.15, position: 'absolute',
                        //                     right: 10, bottom: wide * 0.05
                        //                 }}>
                        //                 <Image
                        //                     source={require("../../Images/share.png")}
                        //                     // resizeMode="contain"
                        //                     style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 40, width: '25%', height: '25%', top: -2 }}

                        //                 ></Image>
                        //                 <Text style={{
                        //                     color: Colors.light, fontFamily: Fonts.SemiBold,
                        //                     fontSize: 10
                        //                 }}>
                        //                     Share
                        //                 </Text>


                        //             </TouchableOpacity>
                        //             <TouchableOpacity style={{
                        //                 flex: 1,
                        //                 justifyContent: 'center', alignItems: 'center',
                        //                 backgroundColor: Colors.btnBg,
                        //                 borderRadius: (wide * 0.2) / 2,
                        //                 // shadowColor: Colors.lightGray,
                        //                 // shadowOffset: { width: 0, height: 0 },
                        //                 // shadowOpacity: 1.0,
                        //                 width: wide * 0.15, height: wide * 0.15, position: 'absolute',
                        //                 right: 10, bottom: wide * 0.25
                        //             }}>
                        //                 <Image
                        //                     source={require("../../Images/like_ico.png")}
                        //                     // resizeMode="contain"
                        //                     style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 40, width: '25%', height: '25%', top: -2 }}

                        //                 ></Image>
                        //                 <Text style={{
                        //                     color: Colors.light, fontFamily: Fonts.SemiBold,
                        //                     fontSize: 10
                        //                 }}>
                        //                     {item.numberOfLikes} Likes
                        //                 </Text>
                        //                 {
                        //                     // <Image
                        //                     //   source={require("../../Images/avatar.png")}
                        //                     //   // resizeMode="contain"
                        //                     //   style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
                        //                     // ></Image>
                        //                 }

                        //             </TouchableOpacity>
                        //             <TouchableOpacity
                        //                 // onPress={console.log("ll")}
                        //                 style={{
                        //                     flex: 1,
                        //                     justifyContent: 'center', alignItems: 'center',
                        //                     backgroundColor: Colors.btnBg,
                        //                     borderRadius: (wide * 0.2) / 2,
                        //                     // shadowColor: Colors.lightGray,
                        //                     // shadowOffset: { width: 0, height: 0 },
                        //                     // shadowOpacity: 1.0,
                        //                     width: wide * 0.15, height: wide * 0.15, position: 'absolute',
                        //                     right: 10, bottom: wide * 0.44
                        //                 }}>
                        //                 <Image
                        //                     source={require("../../Images/send.png")}
                        //                     // resizeMode="contain"
                        //                     style={{
                        //                         color: Colors.light, fontFamily: Fonts.Medium,
                        //                         fontSize: 40, width: '25%', height: '25%', top: -2
                        //                     }}

                        //                 ></Image>
                        //                 <Text style={{
                        //                     color: Colors.light, fontFamily: Fonts.SemiBold,
                        //                     fontSize: 10
                        //                 }}>

                        //                     Message </Text>


                        //             </TouchableOpacity>
                        //         </>
                        //     )
                        // }
                        // }
                        renderItem={({ item, index }) => <VideoComp key={index} item={item} index={index} currentVisibleIndex={currentVisibleIndex} />}
                        ref={(ref) => { this.flatListRef = ref }}
                        // onScroll
                        // onScrollBeginDrag={(e) => {
                        //     this.pagination(
                        //         e.nativeEvent.velocity.y,
                        //     );
                        // }}
                        // onScroll={(e) => {
                        //     this.pagination(
                        //         e.nativeEvent.velocity.y,
                        //     );
                        // }}

                        onEndReached={(e) => {
                            pageNum = pageNum + 1
                            this.getVideos()

                            this.pagination(
                                e == undefined ?
                                    e.nativeEvent.velocity.y : null,
                            );
                        }}

                        // onScrollEndDrag={
                        //     () => this.setState({ isPause: !isPause })}

                        viewabilityConfig={this.viewabilityConfig}
                        onViewableItemsChanged={this._onViewableItemsChanged}
                    />



                </KeyboardAvoidingView>
                <View style={{
                    marginHorizontal: 10,
                    flexDirection: 'row', position: 'absolute'
                }}>
                    <TouchableOpacity onPress={() => Navigation.back()}>
                        <Image style={
                            [styles.BackIcon, { backgroundColor: Colors.base, }]
                        } source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                    {/* <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06, alignSelf: 'center', alignContent: 'center', }}>
                        <View style={{ width: wide * 0.75 }}></View>
                        <Text style={styles.header}>

                            Posts

                        </Text>
                    </View> */}
                </View>
            </SafeAreaView >
        )
    }
}
function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(PostView);

const styles = StyleSheet.create({
    BackIcon: {
        width: wide * 0.09, height: wide * 0.09,
        marginTop: 20, borderRadius: wide * 0.03, borderWidth: 1,
        borderColor: Colors.borderColor, marginHorizontal: 10
    },
    header: {

        color: Colors.light,
        fontSize: 30, lineHeight: 35,
        fontFamily: Fonts.SemiBold,
        alignSelf: 'center',
        textAlign: 'center'

    },
    input: {
        width: '100%',
        backgroundColor: Colors.lightshade,
        height: wide * 0.12,
        borderRadius: (wide * 0.1) / 2,
        paddingHorizontal: wide * 0.1,
        color: Colors.dark,
        fontFamily: Fonts.Regular,
        textAlignVertical: 'center',
    },
    searchIcon: {
        position: 'absolute',
        top: wide * 0.08,
        left: wide * 0.04,
    },
    filter: {
        height: wide * 0.1,
        width: wide * 0.1,
        backgroundColor: Colors.base,
        borderRadius: (wide * 0.1) / 2,
    },
    filterlabel: {
        fontSize: 12,
        color: Colors.darkshade,
        fontFamily: Fonts.Regular,
    },
});
export const FlotingButton = (bottomHeight, img, textMessage) => {
    return (
        <TouchableOpacity
            // onPress={console.log("ll")}
            style={{
                flex: 1,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: Colors.btnBg,
                borderRadius: (wide * 0.2) / 2,
                shadowColor: Colors.lightGray,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1.0, width: wide * 0.2, height: wide * 0.2, position: 'absolute',
                right: 10, bottom: bottomHeight
            }}>
            <Image
                // source={require(img)}
                // resizeMode="contain"
                style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 40, width: '25%', height: '25%', top: -2 }}

            ></Image>
            <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 13 }}>

                textMessage </Text>


        </TouchableOpacity>
    )
}


const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                'Next Up Share link',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};