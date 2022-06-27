import { combineReducers } from 'redux';
import user from './user_reducer';
import content from './content_reducer';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage, // localStorage에 저장합니다.
    whitelist: ["user"],
    blacklist:["content"]

  };

const rootReducer = combineReducers({
    user,
});

export default persistReducer(persistConfig,rootReducer);