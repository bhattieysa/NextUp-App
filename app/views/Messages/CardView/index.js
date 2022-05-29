import React from 'react'
import { View, ImageBackground, Dimensions, Image, TouchableOpacity, Text } from 'react-native'
import Avatar from '../avatar'
import Label from '../label'
import { Colors, Layout, Fonts } from '../../../constants/'
import { SenderRecevrModel } from '../../../constants/constant';
import moment from 'moment';
import FastImage from 'react-native-fast-image'

let width = Layout.width;

function formatAMPM(date) {
    // console.log("Created Date--->>", moment(date).format('MMMM'));
    // console.log("Created Date--->>", moment(date).year());
    // console.log("Created Date--->>", moment(date).date());

    var hours = date.getHours();
    var minutes = date.getMinutes();

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const ButtonView = ({ ...props }) => {
    const _banner = props.data;
    const { onTeamInvitationAction, onChallengeAction } = props;

    const handleAcceptAction = () => {
        onTeamInvitationAction(_banner.bannerInfo.entityId, _banner.bannerInfo.indexNumber, true);
    }

    const handleRejectAction = () => {
        onTeamInvitationAction(_banner.bannerInfo.entityId, _banner.bannerInfo.indexNumber, false);
    }

    return <View style={{
        height: '23%',
        flexDirection: 'row',
        width: '98%'
    }}>
        <TouchableOpacity
            style={{
                flex: 1,
                borderTopWidth: 2,
                borderColor: "#fff", alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1
            }}
            onPress={handleAcceptAction}
        // activeOpacity={0.5}
        >
            <Avatar
                source={require("../../../Images/check_Icon.png")}
                size={20}
                resizemode={"contain"}
            />

        </TouchableOpacity>
        <TouchableOpacity
            style={{
                flex: 1,
                borderTopWidth: 2, borderColor: "#fff",
                alignItems: 'center', justifyContent: 'center',

            }}
            onPress={handleRejectAction}
        // activeOpacity={0.5}
        >
            <Avatar
                source={require("../../../Images/cross_icon.png")}
                size={20}
                resizemode={"contain"}
            />
        </TouchableOpacity>
    </View>

}

// Team-Invitation
const TeamInvitationBannerView = ({ ...props }) => {
    const banner = props.data;
    // console.log("Team Props:-->>", props);
    // console.log("Banner", banner)
    // const { _banner, _time } = data;
    return (
        <ImageBackground
            // source={require("../Assets/dummyImage.png")}
            style={{
                height: width * 0.44,
                width: "98%",
                marginTop: width * 0.05,
                alignSelf: 'center',
                marginLeft: width * 0.01

            }}
            resizeMode={'cover'}
            imageStyle={{ borderRadius: 20, backgroundColor: Colors.matchColor, }}
        >
            <View style={{ flex: 1 }}>
                <View style={{}}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: "85%",
                        alignSelf: "center",
                        marginTop: width * 0.035
                    }}>
                        <Label
                            color={"#fff"}
                            // data={_banner.title}  modify by keshav
                            data={banner.bannerInfo.title}
                            bold
                        />
                        <View style={{ flexDirection: "row", marginRight: width * 0.02, alignItems: 'center' }}>
                            <FastImage
                                style={{ width: 20, height: 20, }}
                                source={require("../../../Images/newCalenderIcon.png")}
                                tintColor={Colors.light}
                                resizemode={"contain"}
                            />
                            <Text style={{ color: "#fff", fontSize: 12, marginLeft: width * 0.02 }}>
                                {moment(new Date(banner.createdAt)).format('MMMM')}  {moment(new Date(banner.createdAt)).date()}  {moment(new Date(banner.createdAt)).year()}
                            </Text>

                        </View>

                        {/* <Label
                            color={"#fff"}
                            // data={_time}
                            data={formatAMPM(new Date(banner.createdAt))}
                            size={12}
                        /> */}
                    </View>
                    <View style={{
                        flexDirection: 'row', width: '85%',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        marginBottom: 5,
                        // backgroundColor: 'red'
                    }}>
                        <View style={{ justifyContent: 'center' }}>

                            <Label
                                data={banner.bannerInfo.message}
                                color={"#fff"}
                                style={{ maxWidth: '80%', }}
                            />
                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: width * 0.02,
                            borderWidth: 2,
                            borderColor: Colors.light,
                            width: width * 0.17,
                            height: width * 0.17,
                            borderRadius: width * 0.17 / 2,
                            marginRight: width * 0.02


                        }}>
                            <Avatar
                                // source={require("../user1.jpeg")}
                                source={{ uri: banner.bannerInfo.logoUrl }}
                                size={65}
                                resizemode={"contain"}
                            />
                        </View>
                    </View>
                    <View style={{
                        width: '85%', alignSelf: 'center',
                        // backgroundColor: 'red',
                        // marginTop: -width * 0.01,
                        marginBottom: 5,

                    }}>
                        <Label
                            data={"Join Us Soon!"}
                            color={"#fff"}
                            size={22}
                            italic
                            style={{ marginTop: -10 }}
                        />
                    </View>

                </View>
                <ButtonView {...props} />
            </View>
        </ImageBackground >
    )
}

