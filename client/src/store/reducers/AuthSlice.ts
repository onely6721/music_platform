import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {AuthService} from "../../service/AuthService";
import {IUser} from "../../types/user";
import {login, logout, register} from "../actions/UserActionCreator";


let user = localStorage.getItem("user")



interface UserState {
    isLoggedIn: boolean,
    user: string | null,
    error?: string
}


const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder =>  {
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.isLoggedIn = false
        })
        builder.addCase(register.rejected, (state, { payload }) => {
            state.isLoggedIn = false
        })
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.isLoggedIn = true
            state.user = payload.user
        })
        builder.addCase(login.rejected, (state, { payload }) => {
            state.isLoggedIn = false
            state.user = null
        })
        builder.addCase(logout.fulfilled, (state, { payload }) => {
            state.isLoggedIn = false
            state.user = null
        })
    },
});


export default authSlice.reducer
