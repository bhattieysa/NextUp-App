import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, KeyboardAvoidingView,
  Alert, Platform,
} from 'react-native';
import { Layout, Colors, Fonts, CommonStyles } from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';


import ImagePicker from 'react-native-image-crop-picker';
import { getObject } from '../../middleware';
import { createNewTeam } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import AnimatedInput from '../../Helpers/react-native-animated-input';
import { uploadPhoto } from '../../actions/auth';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { Title } from '../../components/common/titleLabel';
import { showErrorAlert, showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';

let wide = Layout.width;


class InvitePlayer extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fullname: "",
      email: '',
      contactNumber: '',
      sharedLink: '',
      removeLoading: false,
      isbtnEnable: false,
    };
  }
  componentDidMount() {
    // this.props.navigation.addListener('didFocus', this.onScreenFocus)
    // this.onScreenFocus();
  }
  onScreenFocus = () => {
    // this.getInitialData(false)
  }


  actionInvite = () => {

    const { teamName, avatar } = this.state;
    debugger
    if (teamName.length == 0 || avatar.length == 0) {
      alert('Please enter name/logo to add the team.')
      return
    }
    debugger
    this.setState({ loading: true }, () => {
      getObject('UserId').then((obj) => {

        console.log("res0 ", obj);

        this.props.dispatch(uploadPhoto(avatar, obj, 'team', 'TEAM_LOGO', (res, uploadedUrl) => {
          debugger

          console.log("res1 ", res);

          if (res) {

            debugger
            console.log("creating new team");
            this.props.dispatch(createNewTeam({
              "name": teamName,
              "coachId": obj,
              "teamLogo": uploadedUrl,
              "seasonType": "2020-21",
              "ownerId": obj,
            }, (res) => {

              console.log("res2 ", res);

              if (res) {
                debugger
                this.setState({ loading: false }, () => {
                  setTimeout(() => {
                    Navigation.back();
                  }, 200);
                })


              }
            }))
          }
          else {
            this.setState({ loading: false }, () => {
              setTimeout(() => {
                showErrorAlert('Something went wrong!')
              }, 500);
            })

          }
        }))
      })
    })
  }




  handleBtnEnable = () => {
    const { avatar, teamName } = this.state
    if (avatar.length !== 0 && teamName.length !== 0) {
      this.setState({ isbtnEnable: true })
    } else {
      this.setState({ isbtnEnable: false })
    }
  }

  render() {
    const { teamName, avatar, isbtnEnable } = this.state;
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
        <AppLoader visible={this.state.loading} />
        <KeyBoardDismissHandler>
          <View style={[CommonStyles.headerBottomLine]}>
            <ScreenHeader
              title={'Invite Player'}
              backButtonAction={() => Navigation.back()}
            />
          </View>
          <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>

            <View>
              <View style={{
                // backgroundColor: 'green',
                marginHorizontal: 35,
                marginTop: 20,
                marginBottom: wide * 0.03,
              }}>
                <AnimatedInput
                  placeholder="FULL NAME"
                  onChangeText={(e) => this.setState({ fullname: e }, () => {
                    this.handleBtnEnable();
                  })}
                  value={teamName}
                  styleInput={{
                    fontFamily: Fonts.Bold,
                    color: Colors.light,
                    fontSize: 16, lineHeight: 18
                  }}
                  styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                  styleBodyContent={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: Colors.borderColor,
                    width: wide * 0.8
                  }}
                />

              </View>

              <View style={{
                // backgroundColor: 'green',
                marginHorizontal: 35,
                marginTop: 20,
                marginBottom: wide * 0.03,
              }}>
                <AnimatedInput
                  placeholder="EMAIL"
                  onChangeText={(e) => this.setState({ email: e }, () => {
                    this.handleBtnEnable();
                  })}
                  value={teamName}
                  styleInput={{
                    fontFamily: Fonts.Bold,
                    color: Colors.light,
                    fontSize: 16, lineHeight: 18
                  }}
                  styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                  styleBodyContent={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: Colors.borderColor,
                    width: wide * 0.8
                  }}
                />

              </View>

              <View style={{
                // backgroundColor: 'green',
                marginHorizontal: 35,
                marginTop: 20,
                marginBottom: wide * 0.03,
              }}>
                <AnimatedInput
                  placeholder="CONTACT NUMBER"
                  onChangeText={(e) => this.setState({ contactNumber: e }, () => {
                    this.handleBtnEnable();
                  })}
                  value={teamName}
                  styleInput={{
                    fontFamily: Fonts.Bold,
                    color: Colors.light,
                    fontSize: 16, lineHeight: 18
                  }}
                  styleLabel={{ fontFamily: Fonts.Bold, color: Colors.borderColor }}
                  styleBodyContent={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: Colors.borderColor,
                    width: wide * 0.8
                  }}
                />

              </View>
              {/* <AppLoader visible={this.state.loading} /> */}

            </View>

            {/* <AppLoader visible={this.state.removeLoading} /> */}
          </KeyboardAvoidingView>
          <TouchableOpacity
            key={isbtnEnable}
            activeOpacity={0.3}
            style={{
              width: wide * 0.8, height: 48,
              backgroundColor: Colors.btnBg,
              alignSelf: 'center', borderRadius: 24,
              justifyContent: 'center',
              opacity: isbtnEnable === false ? 0.3 : 1.0,
              marginBottom: 50,
              // marginTop: 20,
            }} onPress={() => {
              if (isbtnEnable) {
                this.actionInvite()
              }
            }}>
            <Text style={{
              alignSelf: 'center', color: Colors.light,
              fontFamily: Fonts.Bold,
            }}>Done</Text>
          </TouchableOpacity>
        </KeyBoardDismissHandler>
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

export default connect(mapStateToProps)(InvitePlayer);