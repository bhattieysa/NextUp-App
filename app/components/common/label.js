import React from 'react';
import { Text, View } from 'react-native';
import {
  CommonStyles,
  Colors,
  Layout,
  Container,
  Fonts,
} from '../../constants';

let wide = Layout.width;

const DefaultLabel = ({ data, style, ...props }) => (
  <Text {...props} style={[CommonStyles.text, { ...style }]}>
    {data}
  </Text>
);

const TitleLabel = ({ data, style, bold, ...props }) => (
  <Text
    {...props}
    style={[
      CommonStyles.title,
      { ...style },
      bold && { fontFamily: Fonts.SemiBold },
    ]}>
    {data}
    {props.children}
  </Text>
);

const EquipmentName = ({ data, center, size = 18 }) => (
  <Text
    style={[
      CommonStyles.title,
      CommonStyles.boldText,
      {
        maxWidth: '100%',
        textAlign: center && 'center',
        fontSize: size,
      },
    ]}>
    {data}
  </Text>
);

const Description = ({ title, data, border, noflex, style }) => (
  <Container
    style={[
      { minHeight: wide * 0.1, ...style },
      border && CommonStyles.btmborder,
      CommonStyles.verticalCenter,
      noflex && { flex: 0 },
    ]}>
    <TitleLabel
      style={data && { marginBottom: wide * 0.02 }}
      data={title + ':'}
    />
    {data && <DefaultLabel data={data} />}
  </Container>
);

const NoDataLabel = ({ data, style, bold, height, ...props }) => (
  <View style={{
    width: '100%', height: height,
    justifyContent: 'center', alignItems: 'center',

  }}>
    <Text
      style={{
        color: Colors.fontColorGray,
        fontSize: 20, lineHeight: 20,
        fontFamily: Fonts.SemiBold, textAlign: 'center'
      }}>Nothing to display...</Text>
  </View>
);



export { DefaultLabel, TitleLabel, EquipmentName, Description, NoDataLabel };
