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
import { AirbnbRating } from 'react-native-ratings';
let wide = Layout.width;


class TrainerProfile extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    componentDidMount() {
    }
    _renderHotPlayers = (item, index) => {
        return (
            <TouchableOpacity style={{
                
                justifyContent: 'center',
                alignItems: 'center', paddingRight: wide * 0.05
            }}
                activeOpacity={1}
                onPress={() => this.setState({ selectedIndex: item.index })}
            >


<View style={{
                                    width: wide * 0.32, height: wide * 0.4,
                                    marginTop: 24, borderRadius: 10, borderWidth: 3,
                                    borderColor: Colors.borderColor, 
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image style={{ width: '80%', height: '80%', }} resizeMode={'contain'} source={require('../../Images/Los_Angeles_Lakers_logo.png')} />
                               
                                </View>

                               
                                         <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical:10 }}>
          
          <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, marginLeft: 5 }}>Rank 1</Text>
          <Image
            source={require("../../Images/upArrow.png")}
            // resizeMode="contain"
            style={{ width: wide * 0.02, height: wide * 0.02,marginLeft:5 }}
          ></Image>
        </View>

            </TouchableOpacity>
        );
    };
    _renderPhotos = (item) => {
        return (
            <TouchableOpacity style={{
                width: wide * 0.32, height: wide * 0.4,
                justifyContent: 'center', alignItems: 'center',
            }}
            // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
            >
                <View style={{
                    // borderWidth: 1,
                    margin: 5,
                    flex: 1,
                    // borderColor: Colors.lightGray,
                    justifyContent: 'center', alignItems: 'center',
                    //  backgroundColor: Colors.btnBg,

                    shadowColor: Colors.lightGray,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1.0, width: '90%',
                }}>

                    {
                        <Image
                            source={require("../../Images/avatar.png")}
                            //resizeMode="stretch"
                            style={{ width: '100%', height: '100%' }}
                        ></Image>
                    }

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                    <Image
                        source={require("../../Images/like_ico.png")}
                        // resizeMode="contain"
                        style={{ width: wide * 0.03, height: wide * 0.03 }}
                    ></Image>
                    <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12, marginLeft: 5 }}>23k Likes</Text>
                </View>

            </TouchableOpacity>
        );
    };
    _renderPopularPlan = (item) => {
        return (
            <View style={{ marginLeft: 15 }}>
                <Image style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: wide*0.2
                }} resizeMode={'stretch'} source={require('../../Images/Rectangle.png')} />
                <View style={{ flexDirection: 'row',  }}>
                    <View style={{ marginLeft: wide * 0.05, }}>


                        <Text style={{
                            color: Colors.grey, fontSize: 20,
                            fontFamily: Fonts.SemiBold,
                            marginTop: wide * 0.03,
                        }}>
                            1 week

                                            </Text>
                        <Text style={{
                            color: Colors.light, fontSize: 20,
                            fontFamily: Fonts.Bold,
                            marginTop: wide * 0.02,
                        }}>
                            4 Challenges

                                            </Text>
                    </View>




                    <View style={{
                        marginHorizontal: wide * 0.05,
                      
                    }}>
                        <Image style={{
                            width: 50, height: 50, marginRight: 0.2, alignSelf: 'flex-end', marginTop: 15
                        }}
                            resizeMode={'contain'}
                            source={require('../../Images/badge_ico.png')} />
                        <Text style={{
                            color: Colors.light, fontSize: 18,
                            fontFamily: Fonts.Medium, marginRight: 0.2,fontStyle:'italic',
                            marginTop: wide * 0.05, alignSelf: 'flex-end'
                        }}>
                            The Starting Plan

                                            </Text>

                    </View>

                </View>
            </View>
                          
        )
    }
    _renderHighlights = (item) => {
        return (
            <TouchableOpacity style={{
                width: wide * 0.25, height: wide * 0.25,
                justifyContent: 'center', alignItems: 'center',
            }}
            // onPress={() => Navigation.navigate('CategoryList', { selectedCat: item.item, selectedInd: item.index, isFrom: 'brand' })}
            >
                <View style={{
                    // borderWidth: 1,
                    margin: 5,
                    flex: 1,
                    // borderColor: Colors.lightGray,
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: Colors.btnBg,
                    borderRadius: (wide * 0.22) / 2,
                    shadowColor: Colors.lightGray,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1.0, width: '80%', height: '80%'
                }}>

                    {
                        <Image
                            source={require("../../Images/avatar.png")}
                            // resizeMode="contain"
                            style={{ width: '100%', height: '100%', borderRadius: (wide * 0.22) / 2, }}
                        ></Image>
                    }

                </View>
                <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 12 }}>Defence</Text>
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
                            marginTop: 24, borderRadius: wide * 0.03, borderWidth: 1, 
                            borderColor: Colors.borderColor,marginHorizontal: 10
                        }} source={require('../../Images/back_ico.png')} />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                        paddingBottom: isNotch ? 30 : 40,marginHorizontal: 10
                    }}>

                        <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15 }} >


                            <View style={{
                                flexDirection: 'row',
                                marginTop: wide * 0.08,
                            }}>
                                <View>

                                    <Text style={{
                                        color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold
                                    }}>
                                        Ray James
            </Text>
                                    <Text style={{
                                        color: Colors.overlayWhite,
                                        fontSize: 18, lineHeight: 20,
                                        fontFamily: Fonts.Regular,
                                        marginTop: 10, fontStyle: 'italic'
                                    }}>
                                        XYZ certified
            </Text>
                                </View>
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => { }} style={{

                                }}>
                                    <Image style={{

                                        width: 30, height: 30,
                                    }} resizeMode={'contain'} source={require('../../Images/bell.png')} />
                                </TouchableOpacity>
                                <View style={{ width: wide * 0.04 }} />
                                <TouchableOpacity onPress={() => { Navigation.navigate('MessageList') }} style={{

                                }}>
                                    <Image style={{

                                        width: 30, height: 30
                                    }} source={require('../../Images/chat_icon.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignSelf: 'center', zIndex: 1 }}>
                                <Image style={{
                                    position: 'absolute',
                                    right: -5, top: 15,
                                    width: 20, height: 20, zIndex: 1
                                }} source={require('../../Images/sort_tick_selected.png')} />
                                <Image style={{
                                    width: wide * 0.3, height: wide * 0.45,
                                    marginTop: 24, borderRadius: wide * 0.03, borderWidth: 4, borderColor: Colors.borderColor
                                }} source={require('../../Images/avatar.png')} />
                                <TouchableOpacity style={{
                                    width: wide * 0.3, height: wide * 0.2,
                                    bottom: 0, position: 'absolute', alignItems: 'center'
                                }}>
                                    <Image style={{
                                        width: '96%', height: '96%',
                                    }} resizeMode={'stretch'} source={require('../../Images/edit_profile_gradiant.png')} />
                                    <View style={{marginTop:-wide*0.06}}>
                                    <AirbnbRating
                                    
                                    ratingColor={Colors.stars}
                                    isDisabled={true}
                                    size={12}
                                    showRating={false}
                                    selectedColor={Colors.stars}

                                    defaultRating={4.0}


                                />
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={{ marginTop: -wide * 0.11 }}>
                                <Image style={{
                                    position: 'absolute', top: -wide*0.1, left: 0, right: 0, width: '100%'
                                }} resizeMode={'contain'} source={require('../../Images/Rectangle.png')} />
                                <View style={{ marginTop: wide * 0.08, }}>
                                    <Text style={{

                                        color: Colors.fontColorGray,
                                        fontFamily: Fonts.SemiBold, fontSize: 14, lineHeight: 20,
                                        width: wide * 0.78, alignSelf: 'center', textAlign: 'center', marginTop: wide * 0.05, opacity: 0.4
                                    }}>Exp - 7 years : 500+ connects</Text>
                                </View>


                                <Text style={{
                                    color: Colors.fontColorGray,
                                    fontFamily: Fonts.Regular, fontSize: 13, lineHeight: 20,
                                    width: wide * 0.78, alignSelf: 'center',
                                    textAlign: 'center', marginTop: wide * 0.01, opacity: 0.4
                                }}>Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit. Etiam vitae turpis libero.</Text>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                    marginTop: wide * 0.05
                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: Colors.btnBg,
                                        width: wide * 0.42, height: wide * 0.09, borderRadius: 5, justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Stats</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        width: wide * 0.42, height: wide * 0.1, borderRadius: 10, borderWidth: 3,
                                        borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Text style={{ color: Colors.light, fontFamily: Fonts.Medium, fontSize: 16, }}>Edit</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>


                        </View>
                        <View style={{ flex: 1, backgroundColor: Colors.base,  marginTop: wide * 0.08 }}>
                            <Text style={{
                                color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,marginLeft:15,
                            }}>Popular Plan</Text>
                            <View style={{ flexDirection: 'row', marginTop: wide * 0.05 }}>
                                <FlatList
                                    style={{ overflow: 'visible', }}
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={(item, index) => this._renderPopularPlan(item, index)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                               
                            </View>
                            </View>
                        <View style={{ flex: 1, backgroundColor: Colors.base, marginHorizontal: 15, marginTop: wide * 0.08 }}>
                            <Text style={{
                                color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
                            }}>Highlights</Text>

                            <View style={{ flexDirection: 'row', marginTop: wide * 0.05 }}>

                                <FlatList
style={{overflow:'visible'}}
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={(item, index) => this._renderHighlights(item, index)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                           <View style={{flexDirection:'row',marginTop: wide * 0.08}}>
                           <Text style={{
                                color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28, 
                            }}>Photos</Text>
                             <View style={{flex:1}}/>
                                <Text style={{
                                    color: Colors.light, fontSize: 18, fontFamily: Fonts.SemiBold,paddingRight:15
                                }}>
                                   See All
                                   
                                </Text>
                           </View>

                            <View style={{ flexDirection: 'row', marginTop: wide * 0.05 }}>

                                <FlatList
style={{overflow:'visible'}}
                                    data={[1, 2, 3, 4, 5]}
                                    renderItem={(item, index) => this._renderPhotos(item, index)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                            <View style={{ marginTop: wide *  0.08 }}>
                                <Text style={{
                                    color: Colors.light, fontFamily: Fonts.SemiBold, fontSize: 28,
                                }}>
                                    Featured Players
                                   
                                </Text>
                                <FlatList
                                        style={{overflow:'visible'}}
                                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11]}
                                        renderItem={(item, index) => this._renderHotPlayers(item, index)}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                    />
                            </View>
                            <TouchableOpacity

                                style={{
                                     width:'100%',height: 56,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 28,
                                    justifyContent: 'center', marginTop: wide * 0.1, marginHorizontal: 15
                                }} onPress={() => {

                                }}>
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.SemiBold, fontSize: 16
                                }}>Training sessions from $50</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </KeyboardAvoidingView>

            </SafeAreaView>
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

export default connect(mapStateToProps)(TrainerProfile);
