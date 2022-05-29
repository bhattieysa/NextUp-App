import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, CommonStyles, Layout, Fonts } from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

let wide = Layout.wide;

const Badge = ({ data, size }) => (
  <View
    style={[
      {
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: Colors.base,
      },
      CommonStyles.center,
    ]}>
    <Text
      style={{ color: Colors.light, fontSize: 14, fontFamily: Fonts.Regular }}>
      {data}
    </Text>
  </View>
);

const PlayIcon = ({ data, touchable, action }) => {
  let style = [
    {
      flex: 1,
      position: 'absolute',
    },
    CommonStyles.center,
    CommonStyles.full,
  ];
  let ImgIcon = () => (
    <Icon name={'play-circle'} size={36} color={Colors.light} />
  );
  if (data > 0) {
    return touchable ? (
      <TouchableOpacity onPress={action} activeOpacity={1} style={style}>
        <ImgIcon />
      </TouchableOpacity>
    ) : (
      <View style={style}>
        <ImgIcon />
      </View>
    );
  } else {
    return null;
  }
};

export { Badge, PlayIcon };
