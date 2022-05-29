import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAILURE,
  HOME_DETAIL_REQUEST,
  HOME_DETAIL_SUCCESS,
  HOME_DETAIL_FAILURE,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
  SUB_CATEGORIES_REQUEST,
  SUB_CATEGORIES_SUCCESS,
  SUB_CATEGORIES_FAILURE,
  HOME_REFRESH,
  HOME_REFRESH_COMPLETE,
  ADDFAVORITE_SUCCESS,
  ADDFAVORITE_REQUEST,
  ADDFAVORITE_FAILURE,
  GETFAVORITE_FAILURE,
  GETFAVORITE_REQUEST,
  GETFAVORITE_SUCCESS,
  MY_ADS_REQUEST,
  MY_ADS_FAILURE,
  MY_ADS_SUCCESS,
} from '../actions/action-type';

import { Record } from 'immutable';

const InitialState = Record({
  isFetching: true,
  isAuthorized: true,
  isRefreshing: false,
  error: null,
  Network: true,
});

const initialState = new InitialState();

const homeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case HOME_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case HOME_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case HOME_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case ADDFAVORITE_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case ADDFAVORITE_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case ADDFAVORITE_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case HOME_REFRESH:
      return state.setIn(['isRefreshing'], true).setIn(['error'], null);
    case HOME_REFRESH_COMPLETE:
      return state.setIn(['isRefreshing'], false).setIn(['error'], null);
    case HOME_DETAIL_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case HOME_DETAIL_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case HOME_DETAIL_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case CATEGORIES_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case CATEGORIES_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case CATEGORIES_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case SUB_CATEGORIES_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case SUB_CATEGORIES_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case SUB_CATEGORIES_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case GETFAVORITE_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case GETFAVORITE_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case GETFAVORITE_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    case MY_ADS_REQUEST:
      return state.setIn(['isFetching'], true).setIn(['error'], null);
    case MY_ADS_SUCCESS:
      return state.setIn(['isFetching'], false).setIn(['error'], null);
    case MY_ADS_FAILURE:
      return state.setIn(['isFetching'], false).setIn(['error'], action.error);
    default:
      return state;
  }
};

export default homeReducer;
