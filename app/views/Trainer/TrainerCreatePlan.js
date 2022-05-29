
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native';
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
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
let wide = Layout.width;
class TrainerCreatePlan extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedPlanIndex: 0,
            selectedIndex: 0,
            weekSelect: 0
            // starCount: 3.5
        };
    }
    componentDidMount() {
    }



    _renderHighlights = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                width: wide * 0.198, height: wide * 0.2,
                justifyContent: 'center',
            }}
                onPress={() => this.setState({ selectedIndex: index })}
            >
                {
                    this.state.selectedIndex == index ?
                        <Image
                            source={require('../../Images/BallSelected.png')}
                            style={{
                                height: 25, width: 25, position: 'absolute',
                                // left: -wide * 0.018,
                            }}
                        /> : null}
                <Text style={{ color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 15, top: 30, marginLeft: wide * 0.022 }}>{item}</Text>
            </TouchableOpacity>
        );
    };

    render() {


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
                    <TouchableOpacity style={{ marginHorizontal: 15, }} onPress={() => Navigation.back()}>
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

                        <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >
                            <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06, marginHorizontal: 15 }}>
                                <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold }}>
                                    Plans  </Text>
                            </View>
                            <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06, marginHorizontal: 15 }}>
                                <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.SemiBold }}>
                                    Add Title  </Text>
                            </View>
                            <View style={{
                                marginTop: 10, borderWidth: 1.5, borderColor: Colors.borderColor,
                                marginHorizontal: 15, borderRadius: wide * 0.01, height: 45

                            }}>

                                <TextInput
                                    style={{ color: Colors.light, height: wide * 0.1, padding: 10, }}
                                    numberOfLines={5}
                                />

                            </View>
                            <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.1, marginHorizontal: 15 }}>
                                <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.SemiBold }}>
                                    Time Duration  </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',

                            }}>
                                < TouchableOpacity style={{
                                    marginTop: 10, borderWidth: 1.5, borderColor: Colors.borderColor,
                                    width: wide * 0.26, marginHorizontal: 15, flexDirection: 'row', padding: 10,
                                    borderRadius: wide * 0.01,
                                }}
                                    onPress={() => this.setState({ weekSelect: 0 })}
                                >
                                    <Image style={{
                                        width: 20, height: 20,
                                        borderRadius: (wide * 0.2) / 2,

                                    }}
                                        // resizeMode={'contain'}
                                        source={this.state.weekSelect === 0 ? require('../../Images/oval.png') : require('../../Images/OvalSelected.png')} />

                                    <Text style={{
                                        color: Colors.light, fontSize: 18, lineHeight: 22,
                                        fontFamily: Fonts.SemiBold, textAlign: 'center', left: 2
                                    }}>
                                        1 week  </Text>

                                </TouchableOpacity>
                                < TouchableOpacity style={{
                                    marginTop: 10, borderWidth: 1.5, borderColor: Colors.borderColor,
                                    width: wide * 0.26, flexDirection: 'row', padding: 10, borderRadius: wide * 0.01,
                                }}
                                    onPress={() => this.setState({ weekSelect: 1 })}
                                >
                                    <Image style={{
                                        width: 20, height: 20,
                                        borderRadius: (wide * 0.2) / 2,

                                    }}
                                        // resizeMode={'contain'}
                                        source={this.state.weekSelect === 1 ? require('../../Images/oval.png') : require('../../Images/OvalSelected.png')} />

                                    <Text style={{
                                        color: Colors.light, fontSize: 18, lineHeight: 22,
                                        fontFamily: Fonts.SemiBold, textAlign: 'center', left: 2
                                    }}>
                                        2 week  </Text>

                                </TouchableOpacity>
                                < TouchableOpacity style={{
                                    marginTop: 10, borderWidth: 1.5, borderColor: Colors.borderColor, borderRadius: wide * 0.01,
                                    width: wide * 0.26, marginHorizontal: 15, flexDirection: 'row', padding: 10,
                                }}
                                    onPress={() => this.setState({ weekSelect: 2 })}
                                >
                                    <Image style={{
                                        width: 20, height: 20,
                                        borderRadius: (wide * 0.2) / 2,

                                    }}
                                        // resizeMode={'contain'}
                                        source={this.state.weekSelect === 2 ? require('../../Images/oval.png') : require('../../Images/OvalSelected.png')} />

                                    <Text style={{
                                        color: Colors.light, fontSize: 18, lineHeight: 22,
                                        fontFamily: Fonts.SemiBold, textAlign: 'center', left: 2
                                    }}>
                                        3 week  </Text>

                                </TouchableOpacity>
                            </View>
                            {/* <FlatList
                                // style={{ marginLeft: 15 }}
                                data={[1, 2, 3]}
                                renderItem={(item, index) => this.renderTime(item, index)}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            /> */}
                            <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.1, marginHorizontal: 15 }}>
                                <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.SemiBold }}>
                                    Position  </Text>
                            </View>
                            <View style={{
                                marginTop: 10, borderWidth: 1.5, borderColor: Colors.borderColor, borderRadius: wide * 0.01,
                                marginHorizontal: 15, height: 54, alignContent: 'center', justifyContent: 'center'

                            }}>
                                <RNPickerSelect

                                    useNativeAndroidPickerStyle

                                    style={{
                                        ...pickerSelectStyles,
                                        color: Colors.lightshade, fontFamily: Fonts.SemiBold,
                                        backgroundColor: Colors.base, textColor: Colors.light,
                                    }}
                                    itemStyle={{
                                        color: Colors.lightshade, fontFamily: Fonts.SemiBold,
                                        backgroundColor: Colors.base, textColor: Colors.light,
                                    }}
                                    placeholder={{
                                        label: 'PG',
                                        value: 'PG',

                                    }}
                                    onValueChange={(value) => console.log(value)}
                                    items={[

                                        { label: 'CC', value: 'CC' },
                                        { label: 'Hockey', value: 'hockey' },
                                    ]}
                                />
                                <Image style={{
                                    width: 15, height: 15,

                                    position: 'absolute',
                                    alignSelf: 'flex-end', right: 10
                                }}
                                    resizeMode={'contain'}
                                    source={require('../../Images/dropArrow.png')} />
                                {/* <TextInput
                                    style={{ color: Colors.light, height: wide * 0.09, borderRadius: wide * 0.01, }}
                                    numberOfLines={5}
                                /> */}
                            </View>
                            <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.09, marginHorizontal: 15 }}>
                                <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 22, fontFamily: Fonts.SemiBold }}>
                                    Level of difficulty  </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                                <Image style={{
                                    width: "100%", height: 18,
                                    borderRadius: (wide * 0.2) / 2, marginTop: 32,
                                    // tintColor: Colors.lightshade
                                }}
                                    // resizeMode={'contain'}
                                    source={require('../../Images/line.png')} />

                                <FlatList
                                    style={{ position: 'absolute', overflow: 'visible' }}
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={(item, index) => this._renderHighlights(item, index)}
                                    horizontal
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                />


                                {/* </View> */}
                            </View>
                            <TouchableOpacity
                                onPress={() => Navigation.navigate("TrainerCreatePlanNext")}
                                style={{
                                    width: '100%', height: 56,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 28, opacity: 1,
                                    justifyContent: 'center', marginTop: wide * 0.2, marginHorizontal: 15
                                }}>
                                <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Next</Text>
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
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontFamily: Fonts.Bold,
        borderRadius: 4,
        color: Colors.light,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontFamily: Fonts.Bold,
        borderRadius: 8,
        color: Colors.light,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default connect(mapStateToProps)(TrainerCreatePlan);
