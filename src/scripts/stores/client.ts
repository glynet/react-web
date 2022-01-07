import { createSlice } from '@reduxjs/toolkit'

function syncUsername(string: string) {
    const res = /^[a-zA-Z0-9_.]+$/.exec(string);
    return !!res;
}

export const client = createSlice({
    name: 'client',
    initialState: {
        id: 1,
        token: 1,
        name: 'Glynet Kullanıcısı',
        username: 'an_user',
        avatar: 'img/avatar.png',
        theme: 1,
        color: '#23d9d6'
    },
    reducers: {
        setID: (state, action) => {
            state.id = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setName: (state, action) => {
            state.username = action.payload
        },
        setUsername: (state, action) => {
            let name = action.payload;
            state.name = name.split('').filter(syncUsername).join('').toString();
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload
        },
        setColor: (state, action) => {
            state.color = action.payload
        },
    }
})

export const {
    setID,
    setToken,
    setName,
    setUsername,
    setTheme,
    setAvatar,
    setColor
} = client.actions

export default client.reducer