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
    var seasonName = this.props.navigation.state.params.selectedSeason;
    var teamId = this.props.navigation.state.params.teamDetails?.teamId;

    debugger

    var objec = {
      "fullName": fullname,
      "emailId": email,
      "contactNumber": contactNumber,
      "sharedLink": "nextup.com",
      "seasonName": seasonName,
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
    const { fullname, email, contactNumber, isbtnEnable } = this.state;
    return (

      <View style={{ flex: 1, backgroundColor: Colors.base }}>
        <SafeAreaView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0, backgroundColor: Colors.base }}>
          <AppLoader visible={this.state.loading} />
          <KeyBoardDismissHandler>
            <View style={{ width: '90%', }}>
              <ScreenHeader
                title={'Invite Player'}
                backButtonAction={() => Navigation.back()}
              />
            </View>
            <KeyboardAvoidingView
              keyboardVerticalOffset={45}
              style={{ flex: 1, }}
              behavior={Platform.OS === 'ios' ? "padding" : null}
            >
              <View style={{ width: '88%', alignSelf: 'center' }}>
                <View style={{
                  // backgroundColor: 'green',
                  // marginHorizontal: 35,
                  marginTop: wide * 0.1,
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
                      fontSize: 16, lineHeight: 18,
                      fontWeight: '600'
                    }}
                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder }}
                    styleBodyContent={{
                      borderBottomWidth: 1.5,
                      borderBottomColor: Colors.borderColor,
                      width: wide * 0.8
                    }}
                  />

                </View>

                <View style={{
                  // backgroundColor: 'green',
                  // marginHorizontal: 35,
                  marginTop: wide * 0.08,
                  marginBottom: wide * 0.03,
                }}>
                  <AnimatedInput
                    placeholder="EMAIL ID"
                    onChangeText={(e) => this.setState({ email: e }, () => {
                      this.handleBtnEnable();
                    })}
                    value={email}
                    styleInput={{
                      fontFamily: Fonts.Bold,
                      color: Colors.light,
                      fontSize: 16, lineHeight: 18,
                      fontWeight: '600'
                    }}
                    styleLabel={{ fontFamily: Fonts.Bold, color: Colors.txtFieldPlaceHolder, }}
                    styleBodyContent={{
                      borderBottomWidth: 1.5,
                      borderBottomColor: Colors.borderColor,
                      width: wide * 0.8
                    }}
                  />

                </View>

                <View style={{
                  // backgroundColor: 'green',
                  // marginHorizontal: 35,
                  marginTop: wide * 0.1,
                  marginBottom: wide * 0.03,
                }}>
                  <AnimatedInput
                    placeholder="PHONE NUMBER"
                    onChangeText={(e) => this.setState({ contactNumber: e }, () => {
                      this.handleBtnEnable();
                    })}
                    value={contactNumber}
                    styleInput={{
                      fontFamily: Fonts.Bold,
                      color: Colors.light,
                      fontSize: 16, lineHeight: 18,
                      fontWeight: '600'
                    }}
                    styleLabel={{
                      fontFamily: Fonts.Bold,

                      color: Colors.txtFieldPlaceHolder
                    }}
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
                    this.onShare()
                    // this.actionInvite()
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

export default connect(mapStateToProps)(InvitePlayer);