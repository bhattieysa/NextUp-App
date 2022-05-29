import React from 'react';
import { View, Alert } from 'react-native';
import { Colors, CommonStyles } from '../constants';
import { DefaultLabel } from '../components/common/label';
import { openSettings } from 'react-native-permissions'

export const showErrorAlert = (message, title, onPress = () => { }) =>
  Alert.alert(title, message, [{ text: 'OK', onPress }], { cancelable: true });

export const showConfirmationAlert = (title, onPress = () => { }) =>
  Alert.alert(
    title,
    "",
    [
      {
        text: "Cancel",
        style: 'cancel',
      },
      {
        text: "Yes",
        style: 'destructive',
        onPress
      },
    ],
    { cancelable: false },
  );

export const NoInternet = ({ Offline }) => {
  if (Offline) {
    return (
      <View style={[CommonStyles.noInternet, CommonStyles.center]}>
        <DefaultLabel
          style={{ color: Colors.light }}
          data={'Offline'}
        />
      </View>
    );
  } else {
    return null;
  }
};

export const ShowInfo = ({ Info, Message }) => {
  if (Info) {
    return (
      <View style={[CommonStyles.showinfo, CommonStyles.center]}>
        <DefaultLabel style={{ color: Colors.light }} data={Message} />
      </View>
    );
  } else {
    return null;
  }
};

export const showAppPermissionAlert = (title, message) =>
  Alert.alert(
    title,
    message,
    [
      { text: 'Cancel', onPress: () => { } },
      { text: 'Settings', onPress: () => { openSettings() } }
    ],
    { cancelable: true }
  );




