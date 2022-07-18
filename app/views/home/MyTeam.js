import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
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
import isValidEmail from '../../utils/isValidEmail';

import { characterLimit, selectedUserType, UserModel } from '../../constants/constant';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import { isNotch } from '../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { color } from 'react-native-reanimated';
import { getObject } from '../../middleware';
import { myTeamDetail } from '../../actions/home';
import FastImage from 'react-native-fast-image';

let wide = Layout.width;
class MyTeam extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentDidMount() {

        this.setState({ loading: false }, () => {
            this.props.dispatch(myTeamDetail(this.props.navigation.state.params.teamId, (res) => {
                this.setState({ loading: false })
            }))
        })


    }

    _renderTeam = (item) => {

        return (
            <View style={{
                height: wide * 0.08,
                marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20
            }}
            >

                <Image
                    source={require("../../Images/avatar.png")}
                    // resizeMode="contain"
                    style={{ width: wide * 0.08, height: '100%', borderRadius: (wide * 0.08) / 2, }}
                ></Image>
                <View style={{ paddingHorizontal: 8, flex: 1 }}>
                    <Text numberOfLines={2} style={{
                        color: Colors.light, fontSize: 12,
                        lineHeight: 12, fontFamily: Fonts.Bold, width: wide * 0.12
                    }}>{item.item.firstName} {item.item.lastName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            color: Colors.light, fontSize: 11,
                            lineHeight: 14, fontFamily: Fonts.Regular
                        }}>{item.item.position} | #{item.item.ranking} | </Text>

                        <Image
                            source={item.item.improving ? require("../../Images/upArrow.png") : require("../../Images/downArrow.png")}

                            // resizeMode="contain"
                            style={{ width: wide * 0.02, height: wide * 0.02 }}
                        ></Image>
                    </View>
                </View>
                <FlatList
                    horizontal
                    scrollEnabled={false}
                    style={{ marginLeft: wide * 0.001 }}
                    data={item.item.kpiValues}
                    renderItem={(item, index) => <Text style={{
                        color: Colors.light, fontSize: 12,
                        lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: wide * 0.1
                    }}>{item.item}</Text>}

                />
                {/* <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: wide * 0.1
                }}>38.2</Text>
                <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: wide * 0.1
                }}>38.2</Text>
                <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: wide * 0.1
                }}>38.2</Text>
                <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: wide * 0.1
                }}>38.2</Text>
                <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: wide * 0.1
                }}>38.2</Text>
                <Text style={{
                    color: Colors.light, fontSize: 12,
                    lineHeight: 16, fontFamily: Fonts.SemiBold, paddingHorizontal: 5, width: wide * 0.1
                }}>38.2</Text> */}

            </View>

        );
    };
    render() {
        const { myTeamDetailData } = this.props.Home
        console.log('My Team--->> ', myTeamDetailData);

        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>
                    <AppLoader visible={this.state.loading} />
                    <TouchableOpacity style={{ width: wide * 0.1 }} onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                        paddingBottom: isNotch ? 0 : 10, marginHorizontal: 15
                    }}>

                        <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >

                            <View style={{ marginTop: wide * 0.08 }}>

                                <Text style={{

                                    color: Colors.light, fontSize: 30,
                                    fontFamily: Fonts.Regular, lineHeight: 40
                                }}>
                                    My

                                </Text>
                                <Text style={{
                                    color: Colors.light, fontSize: 30, lineHeight: 36, fontFamily: Fonts.Bold
                                }}>
                                    Team
                                </Text>

                            </View>



                            <View style={{ marginTop: wide * 0.08 }}>
                                <Image style={{
                                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%'
                                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{
                                        width: wide * 0.23, height: wide * 0.32,
                                        marginTop: 10, borderRadius: wide * 0.03, borderWidth: 3,
                                        borderColor: Colors.borderColor, marginLeft: wide * 0.02,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <FastImage

                                            style={{ width: '80%', height: '80%', }} resizeMode={'contain'}
                                            source={{ uri: myTeamDetailData?.teamLogoUrl }}
                                        />
                                        {/* <Image style={{ width: '80%', height: '80%', }} resizeMode={'contain'}
                                            source={{ uri: myTeamDetailData?.teamLogoUrl }} /> */}
                                    </View>

                                    <View style={{ marginLeft: wide * 0.02 }}>
                                        <Text style={{
                                            color: Colors.light, fontSize: 16, fontFamily: Fonts.SemiBold,
                                            width: wide * 0.16,
                                        }}>{myTeamDetailData?.name}</Text>
                                        <Text style={{
                                            color: Colors.light, fontSize: 40, fontFamily: Fonts.SemiBold,

                                        }}>{myTeamDetailData?.stats?.rankBasedUponCurrentLocation}</Text>
                                    </View>
                                    <View style={{
                                        marginHorizontal: wide * 0.02,
                                        flex: 1
                                    }}>
                                        <View >
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}>
                                                <View >
                                                    <Text style={{
                                                        color: Colors.fontColorGray,
                                                        fontSize: 12, fontFamily: Fonts.Bold,

                                                    }}>WIN</Text>
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                                                        marginTop: 6,
                                                    }}>
                                                        {myTeamDetailData?.stats?.wins}
                                                    </Text>
                                                </View>
                                                <View >
                                                    <Text style={{
                                                        color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,

                                                    }}>LOSS</Text>
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                                                        marginTop: 6,
                                                    }}>
                                                        {myTeamDetailData?.stats?.loss}
                                                    </Text>
                                                </View>
                                                <View >
                                                    <Text style={{
                                                        color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,

                                                    }}>WIN%</Text>
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                                                        marginTop: 6,
                                                    }}>
                                                        {myTeamDetailData?.stats?.winPercentage}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                width: '100%', marginTop: wide * 0.06
                                            }}>

                                                <View >
                                                    <Text style={{
                                                        color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,

                                                    }}>STREAK</Text>
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                                                        marginTop: 6,
                                                    }}>
                                                        {myTeamDetailData?.stats?.streak}
                                                    </Text>
                                                </View>
                                                <View style={{ marginLeft: 8 }}>
                                                    <Text style={{
                                                        color: Colors.fontColorGray, fontSize: 12, fontFamily: Fonts.Bold,

                                                    }}>LAST 10</Text>
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
                                                        marginTop: 6,
                                                    }}>
                                                        {myTeamDetailData?.stats?.lastMatches}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            </View>


                            <ScrollView horizontal>
                                <FlatList
                                    scrollEnabled={false}
                                    style={{ marginTop: wide * 0.08 }}
                                    data={myTeamDetailData?.teamPlayersInfo}
                                    renderItem={(item, index) => this._renderTeam(item, index)}
                                    stickyHeaderIndices={[0]}
                                    ListHeaderComponent={() => <View style={{
                                        height: wide * 0.08,
                                        paddingVertical: 5, flexDirection: 'row',
                                        justifyContent: 'space-between', backgroundColor: Colors.base
                                    }}
                                    >

                                        <View style={{ paddingHorizontal: 5 }}>
                                            <Text style={{
                                                color: Colors.fontGray, fontSize: 12,
                                                lineHeight: 16, fontFamily: Fonts.Bold
                                            }}>PLAYERS</Text>
                                        </View>
                                        <FlatList
                                            horizontal
                                            scrollEnabled={false}
                                            style={{ marginLeft: wide * 0.12 }}
                                            data={myTeamDetailData?.kpi}
                                            renderItem={(item, index) => <Text style={{
                                                color: Colors.fontGray, fontSize: 12,
                                                lineHeight: 16, fontFamily: Fonts.Bold,
                                                paddingHorizontal: 5,
                                                width: wide * 0.1,
                                            }}>{item.item}</Text>}

                                        />



                                        {/* <Text style={{
                                            color: Colors.fontGray, fontSize: 12,
                                            lineHeight: 16, fontFamily: Fonts.Bold, paddingHorizontal: 5,
                                             width: wide * 0.1
                                        }}>FG</Text>
                                        <Text style={{
                                            color: Colors.fontGray, fontSize: 12,
                                            lineHeight: 16, fontFamily: Fonts.Bold, paddingHorizontal: 5, width: wide * 0.1
                                        }}>PTS</Text>
                                        <Text style={{
                                            color: Colors.fontGray, fontSize: 12,
                                            lineHeight: 16, fontFamily: Fonts.Bold, paddingHorizontal: 5, width: wide * 0.1
                                        }}>FG%</Text>
                                        <Text style={{
                                            color: Colors.fontGray, fontSize: 12,
                                            lineHeight: 16, fontFamily: Fonts.Bold, paddingHorizontal: 5, width: wide * 0.1
                                        }}>3P%</Text>
                                        <Text style={{
                                            color: Colors.fontGray, fontSize: 12,
                                            lineHeight: 16, fontFamily: Fonts.Bold, paddingHorizontal: 5, width: wide * 0.1
                                        }}>FT%</Text> */}


                                    </View>}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </ScrollView>
                        </View>

                        <AppLoader visible={this.state.loading} />
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView >
        );
    }
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        Home: entities.homePlayer
    };
}

export default connect(mapStateToProps)(MyTeam);
