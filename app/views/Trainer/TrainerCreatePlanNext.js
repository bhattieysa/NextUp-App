
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, FlatList, Alert } from 'react-native';
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
import ImagePicker from 'react-native-image-crop-picker';
let wide = Layout.width;
class TrainerCreatePlanNext extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedPlanIndex: 0,
            selectedIndex: 0,
            coverPic: "",
            photoVideoPic: "",
            txtDescription: ''
            // starCount: 3.5
        };
    }
    componentDidMount() {
    }

    pickSingle(cropit, circular = false, isFrom) {
        Alert.alert(
            "Image",
            'Pick from',
            [
                {
                    text: 'Gallery',
                    onPress: () => {
                        ImagePicker.openPicker({
                            width: 500,
                            height: 500,
                            cropping: cropit,
                            cropperCircleOverlay: circular,
                            sortOrder: 'none',
                            compressImageMaxWidth: 1000,
                            compressImageMaxHeight: 1000,
                            compressImageQuality: 1,
                            compressVideoPreset: 'MediumQuality',
                            includeExif: true,
                            cropperStatusBarColor: 'white',
                            cropperToolbarColor: 'white',
                            cropperActiveWidgetColor: 'white',
                            cropperToolbarWidgetColor: '#3498DB',
                            mediaType: isFrom === '1' ? 'any' : 'photo'
                        })
                            .then((image) => {
                                // console.log('received image', image);
                                if (isFrom === '1') {
                                    this.setState({ photoVideoPic: image.path })
                                } else {
                                    this.setState({ coverPic: image.path })
                                }

                                // 

                            })
                            .catch((e) => {
                                console.log(e);
                                // Alert.alert(e.message ? e.message : e);
                            });
                    }
                },
                {
                    text: 'Camera', onPress: () => {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 400,
                            cropping: true,
                            mediaType: 'photo'
                        }).then(image => {
                            if (isFrom === '1') {
                                this.setState({ photoVideoPic: image.path })
                            } else {
                                this.setState({ coverPic: image.path })
                            }


                        });
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );

    }

    _renderHighlights = (item) => {
        return (
            <TouchableOpacity style={{
                width: wide * 0.25,
                justifyContent: 'center', alignItems: 'center',
            }}
            // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
            >

                <Text style={{ color: Colors.light, fontFamily: Fonts.Bold, fontSize: 20 }}>1</Text>
            </TouchableOpacity>
        );
    };

    render() {


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.base, }}>
                    <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => Navigation.back()}>
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

                        <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15, }} >
                            <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.06, marginHorizontal: 10 }}>
                                <Text style={{ color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold }}>
                                    Plans  </Text>
                            </View>
                            <View style={{
                                backgroundColor: Colors.base, marginTop: wide * 0.08,
                                flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between'
                            }}>
                                <Text style={{ color: Colors.light, fontSize: 20, lineHeight: 25, fontFamily: Fonts.SemiBold, left: 0 }}>
                                    Description </Text>
                                <Text style={{
                                    fontFamily: Fonts.Bold,
                                    color: Colors.light, fontSize: 12, textAlign: 'center', padding: 10, fontStyle: 'italic'
                                }}>{this.state.txtDescription.length}/260</Text>
                            </View>
                            <View style={{
                                marginTop: 10, borderWidth: 1.5, borderColor: Colors.borderColor,
                                marginHorizontal: 10, height: wide * 0.43, borderRadius: wide * 0.01

                            }}>

                                <TextInput
                                    style={{
                                        color: Colors.light, height: '100%',
                                        paddingLeft: wide * 0.03, paddingTop: wide * 0.03, paddingRight: wide * 0.03,
                                        lineHeight: 16
                                    }}
                                    value={this.state.txtDescription}
                                    onChangeText={(val) => this.setState({ txtDescription: val })}
                                    multiline

                                    maxLength={260}
                                    textAlignVertical={'top'}
                                />

                            </View>
                            <View style={{ flexDirection: 'row', top: 30 }}>
                                <TouchableOpacity onPress={() => this.pickSingle(true, false, '1')}
                                    style={{
                                        width: wide * 0.42, height: wide * 0.4,
                                        marginTop: 24, borderRadius: wide * 0.01, borderWidth: 2,
                                        borderColor: Colors.borderColor, marginLeft: wide * 0.03,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    {
                                        this.state.photoVideoPic == ''
                                            ? <>
                                                <View style={{
                                                    width: wide * 0.08, height: wide * 0.08,
                                                    borderRadius: (wide * 0.08) / 2,
                                                    backgroundColor: Colors.btnBg, justifyContent: 'center'
                                                }}>
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 18,
                                                        fontFamily: Fonts.Medium, textAlign: 'center'

                                                    }}>+</Text>

                                                </View>
                                                <Text style={{
                                                    color: Colors.fontColorGray, fontSize: 12, top: 10, fontFamily: Fonts.SemiBold, textAlign: 'center', marginLeft: 5, marginTop: 2

                                                }}>Add Photo/Video</Text>
                                            </>
                                            :
                                            <Image style={{ width: '90%', height: '90%' }} source={{ uri: this.state.photoVideoPic }} />

                                    }

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.pickSingle(true, false, '2')}
                                    style={{
                                        width: wide * 0.42, height: wide * 0.4,
                                        marginTop: 24, borderRadius: wide * 0.01, borderWidth: 2,
                                        borderColor: Colors.borderColor, marginLeft: wide * 0.03,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    {
                                        this.state.coverPic == ''
                                            ? <>
                                                <View style={{
                                                    width: wide * 0.08, height: wide * 0.08,
                                                    borderRadius: (wide * 0.08) / 2,
                                                    backgroundColor: Colors.btnBg, justifyContent: 'center'
                                                }}>
                                                    <Text style={{
                                                        color: Colors.light, fontSize: 18, fontFamily: Fonts.Medium, textAlign: 'center'

                                                    }}>+</Text>

                                                </View>
                                                <Text style={{
                                                    color: Colors.fontColorGray, fontSize: 12, top: 10, fontFamily: Fonts.SemiBold, textAlign: 'center', marginLeft: 5, marginTop: 2

                                                }}>Add Cover Photo</Text>
                                            </>
                                            :
                                            <Image style={{ width: '90%', height: '90%' }} source={{ uri: this.state.coverPic }} />

                                    }

                                    {/* <Image style={{ width: '80%', height: '80%', }} resizeMode={'contain'} source={require('../../Images/Los_Angeles_Lakers_logo.png')} /> */}
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                backgroundColor: Colors.base, marginTop: wide * 0.2, marginHorizontal: 15,
                                flexDirection: 'row', justifyContent: 'space-around',
                            }}>
                                <Text style={{
                                    color: Colors.light, fontSize: 18,
                                    lineHeight: 25, top: 15, fontFamily: Fonts.SemiBold, textAlign: 'center'
                                }}>
                                    Add Price </Text>
                                <View style={{
                                    borderWidth: 1.5, borderColor: Colors.borderColor,
                                    width: wide * 0.38, marginLeft: wide * 0.2, borderRadius: (wide * 0.01)

                                }}>

                                    <TextInput
                                        style={{
                                            color: Colors.light, height: wide * 0.12,
                                            fontFamily: Fonts.Bold, fontSize: 20, textAlign: 'center'
                                        }}
                                        placeholderTextColor={Colors.fontColorGray}
                                        placeholder={'In USD'}

                                        keyboardType={'number-pad'}
                                    />

                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            // key={isbtnEnable}
                            style={{
                                width: wide * 0.8, height: 48,
                                backgroundColor: Colors.btnBg,
                                alignSelf: 'center', borderRadius: 24, opacity: 1,
                                justifyContent: 'center', marginTop: wide * 0.05
                            }}>
                            <Text style={{ alignSelf: 'center', color: Colors.light, fontFamily: Fonts.Bold, }}>Preview</Text>
                        </TouchableOpacity>
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

export default connect(mapStateToProps)(TrainerCreatePlanNext);
