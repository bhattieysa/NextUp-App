import React from 'react';
import { View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Colors, CommonStyles, Fonts } from "../../constants";


const TextInCircle = ({ text, style, txtStyle, onPress, key }) => {
  return (
    <View style={{ ...style, }}>
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onPress={onPress}
        activeOpacity={1}
      >
        <Text style={{
          ...{
            color: Colors.light,
            fontSize: 22,
            fontFamily: Fonts.Bold,
            // backgroundColor: 'red'
          },
          ...txtStyle
        }}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TextInCircle;
