import React, { Component } from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image, SafeAreaView, Platform, } from 'react-native';
import { Title } from '../../../../components/common/titleLabel';
import { Colors, Fonts, Layout } from '../../../../constants';
import moment from 'moment';
import Navigation from '../../../../lib/Navigation';
import { ScreenHeader } from '../../../../components/common/ScreenHeader';
import { connect } from 'react-redux';
import SwitchToggle from "react-native-switch-toggle";

let wide = Layout.width;


class PremiumSubscription extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base }}>
        <SafeAreaView style={{
          flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          {/* <AppLoader visible={this.state.loading} /> */}
          <View>
            <ScreenHeader
              title={'Subscription'}
              backButtonAction={() => Navigation.back()}
            />
          </View>

          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{
              width: '98%',
              height: wide * 1.16,
              alignSelf: 'center',
              marginTop: wide * 0.06,
              borderRadius: wide * 0.03,
              // alignItems: 'center',

            }}>
              <Image
                source={require('../../../../Images/premiumCard.png')}
                style={{
                  width: '100%', height: '100%', position: 'absolute',
                  borderRadius: wide * 0.03,
                }}
                resizeMode={'cover'}
              />
              <View style={{
                marginTop: wide * 0.05,
                flexDirection: "row", width: '95%',
                alignSelf: 'center'
              }}>
                <Image
                  source={require('../../../../Images/premiumCardTagIcon.png')}
                  style={{
                    width: wide * 0.09, height: wide * 0.09,
                    marginLeft: wide * 0.01,
                  }}
                  resizeMode={'cover'}
                />
                <View style={{
                  marginLeft: wide * 0.07, alignItems: 'center',
                  marginTop: wide * 0.02
                }}>
                  <Text style={{
                    fontWeight: "500",
                    fontSize: 15,
                    lineHeight: 22,
                    fontFamily: Fonts.Medium,
                    color: Colors.light
                  }}>GET THE</Text>

                  <Text style={{
                    fontWeight: "800",
                    fontSize: 26,
                    lineHeight: 28,
                    fontFamily: Fonts.XBold,
                    color: Colors.light
                  }}>NEXTUP PRIME</Text>
                </View>
              </View>

              <View style={{
                // alignItems: 'center',
                marginTop: wide * 0.19,
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  marginLeft: wide * 0.06,
                }}>
                  <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{
                    fontWeight: "600",
                    fontSize: 15,
                    lineHeight: 22,
                    fontFamily: Fonts.SemiBold,
                    color: Colors.light,
                    marginLeft: wide * 0.02
                  }}>Create Multiple Lineup</Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  marginLeft: wide * 0.06,
                  marginTop: wide * 0.03
                }}>
                  <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{
                    fontWeight: "600",
                    fontSize: 15,
                    lineHeight: 22,
                    fontFamily: Fonts.SemiBold,
                    color: Colors.light,
                    marginLeft: wide * 0.02
                  }}>Road to Pro challenges</Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  marginLeft: wide * 0.06,
                  marginTop: wide * 0.03
                }}>
                  <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{
                    fontWeight: "600",
                    fontSize: 15,
                    lineHeight: 22,
                    fontFamily: Fonts.SemiBold,
                    color: Colors.light,
                    marginLeft: wide * 0.02
                  }}>Asigned multiple challenges</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  marginLeft: wide * 0.06,
                  marginTop: wide * 0.03
                }}>
                  <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{
                    fontWeight: "600",
                    fontSize: 15,
                    lineHeight: 22,
                    fontFamily: Fonts.SemiBold,
                    color: Colors.light,
                    marginLeft: wide * 0.02
                  }}>See game advance statistics</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  marginLeft: wide * 0.06,
                  marginTop: wide * 0.04
                }}>
                  <Image source={require('../../../../Images/premiumCardBulletIcon.png')}
                    style={{ width: 15, height: 15 }}
                  />
                  <Text style={{
                    fontWeight: "600",
                    fontSize: 15,
                    lineHeight: 22,
                    fontFamily: Fonts.SemiBold,
                    color: Colors.light,
                    marginLeft: wide * 0.02
                  }}>See player advance statistics</Text>
                </View>
              </View>
              <View style={{
                justifyContent: 'center', alignItems: 'center',
                marginTop: wide * 0.05,
              }}>
                <Text style={{
                  fontWeight: "700",
                  fontSize: 37,
                  lineHeight: 40,
                  fontFamily: Fonts.Bold,
                  color: Colors.premiumPriceColor,
                  marginLeft: wide * 0.02
                }}>$ 78.99</Text>
              </View>
              <View style={{
                flexDirection: 'row', marginTop: wide * 0.05, alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  fontWeight: "700",
                  fontSize: 14,
                  lineHeight: 18,
                  fontFamily: Fonts.Bold,
                  color: Colors.light,
                  marginHorizontal: wide * 0.03
                }}>Monthly</Text>
                <SwitchToggle
                  // switchOn={on}
                  containerStyle={{
                    // marginTop: 16,
                    width: wide * 0.18,
                    height: 38,
                    borderRadius: 25,
                    padding: 5,
                  }}
                  circleStyle={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,

                  }}
                  // onPress={() => off(!on)}
                  circleColorOff={Colors.light}
                  circleColorOn={Colors.light}
                  backgroundColorOn='#444856'
                  backgroundColorOff='#444856'
                />

                <Text style={{
                  fontWeight: "700",
                  fontSize: 14,
                  lineHeight: 18,
                  fontFamily: Fonts.Bold,
                  color: Colors.light,
                  marginHorizontal: wide * 0.03
                }}>Yearly</Text>


              </View>
            </View>


          </View>

          <TouchableOpacity
            // key={isbtnEnable}
            activeOpacity={0.3}
            style={{
              width: wide * 0.8, height: 48,
              backgroundColor: Colors.btnBg,
              alignSelf: 'center', borderRadius: 24,
              justifyContent: 'center',
              // opacity: isbtnEnable === false ? 0.3 : 1.0,
              // marginBottom: 50,
              marginTop: wide * 0.1,
            }}
          // onPress={() => {
          //   if (isbtnEnable) {
          //     this.actionAddTeam()
          //   }
          // }}
          >
            <Text style={{
              alignSelf: 'center', color: Colors.light,
              fontFamily: Fonts.Bold,
              fontSize: 14, lineHeight: 18, fontWeight: '700'
            }}>Subscribe now</Text>
          </TouchableOpacity>


        </SafeAreaView >

      </View>
    )
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

export default connect(mapStateToProps)(PremiumSubscription);
