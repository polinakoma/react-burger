import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './reducers/index.js'; 
import { composeWithDevTools } from 'redux-devtools-extension';


const enhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducers, enhancers);


export default store;