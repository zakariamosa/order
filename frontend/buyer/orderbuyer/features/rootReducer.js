import { combineReducers } from "redux";
import { reducer as reducerUser } from './user';
import {productreducer as productReducer} from './product';


const rootReducer = combineReducers({
    user: reducerUser,
    product:productReducer
})

export { rootReducer };