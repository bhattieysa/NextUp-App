import React from "react";
import { View,Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


const RadioButton = ({ containerStyle, centerStyle, isSelected, onPress,iconCheck }) => {

  return (
    <TouchableOpacity style={[containerStyle]}
      onPress={() => onPress}
    >
      {isSelected ?
        <View style={[centerStyle]}>
          
          {iconCheck?
          <Image
          style={{width:10,height:10}}
          source={require("../../../app/Images/check.png")}
          />
        :
        null  
        }
        </View>
        : <></>
      }
    </TouchableOpacity>
  )
}

export { RadioButton }