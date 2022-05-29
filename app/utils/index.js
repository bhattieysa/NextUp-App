import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  Easing,
} from 'react-native';
import { MaterialIndicator, BallIndicator } from 'react-native-indicators';
import { Colors } from '../../constants';
import SBLoader from './SBLoader';
import DBLoader from './DashboardLoader';
import OrderLoader from './OrderLoader';

class AppLoader extends React.Component {
  render() {
    const { onRequestClose, type } = this.props;
    return (
      <Modal transparent onRequestClose={onRequestClose} {...this.props}>
        {type == 'SalesBook' ? (
          <SBLoader />
        ) : type == 'Dashboard' ? (
          <DBLoader />
        ) : type == 'Order' ? (
          <OrderLoader />
        ) : (
          <View style={styles.container}>
            <BallIndicator animating size={60} color={Colors.bars} />
          </View>
        )}
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
  onRequestClose: () => {},
};

export default AppLoader;
