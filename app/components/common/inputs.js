import React, { Component, useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { CommonStyles, Layout, Colors, Fonts } from '../../constants';
import { Seperator } from './seperator';

let wide = Layout.width;

let eyeicon = require('../../assets/images/login-signup/Iconawesome-eye.png');

class FormInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secured: props.secured,
    };
  }

  static defaultProps = {
    editable: true,
    keyboardType: 'default'
  };

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }

  onSubmitEditing = () => {
    this.props.onSubmitEditing();
  };

  focus() {
    this.textInput.focus();
  }

  renderAuthInput() {
    const { label, placeholder, icon } = this.props;
    const { secured } = this.state;
    return (
      <View style={[CommonStyles.bordered, CommonStyles.inputContainer]}>
        <Text style={[CommonStyles.info, CommonStyles.stickylabel]}>
          {label}{' '}
        </Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={icon}
            resizeMode={'contain'}
            style={{
              height: 14,
              width: 14,
              marginHorizontal: wide * 0.03,
            }}
          />
          <TextInput
            blurOnSubmit={this.props.returnKeyType == 'next' ? false : true}
            style={CommonStyles.input}
            ref={(input) => (this.textInput = input)}
            secureTextEntry={secured}
            placeholderTextColor={Colors.shade}
            onSubmitEditing={this.onSubmitEditing}
            onChangeText={this.props.onChangeText}
            placeholder={placeholder}
            returnKeyType={this.props.returnKeyType}
          />

          {this.props.secured && (
            <TouchableOpacity
              onPress={() => this.setState({ secured: !secured })}
              style={(CommonStyles.center, { padding: 20 })}>
              <Image
                source={eyeicon}
                resizeMode={'contain'}
                style={{
                  height: 14,
                  width: 14,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  renderProfileInput() {
    const { label, placeholder, Data, large } = this.props;
    return (
      <>
        <TextInput
          placeholderTextColor={Colors.shade}
          placeholder={placeholder}
          blurOnSubmit={this.props.returnKeyType == 'next' ? false : true}
          ref={(input) => (this.textInput = input)}
          onSubmitEditing={this.onSubmitEditing}
          returnKeyType={this.props.returnKeyType}
          editable={this.props.editable}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          value={Data}
          style={{
            maxHeight: wide * 0.07,
            padding: 0,
            height: '100%',
            fontSize: large ? 16 : 14,
            fontFamily: Fonts.Regular,
            color: !this.props.editable ? Colors.shade : Colors.dark,
          }}
        />
        <Seperator />
      </>
    );
  }

  render() {
    const { type } = this.props;
    return type == 'profile'
      ? this.renderProfileInput()
      : this.renderAuthInput();
  }
}

const MultilineInput = ({ placeholder, light, onChangeText, value }) => (
  <TextInput
    placeholderTextColor={Colors.shade}
    style={[
      {
        fontSize: 16,
        width: '100%',
        marginTop: 10,
        minHeight: wide * 0.3,
        backgroundColor: light ? Colors.light : Colors.lightshade,
        padding: wide * 0.02,
        textAlignVertical: 'top',
        fontFamily: Fonts.Regular,
        maxHeight: wide * 0.5,
      },
      light && { paddingHorizontal: 0 },
    ]}
    multiline
    value={value}
    placeholder={placeholder}
    returnKeyType={'done'}
    onChangeText={onChangeText}
    blurOnSubmit={true}
  />
);

export { FormInputs, MultilineInput };
