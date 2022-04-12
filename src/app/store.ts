import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";

import {productsReducer} from "../reducers/productsReducer";
import {categoriesReducer} from "../reducers/categoriesReducer";



const rootReducer = combineReducers({
    app: appReducer,
    products: productsReducer,
    categories: categoriesReducer,

})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export type AppRootStateType = ReturnType<typeof rootReducer>

// this so that you can access the store in the browser console at any time
// @ts-ignore
window.store = store;
