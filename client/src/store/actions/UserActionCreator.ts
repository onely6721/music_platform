import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "../../service/AuthService";

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
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});
