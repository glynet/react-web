import { createSlice } from '@reduxjs/toolkit'

export const tab = createSlice({
    name: 'tab',
    initialState: {
        name: ''
    },
    reducers: {
        setTab: (state, action) => {
            state.name = action.payload
        }
    }
})

export const {
    setTab
} = tab.actions

export default tab.reducer