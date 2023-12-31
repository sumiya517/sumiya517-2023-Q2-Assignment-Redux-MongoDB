import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { devicesApi } from './api.js'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [devicesApi.reducerPath]: devicesApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(devicesApi.middleware),
})
setupListeners(store.dispatch)