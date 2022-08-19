import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const RadioButton = ({ containerStyle, centerStyle, isSelected, onPress }) => {

  return (
    <TouchableOpacity style={[containerStyle]}
      onPress={() => onPress}
    >
      {isSelected ?
        <View style={[centerStyle]}>
        </View>
        : <></>
      }
    </TouchableOpacity>
  )
}

export { RadioButton }