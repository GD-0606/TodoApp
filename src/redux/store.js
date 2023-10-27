import {configureStore,combineReducers} from  '@reduxjs/toolkit'
import {todoslice,counterslice} from '../slices/todoslice'
const rootReducer = combineReducers({
    todo: todoslice,
    counter: counterslice,
  });
export const store=configureStore({
    reducer:rootReducer
})