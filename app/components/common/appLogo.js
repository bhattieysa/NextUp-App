import React from 'react';
import { Image, View } from 'react-native';
import { CommonStyles, Layout, Container } from '../../constants';
import Navigation from '../../lib/Navigation';
import { RoundButtons } from './button';
let logo = require('../../assets/images/splash/Oldboyspot-logo-1.png');
export default AppLogo = () => (
  <Container style={CommonStyles.center}>
    <Image style={CommonStyles.logo} resizeMode={'contain'} source={logo} />
    <View
      style={{
        position: 'absolute',
        right: Layout.xOffset,
        top: Layout.yOffset,
      }}>
      <RoundButtons iconName={'close'} action={() => Navigation.back()} />
    </View>
  </Container>
);