// Trainer Assigned banner
const TrainerBannerView = ({ ...props }) => {
    const banner = props.data;
    // console.log("Banner", banner)
    // const { _banner, _time } = data;
    return (
        <ImageBackground
            // source={require("../Assets/dummyImage.png")}
            style={{ height: width * 0.45, marginTop: 15 }}
            resizeMode={'cover'}
            imageStyle={{ borderRadius: 20, backgroundColor: Colors.challengeColor }}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 20, }}>
                <View style={{ flex: 1, padding: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label
                            color={"#fff"}
                            // data={_banner.title}  modify by keshav
                            data={banner.bannerInfo.title}
                            bold
                        />
                        <Label
                            color={"#fff"}
                            // data={_time}
                            data={formatAMPM(new Date(banner.createdAt))}
                            size={12}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={{ flex: 4, justifyContent: 'center' }}>
                            <Label
                                // data={_banner.desc}
                                data={banner.bannerInfo.message}
                                color={"#fff"}
                            />
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Avatar
                                // source={require("../user1.jpeg")}
                                source={{ uri: banner.bannerInfo.logoUrl }}
                                size={60}
                            />
                        </View>
                    </View>
                    <Label
                        data={"Improve!"}
                        color={"#fff"}
                        size={22}
                        italic
                    />
                </View>
                <ButtonView {...props} />
            </View>
        </ImageBackground>
    )
}

// Payment Banner
const PayBannerView = ({ ...props }) => {
    const banner = props.data;
    // console.log("Banner", banner)
    // const { _banner, _time } = data;
    return (
        <ImageBackground
            // source={require("../Assets/dummyImage.png")}
            style={{ height: width * 0.45, marginTop: 15 }}
            resizeMode={'cover'}
            imageStyle={{ borderRadius: 20, backgroundColor: Colors.payBanner_color }}
        >
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 20, }}>
                <View style={{ flex: 1, padding: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label
                            color={"#fff"}
                            // data={_banner.title}  modify by keshav
                            data={banner.bannerInfo.title}
                            bold
                        />
                        <Text style={{ color: "#fff", fontSize: 14, }}>
                            {moment(new Date(banner.createdAt)).format('MMMM')}  {moment(new Date(banner.createdAt)).date()}  {moment(new Date(banner.createdAt)).year()}
                        </Text>
                        {/* <Label
                            color={"#fff"}
                            // data={_time}
                            data={formatAMPM(new Date(banner.createdAt))}
                            size={12}
                        /> */}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={{ flex: 4, justifyContent: 'center' }}>
                            <Label
                                // data={_banner.desc}
                                data={banner.bannerInfo.message}
                                color={"#fff"}
                            />
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Avatar
                                // source={require("../user1.jpeg")}
                                source={{ uri: banner.bannerInfo.logoUrl }}
                                size={60}
                            />
                        </View>
                    </View>
                    <Label
                        data={"Improve!"}
                        color={"#fff"}
                        size={22}
                        italic
                    />
                </View>
                <ButtonView {...props} />
            </View>
        </ImageBackground>
    )
}

// Simple Message Banner
const SimpleMessageBannerView = ({ ...props }) => {
    const banner = props.data;
    // console.log("Banner", banner)
    // const { _banner, _time } = data;
    return (
        // <ImageBackground
        //     // source={require("../Assets/dummyImage.png")}
        //     style={{ height: width * 0.3, marginTop: 15 }}
        //     resizeMode={'cover'}
        //     imageStyle={{ borderRadius: 20, backgroundColor: Colors.grey }}
        // >
        <View style={{
            height: width * 0.25, marginTop: 15, borderRadius: 20, justifyContent: 'center',
            width: '90%'
        }}>
            {/* <View style={{ flex: 1, padding: 15 }}> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                <View style={{ marginBottom: 10 }}>
                    <Image
                        source={require("../../../Images/msg_icon.png")}
                        style={{ height: width * 0.12, }}
                        resizeMode={"contain"}
                    />
                </View>
                <View style={{
                    marginHorizontal: width * 0.02,
                    width: '80%'
                }}>
                    <Text style={{ color: Colors.titleLabelColor, fontSize: 10, lineHeight: 12, }}>
                        {moment(new Date(banner.createdAt)).format('MMMM')}  {moment(new Date(banner.createdAt)).date()}  {moment(new Date(banner.createdAt)).year()}
                    </Text>
                    <Label
                        data={banner.bannerInfo.message}
                        color={"#fff"}
                        style={{
                            marginTop: width * 0.01,
                        }}
                    />
                </View>
                {/* <Label
                        color={"#fff"}
                        // data={_banner.title}  modify by keshav
                        data={banner.bannerInfo.title}
                        bold
                    />
                    <Label
                        color={"#fff"}
                        // data={_time}
                        data={formatAMPM(new Date(banner.createdAt))}
                        size={12}
                    /> */}
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <Label
                            // data={_banner.desc}
                            data={banner.bannerInfo.message}
                            color={"#fff"}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Avatar
                            // source={require("../user1.jpeg")}
                            source={{ uri: banner.bannerInfo.logoUrl }}
                            size={60}
                        />
                    </View>
                </View> */}
            {/* <Label
                    data={"Improve!"}
                    color={"#fff"}
                    size={22}
                    italic
                /> */}
            {/* </View> */}
            {/* <ButtonView {...props} /> */}
        </View>
        // </ImageBackground>
    )
}

// Challenege Assigned Banner
const ChallengeAssignView = ({ ...props }) => {
    const banner = props.data;
    // console.log("Banner", banner)
    const { onTeamInvitationAction, onChallengeAction } = props;
    const handleChallengePress = () => {
        onChallengeAction(banner.bannerInfo.entityId);
    }
    // const { _banner, _time } = data;
    return (
        <TouchableOpacity
            onPress={handleChallengePress}
            activeOpacity={1}
            style={{ width: '98%', marginLeft: width * 0.01 }}
        >
            <ImageBackground
                // source={require("../Assets/dummyImage.png")}
                source={{ uri: banner.bannerInfo.videoInfo.thumbnailUrl }}
                style={{
                    height: width * 0.43,
                    marginTop: 5, marginBottom: 5, opacity: 0.8
                }}
                resizeMode={'cover'}
                imageStyle={{ borderRadius: 20, }}
            >

                {/* <Image style={{
                    position: 'absolute',
                    width: '100%', height: "100%", borderTopLeftRadius: 5, borderTopRightRadius: 5
                }}
                    resizeMode={'stretch'}
                    source={require('../../Images/dummy1.png')}
                    source={{ uri: data?.trailerVideoUrl?.thumbnailUrl }}
                >

                </Image> */}
                {/* <Image style={{
                    position: 'absolute', width: '100%', height: '100%', left: 0

                }}
                    resizeMode={"contain"}
                    source={require('../../../Images/Rect_dummy.png')} >

                </Image> */}

                <Image style={{
                    width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center',
                }} source={require('../../../Images/play_ico.png')} >
                </Image>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                    <Text style={{
                        color: Colors.light, fontSize: 25, lineHeight: 25, fontFamily: Fonts.Bold, marginLeft: 10,
                    }}>
                        {banner.bannerInfo.title}
                    </Text>

                </View>
                <Text style={{
                    color: Colors.light,
                    fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
                    width: width * 0.78, alignSelf: 'center',
                    textAlign: 'center', opacity: 1,
                }} numberOfLines={2} >
                    {banner.bannerInfo.message}
                </Text>

                {/* <View style={{ flexDirection: 'row', marginTop: width * 0.04 }}>
                    <Image style={{
                        position: 'absolute', width: "100%", height: width * 0.1, borderRadius: width * 0.01,
                    }} source={require('../../../Images/Pro.png')} ></Image>
                    <Image style={{
                        width: 20, height: 20, marginLeft: width * 0.08, marginTop: width * 0.02
                    }} source={require('../../../Images/bulb.png')} ></Image>
                    <Text style={{
                        color: Colors.light, fontSize: 14, lineHeight: 15,
                        fontFamily: Fonts.SemiBold, marginTop: width * 0.03, textAlign: 'center', fontStyle: 'italic'
                    }}>   Pro Tip:</Text>
                    <Text style={{
                        color: Colors.light, fontSize: 13, lineHeight: 14, fontFamily: Fonts.Regular,
                        marginTop: width * 0.03, textAlign: 'center', fontStyle: 'italic'
                    }}>
                        {banner.bannerInfo.proTips}
                    </Text>
                </View> */}







                {/* <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 20, }}>
                <View style={{ flex: 1, padding: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label
                            color={"#fff"}
                            // data={_banner.title}  modify by keshav
                            data={banner.bannerInfo.title}
                            bold
                            st
                        />
                        <Label
                            color={"#fff"}
                            // data={_time}
                            data={formatAMPM(new Date(banner.createdAt))}
                            size={12}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={{ flex: 4, justifyContent: 'center' }}>
                            <Label
                                // data={_banner.desc}
                                data={banner.bannerInfo.message}
                                color={"#fff"}
                            />
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Avatar
                                // source={require("../user1.jpeg")}
                                source={{ uri: banner.bannerInfo.logoUrl }}
                                size={60}
                            />
                        </View>
                    </View>
                    {/* <Label
                        data={"Improve!"}
                        color={"#fff"}
                        size={22}
                        italic
                    /> */}
                {/* </View> */}
                {/* </View> */}
            </ImageBackground>
        </TouchableOpacity>
    )
}


