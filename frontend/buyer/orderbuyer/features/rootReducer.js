import { combineReducers } from "redux";
import { reducer as reducerUser } from './user';
import {storereducer as storeReducer} from './store';


const rootReducer = combineReducers({
    user: reducerUser,
    store:storeReducer
})

export { rootReducer };