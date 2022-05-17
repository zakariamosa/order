import { combineReducers } from "redux";
import { reducer as reducerUser } from './user';



const rootReducer = combineReducers({
    user: reducerUser,
    
})

export { rootReducer };