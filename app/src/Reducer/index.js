import { combineReducers } from 'redux';


import { Reducer } from '../Pages';

const reducers = combineReducers({
    ...Reducer
});

export default (state, action) => {
    switch (action.type) {
        case 'USUARIO_LOGOUT':
            state = undefined;
            break;
        default:
            break;
    }
    return reducers(state, action);
}