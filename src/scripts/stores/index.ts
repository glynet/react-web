import { configureStore } from '@reduxjs/toolkit'

import clientReducer from "./client"
import modalsReducer from "./modals"
import tabsReducer from "./tab"

export const store = configureStore({
    reducer: {
        client: clientReducer,
        modals: modalsReducer,
        tab: tabsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch