import React, { Component, useState } from 'react';
import {
    View, TouchableOpacity, Text, SafeAreaView,
    Image, key, KeyboardAvoidingView, FlatList, StyleSheet, ImageBackground, ActionSheetIOS, Modal
} from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';
import AppLoader from '../../utils/Apploader';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import VideoPlay from '../../components/common/VideoPlay';

let wide = Layout.width;

export default class TrainerChallenges extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,
            rating: 2,
            isApproved: false,
            show: false,
            txtNotes: ''

        };
    }
    _renderVideo = () => {
        return (
            <View style={{ paddingBottom: 50, marginTop: wide * 0.02, justifyContent: 'center' }} >
                <Image style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: wide * 0.5, borderRadius: wide * 0.01
                }} source={require('../../Images/dummy1.png')} >

                </Image>
                <TouchableOpacity onPress={() => this.setState({ show: true })}>
                    <Image style={{
                        width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: wide * 0.09
                    }} source={require('../../Images/play_ico.png')} ></Image>
                </TouchableOpacity>
            </View>
        )
    }
    _renderUserCat = (item, index) => {
        return (
            <TouchableOpacity style={{
                height: wide * 0.4,
                justifyContent: 'center',
                alignItems: 'center', paddingRight: 20, top: -10
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: item.index })}
            >


                <View style={{ justifyContent: 'center', opacity: this.state.selectedIndex === item.index ? 1 : 0.5 }}>
                    {
                        this.state.selectedIndex == item.index ?
                            <Image style={{
                                position: 'absolute', width: 20, height: 20, backgroundColor: Colors.light,
                                borderRadius: (wide * 0.2) / 2, tintColor: Colors.btnBg, zIndex: 99, left: 60, top: 0
                            }}
                                // resizeMode={'contain'}
                                source={require('../../Images/tick.png')} />
                            : null
                    }
                    <View style={{
                        width: wide * 0.2, height: wide * 0.2,
                        borderRadius: (wide * 0.2) / 2, borderWidth: 3,
                        borderColor: Colors.borderColor,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image style={{ width: '100%', height: '100%', borderRadius: (wide * 0.2) / 2 }}
                            // resizeMode={'contain'}
                            source={require('../../Images/avatar.png')} />
                    </View>
                    <Text numberOfLines={2} style={{
                        color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray, fontSize: 18, lineHeight: 22,
                        fontFamily: Fonts.SemiBold, textAlign: 'center', top: 10
                    }}>Coach</Text>
                    <Text numberOfLines={2} style={{
                        color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray, fontSize: 12, lineHeight: 14,
                        fontFamily: Fonts.Regular, textAlign: 'center', top: 10, fontStyle: 'italic'

                    }}>#31/c</Text>


                </View>
                {/* <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View> */}



            </TouchableOpacity>
        );
    };
    render() {
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                {/* <View style={{ marginHorizontal: 32, }}>
                    <TouchableOpacity onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                </View> */}

                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        marginHorizontal: 15,
                        minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
                    }}>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between', zIndex: 99, marginHorizontal: 15
                            }}>
                                <TouchableOpacity onPress={() => Navigation.back()}>
                                    <Image style={
                                        styles.BackIcon
                                    }
                                        source={require('../../Images/back_ico.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Image style={
                                        {
                                            width: wide * 0.07, height: wide * 0.07,

                                            tintColor: 'white'
                                        }
                                    } source={require('../../Images/forward_ico.png')} />
                                </TouchableOpacity>
                            </View>
                            <Image style={{
                                position: 'absolute', top: 0, bottom: 0,
                                left: 0, right: 0, width: '100%', height: wide * 0.5
                            }} resizeMode={'stretch'} source={require('../../Images/dummy1.png')} >

                            </Image>

                            <TouchableOpacity>
                                <Image style={{
                                    width: 80, height: 80, alignContent: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: wide * 0.03
                                }} source={require('../../Images/play_ico.png')} ></Image>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{
                                    color: Colors.white_08, fontSize: 32,
                                    fontFamily: Fonts.Regular, lineHeight: 40, marginLeft: 15,
                                }}>
                                    Dribble
            </Text>
                                <Text style={{
                                    color: Colors.light, fontSize: 32, lineHeight: 40, fontFamily: Fonts.Bold, marginLeft: 10,
                                }}>
                                    Challenge
            </Text>

                            </View>
                            <Text style={{
                                color: Colors.light,
                                fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
                                width: wide * 0.78, alignSelf: 'center',
                                textAlign: 'center', marginTop: wide * 0.01, opacity: 1
                            }}>Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit. Etiam vitae turpis libero.</Text>
                            <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                                <Image style={{
                                    position: 'absolute', width: "100%", height: 35, marginTop: wide * 0.05, top: 0, bottom: 0, left: 0, right: 0, borderRadius: wide * 0.01,
                                }} source={require('../../Images/Pro.png')} ></Image>
                                <Image style={{
                                    width: 20, height: 20, top: 27, marginLeft: wide * 0.08
                                }} source={require('../../Images/bulb.png')} ></Image>
                                <Text style={{
                                    color: Colors.light, fontSize: 14, lineHeight: 15,
                                    fontFamily: Fonts.SemiBold, marginTop: wide * 0.073, textAlign: 'center', fontStyle: 'italic'
                                }}>   Pro Tip:</Text>
                                <Text style={{
                                    color: Colors.light, fontSize: 13, lineHeight: 14, fontFamily: Fonts.Regular,
                                    marginTop: wide * 0.075, textAlign: 'center', fontStyle: 'italic'
                                }}>Try from your right side of the court</Text>
                            </View>
                            <View style={{ marginHorizontal: 15 }}>
                                <View style={{
                                    backgroundColor: Colors.base, marginTop: wide * 0.1,
                                    marginHorizontal: 0
                                }}>
                                    <Text style={styles.mediumHeaderText}>
                                        Choose Player </Text>
                                </View>
                                <View >
                                    <FlatList
                                        // style={{ marginLeft: 15 }}
                                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9,]}
                                        renderItem={(item, index) => this._renderUserCat(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        style={{ overflow: 'visible' }}
                                    />
                                </View>
                                <RecentCards
                                    action1={() => this.setState({ isApproved: true })}
                                    action={() => this.setState({ isApproved: false })}
                                    // 
                                    isApprove={this.state.isApproved} />
                                {this.state.isApproved ? <View>

                                    <View style={{ flexDirection: 'row', marginTop: wide * 0.05 }}>
                                        <Text style={{
                                            color: Colors.light, fontSize: 20,
                                            lineHeight: 22, fontFamily: Fonts.Bold
                                        }}>
                                            Ratings  </Text>
                                        <View style={{ flex: 1 }} />
                                        <Text style={{
                                            color: Colors.light, fontSize: 15,
                                            lineHeight: 26, fontFamily: Fonts.SemiBold,
                                            fontStyle: 'italic',
                                        }}>
                                            {this.state.rating} Star  </Text>


                                    </View>



                                    <StarRating
                                        count={this.state.rating}
                                        changedCount={(e) => this.setState({ rating: e })} />


                                    <View style={{
                                        backgroundColor: Colors.base,
                                        marginTop: wide * 0.08, justifyContent: 'space-between'
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                                Notes  </Text>
                                            <View style={{ flex: 1 }} />
                                            <Text style={{
                                                color: Colors.light, fontSize: 15,
                                                lineHeight: 26, fontFamily: Fonts.SemiBold, fontStyle: 'italic'
                                            }}>
                                                {this.state.txtNotes.length}/260 </Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: Colors.base,
                                            borderRadius: wide * 0.01, flexDirection: 'row', borderWidth: 3, borderColor: Colors.blackShade,
                                            justifyContent: 'center', alignItems: 'center',
                                            height: wide * 0.3, marginTop: wide * 0.03
                                        }}>
                                            <TextInput
                                                style={{
                                                    color: Colors.light, paddingRight: 15, width: '100%',
                                                    height: wide * 0.3, fontFamily: Fonts.SemiBold, paddingTop: 15,
                                                    paddingLeft: 15, lineHeight: 16,
                                                }}
                                                value={this.state.txtNotes}
                                                onChangeText={(val) => this.setState({ txtNotes: val })}
                                                maxLength={260}
                                                multiline
                                                textAlignVertical={'top'}
                                            />
                                        </View>

                                    </View>
                                </View> : <></>}


                                <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06 }}>
                                    {/* <View style={{ flexDirection: 'row' }}> */}
                                    <Text style={{ color: Colors.light, fontSize: 24, lineHeight: 26, fontFamily: Fonts.Bold }}>
                                        Previous Attempt (1)   </Text>
                                    {/* </View> */}

                                </View>
                                <FlatList
                                    style={{
                                        marginBottom: 15
                                    }}
                                    data={[1,]}
                                    renderItem={(item, index) => this._renderVideo()
                                    }
                                    showsHorizontalScrollIndicator={false}
                                    vertical />
                                {this.state.isApproved ? <TouchableOpacity
                                    // key={isbtnEnable}
                                    style={{
                                        width: wide * 0.8, height: 48,
                                        backgroundColor: Colors.btnBg,
                                        alignSelf: 'center', borderRadius: 24, opacity: 1,
                                        justifyContent: 'center', bottom: 0,
                                    }}>
                                    <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Done</Text>
                                </TouchableOpacity> : <></>}


                            </View>
                        </View>

                    </ScrollView>
                    <Modal visible={this.state.show}>
                        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: wide * 0.1, zIndex: 99, position: 'absolute'
                            }}>
                                <TouchableOpacity onPress={() => this.setState({ show: false })}>
                                    <Image style={
                                        [styles.BackIcon, { marginTop: wide * 0.05, marginLeft: 15 }]
                                    }
                                        source={require('../../Images/back_ico.png')}
                                    />
                                </TouchableOpacity>

                            </View>
                            <VideoPlay
                                source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}

                                sty={{ height: wide * 0.6, width: wide, position: 'relative' }}
                            />
                            <View style={{
                                backgroundColor: Colors.base, marginHorizontal: 15,
                                justifyContent: 'space-between', marginTop: wide * 0.1
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                        Player Remark:  </Text>
                                    <View style={{ width: wide * 0.38 }} />
                                    <Text style={{ color: Colors.light, fontSize: 11, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                        Jan 13, 2021</Text>
                                </View>
                                <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    I hope I did best in this challenge</Text>
                                <View style={{ backgroundColor: Colors.grey, height: 0.5, width: wide * 0.9, top: 20 }} />

                                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                    <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.Bold }}>
                                        Notes:  </Text>
                                </View>
                                <Text style={{ color: Colors.light, fontSize: 14, top: 10, lineHeight: 15, fontFamily: Fonts.Regular, fontStyle: 'italic' }}>
                                    Improve your speed</Text>
                            </View>
                        </SafeAreaView>
                    </Modal>
                </KeyboardAvoidingView >
            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    BackIcon: {
        width: wide * 0.09, height: wide * 0.09,
        borderRadius: wide * 0.03, borderWidth: 1,
        borderColor: Colors.borderColor,
    },
    mediumHeaderText: {

        color: Colors.light, fontSize: 23, lineHeight: 26, fontFamily: Fonts.SemiBold

    },
})
export const RecentCards = ({ isApprove, action1, action }) => {
    return (
        <ImageBackground style={{

            position: 'relative', marginTop: wide * 0.03, bottom: 0,
            left: 0, right: 0, width: '100%', justifyContent: 'center', paddingVertical: wide * 0.03
        }} resizeMode={'stretch'} source={require('../../Images/dummy2.png')} >
            <View style={{ flexDirection: 'row', width: '100%' }}>

                <View>
                    <Text style={{
                        color: Colors.light, fontSize: 23, lineHeight: 26,
                        fontFamily: Fonts.Bold, marginLeft: 20, marginTop: 8
                    }}>
                        Recent Attempt  </Text>
                    <View style={{ flexDirection: 'row', top: 5 }}>
                        <Text
                            numberOfLines={2}
                            style={{
                                color: Colors.light, fontSize: 15, lineHeight: 20,
                                fontFamily: Fonts.SemiBold, marginLeft: 20
                            }}>
                            Remark: </Text>
                        <Text
                            numberOfLines={2}
                            style={{
                                color: Colors.light, fontSize: 15, lineHeight: 20,
                                width: wide * 0.3, fontFamily: Fonts.Regular,
                            }}>
                            I hope I did best Challenge </Text>

                    </View>
                    <Text style={{
                        color: Colors.light, fontSize: 12, lineHeight: 20, marginTop: wide * 0.05
                        , fontFamily: Fonts.Regular, marginLeft: 20, fontStyle: 'italic'
                    }}>
                        Jan 14, 2021  </Text>

                </View>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity >
                    <Image style={{
                        width: 80, height: 80, top: -5,
                    }} source={require('../../Images/play_ico.png')} ></Image>
                </TouchableOpacity>
            </View >


            {isApprove ? <Text style={{
                color: Colors.light, fontSize: 20, lineHeight: 20, marginTop: 0
                , fontFamily: Fonts.Bold, alignSelf: 'flex-end', marginRight: 20
            }}>
                Approved  </Text> : <></>}


            {!isApprove ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wide * 0.02, marginHorizontal: 20 }}>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.light,
                        borderRadius: wide * 0.01, flexDirection: 'row', borderWidth: 2, borderColor: 'white',
                        justifyContent: 'center', alignItems: 'center', width: '48%', height: wide * 0.09
                    }}
                        onPress={action1}
                    >
                        <Text style={{
                            color: Colors.btnBg, fontSize: 15, fontFamily: Fonts.Regular,
                            lineHeight: 15, textAlign: 'center',
                        }} >Approve</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        // backgroundColor: Colors.base,
                        borderRadius: wide * 0.01, flexDirection: 'row', borderWidth: 2, borderColor: 'white',
                        justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '48%'
                        , height: wide * 0.09
                    }}
                        onPress={action}
                    >

                        <Text style={{
                            color: Colors.light, fontSize: 15, fontFamily: Fonts.SemiBold,
                            lineHeight: 15, textAlign: 'center',
                        }} >Decline</Text>
                    </TouchableOpacity>
                </View>
                : <></>}




        </ImageBackground >
    )

}

const StarRating = ({ count, changedCount }) => {
    const [currCount, onChange] = useState(count)
    return <View style={{ flexDirection: 'row', justifyContent: 'space-around', bottom: 30 }}>
        {[1, 2, 3, 4, 5].map((item, index) => <TouchableOpacity style={{ marginTop: wide * 0.1 }} onPress={() => {

            onChange(index + 1);
            changedCount(index + 1)
        }}>
            <Image
                source={index < currCount ? require('../../Images/BallSelected.png') : require('../../Images/BallUnselect.png')}
                style={{ height: 30, width: 30, justifyContent: 'space-around' }}
            />
        </TouchableOpacity>)}
    </View>
}