import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Colors, Layout, CommonStyles } from '../../constants';
import Back from '../HeaderButtons/Back';
import { isNotch, getDeviceModel } from '../deviceInfo';
import { DefaultLabel } from '../../components/common/label';

const CustomHeader = ({ onBack, Title, SubTitle, back }) => {
  return (
    <View style={[styles.container, styles.row]}>
      {back && (
        <View style={[{ flex: 0.2 }, CommonStyles.center]}>
          <Back Color={Colors.base} onPress={onBack} />
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View style={[styles.titleContainer, back && { width: '80%' }]}>
          <Text style={styles.title}>{Title}</Text>
          {SubTitle ? <Text style={styles.subTitle}>{SubTitle}</Text> : null}
        </View>
      </View>
    </View>
  );
};

export const DefaultHeader = ({ title }) => (
  <View
    style={[
      {
        height:
          Platform.OS === 'ios' ? Layout.width * 0.12 : Layout.width * 0.15,
        backgroundColor: Colors.light,
        elevation: 4,
      },
      Platform.OS == 'ios' ? CommonStyles.btmborder : {},
      Platform.OS === 'ios' ? CommonStyles.center : CommonStyles.verticalCenter,
    ]}>
    <DefaultLabel style={styles.label} data={title} />
  </View>
);

export default CustomHeader;
