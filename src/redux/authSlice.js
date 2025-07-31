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
      const response = await axios.post(`${APP_URL}/users/register`, formdata);

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

export const updateUserProfile = createAsyncThunk(
  "auth/upateuserprofile",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${APP_URL}/users/profile`, formdata, {
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

export const updateUserAdmiStatus = createAsyncThunk(
  "auth/adminStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${APP_URL}/users/role/${userId}`,
        {},
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

export const deleteUserById = createAsyncThunk(
  "auth/deleteuserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${APP_URL}/users/${userId}`, {
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
        state.user = null;
        state.isAuthenticated = false;
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

    // update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "failed to update  user";
    });

    // update user status admin
    builder.addCase(updateUserAdmiStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserAdmiStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedUser = action.payload;

      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    });
    builder.addCase(updateUserAdmiStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "failed to update  user status";
    });

    // delete User
    builder.addCase(deleteUserById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter(
        (user) => user._id !== action.payload.userId
      );
      state.error = null;
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "failed to update  user";
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
