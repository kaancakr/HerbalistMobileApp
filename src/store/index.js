import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "./reducers/reducer";
const RootReducers = combineReducers({
  // reducers
  Reducers,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from 'redux-thunk';
// import Reducers from "./reducers";
// import { persistStore, persistReducer } from 'redux-persist';

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// export const cfgStore = () => {
//   const middlewares = [thunk];
//   const enhancer = applyMiddleware(...middlewares);
//   const persistedReducer = persistReducer(persistConfig, Reducers);

//   // create store
//   return createStore(persistedReducer, enhancer);
// };

// export const persistor = persistStore(cfgStore());

// const RootReducers = combineReducers({
//   // reducers
//   Reducers,
// });

// export const store = createStore(RootReducers, applyMiddleware(thunk));
