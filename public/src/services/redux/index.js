import { combineReducers,createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {recipesReducer} from './ducks/recipes';
import reducer from './ducks/auth'

let reducers = combineReducers({
    recipes: recipesReducer,
    auth: reducer
});

let middlewares = applyMiddleware(
    thunk
);

export const store = createStore(reducers,middlewares);