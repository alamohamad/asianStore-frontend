// store.js
import { createStore } from 'redux';
import countReducer from './reducers';

const store = createStore(countReducer);

export default store;
