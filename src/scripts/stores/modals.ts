import { createSlice } from '@reduxjs/toolkit'

export const modals = createSlice({
    name: 'modals',
    initialState: {
        likes: {
            id: 0,
            display: false
        }
    },
    reducers: {
        setLikes: (state, action) => {
            state.likes = action.payload
        }
    }
})

export const {
    setLikes
} = modals.actions

export default modals.reducer