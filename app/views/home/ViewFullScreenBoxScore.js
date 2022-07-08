import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, Text, SafeAreaView, Image, KeyboardAvoidingView, FlatList, Platform, Modal, StatusBar } from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';

import FastImage from 'react-native-fast-image';
import { Title } from '../../components/common/titleLabel';
import Orientation from 'react-native-orientation-locker';
import FullScreenQuickBoxScoreTable from '../../components/common/FullScreenQuickBoxScoreTable';

let wide = Layout.width;
let high = Layout.height;

class ViewFullScreenBoxScore extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      boxScoreData: props.navigation.state.params !== undefined ? props.navigation.state.params.boxScoreData : null,
    };

    Orientation.getOrientation((res) => {
      if (res == 'PORTRAIT') {
        Orientation.lockToLandscape()
        StatusBar.setHidden(true)
      }
    })
  }

  componentDidMount() {
    // this.props.navigation.addListener('didFocus', this.onScreenFocus)
  }

  componentWillUnmount() {
    Orientation.getOrientation((res) => {
      if (res == 'PORTRAIT') {
      } else if (res == 'LANDSCAPE-LEFT') {
        Orientation.lockToPortrait()
        StatusBar.setHidden(false)
      } else if (res == 'LANDSCAPE-RIGHT') {
        Orientation.lockToPortrait()
        StatusBar.setHidden(false)
      }
    })
  }

  onScreenFocus = () => {
    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        this.props.dispatch(myStandingFeed(obj, (res) => {
          // this.setState({ loading: false }, () => {
          if (res) {
            const { myStandingData } = this.props.Home

            var arr = []
            var seasonArr = []
            myStandingData.standingSeasonInfo?.statsForSeasonList.forEach((item, index) => {
              var obj = item?.seasonStats;
              seasonArr.push(item.season)
              arr.push({ ...obj, id: "#" + index })
            })
            this.setState({
              statTabelData: arr, seasonList: seasonArr,
              firstDropSelectedVal: seasonArr[0], secondDropSelectedVal: seasonArr[1]
            }, () => {
              this._filterUserStatBarData(myStandingData?.userKpi);
            })


          }
        }))
      })

    })
  }

  _handleBackPress = () => {
    Orientation.getOrientation((res) => {
      if (res == 'PORTRAIT') {
        // Navigation.back();
      } else if (res == 'LANDSCAPE-LEFT') {
        Orientation.lockToPortrait()
        StatusBar.setHidden(false)
        Navigation.back();
      } else if (res == 'LANDSCAPE-RIGHT') {
        Orientation.lockToPortrait()
        StatusBar.setHidden(false)
        Navigation.back();
      }
    })


  }

  render() {
    const { boxScoreData } = this.state;
    console.log("sideBarData", boxScoreData)
    return (
      <SafeAreaView style={{ backgroundColor: Colors.base, width: high, height: wide, }}>
        <View style={{
          width: '90%', flexDirection: 'row', alignItems: 'center',
          justifyContent: 'space-between', height: 50,
          marginBottom: 8,

        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity style={{
              width: wide * 0.1,
              // marginHorizontal: 15
            }}
              onPress={() => this._handleBackPress()}>
              <FastImage style={{
                width: wide * 0.08, height: wide * 0.08,
                borderRadius: wide * 0.02,
                borderWidth: 1, borderColor: Colors.borderColor
              }}
                source={require('../../Images/back_ico.png')}
              />
            </TouchableOpacity>
            <Text style={{
              // marginTop: 16,
              color: Colors.light, fontSize: 24,
              fontFamily: Fonts.Bold, lineHeight: 40,
              marginHorizontal: 10
            }}>
              Box Score
            </Text>

          </View>
        </View>
        {this.state.loading == true ?
          <AppLoader visible={this.state.loading} /> : <></>}
        {/* <KeyboardAvoidingView keyboardVerticalOffset={45} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}> */}

        <ScrollView showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            // minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
            marginTop: wide * 0.01
          }}
        >

          <View style={{ width: '90%', alignSelf: 'center' }} >
            <View style={{ marginTop: wide * 0.03, }}>
              <View style={{}}>
                {boxScoreData != null && boxScoreData !== undefined ?
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}
                  // bounces={false}
                  >
                    <FullScreenQuickBoxScoreTable
                      // teamId={teamId} 
                      data={boxScoreData}
                      heading={"Table stat"} />
                  </ScrollView>
                  : <></>}

              </View>
            </View>


          </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}

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

export default connect(mapStateToProps)(ViewFullScreenBoxScore);
