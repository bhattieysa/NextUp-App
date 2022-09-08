
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image, key,
  Alert, KeyboardAvoidingView, FlatList, TextInput, StyleSheet, Keyboard, Platform, ScrollView
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';

import { addPlayerToTeam, getPlayerss, getInitialPlayerss } from '../../actions/home';
import { getObject, setObject, remove } from '../../middleware';
import FastImage from 'react-native-fast-image';
import { showAppPermissionAlert } from '../../utils/info';
import { Permission, PERMISSION_TYPE } from '../../utils/permissionCheck';
import { ScreenHeader } from '../../components/common/ScreenHeader';
import AnimatedInput from '../../Helpers/react-native-animated-input';

let wide = Layout.width;

class ViewCoachLineUp extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lineup_name: '',
      isDefaultMarked: false
    };
  }

  componentDidMount() {
    // this.onScreenFocus();

  }

  onScreenFocus = () => {

  }

  _renderLineUpPlayer = ({ item, index }) => {

    return (
      <>
        <View style={{
          flexDirection: 'row',
          height: wide * 0.1,
          width: '100%',
          borderRadius: wide * 0.025,
          backgroundColor: Colors.playerCategoryBg,
          alignItems: 'center',
          justifyContent: 'space-between',

        }}>
          <Text style={{
            color: Colors.light, fontSize: 16, lineHeight: 24,
            fontFamily: Fonts.SemiBold,
            marginHorizontal: wide * 0.04,
            marginTop: wide * 0.004
          }}>Selected Player</Text>


        </View>


        <FlatList
          data={[1, 2, 3, 4]}
          numColumns={4}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => (<View>
            <>
              <View style={{
                marginBottom: wide * 0.03,
                marginTop: wide * 0.05,
                marginRight: wide * 0.04,
              }}>
                <View style={{
                  alignItems: 'center', justifyContent: 'center',
                  // marginTop: wide * 0.04,
                }}>
                  <Image
                    style={{
                      width: 20, height: 20,
                      position: 'absolute',
                      right: 3, top: -2,
                      zIndex: 1,

                    }}
                    source={require('../../Images/minus_circle_icon.png')}
                  />
                  <TouchableOpacity style={{
                    // borderWidth: item.item.profilePictureUrl == null ? 1.5 : 0,
                    // borderColor: item.item.profilePictureUrl == null ? Colors.newGrayFontColor : null,
                    width: wide * 0.14,
                    height: wide * 0.14,
                    borderRadius: wide * 0.14 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',

                  }}
                  >
                    <FastImage style={{
                      width: '98%', height: '98%', borderRadius: wide * 0.14 / 2,
                      alignSelf: 'center'
                    }}
                      // resizeMode={'contain'}
                      // source={{ uri: item.item.profilePictureUrl }}
                      source={require('../../Images/dummy2.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ width: wide * 0.18 }}
                    activeOpacity={1}
                  >
                    <Text style={{
                      color: Colors.light, fontSize: 12,
                      lineHeight: 11,
                      fontFamily: Fonts.SemiBold,
                      fontWeight: '600',
                      marginTop: wide * 0.015,
                      textAlign: 'center',
                    }}>A. McCoy</Text>
                    <Text style={{
                      color: Colors.btnBg, fontSize: 16,
                      lineHeight: 18,
                      fontFamily: Fonts.Medium,
                      fontWeight: '500',
                      marginTop: wide * 0.015,
                      textAlign: 'center',
                    }}>PF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </View>)
          }
        />
      </>
    )
  };

  _renderNonActivePlayer = ({ item, index }) => {

    return (
      <>
        <View style={{
          flexDirection: 'row',
          height: wide * 0.1,
          width: '100%',
          borderRadius: wide * 0.025,
          backgroundColor: Colors.playerCategoryBg,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: wide * 0.05,

        }}>
          <Text style={{
            color: Colors.light, fontSize: 16, lineHeight: 24,
            fontFamily: Fonts.SemiBold,
            marginHorizontal: wide * 0.04,
            marginTop: wide * 0.004
          }}>Benched</Text>

        </View>


        <FlatList
          data={[1, 2, 3, 4]}
          numColumns={4}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => (<View>
            <>
              <View style={{
                marginBottom: wide * 0.03,
                marginTop: wide * 0.05,
                marginRight: wide * 0.04,
              }}>
                <View style={{
                  alignItems: 'center', justifyContent: 'center',
                  // marginTop: wide * 0.04,
                }}>

                  <Image
                    style={{
                      width: 20, height: 20,
                      position: 'absolute',
                      right: 3, top: -2,
                      zIndex: 1,
                    }}

                    source={require('../../Images/minus_circle_icon.png')}
                  />
                  <TouchableOpacity style={{
                    // borderWidth: item.item.profilePictureUrl == null ? 1.5 : 0,
                    // borderColor: item.item.profilePictureUrl == null ? Colors.newGrayFontColor : null,
                    width: wide * 0.14,
                    height: wide * 0.14,
                    borderRadius: wide * 0.14 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.5,

                  }}
                  >
                    <FastImage style={{
                      width: '98%', height: '98%', borderRadius: wide * 0.14 / 2,
                      alignSelf: 'center'
                    }}
                      // resizeMode={'contain'}
                      // source={{ uri: item.item.profilePictureUrl }}
                      source={require('../../Images/dummy2.png')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ width: wide * 0.18 }}
                    activeOpacity={1}
                  >
                    <Text style={{
                      color: Colors.light, fontSize: 12,
                      lineHeight: 11,
                      fontFamily: Fonts.SemiBold,
                      fontWeight: '600',
                      marginTop: wide * 0.015,
                      textAlign: 'center',
                    }}>A. McCoy</Text>
                    <Text style={{
                      color: Colors.newGrayFontColor, fontSize: 16,
                      lineHeight: 18,
                      fontFamily: Fonts.Medium,
                      fontWeight: '500',
                      marginTop: wide * 0.015,
                      textAlign: 'center',
                    }}>PF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </View>)
          }
        />
      </>
    )
  };



  render() {
    const { lineup_name, isDefaultMarked } = this.state
    // console.log("Dattaaaa", this.props.navigation.state.params);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1, marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          <View>
            <ScreenHeader
              title={'ABC School'}
              backButtonAction={() => Navigation.back()}
            />
          </View>

          <ScrollView
            bounces={false}
            style={{ paddingBottom: wide * 0.04 }}
          >
            <View style={{
              width: '90%',
              alignSelf: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wide * 0.05,
              }}>

                <FlatList
                  style={{
                    flex: 1
                  }}
                  data={[1]}
                  renderItem={(item, index) => this._renderLineUpPlayer(item, index)}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: wide * 0.04,
              }}>

                <FlatList
                  style={{
                    flex: 1
                  }}
                  data={[1]}
                  renderItem={(item, index) => this._renderNonActivePlayer(item, index)}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
            </View>

            <AppLoader visible={this.state.loading} />
          </ScrollView>
          <View style={{
            marginTop: wide * 0.1, alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{
              alignSelf: 'center', flexDirection: 'row',
              alignItems: 'center', justifyContent: 'center',
              width: '96%',
              // marginTop: wide * 0.08
            }}>
              <TouchableOpacity style={{
                width: wide * 0.06, height: wide * 0.06,
                borderRadius: wide * 0.015,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: this.state.selectedPlyerIds.includes(item.playerId) ? Colors.btnBg : null,
                borderWidth: 1.5,
                borderColor: Colors.light,
              }}
                onPress={() => this.setState({ isDefaultMarked: !isDefaultMarked })}
                activeOpacity={1}
              >
                {isDefaultMarked == true ?
                  <Image
                    style={{ width: 12, height: 12 }}
                    source={require('../../Images/check_Icon.png')}
                    resizeMode={'contain'}
                  />
                  : <></>
                }



              </TouchableOpacity>
              <Text style={{
                color: Colors.light, fontSize: 16,
                lineHeight: 18,
                fontFamily: Fonts.Medium,
                fontWeight: '500',
                marginLeft: wide * 0.02
              }}>Mark as a Default</Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: wide * 0.8,
                height: 48,
                backgroundColor: Colors.btnBg,
                alignSelf: 'center', borderRadius: 24,
                justifyContent: 'center',
                marginTop: wide * 0.05,

              }}
            // onPress={() => this.handleSendInvitation()}
            >
              <Text style={{
                alignSelf: 'center', color: Colors.light,
                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                fontWeight: '700',
              }}>Edit Lineup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: wide * 0.8,
                height: 30,
                // backgroundColor: Colors.btnBg,
                alignSelf: 'center', borderRadius: 24,
                justifyContent: 'center',
                marginTop: wide * 0.03,

              }}
            // onPress={() => this.handleSendInvitation()}
            >
              <Text style={{
                alignSelf: 'center', color: Colors.light,
                fontFamily: Fonts.Bold, fontSize: 14, lineHeight: 16,
                fontWeight: '700',
              }}>Delete Lineup</Text>
            </TouchableOpacity>
          </View>
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

export default connect(mapStateToProps)(ViewCoachLineUp);

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
    color: Colors.light,
    fontSize: 14, lineHeight: 18,
    fontFamily: Fonts.Medium,
    marginTop: 6,
  },
  textPointHeading: {
    color: Colors.light, opacity: 0.6,
    fontSize: 12, lineHeight: 16, fontWeight: '400',
    fontFamily: Fonts.Regular,
  },
  textPointCenter: {
    color: Colors.light, fontSize: 18,
    fontFamily: Fonts.Bold,
    marginTop: 6, textAlign: 'center'
  },
});