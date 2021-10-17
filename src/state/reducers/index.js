import { combineReducers } from "redux";
import emailReducer from "./emailReducer";
import passwordReducer from "./passwordReducer";

const reducers = combineReducers({
    email: emailReducer,
    password: passwordReducer
});

export default reducers;