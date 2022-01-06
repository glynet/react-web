import { configureStore } from '@reduxjs/toolkit'

import clientReducer from "./client"
import modalsReducer from "./modals"

export const store = configureStore({
    reducer: {
        client: clientReducer,
        modals: modalsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch