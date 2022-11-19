import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userLoggedIn: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload;
        },
        logout: (state) => {
            state.userLoggedIn = null;
        }
    }
});

export const { setIsLoggedIn, logout } = userSlice.actions;

export const selectUserLoggedIn = state => state.user.userLoggedIn;

export default userSlice.reducer