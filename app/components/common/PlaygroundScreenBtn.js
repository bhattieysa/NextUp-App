import React from 'react';
import {
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import { Colors, Fonts } from '../../constants';

const PlaygroundScreenBtn = props => {
  // let TouchableCmp = TouchableOpacity;

  // if (Platform.OS === 'android' && Platform.Version >= 21) {
  //   TouchableCmp = TouchableNativeFeedback;
  // }

  return (
    // <View style={{ ...styles.container, ...props.style }}>
    <TouchableOpacity style={{ ...styles.container, ...styles.touchArea, ...props.style, }}
      onPress={props.onPress}
    >
      {/* <View style={styles.touchArea}> */}
      <Text style={{ ...styles.text, ...props.txtStyle }}>
        {props.title}
      </Text>
      {/* </View> */}
    </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 28,
    overflow: 'hidden',
    borderRadius: 6,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: Colors.darkYellow,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 3 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  touchArea: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    textAlign: 'center',
    color: Colors.base,
  },
});

export default PlaygroundScreenBtn;