const BannerView = ({ ...props }) => {
    const data = props.data;
    const bannerVisibleFor = data.bannerInfo.bannerVisibleFor;
    debugger;
    let bannerToShow = null;

    if (data.bannerInfo.typeOfBanner === "TEAM_INVITATION" && bannerVisibleFor === SenderRecevrModel.senderType) {
        bannerToShow = <TeamInvitationBannerView {...props} />
    }
    else if (data.bannerInfo.typeOfBanner === "COMMON_MESSAGE" && bannerVisibleFor === SenderRecevrModel.senderType) {
        bannerToShow = <SimpleMessageBannerView {...props} />
    } else if (data.bannerInfo.typeOfBanner === "CHALLENGE_REQUESTED" && bannerVisibleFor === SenderRecevrModel.senderType) {
        bannerToShow = <ChallengeAssignView {...props} />
    }




    // if (data.bannerInfo.typeOfBanner === "TEAM_INVITATION" || data.bannerInfo.typeOfBanner === "COMMON_MESSAGE") {
    //     if (bannerVisibleFor === "PLAYER" && SenderRecevrModel.senderType === "PLAYER") {
    //         if (data.bannerInfo.typeOfBanner === "COMMON_MESSAGE") {
    //             bannerToShow = <SimpleMessageBannerView {...props} />
    //         } else {
    //             bannerToShow = <TeamInvitationBannerView {...props} />
    //         }
    //     } else if ((bannerVisibleFor === "COACH" && SenderRecevrModel.senderType === "COACH")) {
    //         bannerToShow = <SimpleMessageBannerView {...props} />
    //     }
    // }
    // else if (data.bannerInfo.typeOfBanner === "CHALLENGE_REQUESTED") {
    //     if (bannerVisibleFor === "PLAYER" && SenderRecevrModel.senderType === "PLAYER") {
    //         if (data.bannerInfo.typeOfBanner === "COMMON_MESSAGE") {
    //             bannerToShow = <SimpleMessageBannerView {...props} />
    //         } else {
    //             bannerToShow = <TeamInvitationBannerView {...props} />
    //         }
    //     }
    // }
    // else if (data.bannerInfo.typeOfBanner === "TRAINER_ASSIGNED" || data.bannerInfo.typeOfBanner === "COMMON_MESSAGE") {
    //     if (bannerVisibleFor === "PLAYER" && SenderRecevrModel.senderType === "PLAYER") {
    //         bannerToShow = <TrainerBannerView {...props} />
    //     } else if ((bannerVisibleFor === "COACH" && SenderRecevrModel.senderType === "COACH")) {
    //         bannerToShow = <SimpleMessageBannerView {...props} />
    //     } else if ((bannerVisibleFor === "TRAINER" && SenderRecevrModel.senderType === "TRAINER")) {
    //         bannerToShow = <SimpleMessageBannerView {...props} />
    //     }

    // }

    return bannerToShow;
}


export {
    BannerView
}

