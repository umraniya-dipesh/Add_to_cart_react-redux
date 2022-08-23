import { createStore } from "redux";
import rootReducer from "./redux/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//persist is use for localstore
const persistConfiguration = {
  key: "persist_store_addtocart",
  storage,
};

const persist_Reducer = persistReducer(persistConfiguration, rootReducer);

const store = createStore(
  persist_Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persist_store = persistStore(store);
export default store;
