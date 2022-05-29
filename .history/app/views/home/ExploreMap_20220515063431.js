
import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text,
    SafeAreaView, Image,
    ScrollView, TextInput,
    KeyboardAvoidingView, FlatList,
    PermissionsAndroid
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
import { isNotch } from '../../utils/deviceInfo';
import { AirbnbRating } from 'react-native-ratings';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import LocationView from "../../Helpers/react-native-location-view";
import Geolocation from '@react-native-community/geolocation';
import { setObject } from '../../middleware';

let wide = Layout.width;

class ExploreMap extends Component {
    static navigationOptions = { header: null };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedIndex: 0,
            lastLat: 0,
            lastLong: 0,
            cityName: '',
            initialReg: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            refreshKey: 0
        };
    }
    async componentDidMount() {
        try {

            // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.watchID = Geolocation.getCurrentPosition((position) => {
                debugger
                this.setState({
                    lastLat: position.coords.latitude, lastLong: position.coords.longitude, refreshKey: Math.random(), initialReg: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                })




            }, (error) => {
                console.log(error)
                debugger
                //alert("Please on your location.")
            }, {

            });
            //  }
            // else {
            //     //alert("Location permission denied")
            // }
        }
        catch (err) {
            debugger
            console.warn(err)
        }
    }

    render() {


        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                {/* <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}> */}
                {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        marginHorizontal: 15,
                        minHeight: isNotch ? Layout.height - 170 : Layout.height - 100, paddingBottom: isNotch ? 0 : 10
                    }}> */}
                {/* <View style={{ backgroundColor: Colors.base, marginTop: wide * 0.08, marginHorizontal: 15 }}>
                            <Text style={{
                                color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.Bold
                            }}>
                                Explore

                            </Text>

                            <View style={{ marginTop: wide * 0.05, }}>


                                <TextInput style={{
                                    borderWidth: 3, borderColor: Colors.borderColor,
                                    fontFamily: Fonts.Bold, height: 60, paddingLeft: 10, paddingRight: wide * 0.2,
                                    borderRadius: 5, color: Colors.light, fontSize: 16
                                }}
                                    placeholder={"SEARCH"}
                                    placeholderTextColor={Colors.borderColor}
                                />
                                <Text style={{
                                    position: 'absolute', fontFamily: Fonts.SemiBold, color: Colors.light, fontSize: 12,
                                    right: wide * 0.05, top: wide * 0.06
                                }} >Change</Text> */}
                {/* <Image style={{
                                    position: 'absolute',
                                    width: 20, height: 20, right: wide * 0.05, top: wide * 0.05
                                }} source={require('../../Images/search_ico.png')} /> */}
                {/* </View>

                        </View> */}
                {/* <View style={{ width: wide * 0.85, marginHorizontal: 15, marginTop: wide * 0.03 }}>
                            <Slider
                                style={{ width: '100%', height: wide * 0.08, }}
                                minimumValue={0}
                                maximumValue={10}
                                value={5}
                                thumbTintColor={Colors.btnBg}
                                minimumTrackTintColor={Colors.btnBg}
                                maximumTrackTintColor={Colors.borderColor}
                            //   maximumTrackImage={require('../../Images/sliderUnfilled.png')}
                            // minimumTrackImage={require('../../Images/sliderFilled.png')}
                            //    trackImage={require('../../Images/sliderUnfilled.png')}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.SemiBold, fontSize: 12
                                }}>0 km</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.SemiBold, fontSize: 12
                                }}>10 km</Text>
                            </View>
                        </View> */}
                {/* <View style={{
                            flex: 1, backgroundColor: Colors.base, marginHorizontal: 15,
                            paddingBottom: wide * 0.15
                        }} >

                            <View style={{ height: wide, marginTop: wide * 0.05, borderRadius: 20, overflow: 'hidden' }}>
                                <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={{ height: '100%' }}
                                    region={{
                                        latitude: 37.78825,
                                        longitude: -122.4324,
                                        latitudeDelta: 0.015,
                                        longitudeDelta: 0.0121,
                                    }}
                                >


                                </MapView>

                            </View>
                            <TouchableOpacity

                                style={{
                                    width: '100%', height: 56,
                                    backgroundColor: Colors.btnBg,
                                    alignSelf: 'center', borderRadius: 28,
                                    justifyContent: 'center', marginTop: wide * 0.1, paddingHorizontal: 15
                                }} onPress={() => {

                                }}>
                                <Text style={{
                                    alignSelf: 'center', color: Colors.light,
                                    fontFamily: Fonts.Bold, fontSize: 16
                                }}>Continue</Text>
                            </TouchableOpacity>

                        </View> */}

                {/* </ScrollView> */}
                <LocationView

                    key={this.state.refreshKey}
                    //components={['types:(cities)']}
                    markerColor={Colors.base}
                    apiKey={"AIzaSyAYnkQNoZabfHpyl1rY3iC2SdivPQUtZ0Q"}
                    initialLocation={{
                        latitude: this.state.lastLat,
                        longitude: this.state.lastLong,
                    }}
                    actionText={'Continue'}
                    actionButtonStyle={{ backgroundColor: Colors.base }}
                    actionTextStyle={{ fontFamily: Fonts.Bold, fontSize: 18, color: Colors.light }}
                    onLocationSelect={(e) => {
                        debugger
                        let obj = {
                            name: e.address,
                            lat: e.latitude,
                            lng: e.longitude
                        }
                        setObject('userLoc', obj).then(() => {
                            Navigation.back()
                        })
                        // this.setState({
                        //     cityName: e.address,
                        //     lastLat: e.latitude,
                        //     lastLong: e.longitude
                        // }, () => {

                        // })
                    }}
                    timeout={10000000}
                    maximumAge={10000000}
                    enableHighAccuracy={false}
                />
                <TouchableOpacity style={{ marginHorizontal: 15, marginTop: wide * 0.05, width: wide * 0.1, position: 'absolute' }} onPress={() => Navigation.back()}>
                    <Image style={{
                        width: wide * 0.1, height: wide * 0.1,
                        borderRadius: wide * 0.03, borderWidth: 1,
                        borderColor: Colors.borderColor, backgroundColor: Colors.base
                    }} source={require('../../Images/back_ico.png')} />
                </TouchableOpacity>
                {/* </KeyboardAvoidingView> */}

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

export default connect(mapStateToProps)(ExploreMap);
