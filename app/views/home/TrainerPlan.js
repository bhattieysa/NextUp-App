import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList } from 'react-native';
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

let wide = Layout.width;
class TrainerPlan extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedPlanIndex: 0,
            selectedIndex: 0
        };
    }
    componentDidMount() {
    }

    _renderPlan = (item, index) => {
        return (
            <TouchableOpacity style={{
                height: wide * 0.2,
                justifyContent: 'center',
                alignItems: 'center', paddingRight: 20
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: item.index })}
            >


                <Text numberOfLines={2} style={{
                    color: this.state.selectedIndex === item.index ? Colors.light : Colors.fontColorGray, fontSize: 18, height: 45, lineHeight: 22,
                    fontFamily: Fonts.SemiBold, width: wide * 0.15, textAlign: 'center'
                }}>Point Gaurd</Text>
                <View style={{ height: 3, backgroundColor: this.state.selectedIndex === item.index ? Colors.light : 'transparent', width: wide * 0.03, marginTop: 5 }}></View>



            </TouchableOpacity>
        );
    };
    render() {


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
                    <TouchableOpacity onPress={() => Navigation.back()}>
                        <Image style={{
                            width: wide * 0.1, height: wide * 0.1,
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, borderColor: Colors.borderColor
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
                    }}>
                        <View style={{ flex: 1, backgroundColor: Colors.base }} >

                            <View style={{ marginTop: wide * 0.08, marginHorizontal: 15 }}>


                                <Text style={{
                                    color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold
                                }}>
                                    Challenges
            </Text>

                            </View>

                            <View style={{ flex: 0.3, marginTop: wide * 0.02 }}>

                                <FlatList
                                    style={{
                                        marginLeft: wide * 0.03, overflow: 'visible'
                                    }}
                                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]}
                                    renderItem={(item, index) => this._renderPlan(item, index)}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                />
                            </View>
                            <View style={{ flex: 1 }} >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => this.setState({ selectedPlanIndex: 0 })}
                                    style={[{
                                        height: wide * 0.35,
                                        marginHorizontal: 15
                                    }, this.state.selectedPlanIndex === 0 ? {
                                        borderWidth: 3, borderColor: Colors.btnBg, borderTopLeftRadius: 25,
                                        borderTopRightRadius: 25, borderBottomRightRadius: 25,
                                        borderBottomLeftRadius: 10
                                    } : {}]}>
                                    <Image style={{
                                        position: 'absolute', top: 0, bottom: 0, left: 0,
                                        right: 0, width: '100%', height: '100%', borderBottomRightRadius: 25,
                                        borderBottomLeftRadius: 10

                                    }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

                                    <View style={{ marginTop: wide * 0.08, marginLeft: 15, flexDirection: 'row' }}>

                                        <View style={{ flex: 1 }} >
                                            <Text style={{

                                                color: Colors.fontGray, fontSize: 22,
                                                fontFamily: Fonts.Bold, lineHeight: 24
                                            }}>
                                                1 week

</Text>
                                            <Text style={{
                                                color: Colors.light, fontSize: 22, lineHeight: 24,
                                                fontFamily: Fonts.SemiBold
                                            }}>

                                                The Starting
</Text>
                                        </View>

                                        <Text style={{
                                            color: Colors.light, fontSize: 30, lineHeight: 32,
                                            fontFamily: Fonts.SemiBold, paddingHorizontal: 15
                                        }}>

                                            $50
</Text>
                                    </View>


                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setState({ selectedPlanIndex: 1 })}
                                    activeOpacity={1}
                                    style={[{
                                        marginTop: wide * 0.05,
                                        height: wide * 0.35, marginHorizontal: 15
                                    }, this.state.selectedPlanIndex === 1 ? {
                                        borderWidth: 3, borderColor: Colors.btnBg, borderTopLeftRadius: 25,
                                        borderTopRightRadius: 25, borderBottomRightRadius: 25,
                                        borderBottomLeftRadius: 10
                                    } : {}]}>
                                    <Image style={{
                                        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                                        width: '100%', height: '100%', borderBottomRightRadius: 25,
                                        borderBottomLeftRadius: 10
                                    }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />

                                    <View style={{ marginTop: wide * 0.08, marginLeft: 15, flexDirection: 'row' }}>

                                        <View style={{ flex: 1 }} >
                                            <Text style={{

                                                color: Colors.fontGray, fontSize: 22,
                                                fontFamily: Fonts.Bold, lineHeight: 24
                                            }}>
                                                15 Days

</Text>
                                            <Text style={{
                                                color: Colors.light, fontSize: 22, lineHeight: 24,
                                                fontFamily: Fonts.SemiBold
                                            }}>

                                                The Starting
</Text>
                                        </View>

                                        <Text style={{
                                            color: Colors.light, fontSize: 30, lineHeight: 32,
                                            fontFamily: Fonts.SemiBold, paddingHorizontal: 15
                                        }}>

                                            $100
</Text>
                                    </View>


                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity

                                style={{
                                    width: wide * 0.8, height: 48,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 24, opacity: 1.0,
                                    justifyContent: 'center', marginTop: 20,
                                }} onPress={() => {
                                    Navigation.navigate('PlayerSidePlan')
                                }}>
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.Bold,
                                }}>Pay {this.state.selectedPlanIndex === 0 ? '$50' : '$100'}</Text>
                            </TouchableOpacity>

                        </View>
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
        User: entities.user,
        Home: entities.home
    };
}

export default connect(mapStateToProps)(TrainerPlan);
