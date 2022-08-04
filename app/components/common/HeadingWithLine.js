import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../constants';

const HeadingWithLine = ({ heading, txtStyle, lineStyle, containerStyle, teamId }) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={{ width: 20, height: 1, backgroundColor: Colors.lightGray, }} />
      {teamId ? teamId == 1 ?
        <>
          <Text style={{ ...styles.heading, ...txtStyle, color: Colors.lightBlue, marginHorizontal: 2 }}>{heading}</Text>
          <Text style={{ ...styles.heading, ...txtStyle }}> Quick Box Score</Text>
        </>
        :
        <>
          <Text style={{ ...styles.heading, ...txtStyle, color: Colors.lightRed }}>{heading}</Text>
          <Text style={{ ...styles.heading, ...txtStyle }}> Quick Box Score</Text>
        </>
        :
        <Text style={{ ...styles.heading, ...txtStyle }}>{heading}</Text>
      }
      <View style={{ ...styles.line, ...lineStyle }} />
    </View>
  );
};

export const PlayerStatHeadingWithLine = ({ heading, txtStyle, lineStyle, containerStyle, }) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={{ width: 20, height: 1, backgroundColor: Colors.lightGray, }} />
      {/* {teamId ? teamId == 1 ? */}
      <>
        <Text style={{ ...styles.heading, ...txtStyle, color: Colors.lightBlue, marginHorizontal: 2 }}>{heading}</Text>
        <Text style={{ ...styles.heading, ...txtStyle }}> Stats</Text>
      </>
      {/* :
        <>
          <Text style={{ ...styles.heading, ...txtStyle, color: Colors.lightRed }}>{heading}</Text>
          <Text style={{ ...styles.heading, ...txtStyle }}> Quick Box Score</Text>
        </>
        :
        <Text style={{ ...styles.heading, ...txtStyle }}>{heading}</Text>
      } */}
      <View style={{ ...styles.line, ...lineStyle }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: Colors.light,
    fontSize: 17,
    fontFamily: Fonts.SemiBold,
  },
  line: {
    marginLeft: 10,
    height: 1,
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
});

export default HeadingWithLine;
