import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from './reducers/combineReducers'
import thunk from "redux-thunk";



const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store