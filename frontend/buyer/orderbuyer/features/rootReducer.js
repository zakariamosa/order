import { combineReducers } from "redux";
import { reducer as reducerUser } from './user';
import {storereducer as storeReducer} from './store';
import {storeproductsreducer as storeproductsReducer} from './storeproducts';


const rootReducer = combineReducers({
    user: reducerUser,
    store:storeReducer,
    storeproducts:storeproductsReducer
})

export { rootReducer };