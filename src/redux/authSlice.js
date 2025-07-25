import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";
import { toast } from "sonner";

const initialState = {
  users: [],
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APP_URL}/users/register`, formdata, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APP_URL}/users/auth`, formdata, {
        withCredentials: true, // must send Cookie
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APP_URL}/users/profile`, {
        withCredentials: true, // must send Cookie
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        params: {
          t: Date.now(),
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || " Failed to Load user profile"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout", // action type prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APP_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || " Failed Logout user info"
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/users/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${APP_URL}/users/all`, {
        withCredentials: true, // must send Cookie
      });

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
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "something went Wrong";
        state.user = null;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "something went Wrong";
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        toast.success("Logged Out User Succesfuly");
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "something went Wrong";
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        // console.log(action.payload.user);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isInitialized = true; // check user
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isInitialized = false; // check user
        state.user = null;

        state.error = action.payload || "something went Wrong";
      });

    // fetch all users
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "failed to fetch users";
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
