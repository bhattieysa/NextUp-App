import React, { Component, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { CommonStyles, Container, Colors } from '../../constants';

import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/MaterialCommunityIcons';
const InfoAction = ({ primary, secondary, action, style, terms }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <TouchableOpacity
      activeOpacity={1}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={() => (terms ? action() : {})}>
      <Text style={[CommonStyles.info, { color: Colors.shade, ...style }]}>
        {primary}{' '}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={1}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={action}>
      <Text style={CommonStyles.info}>{secondary}</Text>
    </TouchableOpacity>
  </View>
);

const InfoSeperated = ({ primary, secondary, secondaryAction }) => {
  const [checked, onChange] = useState(false);
  return (
    <Container
      style={{
        flexDirection: 'row',
        width: '92%',
        flex: 0,
        padding: 0,
      }}>
      <TouchableOpacity
        onPress={() => onChange(!checked)}
        activeOpacity={1}
        style={[
          CommonStyles.container,
          { alignItems: 'flex-start', paddingRight: 0, flex: 1 },
        ]}>
        <Text
          style={[CommonStyles.info, { fontSize: 14, color: Colors.shade }]}>
          <>
            {checked ? <Icon
              size={16}
              color={Colors.base}
              name={'checksquare'}
            />
              :
              <Ionicon
                size={16}
                color={Colors.base}
                name={'square-outline'}
              />
            }
          </>
          {' '}
          {primary}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={secondaryAction}
        activeOpacity={1}
        style={[
          CommonStyles.container,
          { alignItems: 'flex-end', paddingLeft: 0 },
        ]}>
        <Text style={[CommonStyles.info, { fontSize: 14 }]}>{secondary}</Text>
      </TouchableOpacity>
    </Container>
  );
};

export { InfoAction, InfoSeperated };
