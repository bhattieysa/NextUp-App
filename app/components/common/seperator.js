import React from 'react';
import { View } from 'react-native';
import { Colors, Layout } from '../../constants';
let wide = Layout.width;

const Seperator = () => (
  <View
    style={{
      height: 0.5,
      backgroundColor: Colors.shade,
      marginVertical: wide * 0.03,
    }}
  />
);

const BlankSpace = ({ offset = wide * 0.05 }) => (
  <View
    style={{
      height: offset,
    }}
  />
);

export { Seperator, BlankSpace };
