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
import { invitePlayerToTeam } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import AnimatedInput from '../../Helpers/react-native-animated-input';
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
    const { fullname, email, contactNumber, } = this.state;
    var outerIndex = this.props.navigation.state.params.playerDetails?.teamPlayersInfoList[0]?.index;
    var season = this.props.navigation.state.params.teamDetails?.seasonType;
    var teamId = this.props.navigation.state.params.teamDetails?.teamId;

    var objec = {
      "fullName": fullname,
      "emailId": email,
      "contactNumber": contactNumber,
      "sharedLink": "nextup.com",
      "seasonName": season,
      "positionIndex": outerIndex,
      "teamPositionIndex": this.props.navigation.state.params.playerDetails.teamPlayersInfoList.length,
    }

    debugger
    this.setState({ loading: true }, () => {
      this.props.dispatch(invitePlayerToTeam(teamId, objec, (res, resData) => {
        if (res) {
          this.setState({ loading: false }, () => {
            setTimeout(() => {
              Navigation.back();
            }, 200);
          })
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
  }




  handleBtnEnable = () => {
    const { fullname, email, contactNumber } = this.state
    if (fullname !== '' && email !== '' && contactNumber !== '') {
      this.setState({ isbtnEnable: true })
    } else {
      this.setState({ isbtnEnable: false })
    }
  }

  render() {
    const { fullname, email, contactNumber, isbtnEnable } = this.state;
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
                marginTop: 40,
                marginBottom: wide * 0.03,
              }}>
                <AnimatedInput
                  placeholder="FULL NAME"
                  onChangeText={(e) => this.setState({ fullname: e }, () => {
                    this.handleBtnEnable();
                  })}
                  value={fullname}
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
                  value={email}
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
                  value={contactNumber}
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
                  keyboardType={'numeric'}

                />

              </View>
              {/* <AppLoader visible={this.state.loading} /> */}

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
                marginTop: 20,
              }} onPress={() => {
                if (isbtnEnable) {
                  this.actionInvite()
                }
              }}>
              <Text style={{
                alignSelf: 'center', color: Colors.light,
                fontFamily: Fonts.Bold,
              }}>Send Invitation</Text>
            </TouchableOpacity>
            {/* <AppLoader visible={this.state.removeLoading} /> */}
          </KeyboardAvoidingView>

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