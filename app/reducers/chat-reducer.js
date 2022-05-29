import {
    CHAT_MESSAGE_REQUEST,
    CHAT_MESSAGE_SUCCESS,
    CHAT_MESSAGE_FAILURE,
    CHAT_USER_LIST_REQUEST,
    CHAT_USER_LIST_SUCCESS,
    CHAT_USER_LIST_FAILURE
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

const chatReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHAT_MESSAGE_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case CHAT_MESSAGE_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case CHAT_MESSAGE_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        case CHAT_USER_LIST_REQUEST:
            return state.setIn(['isFetching'], true).setIn(['error'], null);
        case CHAT_USER_LIST_SUCCESS:
            return state.setIn(['isFetching'], false).setIn(['error'], null);
        case CHAT_USER_LIST_FAILURE:
            return state.setIn(['isFetching'], false).setIn(['error'], action.error);
        default:
            return state;
    }
};

export default chatReducer;
