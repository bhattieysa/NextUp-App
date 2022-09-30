import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image,
  Platform, StyleSheet, ScrollView, Linking, Share, Alert
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';
import { AccountItem } from '../../components/common/accountLabelItem'
import { UserModel } from '../../constants/constant';
import { getObject, removeAllLocalData } from '../../middleware';
import { Logout } from '../../actions/auth';


let wide = Layout.width;
let high = Layout.height;


class UserAccount extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      arrPlayers: [],
      dropDownSelectedVal: null,
      teamDropDownSelectedVal: 'Golden slack',
      pieChartData: [],
      totalMatches: null,
      teamDropDownData: [],
      sharedData: '',
      sharedMimeType: '',
      sharedExtraData: null,
      showSessionModal: false,
      showTeamModal: false,
      isStatNull: false,
      winStreak: null,
      last_10: null,

    };
  }


  componentDidMount() {

  }

  showLogOutAlert = () => {
    Alert.alert(
      "Alert",
      "Are you sure you want to log out?",
      [
        {
          text: "Yes",
          onPress: () => this._handleLogOut()
        },
        {
          text: "Cancel",
          style: 'cancel',
          onPress: () => { return }
        },

      ],
      { cancelable: false },
    );
  }

  _handleLogOut = () => {
    debugger
    console.log("Logout call");
    let deviceTkn = '';

    getObject('DEVICE_TOKEN').then((tkn) => {

      console.log("Token is ", tkn);

      if (!tkn) {
        console.log("Not have token removing local data");
        setTimeout(() => {
          removeAllLocalData().then((res) => {
            if (res) {
              debugger
              console.log(res);
              Navigation.navigate('AppReload');

            }
          })
        }, 200);
      }

      deviceTkn = tkn;

      getObject('UserId').then((obj) => {
        this.setState({ loading: true }, () => {
          this.props.dispatch(Logout(obj, tkn, (res, resData) => {
            if (res) {
              debugger
              this.setState({ loading: false }, () => {
                setTimeout(() => {
                  removeAllLocalData().then((res) => {
                    if (res) {
                      debugger
                      console.log(res);
                      Navigation.navigate('AppReload');

                    }
                  })
                }, 200);
              })
            }
          }))
        })
      })

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




  render() {
    // debugger
    const { coachDash } = this.props.Home

    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1, marginTop: Platform.OS == 'android' ? 20 : 0,
          backgroundColor: Colors.base
        }}>
          <ScrollView style={{
            flex: 1,
            overflow: 'scroll',
            paddingBottom: 20,
          }} bounces={false}>
            <View style={{ width: '92%', alignSelf: 'center', }}>
              <View style={{
                width: '100%', height: wide * 0.12,
                flexDirection: 'row', justifyContent: 'flex-end',
                alignItems: 'center'
              }}>

                {/* <Text style={{
                  marginHorizontal: 16,
                  color: Colors.light, fontSize: 18,
                  fontFamily: Fonts.Bold, lineHeight: 24,

                }}>Account</Text> */}
                <Image
                  source={require('../../Images/notif_bell_icon.png')}
                  style={{ width: 26, height: 26, }}
                  resizeMode={'contain'}
                />
              </View>

              <View style={{
                width: '100%',
                alignItems: 'center',
                marginTop: wide * 0.02
              }}>
                <View style={{
                  width: wide * 0.25, height: wide * 0.25,
                  justifyContent: 'center', alignItems: 'center',
                  borderRadius: wide * 0.25 / 2, borderWidth: 2,
                  borderColor: Colors.light
                }}>
                  <Image
                    // source={require('../../Images/male_onboard_Icon.png')}
                    source={{ uri: UserModel.profileUrl }}
                    style={{
                      width: '98%', height: '98%',
                      borderRadius: wide * 0.25 / 2,
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <View style={{ marginTop: wide * 0.025, }}>
                  <Text style={{
                    // marginHorizontal: 16,
                    color: Colors.light, fontSize: 20,
                    fontFamily: Fonts.Bold, lineHeight: 25,

                  }}>{`${UserModel.fname} ${UserModel.lname}`}</Text>
                </View>
                <TouchableOpacity
                  style={{ marginTop: wide * 0.012 }}
                  activeOpacity={1}
                  onPress={() => Navigation.navigate('EditProfile')}
                >
                  <Text style={{
                    // marginHorizontal: 16,
                    color: Colors.greyTxtColor, fontSize: 13,
                    fontFamily: Fonts.Bold, lineHeight: 16,
                  }}>Edit Profile</Text>
                </TouchableOpacity>

              </View>

              <View style={{
                width: '100%',
                alignItems: 'center',
                marginTop: wide * 0.1,
                marginBottom: wide * 0.02
              }}>
                <TouchableOpacity style={{ width: '100%' }   }>
                  <AccountItem title={'My Profile'} icon={require('../../Images/bottomAccount_icon.png')} 
                   onPress={() => {Navigation.navigate('MyProfile')}}
                  
                  />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%', marginTop: wide * 0.035, }}>
                  <AccountItem title={'Subscription'} icon={require('../../Images/subsctiption_icon.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%', marginTop: wide * 0.035, }}>
                  <AccountItem title={'Help and Support'} icon={require('../../Images/help_support_iocn.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ width: '100%', marginTop: wide * 0.035, }}
                  onPress={() => Linking.openURL('https://reactnative.dev/')}
                >
                  <AccountItem
                    title={'Privacy Policy'}
                    icon={require('../../Images/ShieldCheck.png')}
                    onPress={() => Linking.openURL('https://reactnative.dev/')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ width: '100%', marginTop: wide * 0.035, }}
                  onPress={() => Linking.openURL('https://reactnative.dev/')}
                >
                  <AccountItem
                    title={'Terms and Condition'}
                    icon={require('../../Images/terms_icon.png')}
                    onPress={() => Linking.openURL('https://reactnative.dev/')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ width: '100%', marginTop: wide * 0.035, }}
                  onPress={() => this.onShare()}
                >
                  <AccountItem title={'Share Application'}
                    icon={require('../../Images/share_app_icon.png')}
                    onPress={() => this.onShare()}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ width: '100%', marginTop: wide * 0.035, }}
                >
                  <AccountItem title={'Rate Us'}
                    icon={require('../../Images/star_icon.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ width: '100%', marginTop: wide * 0.035, }}
                  onPress={() => this.showLogOutAlert()}
                >
                  <AccountItem
                    title={'Logout'}
                    icon={require('../../Images/newLogOut_icon.png')}
                    onPress={() => this.showLogOutAlert()}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '100%', marginTop: wide * 0.035, }}>
                  <AccountItem title={'Delete Account'}
                    icon={require('../../Images/delete_icon.png')}
                  />
                </TouchableOpacity>

              </View>


            </View>
          </ScrollView>
        </SafeAreaView >
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

function mapStateToProps(state) {
  const { entities } = state;
  return {
    authReducer: state.authReducer,
    Home: entities.homePlayer
  };
}

export default connect(mapStateToProps)(UserAccount);








