import React, { Component } from 'react';
import {
  View, Keyboard, TouchableOpacity, Text, SafeAreaView,
  Image, KeyboardAvoidingView, Platform
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

import Navigation from '../../lib/Navigation';

import AppLoader from '../../utils/Apploader';

import { connect } from 'react-redux';
import isValidEmail from '../../utils/isValidEmail';
import AnimatedInput from "../../Helpers/react-native-animated-input";
import backend from '../../config/backend';
import KeyBoardDismissHandler from '../../components/common/KeyBoardDismissHandler';
import { showErrorAlert } from '../../utils/info';

let wide = Layout.width;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      isEmailExist: false,
      isbtnEnable: false,

    };
  }


  checkEmailExist = () => {
    const { email } = this.state;
    let valid = isValidEmail(email);
    if (valid) {
      backend.isEmailExist(email, (status, e) => {
        console.log("Email status is ", status);
        debugger
        if (status) {
          this.setState({ isConfirmPass: false }, () => {
            this.setTextofEmailAndPass('email', email)
          })
        } else {
          this.setState({ isConfirmPass: true }, () => {
            this.setTextofEmailAndPass('email', email)
          })

        }
      })
    }
  }

  resetPassword = () => {
    const { email } = this.state;
    this.setState({ loading: true }, () => {
      backend.resetUserPassword(email, (res) => {
        if (res) {
          this.setState({ loading: false }, () => {
            showErrorAlert("We have sent you a password reset link on your entered email. Please reset your password by clicking on that link.",
              "Info",
              () => Navigation.back()
            )
          })

        } else {
          this.setState({ loading: false }, () => {
            showErrorAlert("Something went wrong!", "Alert")
          })
        }
      })
    })


  };

  setTextofEmailAndPass = (txt) => {
    debugger
    let valid = isValidEmail(txt);
    if (valid) {
      this.setState({ isbtnEnable: true, email: txt.trim() })
    } else {
      this.setState({ isbtnEnable: false, email: txt.trim() })
    }
  }
  render() {
    const { isbtnEnable, loading, } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.base, }}>
        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS == 'android' ? 30 : 0,
          backgroundColor: Colors.base
        }}>
          <KeyBoardDismissHandler>
            <View style={{ marginHorizontal: 32, backgroundColor: Colors.base, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
                <TouchableOpacity style={{ width: wide * 0.1, }} onPress={() => Navigation.back()}>
                  <Image style={{
                    width: wide * 0.08, height: wide * 0.08,
                    borderRadius: wide * 0.02, borderWidth: 1, borderColor: Colors.borderColor
                  }} source={require('../../Images/back_ico.png')} />
                </TouchableOpacity>
                <Text style={{
                  color: Colors.light, fontSize: 16,
                  fontFamily: Fonts.Bold, lineHeight: 24,
                  marginHorizontal: 10
                }}>
                  Forgot password
                </Text>
              </View>

            </View>
            <KeyboardAvoidingView keyboardVerticalOffset={0} style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? "padding" : null}>
              <View style={{ flex: 1, marginHorizontal: 32, marginTop: wide * 0.08, }} >
                <View style={{ marginTop: wide * 0.06 }}>
                  <AnimatedInput
                    // onEndEditing={() => this.checkEmailExist()}
                    placeholder="YOUR EMAIL"
                    //valid={() => isValidEmail(email)}
                    // errorText="Error"
                    onChangeText={(e) => this.setTextofEmailAndPass(e)}
                    value={this.state.email}
                    styleInput={{
                      fontFamily: Fonts.Bold, color: Colors.light,
                      fontSize: 16, lineHeight: 18
                    }}
                    // isAutoFoucs={true}
                    styleLabel={{
                      fontFamily: Fonts.SemiBold,
                      color: Colors.txtFieldPlaceHolder, fontSize: 16, lineHeight: 18,
                    }}
                    styleBodyContent={{ borderBottomWidth: 1.5, borderBottomColor: Colors.borderColor, width: wide * 0.8 }}
                    keyboardType={'email-address'}
                  />
                </View>

              </View>
              <AppLoader visible={loading} />
            </KeyboardAvoidingView>
          </KeyBoardDismissHandler>
          <TouchableOpacity
            key={isbtnEnable}
            style={{
              width: wide * 0.8, height: 48,
              backgroundColor: Colors.btnBg,
              alignSelf: 'center', borderRadius: 24, opacity: isbtnEnable === false ? 0.3 : 1.0,
              justifyContent: 'center', bottom: Platform.OS == 'android' ? 50 : 60, position: 'absolute'
            }} onPress={() => {
              if (isbtnEnable) {
                this.resetPassword()
              }
            }}>
            <Text style={{
              alignSelf: 'center', color: Colors.light,
              fontFamily: Fonts.Bold,
            }}>Continue</Text>
          </TouchableOpacity>
        </SafeAreaView>
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

export default connect(mapStateToProps)(ForgotPassword);
