import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import {
  CommonStyles,
  Colors,
  Layout,
  Container,
  Fonts,
} from '../../constants';

const DropDownSelect = ({ containerStyle, placeHolderContainerStyl, placeHolderLabelStyl,
  placeHolder, iconStyl, textStyle, selectedValue, onPress, isIcon
}) => {
  return (
    <TouchableOpacity style={{ ...containerStyle }}
      activeOpacity={1}
      onPress={onPress}
    >
      <View style={{
        ...placeHolderContainerStyl,
      }}>
        <Text style={{ ...placeHolderLabelStyl }}>
          {placeHolder}
        </Text>
        {isIcon ?
          <Image
            style={{
              ...iconStyl
            }}
            source={require('../../Images/dropDownIconNew.png')}
          />
          :
          <></>
        }
      </View>
      {selectedValue != '' && selectedValue != undefined ?
        <Text style={{
          ...textStyle
        }}>
          {selectedValue}
        </Text>
        :
        null
      }
    </TouchableOpacity>
  )
}

export { DropDownSelect }