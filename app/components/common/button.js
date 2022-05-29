import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { CommonStyles, Layout, Colors } from '../../constants';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FIcon from 'react-native-vector-icons/FontAwesome';
let wide = Layout.width;
// let msgIcon = require('../../assets/images/home/sms.png');
// let msgBottomIcon = require('../../assets/images/bottom-bar/sms.png');
// let uploadIcon = require('../../assets/images/filter/Group.png');
export const HiddenButton = ({ action, trash }) => (
  <TouchableOpacity
    style={[CommonStyles.hiddenbtn, CommonStyles.rightRounded]}
    onPress={action}>
    {/* {trash ? (
      <FIcon name={'trash'} color={Colors.light} size={20} />
    ) : (
        <Image
          source={msgIcon}
          resizeMode={'contain'}
          style={{ height: wide * 0.04, width: wide * 0.04 }}
        />
      )} */}
  </TouchableOpacity>
);

export const SubmitButtons = ({ action, label, style, labelStyle }) => (
  <TouchableOpacity
    onPress={action}
    style={[CommonStyles.buttons, CommonStyles.center, { ...style }]}>
    <Text style={[CommonStyles.label, { ...labelStyle }]}>{label}</Text>
  </TouchableOpacity>
);

export const RoundButtons = ({ action, iconName, style, upload, msgImg }) => (
  <TouchableOpacity
    activeOpacity={1}
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    style={[
      CommonStyles.lightshadow,
      CommonStyles.center,
      {
        height: wide * 0.09,
        width: wide * 0.09,
        borderRadius: (wide * 0.09) / 2,
        ...style,
      },
    ]}
    onPress={action}>
    {console.log(msgImg)}
    {/* {upload ? (
      <Image
        resizeMode={'cover'}
        style={CommonStyles.full}
        source={uploadIcon}
      />
    ) : msgImg ? <Image
      resizeMode={'cover'}
      style={[CommonStyles.small, { tintColor: Colors.base }]}
      source={msgBottomIcon}
    />
        :
        <Icon size={18} color={Colors.base} name={iconName} />
    } */}
  </TouchableOpacity>
);

export const IconButtons = ({ iconName, action, customer, msgImg }) => (
  <View
    style={[
      CommonStyles.center,
      {
        flex: 1,
        height: wide * 0.15,
        alignItems: customer ? 'flex-start' : 'center',
      },
    ]}>
    {/* <RoundButtons action={action} iconName={iconName} msgImg={msgImg} /> */}
  </View>
);
