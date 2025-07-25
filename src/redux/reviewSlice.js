import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  success: false,
};

export const createReview = createAsyncThunk(
  "reviews/create",
  async ({ productId, review }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${APP_URL}/reviews/${productId}/review`,
        review,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || " Failed to create review"
      );
    }
  }
);

export const fetchReviews = createAsyncThunk(
  "reviews/all",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${APP_URL}/reviews/${productId}/review`
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || " Failed to Load  reviews"
      );
    }
  }
);

// Update a review
export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ productId, review }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${APP_URL}/reviews/${productId}/review`,
        review,
        { withCredentials: true }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${APP_URL}/reviews/${productId}/review`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reviews = [];
      })

      // post
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PUT
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
