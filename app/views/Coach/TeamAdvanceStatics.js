
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key,
  KeyboardAvoidingView, FlatList, StyleSheet, StatusBar, Button, Modal, ScrollView
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
import { getTeamAdvanceStat } from '../../actions/home';
import FastImage from 'react-native-fast-image';
import HeadingWithLine, { PlayerStatHeadingWithLine } from '../../components/common/HeadingWithLine'


let wide = Layout.width;
let high = Layout.height;
let pageNum = 0;
const playGroundWidth = wide * 0.9;
const background = '#363A47';
const foreground = '#fff';
const shapeDefaultBG = '#85ADFF';


const redColor = '#FF5E5E';
const blueColor = '#85ADFF';
const yellow1Color = '#E0BD90';
const yellow2Color = '#FFD884';
const yellow3Color = '#FDB927';

class TeamAdvanceStatics extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      teamStatData: null,
      analyticsScoreList: null
    };
  }
  componentDidMount() {
    this.onScreenFoucs();
  }

  onScreenFoucs = () => {
    // getObject('UserId').then((obj) => {
    // for data use teamp game id :-  165942904840805/2020-21
    this.setState({ loading: true }, () => {
      this.props.dispatch(getTeamAdvanceStat(165942904840805, "2020-21", (res, resData) => {
        if (res) {
          debugger
          this.setState({
            loading: false,
            teamStatData: resData,
            analyticsScoreList: resData?.analyticsScoreList,
          })

        } else {
          this.setState({
            loading: false,
          })
        }
      }))
    })
    // })
  }

  renderStatsOfFocus = (item, index) => {
    debugger
    return (
      <TouchableOpacity style={{
        width: wide * 0.21,
        height: wide * 0.16,
        borderRadius: 10,
        flexDirection: 'column',
        marginVertical: wide * 0.015,
        marginHorizontal: wide * 0.01,
        backgroundColor: Colors.lightDark,
        justifyContent: 'center',
        alignItems: 'center',

      }}>

        <Text style={{
          // marginTop: 16,
          color: Colors.light, fontSize: 24,
          fontFamily: Fonts.Bold, lineHeight: 30,
          // marginHorizontal: 10
        }}>
          {item.item?.value}
        </Text>

        <Text style={{
          // marginTop: 16,
          color: Colors.newGrayFontColor, fontSize: 14,
          fontFamily: Fonts.SemiBold, lineHeight: 20,
          // marginHorizontal: 10
        }}>
          {item.item?.point_label}
        </Text>


      </TouchableOpacity>
    )
  }

  _renderAnalitics = (item, index) => {
    debugger
    let arr = []
    if (item.item?.score != null) {
      var obj = item.item?.score

      for (const key in obj) {
        debugger
        arr.push({
          point_label: key,
          value: parseFloat(obj[key])
        })
      }
    }

    return (
      <View style={{ flex: 1, }}>
        <HeadingWithLine heading={item.item?.name} />

        <View style={{
          width: '90%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: wide * 0.04,
        }} >

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={arr}
            showsVerticalScrollIndicator={false}
            bounces={false}
            numColumns={4}
            scrollEnabled={false}
            renderItem={(item, index) => this.renderStatsOfFocus(item, index)}
           
          />
        </View>
      </View>
    )
  }

  render() {

    const { loading, teamStatData, analyticsScoreList } = this.state;
    console.log("PlayerSelected...");

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
                  Advanced Statistics
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
              <ScrollView bounces={false} style={{ flex: 1, marginBottom: wide * 0.02 }}>
                {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : null}> */}
                <View style={{
                  flex: 1,
                  backgroundColor: Colors.base,
                  alignItems: 'center',
                }} >
                  <View style={{
                    marginTop: wide * 0.01,
                    width: '90%',
                    height: wide * 0.2,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.ractangelCardColor
                  }}>
                    <View style={{
                      width: '80%', flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <View style={{
                          width: wide * 0.14, height: wide * 0.14,
                          borderRadius: wide * 0.14 / 2
                        }}>
                          <FastImage style={{
                            width: wide * 0.12, height: wide * 0.12,
                            borderRadius: wide * 0.12 / 2,
                          }}
                            source={{
                              uri: teamStatData?.teamLogoUrl,
                              priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                        <View>
                          <Text style={{
                            color: Colors.light, fontSize: 16,
                            fontFamily: Fonts.Bold,
                            lineHeight: 20,
                            marginHorizontal: 10
                          }}>
                            {teamStatData?.teamName}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{
                          color: Colors.light, fontSize: 28,
                          fontFamily: Fonts.SemiBold,
                          lineHeight: 40,
                        }}>
                          {`${teamStatData?.wins} - ${teamStatData?.loss}`}
                        </Text>
                      </View>
                    </View>
                  </View>


                </View>
                {analyticsScoreList != null ?
                  <View style={{ marginTop: wide * 0.1, flex: 1, }}>
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      // contentContainerStyle={{  }}
                      data={analyticsScoreList}
                      renderItem={(item, index) => this._renderAnalitics(item, index)}
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                    />
                  </View>
                  : <></>
                }

              </ScrollView>

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

export default connect(mapStateToProps)(TeamAdvanceStatics);
