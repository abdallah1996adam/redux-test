import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
//reducer
import { boxReducer } from "./reducers";

const reducer = combineReducers({ boxReducer });

export const store = createStore(reducer, applyMiddleware(thunk));
