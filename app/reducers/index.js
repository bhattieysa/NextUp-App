import { combineReducers } from 'redux';

import entities from './entities';
import authReducer from './auth-reducer';
import homeReducer from './home-reducer';
import chatReducer from './chat-reducer'

const rootReducer = combineReducers({
  entities,
  authReducer,
  homeReducer,
  chatReducer
  // moderationReducer,
  // subadminReducer
});

export default rootReducer;
