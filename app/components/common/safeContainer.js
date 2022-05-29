import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { CommonStyles } from '../../constants';

export default class SafeContainer extends Component {
  render() {
    return (
      <SafeAreaView style={[CommonStyles.container, this.props.style]}>
        {this.props.children}
      </SafeAreaView>
    );
  }
}
