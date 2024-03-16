import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";

const reducer = combineReducers({
    products:productReducer,
});
const intialState = {};
const middleWare = [thunk];
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
