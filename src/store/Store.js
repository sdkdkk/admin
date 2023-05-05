import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import reducer from "./Rootreducer";




const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ['pagesListDelete','postTutorQuestion']
};


const persistedReducer = persistReducer(persistConfig, reducer)



export default configureStore({
    reducer: persistedReducer
});