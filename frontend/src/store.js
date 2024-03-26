import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer
});
const intialState = {};
const middleWare = [thunk];
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
