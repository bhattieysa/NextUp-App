import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, SafeAreaView, Image,
  Platform, StyleSheet,
} from 'react-native';
import {
  Layout,
  Colors,
  Fonts,
} from '../../constants';

let wide = Layout.width;
let high = Layout.height;

const AccountItem = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 50,
        backgroundColor: Colors.lightDark,
        borderRadius: wide * 0.028,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
      }}
      onPress={onPress}
    >

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: wide * 0.05,
        // backgroundColor: 'red',
        alignItems: 'center'
      }}>
        <Image
          source={icon}
          style={{
            width: 25, height: 25,
            tintColor: Colors.light
          }}
        // resizeMode={''}
        />
        <Text style={{
          marginHorizontal: wide * 0.03,
          color: Colors.light, fontSize: 14,
          fontFamily: Fonts.SemiBold, lineHeight: 18,
        }}>{title}</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: wide * 0.04,
        // backgroundColor: 'green',
        height: '100%',
        alignItems: 'center',
      }}>
        <View style={{
          height: '60%',
          width: 1,
          backgroundColor: Colors.newGrayFontColor,
        }} />

        <View style={{
          width: 18, height: 18,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: wide * 0.02
        }}>
          <Image
            source={require('../../Images/account_rightArrow.png')}
            style={{ width: '90%', height: '90%', }}
            resizeMode={'contain'}
          />

        </View>


      </View>

    </TouchableOpacity>
  )
}

export { AccountItem }
