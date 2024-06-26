import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state, action) => {
            state.loading = true

        },
        updateUserSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.error = false
        },
        updateUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        deleteUserStart: (state, action) => {
            state.loading = true

        },
        deleteUserSuccess: (state, action) => {
            state.loading = false
            state.currentUser = null
            state.error = false
        },
        deleteUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signOutStart: (state, action) => {
            state.loading = true

        },
        signOutSuccess: (state, action) => {
            state.loading = false
            state.currentUser = null
            state.error = false
        },
        signOutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


    }
})
export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure ,deleteUserFailure,deleteUserSuccess,deleteUserStart ,signOutFailure,signOutStart,signOutSuccess } = userSlice.actions
export default userSlice.reducer