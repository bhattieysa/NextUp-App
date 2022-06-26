
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../../constants';

import Navigation from '../../../lib/Navigation';

import AppLoader from '../../../utils/Apploader';

import { login } from '../../../actions/auth';
import { connect } from 'react-redux';

let wide = Layout.width;
class RoadToProLevel extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,

            arrLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]
        };
    }
    componentDidMount() {



    }

    _renderLevel = (item, index) => {
        return (
            <View style={{ height: wide * 0.5, }}>
                <View style={{
                    width: wide * 0.23, height: wide * 0.32,
                    marginTop: 24, borderRadius: wide * 0.03, borderWidth: 3,
                    borderColor: Colors.borderColor, marginLeft: wide * 0.05,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image style={{
                        width: '60%', height: '60%', tintColor: item.index === 0 ? Colors.stars :
                            item.index === 1 ?
                                Colors.light : Colors.overlayWhite
                    }} resizeMode={'contain'}
                        source={require('../../../Images/level_gold.png')} />
                    <Text style={{
                        color: item.index === 1 || item.index === 0 ? Colors.light : Colors.overlayWhite, fontSize: 12, fontFamily: Fonts.Bold,
                        marginLeft: 5, marginTop: wide * 0.03
                    }}>
                        Level {item.index + 1}
                    </Text>

                </View>
                <View style={{
                    height: wide * 0.1, width: '100%',
                    justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0
                }}>
                    <View style={{
                        width: '100%', height: wide * 0.02,
                        backgroundColor: Colors.borderColor,

                        justifyContent: 'center', alignItems: 'center',
                        borderTopLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                        borderBottomLeftRadius: item.index === 0 ? wide * 0.02 / 2 : 0,
                        left: item.index === 0 ? wide * 0.1 / 2 : 0,
                        borderTopRightRadius: this.state.arrLevels.length > 0 ? item.index === this.state.arrLevels.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                        borderBottomRightRadius: this.state.arrLevels.length > 0 ? item.index === this.state.arrLevels.length - 1 ? wide * 0.02 / 2 : 0 : 0,
                        Right: this.state.arrLevels.length > 0 ? item.index === this.state.arrLevels.length - 1 ? wide * 0.1 / 2 : 0 : 0,
                    }}>


                    </View>
                    <Image style={{
                        width: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07, height: item.index === 0 || item.index === 1 ? wide * 0.05 : wide * 0.07, position: 'absolute', left: wide * 0.14,
                        tintColor: item.index === 0 ? Colors.stars : item.index === 1 ? Colors.shade : null
                    }} resizeMode={'contain'}
                        source={item.index === 0 || item.index === 1 ? require('../../../Images/tick_selected.png') : require('../../../Images/lock_circle.png')} />
                </View>
            </View>
        );
    };


    render() {

        const params = this.props.navigation.state.params;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>


                    <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >



                        <View style={{ marginTop: wide * 0.02 }}>
                            <FlatList
                                style={{ overflow: 'visible' }}
                                data={this.state.arrLevels}
                                renderItem={(item, index) => this._renderLevel(item, index)}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            />

                        </View>
                        <Text style={{
                            fontSize: 24, fontFamily: Fonts.Bold,
                            marginLeft: 15, marginTop: wide * 0.07, color: Colors.light
                        }}>
                            Level 1
                        </Text>
                        <View style={{
                            marginTop: wide * 0.05,
                            // height: wide * 0.44,
                            backgroundColor: Colors.blackShade,
                            marginHorizontal: 15, borderTopLeftRadius: wide * 0.1,
                            borderTopRightRadius: wide * 0.1, borderBottomLeftRadius: wide * 0.05,
                            borderBottomRightRadius: wide * 0.1, flexDirection: 'row', paddingBottom: wide * 0.05,
                        }}>
                            <Image style={{
                                width: '30%', height: '40%', tintColor:
                                    Colors.light, marginTop: wide * 0.07
                            }} resizeMode={'contain'}
                                source={require('../../../Images/level_gold.png')} />
                            <Text style={{
                                color: Colors.light, fontSize: 16, fontFamily: Fonts.Regular,
                                marginTop: wide * 0.03, lineHeight: 18, width: wide * 0.6, marginTop: wide * 0.05
                            }}>This is your chance to become a better player. This level constitutes of 10 challenges which will help you develop the basic knowledge of the game. Make you a better dribbler and make you ready for the challenges in the game ahead.</Text>

                        </View>
                        <TouchableOpacity

                            style={{
                                width: '90%', height: 56,
                                backgroundColor: Colors.btnBg,
                                alignSelf: 'center', borderRadius: 28,
                                justifyContent: 'center', marginTop: 30, paddingHorizontal: 15,
                                position: "absolute",
                                bottom: 20
                            }} onPress={() => {
                                Navigation.navigate('PlayerRoadToProUpgrade', { type: "Player" })
                            }}>
                            <Text style={{
                                alignSelf: 'center', color: Colors.light,
                                fontFamily: Fonts.Bold, fontSize: 16
                            }}>Get Monthly Subscription</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>

            </SafeAreaView >
        );
    }
}

function mapStateToProps(state) {
    const { entities } = state;
    return {
        authReducer: state.authReducer,
        User: entities.user,
        Home: entities.home
    };
}

export default connect(mapStateToProps)(RoadToProLevel);
