import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";

const initialState = {
  cartItems: [],
  status: "idle",
};

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ userId, productId, qty }) => {
    const response = await axios.post(
      `${APP_URL}/cart/addCart`,
      {
        userId,
        productId,
        qty,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchusercart",
  async (userId) => {
    const response = await axios.get(`${APP_URL}/cart/user/${userId}`, {
      withCredentials: true,
    });

    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.cart.items;
      })
      .addCase(addToCart.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.cart;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.cartItems = [];
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
