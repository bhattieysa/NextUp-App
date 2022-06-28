import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  Easing,
} from 'react-native';
import { Colors } from '../constants';

class AppLoader extends React.Component {
  render() {
    const { onRequestClose, type, visible } = this.props;
    return (
      <Modal
        animated
        animationType={'fade'}
        transparent
        onRequestClose={onRequestClose}
        {...this.props}>
        <View style={styles.container}>
          <ActivityIndicator animating size={30} color={Colors.light} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppLoader.propTypes = {
  onRequestClose: PropTypes.func,
};

AppLoader.defaultProps = {
  onRequestClose: () => { },
};

export default AppLoader;
