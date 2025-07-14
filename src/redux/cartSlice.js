import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "./constants";

const initialState = {
  cartItems: [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "PayPal",
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

export const updateCartQty = createAsyncThunk(
  "cart/updateqty",
  async ({ userId, productId, qty }) => {
    const response = await axios.put(
      `${APP_URL}/cart/update`,
      {
        userId,
        productId,
        qty,
      },
      {
        withCredentials: true,
      }
    );

    return response.data.cart.items;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${APP_URL}/cart/${userId}/${productId}`,
      {
        withCredentials: true,
      }
    );

    return response.data.cart.items;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveShippingAdress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
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
      })

      // updateCartQty
      .addCase(updateCartQty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems.items = action.payload;
      })
      .addCase(updateCartQty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems.items = action.payload;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { saveShippingAdress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
