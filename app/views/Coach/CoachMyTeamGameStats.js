
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key,
  KeyboardAvoidingView, FlatList, StyleSheet, StatusBar
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';

import { UserModel } from '../../constants/constant';
import { isNotch } from '../../utils/deviceInfo';
import moment from 'moment'
import { getObject } from '../../middleware';
import { getMoreRecentGames } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import TeamStats from './Components/TeamStats';


let wide = Layout.width;
let pageNum = 0;

class CoachGameStat extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      gameDataList: null,

    };
  }
  componentDidMount() {
    pageNum = 0;
    // this.onScreenFoucs();

  }

  onScreenFoucs = () => {
    getObject('UserId').then((obj) => {
      this.setState({ loading: true }, () => {
        this.props.dispatch(getMoreRecentGames(obj, (res, resData) => {
          if (res) {

            this.setState({
              loading: false,
              gameDataList: resData,
            })

          } else {
            this.setState({
              loading: false,
            })
          }
        }))
      })

    })
  }

  renderRecentGames = (item, index) => {
    console.log("Itemm,", item);
    return (
      <TeamStats key={`game-${index}`} data={item.item} />
    )
  }


  render() {

    const { loading, gameDataList } = this.state;
    // console.log(dataList, topRankerData);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          <View style={{
            alignItems: 'center',
          }}>
            <View style={{
              width: '90%', flexDirection: 'row', alignItems: 'center',
              justifyContent: 'space-between', height: 50,
              marginBottom: 8,
              // backgroundColor: 'green'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity style={{
                  width: wide * 0.1,
                  // marginHorizontal: 15
                }} onPress={() => Navigation.back()}>
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
                  Game Statistics
                </Text>

              </View>
            </View>

          </View>
          {loading == true ?
            <View style={{ flex: 1, backgroundColor: Colors.base }}>
              <AppLoader visible={this.state.loading} />
            </View>
            :
            <>
              <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}>
                <View style={{ backgroundColor: Colors.base, alignItems: 'center', paddingBottom: wide * 0.01 }} >
                  <View style={{ marginTop: wide * 0.01, width: '100%' }}>
                    {/* <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      style={{ width: '100%', }}
                      data={gameDataList}
                      renderItem={(item, index) => this.renderRecentGames(item, index)}
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                    /> */}
                  </View>
                </View>

              </KeyboardAvoidingView>

            </>
          }
        </SafeAreaView >
      </View>

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

const styles = StyleSheet.create({
  BackIcon: {
    width: wide * 0.09, height: wide * 0.09,
    marginTop: 20, borderRadius: wide * 0.03, borderWidth: 1,
    borderColor: Colors.borderColor, marginHorizontal: 10
  },
  headerText: {

    color: Colors.light, fontSize: 32, lineHeight: 36, fontFamily: Fonts.SemiBold

  },
  mediumHeaderText: {

    color: Colors.light, fontSize: 25, lineHeight: 26, fontFamily: Fonts.SemiBold

  },
  textPoint: {
    color: Colors.light, fontSize: 24, fontFamily: Fonts.Bold,
    marginTop: 6,
  },
  textPointHeading: {
    color: Colors.fontColorGray, fontSize: 17, fontFamily: Fonts.SemiBold,
  },
  textPointCenter: {
    color: Colors.light, fontSize: 18, fontFamily: Fonts.Bold,
    marginTop: 6, textAlign: 'center'
  },
});

export default connect(mapStateToProps)(CoachGameStat);
