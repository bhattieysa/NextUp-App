import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CommonStyles } from '../../constants';

export default class Container extends Component {
  render() {
    return (
      <View style={[CommonStyles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}
