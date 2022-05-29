import axios from 'axios';
import { Base } from '../constants';
import { getUserToken, removeAllLocalData } from './storage'
import Navigation from '../lib/Navigation';
// const token = 'XG1KU4bly5rPyHDRGoILn8YjjN4QCCHJO6CDO6R8OMumAlEaAwRMyrNjeK6B';
axios.defaults.baseURL = Base.API_ROOT;

axios.interceptors.request.use(
  async (config) => {
    const auth = await getUserToken();
    if (auth) {
      // debugger
      config.headers.common['Authorization'] = `${'Bearer ' + auth}`;
      //for token expire test
      // config.headers.common['Authorization'] = `${'Bearer ' + 'klaodndkisoak'}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    debugger;
    if (error.response.status === 404) {
      return axios.request(error.response.config);
    } else if (error.response.status === 403) {
      console.log("REspppp", error.response);
      removeAllLocalData().then((res) => {
        if (res) {
          Navigation.navigate('AuthLoading');
        }
      })
    } else {
      return Promise.reject(error);
    }
  },
);
