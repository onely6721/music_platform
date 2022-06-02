import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {AuthService} from "../../service/AuthService";
import {IUser} from "../../types/user";


let user = localStorage.getItem("user")
if (user)
    JSON.parse(user)



export const register = createAsyncThunk(
    "auth/register",
    async ({ username, email, password }:any, thunkAPI) => {
        try {
            const response = await AuthService.registration(email, username,password);
            return response.data;
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue("bad registration");
        }
    }
);
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password}:any, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return { user: data };
        } catch (error:any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue("bad login");
        }
    }
);
export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

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
