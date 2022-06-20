import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, ScrollView, TextInput, Platform, Dimensions, ImageBackground } from 'react-native';
import {
    Layout,
    Colors,
    Fonts,
} from '../../../constants';

import Navigation from '../../../lib/Navigation';

import AppLoader from '../../../utils/Apploader';

import { onBoardAPI } from '../../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../../utils/info';
import isValidEmail from '../../../utils/isValidEmail';

import { characterLimit, UserModel } from '../../../constants/constant';

import * as Progress from 'react-native-progress';
import AnimatedInput from "../../../Helpers/react-native-animated-input";
import { isNotch } from '../../../utils/deviceInfo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { getObject, setObject } from '../../../middleware';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet } from 'react-native';
import { getRoadToProDetail } from '../../../actions/home';
import MoVideoPlayer from 'react-native-mo-video-player';

let wide = Layout.width;
class RoadToProPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        // call api here

    }



    render() {

        const params = this.props.navigation.state.params;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>

                {
                    this.state.loading ? <AppLoader visible={this.state.loading} /> : null
                }

                {/* <Text style={{
                    color: Colors.lightshade
                }}>params are {JSON.stringify(params)}</Text> */}



                <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                        <TouchableOpacity style={{ width: wide * 0.1, }} onPress={() => Navigation.navigate("RoadToPro_3")}>
                            <Image style={{
                                width: wide * 0.08, height: wide * 0.08,
                                borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                            }} source={require('../../../Images/back_ico.png')} />
                        </TouchableOpacity>
                        <Text style={{
                            color: Colors.light, fontSize: 16,
                            fontFamily: Fonts.Bold, lineHeight: 24,
                            marginHorizontal: 10
                        }}>
                            Road To Pro
                        </Text>
                    </View>
                </View>

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    style={{ marginTop: wide * 0.03, marginBottom: wide * 0.01 }}
                    bounces={false}
                >


                    <View style={{
                        flexDirection: "column"
                    }}>

                        <View style={{
                            paddingHorizontal: 30
                        }}>

                            <Text style={{
                                color: Colors.lightshade,
                                textAlign: "justify"
                            }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
                            </Text>

                        </View>

                        {
                            params && params.packageList && params.packageList.map((pkg, index) => (
                                <View key={`package-${index}`} style={{
                                    marginTop: 25,
                                    borderRadius: 10,
                                }}>
                                    <ImageBackground
                                        source={require('../../../Images/plan_bk_1.png')}
                                        style={{
                                            width: Dimensions.get("window").width * 0.87,
                                            minHeight: 125,
                                            alignSelf: "center",
                                            flexDirection: "column"
                                        }}
                                        imageStyle={{
                                            borderRadius: 10
                                        }}
                                    >

                                        <View style={{
                                            flexDirection: "row"
                                        }}>

                                            <View style={{
                                                flex: 2
                                            }}>
                                                <Text style={{
                                                    fontWeight: "bold",
                                                    fontSize: 20,
                                                    paddingLeft: 15,
                                                    paddingTop: 20
                                                }}>{pkg.title}</Text>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                paddingTop: 20
                                            }}>
                                                <Text style={{
                                                    fontStyle: "italic",
                                                    textAlign: "right"
                                                }}>Pay per week</Text>
                                            </View>

                                            <View style={{
                                                flex: 1,
                                                paddingRight: 15,
                                                paddingTop: 20
                                            }}>
                                                <Text style={{
                                                    textAlign: "right",
                                                    fontWeight: "bold",
                                                    fontSize: 20
                                                }}>${pkg.price}</Text>
                                            </View>

                                        </View>

                                        <View style={{
                                            marginTop: 10,
                                            paddingHorizontal: 15,

                                        }}>
                                            <Text style={{
                                                textAlign: "justify"
                                            }}>{pkg.description}</Text>
                                        </View>

                                    </ImageBackground>
                                </View>

                            ))
                        }

                        <TouchableOpacity onPress={() => {

                            console.log("TYpe is ", params.type);

                            if (params.type === "Player") {
                                Navigation.navigate("RoadToPro_3")
                            }
                            else {
                                Navigation.navigate("TrainerHome")
                            }
                        }}>
                            <Text style={{
                                marginTop: 20,
                                textAlign: "center",
                                color: Colors.lightshade,
                                fontSize: 16
                            }}>Skip</Text>
                        </TouchableOpacity>


                        {/* <View style={{
                            marginTop: 20,
                            borderRadius: 10,

                        }}>
                            <ImageBackground
                                source={require('../../../Images/plan_bk_2.png')}
                                style={{
                                    width: Dimensions.get("window").width * 0.87,
                                    minHeight: 125,
                                    alignSelf: "center",
                                    flexDirection: "column"
                                }}
                                imageStyle={{
                                    borderRadius: 10
                                }}
                            >

                                <View style={{
                                    flexDirection: "row"
                                }}>

                                    <View style={{
                                        flex: 2
                                    }}>
                                        <Text style={{
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            paddingLeft: 15,
                                            paddingTop: 20
                                        }}>Advance Pack</Text>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        paddingTop: 20
                                    }}>
                                        <Text style={{
                                            fontStyle: "italic",
                                            textAlign: "right"
                                        }}>Pay per week</Text>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        paddingRight: 15,
                                        paddingTop: 20
                                    }}>
                                        <Text style={{
                                            textAlign: "right",
                                            fontWeight: "bold",
                                            fontSize: 20
                                        }}>$150</Text>
                                    </View>

                                </View>

                                <View style={{
                                    marginTop: 10,
                                    paddingHorizontal: 15,

                                }}>
                                    <Text style={{
                                        textAlign: "justify"
                                    }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </Text>
                                </View>

                            </ImageBackground>
                        </View> */}



                    </View>



                    {/* </ScrollView> */}

                </KeyboardAwareScrollView>
                {/* </KeyboardAvoidingView> */}




            </SafeAreaView>
        );
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


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 0,
        paddingHorizontal: 10,
        fontFamily: Fonts.Bold,
        borderRadius: 4,
        color: Colors.light,
        paddingRight: 0, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 0,
        fontFamily: Fonts.Bold,
        borderRadius: 8,
        color: Colors.light,
        paddingRight: 0, // to ensure the text is never behind the icon
    },
});


export default connect(mapStateToProps)(RoadToProPlan);

