
import { createStore,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './index'

const initialState = {};

const middleware = [thunk];

/* const persistConfig = {
  key: 'root',
  storage,
} */

/* const persistedReducer = persistReducer(persistConfig, rootReducer)
 */
 const store = createStore(
  rootReducer,/* persistedReducer */
  initialState,
   compose( applyMiddleware(...middleware)
   )
);

/* const persistor = persistStore(store);
 */
export {store /* persistor */};