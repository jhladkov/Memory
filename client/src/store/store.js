import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authReducer from './reducers/UserSlice'
import {authApi} from "../services/authService";


const rootReducer = combineReducers({
    authReducer,
    [authApi.reducerPath]: authApi.reducer,
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(authApi.middleware),

    })
}



