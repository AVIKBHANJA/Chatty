import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// slices
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import chatReducer from "./slices/chat";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
});

export { rootPersistConfig, rootReducer };
