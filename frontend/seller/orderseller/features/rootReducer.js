import { combineReducers } from "redux";
import { reducer as reducerUser } from './user';
import {productreducer as productReducer} from './product';
import {storereducer as storeReducer} from './store';
import {storeproductsreducer as storeproductsReducer} from './storeproducts';


const rootReducer = combineReducers({
    user: reducerUser,
    product:productReducer,
    store:storeReducer,
    storeproducts:storeproductsReducer
})

export { rootReducer };