import { combineReducers } from "redux";
import user from "./user.reducer";
import product from "./product.reducer";

export default combineReducers({ user, product });
