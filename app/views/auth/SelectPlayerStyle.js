import React, { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Image, key, KeyboardAvoidingView, ScrollView, TextInput, Platform, FlatList, ImageBackground } from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { getPlayerStyle, onBoardAPI } from '../../actions/auth';
import { connect } from 'react-redux';
import { showErrorAlert } from '../../utils/info';

import { characterLimit, UserModel } from '../../constants/constant';

import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getObject, setObject } from '../../middleware';

// const playerCategory = [1, 2, 3, 4, 5]

let wide = Layout.width;

class PlayerCategoryStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      playerCategory: null,
      selectedPlayerCategory: null,
      selectedCategoryIndex: 0,
      isbtnEnable: true,
      // strSelectedMode: UserModel.selectedUserType !== undefined ? UserModel.selectedUserType : 'player',
    };
    this.inputs = {};
  }
  componentDidMount() {
    this.setState({ loading: true }, () => {
      this.props.dispatch(getPlayerStyle((res, data) => {
        if (res) {
          this.setState({ loading: false, playerCategory: data, selectedPlayerCategory: data[0] })
        } else {
          this.setState({ loading: false, playerCategory: null })
        }

      }));
    })

    console.log("Did mount called ");

    // this.props.navigation.addListener('didFocus', this.setTheState);

  }

  // componentDidUpdate(prevProps) {
  //   console.log("Did focus called");
  //   if (prevProps !== this.props) {
  //     // if (this.props?.navigation?.state?.params?.state) {
  //     //     console.log("Did focus called state found, ", this.props.navigation?.state?.params?.state);

  //     //     this.setTextofFields('state', this.props.navigation?.state?.params?.state);

  //     // }

  //     if (this.props?.navigation?.state?.params?.year) {
  //       console.log("Did focus called year found");
  //       this.setState({
  //         classof: this.props.navigation.state.params.year
  //       })
  //     }
  //   }
  // }

  actionContinue = () => {
    const { selectedPlayerCategory } = this.state
    // if (isbtnEnable) {
    debugger
    getObject('UserId').then((obj) => {

      let params = {
        "typeOfUser": UserModel.selectedUserType.toUpperCase(),
        "firstName": UserModel.fname,
        "lastName": UserModel.lname,
        "aboutMe": UserModel.aboutMe,
        "email": UserModel.email,
        "dob": moment(UserModel.dob).format('MM/DD/YYYY'),
        "onBoardingTeamName": UserModel.coachTeam, //when coach selected
        "typeOfPlayer": selectedPlayerCategory.name,
        "schoolInfo": {
          city: UserModel.city,
          state: UserModel.state,
          name: UserModel.school,
          classOff: UserModel.classof,
          typeOfPlayer: selectedPlayerCategory.name,
        },
        "roleList": [
          `ROLE_${UserModel.selectedUserType.toUpperCase()}`
        ],
        "parentApprovalRequired": !UserModel.isAdult
      }

      console.log("onBoardDataa Player", params);
      debugger

      this.setState({ loading: true }, () => {
        this.props.dispatch(onBoardAPI(obj, params, (res, resData) => {

          if (res) {
            let onBoardData = {
              selectedUserType: UserModel.selectedUserType,
              isAdult: UserModel.isAdult,
              parentNameOrNum: UserModel.parentNameOrNum,
              email: UserModel.email,
              password: UserModel.password,
              fname: UserModel.fname,
              lname: UserModel.lname,
              city: UserModel.city,
              state: UserModel.state,
              school: UserModel.school,
              classof: UserModel.classof,
              selectedSportPosition: selectedPlayerCategory.name,
              aboutMe: UserModel.aboutMe,
              profileUrl: UserModel.profileUrl,
              photoIdUrl: UserModel.photoIdUrl,
              isVerfied: UserModel.isVerfied,
              coachCertiUrl: UserModel.coachCertiUrl,
              fid: UserModel.fid,
              isSocialLogin: UserModel.isSocialLogin,
              isProfileUploaded: UserModel.isProfileUploaded,
              dob: UserModel.dob
            }
            UserModel.fname = UserModel.fname
            UserModel.lname = UserModel.lname
            UserModel.email = UserModel.email
            UserModel.city = UserModel.city
            UserModel.state = UserModel.state
            UserModel.school = UserModel.school
            UserModel.classof = UserModel.classof
            UserModel.selectedSportPosition = selectedPlayerCategory.name
            UserModel.aboutMe = UserModel.aboutMe
            UserModel.selectedUserType = UserModel.selectedUserType
            UserModel.dob = UserModel.dob

            setObject('authData', onBoardData).then(() => {
              this.setState({ loading: false })
              Navigation.navigate('UploadPhoto')
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
    })

    // Navigation.navigate('TellUsMore')
    // }
    // }
  }

  renderPlayerCategory = (item, index) => {
    console.log(item)
    const { selectedCategoryIndex } = this.state
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1.5,
          borderColor: Colors.compareFirstPlayerBorder,
          borderRadius: wide * 0.02,
          width: wide * 0.25,
          height: wide * 0.4,
          flexDirection: 'column',
          marginVertical: wide * 0.02,
          marginHorizontal: wide * 0.015,
          // flex: 1,

        }}
        activeOpacity={1}
        onPress={() => this.setState({ selectedCategoryIndex: index, selectedPlayerCategory: item })}
      >

        <FastImage
          style={{
            width: '99%', height: '99%',
            borderRadius: wide * 0.02,
          }}
          resizeMode={'cover'}
          source={{ uri: item.imageUrl }}
        />
        {selectedCategoryIndex == index ?
          <View style={{
            position: 'absolute', top: wide * 0.02,
            alignSelf: 'center',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'row',
            width: '80%',
          }}>
            <Image style={{
              width: 20,
              height: 20,


            }} source={require('../../Images/tick.png')} />

          </View>
          : null
        }

      </TouchableOpacity>
    )
  }


  render() {
    const {
      isbtnEnable,
      playerCategory,
      loading
    } = this.state;

    const navParams = this.props.navigation.state.params;

    // if (navParams && navParams.state) {
    //   console.log("navparams working");
    //   this.setTextofFields('state', navParams.state);
    // }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.base }}>
        {loading == true ?
          <AppLoader visible={this.state.loading} />
          :
          <>
            <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                <TouchableOpacity style={{ width: wide * 0.1, }} onPress={() => Navigation.back()}>
                  <Image style={{
                    width: wide * 0.08, height: wide * 0.08,
                    // marginTop: 20, 
                    borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                  }} source={require('../../Images/back_ico.png')} />
                </TouchableOpacity>
                <Text style={{
                  // marginTop: 16,
                  color: Colors.light, fontSize: 16,
                  fontFamily: Fonts.Bold, lineHeight: 24,
                  marginHorizontal: 10
                }}>
                  Select Player Style
                </Text>
              </View>
            </View>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              enableOnAndroid={true}
              style={{ marginTop: wide * 0.03, marginBottom: wide * 0.01 }}
              bounces={false}

            >


              {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                        minHeight: isNotch ? Layout.height - 170 : Layout.height - 100,
                        paddingBottom: isNotch ? 0 : 10
                    }}> */}
              <View style={{
                backgroundColor: Colors.base,
                // marginHorizontal: 32,
                marginTop: wide * 0.01,
                alignItems: 'center',
              }} >

                <View style={{
                  width: wide * 0.85,
                  marginTop: wide * 0.04,
                  // marginHorizontal: -2
                  // flexDirection: 'row',

                }} >
                  <FlatList
                    data={playerCategory}
                    keyExtractor={item => item}
                    renderItem={({ item, index }) => this.renderPlayerCategory(item, index)}
                    numColumns={3}
                    scrollEnabled={false}
                  />
                </View>
                {/* <View style={{ height: 80 }} /> */}

                <View style={{ marginTop: wide * 0.1, width: wide * 0.84 }}>
                  {playerCategory !== null ?
                    <Text style={{
                      // marginTop: 16,
                      color: Colors.light, fontSize: 16,
                      fontFamily: Fonts.Bold, lineHeight: 24,
                    }}>
                      {playerCategory[this.state.selectedCategoryIndex]?.name}
                    </Text>
                    : <></>
                  }
                  {playerCategory !== null ?
                    <Text style={{
                      // marginTop: 16,
                      color: Colors.light, fontSize: 14,
                      fontFamily: Fonts.Regular, lineHeight: 18,
                      textAlign: 'justify',
                      paddingRight: 5
                    }}>
                      {playerCategory[this.state.selectedCategoryIndex]?.description}
                    </Text>
                    : <></>
                  }
                </View>


                <TouchableOpacity
                  key={isbtnEnable}
                  style={{
                    width: wide * 0.8, height: 48,
                    backgroundColor: Colors.btnBg,
                    alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
                    justifyContent: 'center', marginTop: 40,
                  }} onPress={() => {
                    this.actionContinue()
                  }}>
                  <Text style={{
                    alignSelf: 'center', color: Colors.light,
                    fontFamily: Fonts.Bold,
                  }}>Continue</Text>
                </TouchableOpacity>

              </View>

              {/* </ScrollView> */}

            </KeyboardAwareScrollView>
          </>
        }
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
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


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontFamily: Fonts.Bold,
    borderRadius: 4,
    color: Colors.light,
    paddingRight: 0, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 0,
    fontFamily: Fonts.Bold,
    borderRadius: 8,
    color: Colors.light,
    paddingRight: 0, // to ensure the text is never behind the icon
  },
});


export default connect(mapStateToProps)(PlayerCategoryStyle);

