import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, KeyboardAvoidingView,
  Alert, Platform, Share,
} from 'react-native';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';


import ImagePicker from 'react-native-image-crop-picker';
import { getObject } from '../../middleware';
import { invitePlayerToTeam } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import AnimatedInput from '../../Helpers/react-native-animated-input';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { Title } from '../../components/common/titleLabel';
import { showErrorAlert, showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import { DropDownSelect } from '../../components/common/customDropDown';

let wide = Layout.width;


class CreatePractice extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selected_location: '',
      date: '',
      time: false,
      isbtnEnable: false
    };
  }
  componentDidMount() {
    // this.props.navigation.addListener('didFocus', this.onScreenFocus)
    // this.onScreenFocus();
  }
  onScreenFocus = () => {
    // this.getInitialData(false)
  }




  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native https://reactnative.dev/',

      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log("Shared with activity....!", result)

        } else {
          // shared
          console.log("Shared ....!", result)
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log("Share action cancel....!", result)
      }
    } catch (error) {
      console.log("Share action error....!")
      alert(error.message);
    }
  };




  handleBtnEnable = () => {
    const { fullname, email, contactNumber } = this.state
    if (fullname !== '' && email !== '' && contactNumber !== '') {
      this.setState({ isbtnEnable: true })
    } else {
      this.setState({ isbtnEnable: false })
    }
  }

  render() {
    const { selected_location, date, time, isbtnEnable } = this.state;
    return (

      <View style={{ flex: 1, backgroundColor: Colors.base }}>
        <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
          <AppLoader visible={this.state.loading} />
          <KeyBoardDismissHandler>
            <View style={{ width: '90%', }}>
              <ScreenHeader
                title={'Create Practice'}
                backButtonAction={() => Navigation.back()}
              />
            </View>
            <KeyboardAvoidingView
              keyboardVerticalOffset={45}
              style={{ flex: 1, }}
              behavior={Platform.OS === 'ios' ? "padding" : null}
            >
              <View style={{ width: '88%', alignSelf: 'center', }}>
                <View style={{
                  // backgroundColor: 'green',
                  // marginHorizontal: 35,
                  marginTop: wide * 0.09,
                  marginBottom: wide * 0.03,
                }}>

                  <TouchableOpacity
                    //  onPress={() => this.setState({ openStateModal: true })}
                    activeOpacity={1}>
                    <DropDownSelect
                      isIcon
                      containerStyle={{
                        width: wide * 0.8,
                        // height: 60,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.borderColor,
                        alignItems: "center",
                        justifyContent: 'center',

                      }}
                      placeHolderContainerStyl={{
                        flexDirection: 'row', width: '98%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // marginTop: wide * 0.015,
                        marginBottom: selected_location == '' || selected_location == undefined ? wide * 0.025 : wide * 0.008

                      }}
                      placeHolderLabelStyl={{
                        fontFamily: Fonts.Bold,
                        color: Colors.txtFieldPlaceHolder,
                        fontSize: 16, lineHeight: 18,
                        fontWeight: '700'
                      }}
                      iconStyl={{
                        width: 8,
                        height: 8,
                      }}
                      textStyle={{
                        width: '98%',
                        fontFamily: Fonts.Bold,
                        color: Colors.light,
                        fontSize: 16, lineHeight: 18,
                        fontWeight: '600',
                        marginTop: wide * 0.02,
                        marginBottom: wide * 0.03,
                        alignSelf: 'center'
                      }}
                      placeHolder={'LOCATION'}
                      selectedValue={selected_location}
                    // onPress={() => this.setState({ openStateModal: true })}
                    />

                  </TouchableOpacity>
                </View>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: wide * 0.1,
                  width: '100%',
                }}>
                  <TouchableOpacity
                    // onPress={() => this.setState({ openStateModal: true })}
                    activeOpacity={1}>
                    <DropDownSelect
                      isIcon
                      containerStyle={{
                        width: wide * 0.4,
                        // height: 60,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.borderColor,
                        alignItems: "center",
                        justifyContent: 'center',

                      }}
                      placeHolderContainerStyl={{
                        flexDirection: 'row', width: '98%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // marginTop: wide * 0.015,
                        marginBottom: date == '' || date == undefined ? wide * 0.025 : wide * 0.008

                      }}
                      placeHolderLabelStyl={{
                        fontFamily: Fonts.Bold,
                        color: Colors.txtFieldPlaceHolder,
                        fontSize: 16, lineHeight: 18,
                        fontWeight: '700'
                      }}
                      iconStyl={{
                        width: 8,
                        height: 8,
                      }}
                      textStyle={{
                        width: '98%',
                        fontFamily: Fonts.Bold,
                        color: Colors.light,
                        fontSize: 16, lineHeight: 18,
                        fontWeight: '600',
                        marginTop: wide * 0.02,
                        marginBottom: wide * 0.03,
                        alignSelf: 'center'
                      }}
                      placeHolder={'DATE'}
                      selectedValue={date}
                    // onPress={() => this.setState({ openStateModal: true })}
                    />

                  </TouchableOpacity>


                  <TouchableOpacity
                    // onPress={() => this.setState({ openCityModal: true })}
                    activeOpacity={1}
                  >
                    <DropDownSelect
                      isIcon
                      containerStyle={{
                        width: wide * 0.4,
                        // height: 60,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.borderColor,
                        alignItems: "center",
                        justifyContent: 'center',

                      }}
                      placeHolderContainerStyl={{
                        flexDirection: 'row', width: '98%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: time == '' || time == undefined ? wide * 0.025 : wide * 0.008

                      }}
                      placeHolderLabelStyl={{
                        fontFamily: Fonts.Bold,
                        color: Colors.txtFieldPlaceHolder,
                        fontSize: 16, lineHeight: 18,
                        fontWeight: '700'
                      }}
                      iconStyl={{
                        width: 8,
                        height: 8,
                      }}
                      textStyle={{
                        width: '98%',
                        fontFamily: Fonts.Bold,
                        color: Colors.light,
                        fontSize: 16, lineHeight: 18,
                        fontWeight: '600',
                        marginTop: wide * 0.02,
                        marginBottom: wide * 0.03,
                        alignSelf: 'center'
                      }}
                      placeHolder={'TIME'}
                      selectedValue={time}
                    // onPress={() => this.setState({ openCityModal: true })}
                    />
                  </TouchableOpacity>

                </View>
              </View>
              <TouchableOpacity
                key={isbtnEnable}
                activeOpacity={0.3}
                style={{
                  width: wide * 0.8, height: 48,
                  backgroundColor: Colors.btnBg,
                  alignSelf: 'center', borderRadius: 24,
                  justifyContent: 'center',
                  opacity: isbtnEnable === false ? 0.3 : 1.0,
                  marginTop: wide * 1.2,
                }} onPress={() => {
                  if (isbtnEnable) {
                    this.onShare()
                    // this.actionInvite()
                  }
                }}>
                <Text style={{
                  alignSelf: 'center', color: Colors.light,
                  fontFamily: Fonts.Bold,
                  fontSize: 14, lineHeight: 16,
                  fontWeight: '700'
                }}>Schedule</Text>
              </TouchableOpacity>
              {/* <AppLoader visible={this.state.removeLoading} /> */}
            </KeyboardAvoidingView>

          </KeyBoardDismissHandler>
        </SafeAreaView >
      </View>

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

export default connect(mapStateToProps)(CreatePractice);