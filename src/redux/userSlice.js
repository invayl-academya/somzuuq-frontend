import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `"http://localhost:8000/api/users/auth`,
        formdata,
        {
          withCredentials: true, // must send Cookie
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `"http://localhost:8000/api/users/register`,
        formdata
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
