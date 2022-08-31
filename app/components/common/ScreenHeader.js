import React from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';
import {
  CommonStyles,
  Colors,
  Layout,
  Container,
  Fonts,
} from '../../constants';

let wide = Layout.width;

export const ScreenHeader = ({ title, backButtonAction }) => {
  return (
    <View style={{
      height: 50, flexDirection: 'row', alignItems: 'center',
      marginHorizontal: 24, marginBottom: 8,
      // backgroundColor: 'green'
    }}>
      <TouchableOpacity style={{
        width: wide * 0.1, height: wide * 0.1,

      }}
        onPress={backButtonAction}
      >
        <Image style={{
          width: wide * 0.08, height: wide * 0.08,
          borderRadius: wide * 0.02,
          borderWidth: 1.5, borderColor: Colors.borderColor
        }} source={require('../../Images/back_ico.png')} />
      </TouchableOpacity>
      <Text style={{
        // marginTop: 16,
        color: Colors.light, fontSize: 16,
        fontWeight: '400',
        fontFamily: Fonts.Light, lineHeight: 24,
        marginHorizontal: 10
      }}>
        {title}
      </Text>
    </View>

  )
}