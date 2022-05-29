import merge from 'lodash/merge';
import { Schemas } from '../store/schema';

const initialState = {
    homePlayer: Schemas.HOME,
    chat: Schemas.MESSAGE
};

const entities = (state = initialState, action) => {
    if (action.entities) {
        return merge({}, state, action.entities);
    }
    return state;
}

export default entities;