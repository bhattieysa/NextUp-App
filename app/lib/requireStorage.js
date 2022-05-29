import React, { Component } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import requestExternalStoreageRead from '../utils/requestExternalStorage';

const RequireStorage = (WrappedComponent) => {
  return class WithStorageAcess extends Component {
    state = { photos: null, allmedia: null };
    async componentDidMount() {
      if (Platform.OS !== 'ios' ? await requestExternalStoreageRead() : true) {
        this.getPhotosAsync({ first: 100, assetType: 'All' });
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.photos !== nextState.photos) {
        return true;
      } else if (this.state.allmedia !== nextState.allmedia) {
        return true;
      }
      return false;
    }

    async getPhotosAsync(params) {
      return new Promise((res, rej) =>
        CameraRoll.getPhotos(params)
          .then((data) => {
            const assets = data.edges;
            const arr = assets.map((asset) => asset.node.image);
            let allmedia = [];
            let photos = [];
            arr.forEach((item, index) => {
              allmedia.push({ ...item, id: index + 1 });
              if (item.playableDuration == 0 || !item.playableDuration) {
                photos.push({ ...item, id: index + 1 });
              }
            });
            this.setState({ allmedia, photos });
            res({ allmedia, photos });
          })
          .catch(rej),
      );
    }
    render() {
      return (
        <WrappedComponent
          photos={this.state.photos}
          allmedia={this.state.allmedia}
          {...this.props}
        />
      );
    }
  };
};

export default RequireStorage;
